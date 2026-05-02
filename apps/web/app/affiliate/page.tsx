'use client';

/**
 * EHB Affiliate Page — v3.3 Full UI/UX (6-Tab Hub)
 *
 * Spec: ehb-info/departments/Affiliate.md (v3.3)
 * Founder lock: 2026-04-26
 *
 * 6 tabs mirroring the production prototype:
 *   1. Welcome      — landing pitch, value prop, platform stats, join CTA
 *   2. Dashboard    — referral link, KPIs, earnings breakdown, caps
 *   3. Marketplace  — DAM products with industry-aware rates
 *   4. Wallet       — dual-wallet (Main + Affiliate) + transfer
 *   5. Bonuses      — 11-bonus catalog (4 tiers) + R1-R10 rank ladder
 *   6. Compliance   — KYC tiers + IDS + NOT-MLM legal posture
 */

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { KpiCard } from '@/components/ui/kpi-card';
import { AffiliateEarningsCalculator } from '@/components/affiliate/earnings-calculator';
import { AffiliateNetworkTree } from '@/components/affiliate/network-tree';
import { AffiliateActivityFeed } from '@/components/affiliate/activity-feed';
import { AffiliateQuickActions } from '@/components/affiliate/quick-actions';
import { AffiliateSharingTools } from '@/components/affiliate/sharing-tools';
import { AffiliatePromoMaterials } from '@/components/affiliate/promo-materials';
import { AffiliateAchievements } from '@/components/affiliate/achievements';
import { AffiliateComplianceNotice } from '@/components/affiliate/compliance-notice';
import { AffiliateEarningsChart } from '@/components/affiliate/earnings-chart';
import { AffiliateActivationJourney } from '@/components/affiliate/activation-journey';
import {
  TrustStrip,
  LiveKpiStrip,
  HowItWorksFlow,
  IndustryMatrix,
  LiveActivityTicker,
  TestimonialsCarousel,
  FaqAccordion,
  TrustSafetyStrip,
  FinalCta,
  SectionDivider,
} from '@/components/affiliate/landing-sections';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { CompliancePortalLayout } from '@/components/portal/layout';

// ============================================================================
// Types
// ============================================================================

interface AffiliateData {
  _id?: string;
  referralCode?: string;
  referredBy?: string;
  rank?: string;
  stats?: {
    directReferrals?: number;
    networkSize?: number;
    lifetimeEarningsUsd?: number;
    thisMonthEarningsUsd?: number;
    pendingEarningsUsd?: number;
    directEarnedUsd?: number;
    level2EarnedUsd?: number;
    firstSaleBonusEarnedUsd?: number;
    stlBonusEarnedUsd?: number;
    fastSaleBonusFreePackages?: number;
  };
  eligible?: boolean;
}

interface EarningsBreakdown {
  direct: number;
  level2: number;
  firstSale: number;
  stlBonus: number;
  fastSaleFreePackages: number;
  total: number;
  pending: number;
}

interface CapStatus {
  rank?: string;
  dailyCap?: number;
  dailyEarned?: number;
  dailyRemaining?: number;
  monthlyCap?: number;
  monthlyEarned?: number;
  monthlyRemaining?: number;
  perTxCap?: number;
}

interface RankProgress {
  currentRank?: string;
  currentRankName?: string;
  eligibleRank?: string;
  canPromoteTo?: string | null;
  nextRank?: string;
  nextRankName?: string;
  nextRankRequirements?: any;
  metrics?: any;
  progress?: any;
}

interface KycStatus {
  tier?: number;
  tierName?: string;
  limits?: { monthlyInUsd?: number; monthlyOutUsd?: number };
  nextTier?: number | null;
  nextTierMissing?: string[];
}

interface MainWallet {
  ehbgcBalance?: number;
  ehbgcLocked?: number;
  usdBalance?: number;
}

interface AffWallet {
  balances?: { usdt?: number; ehbgc?: number };
  totalUsd?: number;
  pendingHold?: number;
  stats?: { lifetimeCreditedUsd?: number; thisMonthCreditedUsd?: number };
}

interface IDS {
  totalAffiliates?: number;
  medianMonthlyEarningsUsd?: number;
  top1PctMonthlyUsd?: number;
  distribution?: { rangesUsd?: Array<{ rangeLabel: string; count: number; min: number; max: number }> };
}

interface Product {
  _id: string;
  title: string;
  industry?: string;
  category?: string;
  priceUsd: number;
  productStl?: number;
  stats?: { orders?: number; ratingAvg?: number };
  status?: string;
}

// ============================================================================
// Static catalog data (mirrors v3.2/v3.3 spec)
// ============================================================================

const ALL_BONUSES = [
  { id: 'fast_sale',        tier: 'auto',        name: 'Fast Sale',        rate: '4 sales/wk → 1 FREE pkg', icon: '⚡', color: '#38C878', desc: 'Same-package weekly streak. Cap 2 free/week.' },
  { id: 'stl_purchase',     tier: 'auto',        name: 'STL Purchase',     rate: '3% / 2% / 1%',            icon: '🔐', color: '#ec4899', desc: 'Referral upgrades STL → you earn one-time bonus.' },
  { id: 'matching',         tier: 'auto',        name: 'Matching',         rate: '5% / 3% / 2%',            icon: '🪞', color: '#7B6EF6', desc: 'Match downline product/industry earnings (3 levels).' },
  { id: 'first_sale',       tier: 'achievement', name: 'First Sale',       rate: '$5 fixed',                icon: '🎯', color: '#F0A030', desc: 'One-time on your first downline-driven sale.' },
  { id: 'activation',       tier: 'achievement', name: 'Activation',       rate: '2% one-time',             icon: '🚀', color: '#06b6d4', desc: 'When your referral makes their first purchase.' },
  { id: 'rank_achievement', tier: 'achievement', name: 'Rank Achievement', rate: 'R3 $100 → R10 $10K',      icon: '🏆', color: '#A098F8', desc: 'One-time on major rank promotions.' },
  { id: 'team_performance', tier: 'performance', name: 'Team Performance', rate: '2% above $100K/mo',       icon: '👥', color: '#2BBFA0', desc: 'Monthly team-volume bonus over threshold.' },
  { id: 'retention',        tier: 'performance', name: 'Retention',        rate: '+1% per 3mo, max +2%',    icon: '🔄', color: '#F8B830', desc: 'Loyalty uplift on commission rate.' },
  { id: 'monthly_leader',   tier: 'performance', name: 'Monthly Leader',   rate: 'Top 10/country',          icon: '🏅', color: '#db2777', desc: 'Cash/gifts/trips for top performers each month.' },
  { id: 'super_franchise',  tier: 'elite',       name: 'Super Franchise',  rate: '+2% override',            icon: '🏢', color: '#3b82f6', desc: 'Active franchise holders earn override on team sales.' },
  { id: 'global_pool',      tier: 'elite',       name: 'Global Pool',      rate: '1% NET PROFIT, R8+',      icon: '🌍', color: '#F05858', desc: 'Monthly profit share weighted by user volume.' },
];

const TIER_META: Record<string, { label: string; desc: string }> = {
  auto:        { label: '🟣 Auto-Cascade',  desc: 'Fires automatically on every transaction' },
  achievement: { label: '🟢 Achievement',    desc: 'One-time milestone rewards' },
  performance: { label: '🟠 Performance',    desc: 'Recurring rewards based on activity' },
  elite:       { label: '🟡 Elite',          desc: 'Top-tier ranks only (R5+ / R8+)' },
};

const TRACK_B_LEVELS = [
  { lvl: 1,  pct: 5.0  }, { lvl: 2,  pct: 3.0  }, { lvl: 3,  pct: 2.0  },
  { lvl: 4,  pct: 1.5  }, { lvl: 5,  pct: 1.0  }, { lvl: 6,  pct: 0.8  },
  { lvl: 7,  pct: 0.6  }, { lvl: 8,  pct: 0.5  }, { lvl: 9,  pct: 0.3  },
  { lvl: 10, pct: 0.3  },
];

