'use client';

import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

const TASKS = [
  { id: 'T-1001', title: 'Review franchise APP-1001 (Sub L3)', owner: 'dmo.manager', priority: 'high', sla: 5, slaUnit: 'h', module: 'franchise' },
  { id: 'T-1002', title: 'Tier 6 complaint CMP-0009 — fraud investigation', owner: 'dmo.director', priority: 'critical', sla: 2, slaUnit: 'h', module: 'complaints' },
  { id: 'T-1003', title: 'CRB refill for user-011 expiring in 5 days', owner: 'dmo.manager', priority: 'medium', sla: 3, slaUnit: 'd', module: 'crb' },
  { id: 'T-1004', title: 'Large transfer TX-9001 approval ($15K)', owner: 'dmo.manager', priority: 'high', sla: 4, slaUnit: 'h', module: 'wallet' },
  { id: 'T-1005', title: 'Inspector assignment for Lahore zone', owner: 'dmo.manager', priority: 'medium', sla: 24, slaUnit: 'h', module: 'crb' },
  { id: 'T-1006', title: 'Appeal review for user-018 STL drop', owner: 'dmo.director', priority: 'medium', sla: 48, slaUnit: 'h', module: 'stl' },
];

const OWNERS = [
  { name: 'dmo.manager', active: 4, breaching: 1 },
  { name: 'dmo.director', active: 2, breaching: 0 },
  { name: 'dmo.analyst', active: 8, breaching: 2 },
  { name: 'dmo.support', active: 12, breaching: 3 },
];

export default function TaskSystemPage() {
  return (
    <>
      <DmoTopbar
        title="Task System"
        subtitle="SLA-tracked tasks · auto-routing · escalation"
        breadcrumb={['Intelligence', 'Tasks']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Open tasks" value={TASKS.length} tone="purple" icon="🧩" />
          <KpiCard label="Critical" value="1" tone="fail" icon="🚨" />
          <KpiCard label="SLA breach risk" value="2" tone="warn" icon="⏰" />
          <KpiCard label="Avg resolution" value="4.2h" tone="ok" icon="⚡" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <PlasticCard className="p-0">
            <div className="border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Active queue
              </div>
              <h3 className="mt-1 text-sm font-semibold sm:text-lg">
                Priority-sorted with SLA timers
              </h3>
            </div>
            <ul className="divide-y divide-white/5">
              {TASKS.map((t) => (
                <li key={t.id} className="flex flex-wrap items-start gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] text-white/40">{t.id}</span>
                      <Chip
                        tone={
                          t.priority === 'critical'
                            ? 'fail'
                            : t.priority === 'high'
                              ? 'warn' as any
                              : 'default'
                        }
                      >
                        {t.priority}
                      </Chip>
                      <Chip>{t.module}</Chip>
                    </div>
                    <div className="mt-1 text-sm font-semibold">{t.title}</div>
                    <div className="mt-1 text-[11px] text-white/50">
                      Owner: {t.owner} · SLA: {t.sla}{t.slaUnit}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button3D size="sm" variant="blue">
                      Open
                    </Button3D>
                  </div>
                </li>
              ))}
            </ul>
          </PlasticCard>

          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
              By owner
            </div>
            <h3 className="mt-1 text-sm font-semibold">DMO workload distribution</h3>
            <ul className="mt-3 space-y-2 text-xs">
              {OWNERS.map((o) => (
                <li key={o.name} className="rounded-card border border-glass bg-nested/60 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-white/70">{o.name}</span>
                    <div className="flex items-center gap-1.5">
                      <Chip>{o.active}</Chip>
                      {o.breaching > 0 ? <Chip tone="fail">!{o.breaching}</Chip> : null}
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-chip bg-white/5">
                    <div
                      className="h-full rounded-chip bg-gradient-to-r from-purple to-teal"
                      style={{ width: `${Math.min(100, (o.active / 15) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </PlasticCard>
        </div>
      </div>
    </>
  );
}
