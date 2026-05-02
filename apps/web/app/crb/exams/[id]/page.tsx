'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

export default function ExamRunnerPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [started, setStarted] = useState<any>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function start() {
    setBusy(true);
    setErr(null);
    try {
      const r = await api.post(`/api/crb/exams/${params?.id}/start`);
      setStarted(r);
      setAnswers(new Array(r.exam.questions.length).fill(-1));
    } catch (e: any) {
      setErr(e?.message || 'Failed to start');
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    setBusy(true);
    try {
      const r = await api.post(`/api/crb/attempts/${started.attemptId}/submit`, { answers });
      setResult(r);
    } catch (e: any) {
      setErr(e?.message || 'Submit failed');
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <PlasticCard className="max-w-md p-8 text-center">
          <div className="text-6xl">{result.passed ? '🎉' : '😔'}</div>
          <h2 className="mt-3 text-2xl font-bold">
            {result.passed ? 'Passed!' : 'Did not pass'}
          </h2>
          <div className="mt-2 text-3xl font-bold tabular-nums">{result.scorePct}%</div>
          {result.levelAwarded ? (
            <div className="mt-4 flex justify-center">
              <StlBadge level={result.levelAwarded} size="lg" />
            </div>
          ) : null}
          {result.certificateHash ? (
            <div className="mt-4 rounded-card border border-glass bg-nested p-3 text-xs">
              <div className="text-white/50">On-chain certificate hash</div>
              <div className="mt-1 break-all font-mono text-[10px] text-teal">
                {result.certificateHash}
              </div>
            </div>
          ) : null}
          <div className="mt-5 flex justify-center gap-2">
            <Link
              href="/crb/exams"
              className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm"
            >
              Back to exams
            </Link>
            <Button3D variant="purple" onClick={() => router.push('/dmo')}>
              DMO dashboard
            </Button3D>
          </div>
        </PlasticCard>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <PlasticCard className="max-w-md p-8 text-center">
          <div className="text-5xl">📝</div>
          <h2 className="mt-3 text-xl font-bold">Ready to start?</h2>
          <p className="mt-2 text-sm text-white/60">
            Once you click start, the timer begins. MCQ questions auto-graded.
          </p>
          {err ? (
            <div className="mt-3 rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-2 text-xs text-[#F05858]">
              {err}
            </div>
          ) : null}
          <Button3D variant="green" className="mt-4" onClick={start} disabled={busy}>
            {busy ? 'Loading…' : 'Start exam'}
          </Button3D>
        </PlasticCard>
      </main>
    );
  }

  const answered = answers.filter((a) => a >= 0).length;

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-white/40">{started.exam.code}</div>
            <h1 className="text-xl font-bold">{started.exam.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Chip tone="teal">
              {answered}/{started.exam.questions.length} answered
            </Chip>
            <Chip tone="amber">Pass ≥ {started.exam.passPct}%</Chip>
          </div>
        </div>

        <div className="space-y-4">
          {started.exam.questions.map((q: any, i: number) => (
            <PlasticCard key={q._id} className="p-5">
              <div className="text-xs text-white/40">Question {i + 1}</div>
              <div className="mt-1 text-sm font-semibold">{q.prompt}</div>
              <div className="mt-3 space-y-2">
                {q.options.map((opt: string, j: number) => (
                  <button
                    key={j}
                    onClick={() => {
                      const next = [...answers];
                      next[i] = j;
                      setAnswers(next);
                    }}
                    className={`block w-full rounded-card border px-3 py-2 text-left text-sm transition ${
                      answers[i] === j
                        ? 'border-purple-light bg-purple/20'
                        : 'border-glass bg-nested hover:border-white/30'
                    }`}
                  >
                    <span className="mr-2 inline-block h-5 w-5 rounded-full border border-white/30 text-center leading-5">
                      {answers[i] === j ? '●' : ''}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </PlasticCard>
          ))}
        </div>

        {err ? (
          <div className="mt-3 rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-3 text-xs text-[#F05858]">
            {err}
          </div>
        ) : null}

        <div className="sticky bottom-4 mt-6">
          <Button3D variant="green" size="lg" className="w-full" onClick={submit} disabled={busy || answered === 0}>
            {busy ? 'Submitting…' : `Submit — ${answered}/${started.exam.questions.length} answered`}
          </Button3D>
        </div>
      </div>
    </main>
  );
}
