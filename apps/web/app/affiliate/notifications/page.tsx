'use client';

import { useState } from 'react';
import { CompliancePortalLayout } from '@/components/portal/layout';
import { PlasticCard } from '@/components/ui/plastic-card';
import { KpiCard } from '@/components/ui/kpi-card';
import { Chip } from '@/components/ui/chip';
import { Button3D } from '@/components/ui/button-3d';

/**
 * EHB Affiliate — Notifications page (§6.10 from Affiliate.md)
 *
 * 5 categories: New referral · Commission earned · Payout completed ·
 * System updates · Compliance alerts.
 * Settings: toggle each category, email vs in-app, frequency.
 */

interface NotificationItem {
  id: string;
  type: 'referral' | 'commission' | 'payout' | 'system' | 'compliance';
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  link?: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', type: 'referral', icon: '🎉', title: 'New referral joined', body: 'Bilal F. joined via your link · added to L3 network', time: '2 min ago', read: false },
  { id: 'n2', type: 'commission', icon: '💵', title: 'Commission earned', body: 'You earned $12.40 from OBS Pro Annual sale (Ahmed K.)', time: '15 min ago', read: false, link: '/wallet' },
  { id: 'n3', type: 'commission', icon: '🎁', title: 'First Sale Bonus claimed', body: '$5.00 awarded · Hassan M. made first purchase within 30-day window', time: '5 hours ago', read: false },
  { id: 'n4', type: 'payout', icon: '💸', title: 'Withdrawal approved', body: '$1,250 USDT TRC20 sent · expected settlement <10 min', time: '1 day ago', read: true, link: '/wallet' },
  { id: 'n5', type: 'compliance', icon: '⚖️', title: 'KYC Tier 2 expires soon', body: 'Re-verify selfie + address proof within 14 days to maintain limits', time: '2 days ago', read: false, link: '/kyc' },
  { id: 'n6', type: 'system', icon: '📢', title: 'New feature: Sharing Tools', body: '6-channel one-click share with pre-written templates is now live', time: '3 days ago', read: true },
  { id: 'n7', type: 'commission', icon: '⭐', title: 'STL Upgrade Bonus', body: '$9.60 from Zara B. STL L3→L4 upgrade payment', time: '4 days ago', read: true },
  { id: 'n8', type: 'referral', icon: '🌳', title: 'L2 milestone hit', body: 'Your network L2 count reached 200 — keep growing!', time: '5 days ago', read: true },
  { id: 'n9', type: 'system', icon: '🛡️', title: 'Security update', body: 'Per FATF compliance, withdrawals ≥$1,000 now require enhanced verification', time: '1 week ago', read: true },
  { id: 'n10', type: 'compliance', icon: '⚠️', title: 'Compliance flag cleared', body: 'DMO review completed · no action needed · normal activity confirmed', time: '1 week ago', read: true },
];

