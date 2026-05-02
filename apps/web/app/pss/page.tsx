'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { FieldWithHint } from '@/components/ui/field-with-hint';

export default function PssPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('CNIC');
  const [docNumber, setDocNumber] = useState('');
  const [livenessOk, setLivenessOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function submit() {
    setSubmitting(true);
    try {
      const res = await api.post('/api/pss/submit', {
        docType,
        docNumber,
        livenessOk,
      });
      setResult(res);
      setStep(3);
    } catch (e: any) {
      setResult({ error: e?.message || 'submission failed' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl space-y-3">
        <div className="flex items-center gap-2 px-1 text-[10px] sm:text-xs">
          <TopStep num={1} label="Register" done />
          <div className="h-px flex-1 bg-gradient-to-r from-[#38C878] to-white/10" />
          <TopStep num={2} label="PSS Verify" active />
          <div className="h-px flex-1 bg-white/10" />
          <TopStep num={3} label="Explore" />
        </div>

        <PlasticCard className="p-6 sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">
                Step 2 of 3 · ~ 2 minutes
              </div>
              <h1 className="mt-2 text-xl font-bold sm:text-2xl">Verify your identity</h1>
              <p className="mt-1 text-xs text-white/50 sm:text-sm">
                PSS unlocks STL L3 — the foundation for trust on EHB.
              </p>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-2 w-8 rounded-full transition ${
                    step >= n ? 'bg-purple' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-4">
              <FieldWithHint
                label="Document type"
                required
                hint="We cross-check with government databases (NADRA for CNIC). Pick what you have on hand."
              >
                <div className="flex flex-wrap gap-2">
                  {['CNIC', 'Passport', 'Driver License'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDocType(t)}
                      className={`rounded-chip border px-4 py-2 text-xs ${
                        docType === t
                          ? 'border-purple-light bg-purple/20 text-white'
                          : 'border-glass text-white/60 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </FieldWithHint>

              <FieldWithHint
                label="Document number"
                required
                hint={
                  docType === 'CNIC'
                    ? '13-digit NADRA ID (e.g. 12345-1234567-1). Stored masked — only first 2 + last 2 chars visible later.'
                    : 'Your passport / license number. Stored masked for privacy.'
                }
              >
                <input
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base outline-none sm:text-sm"
                  placeholder={docType === 'CNIC' ? '12345-6789012-3' : 'AB1234567'}
                />
              </FieldWithHint>

              <div className="rounded-card border border-glass bg-nested/60 p-3 text-[11px] text-white/60">
                🔒 What we do: OCR extract → AML / sanctions check → confidence score. ≥ 0.9 = instant auto-approve.
              </div>

              <div className="flex justify-between">
                <Link
                  href="/how-it-works"
                  className="rounded-chip border border-glass px-3 py-2 text-xs text-white/60 hover:text-white"
                >
                  Why do I need this?
                </Link>
                <Button3D
                  variant="purple"
                  onClick={() => setStep(2)}
                  disabled={!docNumber || docNumber.length < 5}
                >
                  Next: Liveness →
                </Button3D>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="rounded-card border border-glass bg-nested p-6 text-center">
                <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple to-teal text-4xl shadow-lg">
                  {livenessOk ? '✅' : '📸'}
                </div>
                <div className="text-sm font-semibold text-white">
                  {livenessOk ? 'Liveness captured' : 'Capture liveness'}
                </div>
                <div className="mt-1 text-xs text-white/60">
                  In production: 3-sec video selfie, face matched against document photo.
                </div>
                <button
                  onClick={() => setLivenessOk(true)}
                  className={`mt-4 rounded-chip border px-4 py-2 text-sm ${
                    livenessOk
                      ? 'border-[#38C878]/40 bg-[#38C878]/15 text-[#38C878]'
                      : 'border-glass bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  {livenessOk ? '✓ Captured' : 'Simulate liveness capture'}
                </button>
              </div>

              <div className="rounded-card border border-glass bg-nested/60 p-3 text-[11px] text-white/60">
                💡 <b>Why liveness?</b> Prevents someone uploading just a photo of a stolen ID.
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-chip border border-glass px-3 py-2 text-xs"
                >
                  ← Back
                </button>
                <Button3D variant="green" onClick={submit} disabled={!livenessOk || submitting}>
                  {submitting ? 'Submitting…' : 'Submit for verification'}
                </Button3D>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              {result?.error ? (
                <div className="rounded-card border border-[#F05858]/40 bg-[#F05858]/10 p-4 text-sm text-[#F05858]">
                  {result.error}
                </div>
              ) : (
                <>
                  <div className="rounded-card border border-[#38C878]/30 bg-[#38C878]/10 p-5 text-center">
                    <div className="text-4xl">🎉</div>
                    <div className="mt-2 text-lg font-semibold">PSS verified!</div>
                    <div className="mt-1 text-sm text-white/60">
                      Your starting STL has been calculated.
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-card border border-glass bg-nested p-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-white/40">
                        Your starting STL
                      </div>
                      <div className="mt-1 text-sm text-white/70">
                        PSS L{result?.pss?.level ?? 3} · CRB L0 · DMO L2
                      </div>
                    </div>
                    <StlBadge level={result?.stl?.level ?? 3} size="lg" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Chip tone="purple">PSS verified</Chip>
                    <Chip tone="warn">CRB pending — take exam to raise</Chip>
                    <Chip tone="teal">Eligible for Sub L1 franchise</Chip>
                  </div>

                  <div className="mt-4">
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      What to do next
                    </div>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <NextAction href="/gosellr" icon="🛒" title="Browse GoSellr" desc="Shop STL-ranked products" />
                      <NextAction href="/ai-marketplace" icon="🤖" title="Try AI Services" desc="7 modules · 3 free/day" />
                      <NextAction href="/crb/exams" icon="📜" title="Take CRB exam" desc="Raise STL to L5+" />
                      <NextAction href="/affiliate" icon="🤝" title="Join Affiliate" desc="Earn from referrals" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button3D variant="purple" onClick={() => router.push('/dmo')}>
                      Open DMO Dashboard →
                    </Button3D>
                  </div>
                </>
              )}
            </div>
          ) : null}

          {user ? (
            <div className="mt-6 border-t border-glass pt-4 text-xs text-white/40">
              Signed in as {user.email}
            </div>
          ) : null}
        </PlasticCard>

        {step < 3 ? (
          <PlasticCard className="p-4 text-xs">
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              PSS level → what it unlocks
            </div>
            <ul className="mt-2 space-y-1.5 text-white/70">
              <li className="flex items-start gap-2">
                <Chip tone="purple">L1</Chip>
                <span className="text-white/60">Browse only, no buying</span>
              </li>
              <li className="flex items-start gap-2">
                <Chip tone="teal">L3 NORMAL</Chip>
                <span className="text-white/60">Buy with escrow, file complaints, AI services — today's goal</span>
              </li>
              <li className="flex items-start gap-2">
                <Chip tone="amber">L5 ADVANCED</Chip>
                <span className="text-white/60">Full seller tools, list services, franchise eligible</span>
              </li>
            </ul>
          </PlasticCard>
        ) : null}
      </div>
    </main>
  );
}

function TopStep({ num, label, active, done }: { num: number; label: string; active?: boolean; done?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
          done
            ? 'bg-[#38C878] text-white'
            : active
              ? 'bg-gradient-to-br from-[#7B6EF6] to-[#A098F8] text-white'
              : 'bg-white/10 text-white/50'
        }`}
      >
        {done ? '✓' : num}
      </div>
      <span className={active || done ? 'text-white/90' : 'text-white/40'}>{label}</span>
    </div>
  );
}

function NextAction({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="rounded-card border border-glass bg-nested/60 p-3 transition hover:border-purple-light"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <div>
          <div className="text-xs font-semibold">{title}</div>
          <div className="mt-0.5 text-[10px] text-white/50">{desc}</div>
        </div>
      </div>
    </Link>
  );
}
