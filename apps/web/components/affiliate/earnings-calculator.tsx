'use client';

import { useMemo, useState } from 'react';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Live Earnings Projection Calculator
 *
 * Lets prospective affiliates pick a target rank + monthly sales volume + industry
 * mix and see projected monthly earnings. All math runs client-side using the
 * locked v3.2 rates from `ehb-info/departments/Affiliate.md` §12.
 *
 * No API needed — purely educational. Numbers are illustrative projections, not
 * guarantees (per IDS / NOT-MLM positioning).
 */

// ─── Locked rates from v3.2 spec (DO NOT change without updating Affiliate.md) ─

const INDUSTRY_RATES: Record<
  string,
  { label: string; direct: number; l1: number; l2: number; tone: 'purple' | 'teal' | 'amber' | 'ok' }
> = {
  HIGH_MARGIN: { label: 'High-Margin (OBS · OLS · ITS · MAS · FIN · INS)', direct: 15, l1: 5, l2: 2, tone: 'purple' },
  STANDARD: { label: 'Standard (GSM · FWS · BCS · FBS · EFS · GSS)', direct: 10, l1: 5, l2: 2, tone: 'teal' },
  COMMODITY: { label: 'Commodity (LDS · AGTS · EDS · MFS · ATS)', direct: 7, l1: 3, l2: 1, tone: 'amber' },
  RECURRING: { label: 'Recurring (WMS · HPS · WES · HCS · TCS · CMS)', direct: 8, l1: 3, l2: 1, tone: 'ok' },
  PREMIUM: { label: 'Premium (RES · CNS · HMS · EAS · SCS)', direct: 5, l1: 2, l2: 1, tone: 'purple' },
  STRATEGIC: { label: 'Strategic (GES · JPS · ERS · ELS · EHB_TUBE)', direct: 6, l1: 2, l2: 1, tone: 'teal' },
};

const RANK_DATA: Array<{
  rank: string;
  name: string;
  directs: number;
  team: number;
  // Track B levels accessible
  trackBLevels: number;
  // Bonus eligibility multipliers (rough)
  bonusMultiplier: number;
}> = [
  { rank: 'R1', name: 'Starter', directs: 0, team: 0, trackBLevels: 0, bonusMultiplier: 0.0 },
  { rank: 'R2', name: 'Beginner', directs: 2, team: 10, trackBLevels: 2, bonusMultiplier: 0.05 },
  { rank: 'R3', name: 'Builder', directs: 5, team: 50, trackBLevels: 3, bonusMultiplier: 0.1 },
  { rank: 'R4', name: 'Leader', directs: 10, team: 150, trackBLevels: 4, bonusMultiplier: 0.15 },
  { rank: 'R5', name: 'Manager', directs: 20, team: 500, trackBLevels: 5, bonusMultiplier: 0.2 },
  { rank: 'R6', name: 'Director', directs: 30, team: 1000, trackBLevels: 6, bonusMultiplier: 0.25 },
  { rank: 'R7', name: 'Sr Director', directs: 50, team: 3000, trackBLevels: 7, bonusMultiplier: 0.3 },
  { rank: 'R8', name: 'Executive', directs: 75, team: 7000, trackBLevels: 8, bonusMultiplier: 0.4 },
  { rank: 'R9', name: 'Regional Head', directs: 100, team: 15000, trackBLevels: 9, bonusMultiplier: 0.5 },
  { rank: 'R10', name: 'Global Leader', directs: 150, team: 50000, trackBLevels: 10, bonusMultiplier: 0.6 },
];

// Track B 10-level cumulative cascade percentage by levels accessible
const TRACK_B_LEVEL_PCT = [0, 5.0, 8.0, 10.0, 11.5, 12.5, 13.3, 13.9, 14.4, 14.7, 15.0];

