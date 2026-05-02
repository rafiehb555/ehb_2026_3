'use client';

import { useMemo, useState } from 'react';
import { api } from '@/lib/api-client';
import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { StlBadge } from '@/components/ui/stl-badge';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';
import { STL_LEVELS, getLevelDef, SOURCE_CAPS, STL_FORMULA } from '@/lib/stl/levels';
import { UserTypeSelector } from '@/components/dmo/user-type-selector';
import { StlSourceMatrix } from '@/components/dmo/stl-source-matrix';
import { getUserType, type UserTypeId } from '@/lib/stl/user-types';
import { CircularGauge } from '@/components/ui/circular-gauge';
import { MultiRingGauge } from '@/components/ui/multi-ring-gauge';

const INDUSTRY_STL = [
  { code: 'GSM', name: 'GoSellr', level: 7, score: 78, icon: '🛒', from: '#2BBFA0', to: '#38C878' },
  { code: 'JPS', name: 'JPS', level: 5, score: 65, icon: '📄', from: '#ec4899', to: '#db2777' },
  { code: 'WMS', name: 'WMS (Health)', level: 6, score: 70, icon: '🩺', from: '#F05858', to: '#C03030' },
  { code: 'HPS', name: 'HPS (Education)', level: 7, score: 75, icon: '🎓', from: '#7B6EF6', to: '#A098F8' },
  { code: 'SOT', name: 'SOT (Tech)', level: 6, score: 68, icon: '🏕️', from: '#fbbf24', to: '#f59e0b' },
  { code: 'OTHER', name: 'Others', level: 5, score: 60, icon: '🌐', from: '#3b82f6', to: '#2563eb' },
];

interface DemoUser {
  id: string;
  name: string;
  email: string;
  type: string;
  pss: number;
  crb: number;
  dmo: number;
}

const demoLeaderboard: DemoUser[] = [
  { id: 'u-001', name: 'Ahmed Raza',    email: 'ahmed@demo.ehb',    type: 'Seller',          pss: 5, crb: 7, dmo: 6 },
  { id: 'u-002', name: 'Zainab Iqbal',  email: 'zainab@demo.ehb',   type: 'Franchisee',      pss: 4, crb: 5, dmo: 7 },
  { id: 'u-003', name: 'Bilal Khan',    email: 'bilal@demo.ehb',    type: 'Service Provider',pss: 5, crb: 6, dmo: 5 },
  { id: 'u-004', name: 'Fatima Sheikh', email: 'fatima@demo.ehb',   type: 'Buyer',           pss: 3, crb: 4, dmo: 4 },
  { id: 'u-005', name: 'Usman Ali',     email: 'usman@demo.ehb',    type: 'Rider',           pss: 2, crb: 2, dmo: 3 },
  { id: 'u-006', name: 'Ayesha Malik',  email: 'ayesha@demo.ehb',   type: 'Employer',        pss: 4, crb: 3, dmo: 4 },
  { id: 'u-007', name: 'Hamza Tariq',   email: 'hamza@demo.ehb',    type: 'Seller',          pss: 3, crb: 3, dmo: 3 },
  { id: 'u-008', name: 'Saad Mehmood',  email: 'saad@demo.ehb',     type: 'Visitor',         pss: 1, crb: 0, dmo: 1 },
];

function computeLocalStl({ pss, crb, dmo }: { pss: number; crb: number; dmo: number }) {
  const pp = (pss / 10) * 40;
  const cp = (crb / 10) * 40;
  const dp = (dmo / 10) * 40;
  const raw = pp + cp + dp;
  const lowest = Math.min(pss, crb, dmo);
  const normalized = raw / 1.2;
  const cap = lowest * 10 + 10;
  const score = Math.max(0, Math.min(100, Math.min(normalized, cap)));
  let level = 1;
  if (score >= 90) level = 10;
  else if (score >= 80) level = 9;
  else if (score >= 70) level = 8;
  else if (score >= 60) level = 7;
  else if (score >= 50) level = 6;
  else if (score >= 40) level = 5;
  else if (score >= 30) level = 4;
  else if (score >= 20) level = 3;
  else if (score >= 10) level = 2;
  return { score: Math.round(score * 10) / 10, level, raw: Math.round(raw * 10) / 10, cap, lowest };
}

