'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';

const CATEGORIES = [
  { value: 'late_delivery', label: 'Late delivery', tier: 2 },
  { value: 'item_damaged', label: 'Item damaged', tier: 3 },
  { value: 'not_as_described', label: 'Not as described', tier: 3 },
  { value: 'quality_issue', label: 'Quality issue', tier: 3 },
  { value: 'refund_dispute', label: 'Refund dispute', tier: 4 },
  { value: 'abusive_behavior', label: 'Abusive behavior', tier: 5 },
  { value: 'fraud', label: 'Fraud', tier: 6 },
  { value: 'other', label: 'Other', tier: 1 },
];

function FileInner() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get('orderId') || '';
  const [category, setCategory] = useState('late_delivery');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedTier = CATEGORIES.find((c) => c.value === category)?.tier || 1;

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const r = await api.post('/api/complaints', {
        orderId: orderId || undefined,
        category,
        summary,
        details,
      });
      setResult(r);
    } catch (e: any) {
      setError(e?.message || 'Submit failed');
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <PlasticCard className="max-w-md p-8 text-center">
          <div className="text-5xl">📨</div>
          <h2 className="mt-3 text-xl font-semibold">Complaint filed</h2>
          <div className="mt-1 font-mono text-xs text-white/50">{result.complaintNumber}</div>
          <div className="mt-3 flex justify-center gap-2">
            <Chip tone="purple">Tier {result.tier}</Chip>
            <Chip tone="warn">
              SLA: by {new Date(result.slaDeadlineAt).toLocaleString()}
            </Chip>
          </div>
          <p className="mt-4 text-sm text-white/60">
            DMO will review and resolve within the tier SLA. You will be notified of the outcome.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/complaints/my"
              className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm"
            >
              My complaints
            </Link>
            <Button3D variant="purple" onClick={() => router.push('/orders')}>
              Back to orders
            </Button3D>
          </div>
        </PlasticCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-2xl px-6">
        <Link
          href={orderId ? `/orders/${orderId}` : '/orders'}
          className="text-xs text-white/50 hover:text-white"
        >
          ← Back
        </Link>

        <PlasticCard className="mt-4 p-8">
          <div className="text-xs uppercase tracking-widest text-amber">File a Complaint</div>
          <h1 className="mt-2 text-2xl font-bold">Tell us what went wrong</h1>

          {orderId ? (
            <div className="mt-3 text-xs text-white/50">
              Linked to order: <span className="font-mono">{orderId}</span>
            </div>
          ) : null}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs text-white/70">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={`rounded-chip border px-3 py-1.5 text-xs ${
                      category === c.value
                        ? 'border-purple-light bg-purple/20 text-white'
                        : 'border-glass text-white/60 hover:text-white'
                    }`}
                  >
                    {c.label} · T{c.tier}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-[11px] text-white/40">
                Auto-classified tier: T{selectedTier} — higher tier = faster SLA + stricter
                penalty.
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-white/70">Summary</label>
              <input
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="e.g. Package arrived broken"
                className="w-full rounded-input border border-glass bg-nested px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-white/70">Details</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
                placeholder="Describe what happened…"
                className="w-full resize-none rounded-input border border-glass bg-nested px-3 py-2 text-sm"
              />
            </div>

            {error ? (
              <div className="rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-3 text-xs text-[#F05858]">
                {error}
              </div>
            ) : null}

            <Button3D
              variant="red"
              size="lg"
              className="w-full"
              onClick={submit}
              disabled={busy || !summary}
            >
              {busy ? 'Submitting…' : 'Submit complaint'}
            </Button3D>

            <div className="text-[11px] text-white/40">
              Fraud claims get tier 6 (2h SLA) and trigger immediate review. False complaints may
              result in a penalty against the filer.
            </div>
          </div>
        </PlasticCard>
      </div>
    </main>
  );
}

export default function FileComplaintPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white/50">Loading…</div>}>
      <FileInner />
    </Suspense>
  );
}