export function AffiliateEarningsCalculator() {
  const [targetRank, setTargetRank] = useState(2); // R3 by default
  const [monthlySales, setMonthlySales] = useState(2000); // $2K direct sales
  const [networkVolume, setNetworkVolume] = useState(8000); // $8K downline volume
  const [industry, setIndustry] = useState<keyof typeof INDUSTRY_RATES>('STANDARD');
  const [franchiseSalesPerMonth, setFranchiseSalesPerMonth] = useState(0);
  const [franchiseAvgValue, setFranchiseAvgValue] = useState(1500); // OF4 default

  const rank = RANK_DATA[targetRank];
  const rates = INDUSTRY_RATES[industry];

  const projection = useMemo(() => {
    // Track A — Direct sales (Layer 1)
    const trackADirect = (monthlySales * rates.direct) / 100;
    // Track A — Network L1 (3% of L1 referrals' sales)
    const trackAL1 = (networkVolume * rates.l1) / 100;
    // Track A — Network L2 (1.5% of L2 referrals' sales)
    const trackAL2 = (networkVolume * 0.5 * rates.l2) / 100; // L2 typically half of L1 volume

    // Track B — Franchise cascade
    const monthlyFranchiseVolume = franchiseSalesPerMonth * franchiseAvgValue;
    const trackB = (monthlyFranchiseVolume * TRACK_B_LEVEL_PCT[rank.trackBLevels]) / 100;

    // Bonuses (rough projections)
    const matchingBonus = trackAL1 * 0.05; // 5% match on L1
    const teamPerformance =
      networkVolume >= 100000 ? networkVolume * 0.02 : 0; // 2% if team hits $100K/mo
    const retention = trackADirect * 0.01 * Math.min(2, rank.bonusMultiplier * 4); // 1% per 3-month retained, capped 2%
    const monthlyLeader = rank.bonusMultiplier > 0.3 ? 200 : 0; // top 10 country reward (illustrative)

    const trackATotal = trackADirect + trackAL1 + trackAL2;
    const bonusTotal = matchingBonus + teamPerformance + retention + monthlyLeader;
    const grandTotal = trackATotal + trackB + bonusTotal;

    // Annual
    const annual = grandTotal * 12;

    return {
      trackADirect,
      trackAL1,
      trackAL2,
      trackATotal,
      trackB,
      matchingBonus,
      teamPerformance,
      retention,
      monthlyLeader,
      bonusTotal,
      grandTotal,
      annual,
    };
  }, [targetRank, monthlySales, networkVolume, industry, franchiseSalesPerMonth, franchiseAvgValue, rates, rank]);

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            🧮 Live Earnings Projection
          </div>
          <h3 className="mt-1 text-lg font-semibold">Estimate your monthly income</h3>
          <p className="mt-1 max-w-xl text-xs text-white/50">
            Pick rank + sales volume + industry. Projection uses locked v3.2 rates. Numbers are
            illustrative — actual income depends on real product sales (per IDS).
          </p>
        </div>
        <Chip tone="purple">Educational only — not a guarantee</Chip>
      </div>

      {/* ─── Inputs ──────────────────────────────────────────────────────── */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Rank slider */}
        <div className="rounded-card border border-glass bg-nested/60 p-4">
          <div className="flex items-center justify-between">
            <label className="text-xs text-white/70">Target rank</label>
            <Chip tone="purple">
              {rank.rank} {rank.name}
            </Chip>
          </div>
          <input
            type="range"
            min={0}
            max={9}
            value={targetRank}
            onChange={(e) => setTargetRank(Number(e.target.value))}
            className="mt-3 w-full accent-purple-light"
          />
          <div className="mt-2 grid grid-cols-5 gap-1 text-[10px] text-white/40">
            <span>R1</span>
            <span className="text-center">R3</span>
            <span className="text-center">R5</span>
            <span className="text-center">R7</span>
            <span className="text-right">R10</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded border border-glass bg-card/40 px-2 py-1">
              <span className="text-white/40">Directs needed: </span>
              <span className="font-semibold">{rank.directs}</span>
            </div>
            <div className="rounded border border-glass bg-card/40 px-2 py-1">
              <span className="text-white/40">Team needed: </span>
              <span className="font-semibold">{rank.team.toLocaleString()}</span>
            </div>
            <div className="rounded border border-glass bg-card/40 px-2 py-1">
              <span className="text-white/40">Track B levels: </span>
              <span className="font-semibold">{rank.trackBLevels}</span>
            </div>
            <div className="rounded border border-glass bg-card/40 px-2 py-1">
              <span className="text-white/40">Cumulative %: </span>
              <span className="font-semibold">{TRACK_B_LEVEL_PCT[rank.trackBLevels].toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Industry selector */}
        <div className="rounded-card border border-glass bg-nested/60 p-4">
          <label className="text-xs text-white/70">Industry category</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as keyof typeof INDUSTRY_RATES)}
            className="mt-2 w-full rounded-input border border-glass bg-card px-3 py-2 text-sm"
          >
            {Object.entries(INDUSTRY_RATES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="rounded border border-glass bg-card/40 px-2 py-2">
              <div className="text-white/40">Direct</div>
              <div className="mt-1 text-base font-bold text-teal">{rates.direct}%</div>
            </div>
            <div className="rounded border border-glass bg-card/40 px-2 py-2">
              <div className="text-white/40">L1</div>
              <div className="mt-1 text-base font-bold text-purple-light">{rates.l1}%</div>
            </div>
            <div className="rounded border border-glass bg-card/40 px-2 py-2">
              <div className="text-white/40">L2</div>
              <div className="mt-1 text-base font-bold text-amber">{rates.l2}%</div>
            </div>
          </div>
        </div>

        {/* Monthly direct sales */}
        <div className="rounded-card border border-glass bg-nested/60 p-4">
          <div className="flex items-baseline justify-between">
            <label className="text-xs text-white/70">Your monthly sales (USD)</label>
            <span className="text-base font-bold tabular-nums text-teal">
              ${monthlySales.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={50000}
            step={500}
            value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
            className="mt-3 w-full accent-teal"
          />
          <div className="mt-1 flex justify-between text-[10px] text-white/40">
            <span>$0</span>
            <span>$25K</span>
            <span>$50K</span>
          </div>
        </div>

        {/* Network volume */}
        <div className="rounded-card border border-glass bg-nested/60 p-4">
          <div className="flex items-baseline justify-between">
            <label className="text-xs text-white/70">Downline monthly volume (USD)</label>
            <span className="text-base font-bold tabular-nums text-purple-light">
              ${networkVolume.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={500000}
            step={1000}
            value={networkVolume}
            onChange={(e) => setNetworkVolume(Number(e.target.value))}
            className="mt-3 w-full accent-purple-light"
          />
          <div className="mt-1 flex justify-between text-[10px] text-white/40">
            <span>$0</span>
            <span>$250K</span>
            <span>$500K</span>
          </div>
        </div>

        {/* Franchise sales (Track B) */}
        <div className="rounded-card border border-glass bg-nested/60 p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-white/70">
              Track B — franchise sales in your network this month
            </label>
            <Chip tone={rank.trackBLevels > 0 ? 'ok' : 'fail'}>
              {rank.trackBLevels > 0 ? `${rank.trackBLevels} levels unlocked` : 'Reach R2+ to unlock'}
            </Chip>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <div className="flex items-baseline justify-between text-[11px] text-white/50">
                <span># franchise sales / month</span>
                <span className="font-bold text-amber">{franchiseSalesPerMonth}</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={franchiseSalesPerMonth}
                onChange={(e) => setFranchiseSalesPerMonth(Number(e.target.value))}
                className="mt-1 w-full accent-amber"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between text-[11px] text-white/50">
                <span>Avg franchise price</span>
                <span className="font-bold text-amber">${franchiseAvgValue.toLocaleString()}</span>
              </div>
              <select
                value={franchiseAvgValue}
                onChange={(e) => setFranchiseAvgValue(Number(e.target.value))}
                className="mt-1 w-full rounded-input border border-glass bg-card px-2 py-1.5 text-xs"
              >
                <option value={100}>OF1 — $100</option>
                <option value={250}>OF2 — $250</option>
                <option value={750}>OF3 — $750</option>
                <option value={1500}>OF4 — $1,500</option>
                <option value={5000}>Sub L1 — $5,000</option>
                <option value={20000}>Sub L5 — $20,000</option>
                <option value={50000}>Sub L10 — $50,000</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Output ──────────────────────────────────────────────────────── */}
      <div className="mt-5 rounded-card border-2 border-teal/40 bg-gradient-to-br from-teal/10 via-purple-light/5 to-amber/10 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              Projected monthly earnings
            </div>
            <div className="mt-1 text-4xl font-bold tabular-nums text-teal sm:text-5xl">
              ${projection.grandTotal.toFixed(0)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/50">Annual</div>
            <div className="mt-1 text-2xl font-bold tabular-nums text-amber">
              ${projection.annual.toFixed(0)}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <Row label={`Track A — Direct ${rates.direct}%`} value={projection.trackADirect} tone="teal" />
          <Row label={`Track A — L1 (${rates.l1}%)`} value={projection.trackAL1} tone="purple" />
          <Row label={`Track A — L2 (${rates.l2}%)`} value={projection.trackAL2} tone="purple" />
          <Row
            label={`Track B (${rank.trackBLevels} levels)`}
            value={projection.trackB}
            tone="amber"
            disabled={rank.trackBLevels === 0}
          />
          <Row label="Matching Bonus (5% L1)" value={projection.matchingBonus} tone="purple" />
          <Row
            label={`Team Performance ${networkVolume >= 100000 ? '(✓ qualified)' : '(needs $100K)'}`}
            value={projection.teamPerformance}
            tone="ok"
            disabled={projection.teamPerformance === 0}
          />
          <Row label="Retention uplift" value={projection.retention} tone="ok" />
          <Row
            label={`Monthly Leader ${rank.bonusMultiplier > 0.3 ? '(top-10)' : '(R7+ only)'}`}
            value={projection.monthlyLeader}
            tone="amber"
            disabled={projection.monthlyLeader === 0}
          />
        </div>
      </div>

      {/* ─── Disclaimer ──────────────────────────────────────────────────── */}
      <p className="mt-3 text-[10px] leading-relaxed text-white/40">
        ⚖️ <strong>Disclaimer:</strong> This calculator is for educational purposes only. Actual
        earnings depend on real product sales, your effort, and market conditions. EHB is{' '}
        <strong>NOT MLM</strong> — no income from joining fees, no income from pure recruitment.
        See <a href="/affiliate/ids" className="text-purple-light underline">Income Disclosure Statement</a> for
        median earnings data. Results are projections based on locked v3.2 commission rates from{' '}
        <code className="text-[10px]">ehb-info/departments/Affiliate.md</code> §12.
      </p>
    </PlasticCard>
  );
}

function Row({
  label,
  value,
  tone,
  disabled = false,
}: {
  label: string;
  value: number;
  tone: 'teal' | 'purple' | 'amber' | 'ok';
  disabled?: boolean;
}) {
  const colorClass =
    tone === 'teal'
      ? 'text-teal'
      : tone === 'purple'
      ? 'text-purple-light'
      : tone === 'amber'
      ? 'text-amber'
      : 'text-green-400';
  return (
    <div
      className={`flex items-center justify-between rounded border border-glass bg-card/30 px-3 py-2 text-sm ${
        disabled ? 'opacity-40' : ''
      }`}
    >
      <span className="text-white/70">{label}</span>
      <span className={`font-bold tabular-nums ${colorClass}`}>${value.toFixed(2)}</span>
    </div>
  );
}
