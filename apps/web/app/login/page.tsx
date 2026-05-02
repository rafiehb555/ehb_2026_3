'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      router.push('/dmo');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <PlasticCard className="w-full max-w-md p-8">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-teal">EHB Technologies</div>
          <h1 className="mt-2 text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-white/50">Login to access DMO and your workspace</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base outline-none ring-purple/40 focus:ring-2 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base outline-none ring-purple/40 focus:ring-2 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          {error ? (
            <div className="rounded-input border border-[#F05858]/40 bg-[#F05858]/10 px-3 py-2 text-xs text-[#F05858]">
              {error}
            </div>
          ) : null}
          <Button3D type="submit" variant="purple" size="lg" className="w-full" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </Button3D>
          <div className="pt-2 text-center text-xs text-white/40">
            New to EHB?{' '}
            <Link href="/register" className="text-purple-light hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </PlasticCard>
    </main>
  );
}
