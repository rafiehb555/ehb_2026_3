'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';

function ApplyInner() {
  const params = useSearchParams();
  const router = useRouter();
  const tier = params.get('tier') || 'sub';
  const level = params.get('level') || 'L1';

  const [step, setStep] = useState(1);
  const [area, setArea] = useState('');
  const [country, setCountry] = useState('PK');
  const [agreeKyc, setAgreeKyc] = useState(false);
  const [agreeLock, setAgreeLock] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function submit() {
    setSubmitting(true);
    try {
      const res = await api.post('/api/franchise/apply', { tier, level, country, area });
      setResult(res);
      setStep(4);
    } catch (e: any) {
      setResult({ error: e?.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto max-w-2xl px-6">
        <Link href="/franchise" className="text-xs text-white/50 hover:text-white">
          ← Back to franchise tiers
        </Link>

        <PlasticCard className="mt-4 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-teal">
                Application · Step {step} of 4
              </div>
              <h1 className="mt-2 text-2xl font-bold">
                Apply for {tier === 'online' ? 'Online' : 'Sub'} Franchise · {level}
              </h1>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-2 w-8 rounded-full transition ${step >= n ? 'bg-purple' : 'bg-white/10'}`}
                />
              ))}
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-white/70">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-input border border-glass bg-nested px-3 py-2 text-sm"
                >
                  <option value="PK">Pakistan (PK)</option>
                  <option value="SA" disabled>
                    Saudi Arabia — Phase 2
                  </option>
                  <option value="AE" disabled>
                    UAE — Phase 2
                  </option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">
                  {tier === 'online' ? 'Operating region (informational)' : 'Area / zone'}
                </label>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full rounded-input border border-glass bg-nested px-3 py-2 text-sm"
                  placeholder={tier === 'online' ? 'E.g. Punjab, national' : 'E.g. F-10 Islamabad'}
                />
              </div>
              <div className="flex justify-end">
                <Button3D variant="purple" onClick={() => setStep(2)} disabled={!area}>
                  Next: KYC check
                </Button3D>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="rounded-card border border-glass bg-nested p-4 text-xs text-white/70">
                <div className="mb-2 text-sm font-semibold text-white">Your verification status</div>
                <div className="flex flex-wrap gap-2">
                  <Chip tone="ok">PSS L3 · verified</Chip>
                  <Chip tone="warn">CRB: not applicable for {level}</Chip>
                  <Chip tone="purple">STL: eligible</Chip>
                </div>
                <p className="mt-3">
                  For {tier === 'online' ? 'Online Franchises' : `Sub ${level}`}, activation gate is
                  PSS L5 minimum. Sub L1 demo override is enabled for Phase 1 testing.
                </p>
              </div>
              <label className="flex items-start gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={agreeKyc}
                  onChange={(e) => setAgreeKyc(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  I authorize EHB DMO to verify my KYC and run AML/sanctions checks.
                </span>
              </label>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-chip border border-glass px-3 py-1.5 text-xs"
                >
                  ← Back
                </button>
                <Button3D variant="purple" onClick={() => setStep(3)} disabled={!agreeKyc}>
                  Next: Pricing confirm
                </Button3D>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <div className="rounded-card border border-glass bg-nested p-4">
                <div className="text-xs uppercase tracking-widest text-white/40">
                  Dual pricing · one-time + ongoing
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-white/50">USD entry fee</div>
                    <div className="text-2xl font-bold">
                      {tier === 'online' && level === 'OF1'
                        ? '$100'
                        : tier === 'online' && level === 'OF2'
                          ? '$250'
                          : tier === 'online' && level === 'OF3'
                            ? '$750'
                            : tier === 'online' && level === 'OF4'
                              ? '$1,500'
                              : level === 'L1'
                                ? '$5,000'
                                : '—'}
                    </div>
                    <div className="mt-1 text-xs text-white/40">Non-refundable entry</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50">EHBGC lock required</div>
                    <div className="text-2xl font-bold">
                      {tier === 'online' && level === 'OF1'
                        ? '500'
                        : tier === 'online' && level === 'OF2'
                          ? '1,000'
                          : tier === 'online' && level === 'OF3'
                            ? '2,000'
                            : tier === 'online' && level === 'OF4'
                              ? '3,000'
                              : level === 'L1'
                                ? '5,000'
                                : '—'}{' '}
                      EHBGC
                    </div>
                    <div className="mt-1 text-xs text-white/40">
                      Locked in wallet while active
                    </div>
                  </div>
                </div>
              </div>
              <label className="flex items-start gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={agreeLock}
                  onChange={(e) => setAgreeLock(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  I agree to lock the required EHBGC balance in my wallet upon approval.
                </span>
              </label>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="rounded-chip border border-glass px-3 py-1.5 text-xs"
                >
                  ← Back
                </button>
                <Button3D variant="green" onClick={submit} disabled={!agreeLock || submitting}>
                  {submitting ? 'Submitting…' : 'Submit application'}
                </Button3D>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-5">
              {result?.error ? (
                <div className="rounded-card border border-[#F05858]/40 bg-[#F05858]/10 p-4 text-sm text-[#F05858]">
                  {result.error}
                </div>
              ) : (
                <>
                  <div className="rounded-card border border-[#38C878]/30 bg-[#38C878]/10 p-5 text-center">
                    <div className="text-4xl">🎉</div>
                    <div className="mt-2 text-lg font-semibold">Application submitted!</div>
                    <div className="mt-1 text-sm text-white/60">
                      Application ID: <span className="font-mono">{result?.applicationId}</span>
                    </div>
                  </div>
                  <div className="rounded-card border border-glass bg-nested p-4 text-xs text-white/70">
                    <div className="text-sm font-semibold text-white">Next steps</div>
                    <ol className="mt-2 list-decimal space-y-1 pl-4">
                      <li>DMO reviews within 48 hours (SLA)</li>
                      <li>On approval, serial number assigned (EHB-{country}-R1-P1-{level}-XXX)</li>
                      <li>EHBGC auto-locked from wallet</li>
                      <li>Franchisee dashboard becomes available at /franchise/my</li>
                    </ol>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      href="/franchise/my"
                      className="rounded-chip border border-glass px-3 py-1.5 text-xs text-white/60"
                    >
                      View status
                    </Link>
                    <Button3D variant="purple" onClick={() => router.push('/dmo')}>
                      Open DMO Dashboard
                    </Button3D>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </PlasticCard>
      </div>
    </main>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="p-10 text-white/50">Loading…</div>}>
      <ApplyInner />
    </Suspense>
  );
}
