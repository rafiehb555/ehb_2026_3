'use client';

import { useState } from 'react';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Sharing Tools
 *
 * One-click share buttons (WhatsApp · Facebook · Twitter · LinkedIn · Email · Copy)
 * with pre-written templates per channel. Auto-includes referral link.
 *
 * Shows live preview of the share text. Each channel has a tailored message
 * length + tone (WhatsApp friendlier, Twitter shorter, LinkedIn professional).
 */

interface Props {
  referralCode?: string;
  baseUrl?: string;
  affiliateName?: string;
}

const TEMPLATES = {
  whatsapp: {
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    text: (link: string, name: string) =>
      `Hey! 👋 Have you heard of EHB?\n\nIt's a global super-app with 38 industries — Online Business School, AI Marketplace, GoSellr, Wellness, Legal, IT services and more — all in one platform with blockchain-verified trust.\n\nThe best part: real cashback on every purchase ${name ? `(${name} sent me)` : ''}.\n\nJoin free using my link 👇\n${link}\n\nNo joining fees. Earn from real product sales only. 🎉`,
    mode: 'web' as const,
    url: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`,
  },
  twitter: {
    name: 'X / Twitter',
    icon: '𝕏',
    color: '#000000',
    text: (link: string) =>
      `🚀 Discovered @EHB_Tech — one super-app for 38 industries with AI + blockchain trust.\n\nReal cashback on every purchase. No joining fees.\n\nJoin free 👇\n${link}\n\n#EHB #Web3 #AffiliateProgram`,
    mode: 'web' as const,
    url: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    color: '#1877F2',
    text: (link: string) =>
      `🌍 Just joined EHB — a global super-app unifying 38 industries with AI + Polkadot blockchain trust.\n\nFrom Online Business School to Wellness, Legal, GoSellr Marketplace and more — earn real cashback on every purchase.\n\nNo joining fees. Real products only.\n\nJoin free with my link 👇\n${link}`,
    mode: 'web' as const,
    url: (_text: string, link: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0A66C2',
    text: (link: string) =>
      `Excited to share EHB Technologies — a unified platform spanning 38 industries with AI-driven services and blockchain-verified trust.\n\nWhat sets it apart: STL (Service Trust Level) ladder ranks every seller, service, and product on a 100-point scale verified on-chain. Affiliate program pays from real product sales — no joining fees, no recruitment-only income.\n\nProfessional credentials (CRB), AI-matched job placements (JPS), legal services (OLS), and 35+ more verticals — all interoperable.\n\nLearn more: ${link}`,
    mode: 'web' as const,
    url: (text: string, link: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}&summary=${encodeURIComponent(text)}`,
  },
  email: {
    name: 'Email',
    icon: '✉️',
    color: '#7B6EF6',
    text: (link: string, name: string) =>
      `Hi,\n\nI wanted to share something I think you'll find interesting — EHB Technologies, a global super-app that unifies 38 industries (education, health, business, jobs, e-commerce, legal, IT) into a single platform with AI + blockchain trust.\n\nWhat caught my attention:\n• Real cashback on every purchase (no joining fees)\n• Service Trust Level (STL) ladder — every seller/service/product ranked on 100-point scale\n• 11 stacking bonuses for affiliates\n• Pakistan pilot live, expanding to UAE/India/UK/USA\n\nIf you'd like to take a look, here's my referral link${name ? ` (${name})` : ''}:\n${link}\n\nNo pressure — just thought you might find it useful.\n\nBest regards`,
    mode: 'mailto' as const,
    url: (text: string, link: string) =>
      `mailto:?subject=${encodeURIComponent('Have you seen EHB Technologies?')}&body=${encodeURIComponent(text)}`,
  },
  sms: {
    name: 'SMS',
    icon: '📱',
    color: '#38C878',
    text: (link: string) =>
      `Hey 👋 Check out EHB — global super-app, 38 industries, real cashback on every purchase, no joining fees. Join free: ${link}`,
    mode: 'web' as const,
    url: (text: string) => `sms:?body=${encodeURIComponent(text)}`,
  },
} as const;

type Channel = keyof typeof TEMPLATES;

export function AffiliateSharingTools({ referralCode, baseUrl, affiliateName }: Props) {
  const code = referralCode || 'yourname-DEMO';
  const link = `${baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ehb.com')}/?ref=${code}`;
  const name = affiliateName || '';

  const [activeChannel, setActiveChannel] = useState<Channel>('whatsapp');
  const [copied, setCopied] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string | null>(null);

  const tpl = TEMPLATES[activeChannel];
  const previewText = editedText !== null ? editedText : tpl.text(link, name);

  function copyToClipboard(text: string, fieldId: string) {
    navigator.clipboard?.writeText(text);
    setCopied(fieldId);
    setTimeout(() => setCopied(null), 2000);
  }

  function openShare() {
    let url: string;
    if (tpl.name === 'Facebook') {
      url = TEMPLATES.facebook.url('', link);
    } else if (tpl.name === 'LinkedIn') {
      url = TEMPLATES.linkedin.url(previewText, link);
    } else {
      url = (tpl.url as (t: string, l: string) => string)(previewText, link);
    }
    if (typeof window !== 'undefined') window.open(url, '_blank');
  }

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            🚀 Sharing tools
          </div>
          <h3 className="mt-1 text-lg font-semibold">Spread the word — earn faster</h3>
          <p className="mt-1 text-xs text-white/50">
            One-click share with pre-written templates. Edit before posting if you want.
          </p>
        </div>
        <Chip tone="purple">{Object.keys(TEMPLATES).length} channels</Chip>
      </div>

      {/* Channel picker */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.entries(TEMPLATES) as [Channel, typeof TEMPLATES[Channel]][]).map(([key, t]) => {
          const active = activeChannel === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveChannel(key);
                setEditedText(null);
              }}
              className={`group flex items-center gap-2 rounded-card border px-3 py-2 text-sm transition ${
                active
                  ? 'border-purple-light bg-purple-light/10 text-purple-light shadow-lg'
                  : 'border-glass bg-card/40 text-white/70 hover:border-purple-light/50'
              }`}
              style={active ? { boxShadow: `0 0 12px ${t.color}40` } : undefined}
            >
              <span className="text-lg">{t.icon}</span>
              <span className="font-medium">{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Preview + actions */}
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {/* Editable preview */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase tracking-wider text-white/50">
              Preview — {tpl.name}
            </label>
            <div className="flex gap-1.5">
              <button
                onClick={() => setEditedText(null)}
                className="rounded-pill border border-glass bg-card/40 px-2 py-0.5 text-[10px] text-white/60 hover:border-purple-light"
              >
                Reset
              </button>
              <button
                onClick={() => copyToClipboard(previewText, 'preview')}
                className={`rounded-pill border px-2 py-0.5 text-[10px] transition ${
                  copied === 'preview'
                    ? 'border-teal bg-teal/20 text-teal'
                    : 'border-glass bg-card/40 text-white/60 hover:border-teal'
                }`}
              >
                {copied === 'preview' ? '✓ Copied' : '📋 Copy text'}
              </button>
            </div>
          </div>
          <textarea
            value={previewText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={tpl.name === 'X / Twitter' ? 5 : tpl.name === 'SMS' ? 3 : 9}
            className="mt-1 w-full rounded-card border border-glass bg-nested px-3 py-2.5 text-xs leading-relaxed text-white/80 focus:border-purple-light focus:outline-none"
            style={{ resize: 'vertical' }}
          />
          <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
            <span>{previewText.length} chars</span>
            {tpl.name === 'X / Twitter' && (
              <span className={previewText.length > 280 ? 'text-red-400' : 'text-teal'}>
                {280 - previewText.length} left (Twitter limit 280)
              </span>
            )}
          </div>
        </div>

        {/* Share + link */}
        <div className="space-y-3">
          <button
            onClick={openShare}
            className="flex w-full items-center justify-center gap-2 rounded-card px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${tpl.color}, ${tpl.color}dd)`,
              boxShadow: `0 4px 16px ${tpl.color}55`,
            }}
          >
            <span className="text-lg">{tpl.icon}</span>
            Share to {tpl.name}
          </button>

          <div className="rounded-card border border-glass bg-card/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-white/50">Your link</div>
            <code className="mt-1 block break-all text-[11px] text-teal">{link}</code>
            <button
              onClick={() => copyToClipboard(link, 'link')}
              className={`mt-2 w-full rounded border px-2 py-1.5 text-[11px] transition ${
                copied === 'link'
                  ? 'border-teal bg-teal/20 text-teal'
                  : 'border-glass bg-card/40 hover:border-teal'
              }`}
            >
              {copied === 'link' ? '✓ Link copied' : '🔗 Copy link only'}
            </button>
          </div>

          <div className="rounded-card border border-glass bg-card/40 p-3">
            <div className="text-[10px] uppercase tracking-wider text-white/50">Tips</div>
            <ul className="mt-2 space-y-1 text-[10px] text-white/60">
              <li>✓ Personalize the message before sharing</li>
              <li>✓ Best results: WhatsApp + LinkedIn for warm contacts</li>
              <li>✓ Avoid forbidden phrases (see Compliance tab)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Forbidden phrases reminder */}
      <div className="mt-4 rounded-card border border-amber/30 bg-amber/5 p-3 text-[11px] text-white/70">
        <span className="font-semibold text-amber">⚖️ Compliance reminder:</span> Never use phrases
        like "Get paid to recruit", "Investment opportunity / ROI", "Guaranteed earnings", or
        "Passive income with no work" — EHB is NOT MLM. Use approved phrases like "Earn affiliate
        commission on real product sales" or "Trust-based earning + franchise growth engine".
      </div>
    </PlasticCard>
  );
}
