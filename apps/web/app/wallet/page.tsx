'use client';

/**
 * EHB Wallet Page — v3.3 Phase 1 MVP
 *
 * Spec: ehb-info/departments/Affiliate.md §13.6 (v3.3)
 * Founder lock: 2026-04-26
 *
 * Dual-wallet view:
 *   - Main Wallet:      EHBGC + USD (existing wallet model)
 *   - Affiliate Wallet: USDT + EHBGC (80/20 default split)
 *
 * Phase 1 MVP supports:
 *   ✓ View both balances
 *   ✓ Internal transfer Affiliate → Main (FREE, instant)
 *   ✓ Transaction history
 *
 * Phase 2 will add:
 *   - USDT TRC20 deposit / withdrawal
 *   - Bank deposit / withdrawal (PK first)
 *   - Main → Affiliate transfer (re-deposit)
 *   - KYC tier checks
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { KpiCard } from '@/components/ui/kpi-card';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

interface MainWallet {
  userId?: string;
  ehbgcBalance?: number;
  ehbgcLocked?: number;
  usdBalance?: number;
  locks?: any[];
}

interface AffiliateWalletBalance {
  userId?: string;
  balances?: { usdt?: number; ehbgc?: number };
  pendingHold?: number;
  availableUsd?: number;
  totalUsd?: number;
  stats?: {
    lifetimeCreditedUsd?: number;
    lifetimeWithdrawnUsd?: number;
    thisMonthCreditedUsd?: number;
    monthAnchor?: string;
  };
  settings?: { payoutMix?: { usdtPercent?: number; ehbgcPercent?: number } };
  status?: string;
  lastCreditedAt?: string;
}

interface WalletTxn {
  _id: string;
  type: string;
  amount?: number;
  currency?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
  fromUserId?: string;
  toUserId?: string;
  referenceType?: string;
}

export default function WalletPage() {
  const { user } = useAuth();
  const [main, setMain] = useState<MainWallet | null>(null);
  const [aff, setAff] = useState<AffiliateWalletBalance | null>(null);
  const [txns, setTxns] = useState<WalletTxn[]>([]);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferring, setTransferring] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  async function load() {
    if (!user) return;
    try {
      const [m, a, t] = await Promise.all([
        api.get('/api/wallet/balance').catch(() => null),
        api.get('/api/wallet/affiliate/balance').catch(() => null),
        api.get('/api/wallet/affiliate/transactions').catch(() => ({ transactions: [] })),
      ]);
      setMain(m as MainWallet);
      setAff(a as AffiliateWalletBalance);
      setTxns((t as any)?.transactions || []);
    } catch (e: any) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, [user]);

  async function handleTransfer() {
    const amt = Number(transferAmount);
    if (!amt || amt <= 0) {
      setMsg({ type: 'err', text: 'Enter a valid amount' });
      return;
    }
    setTransferring(true);
    setMsg(null);
    try {
      const r = await api.post('/api/wallet/affiliate/transfer-to-main', { amountUsd: amt });
      setMsg({
        type: 'ok',
        text: `✓ Transferred $${amt.toFixed(2)} to Main Wallet (USDT $${r.fromUsdt?.toFixed(2)} + EHBGC $${r.fromEhbgc?.toFixed(2)})`,
      });
      setTransferAmount('');
      load();
    } catch (e: any) {
      setMsg({ type: 'err', text: e?.message || 'Transfer failed' });
    } finally {
      setTransferring(false);
    }
  }

  if (!user) {
    return (
      <>
        <PublicNav />
        <main className="flex min-h-screen items-center justify-center p-6">
          <PlasticCard className="max-w-md p-8 text-center">
            <div className="text-5xl">💰</div>
            <h2 className="mt-4 text-xl font-semibold">Sign in to view wallet</h2>
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

  const affTotal = aff?.totalUsd ?? ((aff?.balances?.usdt || 0) + (aff?.balances?.ehbgc || 0));

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
                    background: 'linear-gradient(135deg, #2BBFA0, #7B6EF6)',
                    boxShadow: '0 12px 40px rgba(43,191,160,0.4)',
                  }}
                >
                  💰
                </div>
                <div className="min-w-0 flex-1">
                  <Chip tone="purple">EHB Wallet v3.3 · Phase 1 MVP</Chip>
                  <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Your dual wallet</h1>
                  <p className="mt-2 text-sm text-white/70">
                    <strong className="text-teal">Main Wallet</strong> for shopping/franchise/STL ·{' '}
                    <strong className="text-purple-light">Affiliate Wallet</strong> for earnings.
                    Transfer between them — FREE & instant.
                  </p>
                </div>
              </div>
            </div>
          </PlasticCard>

          {/* Two wallet cards side by side */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {/* MAIN WALLET */}
            <PlasticCard className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Chip tone="ok">Main Wallet</Chip>
                  <h3 className="mt-1 text-lg font-semibold">For spending</h3>
                </div>
                <div className="text-3xl">🏦</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-card border border-glass bg-nested/60 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/40">EHBGC Balance</div>
                  <div className="mt-1 text-xl font-bold tabular-nums text-teal">
                    {(main?.ehbgcBalance ?? 0).toFixed(2)}
                  </div>
                </div>
                <div className="rounded-card border border-glass bg-nested/60 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/40">USD Balance</div>
                  <div className="mt-1 text-xl font-bold tabular-nums">
                    ${(main?.usdBalance ?? 0).toFixed(2)}
                  </div>
                </div>
                <div className="col-span-2 rounded-card border border-amber/30 bg-amber/5 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-amber">EHBGC Locked</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-bold tabular-nums text-amber">
                      {(main?.ehbgcLocked ?? 0).toFixed(2)}
                    </span>
                    <span className="text-[11px] text-white/50">
                      ({main?.locks?.length || 0} active locks)
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-white/40">
                💡 Used for: GoSellr purchases, STL upgrade locks, franchise unlock locks.
              </p>
            </PlasticCard>

            {/* AFFILIATE WALLET */}
            <PlasticCard className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Chip tone="purple">Affiliate Wallet</Chip>
                  <h3 className="mt-1 text-lg font-semibold">For earnings</h3>
                </div>
                <div className="text-3xl">🤝</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-card border border-glass bg-nested/60 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/40">USDT-equivalent</div>
                  <div className="mt-1 text-xl font-bold tabular-nums text-teal">
                    ${(aff?.balances?.usdt ?? 0).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-white/40">
                    ({aff?.settings?.payoutMix?.usdtPercent ?? 80}%)
                  </div>
                </div>
                <div className="rounded-card border border-glass bg-nested/60 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/40">EHBGC</div>
                  <div className="mt-1 text-xl font-bold tabular-nums text-purple-light">
                    {(aff?.balances?.ehbgc ?? 0).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-white/40">
                    ({aff?.settings?.payoutMix?.ehbgcPercent ?? 20}%)
                  </div>
                </div>
                <div className="col-span-2 rounded-card border border-teal/30 bg-teal/5 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-teal">Total available</div>
                  <div className="mt-1 text-2xl font-bold tabular-nums text-teal">
                    ${affTotal.toFixed(2)}
                  </div>
                  {(aff?.pendingHold ?? 0) > 0 ? (
                    <div className="mt-1 text-[11px] text-white/50">
                      Pending hold: ${(aff?.pendingHold ?? 0).toFixed(2)}
                    </div>
                  ) : null}
                </div>
              </div>
              <p className="mt-3 text-[11px] text-white/40">
                💡 Hybrid 80% USDT + 20% EHBGC default. Earnings credit here automatically.
              </p>
              {aff?.status && aff.status !== 'active' ? (
                <Chip tone="warn">⚠️ {aff.status}</Chip>
              ) : null}
            </PlasticCard>
          </div>

          {/* Transfer card */}
          <PlasticCard className="mt-4 p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Internal transfer (FREE · instant)
            </div>
            <h3 className="mt-1 text-lg font-semibold">Affiliate Wallet → Main Wallet</h3>
            <p className="mt-1 text-xs text-white/60">
              Move earnings to Main Wallet so you can use them for shopping, franchise, or STL upgrade.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Amount in USD"
                className="flex-1 rounded-input border border-glass bg-nested px-3 py-2.5 text-sm sm:max-w-xs"
                disabled={transferring || affTotal === 0}
              />
              <Button3D
                variant="teal"
                size="md"
                onClick={handleTransfer}
                disabled={transferring || affTotal === 0 || !transferAmount}
              >
                {transferring ? 'Transferring…' : 'Transfer →'}
              </Button3D>
              {affTotal > 0 ? (
                <button
                  onClick={() => setTransferAmount(affTotal.toFixed(2))}
                  className="rounded-chip border border-glass bg-card/60 px-3 py-2 text-xs hover:border-teal"
                >
                  Max ${affTotal.toFixed(2)}
                </button>
              ) : null}
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
            <p className="mt-3 text-[10px] text-white/40">
              Phase 2 unlocks: USDT TRC20 withdrawal · Bank deposit/withdrawal · Main → Affiliate
              re-deposit.
            </p>
          </PlasticCard>

          {/* Stats KPIs */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <KpiCard
              label="Lifetime credited"
              value={`$${(aff?.stats?.lifetimeCreditedUsd ?? 0).toFixed(2)}`}
              tone="ok"
              icon="📈"
            />
            <KpiCard
              label="This month"
              value={`$${(aff?.stats?.thisMonthCreditedUsd ?? 0).toFixed(2)}`}
              tone="amber"
              icon="📅"
            />
            <KpiCard
              label="Lifetime withdrawn"
              value={`$${(aff?.stats?.lifetimeWithdrawnUsd ?? 0).toFixed(2)}`}
              tone="purple"
              icon="💸"
            />
          </div>

          {/* Transaction history */}
          <PlasticCard className="mt-4 p-0">
            <div className="border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Transaction history
              </div>
              <h3 className="mt-1 text-sm font-semibold sm:text-lg">Recent wallet activity</h3>
            </div>
            {txns.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/50">
                No transactions yet. Earnings will appear here as you refer users and they make purchases.
              </div>
            ) : (
              <ul className="divide-y divide-white/5">
                {txns.slice(0, 20).map((t) => (
                  <li key={t._id} className="flex flex-wrap items-center gap-3 p-4">
                    <Chip
                      tone={
                        t.type === 'affiliate_commission_credit'
                          ? 'ok'
                          : t.type === 'affiliate_to_main_transfer'
                          ? 'purple'
                          : t.type === 'affiliate_clawback'
                          ? 'warn'
                          : undefined
                      }
                    >
                      {t.type.replace(/_/g, ' ')}
                    </Chip>
                    <div className="min-w-0 flex-1 text-xs text-white/60">
                      {t.notes || t.referenceType || ''}
                      <span className="ml-2 text-[10px] text-white/40">
                        {t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-bold tabular-nums ${
                        t.type === 'affiliate_to_main_transfer' || t.type === 'affiliate_clawback'
                          ? 'text-amber'
                          : 'text-teal'
                      }`}
                    >
                      {t.type === 'affiliate_to_main_transfer' || t.type === 'affiliate_clawback'
                        ? '−'
                        : '+'}
                      ${(t.amount ?? 0).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </PlasticCard>

          {/* Phase 2 preview */}
          <PlasticCard className="mt-4 p-5">
            <div className="text-[10px] uppercase tracking-widest text-amber sm:text-xs">
              Coming soon · Phase 2
            </div>
            <h3 className="mt-1 text-lg font-semibold">Withdrawal & deposit</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-card border border-glass bg-nested/40 p-3">
                <div className="text-2xl">💱</div>
                <div className="mt-2 text-sm font-semibold">USDT (TRC20)</div>
                <div className="text-[11px] text-white/60">
                  Withdraw to any TRON address. $1 flat fee. &lt;1 min settlement.
                </div>
              </div>
              <div className="rounded-card border border-glass bg-nested/40 p-3">
                <div className="text-2xl">🏦</div>
                <div className="mt-2 text-sm font-semibold">Bank Deposit/Withdraw</div>
                <div className="text-[11px] text-white/60">
                  JazzCash + HBL (Pakistan first). Then UAE / India / UK / USA in Phase 3.
                </div>
              </div>
              <div className="rounded-card border border-glass bg-nested/40 p-3">
                <div className="text-2xl">🔐</div>
                <div className="mt-2 text-sm font-semibold">KYC Tiers</div>
                <div className="text-[11px] text-white/60">
                  Tier 0 sandbox → Tier 4 institutional. Higher tier = higher limits.
                </div>
              </div>
            </div>
          </PlasticCard>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
