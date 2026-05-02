/**
 * EHB · Beta Tester Portal
 *
 * Public landing for the closed beta program (50 testers).
 * Recruits from founder network + WhatsApp groups + Twitter.
 *
 * Flow:
 *   1. Visit /beta → see invite + perks
 *   2. Apply (form below)
 *   3. Auto-screening → invite or waitlist
 *   4. Onboarding email + Slack invite
 *   5. 4-week beta period with feedback
 */

'use client';

import { useState } from 'react';

export default function BetaPortalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    role: 'buyer',
    industry: '',
    why: '',
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // POST /api/beta/apply (stub — wire when backend ready)
    try {
      await fetch('/api/beta/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {}
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0C0E1A] text-[#F4F5FA] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold mb-2">Application received!</h1>
          <p className="text-[#A0A4BC]">
            Aap ki application receive ho gai. Hum 48 hours mein reply karenge — accepted aur onboarding details email pe.
          </p>
          <p className="text-[#6B7088] text-sm mt-4">
            Cohort filling fast — only 50 spots. Selection criteria: city · industry · activity.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0E1A] text-[#F4F5FA]">
      <div className="max-w-3xl mx-auto p-6 py-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#7B6EF6]/20 text-[#A098F8] rounded-full text-sm font-medium mb-4">
            🧪 Beta Cohort · 50 spots
          </span>
          <h1 className="text-4xl font-bold mb-3">Be one of the first to use EHB.</h1>
          <p className="text-lg text-[#A0A4BC]">
            Pakistan's first trust-verified super-app. Help us shape it before public launch.
          </p>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <PerkCard icon="💰" title="1000 EHBGC" desc="Free tokens (~$50 value)" />
          <PerkCard icon="⚡" title="L4 STL boost" desc="Free for 90 days" />
          <PerkCard icon="🎯" title="Founder access" desc="Direct line via Slack" />
        </div>

        {/* Form */}
        <form onSubmit={submit} className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Apply for Beta</h2>

          <Input label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Input label="Phone (with country code)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
          <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />

          <div>
            <label className="block text-sm font-medium mb-1.5">Primary Role</label>
            <select
              className="w-full bg-[#1A1D33] border border-[#2D3147] rounded px-3 py-2 text-sm"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="buyer">Buyer (active shopper)</option>
              <option value="seller">Seller (general goods)</option>
              <option value="provider">Service Provider</option>
              <option value="student">Student / Learner</option>
              <option value="rider">Rider (delivery)</option>
              <option value="employer">Employer (hiring)</option>
              <option value="franchise">Aspiring Franchise Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Industry of Interest (if applicable)</label>
            <select
              className="w-full bg-[#1A1D33] border border-[#2D3147] rounded px-3 py-2 text-sm"
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="GSM">General goods (GSM)</option>
              <option value="WMS">Healthcare (WMS)</option>
              <option value="OLS">Legal (OLS)</option>
              <option value="HPS">Education (HPS)</option>
              <option value="ELS">Local services (ELS)</option>
              <option value="FBS">Food (FBS)</option>
              <option value="FIN">Finance (FIN)</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Why join the beta? (50 words)</label>
            <textarea
              className="w-full bg-[#1A1D33] border border-[#2D3147] rounded px-3 py-2 text-sm h-24 resize-none"
              value={form.why}
              onChange={(e) => setForm({ ...form, why: e.target.value })}
              placeholder="Aap kyu join karna chahte hain? Selection criteria mein helpful."
            />
          </div>

          <button type="submit" className="w-full px-5 py-3 bg-[#7B6EF6] hover:bg-[#5C4DD0] text-white font-semibold rounded-pill transition">
            Apply for Beta →
          </button>

          <p className="text-xs text-[#6B7088] text-center">
            By applying, you agree to give 30-min onboarding + 15-min feedback survey at end.
            Limited to 50 spots. Selection within 48 hours.
          </p>
        </form>

        <div className="mt-8 text-center text-xs text-[#6B7088]">
          <p>Already a beta tester? <a href="/signin" className="text-[#A098F8] hover:underline">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}

function PerkCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-5 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-xs text-[#A0A4BC]">{desc}</p>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1A1D33] border border-[#2D3147] rounded px-3 py-2 text-sm focus:border-[#7B6EF6] focus:outline-none"
      />
    </div>
  );
}
