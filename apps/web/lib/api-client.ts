/**
 * EHB API client — thin fetch wrapper for /api/* calls.
 * Uses NEXT_PUBLIC_API_URL (default http://localhost:5000) and NEXT_PUBLIC_AI_URL
 * (default http://localhost:8080).
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const AI_BASE = process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8080';

const TOKEN_KEY = 'ehb_token';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  if (typeof window === 'undefined') return;
  try {
    if (token) window.sessionStorage.setItem(TOKEN_KEY, token);
    else window.sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

async function request<T = any>(
  base: string,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${base}${path}`, { ...init, headers, cache: 'no-store' });
  const text = await res.text();
  let body: any;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    const error = new Error(body?.error || `HTTP ${res.status}`);
    (error as any).status = res.status;
    (error as any).body = body;
    throw error;
  }
  return body as T;
}

export const api = {
  get: <T = any>(path: string) => request<T>(API_BASE, path),
  post: <T = any>(path: string, data?: any) =>
    request<T>(API_BASE, path, { method: 'POST', body: JSON.stringify(data || {}) }),
  put: <T = any>(path: string, data?: any) =>
    request<T>(API_BASE, path, { method: 'PUT', body: JSON.stringify(data || {}) }),
  del: <T = any>(path: string) => request<T>(API_BASE, path, { method: 'DELETE' }),
};

export const aiApi = {
  get: <T = any>(path: string) => request<T>(AI_BASE, path),
  post: <T = any>(path: string, data?: any) =>
    request<T>(AI_BASE, path, { method: 'POST', body: JSON.stringify(data || {}) }),
};

export const config = { API_BASE, AI_BASE };