export default function StlPage() {
  const [selectedId, setSelectedId] = useState<string>(demoLeaderboard[0].id);
  const [chainResult, setChainResult] = useState<any>(null);
  const [validating, setValidating] = useState(false);
  const [userType, setUserType] = useState<UserTypeId>('seller');
  const typeDef = useMemo(() => getUserType(userType), [userType]);

  const enriched = useMemo(
    () =>
      demoLeaderboard
        .map((u) => ({ ...u, ...computeLocalStl(u) }))
        .sort((a, b) => b.score - a.score),
    []
  );

  const selected = enriched.find((u) => u.id === selectedId) || enriched[0];
  const selectedDef = getLevelDef(selected.level);
  const nextDef = selected.level < 10 ? STL_LEVELS[selected.level] : null;
  const pctToNext = nextDef
    ? Math.max(
        0,
        Math.min(
          100,
          ((selected.score - selectedDef.scoreMin) /
            (nextDef.scoreMin - selectedDef.scoreMin)) *
            100
        )
      )
    : 100;

  async function runMinChain() {
    setValidating(true);
    try {
      const res = await api.post('/api/stl/validate-product', {
        productSTL: Math.max(1, selected.level - 1),
        sellerSTL: selected.level,
        companySTL: 3,
        ownerSTL: selected.level + 1,
      });
      setChainResult(res);
    } catch (e: any) {
      setChainResult({ error: e?.message });
    } finally {
      setValidating(false);
    }
  }

  return (
    <>
      <DmoTopbar
        title="STL Management"
        subtitle="EHB-STL-LEVEL = MIN(PSS, CRB, DMO composite) · L1 FREE → L10 SUPREME"
        breadcrumb={['Verification', 'STL']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        {/* ====== 0. User type selector at top ====== */}
        <PlasticCard className="p-4 sm:p-5">
          <UserTypeSelector value={userType} onChange={setUserType} />
        </PlasticCard>

        {/* ====== 1. NEW BEAUTIFUL HERO — CircularGauge + side panel ====== */}
        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          {/* Gauge card */}
          <PlasticCard className="overflow-hidden p-0">
            <div
              className="relative flex flex-col items-center p-6 sm:p-8"
              style={{
                background: `radial-gradient(ellipse at top, ${selectedDef.from}22, transparent 60%), linear-gradient(135deg, ${selectedDef.to}08, transparent 80%)`,
              }}
            >
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                <div className="text-[10px] uppercase tracking-widest text-white/50 sm:text-xs">
                  EHB-STL-LEVEL · PSS + CRB + DMO composite
                </div>
              </div>

              <MultiRingGauge
                score={selected.score}
                level={selected.level}
                levelName={selectedDef.name}
                mainFrom={selectedDef.from}
                mainTo={selectedDef.to}
                size={340}
                mainStroke={18}
                ringStroke={10}
                ringGap={6}
                rings={[
                  {
                    label: 'PSS',
                    value: (selected.pss / 10) * 100,
                    from: '#7B6EF6',
                    to: '#A098F8',
                  },
                  {
                    label: 'CRB',
                    value: (selected.crb / 10) * 100,
                    from: '#2BBFA0',
                    to: '#38C878',
                  },
                  {
                    label: 'DMO',
                    value: (selected.dmo / 10) * 100,
                    from: '#F0A030',
                    to: '#F8B830',
                  },
                ]}
              />

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xl font-bold sm:text-2xl">{selected.name}</span>
                <Chip>{selected.type}</Chip>
              </div>
              <div className="mt-2 max-w-lg text-center text-xs text-white/70 sm:text-sm">
                {selectedDef.authority}
              </div>

              {/* Entity STL breakdown — 7 entity types per user */}
              <div className="mt-6 w-full border-t border-glass pt-5">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Your EHB-STL entities
                  </div>
                  <div className="mt-0.5 text-[10px] text-white/50">
                    MIN(entity STLs) → caps the final trust shown on any product you list
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
                  {getEntityStls(selected, userType).map((e) => (
                    <div
                      key={e.key}
                      className={`rounded-card border p-2.5 text-center transition ${
                        e.active
                          ? 'border-glass bg-nested/60'
                          : 'border-glass/40 bg-nested/20'
                      }`}
                      style={e.active ? { borderTopColor: e.color, borderTopWidth: 2 } : undefined}
                    >
                      <div className={`text-xl ${!e.active ? 'grayscale opacity-50' : ''}`}>
                        {e.icon}
                      </div>
                      <div
                        className={`mt-1 text-[10px] font-semibold ${
                          e.active ? 'text-white/85' : 'text-white/40'
                        }`}
                      >
                        {e.name}
                      </div>
                      {e.active && e.level ? (
                        <>
                          <div className="mt-1.5 flex justify-center">
                            <StlBadge level={e.level} size="xs" showName={false} />
                          </div>
                          <div className="mt-1 text-[10px] text-white/50 tabular-nums">
                            {e.score.toFixed(1)}/100
                          </div>
                        </>
                      ) : (
                        <div className="mt-2.5 text-[10px] text-white/30">N/A</div>
                      )}
                      {e.primary ? (
                        <div className="mt-1 text-[9px] font-semibold uppercase tracking-widest"
                          style={{ color: e.color }}
                        >
                          Primary
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress to next level */}
              {nextDef ? (
                <div className="mt-6 w-full max-w-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">
                      Progress to L{nextDef.level} {nextDef.name}
                    </span>
                    <span className="tabular-nums font-semibold" style={{ color: selectedDef.to }}>
                      {Math.round(pctToNext)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip transition-all"
                      style={{
                        width: `${pctToNext}%`,
                        background: `linear-gradient(to right, ${selectedDef.from}, ${selectedDef.to})`,
                        boxShadow: `0 0 14px ${selectedDef.to}66`,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center text-[11px] text-white/50">
                    Next unlock: {nextDef.authority}
                  </div>
                </div>
              ) : (
                <div className="mt-6 text-xs text-white/60">
                  Highest level — no further promotion.
                </div>
              )}
            </div>
          </PlasticCard>

          {/* Sidebar: EHBGC Lock + Rank + Breakdown */}
          <div className="space-y-3">
            <PlasticCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-gradient-to-br from-[#7B6EF6] to-[#A098F8] text-xl shadow-lg">
                  🔒
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    EHBGC Lock (at this level)
                  </div>
                  <div className="text-xl font-bold tabular-nums">
                    {selectedDef.ehbgcLock.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-white/50">Locked for STL Boost</div>
                </div>
              </div>
            </PlasticCard>

            <PlasticCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Composite Rank (demo)
                  </div>
                  <div className="text-2xl font-bold tabular-nums">#{selected.level * 100 + Math.round(selected.score)}</div>
                </div>
                <div className="text-3xl">🏆</div>
              </div>
            </PlasticCard>

            <PlasticCard className="p-4">
              <div className="mb-2 text-[10px] uppercase tracking-widest text-white/40">
                STL Breakdown
              </div>
              <div className="space-y-2">
                <BarRow icon="🛡️" label="PSS" value={selected.pss} max={10} from="#7B6EF6" to="#A098F8" />
                <BarRow icon="📜" label="CRB" value={selected.crb} max={10} from="#2BBFA0" to="#38C878" />
                <BarRow icon="🏛️" label="DMO" value={selected.dmo} max={10} from="#F0A030" to="#F8B830" />
              </div>
            </PlasticCard>
          </div>
        </div>

        {/* Industry STL Levels (6-card grid matching screenshot) */}
        <PlasticCard className="p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Industry STL Levels
              </div>
              <h2 className="mt-1 text-base font-semibold sm:text-lg">
                Per-industry trust scores
              </h2>
            </div>
            <a href="/industries" className="text-xs text-purple-light hover:underline">
              View All →
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {INDUSTRY_STL.map((ind) => (
              <div
                key={ind.code}
                className="rounded-card border border-glass bg-nested/60 p-4 text-center transition hover:scale-[1.03]"
                style={{ borderTop: `2px solid ${ind.to}66` }}
              >
                <div
                  className="mx-auto flex h-11 w-11 items-center justify-center rounded-card text-xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${ind.from}, ${ind.to})`,
                    boxShadow: `0 4px 14px ${ind.to}55`,
                  }}
                >
                  {ind.icon}
                </div>
                <div className="mt-2 text-xs font-semibold text-white/90">{ind.name}</div>
                <div className="mt-2 flex justify-center">
                  <StlBadge level={ind.level} size="xs" showName={false} />
                </div>
                <div className="mt-1 text-[11px] text-white/50 tabular-nums">
                  {ind.score}/100
                </div>
              </div>
            ))}
          </div>
        </PlasticCard>

        {/* Quick Actions row — matches screenshot design */}
        <PlasticCard className="p-5 sm:p-6">
          <div className="mb-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              Quick Actions
            </div>
            <h2 className="mt-1 text-base font-semibold sm:text-lg">Operator actions</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction icon="🔒" title="Lock EHBGC" subtitle="Increase Lock" href="/dmo/wallet-control" gradient="from-[#7B6EF6] to-[#A098F8]" />
            <QuickAction icon="📈" title="Improve STL" subtitle="View Tips" href="/how-it-works" gradient="from-[#F0A030] to-[#F8B830]" />
            <QuickAction icon="📜" title="Take Exam" subtitle="Boost CRB" href="/crb/exams" gradient="from-[#2BBFA0] to-[#38C878]" />
            <QuickAction icon="📊" title="View History" subtitle="Activity log" href="/dmo/activity-engine" gradient="from-[#ec4899] to-[#db2777]" />
          </div>
        </PlasticCard>

        {/* ====== STL source matrix (now below hero/industry/quick-actions) ====== */}
        <StlSourceMatrix type={typeDef} />

        {/* ====== 2. Formula + Source caps ====== */}
        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Composite formula</div>
            <h3 className="mt-1 text-lg font-semibold">How EHB-STL-LEVEL is computed</h3>
            <div className="mt-4 rounded-card border border-glass bg-nested/60 p-4 font-mono text-xs leading-relaxed text-white/80">
              <div><span className="text-teal">PSS_pts</span> = (PSS × 40) ÷ 10 = {((selected.pss * 40) / 10).toFixed(1)}</div>
              <div><span className="text-teal">CRB_pts</span> = (CRB × 40) ÷ 10 = {((selected.crb * 40) / 10).toFixed(1)}</div>
              <div><span className="text-teal">DMO_pts</span> = (DMO × 40) ÷ 10 = {((selected.dmo * 40) / 10).toFixed(1)}</div>
              <div className="mt-2 border-t border-white/5 pt-2">
                <span className="text-amber">raw</span> = PSS + CRB + DMO = <span className="text-white">{selected.raw}</span> <span className="text-white/30">/ 120</span>
              </div>
              <div><span className="text-amber">normalized</span> = raw ÷ 1.2 = {(selected.raw / 1.2).toFixed(1)}</div>
              <div><span className="text-amber">cap</span> = lowest(P,C,D) × 10 + 10 = {selected.lowest} × 10 + 10 = {selected.cap}</div>
              <div className="mt-2 border-t border-white/5 pt-2 text-base">
                <span className="text-[#F0A030]">FINAL</span> = MIN(normalized, cap) ={' '}
                <span className="text-white text-lg font-bold tabular-nums">{selected.score.toFixed(1)}</span>{' '}
                → <span style={{ color: selectedDef.to }}>L{selected.level} {selectedDef.name}</span>
              </div>
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Source caps</div>
            <h3 className="mt-1 text-sm font-semibold">Max level from each source alone</h3>
            <div className="mt-3 space-y-2 text-xs">
              {Object.entries(SOURCE_CAPS).map(([src, info]: any) => (
                <div key={src} className="flex items-center justify-between rounded-chip border border-glass bg-nested/60 px-3 py-2">
                  <div>
                    <div className="font-semibold text-white/90">{src}</div>
                    <div className="text-[11px] text-white/50">{info.desc}</div>
                  </div>
                  <StlBadge level={info.cap} size="xs" />
                </div>
              ))}
            </div>
          </PlasticCard>
        </div>

        {/* ====== 3. Full 10-level ladder with rules + EHBGC lock ====== */}
        <PlasticCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">10-Level Ladder</div>
              <h3 className="mt-1 text-lg font-semibold">
                L1 FREE → L10 SUPREME — rules, EHBGC lock, eligibility
              </h3>
            </div>
            <Chip>Click any level for details</Chip>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {STL_LEVELS.map((def) => {
              const isCurrent = def.level === selected.level;
              return (
                <div
                  key={def.level}
                  className={`group relative overflow-hidden rounded-card border p-4 transition ${
                    isCurrent
                      ? 'ring-2 ring-offset-2 ring-offset-transparent'
                      : 'border-glass'
                  }`}
                  style={{
                    borderColor: isCurrent ? def.to : undefined,
                    ringColor: def.to as any,
                    background: `linear-gradient(135deg, ${def.from}12, ${def.to}06 50%, transparent)`,
                  }}
                >
                  {/* accent stripe */}
                  <div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ background: `linear-gradient(180deg, ${def.from}, ${def.to})` }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-card text-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${def.from}, ${def.to})`,
                          boxShadow: `0 4px 14px ${def.to}55`,
                        }}
                      >
                        {def.icon}
                      </div>
                      <div>
                        <div className="text-xs text-white/50">{def.tier} tier</div>
                        <div className="text-base font-bold">
                          L{def.level} <span style={{ color: def.to }}>{def.name}</span>
                        </div>
                      </div>
                    </div>
                    {isCurrent ? <Chip tone="ok">YOU</Chip> : null}
                  </div>

                  <div className="mt-3 space-y-1.5 text-[11px]">
                    <Row label="Score range" value={`${def.scoreMin}–${def.scoreMax}`} />
                    <Row label="EHBGC lock" value={`${def.ehbgcLock.toLocaleString()}`} accent={def.to} />
                    <Row label="Authority" value={def.authority} wrap />
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Rules</div>
                    <ul className="mt-1 space-y-0.5 text-[11px] text-white/70">
                      {def.rules.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span style={{ color: def.to }}>•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {def.userTypes.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-chip border border-glass bg-white/5 px-1.5 py-0.5 text-[10px] text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </PlasticCard>

        {/* ====== 4. Upgrade / Downgrade system ====== */}
        <div className="grid gap-4 md:grid-cols-2">
          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Up system</div>
            <h3 className="mt-1 text-lg font-semibold">How users promote</h3>
            <div className="mt-4 space-y-3 text-sm">
              <UpgradeRow icon="📈" title="Activity & Performance" desc="Orders, reviews, on-time delivery, consistency → raises DMO score." />
              <UpgradeRow icon="📜" title="CRB Exams" desc="Pass MCQ / practical exams → raises CRB level (max L9)." />
              <UpgradeRow icon="🛡️" title="PSS Verification" desc="Upload higher-grade documents → raises PSS (max L5)." />
              <UpgradeRow icon="🌐" title="Franchise Activation" desc="Open Master/Corporate franchise → lifts combined cap (L8)." />
              <UpgradeRow icon="🏛️" title="DMO Board Approval" desc="Founder-only path to L10 SUPREME." />
            </div>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-xs uppercase tracking-widest text-white/40">Down system</div>
            <h3 className="mt-1 text-lg font-semibold">What causes demotion</h3>
            <div className="mt-4 space-y-3 text-sm">
              <UpgradeRow icon="⚠️" title="3 upheld complaints / 3 weeks" desc="Auto −2 STL levels." danger />
              <UpgradeRow icon="🚫" title="Fraud detected" desc="Immediate freeze to L1 FREE." danger />
              <UpgradeRow icon="⏰" title="60-day inactivity" desc="−1 level per month." danger />
              <UpgradeRow icon="🔄" title="Missed CRB refill" desc="Upgrade blocked; eventual downgrade." danger />
              <UpgradeRow icon="📉" title="Rating < 3.5" desc="Blocks promotion; triggers watch." danger />
            </div>
          </PlasticCard>
        </div>

        {/* ====== 5. Leaderboard + drill-in (enhanced) ====== */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_340px]">
          <PlasticCard className="p-0">
            <div className="flex items-center justify-between border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                  Leaderboard
                </div>
                <h3 className="mt-1 text-sm font-semibold sm:text-lg">
                  Top users · combined EHB-STL
                </h3>
              </div>
              <Chip tone="purple">{enriched.length}</Chip>
            </div>
            <ul className="divide-y divide-white/5">
              {enriched.map((u, idx) => {
                const active = u.id === selectedId;
                const def = getLevelDef(u.level);
                return (
                  <li
                    key={u.id}
                    onClick={() => setSelectedId(u.id)}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition sm:gap-4 sm:px-5 ${
                      active ? 'bg-white/5' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="w-6 text-center text-xs font-bold text-white/40 sm:w-8 sm:text-sm">
                      #{idx + 1}
                    </div>
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-card text-base sm:h-10 sm:w-10 sm:text-xl"
                      style={{ background: `linear-gradient(135deg, ${def.from}, ${def.to})` }}
                    >
                      {def.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="truncate text-xs font-semibold sm:text-sm">{u.name}</span>
                        <Chip>{u.type}</Chip>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/40 sm:gap-2 sm:text-[11px]">
                        <span>PSS L{u.pss}</span>
                        <span>·</span>
                        <span>CRB L{u.crb}</span>
                        <span>·</span>
                        <span>DMO L{u.dmo}</span>
                      </div>
                    </div>
                    <div className="hidden items-center gap-2 md:flex">
                      <ComponentMiniBar value={u.pss} tone="purple" />
                      <ComponentMiniBar value={u.crb} tone="teal" />
                      <ComponentMiniBar value={u.dmo} tone="amber" />
                    </div>
                    <div className="hidden w-14 text-right text-xs tabular-nums text-white/70 sm:block sm:w-16 sm:text-sm">
                      {u.score.toFixed(1)}
                    </div>
                    <StlBadge level={u.level} size="xs" showName={false} />
                  </li>
                );
              })}
            </ul>
          </PlasticCard>

          <div className="space-y-4">
            <PlasticCard className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/40">MIN-chain validator</div>
              <h3 className="mt-1 text-sm font-semibold">Validate product trust chain</h3>
              <p className="mt-2 text-xs text-white/50">
                Runs against API — product/seller/company/owner — weakest link caps the final STL.
              </p>
              <Button3D variant="blue" size="sm" className="mt-3" onClick={runMinChain} disabled={validating}>
                {validating ? 'Validating…' : 'Run MIN-chain'}
              </Button3D>
              {chainResult ? (
                <div className="mt-4 rounded-card border border-glass bg-nested p-3 text-xs">
                  {chainResult.error ? (
                    <span className="text-[#F05858]">{chainResult.error}</span>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Final STL</span>
                        <StlBadge level={chainResult.finalStl} size="xs" />
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-white/60">Blocking layer</span>
                        <Chip tone="fail">{chainResult.blockingLayer}</Chip>
                      </div>
                      <div className="mt-3 space-y-1 text-[11px]">
                        {chainResult.chain?.map((c: any, i: number) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-white/50">{c.name}</span>
                            <span className="tabular-nums">L{c.level}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </PlasticCard>

            <PlasticCard className="p-5">
              <div className="text-xs uppercase tracking-widest text-white/40">Current user detail</div>
              <div className="mt-2 text-xs space-y-1 text-white/70">
                <div><span className="text-white/40">Name:</span> {selected.name}</div>
                <div><span className="text-white/40">Type:</span> {selected.type}</div>
                <div><span className="text-white/40">Upgrade path:</span> {selectedDef.upgradeTo}</div>
                <div>
                  <span className="text-white/40">Downgrade triggers:</span>
                  <ul className="mt-1 space-y-0.5">
                    {selectedDef.downgradeTriggers.map((d, i) => (
                      <li key={i} className="text-[#F05858]/80">• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </PlasticCard>
          </div>
        </div>
      </div>
    </>
  );
}

// ============ Helpers ============

interface EntityStl {
  key: string;
  name: string;
  icon: string;
  color: string;
  active: boolean;
  primary: boolean;
  level: number | null;
  score: number;
}

/**
 * For a given user + selected user-type, return their STL across all 7 entity types.
 * - Personal is always active (composite PSS+CRB+DMO).
 * - Other entities are active based on user type + a realistic demo offset.
 * - MIN-chain of all active entities caps final displayed product trust.
 */
function getEntityStls(user: any, userType: string): EntityStl[] {
  const baseLevel = user.level;
  const baseScore = user.score;
  const isSeller = userType === 'seller' || userType === 'production_company';
  const isService = userType === 'service_provider';
  const isFranchisee = userType === 'franchisee';
  const isProduction = userType === 'production_company';
  const isAdmin = userType === 'admin';

  return [
    {
      key: 'personal',
      name: 'Personal',
      icon: '👤',
      color: '#7B6EF6',
      active: true,
      primary: true,
      level: baseLevel,
      score: baseScore,
    },
    {
      key: 'seller',
      name: 'Seller',
      icon: '🏪',
      color: '#ec4899',
      active: isSeller,
      primary: userType === 'seller',
      level: isSeller ? Math.max(1, baseLevel - 1) : null,
      score: isSeller ? Math.max(0, baseScore - 8) : 0,
    },
    {
      key: 'service',
      name: 'Service',
      icon: '🛠️',
      color: '#2BBFA0',
      active: isService,
      primary: isService,
      level: isService ? Math.max(1, baseLevel - 1) : null,
      score: isService ? Math.max(0, baseScore - 6) : 0,
    },
    {
      key: 'product',
      name: 'Product (avg)',
      icon: '📦',
      color: '#F0A030',
      active: isSeller || isProduction,
      primary: false,
      level: isSeller || isProduction ? Math.max(1, baseLevel - 2) : null,
      score: isSeller || isProduction ? Math.max(0, baseScore - 14) : 0,
    },
    {
      key: 'production',
      name: 'Production Co.',
      icon: '🏭',
      color: '#fbbf24',
      active: isProduction,
      primary: isProduction,
      level: isProduction ? baseLevel : null,
      score: isProduction ? baseScore - 2 : 0,
    },
    {
      key: 'company',
      name: 'Company',
      icon: '🏢',
      color: '#3b82f6',
      active: isProduction || isAdmin,
      primary: false,
      level: isProduction || isAdmin ? baseLevel - 1 : null,
      score: isProduction || isAdmin ? baseScore - 10 : 0,
    },
    {
      key: 'franchise',
      name: 'Franchise',
      icon: '🌐',
      color: '#F05858',
      active: isFranchisee,
      primary: isFranchisee,
      level: isFranchisee ? baseLevel : null,
      score: isFranchisee ? baseScore : 0,
    },
  ];
}

// ============ Sub-components ============

function BarRow({
  icon,
  label,
  value,
  max,
  from,
  to,
}: {
  icon: string;
  label: string;
  value: number;
  max: number;
  from: string;
  to: string;
}) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-white/70">
          <span className="text-sm">{icon}</span>
          {label}
        </span>
        <span className="font-semibold tabular-nums" style={{ color: to }}>
          L{value}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-chip bg-white/5">
        <div
          className="h-full rounded-chip transition-all"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(to right, ${from}, ${to})`,
          }}
        />
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
  href,
  gradient,
}: {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
  gradient: string;
}) {
  return (
    <a href={href} className="group">
      <div className="flex items-center gap-3 rounded-card border border-glass bg-nested/60 p-4 transition hover:border-purple-light hover:bg-nested/80">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-gradient-to-br ${gradient} text-xl shadow-lg`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-0.5 text-[11px] text-white/50">{subtitle}</div>
        </div>
      </div>
    </a>
  );
}

function ComponentBar({
  label,
  level,
  max,
  tone,
  icon,
}: {
  label: string;
  level: number;
  max: number;
  tone: 'purple' | 'teal' | 'amber';
  icon: string;
}) {
  const pct = (level / max) * 100;
  const g =
    tone === 'purple'
      ? 'from-[#7B6EF6] to-[#A098F8]'
      : tone === 'teal'
        ? 'from-[#2BBFA0] to-[#38C878]'
        : 'from-[#F0A030] to-[#F8B830]';
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
          <span className="text-base">{icon}</span>
          {label}
        </span>
        <span className="text-lg font-bold tabular-nums">L{level}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-chip bg-white/5">
        <div
          className={`h-full rounded-chip bg-gradient-to-r ${g} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 text-[11px] text-white/40 tabular-nums">
        {((level / 10) * 40).toFixed(1)}/40 pts
      </div>
    </div>
  );
}

function ComponentMiniBar({ value, tone }: { value: number; tone: 'purple' | 'teal' | 'amber' }) {
  const colors = {
    purple: '#7B6EF6',
    teal: '#2BBFA0',
    amber: '#F0A030',
  };
  return (
    <div className="h-1.5 w-8 overflow-hidden rounded-chip bg-white/10">
      <div
        className="h-full rounded-chip"
        style={{ width: `${(value / 10) * 100}%`, background: colors[tone] }}
      />
    </div>
  );
}

function Row({ label, value, wrap, accent }: { label: string; value: any; wrap?: boolean; accent?: string }) {
  return (
    <div className={`flex ${wrap ? 'flex-col' : 'items-center justify-between'} gap-1`}>
      <span className="text-white/50">{label}</span>
      <span className="font-medium tabular-nums" style={accent ? { color: accent } : {}}>
        {value}
      </span>
    </div>
  );
}

function UpgradeRow({
  icon,
  title,
  desc,
  danger,
}: {
  icon: string;
  title: string;
  desc: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-card border border-glass bg-nested/60 p-3">
      <div className="text-xl">{icon}</div>
      <div>
        <div className={`text-sm font-semibold ${danger ? 'text-[#F05858]' : ''}`}>{title}</div>
        <div className="mt-0.5 text-xs text-white/60">{desc}</div>
      </div>
    </div>
  );
}
