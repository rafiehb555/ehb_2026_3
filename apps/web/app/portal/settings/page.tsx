'use client';

import { CompliancePortalLayout } from '@/components/portal/layout';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

export default function PortalSettingsPage() {
  return (
    <CompliancePortalLayout title="Settings" breadcrumb={['System', 'Settings']}>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold sm:text-3xl">Account Settings</h1>
        <p className="text-sm text-white/60">Manage your profile, security preferences, and financial details</p>

        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { icon: '👤', title: 'Personal Info', desc: 'Name, email, phone, address', status: 'Complete' },
            { icon: '🔒', title: 'Security', desc: '2FA, password, sessions, API keys', status: '2FA enabled' },
            { icon: '💳', title: 'Payment Methods', desc: 'Bank accounts, USDT wallets, KYC tier', status: 'T2 verified' },
            { icon: '🔔', title: 'Notifications', desc: 'Email, SMS, in-app preferences', status: '5 enabled' },
            { icon: '🌐', title: 'Language', desc: 'EN · Roman Urdu', status: 'English' },
            { icon: '🛡️', title: 'Privacy', desc: 'Data export, deletion, cookies', status: 'Default' },
          ].map((s) => (
            <PlasticCard key={s.title} className="p-5">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{s.icon}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1 text-xs text-white/60">{s.desc}</p>
                  <div className="mt-2"><Chip tone="ok">{s.status}</Chip></div>
                </div>
              </div>
            </PlasticCard>
          ))}
        </div>
      </div>
    </CompliancePortalLayout>
  );
}
