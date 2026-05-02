'use client';

import { useState } from 'react';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Network Tree Visualization
 *
 * Renders a 3-level deep referral tree (L1 + L2 + L3) with:
 * - Avatar circles colored by rank
 * - Sales volume per node
 * - Active vs dormant indicator (green dot if sale in last 30 days)
 * - Expand/collapse for L2 children
 *
 * Falls back to demo data when no API tree provided so the dashboard always
 * shows something meaningful.
 */

interface TreeNode {
  userId: string;
  name: string;
  rank?: string;
  monthSalesUsd?: number;
  monthCommissionUsd?: number;
  joinedAt?: string;
  lastActivityAt?: string;
  children?: TreeNode[];
}

interface TreeData {
  root?: { userId: string; name: string; rank?: string };
  levels: TreeNode[][]; // [L1[], L2[], L3[]]
}

const DEMO_TREE: TreeData = {
  root: { userId: 'me', name: 'You', rank: 'R3' },
  levels: [
    // L1 — direct referrals
    [
      {
        userId: 'u_1',
        name: 'Ahmed K.',
        rank: 'R2',
        monthSalesUsd: 1240,
        monthCommissionUsd: 124,
        joinedAt: '2025-12-04',
        lastActivityAt: '2026-04-25',
        children: [
          {
            userId: 'u_1_a',
            name: 'Sara M.',
            rank: 'R1',
            monthSalesUsd: 320,
            monthCommissionUsd: 4.8,
            lastActivityAt: '2026-04-24',
            children: [
              { userId: 'u_1_a_x', name: 'Bilal F.', rank: 'R1', monthSalesUsd: 80, monthCommissionUsd: 0.4 },
            ],
          },
          {
            userId: 'u_1_b',
            name: 'Omar T.',
            rank: 'R1',
            monthSalesUsd: 180,
            monthCommissionUsd: 2.7,
            lastActivityAt: '2026-04-22',
          },
        ],
      },
      {
        userId: 'u_2',
        name: 'Zara B.',
        rank: 'R3',
        monthSalesUsd: 2840,
        monthCommissionUsd: 284,
        joinedAt: '2025-11-12',
        lastActivityAt: '2026-04-26',
        children: [
          {
            userId: 'u_2_a',
            name: 'Imran S.',
            rank: 'R2',
            monthSalesUsd: 720,
            monthCommissionUsd: 10.8,
            lastActivityAt: '2026-04-25',
            children: [
              { userId: 'u_2_a_x', name: 'Hira J.', rank: 'R1', monthSalesUsd: 45, monthCommissionUsd: 0.2 },
              { userId: 'u_2_a_y', name: 'Talha N.', rank: 'R1', monthSalesUsd: 120, monthCommissionUsd: 0.6 },
            ],
          },
        ],
      },
      {
        userId: 'u_3',
        name: 'Hassan M.',
        rank: 'R1',
        monthSalesUsd: 0,
        monthCommissionUsd: 0,
        joinedAt: '2026-03-20',
        lastActivityAt: '2026-03-20',
        children: [],
      },
      {
        userId: 'u_4',
        name: 'Ayesha R.',
        rank: 'R2',
        monthSalesUsd: 980,
        monthCommissionUsd: 98,
        joinedAt: '2026-01-08',
        lastActivityAt: '2026-04-26',
        children: [
          {
            userId: 'u_4_a',
            name: 'Faraz Q.',
            rank: 'R1',
            monthSalesUsd: 240,
            monthCommissionUsd: 3.6,
            lastActivityAt: '2026-04-23',
          },
        ],
      },
      {
        userId: 'u_5',
        name: 'Nadia S.',
        rank: 'R1',
        monthSalesUsd: 60,
        monthCommissionUsd: 1.8,
        joinedAt: '2026-02-15',
        lastActivityAt: '2026-04-19',
      },
    ],
    [], // L2 (resolved via children)
    [], // L3 (resolved via children)
  ],
};

