'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { FieldWithHint } from '@/components/ui/field-with-hint';

const CATEGORIES = ['Food', 'Electronics', 'Apparel', 'Home', 'Accessories', 'Beauty', 'Fitness', 'Books', 'Other'];

export default function NewProductPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Food');
  const [priceUsd, setPriceUsd] = useState(50);
  const [stock, setStock] = useState(10);
  const [description, setDescription] = useState('');
  const [productStl, setProductStl] = useState(5);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [created, setCreated] = useState<any>(null);

  async function submit() {
    setBusy(true);
    setErr(null);
    try {
      const res = await api.post('/api/gosellr/products', {
        title,
        category,
        priceUsd,
        stock,
        description,
        productStl,
      });
      setCreated(res);
      setStep(4);
    } catch (e: any) {
      setErr(e?.message || 'Failed to create product');
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return (
      <>
        <PublicNav />
        <main className="flex min-h-screen items-center justify-center p-6">
          <PlasticCard className="max-w-md p-8 text-center">
            <h2 className="text-xl font-semibold">Sign in to list products</h2>
            <div className="mt-4 flex justify-center gap-2">
              <Link href="/login" className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm">Login</Link>
              <Link href="/register" className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-sm font-semibold">Register</Link>
            </div>
          </PlasticCard>
        </main>
        <PublicFooter />
      </>
    );
  }

  const sellerStl = user.stl?.level || 1;
  if (sellerStl < 4) {
    return (
      <>
        <PublicNav />
        <main className="flex min-h-screen items-center justify-center p-6">
          <PlasticCard className="max-w-md p-8 text-center">
            <div className="text-5xl">🔒</div>
            <h2 className="mt-4 text-xl font-semibold">STL L4 required</h2>
            <p className="mt-2 text-sm text-white/60">
              You're currently L{sellerStl}. Take a CRB exam or complete more transactions to raise your STL to L4 STANDARD.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Link href="/crb/exams"><Button3D size="sm" variant="blue">Take CRB exam</Button3D></Link>
              <Link href="/dmo/stl"><Button3D size="sm" variant="purple">View STL ladder</Button3D></Link>
            </div>
          </PlasticCard>
        </main>
        <PublicFooter />
      </>
    );
  }

  return (
    <>
      <PublicNav />
      <main className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Link href="/gosellr/sell" className="text-xs text-white/50 hover:text-white">
            ← Seller dashboard
          </Link>

          <PlasticCard className="mt-4 p-6 sm:p-8">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-teal sm:text-xs">
                  List product · Step {step} of 4
                </div>
                <h1 className="mt-2 text-xl font-bold sm:text-2xl">Create a listing</h1>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={`h-2 w-8 rounded-full ${step >= n ? 'bg-purple' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-4">
                <FieldWithHint
                  label="Product title"
                  required
                  hint="Clear, searchable. First 50 chars show in card grid. Include key terms buyers search."
                >
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Organic Basmati Rice 5kg"
                    className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base outline-none sm:text-sm"
                  />
                </FieldWithHint>

                <FieldWithHint
                  label="Category"
                  required
                  hint="Chosen category affects which buyers see your product and which CRB cert may be required."
                >
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`rounded-chip border px-3 py-1.5 text-xs ${
                          category === c
                            ? 'border-purple-light bg-purple/20 text-white'
                            : 'border-glass text-white/60'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </FieldWithHint>

                <div className="flex justify-end">
                  <Button3D variant="purple" onClick={() => setStep(2)} disabled={!title}>
                    Next: Pricing →
                  </Button3D>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <FieldWithHint
                  label="Price (USD)"
                  required
                  hint="2% platform fee. 70% lands in your wallet on confirmed delivery. You can edit later."
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-white/50">$</span>
                    <input
                      type="number"
                      value={priceUsd}
                      onChange={(e) => setPriceUsd(Number(e.target.value))}
                      className="flex-1 rounded-input border border-glass bg-nested px-3 py-2.5 text-base sm:text-sm"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-[11px] text-white/60">
                    <span>Your cut: <span className="text-[#38C878]">${(priceUsd * 0.7).toFixed(2)}</span></span>
                    <span>Platform fee: ${(priceUsd * 0.02).toFixed(2)}</span>
                  </div>
                </FieldWithHint>

                <FieldWithHint
                  label="Stock"
                  hint="How many units are available. Orders decrement this automatically."
                >
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base sm:text-sm"
                  />
                </FieldWithHint>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="rounded-chip border border-glass px-3 py-2 text-xs">← Back</button>
                  <Button3D variant="purple" onClick={() => setStep(3)} disabled={priceUsd <= 0}>
                    Next: Description →
                  </Button3D>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4">
                <FieldWithHint
                  label="Description"
                  hint="What makes this product special. Sourcing, materials, certifications. Good descriptions boost your product STL over time."
                >
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Hand-picked from local farms, vacuum-sealed, GMO-free..."
                    className="w-full resize-none rounded-input border border-glass bg-nested px-3 py-2.5 text-sm"
                  />
                </FieldWithHint>

                <FieldWithHint
                  label="Product STL (self-assessment)"
                  hint="How much trust does THIS product warrant? High-quality, premium brand = L7+. Standard = L5. Seller STL caps this (MIN-chain). DMO may adjust."
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={Math.min(sellerStl, 10)}
                      value={productStl}
                      onChange={(e) => setProductStl(Number(e.target.value))}
                      className="flex-1"
                    />
                    <StlBadge level={productStl} />
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">
                    Max: L{sellerStl} (your STL caps it)
                  </div>
                </FieldWithHint>

                <div className="rounded-card border border-glass bg-nested/60 p-3 text-[11px] text-white/60">
                  🔗 <b>MIN-chain preview:</b> Display STL = MIN(product L{productStl}, seller L{sellerStl}, company L8, owner L{sellerStl}) = <b className="text-white">L{Math.min(productStl, sellerStl, 8)}</b>
                </div>

                {err ? (
                  <div className="rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-2 text-xs text-[#F05858]">{err}</div>
                ) : null}

                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="rounded-chip border border-glass px-3 py-2 text-xs">← Back</button>
                  <Button3D variant="green" onClick={submit} disabled={busy}>
                    {busy ? 'Creating…' : 'Create listing'}
                  </Button3D>
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 text-center">
                <div className="text-5xl">🎉</div>
                <h2 className="text-2xl font-bold">Product listed!</h2>
                <p className="text-sm text-white/60">
                  Your product is live on GoSellr. Buyers can order now.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {created?.slug ? (
                    <Link href={`/gosellr/${created.slug}`}>
                      <Button3D variant="purple">View listing</Button3D>
                    </Link>
                  ) : null}
                  <Link href="/gosellr/sell">
                    <Button3D variant="blue">Back to dashboard</Button3D>
                  </Link>
                  <Link href="/gosellr/sell/new" onClick={() => {
                    setStep(1); setTitle(''); setPriceUsd(50); setStock(10); setDescription(''); setCreated(null);
                  }}>
                    <Button3D variant="green">+ List another</Button3D>
                  </Link>
                </div>
              </div>
            ) : null}
          </PlasticCard>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
