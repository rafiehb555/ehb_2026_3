'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function placeOrder() {
    setBusy(true);
    setError(null);
    try {
      const orderRes = await api.post('/api/orders', {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        deliveryAddress: address,
      });
      // Pay (locks escrow)
      await api.post(`/api/orders/${orderRes._id}/pay`);
      clear();
      router.push(`/orders/${orderRes._id}`);
    } catch (e: any) {
      setError(e?.message || 'Checkout failed');
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <PlasticCard className="max-w-md p-8 text-center">
          <h2 className="text-xl font-semibold">Sign in to checkout</h2>
          <p className="mt-2 text-sm text-white/60">
            You need an account so we can create your order and track delivery.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/login"
              className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm"
            >
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
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <PlasticCard className="max-w-md p-8 text-center">
          <div className="text-5xl">🛒</div>
          <h2 className="mt-4 text-xl font-semibold">Cart is empty</h2>
          <Link href="/gosellr" className="mt-3 inline-block text-sm text-purple-light">
            ← Browse marketplace
          </Link>
        </PlasticCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/cart" className="text-xs text-white/50 hover:text-white">
          ← Back to cart
        </Link>

        <PlasticCard className="mt-4 p-8">
          <div className="text-xs uppercase tracking-widest text-teal">Checkout</div>
          <h1 className="mt-2 text-2xl font-bold">Confirm & pay</h1>

          <div className="mt-6">
            <label className="mb-1 block text-xs text-white/70">Delivery address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="House #, street, city (e.g. F-10 Islamabad)"
              className="w-full resize-none rounded-input border border-glass bg-nested px-3 py-2 text-sm"
            />
          </div>

          <div className="mt-6 rounded-card border border-glass bg-nested p-4">
            <div className="text-xs uppercase tracking-widest text-white/40">Items</div>
            <ul className="mt-2 space-y-1 text-sm">
              {items.map((i) => (
                <li key={i.productId} className="flex items-center justify-between">
                  <span className="truncate">{i.title} × {i.quantity}</span>
                  <span className="tabular-nums">${(i.priceUsd * i.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-glass pt-3 flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 rounded-card border border-glass bg-card/40 p-3 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <Chip tone="warn">Escrow</Chip>
              <span>
                Funds (EHBGC-simulated) will be locked in escrow until you confirm delivery.
              </span>
            </div>
          </div>

          {error ? (
            <div className="mt-3 rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-3 text-xs text-[#F05858]">
              {error}
            </div>
          ) : null}

          <Button3D
            variant="green"
            size="lg"
            className="mt-5 w-full"
            onClick={placeOrder}
            disabled={busy || !address}
          >
            {busy ? 'Placing order…' : `Pay $${subtotal.toFixed(2)} & place order`}
          </Button3D>
        </PlasticCard>
      </div>
    </main>
  );
}