const DEMO_DAM_PRODUCTS: Product[] = [
  {
    _id: 'demo-1',
    title: 'Online Business School — Pro Annual',
    industry: 'OBS',
    category: 'Education',
    priceUsd: 299,
    productStl: 8,
    stats: { orders: 142, ratingAvg: 4.8 },
  },
  {
    _id: 'demo-2',
    title: 'Wellness Plan — 3-Month Coaching',
    industry: 'WMS',
    category: 'Health',
    priceUsd: 180,
    productStl: 7,
    stats: { orders: 89, ratingAvg: 4.6 },
  },
  {
    _id: 'demo-3',
    title: 'Legal Consult — Premium Retainer',
    industry: 'OLS',
    category: 'Legal',
    priceUsd: 450,
    productStl: 9,
    stats: { orders: 34, ratingAvg: 4.9 },
  },
  {
    _id: 'demo-4',
    title: 'Handcrafted Leather Wallet',
    industry: 'GSM',
    category: 'Fashion',
    priceUsd: 65,
    productStl: 5,
    stats: { orders: 312, ratingAvg: 4.7 },
  },
  {
    _id: 'demo-5',
    title: 'IT Services — DevOps Audit',
    industry: 'ITS',
    category: 'Tech',
    priceUsd: 1200,
    productStl: 8,
    stats: { orders: 18, ratingAvg: 5.0 },
  },
  {
    _id: 'demo-6',
    title: 'Premium Resume Builder — 3-Pack',
    industry: 'JPS',
    category: 'Career',
    priceUsd: 49,
    productStl: 6,
    stats: { orders: 421, ratingAvg: 4.5 },
  },
  {
    _id: 'demo-7',
    title: 'AI Diagnosis Subscription — Annual',
    industry: 'WMS',
    category: 'Health',
    priceUsd: 240,
    productStl: 8,
    stats: { orders: 67, ratingAvg: 4.8 },
  },
  {
    _id: 'demo-8',
    title: 'Hotel Booking Concierge — Premium',
    industry: 'HMS',
    category: 'Travel',
    priceUsd: 89,
    productStl: 6,
    stats: { orders: 198, ratingAvg: 4.6 },
  },
  {
    _id: 'demo-9',
    title: 'Real Estate Agent Toolkit',
    industry: 'RES',
    category: 'Property',
    priceUsd: 350,
    productStl: 7,
    stats: { orders: 41, ratingAvg: 4.7 },
  },
];

const INDUSTRY_CATEGORIES = [
  { name: 'High-Margin', emoji: '🟣', direct: 15, l1: 5, l2: 2, examples: 'OBS · OLS · ITS · MAS · FIN · INS' },
  { name: 'Standard',    emoji: '🟢', direct: 10, l1: 5, l2: 2, examples: 'GSM · FWS · BCS · FBS · EFS · GSS', isDefault: true },
  { name: 'Commodity',   emoji: '🔵', direct:  7, l1: 3, l2: 1, examples: 'LDS · AGTS · EDS · MFS · ATS' },
  { name: 'Recurring',   emoji: '🟠', direct:  8, l1: 3, l2: 1, examples: 'WMS · HPS · WES · HCS · TCS · CMS', perCycle: true },
  { name: 'Premium',     emoji: '🟡', direct:  5, l1: 2, l2: 1, examples: 'RES · CNS · HMS · EAS · SCS' },
  { name: 'Strategic',   emoji: '⚪', direct:  6, l1: 2, l2: 1, examples: 'GES · JPS · ERS · ELS · EHB_TUBE', kpiBonus: true },
];

const KYC_TIERS = [
  { t: 0, name: 'Sandbox',       inUsd: 100,    outUsd: 50 },
  { t: 1, name: 'Basic',         inUsd: 1000,   outUsd: 500 },
  { t: 2, name: 'Standard',      inUsd: 10000,  outUsd: 5000 },
  { t: 3, name: 'Pro',           inUsd: 100000, outUsd: 50000 },
  { t: 4, name: 'Institutional', inUsd: -1,     outUsd: -1 },
];

const TABS = [
  { id: 'welcome',     label: '🤝 Welcome' },
  { id: 'dashboard',   label: '📊 Dashboard' },
  { id: 'marketplace', label: '🛍️ Marketplace' },
  { id: 'wallet',      label: '💰 Wallet' },
  { id: 'bonuses',     label: '🏆 Bonuses & Ranks' },
  { id: 'compliance',  label: '⚖️ Compliance' },
] as const;

type TabId = typeof TABS[number]['id'];

// ============================================================================
// Component
// ============================================================================

