'use client';

import { useState } from 'react';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB DMO — Product Moderation Queue (Visily prototype screen #7)
 *
 * Admin page for product submission review (separate from fraud DMO queue).
 * Shows: queue + selected product detail with risk assessment + seller profile + sales data.
 */

interface ProductSubmission {
  id: string;
  productCode: string;
  title: string;
  industry: string;
  category: string;
  priceUsd: number;
  proposedAffilRate: number;
  status: 'pending' | 'review' | 'flag' | 'approved' | 'rejected';
  submittedAt: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  riskFactors: string[];
  seller: {
    name: string;
    handle: string;
    rating: number;
    salesTotal: number;
    accountAge: string;
    stl: string;
    crb: string;
  };
  saleSeries?: { period: string; sales: number; refunds: number }[];
  notes?: string;
}

const SUBMISSIONS: ProductSubmission[] = [
  {
    id: '1',
    productCode: 'PROD-8821',
    title: 'Quantum Health Optimizer Plus + Master Series',
    industry: 'WMS',
    category: 'Health',
    priceUsd: 2999,
    proposedAffilRate: 25,
    status: 'pending',
    submittedAt: '2 hours ago',
    riskLevel: 'high',
    riskScore: 78,
    riskFactors: [
      'Health claims require FDA disclaimer',
      'Price 3× category median ($999)',
      'Affiliate rate 25% (high for category)',
      'Product images contain "guaranteed cure" text',
    ],
    seller: {
      name: 'WellnessLab Inc',
      handle: 'wellnesslab',
      rating: 4.2,
      salesTotal: 1240,
      accountAge: '8 months',
      stl: 'L5',
      crb: 'L7',
    },
    saleSeries: [
      { period: 'Apr 2026', sales: 142, refunds: 8 },
      { period: 'Mar 2026', sales: 98, refunds: 4 },
      { period: 'Feb 2026', sales: 67, refunds: 2 },
    ],
    notes: 'Reviewer note: Health claims need legal/medical review. Sale of 1240 in 8 months reasonable. Price tier is concerning.',
  },
  {
    id: '2',
    productCode: 'PROD-8822',
    title: 'Crypto Wealth Accelerator: Tier 7',
    industry: 'FIN',
    category: 'Finance',
    priceUsd: 4999,
    proposedAffilRate: 30,
    status: 'review',
    submittedAt: '4 hours ago',
    riskLevel: 'high',
    riskScore: 92,
    riskFactors: [
      'Investment guarantee language detected',
      'No SECP financial advisor license attached',
      'Price 5× category median',
      'Affiliate rate 30% suggests recruitment-heavy',
    ],
    seller: {
      name: 'CryptoKing Trading',
      handle: 'cryptoking',
      rating: 3.8,
      salesTotal: 47,
      accountAge: '2 months',
      stl: 'L3',
      crb: 'L4',
    },
    saleSeries: [
      { period: 'Apr 2026', sales: 12, refunds: 3 },
      { period: 'Mar 2026', sales: 35, refunds: 8 },
    ],
    notes: 'High refund rate (15%+). Forbidden phrases in product description. Seller account is new.',
  },
  {
    id: '3',
    productCode: 'PROD-8823',
    title: 'Premium Tax Compliance Module 2026',
    industry: 'OLS',
    category: 'Legal',
    priceUsd: 199,
    proposedAffilRate: 20,
    status: 'pending',
    submittedAt: '6 hours ago',
    riskLevel: 'low',
    riskScore: 18,
    riskFactors: [
      'Standard pricing for category',
      'Established seller (3 years)',
      'CRB-verified legal credentials',
    ],
    seller: {
      name: 'LegalTech Pro',
      handle: 'legaltechpro',
      rating: 4.7,
      salesTotal: 8420,
      accountAge: '3 years',
      stl: 'L7',
      crb: 'L9',
    },
    saleSeries: [
      { period: 'Apr 2026', sales: 421, refunds: 6 },
      { period: 'Mar 2026', sales: 380, refunds: 4 },
    ],
  },
  {
    id: '4',
    productCode: 'PROD-8824',
    title: 'Online Business School — Annual Pro',
    industry: 'OBS',
    category: 'Education',
    priceUsd: 299,
    proposedAffilRate: 15,
    status: 'pending',
    submittedAt: '12 hours ago',
    riskLevel: 'medium',
    riskScore: 35,
    riskFactors: [
      'Income guarantee claims need disclaimer',
      'Standard category pricing',
      'Long-tenure seller',
    ],
    seller: {
      name: 'EduGrow Academy',
      handle: 'edugrow',
      rating: 4.5,
      salesTotal: 3120,
      accountAge: '2 years',
      stl: 'L6',
      crb: 'L8',
    },
    saleSeries: [
      { period: 'Apr 2026', sales: 142, refunds: 4 },
      { period: 'Mar 2026', sales: 98, refunds: 2 },
    ],
  },
];

const RISK_TONE: Record<ProductSubmission['riskLevel'], 'ok' | 'warn' | 'fail'> = {
  low: 'ok',
  medium: 'warn',
  high: 'fail',
};

export default function ProductModerationPage() {
  const [selected, setSelected] = useState(SUBMISSIONS[0]);
  const [actionTaken, setActionTaken] = useState<string | null>(null);

  function takeAction(action: 'approve' | 'reject' | 'flag') {
    setActionTaken(action);
    setTimeout(() => setActionTaken(null), 2500);
  }

  return (
    <>
      <DmoTopbar
        title="Product Moderation Queue"
        subtitle="Review pending product submissions before they go live on the marketplace"
        breadcrumb={['Operations', 'Product Moderation']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* KPIs */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Pending Review"
            value={SUBMISSIONS.filter((s) => s.status === 'pending').length}
            delta="Avg SLA: 48h"
            tone="amber"
            icon="⏳"
          />
          <KpiCard
            label="High Risk"
            value={SUBMISSIONS.filter((s) => s.riskLevel === 'high').length}
            delta="Requires manual review"
            tone="fail"
            icon="🚨"
          />
          <KpiCard
            label="Approved Today"
            value="24"
            delta="↑ 18% vs yesterday"
            tone="ok"
            icon="✅"
          />
          <KpiCard
            label="Auto-flagged"
            value="6"
            delta="By AI risk engine"
            tone="purple"
            icon="🤖"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[380px,1fr]">
          {/* Queue list */}
          <PlasticCard className="overflow-hidden">
            <div className="border-b border-glass px-4 py-3">
              <h3 className="text-sm font-semibold">{SUBMISSIONS.length} pending</h3>
            </div>
            <div className="divide-y divide-glass">
              {SUBMISSIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`flex w-full items-start gap-3 p-3 text-left transition ${
                    selected.id === s.id ? 'bg-purple-light/10' : 'hover:bg-card/30'
                  }`}
                >
                  <Chip tone={RISK_TONE[s.riskLevel]}>{s.riskScore}</Chip>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-white/40">{s.productCode}</div>
                    <div className="mt-0.5 truncate text-sm font-medium">{s.title}</div>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-white/50">
                      <Chip tone="purple">{s.industry}</Chip>
                      <span>${s.priceUsd}</span>
                      <span>·</span>
                      <span>{s.proposedAffilRate}% affil</span>
                    </div>
                    <div className="mt-1 text-[9px] text-white/40">{s.submittedAt}</div>
                  </div>
                </button>
              ))}
            </div>
          </PlasticCard>

          {/* Detail view */}
          <div className="space-y-4">
            {/* Header */}
            <PlasticCard className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-white/50">{selected.productCode}</span>
                    <Chip tone="purple">{selected.industry}</Chip>
                    <Chip tone={RISK_TONE[selected.riskLevel]}>{selected.riskLevel} risk</Chip>
                  </div>
                  <h2 className="mt-2 text-xl font-bold">{selected.title}</h2>
                  <div className="mt-1 flex flex-wrap items-baseline gap-3 text-sm text-white/60">
                    <span>
                      Price: <strong className="text-teal">${selected.priceUsd.toLocaleString()}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Affiliate rate: <strong className="text-amber">{selected.proposedAffilRate}%</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button3D
                    variant="green"
                    size="sm"
                    onClick={() => takeAction('approve')}
                    disabled={!!actionTaken}
                  >
                    {actionTaken === 'approve' ? '✓ Approved' : '✓ Approve'}
                  </Button3D>
                  <Button3D
                    variant="gold"
                    size="sm"
                    onClick={() => takeAction('flag')}
                    disabled={!!actionTaken}
                  >
                    {actionTaken === 'flag' ? '⚑ Flagged' : '⚑ Flag for Review'}
                  </Button3D>
                  <Button3D
                    variant="red"
                    size="sm"
                    onClick={() => takeAction('reject')}
                    disabled={!!actionTaken}
                  >
                    {actionTaken === 'reject' ? '✗ Rejected' : '✗ Reject'}
                  </Button3D>
                </div>
              </div>
            </PlasticCard>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Risk assessment */}
              <PlasticCard className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  🤖 Automated Risk Assessment
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">Risk Score</h3>
                  <span
                    className={`text-3xl font-bold tabular-nums ${
                      selected.riskScore >= 70
                        ? 'text-red-400'
                        : selected.riskScore >= 40
                        ? 'text-amber'
                        : 'text-teal'
                    }`}
                  >
                    {selected.riskScore}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-nested">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${selected.riskScore}%`,
                      background:
                        selected.riskScore >= 70
                          ? '#F05858'
                          : selected.riskScore >= 40
                          ? '#F0A030'
                          : '#2BBFA0',
                    }}
                  />
                </div>

                <div className="mt-4 space-y-1.5">
                  {selected.riskFactors.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded border border-glass bg-card/40 p-2 text-[11px]"
                    >
                      <span className="text-white/40">•</span>
                      <span className="text-white/70">{f}</span>
                    </div>
                  ))}
                </div>
              </PlasticCard>

              {/* Seller profile */}
              <PlasticCard className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  👤 Seller Profile
                </div>
                <h3 className="mt-2 text-lg font-semibold">{selected.seller.name}</h3>
                <div className="text-xs text-white/50">@{selected.seller.handle}</div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded border border-glass bg-card/40 p-2 text-center">
                    <div className="text-[9px] text-white/40">RATING</div>
                    <div className="mt-0.5 text-base font-bold tabular-nums text-amber">
                      ⭐ {selected.seller.rating}
                    </div>
                  </div>
                  <div className="rounded border border-glass bg-card/40 p-2 text-center">
                    <div className="text-[9px] text-white/40">TOTAL SALES</div>
                    <div className="mt-0.5 text-base font-bold tabular-nums text-teal">
                      {selected.seller.salesTotal.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded border border-glass bg-card/40 p-2 text-center">
                    <div className="text-[9px] text-white/40">ACCOUNT AGE</div>
                    <div className="mt-0.5 text-sm font-bold">{selected.seller.accountAge}</div>
                  </div>
                  <div className="rounded border border-glass bg-card/40 p-2 text-center">
                    <div className="text-[9px] text-white/40">TRUST</div>
                    <div className="mt-0.5 text-sm font-bold">
                      <Chip tone="purple">STL {selected.seller.stl}</Chip>
                      <span className="ml-1">
                        <Chip tone="ok">CRB {selected.seller.crb}</Chip>
                      </span>
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-card border border-glass bg-card/60 py-2 text-xs hover:border-purple-light">
                  View seller history →
                </button>
              </PlasticCard>
            </div>

            {/* Sale series */}
            {selected.saleSeries && selected.saleSeries.length > 0 && (
              <PlasticCard className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  📊 Sale Series
                </div>
                <h3 className="mt-1 text-lg font-semibold">Historical performance</h3>

                <div className="mt-4 grid gap-2">
                  {selected.saleSeries.map((s, i) => {
                    const refundRate = s.sales > 0 ? (s.refunds / s.sales) * 100 : 0;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded border border-glass bg-card/40 p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">{s.period}</div>
                          <div className="mt-0.5 text-[10px] text-white/50">
                            {s.sales} sales · {s.refunds} refunds
                          </div>
                        </div>
                        <Chip
                          tone={refundRate > 10 ? 'fail' : refundRate > 5 ? 'warn' : 'ok'}
                        >
                          {refundRate.toFixed(1)}% refund rate
                        </Chip>
                      </div>
                    );
                  })}
                </div>
              </PlasticCard>
            )}

            {/* Moderation note */}
            {selected.notes && (
              <PlasticCard className="p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  📝 Moderation Reason / Internal Note
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{selected.notes}</p>
                <textarea
                  placeholder="Add your moderation note..."
                  rows={3}
                  className="mt-3 w-full rounded-card border border-glass bg-nested px-3 py-2 text-xs focus:border-purple-light focus:outline-none"
                />
              </PlasticCard>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
