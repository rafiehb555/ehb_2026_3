'use client';

import { DmoTopbar } from '@/components/dmo/topbar';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

const BUCKETS = [
  { key: 'active', label: 'Active', count: 142, desc: 'Valid CRB certs', tone: 'ok' as const, icon: '✅' },
  { key: 'expiring30', label: 'Expiring soon', count: 28, desc: '≤30 days', tone: 'warn' as const, icon: '⏰' },
  { key: 'expiring7', label: 'Critical', count: 9, desc: '≤7 days', tone: 'fail' as const, icon: '🚨' },
  { key: 'expired', label: 'Expired', count: 14, desc: 'Need resubmit', tone: 'fail' as const, icon: '❌' },
];

const DEMO_REFILLS = [
  { user: 'Ahmed Raza', cert: 'CRB-WMS-L5-MCQ', expiresIn: 5, lastRefill: '5 months ago', status: 'critical' },
  { user: 'Bilal Khan',  cert: 'CRB-GSM-L3-MCQ', expiresIn: 12, lastRefill: '5 months ago', status: 'expiring' },
  { user: 'Zainab Iqbal',cert: 'CRB-JPS-L4-MCQ', expiresIn: 28, lastRefill: '5 months ago', status: 'expiring' },
  { user: 'Fatima Sheikh',cert:'CRB-WMS-L5-MCQ',expiresIn: -2, lastRefill: '6 months ago', status: 'expired' },
  { user: 'Hamza Tariq', cert: 'CRB-OLS-L6-Practical', expiresIn: -7, lastRefill: '7 months ago', status: 'expired' },
];

export default function RefillManagementPage() {
  return (
    <>
      <DmoTopbar
        title="Refill Management"
        subtitle="6-month CRB refill calendar · auto-reminders · demotion prevention"
        breadcrumb={['Operations', 'Refill']}
      />
      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {BUCKETS.map((b) => (
            <KpiCard
              key={b.key}
              label={b.label}
              value={b.count}
              delta={b.desc}
              tone={b.tone as any}
              icon={b.icon}
            />
          ))}
        </div>

        {/* Refill cycle explanation */}
        <PlasticCard className="p-5">
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            How refills work
          </div>
          <h3 className="mt-1 text-lg font-semibold">CRB 6-month refill cycle</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <StepBox step={1} title="Issued" desc="Cert issued + on-chain hash" icon="🏅" />
            <StepBox step={2} title="5-month mark" desc="System sends reminder 30 days prior" icon="📧" />
            <StepBox step={3} title="Expiry" desc="If no refill → upgrade blocked" icon="🔒" />
            <StepBox step={4} title="Grace + demote" desc="15-day grace → STL watch" icon="⚠️" />
          </div>
        </PlasticCard>

        {/* Refills queue */}
        <PlasticCard className="p-0">
          <div className="flex items-center justify-between border-b border-glass px-4 py-3 sm:px-5 sm:py-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
                Upcoming refills
              </div>
              <h3 className="mt-1 text-sm font-semibold sm:text-lg">
                Sorted by urgency
              </h3>
            </div>
            <Chip tone="warn">Auto-notify 30 days prior</Chip>
          </div>
          <ul className="divide-y divide-white/5">
            {DEMO_REFILLS.map((r, i) => (
              <li key={i} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold">{r.user}</span>
                    <Chip>{r.cert}</Chip>
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">
                    Last refill {r.lastRefill}
                  </div>
                </div>
                <div className="text-right">
                  {r.expiresIn > 0 ? (
                    <Chip tone={r.expiresIn <= 7 ? 'fail' : 'warn' as any}>
                      {r.expiresIn}d remaining
                    </Chip>
                  ) : (
                    <Chip tone="fail">Expired {Math.abs(r.expiresIn)}d</Chip>
                  )}
                </div>
                <Button3D size="sm" variant="blue">
                  Remind
                </Button3D>
              </li>
            ))}
          </ul>
        </PlasticCard>
      </div>
    </>
  );
}

function StepBox({ step, title, desc, icon }: { step: number; title: string; desc: string; icon: string }) {
  return (
    <div className="rounded-card border border-glass bg-nested/60 p-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <div>
          <div className="text-[10px] text-white/40">Step {step}</div>
          <div className="text-sm font-semibold">{title}</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-white/60">{desc}</div>
    </div>
  );
}