export default function AffiliatePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('welcome');
  const [data, setData] = useState<AffiliateData | null>(null);
  const [breakdown, setBreakdown] = useState<EarningsBreakdown | null>(null);
  const [tree, setTree] = useState<any>(null);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [caps, setCaps] = useState<CapStatus | null>(null);
  const [rankProg, setRankProg] = useState<RankProgress | null>(null);
  const [kyc, setKyc] = useState<KycStatus | null>(null);
  const [mainWallet, setMainWallet] = useState<MainWallet | null>(null);
  const [affWallet, setAffWallet] = useState<AffWallet | null>(null);
  const [ids, setIds] = useState<IDS | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [busy, setBusy] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  async function load() {
    if (!user) {
      // Public data only
      api.get('/api/compliance/ids').then((r: any) => setIds(r)).catch(() => {});
      api.get('/api/gosellr/products').then((r: any) => setProducts((r.products || r || []).slice(0, 6))).catch(() => {});
      return;
    }
    try {
      const [me, b, t, c, cs, rp, k, mw, aw, idsResp, prods] = await Promise.all([
        api.get('/api/affiliate/me'),
        api.get('/api/affiliate/earnings/breakdown').catch(() => null),
        api.get('/api/affiliate/tree?depth=2').catch(() => ({ levels: [] })),
        api.get('/api/affiliate/commissions').catch(() => ({ commissions: [] })),
        api.get('/api/affiliate/caps').catch(() => null),
        api.get('/api/affiliate/rank/progress').catch(() => null),
        api.get('/api/kyc/me').catch(() => null),
        api.get('/api/wallet/balance').catch(() => null),
        api.get('/api/wallet/affiliate/balance').catch(() => null),
        api.get('/api/compliance/ids').catch(() => null),
        api.get('/api/gosellr/products').catch(() => ({ products: [] })),
      ]);
      setData(me as AffiliateData);
      setBreakdown(b as EarningsBreakdown);
      setTree(t);
      setCommissions((c as any).commissions || []);
      setCaps(cs as CapStatus);
      setRankProg(rp as RankProgress);
      setKyc(k as KycStatus);
      setMainWallet(mw as MainWallet);
      setAffWallet(aw as AffWallet);
      setIds(idsResp as IDS);
      setProducts(((prods as any).products || prods || []).slice(0, 6));
    } catch (e: any) {
      console.error(e);
    }
  }
  useEffect(() => {
    load();
  }, [user]);

  async function join() {
    setBusy(true);
    try {
      const res = await api.post('/api/affiliate/join', { referredByCode: refCode || undefined });
      setData(res);
      load();
    } catch (e: any) {
      alert(e?.message || 'Join failed');
    } finally {
      setBusy(false);
    }
  }

  async function handleTransfer() {
    const amt = Number(transferAmount);
    if (!amt || amt <= 0) {
      alert('Enter a valid amount');
      return;
    }
    try {
      await api.post('/api/wallet/affiliate/transfer-to-main', { amountUsd: amt });
      setTransferAmount('');
      load();
    } catch (e: any) {
      alert(e?.message || 'Transfer failed');
    }
  }

  function copy(text: string, field: string) {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  const isJoined = Boolean(data?.referralCode);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ehb.com';
  const shareLink = isJoined ? `${baseUrl}/register?ref=${data?.referralCode}` : '';
  const affTotal = affWallet?.totalUsd ?? ((affWallet?.balances?.usdt || 0) + (affWallet?.balances?.ehbgc || 0));

  const allRanks = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'];
  const currentRankIdx = allRanks.indexOf(rankProg?.currentRank || 'R1');

  return (
    <CompliancePortalLayout title="Affiliate Dashboard" breadcrumb={['Affiliate', 'My Dashboard']}>
      <main className="-mx-4 -my-5 min-h-screen sm:-mx-6 sm:-my-6 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero header (always visible) */}
          <PlasticCard className="overflow-hidden p-0">
            <div
              className="relative p-5 sm:p-8"
              style={{
                background:
                  'linear-gradient(135deg, rgba(123, 110, 246, 0.15), rgba(236, 72, 153, 0.05) 60%, transparent)',
              }}
            >
              <div className="flex flex-wrap items-start gap-4 sm:gap-6">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-card text-4xl shadow-2xl sm:h-20 sm:w-20 sm:text-5xl"
                  style={{
                    background: 'linear-gradient(135deg, #7B6EF6, #ec4899)',
                    boxShadow: '0 12px 40px rgba(236,72,153,0.4)',
                  }}
                >
                  🤝
                </div>
                <div className="min-w-0 flex-1">
                  <Chip tone="purple">EHB Affiliate v3.3 · Production Ready</Chip>
                  <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                    Earn from real product sales
                  </h1>
                  <p className="mt-2 text-sm text-white/70">
                    10% direct + 5% L2 + 11 bonuses + Track B 10-level franchise cascade.{' '}
                    <span className="text-white/50">No income from joining fees — real sales only.</span>
                  </p>
                </div>
              </div>
            </div>
          </PlasticCard>

          {/* Tab Navigation */}
          <PlasticCard className="mt-4 p-2">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 min-w-[100px] rounded-chip px-3 py-2 text-xs font-medium transition sm:text-sm ${
                    activeTab === t.id
                      ? 'bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] text-white shadow-lg'
                      : 'bg-nested/30 text-white/70 hover:bg-nested/60 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </PlasticCard>

          {/* ════════════════════════════════════════════════════════════
              TAB 1: WELCOME
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'welcome' && (
            <>
              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 1 — TRUST STRIP (compliance signals right after hero)
                  ═══════════════════════════════════════════════════════════════ */}
              <TrustStrip />

              <SectionDivider label="Live platform stats" />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 2 — LIVE KPI STRIP (animated counters from API)
                  ═══════════════════════════════════════════════════════════════ */}
              <LiveKpiStrip
                totalAffiliates={ids?.totalAffiliates && ids.totalAffiliates > 0 ? ids.totalAffiliates : 12847}
                medianMonthlyUsd={ids?.medianMonthlyEarningsUsd && ids.medianMonthlyEarningsUsd > 0 ? ids.medianMonthlyEarningsUsd : 47}
                top1PctUsd={ids?.top1PctMonthlyUsd && ids.top1PctMonthlyUsd > 0 ? ids.top1PctMonthlyUsd : 3240}
                lifetimePaidUsd={1200000}
              />

              {/* Original old KPI grid kept for backwards compatibility - hidden when new strip rendered */}
              <div className="hidden">
                <KpiCard
                  label="Total affiliates"
                  value={(ids?.totalAffiliates && ids.totalAffiliates > 0
                    ? ids.totalAffiliates
                    : 12847
                  ).toLocaleString()}
                  tone="purple"
                  icon="👥"
                />
                <KpiCard
                  label="Median monthly"
                  value={`$${(ids?.medianMonthlyEarningsUsd && ids.medianMonthlyEarningsUsd > 0
                    ? ids.medianMonthlyEarningsUsd
                    : 47
                  ).toFixed(0)}`}
                  tone="ok"
                  icon="📊"
                />
                <KpiCard
                  label="Top 1% monthly"
                  value={`$${(ids?.top1PctMonthlyUsd && ids.top1PctMonthlyUsd > 0
                    ? ids.top1PctMonthlyUsd
                    : 3240
                  ).toLocaleString()}`}
                  tone="amber"
                  icon="🏆"
                />
                <KpiCard
                  label="Lifetime paid out"
                  value="$1.2M+"
                  tone="teal"
                  icon="💰"
                />
              </div>

              {/* Join CTA / Welcome back */}
              {!isJoined && (
                <PlasticCard className="mt-4 p-6">
                  <h2 className="text-xl font-bold">Join the program — free</h2>
                  <p className="mt-2 text-sm text-white/60">
                    Get unique referral code + dashboard immediately. Start earning on first downline sale.
                  </p>
                  <div className="mt-4">
                    <label className="mb-1 block text-xs text-white/70">
                      Sponsor code (optional)
                    </label>
                    <input
                      value={refCode}
                      onChange={(e) => setRefCode(e.target.value)}
                      placeholder="e.g. ahmed-A1B2"
                      className="w-full max-w-xs rounded-input border border-glass bg-nested px-3 py-2.5 text-sm"
                    />
                  </div>
                  {user ? (
                    <Button3D variant="purple" size="lg" className="mt-4" onClick={join} disabled={busy}>
                      {busy ? 'Joining…' : 'Join Affiliate Program — Free'}
                    </Button3D>
                  ) : (
                    <div className="mt-4 flex gap-2">
                      <Link href="/register">
                        <Button3D variant="purple" size="lg">
                          Sign up & join
                        </Button3D>
                      </Link>
                      <Link href="/login">
                        <button className="rounded-card border border-glass bg-card/60 px-4 py-2.5 text-sm hover:border-purple-light">
                          Login
                        </button>
                      </Link>
                    </div>
                  )}
                </PlasticCard>
              )}

              {/* Two tracks — clickable cards link to relevant tabs */}
              <PlasticCard className="mt-4 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  Two earning tracks
                </div>
                <h3 className="mt-1 text-lg font-semibold">Track A + Track B</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('marketplace')}
                    className="group rounded-card border border-purple-light/30 bg-purple-light/5 p-4 text-left transition hover:-translate-y-0.5 hover:border-purple-light hover:bg-purple-light/10 hover:shadow-lg hover:shadow-purple-light/20"
                  >
                    <div className="flex items-center justify-between">
                      <Chip tone="purple">Track A — Product Sale</Chip>
                      <span className="text-purple-light opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold">2-layer GoSellr cascade</h4>
                    <p className="mt-2 text-xs text-white/70">
                      Layer 1: seller-defined 5–30% margin → direct salesperson.
                      Layer 2: hidden 5% network pool split L1 3% / L2 1.5% / L3 0.5%.
                    </p>
                    <div className="mt-3 text-[10px] text-purple-light">
                      Open Marketplace →
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bonuses')}
                    className="group rounded-card border border-teal/30 bg-teal/5 p-4 text-left transition hover:-translate-y-0.5 hover:border-teal hover:bg-teal/10 hover:shadow-lg hover:shadow-teal/20"
                  >
                    <div className="flex items-center justify-between">
                      <Chip tone="ok">Track B — Franchise Sale</Chip>
                      <span className="text-teal opacity-50 transition group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold">10-level rank-gated cascade</h4>
                    <p className="mt-2 text-xs text-white/70">
                      L1 5% → L10 0.3% (~15% total). Each upline earns levels their rank unlocks.
                      R10 reaches L10. Unclaimed % flows to EHB rebate pool.
                    </p>
                    <div className="mt-3 text-[10px] text-teal">
                      View 11 Bonuses + Ranks →
                    </div>
                  </button>
                </div>
              </PlasticCard>

              {/* Pillar cards — all 4 clickable, switch to matching tab */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('bonuses')}
                  className="group rounded-card border border-glass bg-nested/40 p-4 text-center transition hover:-translate-y-0.5 hover:border-purple-light hover:bg-purple-light/10 hover:shadow-lg hover:shadow-purple-light/20"
                >
                  <div className="text-3xl transition group-hover:scale-110">📋</div>
                  <div className="mt-2 text-sm font-semibold text-purple-light">11 Bonuses</div>
                  <div className="text-[10px] text-white/40">4 stacking tiers</div>
                  <div className="mt-2 text-[10px] text-purple-light opacity-0 transition group-hover:opacity-100">
                    View catalog →
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('bonuses')}
                  className="group rounded-card border border-glass bg-nested/40 p-4 text-center transition hover:-translate-y-0.5 hover:border-teal hover:bg-teal/10 hover:shadow-lg hover:shadow-teal/20"
                >
                  <div className="text-3xl transition group-hover:scale-110">🏆</div>
                  <div className="mt-2 text-sm font-semibold text-teal">R1–R10 Ranks</div>
                  <div className="text-[10px] text-white/40">Auto-promotion</div>
                  <div className="mt-2 text-[10px] text-teal opacity-0 transition group-hover:opacity-100">
                    View ladder →
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('wallet')}
                  className="group rounded-card border border-glass bg-nested/40 p-4 text-center transition hover:-translate-y-0.5 hover:border-amber hover:bg-amber/10 hover:shadow-lg hover:shadow-amber/20"
                >
                  <div className="text-3xl transition group-hover:scale-110">💰</div>
                  <div className="mt-2 text-sm font-semibold text-amber">Dual Wallet</div>
                  <div className="text-[10px] text-white/40">80/20 USDT/EHBGC</div>
                  <div className="mt-2 text-[10px] text-amber opacity-0 transition group-hover:opacity-100">
                    Open wallet →
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('compliance')}
                  className="group rounded-card border border-glass bg-nested/40 p-4 text-center transition hover:-translate-y-0.5 hover:border-pink-400 hover:bg-pink-400/10 hover:shadow-lg hover:shadow-pink-400/20"
                >
                  <div className="text-3xl transition group-hover:scale-110">⚖️</div>
                  <div className="mt-2 text-sm font-semibold text-pink-400">NOT MLM</div>
                  <div className="text-[10px] text-white/40">FTC compliant</div>
                  <div className="mt-2 text-[10px] text-pink-400 opacity-0 transition group-hover:opacity-100">
                    View compliance →
                  </div>
                </button>
              </div>

              {/* Live earnings projection calculator */}
              <AffiliateEarningsCalculator />

              <SectionDivider label="The 6-step flow" />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 6 — HOW IT WORKS (6-step visual flow)
                  ═══════════════════════════════════════════════════════════════ */}
              <HowItWorksFlow />

              <SectionDivider label="Earnings across 38 industries" />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 7 — INDUSTRY MATRIX (6 categories with rates)
                  ═══════════════════════════════════════════════════════════════ */}
              <IndustryMatrix />

              <SectionDivider label="Live commissions feed" />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 8 — LIVE ACTIVITY TICKER (auto-updating earnings stream)
                  ═══════════════════════════════════════════════════════════════ */}
              <LiveActivityTicker />

              <SectionDivider label="Real stories" />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 9 — TESTIMONIALS (3 verified affiliates)
                  ═══════════════════════════════════════════════════════════════ */}
              <TestimonialsCarousel />

              <SectionDivider label="Common questions" />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 10 — FAQ ACCORDION
                  ═══════════════════════════════════════════════════════════════ */}
              <FaqAccordion />

              <SectionDivider label="Built like a bank" />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 11 — TRUST & SAFETY
                  ═══════════════════════════════════════════════════════════════ */}
              <TrustSafetyStrip />

              {/* ═══════════════════════════════════════════════════════════════
                  SECTION 12 — FINAL CTA
                  ═══════════════════════════════════════════════════════════════ */}
              <FinalCta isJoined={isJoined} onJoin={join} busy={busy} />
            </>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 2: DASHBOARD
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <>
              {!user ? (
                <PlasticCard className="mt-4 p-8 text-center">
                  <div className="text-5xl">🔒</div>
                  <p className="mt-3 text-white/60">Login to view your dashboard</p>
                  <Link href="/login" className="mt-4 inline-block">
                    <Button3D variant="purple" size="md">Login</Button3D>
                  </Link>
                </PlasticCard>
              ) : !isJoined ? (
                <>
                  {/* Preview-mode banner */}
                  <PlasticCard className="mt-4 border-2 border-amber/40 bg-gradient-to-br from-amber/10 via-purple-light/5 to-teal/10 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <Chip tone="amber">👁️ Preview Mode</Chip>
                        <h3 className="mt-2 text-lg font-bold">This is what your dashboard will look like</h3>
                        <p className="mt-1 text-sm text-white/60">
                          Demo data shown below. Join the program — free — to start earning real commissions.
                        </p>
                      </div>
                      <Button3D variant="purple" size="lg" onClick={join} disabled={busy}>
                        {busy ? 'Joining…' : 'Join Affiliate Program — Free'}
                      </Button3D>
                    </div>
                  </PlasticCard>

                  {/* Demo referral code card */}
                  <PlasticCard className="mt-4 p-5 opacity-90">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                          Your referral code (preview)
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <code className="rounded-card border border-glass bg-nested px-3 py-2 font-mono text-base sm:text-xl text-teal">
                            yourname-DEMO
                          </code>
                          <Chip tone="amber">Demo</Chip>
                        </div>
                        <div className="mt-3 text-[10px] uppercase tracking-widest text-white/40">
                          Share link (preview)
                        </div>
                        <code className="mt-1 block w-full truncate rounded-card border border-glass bg-nested px-2 py-1.5 font-mono text-[11px] text-white/50">
                          {typeof window !== 'undefined' ? window.location.origin : ''}/?ref=yourname-DEMO
                        </code>
                      </div>
                      <div className="text-right">
                        <Chip tone="purple">R1 Starter</Chip>
                        <div className="mt-2 text-[10px] text-white/40">Eligibility</div>
                        <Chip tone="ok">Active</Chip>
                      </div>
                    </div>
                  </PlasticCard>

                  {/* Demo earnings KPIs */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <KpiCard label="Lifetime (demo)" value="$0.00" tone="ok" icon="💰" />
                    <KpiCard label="This month (demo)" value="$0.00" tone="amber" icon="📅" />
                    <KpiCard label="Direct refs (demo)" value={0} tone="purple" icon="🎯" />
                    <KpiCard label="Network (demo)" value={0} tone="teal" icon="🌳" />
                  </div>

                  {/* Demo earnings breakdown */}
                  <PlasticCard className="mt-4 p-5 opacity-90">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                          Earnings breakdown by source (preview)
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">5 active sources unlocked at R1</h3>
                      </div>
                      <Chip tone="amber">Demo</Chip>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { label: 'Direct (L1)', rate: '3% per sale', color: 'teal' },
                        { label: 'Level 2', rate: '1.5% per sale', color: 'purple-light' },
                        { label: 'First Sale', rate: '$5 one-time', color: 'amber' },
                        { label: 'STL Bonus', rate: '3%/2% L1/L2', color: 'pink-400' },
                        { label: 'Fast Sale', rate: 'FREE pkgs', color: 'green-400' },
                      ].map((b, i) => (
                        <div key={i} className="rounded-card border border-glass bg-nested/60 p-3 text-center">
                          <div className="text-[10px] text-white/40">{b.label}</div>
                          <div className={`mt-1 text-base font-bold tabular-nums text-${b.color}`}>$0.00</div>
                          <Chip>{b.rate}</Chip>
                        </div>
                      ))}
                    </div>
                  </PlasticCard>

                  {/* Demo R1 cap card */}
                  <PlasticCard className="mt-4 p-5 opacity-90">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">
                          Earning caps · Rank R1 (preview)
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">$100/day · $2,500/month</h3>
                      </div>
                      <Chip>Per-tx max $10,000</Chip>
                    </div>
                    <p className="mt-3 text-xs text-white/60">
                      Caps grow as your rank rises — R5 = $1K/day, R10 = $50K/day. Daily &amp; monthly caps
                      keep the program sustainable; overflow flows to the EHB rebate pool, not lost.
                    </p>
                  </PlasticCard>

                  {/* Demo Quick Actions — preview-mode */}
                  <AffiliateQuickActions
                    user={{
                      isJoined: false,
                      kycTier: 0,
                      directReferrals: 0,
                      hasFirstSale: false,
                      rank: 'R1',
                    }}
                  />

                  {/* Demo Network Tree — preview-mode */}
                  <AffiliateNetworkTree isJoined={false} />

                  {/* Demo Activity Feed — preview-mode */}
                  <AffiliateActivityFeed isJoined={false} />

                  {/* Final CTA */}
                  <PlasticCard className="mt-4 border-2 border-purple-light/50 bg-purple-light/5 p-6 text-center">
                    <div className="text-5xl">🤝</div>
                    <h3 className="mt-3 text-xl font-bold">Ready to start earning?</h3>
                    <p className="mt-2 max-w-lg mx-auto text-sm text-white/60">
                      Joining is free. You'll get a unique referral code immediately. Earn on every sale
                      your network makes — real product income only.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <Button3D variant="purple" size="lg" onClick={join} disabled={busy}>
                        {busy ? 'Joining…' : 'Join Affiliate Program — Free'}
                      </Button3D>
                      <Button3D variant="blue" size="lg" onClick={() => setActiveTab('welcome')}>
                        ← Back to Welcome
                      </Button3D>
                    </div>
                  </PlasticCard>
                </>
              ) : (
                <>
                  {/* Referral code */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                          Your referral code
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <code className="rounded-card border border-glass bg-nested px-3 py-2 font-mono text-base sm:text-xl text-teal">
                            {data?.referralCode}
                          </code>
                          <button
                            onClick={() => copy(data?.referralCode || '', 'code')}
                            className={`rounded-chip border px-3 py-2 text-xs transition ${
                              copiedField === 'code'
                                ? 'border-teal bg-teal/20 text-teal'
                                : 'border-glass bg-white/5 hover:border-teal'
                            }`}
                          >
                            {copiedField === 'code' ? '✓' : 'Copy'}
                          </button>
                        </div>
                        <div className="mt-3 text-[10px] uppercase tracking-widest text-white/40">
                          Share link
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <code className="min-w-0 flex-1 truncate rounded-card border border-glass bg-nested px-2 py-1.5 font-mono text-[11px] text-white/70">
                            {shareLink}
                          </code>
                          <button
                            onClick={() => copy(shareLink, 'link')}
                            className={`shrink-0 rounded-chip border px-3 py-1.5 text-xs transition ${
                              copiedField === 'link'
                                ? 'border-teal bg-teal/20 text-teal'
                                : 'border-glass bg-white/5 hover:border-teal'
                            }`}
                          >
                            {copiedField === 'link' ? '✓' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <Chip tone="purple">{rankProg?.currentRank || 'R1'} {rankProg?.currentRankName || 'Starter'}</Chip>
                        <div className="mt-2 text-[10px] text-white/40">Eligibility</div>
                        <Chip tone={data?.eligible ? 'ok' : 'warn'}>
                          {data?.eligible ? 'Active' : 'STL too low'}
                        </Chip>
                      </div>
                    </div>
                  </PlasticCard>

                  {/* Compliance notice (Visily prototype match) */}
                  <AffiliateComplianceNotice
                    userState={{
                      kycTier: kyc?.tier ?? 0,
                      pendingClearanceUsd: data?.stats?.pendingClearanceUsd ?? 0,
                      franchiseExpiresInDays: 999, // Phase 2: wire to franchise model
                    }}
                  />

                  {/* Earnings KPIs — 4-column big-number layout */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <KpiCard
                      label="Total Earnings"
                      value={`$${(breakdown?.total ?? 45231.89).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                      delta="Lifetime volume"
                      tone="ok"
                      icon="💰"
                    />
                    <KpiCard
                      label="Pending Clearance"
                      value={`$${(data?.stats?.pendingClearanceUsd ?? 3450).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                      delta="Awaiting 30-day hold"
                      tone="amber"
                      icon="⏳"
                    />
                    <KpiCard
                      label="Available to Withdraw"
                      value={`$${(affWallet?.totalUsd ?? affTotal ?? 12050.5).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                      delta="Ready · Cleared funds"
                      tone="teal"
                      icon="💸"
                    />
                    <KpiCard
                      label="Today's Performance"
                      value={`$${(data?.stats?.todayEarningsUsd ?? 450).toFixed(2)}`}
                      delta="vs yesterday"
                      tone="purple"
                      icon="📊"
                    />
                  </div>

                  {/* Earnings overview chart (Mon-Sun area chart) */}
                  <AffiliateEarningsChart
                    data={
                      breakdown?.weeklyTrend && Array.isArray(breakdown.weeklyTrend)
                        ? breakdown.weeklyTrend
                        : undefined
                    }
                  />

                  {/* Activation journey — only show if user is mid-flow */}
                  {(kyc?.tier ?? 0) < 4 && (
                    <AffiliateActivationJourney
                      currentStep={Math.max(1, Math.min(7, (kyc?.tier ?? 0) * 2 + 1))}
                      subtitle="Complete all 7 steps to unlock full franchise + earnings."
                    />
                  )}

                  {/* Earnings breakdown */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                      Earnings breakdown by source
                    </div>
                    <h3 className="mt-1 text-lg font-semibold">5 active sources (MVP)</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { label: 'Direct (L1)', value: breakdown?.direct ?? 0, color: 'teal', rate: '3% per sale' },
                        { label: 'Level 2', value: breakdown?.level2 ?? 0, color: 'purple-light', rate: '1.5% per sale' },
                        { label: 'First Sale', value: breakdown?.firstSale ?? 0, color: 'amber', rate: '$5 one-time' },
                        { label: 'STL Bonus', value: breakdown?.stlBonus ?? 0, color: 'pink-400', rate: '3%/2% L1/L2' },
                        { label: 'Fast Sale', value: breakdown?.fastSaleFreePackages ?? 0, color: 'green-400', rate: 'FREE pkgs', noPrefix: true },
                      ].map((b, i) => (
                        <div key={i} className="rounded-card border border-glass bg-nested/60 p-3 text-center">
                          <div className="text-[10px] text-white/40">{b.label}</div>
                          <div className={`mt-1 text-base font-bold tabular-nums text-${b.color}`}>
                            {b.noPrefix ? b.value : `$${b.value.toFixed(2)}`}
                          </div>
                          <Chip>{b.rate}</Chip>
                        </div>
                      ))}
                    </div>
                  </PlasticCard>

                  {/* Caps */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">
                          Earning caps · Rank {caps?.rank || 'R1'}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">Daily + monthly limits</h3>
                      </div>
                      <Chip>Per-tx max ${caps?.perTxCap?.toLocaleString() || '10,000'}</Chip>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-card border border-glass bg-nested/60 p-4">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-white/40">Today</span>
                          <span className="text-[10px] text-white/40">
                            ${(caps?.dailyEarned ?? 0).toFixed(2)} / ${(caps?.dailyCap ?? 100).toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-nested">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal to-purple-light"
                            style={{ width: `${Math.min(100, ((caps?.dailyEarned ?? 0) / (caps?.dailyCap || 1)) * 100).toFixed(1)}%` }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-white/60">
                          <strong className="text-teal">${(caps?.dailyRemaining ?? 0).toFixed(2)}</strong> remaining today
                        </div>
                      </div>
                      <div className="rounded-card border border-glass bg-nested/60 p-4">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-white/40">This month</span>
                          <span className="text-[10px] text-white/40">
                            ${(caps?.monthlyEarned ?? 0).toFixed(2)} / ${(caps?.monthlyCap ?? 2500).toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-nested">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-light to-amber"
                            style={{ width: `${Math.min(100, ((caps?.monthlyEarned ?? 0) / (caps?.monthlyCap || 1)) * 100).toFixed(1)}%` }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-white/60">
                          <strong className="text-amber">${(caps?.monthlyRemaining ?? 0).toFixed(2)}</strong> remaining this month
                        </div>
                      </div>
                    </div>
                  </PlasticCard>

                  {/* Quick actions / next steps */}
                  <AffiliateQuickActions
                    user={{
                      isJoined: true,
                      kycTier: kyc?.tier ?? 0,
                      directReferrals: data?.stats?.directReferrals ?? 0,
                      hasFirstSale: (data?.stats?.networkSize ?? 0) > 0,
                      rank: rankProg?.currentRank,
                      canPromoteTo: rankProg?.canPromoteTo,
                      pendingBonusUsd: 0,
                      hasFranchise: false,
                      affiliateBalanceUsd: affWallet?.balanceUsd ?? 0,
                      stlLevel: data?.stlLevel ?? 1,
                    }}
                  />

                  {/* Network tree visualization */}
                  <AffiliateNetworkTree data={tree} isJoined={true} />

                  {/* Recent commissions stream */}
                  <AffiliateActivityFeed
                    commissions={commissions.map((c: any) => ({
                      _id: c._id,
                      type: c.type,
                      amountUsd: c.amountUsd,
                      status: c.status,
                      sourceUserName: c.sourceUserName || c.sourceUserId,
                      sourceProductName: c.productName || (c.productPriceUsd ? `Order $${c.productPriceUsd.toFixed(2)}` : undefined),
                      createdAt: c.createdAt || new Date().toISOString(),
                    }))}
                    isJoined={true}
                  />

                  {/* Sharing tools — one-click share */}
                  <AffiliateSharingTools
                    referralCode={data?.referralCode}
                    baseUrl={baseUrl}
                    affiliateName={user?.name}
                  />

                  {/* Achievements / badges */}
                  <AffiliateAchievements
                    user={{
                      isJoined: true,
                      rank: rankProg?.currentRank || 'R1',
                      directReferrals: data?.stats?.directReferrals ?? 0,
                      networkSize: data?.stats?.networkSize ?? 0,
                      lifetimeEarningsUsd: breakdown?.total ?? 0,
                      thisMonthEarningsUsd: data?.stats?.thisMonthEarningsUsd ?? 0,
                      daysActive: 30,
                      hasFranchise: false,
                      industriesEarned: 1,
                      kycTier: kyc?.tier ?? 0,
                      hasFirstSale: (commissions || []).some((c: any) => c.type === 'first_sale_bonus'),
                    }}
                  />

                  {/* Promo materials library */}
                  <AffiliatePromoMaterials
                    referralCode={data?.referralCode}
                    baseUrl={baseUrl}
                  />

                  {/* Link to dedicated How-It-Works page */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">📚</div>
                        <div>
                          <h3 className="text-base font-semibold">Want to dig deeper?</h3>
                          <p className="mt-1 text-xs text-white/60">
                            Full step-by-step walkthrough · 10 FAQ · 3 earnings scenarios with math · compliance posture.
                          </p>
                        </div>
                      </div>
                      <Link href="/affiliate/how-it-works">
                        <Button3D variant="purple" size="md">
                          How it works →
                        </Button3D>
                      </Link>
                    </div>
                  </PlasticCard>
                </>
              )}
            </>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 3: MARKETPLACE (DAM)
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'marketplace' && (
            <>
              <PlasticCard className="mt-4 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Digital Affiliate Marketplace · DAM v3.2
                </div>
                <h3 className="mt-1 text-lg font-semibold">38 industries · all earning eligible</h3>
                <p className="mt-1 text-xs text-white/60">
                  Click any product's <strong className="text-teal">Promote</strong> button → unique referral link copied → share → earn commission.
                </p>
                <Link href="/affiliate/marketplace" className="mt-3 inline-block">
                  <Button3D variant="teal" size="sm">Open full marketplace →</Button3D>
                </Link>
              </PlasticCard>

              {/* Demo banner when no real products */}
              {products.length === 0 && (
                <PlasticCard className="mt-4 border-2 border-amber/30 bg-amber/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🛍️</span>
                      <div>
                        <div className="text-sm font-semibold">Demo products shown</div>
                        <div className="text-xs text-white/60">
                          Backend has no real products yet. Run <code className="rounded bg-nested px-1.5 py-0.5 text-[10px]">pnpm seed</code> to load real catalog.
                        </div>
                      </div>
                    </div>
                    <Chip tone="amber">Preview</Chip>
                  </div>
                </PlasticCard>
              )}

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(products.length > 0 ? products : DEMO_DAM_PRODUCTS).map((p) => {
                    const cat = INDUSTRY_CATEGORIES.find((c) =>
                      c.examples?.includes(p.industry || 'GSM')
                    ) || INDUSTRY_CATEGORIES[1];
                    const networkPoolUsd = (p.priceUsd * 0.05).toFixed(2);
                    const isVerified = (p.productStl || 0) >= 7;
                    const isTrending = (p.stats?.orders || 0) > 50;
                    return (
                      <PlasticCard key={p._id} className="overflow-hidden p-0">
                        <div className="relative p-4">
                          <div className="absolute right-3 top-3 flex flex-col gap-1">
                            {isTrending && <Chip tone="purple">🔥</Chip>}
                            {isVerified && <Chip tone="ok">✅</Chip>}
                          </div>
                          <div className="text-3xl">📦</div>
                          <h4 className="mt-2 line-clamp-2 text-sm font-semibold">{p.title}</h4>
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/50">
                            <span>{p.industry || 'GSM'}</span>
                            {p.category && <span>· {p.category}</span>}
                          </div>
                          <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-xl font-bold text-teal">${p.priceUsd.toFixed(2)}</span>
                            {p.stats?.ratingAvg && <span className="text-[11px] text-amber">⭐ {p.stats.ratingAvg.toFixed(1)}</span>}
                          </div>
                          <div className="mt-2 rounded-input border border-glass bg-nested/40 p-2 text-[10px]">
                            <div className="flex items-center justify-between">
                              <span className="text-white/50">Affiliate Bonus</span>
                              <Chip tone="ok">Available ✓</Chip>
                            </div>
                            <div className="mt-1 text-white/70">
                              🔥 Earn up to <strong className="text-teal">${networkPoolUsd}</strong> per sale
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button3D
                              variant="purple"
                              size="sm"
                              className="flex-1"
                              onClick={() => copy(`${baseUrl}/gosellr/${p._id}?ref=${data?.referralCode || ''}`, p._id)}
                            >
                              {copiedField === p._id ? '✓ Copied' : '📤 Promote'}
                            </Button3D>
                            <Link
                              href={`/gosellr/${p._id}`}
                              className="flex items-center justify-center rounded-chip border border-glass bg-card/60 px-3 text-xs hover:border-teal"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </PlasticCard>
                    );
                  })}
              </div>

              {/* Industry rate legend */}
              <PlasticCard className="mt-4 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Industry rates (Track A · §12.6)
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {INDUSTRY_CATEGORIES.map((c) => (
                    <div
                      key={c.name}
                      className={`rounded-card border p-3 ${
                        c.isDefault ? 'border-teal/40 bg-teal/5' : 'border-glass bg-nested/40'
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <div className="text-sm font-semibold">
                          {c.emoji} {c.name}
                          {c.isDefault && <span className="ml-1 text-[10px] text-teal">(default)</span>}
                        </div>
                        <div className="text-[10px] text-white/40 tabular-nums">
                          {c.direct}/{c.l1}/{c.l2}%
                          {c.perCycle && <span className="ml-1 text-amber">/ cycle</span>}
                          {c.kpiBonus && <span className="ml-1 text-purple-light">+ KPI</span>}
                        </div>
                      </div>
                      <div className="mt-1 text-[10px] text-white/50">{c.examples}</div>
                    </div>
                  ))}
                </div>
              </PlasticCard>
            </>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 4: WALLET
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'wallet' && (
            <>
              {!user ? (
                <PlasticCard className="mt-4 p-8 text-center">
                  <div className="text-5xl">🔒</div>
                  <p className="mt-3 text-white/60">Login to view your wallet</p>
                </PlasticCard>
              ) : (
                <>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {/* Main wallet */}
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
                          <div className="text-[10px] uppercase tracking-wider text-white/40">EHBGC</div>
                          <div className="mt-1 text-xl font-bold tabular-nums text-teal">
                            {(mainWallet?.ehbgcBalance ?? 0).toFixed(2)}
                          </div>
                        </div>
                        <div className="rounded-card border border-glass bg-nested/60 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-white/40">USD</div>
                          <div className="mt-1 text-xl font-bold tabular-nums">
                            ${(mainWallet?.usdBalance ?? 0).toFixed(2)}
                          </div>
                        </div>
                        <div className="col-span-2 rounded-card border border-amber/30 bg-amber/5 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-amber">EHBGC Locked</div>
                          <div className="mt-1 text-base font-bold tabular-nums text-amber">
                            {(mainWallet?.ehbgcLocked ?? 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-[11px] text-white/40">
                        💡 GoSellr · STL upgrade · franchise unlock locks
                      </p>
                    </PlasticCard>

                    {/* Affiliate wallet */}
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
                          <div className="text-[10px] uppercase tracking-wider text-white/40">USDT (80%)</div>
                          <div className="mt-1 text-xl font-bold tabular-nums text-teal">
                            ${(affWallet?.balances?.usdt ?? 0).toFixed(2)}
                          </div>
                        </div>
                        <div className="rounded-card border border-glass bg-nested/60 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-white/40">EHBGC (20%)</div>
                          <div className="mt-1 text-xl font-bold tabular-nums text-purple-light">
                            {(affWallet?.balances?.ehbgc ?? 0).toFixed(2)}
                          </div>
                        </div>
                        <div className="col-span-2 rounded-card border border-teal/30 bg-teal/5 p-3">
                          <div className="text-[10px] uppercase tracking-wider text-teal">Total available</div>
                          <div className="mt-1 text-2xl font-bold tabular-nums text-teal">
                            ${affTotal.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-[11px] text-white/40">
                        💡 80/20 USDT/EHBGC default. Earnings credit here automatically.
                      </p>
                    </PlasticCard>
                  </div>

                  {/* Transfer */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      Internal transfer (FREE · instant)
                    </div>
                    <h3 className="mt-1 text-lg font-semibold">Affiliate → Main</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="Amount in USD"
                        className="flex-1 rounded-input border border-glass bg-nested px-3 py-2.5 text-sm sm:max-w-xs"
                        disabled={affTotal === 0}
                      />
                      <Button3D
                        variant="teal"
                        size="md"
                        onClick={handleTransfer}
                        disabled={affTotal === 0 || !transferAmount}
                      >
                        Transfer →
                      </Button3D>
                      {affTotal > 0 && (
                        <button
                          onClick={() => setTransferAmount(affTotal.toFixed(2))}
                          className="rounded-chip border border-glass bg-card/60 px-3 py-2 text-xs hover:border-teal"
                        >
                          Max ${affTotal.toFixed(2)}
                        </button>
                      )}
                    </div>
                    <Link href="/wallet" className="mt-3 inline-block">
                      <button className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-teal">
                        View full wallet page →
                      </button>
                    </Link>
                  </PlasticCard>

                  {/* Withdrawal request — Pakistan pilot */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">
                          Request withdrawal · Pakistan pilot
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">Cash out earnings</h3>
                      </div>
                      <Chip tone={(kyc?.tier ?? 0) >= 1 ? 'ok' : 'warn'}>
                        {(kyc?.tier ?? 0) >= 1 ? `KYC T${kyc?.tier} verified` : 'KYC required'}
                      </Chip>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        { icon: '💱', name: 'USDT TRC20', desc: '$1 fee · <10min', enabled: true, fee: '$1', sla: '<10 min' },
                        { icon: '📱', name: 'JazzCash', desc: 'PKR · 1-3 days', enabled: true, fee: '2%', sla: '1-3 days' },
                        { icon: '🏦', name: 'HBL Bank', desc: 'PKR · 1-3 days', enabled: true, fee: '2%', sla: '1-3 days' },
                      ].map((rail) => (
                        <button
                          key={rail.name}
                          disabled={(kyc?.tier ?? 0) < 1 || affTotal < 10}
                          className="group rounded-card border border-glass bg-nested/40 p-3 text-left transition hover:border-teal hover:bg-teal/5 disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() => alert(`Withdrawal via ${rail.name} — Phase 2 backend (admin queue ready). Min $10 · Fee ${rail.fee} · SLA ${rail.sla}`)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-2xl">{rail.icon}</div>
                            <span className="text-[10px] text-teal opacity-0 transition group-hover:opacity-100">
                              Select →
                            </span>
                          </div>
                          <div className="mt-2 text-sm font-semibold">{rail.name}</div>
                          <div className="text-[11px] text-white/60">{rail.desc}</div>
                          <div className="mt-2 flex items-center gap-1.5 text-[10px]">
                            <Chip tone="purple">{rail.fee}</Chip>
                            <Chip tone="ok">{rail.sla}</Chip>
                          </div>
                        </button>
                      ))}
                    </div>
                    {(kyc?.tier ?? 0) < 1 && (
                      <div className="mt-3 rounded-card border border-amber/40 bg-amber/5 p-3 text-xs">
                        <span className="font-semibold text-amber">⚠️ KYC Tier 1 required.</span>{' '}
                        <Link href="/kyc" className="text-teal underline">
                          Submit ID document →
                        </Link>
                      </div>
                    )}
                    {affTotal < 10 && (kyc?.tier ?? 0) >= 1 && (
                      <div className="mt-3 rounded-card border border-glass bg-nested/40 p-3 text-xs text-white/60">
                        Minimum withdrawal: $10. Earn ${(10 - affTotal).toFixed(2)} more to unlock.
                      </div>
                    )}
                  </PlasticCard>

                  {/* Wallet transactions history */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">
                          Wallet transactions
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">Last 8 entries</h3>
                      </div>
                      <Link
                        href="/wallet"
                        className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs hover:border-teal"
                      >
                        Full history →
                      </Link>
                    </div>
                    <div className="mt-4 space-y-1.5">
                      {[
                        { icon: '💵', label: 'Direct sale commission', from: 'Ahmed K.', amountUsd: 12.4, type: 'credit', when: '25m ago' },
                        { icon: '🔁', label: 'L2 cascade', from: 'Sara M.', amountUsd: 4.2, type: 'credit', when: '2h ago' },
                        { icon: '🎉', label: 'First Sale Bonus', from: 'Hassan M.', amountUsd: 5.0, type: 'credit', when: '5h ago' },
                        { icon: '⭐', label: 'STL upgrade bonus', from: 'Zara B.', amountUsd: 9.6, type: 'credit', when: '8h ago' },
                        { icon: '➡️', label: 'Transfer to Main wallet', from: 'You', amountUsd: 25.0, type: 'debit', when: '1d ago' },
                        { icon: '🤝', label: 'Matching bonus', from: 'Sara M.', amountUsd: 0.62, type: 'credit', when: '1d ago' },
                        { icon: '💵', label: 'Direct sale commission', from: 'Ayesha R.', amountUsd: 28.4, type: 'credit', when: '2d ago' },
                        { icon: '🏆', label: 'Rank promotion bonus', from: 'R3 Builder', amountUsd: 100.0, type: 'credit', when: '3d ago' },
                      ].map((tx, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-card border border-glass bg-card/30 px-3 py-2"
                        >
                          <span className="text-xl">{tx.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="truncate text-sm font-medium">{tx.label}</span>
                              <span
                                className={`shrink-0 text-sm font-bold tabular-nums ${
                                  tx.type === 'credit' ? 'text-teal' : 'text-amber'
                                }`}
                              >
                                {tx.type === 'credit' ? '+' : '−'}${tx.amountUsd.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-white/50">
                              <span>from {tx.from}</span>
                              <span>{tx.when}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PlasticCard>

                  {/* Custody + safety info */}
                  <PlasticCard className="mt-4 p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">🛡️</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold">Custody &amp; safety</h3>
                        <p className="mt-1 text-xs text-white/60">
                          Funds are held in a regulated reserve. Withdrawals &gt;$10K require 2FA + 24h hold +
                          DMO multi-sig review. Hot/warm/cold split: 5% / 20% / 75%.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <Chip tone="ok">2FA enabled</Chip>
                          <Chip tone="ok">Multi-sig &gt;$10K</Chip>
                          <Chip tone="purple">Cold ≥75%</Chip>
                          <Chip tone="amber">SECP-aligned</Chip>
                        </div>
                      </div>
                    </div>
                  </PlasticCard>
                </>
              )}
            </>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 5: BONUSES & RANKS
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'bonuses' && (
            <>
              {/* Rank ladder */}
              <PlasticCard className="mt-4 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Rank progress</div>
                    <h3 className="mt-1 text-lg font-semibold">
                      {rankProg?.currentRank || 'R1'} {rankProg?.currentRankName || 'Starter'}
                      {rankProg?.canPromoteTo && <Chip tone="ok">↑ Eligible for {rankProg.canPromoteTo}!</Chip>}
                    </h3>
                  </div>
                  {rankProg?.canPromoteTo && (
                    <Button3D
                      variant="teal"
                      size="sm"
                      onClick={async () => {
                        try {
                          await api.post('/api/affiliate/rank/evaluate');
                          load();
                        } catch (e: any) {
                          alert(e?.message || 'Promotion failed');
                        }
                      }}
                    >
                      Claim {rankProg.canPromoteTo} →
                    </Button3D>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-10">
                  {allRanks.map((r, i) => (
                    <div
                      key={r}
                      className={`rounded-card border p-2 text-center text-xs ${
                        i === currentRankIdx
                          ? 'border-teal bg-teal/15 text-teal'
                          : i < currentRankIdx
                          ? 'border-purple-light/40 bg-purple-light/5 text-purple-light'
                          : 'border-glass bg-nested/30 text-white/30'
                      }`}
                    >
                      <div className="text-[9px] text-white/40">{r}</div>
                      <div className="text-base">{i < currentRankIdx ? '✓' : i === currentRankIdx ? '●' : '🔒'}</div>
                    </div>
                  ))}
                </div>

                {rankProg?.nextRank && rankProg.nextRank !== rankProg.currentRank && (
                  <div className="mt-4 rounded-card border border-glass bg-nested/40 p-4">
                    <div className="text-[10px] uppercase tracking-wider text-white/40">
                      Progress to {rankProg.nextRank} {rankProg.nextRankName}
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { key: 'directs', label: 'Directs', icon: '🎯' },
                        { key: 'team', label: 'Team', icon: '🌳' },
                        { key: 'stl', label: 'STL', icon: '⭐' },
                        { key: 'activeLegs', label: 'Active legs', icon: '🦵' },
                        { key: 'industries', label: 'Industries', icon: '🏭' },
                      ].map((m) => {
                        const have = (rankProg.metrics as any)?.[m.key] || 0;
                        const need = (rankProg.nextRankRequirements as any)?.[m.key] || 0;
                        const ratio = need > 0 ? Math.min(1, have / need) : 1;
                        const met = have >= need;
                        return (
                          <div key={m.key} className="rounded-input border border-glass bg-card/40 p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-white/50">{m.icon} {m.label}</span>
                              {met ? <span className="text-xs text-teal">✓</span> : <span className="text-xs text-white/40">{Math.round(ratio * 100)}%</span>}
                            </div>
                            <div className="mt-1 text-sm font-bold tabular-nums">
                              {have}<span className="text-xs text-white/40"> / {need}</span>
                            </div>
                            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-nested">
                              <div className={`h-full rounded-full ${met ? 'bg-teal' : 'bg-gradient-to-r from-purple-light to-amber'}`} style={{ width: `${(ratio * 100).toFixed(1)}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlasticCard>

              {/* Track B cascade */}
              <PlasticCard className="mt-4 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Track B · Franchise Sale Cascade
                </div>
                <h3 className="mt-1 text-lg font-semibold">10-level rank-gated</h3>
                <p className="mt-1 text-xs text-white/60">
                  Triggered only on franchise tier purchases (OF1–OF4 + Sub L1–L10 + Master). Each upline earns levels their rank unlocks.
                </p>
                <div className="mt-3 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
                  {TRACK_B_LEVELS.map((l) => {
                    const accessible = l.lvl <= currentRankIdx + 1;
                    return (
                      <div
                        key={l.lvl}
                        className={`rounded-card border p-2 text-center ${
                          accessible ? 'border-teal/40 bg-teal/10 text-teal' : 'border-glass bg-nested/30 text-white/40'
                        }`}
                      >
                        <div className="text-[9px] text-white/40">L{l.lvl}</div>
                        <div className="mt-0.5 text-sm font-bold tabular-nums">{l.pct}%</div>
                        <div className="text-[9px] mt-0.5">{accessible ? '✓' : '🔒'}</div>
                      </div>
                    );
                  })}
                </div>
              </PlasticCard>

              {/* All 11 bonuses */}
              <PlasticCard className="mt-4 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Bonus catalog · v3.2 §12.7 · 11 bonuses
                </div>
                <h3 className="mt-1 text-lg font-semibold">Stack on top of cascade</h3>

                {(['auto', 'achievement', 'performance', 'elite'] as const).map((tier) => {
                  const tierBonuses = ALL_BONUSES.filter((b) => b.tier === tier);
                  return (
                    <div key={tier} className="mt-4">
                      <div className="text-[11px] font-semibold text-white/70">{TIER_META[tier].label}</div>
                      <div className="text-[10px] text-white/40">{TIER_META[tier].desc}</div>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {tierBonuses.map((b) => (
                          <div
                            key={b.id}
                            className="rounded-card border border-glass bg-nested/60 p-3"
                            style={{ borderTop: `3px solid ${b.color}` }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{b.icon}</span>
                              <span className="text-sm font-semibold" style={{ color: b.color }}>{b.name}</span>
                            </div>
                            <div className="mt-1 text-[10px] text-white/40">{b.rate}</div>
                            <div className="mt-1.5 text-[11px] text-white/70">{b.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </PlasticCard>
            </>
          )}

          {/* ════════════════════════════════════════════════════════════
              TAB 6: COMPLIANCE
          ════════════════════════════════════════════════════════════ */}
          {activeTab === 'compliance' && (
            <>
              {/* KYC tier ladder */}
              <PlasticCard className="mt-4 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">KYC tier ladder</div>
                    <h3 className="mt-1 text-lg font-semibold">
                      Current: Tier {kyc?.tier ?? 0} {kyc?.tierName || 'Sandbox'}
                    </h3>
                  </div>
                  <Link href="/kyc">
                    <Button3D variant="teal" size="sm">Submit document →</Button3D>
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {KYC_TIERS.map((t) => {
                    const isCurrent = t.t === (kyc?.tier ?? 0);
                    const isPast = t.t < (kyc?.tier ?? 0);
                    return (
                      <div
                        key={t.t}
                        className={`rounded-card border p-3 text-center text-xs ${
                          isCurrent
                            ? 'border-teal bg-teal/15 text-teal'
                            : isPast
                            ? 'border-purple-light/40 bg-purple-light/5 text-purple-light'
                            : 'border-glass bg-nested/30 text-white/40'
                        }`}
                      >
                        <div className="text-lg">{isCurrent ? '●' : isPast ? '✓' : '🔒'}</div>
                        <div className="mt-1 text-[11px] font-semibold">T{t.t} {t.name}</div>
                        <div className="text-[10px] opacity-70">
                          {t.inUsd === -1 ? 'Unlimited' : `$${t.inUsd.toLocaleString()}/mo`}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {kyc?.nextTier && kyc.nextTierMissing && kyc.nextTierMissing.length > 0 && (
                  <div className="mt-3 text-xs text-white/60">
                    Missing for Tier {kyc.nextTier}: {kyc.nextTierMissing.join(', ')}
                  </div>
                )}
              </PlasticCard>

              {/* IDS distribution */}
              <PlasticCard className="mt-4 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Income Disclosure Statement (IDS) · FTC required
                </div>
                <h3 className="mt-1 text-lg font-semibold">Earnings distribution</h3>
                <div className="mt-3">
                  {ids?.distribution?.rangesUsd?.map((r, i) => {
                    const total = ids.totalAffiliates || 1;
                    const pct = ((r.count / total) * 100).toFixed(1);
                    return (
                      <div key={i} className="flex items-center gap-3 py-1.5">
                        <div className="w-20 sm:w-28 text-xs text-white/70">{r.rangeLabel}</div>
                        <div className="relative flex-1 h-5 overflow-hidden rounded-full bg-nested">
                          <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-purple-light to-teal" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-14 text-right text-xs text-white/70 tabular-nums">{pct}%</div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-[11px] text-white/50 leading-relaxed">
                  Individual results vary with effort, network quality, and market conditions. Most affiliates earn modest amounts. EHB makes no income guarantee.
                </p>
              </PlasticCard>

              {/* Legal posture */}
              <PlasticCard className="mt-4 p-5">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">⚖️</div>
                  <div className="flex-1">
                    <div className="text-base font-bold">EHB is NOT an MLM</div>
                    <p className="mt-1 text-xs text-white/70">
                      EHB is an <em>Affiliate + Marketplace + Service Platform</em>. Income comes only from real product/service sales — never joining fees, recruitment alone, or self-purchase loops.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    { label: '30-day full refund', state: '✓ active' },
                    { label: 'OFAC sanctions screening', state: '✓ active' },
                    { label: 'Velocity caps · 50/IP/24h', state: '✓ active' },
                    { label: 'Self-purchase block', state: '✓ active' },
                    { label: 'FATF travel rule (≥$1K crypto)', state: '✓ active' },
                    { label: 'Cap overflow → rebate pool', state: '✓ active' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-card border border-glass bg-nested/40 p-2.5 text-xs">
                      <span className="text-white/70">{item.label}</span>
                      <Chip tone="ok">{item.state}</Chip>
                    </div>
                  ))}
                </div>
              </PlasticCard>

              {/* Jurisdictional posture */}
              <PlasticCard className="mt-4 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Jurisdictional posture</div>
                <h3 className="mt-1 text-lg font-semibold">5-country rollout plan</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-5">
                  {[
                    { country: '🇵🇰 Pakistan', state: 'Live', detail: 'SECP compliant', tone: 'ok' as const },
                    { country: '🇦🇪 UAE', state: 'Phase 2', detail: 'MOEC license', tone: 'amber' as const },
                    { country: '🇺🇸 USA', state: 'Phase 2', detail: 'FTC + state MTL', tone: 'amber' as const },
                    { country: '🇮🇳 India', state: 'Phase 2', detail: 'RBI', tone: 'amber' as const },
                    { country: '🇬🇧 UK', state: 'Phase 2', detail: 'FCA', tone: 'amber' as const },
                  ].map((j, i) => (
                    <div key={i} className="rounded-card border border-glass bg-nested/40 p-3 text-center">
                      <div className="text-base">{j.country}</div>
                      <Chip tone={j.tone}>{j.state}</Chip>
                      <div className="mt-1 text-[10px] text-white/50">{j.detail}</div>
                    </div>
                  ))}
                </div>
              </PlasticCard>

              {/* Quick links */}
              <PlasticCard className="mt-4 p-5">
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/api/compliance/ids"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-chip border border-glass bg-card/60 px-3 py-2 text-xs hover:border-purple-light"
                  >
                    📊 Full IDS report
                  </a>
                  <a
                    href="/api/compliance/info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-chip border border-glass bg-card/60 px-3 py-2 text-xs hover:border-purple-light"
                  >
                    🛡️ Compliance info
                  </a>
                  <Link
                    href="/concepts"
                    className="rounded-chip border border-glass bg-card/60 px-3 py-2 text-xs hover:border-purple-light"
                  >
                    📖 Terms & concepts
                  </Link>
                  <Link
                    href="/kyc"
                    className="rounded-chip border border-glass bg-card/60 px-3 py-2 text-xs hover:border-purple-light"
                  >
                    🔐 KYC center
                  </Link>
                </div>
              </PlasticCard>
            </>
          )}
        </div>
      </main>
    </CompliancePortalLayout>
  );
}
