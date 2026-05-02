'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { FieldWithHint } from '@/components/ui/field-with-hint';
import { Chip } from '@/components/ui/chip';

const SAMPLE = {
  name: 'Ahmed Raza',
  email: 'ahmed.demo@ehb.test',
  password: 'demo1234',
};

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await register(email, password, name);
      router.push('/pss');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  }

  function autofill() {
    setName(SAMPLE.name);
    setEmail(SAMPLE.email);
    setPassword(SAMPLE.password);
  }

  const canSubmit = email.length > 3 && password.length >= 6;
  const strength =
    password.length === 0 ? 0 : password.length < 6 ? 25 : password.length < 10 ? 60 : 100;

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-3">
        {/* Stepper */}
        <div className="flex items-center gap-2 px-1 text-[10px] sm:text-xs">
          <Step num={1} label="Register" active />
          <div className="h-px flex-1 bg-white/10" />
          <Step num={2} label="PSS Verify" />
          <div className="h-px flex-1 bg-white/10" />
          <Step num={3} label="Explore" />
        </div>

        <PlasticCard className="p-6 sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">
                Step 1 of 3 · 30 seconds
              </div>
              <h1 className="mt-2 text-xl font-bold sm:text-2xl">Create your EHB account</h1>
              <p className="mt-1 text-xs text-white/50 sm:text-sm">
                Next: PSS verification (KYC) to unlock STL L3 and start transacting.
              </p>
            </div>
            <Chip tone="purple">Step 1</Chip>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <FieldWithHint
              label="Full name"
              hint="Shown on your profile. Must match your identity documents for PSS verification."
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ahmed Raza"
                className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base outline-none ring-purple/40 focus:ring-2 sm:text-sm"
              />
            </FieldWithHint>

            <FieldWithHint
              label="Email"
              required
              hint="Used for login, notifications, and escrow receipts. We never share it. OTP verification in PSS step."
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base outline-none ring-purple/40 focus:ring-2 sm:text-sm"
              />
            </FieldWithHint>

            <FieldWithHint
              label="Password"
              required
              hint="Min 6 characters. Hashed with bcrypt — we never see the plain text. Used with email for login only."
            >
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="at least 6 characters"
                className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base outline-none ring-purple/40 focus:ring-2 sm:text-sm"
              />
              {password.length > 0 ? (
                <div className="mt-2">
                  <div className="h-1 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip transition-all"
                      style={{
                        width: `${strength}%`,
                        background:
                          strength < 50
                            ? '#F05858'
                            : strength < 100
                              ? '#F0A030'
                              : '#38C878',
                      }}
                    />
                  </div>
                  <div className="mt-1 text-[10px] text-white/50">
                    {strength < 50 ? 'Weak' : strength < 100 ? 'Good' : 'Strong'} — {password.length} chars
                  </div>
                </div>
              ) : null}
            </FieldWithHint>

            {error ? (
              <div className="rounded-input border border-[#F05858]/40 bg-[#F05858]/10 px-3 py-2 text-xs text-[#F05858]">
                {error}
              </div>
            ) : null}

            <Button3D type="submit" variant="purple" size="lg" className="w-full" disabled={busy || !canSubmit}>
              {busy ? 'Creating…' : 'Create Account →'}
            </Button3D>

            <button
              type="button"
              onClick={autofill}
              className="block w-full text-center text-[11px] text-white/40 hover:text-purple-light"
            >
              💡 Autofill sample data for demo
            </button>

            <div className="pt-2 text-center text-xs text-white/40">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-light hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </PlasticCard>

        {/* Why register */}
        <PlasticCard className="p-4 text-xs">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            What registering unlocks
          </div>
          <ul className="mt-2 space-y-1 text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-[#38C878]">✓</span>
              <span>Browse GoSellr + 38 industries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#38C878]">✓</span>
              <span>Access to AI Marketplace (3 free invocations/day)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#38C878]">✓</span>
              <span>Get a referral code for Affiliate Program</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/40">→</span>
              <span className="text-white/50">
                PSS step unlocks buying, selling, filing complaints, earning
              </span>
            </li>
          </ul>
        </PlasticCard>
      </div>
    </main>
  );
}

function Step({ num, label, active }: { num: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
          active ? 'bg-gradient-to-br from-[#7B6EF6] to-[#A098F8] text-white' : 'bg-white/10 text-white/50'
        }`}
      >
        {num}
      </div>
      <span className={active ? 'text-white/90' : 'text-white/40'}>{label}</span>
    </div>
  );
}
