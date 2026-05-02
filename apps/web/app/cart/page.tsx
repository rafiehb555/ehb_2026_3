'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { StlBadge } from '@/components/ui/stl-badge';

export default function CartPage() {
  const { items, remove, setQty, subtotal, clear } = useCart();
  const router = useRouter();
  const platformFee = subtotal * 0.02;
  const total = subtotal;

  return (
    <main className="min-h-screen py-4 sm:py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/gosellr" className="text-xs text-white/50 hover:text-white">
          ← Continue shopping
        </Link>
        <h1 className="mt-3 text-2xl font-bold sm:mt-4 sm:text-3xl">Your Cart</h1>

        <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {items.length === 0 ? (
              <PlasticCard className="p-10 text-center">
                <div className="text-5xl">🛒</div>
                <div className="mt-4 text-white/70">Your cart is empty.</div>
                <Link href="/gosellr" className="mt-4 inline-block text-sm text-purple-light hover:underline">
                  Browse marketplace →
                </Link>
              </PlasticCard>
            ) : (
              items.map((item) => (
                <PlasticCard key={item.productId} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-card bg-gradient-to-br from-purple/20 to-teal/10 text-3xl">
                      📦
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold">{item.title}</div>
                          <div className="text-xs text-white/40">
                            ${item.priceUsd} each
                          </div>
                        </div>
                        {item.productStl ? <StlBadge level={item.productStl} size="xs" /> : null}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setQty(item.productId, item.quantity - 1)}
                          className="h-7 w-7 rounded-chip border border-glass bg-nested text-xs hover:border-purple-light"
                        >
                          −
                        </button>
                        <div className="w-8 text-center text-sm tabular-nums">{item.quantity}</div>
                        <button
                          onClick={() => setQty(item.productId, item.quantity + 1)}
                          className="h-7 w-7 rounded-chip border border-glass bg-nested text-xs hover:border-purple-light"
                        >
                          +
                        </button>
                        <span className="ml-4 text-sm tabular-nums">
                          = ${(item.priceUsd * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => remove(item.productId)}
                          className="ml-auto text-xs text-white/40 hover:text-[#F05858]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </PlasticCard>
              ))
            )}
          </div>

          <div className="space-y-4">
            <PlasticCard className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/40">Order summary</div>
              <div className="mt-3 space-y-2 text-sm">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row label="Platform fee (2% info)" value={`$${platformFee.toFixed(2)}`} muted />
                <Row label="Shipping" value="free" muted />
                <div className="my-2 border-t border-glass" />
                <Row label="Total" value={`$${total.toFixed(2)}`} bold />
              </div>
              <Button3D
                variant="green"
                size="lg"
                className="mt-4 w-full"
                disabled={items.length === 0}
                onClick={() => router.push('/checkout')}
              >
                Checkout
              </Button3D>
              {items.length > 0 ? (
                <button
                  onClick={clear}
                  className="mt-3 block w-full text-xs text-white/40 hover:text-white/70"
                >
                  Clear cart
                </button>
              ) : null}
            </PlasticCard>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? 'text-white/40' : 'text-white/70'}>{label}</span>
      <span className={`${bold ? 'text-lg font-bold' : ''} tabular-nums`}>{value}</span>
    </div>
  );
}