const TYPE_META: Record<string, { label: string; color: string }> = {
  referral: { label: 'New Referral', color: '#7B6EF6' },
  commission: { label: 'Commission', color: '#2BBFA0' },
  payout: { label: 'Payout', color: '#F0A030' },
  system: { label: 'System', color: '#A098F8' },
  compliance: { label: 'Compliance', color: '#EC4899' },
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | NotificationItem['type']>('all');
  const [settings, setSettings] = useState({
    referral: { inApp: true, email: true, sms: false, frequency: 'realtime' },
    commission: { inApp: true, email: true, sms: false, frequency: 'daily' },
    payout: { inApp: true, email: true, sms: true, frequency: 'realtime' },
    system: { inApp: true, email: false, sms: false, frequency: 'weekly' },
    compliance: { inApp: true, email: true, sms: true, frequency: 'realtime' },
  });

  const filtered = NOTIFICATIONS.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  function toggle(type: keyof typeof settings, channel: 'inApp' | 'email' | 'sms') {
    setSettings((s) => ({
      ...s,
      [type]: { ...s[type], [channel]: !s[type][channel] },
    }));
  }

  return (
    <CompliancePortalLayout title="Notifications" breadcrumb={['Affiliate', 'Notifications']}>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Chip tone="purple">§6.10 Notifications</Chip>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Notifications</h1>
            <p className="mt-1 text-sm text-white/60">
              5 categories · in-app + email + SMS · frequency control · real-time stream
            </p>
          </div>
          <div className="flex gap-2">
            <Button3D variant="purple" size="sm">✓ Mark all read</Button3D>
            <Button3D variant="green" size="sm">⚙️ Manage</Button3D>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-3 grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Unread" value={unreadCount} delta={`${NOTIFICATIONS.length - unreadCount} read`} tone="purple" icon="🔔" />
          <KpiCard label="This Week" value={NOTIFICATIONS.length} delta="across 5 categories" tone="teal" icon="📅" />
          <KpiCard label="Last Activity" value="2 min" delta="ago" tone="ok" icon="⚡" />
          <KpiCard label="Channels Active" value="3" delta="In-app · Email · SMS" tone="amber" icon="📡" />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'unread', 'referral', 'commission', 'payout', 'system', 'compliance'] as const).map((f) => {
            const count = f === 'all' ? NOTIFICATIONS.length : f === 'unread' ? unreadCount : NOTIFICATIONS.filter((n) => n.type === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-pill border px-3 py-1.5 text-xs transition ${
                  filter === f
                    ? 'border-purple-light bg-purple-light/15 text-purple-light'
                    : 'border-glass bg-card/40 text-white/60 hover:border-purple-light/50'
                }`}
              >
                {f === 'all' ? 'All' : f === 'unread' ? 'Unread' : TYPE_META[f]?.label || f}
                <span className="ml-1.5 text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr,360px]">
          {/* Notification list */}
          <PlasticCard className="overflow-hidden p-0">
            <div className="border-b border-glass px-5 py-3">
              <h3 className="text-base font-semibold">{filtered.length} notifications</h3>
            </div>
            <div className="divide-y divide-glass">
              {filtered.length === 0 ? (
                <div className="px-5 py-12 text-center text-sm text-white/50">
                  📭 No notifications matching this filter
                </div>
              ) : (
                filtered.map((n) => {
                  const meta = TYPE_META[n.type] || TYPE_META.system;
                  return (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-5 py-3 transition hover:bg-card/30 ${
                        !n.read ? 'bg-purple-light/5' : ''
                      }`}
                      style={{ borderLeft: !n.read ? `3px solid ${meta.color}` : undefined }}
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base"
                        style={{ background: `${meta.color}22`, border: `1px solid ${meta.color}55` }}
                      >
                        {n.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold">{n.title}</span>
                          {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-purple-light" />}
                        </div>
                        <p className="mt-0.5 text-xs text-white/70">{n.body}</p>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-white/40">
                          <span>{n.time}</span>
                          <span>·</span>
                          <Chip tone="purple">{meta.label}</Chip>
                          {n.link && (
                            <a href={n.link} className="ml-auto text-purple-light hover:underline">
                              View →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </PlasticCard>

          {/* Settings panel */}
          <PlasticCard className="p-5">
            <div className="text-[10px] uppercase tracking-widest text-white/40">⚙️ Notification Settings</div>
            <h3 className="mt-1 text-base font-semibold">Choose what + how</h3>

            <div className="mt-4 space-y-4">
              {(Object.keys(settings) as Array<keyof typeof settings>).map((type) => {
                const meta = TYPE_META[type];
                const s = settings[type];
                return (
                  <div key={type} className="rounded-card border border-glass bg-card/40 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: meta.color }}
                        />
                        <span className="text-sm font-medium">{meta.label}</span>
                      </div>
                      <select
                        value={s.frequency}
                        onChange={(e) =>
                          setSettings((st) => ({ ...st, [type]: { ...st[type], frequency: e.target.value } }))
                        }
                        className="rounded border border-glass bg-nested px-2 py-1 text-[10px]"
                      >
                        <option value="realtime">Real-time</option>
                        <option value="hourly">Hourly digest</option>
                        <option value="daily">Daily digest</option>
                        <option value="weekly">Weekly digest</option>
                        <option value="off">Off</option>
                      </select>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-1.5">
                      {(['inApp', 'email', 'sms'] as const).map((channel) => {
                        const enabled = s[channel];
                        const labels: Record<string, string> = { inApp: '📱 In-app', email: '✉️ Email', sms: '📩 SMS' };
                        return (
                          <button
                            key={channel}
                            onClick={() => toggle(type, channel)}
                            className={`rounded border px-2 py-1.5 text-[10px] transition ${
                              enabled
                                ? 'border-teal/40 bg-teal/10 text-teal'
                                : 'border-glass bg-nested/30 text-white/40'
                            }`}
                          >
                            {labels[channel]}
                            {enabled && ' ✓'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-card border border-amber/30 bg-amber/5 p-3 text-[11px] text-white/70">
              <strong className="text-amber">Tip:</strong> Critical events (compliance + payouts) recommend SMS. System updates can be weekly digest to reduce noise.
            </div>

            <Button3D variant="purple" size="md" className="mt-4 w-full">
              💾 Save Preferences
            </Button3D>
          </PlasticCard>
        </div>
      </div>
    </CompliancePortalLayout>
  );
}