const RANK_COLOR: Record<string, string> = {
  R1: '#7B6EF6',
  R2: '#A098F8',
  R3: '#2BBFA0',
  R4: '#38C878',
  R5: '#F0A030',
  R6: '#F8B830',
  R7: '#EC4899',
  R8: '#F472B6',
  R9: '#F05858',
  R10: '#F0C040',
};

function isActive(lastActivityAt?: string) {
  if (!lastActivityAt) return false;
  const days = (Date.now() - new Date(lastActivityAt).getTime()) / 86400000;
  return days <= 30;
}

function Initial({ name }: { name: string }) {
  return <>{name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()}</>;
}

function NodeAvatar({ node, size = 32 }: { node: TreeNode; size?: number }) {
  const color = RANK_COLOR[node.rank || 'R1'] || '#7B6EF6';
  const active = isActive(node.lastActivityAt);
  return (
    <div className="relative shrink-0">
      <div
        className="flex items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${color}, ${color}aa)`,
          boxShadow: `0 0 10px ${color}40`,
        }}
      >
        <Initial name={node.name} />
      </div>
      <span
        className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-2 ring-card ${
          active ? 'bg-teal' : 'bg-white/30'
        }`}
        title={active ? 'Active (≤30d)' : 'Dormant'}
      />
    </div>
  );
}

function L3Pill({ node }: { node: TreeNode }) {
  const color = RANK_COLOR[node.rank || 'R1'] || '#7B6EF6';
  return (
    <div className="inline-flex items-center gap-1.5 rounded-pill border border-glass bg-card/40 px-2 py-1 text-[10px]">
      <NodeAvatar node={node} size={18} />
      <span className="text-white/80">{node.name}</span>
      <span className="text-white/40">·</span>
      <span className="font-bold tabular-nums" style={{ color }}>
        ${(node.monthSalesUsd || 0).toFixed(0)}
      </span>
    </div>
  );
}

function L2Row({ node }: { node: TreeNode }) {
  return (
    <div className="rounded border border-glass bg-card/40 p-2">
      <div className="flex items-center gap-2">
        <NodeAvatar node={node} size={26} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[12px] font-medium">{node.name}</span>
            <Chip tone="purple">{node.rank}</Chip>
          </div>
          <div className="text-[10px] text-white/50">
            ${(node.monthSalesUsd || 0).toFixed(0)} sales · ${(node.monthCommissionUsd || 0).toFixed(2)} earned
          </div>
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="mt-2 ml-7 flex flex-wrap gap-1.5 border-l border-glass pl-2">
          {node.children.map((c) => (
            <L3Pill key={c.userId} node={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function L1Card({ node }: { node: TreeNode }) {
  const [expanded, setExpanded] = useState(false);
  const childrenCount = node.children?.length || 0;
  const grandChildrenCount = node.children?.reduce((s, c) => s + (c.children?.length || 0), 0) || 0;
  const totalSubtreeVolume =
    (node.children || []).reduce(
      (s, c) =>
        s + (c.monthSalesUsd || 0) + (c.children || []).reduce((ss, cc) => ss + (cc.monthSalesUsd || 0), 0),
      0
    ) + (node.monthSalesUsd || 0);
  const color = RANK_COLOR[node.rank || 'R1'] || '#7B6EF6';

  return (
    <div className="rounded-card border border-glass bg-nested/60 p-3">
      <div className="flex items-start gap-3">
        <NodeAvatar node={node} size={42} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-sm font-semibold">{node.name}</span>
            <Chip tone="purple">{node.rank}</Chip>
          </div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-[11px]">
            <span className="text-white/50">Sales (mo)</span>
            <span className="font-bold tabular-nums" style={{ color }}>
              ${(node.monthSalesUsd || 0).toFixed(0)}
            </span>
            <span className="text-white/50">· Earned</span>
            <span className="font-bold tabular-nums text-teal">${(node.monthCommissionUsd || 0).toFixed(2)}</span>
          </div>
          <div className="mt-1 text-[10px] text-white/40">
            {childrenCount} L2 · {grandChildrenCount} L3 · subtree ${totalSubtreeVolume.toFixed(0)}
          </div>
        </div>
      </div>

      {childrenCount > 0 && (
        <button
          onClick={() => setExpanded((s) => !s)}
          className="mt-2 w-full rounded border border-glass bg-card/30 px-2 py-1 text-[10px] text-white/60 hover:border-purple-light hover:text-purple-light"
        >
          {expanded ? '▾ Hide' : '▸ Show'} {childrenCount} L2 referral{childrenCount === 1 ? '' : 's'}
        </button>
      )}

      {expanded && node.children && (
        <div className="mt-2 space-y-1.5">
          {node.children.map((c) => (
            <L2Row key={c.userId} node={c} />
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  data?: TreeData | null;
  isJoined?: boolean;
}

export function AffiliateNetworkTree({ data, isJoined = true }: Props) {
  const tree = (data && data.levels && data.levels[0]?.length > 0 ? data : DEMO_TREE) as TreeData;
  const usingDemo = tree === DEMO_TREE;
  const l1 = tree.levels[0] || [];

  // Aggregate stats
  const totalL1 = l1.length;
  const totalL2 = l1.reduce((s, c) => s + (c.children?.length || 0), 0);
  const totalL3 = l1.reduce(
    (s, c) => s + (c.children || []).reduce((ss, cc) => ss + (cc.children?.length || 0), 0),
    0
  );
  const activeL1 = l1.filter((c) => isActive(c.lastActivityAt)).length;
  const totalNetworkSales = l1.reduce(
    (s, c) =>
      s +
      (c.monthSalesUsd || 0) +
      (c.children || []).reduce(
        (ss, cc) =>
          ss + (cc.monthSalesUsd || 0) + (cc.children || []).reduce((sss, ccc) => sss + (ccc.monthSalesUsd || 0), 0),
        0
      ),
    0
  );

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            🌳 Network tree — 3 levels deep
          </div>
          <h3 className="mt-1 text-lg font-semibold">Your downline</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {usingDemo && <Chip tone="amber">Demo data</Chip>}
          {!isJoined && <Chip tone="warn">Preview only — join to see real network</Chip>}
        </div>
      </div>

      {/* Aggregate strip */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-card border border-glass bg-card/40 p-3 text-center">
          <div className="text-[10px] uppercase text-white/40">L1 directs</div>
          <div className="mt-1 text-xl font-bold tabular-nums text-purple-light">{totalL1}</div>
          <div className="text-[10px] text-white/40">
            {activeL1} active · {totalL1 - activeL1} dormant
          </div>
        </div>
        <div className="rounded-card border border-glass bg-card/40 p-3 text-center">
          <div className="text-[10px] uppercase text-white/40">L2</div>
          <div className="mt-1 text-xl font-bold tabular-nums text-teal">{totalL2}</div>
        </div>
        <div className="rounded-card border border-glass bg-card/40 p-3 text-center">
          <div className="text-[10px] uppercase text-white/40">L3</div>
          <div className="mt-1 text-xl font-bold tabular-nums text-amber">{totalL3}</div>
        </div>
        <div className="rounded-card border border-glass bg-card/40 p-3 text-center">
          <div className="text-[10px] uppercase text-white/40">Network sales (mo)</div>
          <div className="mt-1 text-xl font-bold tabular-nums text-teal">${totalNetworkSales.toFixed(0)}</div>
        </div>
      </div>

      {/* L1 grid */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {l1.length === 0 ? (
          <div className="col-span-full rounded-card border border-dashed border-glass bg-card/20 p-8 text-center">
            <div className="text-3xl">🤝</div>
            <p className="mt-2 text-sm text-white/60">No referrals yet</p>
            <p className="mt-1 text-xs text-white/40">Share your referral link to start growing your network.</p>
          </div>
        ) : (
          l1.map((node) => <L1Card key={node.userId} node={node} />)
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-glass pt-3 text-[10px] text-white/50">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-teal" /> Active (≤30d)
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-white/30" /> Dormant
        </span>
        <span className="ml-auto">Tap an L1 card to expand its L2 + L3 sub-tree.</span>
      </div>
    </PlasticCard>
  );
}
