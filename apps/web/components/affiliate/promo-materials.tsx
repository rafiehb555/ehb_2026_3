'use client';

import { useState } from 'react';
import { PlasticCard } from '../ui/plastic-card';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Promo Materials Library
 *
 * Pre-built marketing assets affiliates can grab:
 *  - 6 SVG banner sizes (square / story / landscape / leaderboard / sidebar / signature)
 *  - 4 copy templates per category (short / medium / long / professional)
 *  - Email signature snippets
 *  - Industry-specific elevator pitches
 *
 * Each asset has Download (SVG) or Copy (text) action.
 */

interface Props {
  referralCode?: string;
  baseUrl?: string;
}

const BANNER_SIZES = [
  { key: 'square', label: 'Square', size: '1080×1080', w: 1080, h: 1080, useCase: 'Instagram · WhatsApp DP' },
  { key: 'story', label: 'Story', size: '1080×1920', w: 1080, h: 1920, useCase: 'Instagram/FB Stories · WhatsApp Status' },
  { key: 'landscape', label: 'Landscape', size: '1200×628', w: 1200, h: 628, useCase: 'Twitter · LinkedIn · FB feed' },
  { key: 'leaderboard', label: 'Leaderboard', size: '728×90', w: 728, h: 90, useCase: 'Web banner ad' },
  { key: 'sidebar', label: 'Sidebar', size: '300×600', w: 300, h: 600, useCase: 'Web sidebar ad' },
  { key: 'sig', label: 'Email signature', size: '600×120', w: 600, h: 120, useCase: 'Gmail / Outlook signature' },
];

const COPY_TEMPLATES = [
  {
    key: 'short',
    label: 'Short (SMS / Twitter)',
    icon: '📱',
    text: (link: string) =>
      `🚀 Join EHB — global super-app, 38 industries, real cashback. No joining fees. ${link}`,
  },
  {
    key: 'medium',
    label: 'Medium (WhatsApp / DM)',
    icon: '💬',
    text: (link: string) =>
      `Hey 👋 Have you heard of EHB?\n\nIt unifies 38 industries (Education, Health, Business, Jobs, Marketplace, Legal, IT...) into one super-app with AI + blockchain trust.\n\nReal cashback on every purchase. No joining fees. No recruitment-only income.\n\nJoin free with my link: ${link} 🎉`,
  },
  {
    key: 'long',
    label: 'Long-form (FB / LinkedIn post)',
    icon: '📝',
    text: (link: string) =>
      `🌍 Excited to share something I've been part of: EHB Technologies.\n\nIt's a global super-app unifying 38 industries — Online Business School, Wellness & Medical, Online Legal Services, AI Marketplace, GoSellr E-commerce, Job Profile & Skill Matching, IT Services, Real Estate, and 30+ more — all interoperable on a single trust backbone.\n\nWhat makes it different:\n\n✅ Service Trust Level (STL) — every seller, service, and product ranked on a 100-point scale, verified on Polkadot blockchain\n✅ Real cashback on every purchase — no joining fees, ever\n✅ AI-driven matching for jobs, services, doctors, lawyers\n✅ 11-bonus affiliate program with strict 80/20 income rule (anti-pyramid)\n✅ Pakistan pilot live; UAE / India / UK / USA rolling out 2026-2027\n\nJoin free with my link if you'd like to explore:\n${link}\n\n#EHB #Web3 #Blockchain #SuperApp #AffiliateProgram`,
  },
  {
    key: 'pro',
    label: 'Professional (Cold email)',
    icon: '💼',
    text: (link: string) =>
      `Subject: Quick intro — EHB Technologies super-app\n\nHi [Name],\n\nI hope this finds you well. I wanted to bring EHB Technologies to your attention — a unified platform spanning 38 industries (education, health, business, jobs, e-commerce, legal, IT) with AI-driven services and Polkadot blockchain-verified trust.\n\nWhat distinguishes EHB:\n\n• Service Trust Level (STL) — 100-point composite score (PSS + CRB + DMO) ranking every seller, service, and product, verified on-chain\n• Strict compliance posture — explicitly NOT MLM (Affiliate + Marketplace + Service Platform); 80/20 income rule from external sales; 30-day cooling-off; OFAC sanctions screening\n• Adapter-pattern architecture — production-swappable KYC, payment, and blockchain drivers\n• Pakistan pilot live (SECP-aligned); UAE/India/UK/USA expansion 2026-2027\n\nIf this seems relevant, here's the introduction link: ${link}\n\nHappy to answer any questions.\n\nBest regards,\n[Your name]`,
  },
];

