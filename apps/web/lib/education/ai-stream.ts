/**
 * EHB AI · Education AI · SSE Stream Consumer
 *
 * Consumes Server-Sent Events from POST /api/learn/ai?stream=1
 * (EventSource doesn't support POST · so we use fetch + ReadableStream)
 *
 * Event protocol (per services/api/src/routes/v1Endpoints.js streamAiResponse):
 *   event: meta   data: { service, stl, source, model, type }
 *   event: token  data: { text }     ← multiple
 *   event: chips  data: { chips: string[] }
 *   event: done   data: { cost, totalTokens, durationMs }
 *   event: error  data: { message, fallback? }
 *
 * Plus JSON fallback for sensitive-subject auto-route (returns object · no stream).
 *
 * Usage:
 *   const ctrl = new AbortController();
 *   await streamAiTutor({
 *     body: { mode: 'eli5', query: '...', subjectId, languagePref: 'roman-ur' },
 *     signal: ctrl.signal,
 *     onToken: (text) => append(text),
 *     onMeta: (m) => setMeta(m),
 *     onChips: (c) => setChips(c),
 *     onDone: () => setStreaming(false),
 *     onError: () => fallback(),
 *     onHumanRoute: (msg) => routeToHuman(msg),
 *   });
 */

export type AiStreamMeta = {
  service: string;
  stl: number;
  source: string;
  model: string;
  type: string;
};

export type AiStreamDone = {
  cost: number;
  totalTokens: number;
  durationMs: number;
};

export type AiStreamBody = {
  mode: string;
  query: string;
  subjectId?: string;
  chapterId?: string;
  weakAreas?: string[];
  languagePref?: 'ur' | 'en' | 'roman-ur';
};

export type StreamAiTutorOptions = {
  body: AiStreamBody;
  endpoint?: string; // default: /api/learn/ai
  signal?: AbortSignal;
  onMeta?: (meta: AiStreamMeta) => void;
  onToken?: (text: string) => void;
  onChips?: (chips: string[]) => void;
  onDone?: (done: AiStreamDone) => void;
  onError?: (err: { message: string; fallback?: boolean }) => void;
  onHumanRoute?: (
    message: string,
    routes: { label: string; href: string }[],
  ) => void;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : '');

export async function streamAiTutor(opts: StreamAiTutorOptions): Promise<void> {
  const {
    body,
    endpoint = '/api/learn/ai',
    signal,
    onMeta,
    onToken,
    onChips,
    onDone,
    onError,
    onHumanRoute,
  } = opts;

  const url = `${API_BASE}${endpoint}?stream=1`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') throw err;
    onError?.({ message: 'network', fallback: true });
    return;
  }

  if (!res.ok || !res.body) {
    onError?.({ message: `http-${res.status}`, fallback: true });
    return;
  }

  // Sensitive subject auto-route returns JSON · not stream
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      const json = await res.json();
      if (json?.type === 'human-route') {
        onHumanRoute?.(json.message, json.routes || []);
        return;
      }
      // Legacy JSON path · treat full response.text as a single token
      if (json?.text) {
        if (json.tags) {
          onMeta?.({
            service: json.tags.service || 'AGT_TUTOR',
            stl: json.tags.stl || 7,
            source: json.tags.source || 'kb',
            model: json.tags.model || 'gpt-4o-mini',
            type: json.tags.type || body.mode,
          });
        }
        onToken?.(json.text);
        if (json.suggestionChips) onChips?.(json.suggestionChips);
        onDone?.({ cost: json.tags?.cost || 0, totalTokens: 1, durationMs: 0 });
        return;
      }
      onError?.({ message: 'unknown-json-shape', fallback: true });
      return;
    } catch (err) {
      onError?.({ message: 'json-parse-failed', fallback: true });
      return;
    }
  }

  // SSE parsing
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // SSE messages are separated by \n\n
      let sepIdx;
      while ((sepIdx = buffer.indexOf('\n\n')) !== -1) {
        const rawEvent = buffer.slice(0, sepIdx);
        buffer = buffer.slice(sepIdx + 2);
        dispatchEvent(rawEvent, { onMeta, onToken, onChips, onDone, onError });
      }
    }
    // Flush any remaining event
    if (buffer.trim()) {
      dispatchEvent(buffer, { onMeta, onToken, onChips, onDone, onError });
    }
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') throw err;
    onError?.({ message: 'stream-read-failed', fallback: true });
  } finally {
    try {
      reader.releaseLock();
    } catch {
      /* noop */
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SSE event parser · handles `event: X\ndata: {json}` blocks
// ─────────────────────────────────────────────────────────────────────────────

function dispatchEvent(
  raw: string,
  handlers: Pick<
    StreamAiTutorOptions,
    'onMeta' | 'onToken' | 'onChips' | 'onDone' | 'onError'
  >,
): void {
  let event = 'message';
  const dataLines: string[] = [];

  for (const line of raw.split('\n')) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
    } else if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trim());
    } else if (line.startsWith(':')) {
      // SSE comment · ignore
    }
  }

  if (dataLines.length === 0) return;
  const dataStr = dataLines.join('\n');

  let payload: unknown;
  try {
    payload = JSON.parse(dataStr);
  } catch {
    return; // malformed event · skip
  }

  const p = payload as Record<string, unknown>;
  switch (event) {
    case 'meta':
      handlers.onMeta?.(p as unknown as AiStreamMeta);
      break;
    case 'token':
      if (typeof p.text === 'string') handlers.onToken?.(p.text);
      break;
    case 'chips':
      if (Array.isArray(p.chips)) handlers.onChips?.(p.chips as string[]);
      break;
    case 'done':
      handlers.onDone?.(p as unknown as AiStreamDone);
      break;
    case 'error':
      handlers.onError?.({
        message: String(p.message || 'unknown'),
        fallback: Boolean(p.fallback),
      });
      break;
    default:
      // unknown event · ignore
      break;
  }
}
