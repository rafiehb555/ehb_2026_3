import { PlasticCard } from './plastic-card';
import { Chip } from './chip';

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  tone?: 'purple' | 'teal' | 'amber' | 'ok' | 'fail';
  icon?: React.ReactNode;
}

const TONE_RING: Record<NonNullable<Props['tone']>, string> = {
  purple: 'from-[#7B6EF6] to-[#A098F8]',
  teal: 'from-[#2BBFA0] to-[#38C878]',
  amber: 'from-[#F0A030] to-[#F8B830]',
  ok: 'from-[#38C878] to-[#1A7020]',
  fail: 'from-[#F05858] to-[#C03030]',
};

export function KpiCard({ label, value, delta, tone = 'purple', icon }: Props) {
  return (
    <PlasticCard className="p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-widest text-white/50">{label}</div>
        <div
          className={`h-8 w-8 rounded-card bg-gradient-to-br ${TONE_RING[tone]} flex items-center justify-center text-white`}
        >
          {icon ?? <span className="text-sm">●</span>}
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold text-white">{value}</div>
      {delta ? (
        <div className="mt-2">
          <Chip tone={tone === 'fail' ? 'fail' : 'ok'}>{delta}</Chip>
        </div>
      ) : null}
    </PlasticCard>
  );
}