const ELEVATOR_PITCHES = [
  {
    industry: 'Education (OBS)',
    pitch:
      "Online Business School with blockchain-verified credentials. Every certificate is anchored on-chain — instantly verifiable by employers worldwide. Rate of return on courses tracked transparently.",
  },
  {
    industry: 'Wellness (WMS)',
    pitch:
      "STL-ranked doctors and clinics with AI symptom checker. Every practitioner CRB-verified — see their rating, certifications, and patient reviews before booking. No surprises.",
  },
  {
    industry: 'Legal (OLS)',
    pitch:
      "Trust-ranked lawyers + AI-powered legal research. STL ladder shows track record — case wins, client retention, certifications. Get matched in minutes.",
  },
  {
    industry: 'GoSellr (GSM)',
    pitch:
      "E-commerce with built-in escrow + complaint resolution + rider-verified delivery. Every product STL-ranked end-to-end — buyer, seller, product, company, owner all on the trust chain.",
  },
  {
    industry: 'Jobs (JPS)',
    pitch:
      "Job placement with on-chain skill credentials. AI matches your profile to roles instantly. Employer sees your CRB score — verified credentials, not LinkedIn fluff.",
  },
];

export function AffiliatePromoMaterials({ referralCode, baseUrl }: Props) {
  const code = referralCode || 'yourname-DEMO';
  const link = `${baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ehb.com')}/?ref=${code}`;

  const [selectedBanner, setSelectedBanner] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(text: string, id: string) {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function downloadSvg(banner: typeof BANNER_SIZES[number]) {
    const svg = generateBannerSvg(banner, link, code);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ehb-affiliate-${banner.key}-${code}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const currentBanner = BANNER_SIZES[selectedBanner];

  return (
    <PlasticCard className="mt-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 sm:text-xs">
            🎨 Promo materials library
          </div>
          <h3 className="mt-1 text-lg font-semibold">Branded assets — ready to grab</h3>
          <p className="mt-1 text-xs text-white/50">
            Pre-built banners + copy templates with your referral code embedded. SVG = scales infinitely.
          </p>
        </div>
      </div>

      {/* Banners */}
      <div className="mt-5">
        <div className="text-[11px] font-semibold text-white/70">Banners (SVG · scalable)</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {BANNER_SIZES.map((b, i) => (
            <button
              key={b.key}
              onClick={() => setSelectedBanner(i)}
              className={`rounded-pill border px-3 py-1 text-[11px] transition ${
                selectedBanner === i
                  ? 'border-purple-light bg-purple-light/15 text-purple-light'
                  : 'border-glass bg-card/40 text-white/60 hover:border-purple-light/50'
              }`}
            >
              {b.label} <span className="opacity-60">({b.size})</span>
            </button>
          ))}
        </div>

        {/* Banner preview */}
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-card border border-glass bg-nested/40 p-3">
            <div className="text-[10px] text-white/50">{currentBanner.useCase}</div>
            <div
              className="mt-2 overflow-hidden rounded border border-glass"
              style={{ aspectRatio: `${currentBanner.w} / ${currentBanner.h}`, maxHeight: 320 }}
            >
              <div
                className="flex h-full w-full items-center justify-center"
                dangerouslySetInnerHTML={{ __html: generateBannerSvg(currentBanner, link, code) }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => downloadSvg(currentBanner)}
              className="flex w-full items-center justify-center gap-2 rounded-card border border-purple-light/50 bg-purple-light/10 px-4 py-3 text-sm font-semibold text-purple-light transition hover:bg-purple-light/20"
            >
              ⬇️ Download SVG
            </button>
            <button
              onClick={() => copyText(generateBannerSvg(currentBanner, link, code), `svg-${currentBanner.key}`)}
              className={`w-full rounded-card border px-4 py-2 text-xs transition ${
                copied === `svg-${currentBanner.key}`
                  ? 'border-teal bg-teal/20 text-teal'
                  : 'border-glass bg-card/40 text-white/60 hover:border-teal'
              }`}
            >
              {copied === `svg-${currentBanner.key}` ? '✓ SVG copied' : '📋 Copy SVG markup'}
            </button>
            <div className="rounded-card border border-glass bg-card/40 p-2.5 text-[10px] text-white/60">
              <strong>Tip:</strong> SVG opens in browsers, Photoshop, Figma, Canva. Convert to PNG/JPG via any image tool if needed.
            </div>
          </div>
        </div>
      </div>

      {/* Copy templates */}
      <div className="mt-6">
        <div className="text-[11px] font-semibold text-white/70">Copy templates — paste &amp; share</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {COPY_TEMPLATES.map((t) => {
            const text = t.text(link);
            return (
              <div key={t.key} className="rounded-card border border-glass bg-card/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-[12px] font-medium">{t.label}</span>
                  </div>
                  <button
                    onClick={() => copyText(text, t.key)}
                    className={`rounded-pill border px-2 py-0.5 text-[10px] transition ${
                      copied === t.key
                        ? 'border-teal bg-teal/20 text-teal'
                        : 'border-glass bg-nested/60 text-white/60 hover:border-teal'
                    }`}
                  >
                    {copied === t.key ? '✓' : '📋 Copy'}
                  </button>
                </div>
                <p className="mt-2 line-clamp-3 whitespace-pre-line text-[10px] text-white/60">{text}</p>
                <div className="mt-1.5 text-[9px] text-white/40">{text.length} chars</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Industry pitches */}
      <div className="mt-6">
        <div className="text-[11px] font-semibold text-white/70">Industry elevator pitches</div>
        <div className="mt-2 space-y-1.5">
          {ELEVATOR_PITCHES.map((p) => (
            <div
              key={p.industry}
              className="flex items-start gap-3 rounded-card border border-glass bg-card/40 p-3"
            >
              <Chip tone="purple">{p.industry}</Chip>
              <p className="flex-1 text-[11px] text-white/70">{p.pitch}</p>
              <button
                onClick={() => copyText(p.pitch, `pitch-${p.industry}`)}
                className={`shrink-0 rounded-pill border px-2 py-0.5 text-[10px] transition ${
                  copied === `pitch-${p.industry}`
                    ? 'border-teal bg-teal/20 text-teal'
                    : 'border-glass bg-nested/60 text-white/60 hover:border-teal'
                }`}
              >
                {copied === `pitch-${p.industry}` ? '✓' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Email signature */}
      <div className="mt-6">
        <div className="text-[11px] font-semibold text-white/70">Email signature snippet (HTML)</div>
        <div className="mt-2 rounded-card border border-glass bg-card/40 p-3">
          <pre className="overflow-x-auto whitespace-pre-wrap text-[10px] text-white/70">
{`<div style="font-family:system-ui,-apple-system,sans-serif;border-top:1px solid #ddd;padding-top:8px;margin-top:12px;">
  <span style="display:inline-block;background:linear-gradient(90deg,#7B6EF6,#2BBFA0);
               color:white;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;">
    EHB Affiliate · ${code}
  </span>
  <span style="font-size:11px;color:#666;margin-left:8px;">
    Discover 38 industries on one super-app — <a href="${link}" style="color:#7B6EF6;">Join free →</a>
  </span>
</div>`}
          </pre>
          <button
            onClick={() =>
              copyText(
                `<div style="font-family:system-ui,-apple-system,sans-serif;border-top:1px solid #ddd;padding-top:8px;margin-top:12px;"><span style="display:inline-block;background:linear-gradient(90deg,#7B6EF6,#2BBFA0);color:white;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;">EHB Affiliate · ${code}</span><span style="font-size:11px;color:#666;margin-left:8px;">Discover 38 industries on one super-app — <a href="${link}" style="color:#7B6EF6;">Join free →</a></span></div>`,
                'email-sig'
              )
            }
            className={`mt-2 w-full rounded-card border px-4 py-2 text-xs transition ${
              copied === 'email-sig'
                ? 'border-teal bg-teal/20 text-teal'
                : 'border-glass bg-card/60 hover:border-teal'
            }`}
          >
            {copied === 'email-sig' ? '✓ Email signature copied' : '📋 Copy HTML signature'}
          </button>
        </div>
      </div>
    </PlasticCard>
  );
}

function generateBannerSvg(
  banner: typeof BANNER_SIZES[number],
  link: string,
  code: string
): string {
  const { w, h, key } = banner;
  // Different layouts per banner type
  const isVertical = h > w * 1.3;
  const isWide = w > h * 5;
  const isSig = key === 'sig';

  const fontSize = Math.min(w, h) / (isWide ? 6 : isVertical ? 16 : 12);
  const titleSize = isSig ? 22 : Math.min(w, h) / (isVertical ? 12 : 8);
  const taglineSize = fontSize * 0.7;

  if (isWide) {
    // leaderboard / signature — horizontal
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#04060e"/>
      <stop offset="100%" stop-color="#13162A"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7B6EF6"/>
      <stop offset="100%" stop-color="#2BBFA0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect x="0" y="0" width="6" height="${h}" fill="url(#accent)"/>
  <text x="${w / 2}" y="${h / 2 - taglineSize / 2}" font-family="system-ui,-apple-system,sans-serif" font-size="${titleSize}" font-weight="800" fill="white" text-anchor="middle">EHB · 38 Industries · 1 Super-App</text>
  <text x="${w / 2}" y="${h / 2 + titleSize}" font-family="system-ui,-apple-system,sans-serif" font-size="${taglineSize}" fill="#2BBFA0" text-anchor="middle">Real cashback · No joining fees · Join via ${code}</text>
</svg>`;
  }

  // square / story / landscape / sidebar
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#04060e"/>
      <stop offset="50%" stop-color="#13162A"/>
      <stop offset="100%" stop-color="#1A1D33"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7B6EF6"/>
      <stop offset="100%" stop-color="#2BBFA0"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7B6EF6" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#7B6EF6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="${w / 2}" cy="${h * 0.35}" r="${Math.min(w, h) * 0.4}" fill="url(#glow)"/>

  <!-- Logo badge -->
  <rect x="${w / 2 - 80}" y="${h * 0.18}" width="160" height="50" rx="12" fill="url(#accent)"/>
  <text x="${w / 2}" y="${h * 0.18 + 33}" font-family="system-ui,-apple-system,sans-serif" font-size="22" font-weight="800" fill="white" text-anchor="middle">EHB</text>

  <!-- Title -->
  <text x="${w / 2}" y="${h * 0.42}" font-family="system-ui,-apple-system,sans-serif" font-size="${titleSize}" font-weight="800" fill="white" text-anchor="middle">38 Industries</text>
  <text x="${w / 2}" y="${h * 0.42 + titleSize * 1.1}" font-family="system-ui,-apple-system,sans-serif" font-size="${titleSize}" font-weight="800" fill="white" text-anchor="middle">1 Super-App</text>

  <!-- Tagline -->
  <text x="${w / 2}" y="${h * 0.62}" font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize}" fill="#2BBFA0" text-anchor="middle">AI + Blockchain Trust</text>
  <text x="${w / 2}" y="${h * 0.62 + fontSize * 1.4}" font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize * 0.8}" fill="#A098F8" text-anchor="middle">Real cashback · No joining fees</text>

  <!-- Code badge -->
  <rect x="${w / 2 - 100}" y="${h * 0.78}" width="200" height="44" rx="22" fill="rgba(123,110,246,0.15)" stroke="#7B6EF6" stroke-width="2"/>
  <text x="${w / 2}" y="${h * 0.78 + 28}" font-family="monospace" font-size="${fontSize * 0.85}" font-weight="700" fill="#7B6EF6" text-anchor="middle">Join: ${code}</text>

  <!-- CTA -->
  <text x="${w / 2}" y="${h * 0.93}" font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize * 0.7}" fill="rgba(255,255,255,0.5)" text-anchor="middle">${link}</text>
</svg>`;
}
