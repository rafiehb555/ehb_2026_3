'use client';

/**
 * EHB KYC Page — v3.3 §13.6.5
 *
 * Spec: ehb-info/departments/Affiliate.md §13.6.5 (v3.3)
 *
 * MVP: View tier · See pending/verified docs · Manual upload form
 * Phase 2: integrate Jumio/Onfido/Sumsub/NADRA adapters for OCR + liveness
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

interface KycStatus {
  tier?: number;
  tierName?: string;
  limits?: { name?: string; monthlyInUsd?: number; monthlyOutUsd?: number };
  verifiedDocs?: any[];
  pendingDocs?: any[];
  rejectedDocs?: any[];
  nextTier?: number | null;
  nextTierMissing?: string[];
  nextTierLimits?: any;
}

const DOCUMENT_TYPES = [
  { id: 'cnic', label: '🇵🇰 CNIC (Pakistan ID)', tier: 1 },
  { id: 'passport', label: '🛂 Passport', tier: 1 },
  { id: 'national_id', label: '🪪 National ID', tier: 1 },
  { id: 'driving_license', label: '🚗 Driving License', tier: 1 },
  { id: 'selfie', label: '🤳 Selfie (with ID)', tier: 2 },
  { id: 'address_proof', label: '🏠 Address Proof', tier: 2 },
  { id: 'bank_statement', label: '🏦 Bank Statement', tier: 3 },
  { id: 'source_of_funds_letter', label: '💰 Source of Funds Letter', tier: 3 },
  { id: 'tax_return', label: '📄 Tax Return', tier: 3 },
];

export default function KycPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<KycStatus | null>(null);
  const [docType, setDocType] = useState('cnic');
  const [fileUrl, setFileUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  async function load() {
    if (!user) return;
    try {
      const s = await api.get('/api/kyc/me');
      setStatus(s as KycStatus);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, [user]);

  async function handleSubmit() {
    if (!fileUrl) {
      setMsg({ type: 'err', text: 'Please provide a file URL (in production: upload widget)' });
      return;
    }
    setSubmitting(true);
    setMsg(null);
    try {
      const r = await api.post('/api/kyc/submit', { documentType: docType, fileUrl });
      setMsg({
        type: 'ok',
        text: `✓ Document submitted (contributes to Tier ${r.contributesToTier}). Review pending.`,
      });
      setFileUrl('');
      load();
    } catch (e: any) {
      setMsg({ type: 'err', text: e?.message || 'Submission failed' });
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) {
    return (
      <>
        <PublicNav />
        <main className="flex min-h-screen items-center justify-center p-6">
          <PlasticCard className="max-w-md p-8 text-center">
            <div className="text-5xl">🛡️</div>
            <h2 className="mt-4 text-xl font-semibold">Sign in to view KYC</h2>
            <div className="mt-5 flex justify-center gap-3">
              <Link href="/login" className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-sm font-semibold"
              >
                Register
              </Link>
            </div>
          </PlasticCard>
        </main>
      </>
    );
  }

  const tier = status?.tier ?? 0;

  return (
    <>
      <PublicNav />
      <main className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Hero */}
          <PlasticCard className="overflow-hidden p-0">
            <div
              className="relative p-5 sm:p-8"
              style={{
                background:
                  'linear-gradient(135deg, rgba(43, 191, 160, 0.15), rgba(123, 110, 246, 0.05) 60%, transparent)',
              }}
            >
              <div className="flex flex-wrap items-start gap-4 sm:gap-6">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card text-4xl shadow-2xl sm:h-20 sm:w-20 sm:text-5xl"
                  style={{
                    background: 'linear-gradient(135deg, #2BBFA0, #38C878)',
                    boxShadow: '0 12px 40px rgba(43,191,160,0.4)',
                  }}
                >
                  🛡️
                </div>
                <div className="min-w-0 flex-1">
                  <Chip tone="purple">KYC Tier {tier} · {status?.tierName || 'Sandbox'}</Chip>
                  <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Verification level</h1>
                  <p className="mt-2 text-sm text-white/70">
                    Higher KYC tier = higher wallet limits. Currently:{' '}
                    <strong className="text-teal">
                      ${status?.limits?.monthlyInUsd === -1 ? 'unlimited' : status?.limits?.monthlyInUsd}/mo deposit
                    </strong>{' '}
                    ·{' '}
                    <strong className="text-amber">
                      ${status?.limits?.monthlyOutUsd === -1 ? 'unlimited' : status?.limits?.monthlyOutUsd}/mo withdrawal
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </PlasticCard>

          {/* Tier ladder */}
          <PlasticCard className="mt-4 p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Tier ladder
            </div>
            <h3 className="mt-1 text-lg font-semibold">5 levels — higher = bigger limits</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {[0, 1, 2, 3, 4].map((t) => {
                const tierInfo = (
                  { 0: 'Sandbox', 1: 'Basic', 2: 'Standard', 3: 'Pro', 4: 'Institutional' } as any
                )[t];
                const isCurrent = t === tier;
                const isPast = t < tier;
                return (
                  <div
                    key={t}
                    className={`rounded-card border p-3 text-center text-xs ${
                      isCurrent
                        ? 'border-teal bg-teal/15 text-teal'
                        : isPast
                        ? 'border-purple-light/40 bg-purple-light/5 text-purple-light'
                        : 'border-glass bg-nested/30 text-white/40'
                    }`}
                  >
                    <div className="text-lg">
                      {isCurrent ? '●' : isPast ? '✓' : '🔒'}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold">Tier {t}</div>
                    <div className="text-[10px] opacity-70">{tierInfo}</div>
                  </div>
                );
              })}
            </div>
          </PlasticCard>

          {/* Next tier requirements */}
          {status?.nextTier && status.nextTierMissing && status.nextTierMissing.length > 0 ? (
            <PlasticCard className="mt-4 p-5">
              <div className="text-[10px] uppercase tracking-widest text-amber sm:text-xs">
                Next tier
              </div>
              <h3 className="mt-1 text-lg font-semibold">
                Upgrade to Tier {status.nextTier} ·{' '}
                {(
                  { 1: 'Basic', 2: 'Standard', 3: 'Pro', 4: 'Institutional' } as any
                )[status.nextTier]}
              </h3>
              <p className="mt-2 text-xs text-white/60">
                Missing documents:
              </p>
              <ul className="mt-2 space-y-1">
                {status.nextTierMissing.map((m, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <span className="text-amber">○</span> {m.replace(/_/g, ' ')}
                  </li>
                ))}
              </ul>
              {status.nextTierLimits ? (
                <div className="mt-3 text-[11px] text-white/50">
                  Unlocks: ${status.nextTierLimits.monthlyInUsd === -1 ? 'unlimited' : status.nextTierLimits.monthlyInUsd}
                  /mo deposit · $
                  {status.nextTierLimits.monthlyOutUsd === -1 ? 'unlimited' : status.nextTierLimits.monthlyOutUsd}/mo
                  withdrawal
                </div>
              ) : null}
            </PlasticCard>
          ) : null}

          {/* Submit document form */}
          <PlasticCard className="mt-4 p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Submit a document
            </div>
            <h3 className="mt-1 text-lg font-semibold">Upload for verification</h3>
            <p className="mt-1 text-xs text-white/60">
              Phase 1 MVP: paste a file URL. Phase 2 adds Jumio/Onfido/Sumsub/NADRA OCR + liveness.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-white/70">Document type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-sm"
                >
                  {DOCUMENT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label} (Tier {t.tier})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">File URL</label>
                <input
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://example.com/doc.jpg"
                  className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-sm"
                />
              </div>
            </div>
            <div className="mt-3">
              <Button3D variant="teal" size="md" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Document'}
              </Button3D>
            </div>
            {msg ? (
              <div
                className={`mt-3 rounded-card border p-3 text-xs ${
                  msg.type === 'ok'
                    ? 'border-teal/40 bg-teal/10 text-teal'
                    : 'border-red-500/40 bg-red-500/10 text-red-400'
                }`}
              >
                {msg.text}
              </div>
            ) : null}
          </PlasticCard>

          {/* My documents */}
          <PlasticCard className="mt-4 p-0">
            <div className="border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                My documents
              </div>
              <h3 className="mt-1 text-sm font-semibold sm:text-lg">Submitted for review</h3>
            </div>
            {(status?.verifiedDocs?.length ?? 0) +
              (status?.pendingDocs?.length ?? 0) +
              (status?.rejectedDocs?.length ?? 0) ===
            0 ? (
              <div className="p-8 text-center text-sm text-white/50">
                No documents yet. Start by submitting your CNIC or passport for Tier 1.
              </div>
            ) : (
              <ul className="divide-y divide-white/5">
                {[
                  ...(status?.verifiedDocs || []),
                  ...(status?.pendingDocs || []),
                  ...(status?.rejectedDocs || []),
                ].map((d: any) => (
                  <li key={d._id} className="flex flex-wrap items-center gap-3 p-4">
                    <Chip
                      tone={
                        d.status === 'verified'
                          ? 'ok'
                          : d.status === 'rejected'
                          ? 'warn'
                          : 'purple'
                      }
                    >
                      {d.status}
                    </Chip>
                    <div className="min-w-0 flex-1 text-xs text-white/70">
                      <strong>{d.documentType?.replace(/_/g, ' ')}</strong>
                      <span className="ml-2 text-[10px] text-white/40">
                        Tier {d.contributesToTier} ·{' '}
                        {d.submittedAt ? new Date(d.submittedAt).toLocaleDateString() : ''}
                      </span>
                      {d.rejectedReason ? (
                        <div className="mt-1 text-[11px] text-red-400">{d.rejectedReason}</div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </PlasticCard>

          {/* Legal */}
          <PlasticCard className="mt-4 p-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔐</div>
              <div className="text-xs text-white/70 sm:text-sm">
                <strong className="text-white/90">Privacy:</strong> documents stored encrypted.
                Verification adapter (Phase 2) — Jumio · Onfido · Sumsub · NADRA Pakistan. We
                comply with FATF Travel Rule for crypto withdrawals ≥ $1,000 and OFAC sanctions
                screening at signup + ongoing.
              </div>
            </div>
          </PlasticCard>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
