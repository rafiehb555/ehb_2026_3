'use client';

import { useEffect, useState } from 'react';
import { Chip } from '../ui/chip';

/**
 * EHB Affiliate — Product Promote Modal
 *
 * Opens from product detail / marketplace card "Promote" button.
 * Shows:
 *  - Auto-generated QR code (SVG, no external library)
 *  - Native Share button (Web Share API)
 *  - Copy tracking link
 *  - One-click social share buttons
 *  - 30-day attribution policy reminder
 *
 * Matches Visily prototype Promote modal design.
 */

interface Props {
  open: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    priceUsd: number;
    industry?: string;
    sellerName?: string;
  };
  referralCode?: string;
  baseUrl?: string;
}

/**
 * Tiny QR code generator — renders a deterministic pseudo-QR pattern as SVG.
 * For production, swap with `qrcode` npm library; this is for visual fidelity
 * during development without bundle bloat.
 */
function pseudoQrCells(text: string, size = 25): boolean[][] {
  // Simple hash-based deterministic pattern that LOOKS like a QR code
  const cells: boolean[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => false)
  );

  // Hash the text into a stable seed
  let seed = 0;
  for (let i = 0; i < text.length; i++) {
    seed = (seed * 31 + text.charCodeAt(i)) >>> 0;
  }

  // Fill with deterministic pseudo-random based on seed
  function rand(x: number, y: number): boolean {
    const v = ((seed ^ (x * 1009 + y * 7919)) * 2654435761) >>> 0;
    return v % 100 < 48;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      cells[y][x] = rand(x, y);
    }
  }

  // Draw 3 finder patterns (corners) — standard QR look
  function drawFinder(ox: number, oy: number) {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const isOuter = x === 0 || x === 6 || y === 0 || y === 6;
        const isInner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        cells[oy + y][ox + x] = isOuter || isInner;
      }
    }
    // White separator border
    for (let i = -1; i <= 7; i++) {
      if (oy + i >= 0 && oy + i < size && ox - 1 >= 0) cells[oy + i][ox - 1] = false;
      if (oy + i >= 0 && oy + i < size && ox + 7 < size) cells[oy + i][ox + 7] = false;
      if (oy - 1 >= 0 && ox + i >= 0 && ox + i < size) cells[oy - 1][ox + i] = false;
      if (oy + 7 < size && ox + i >= 0 && ox + i < size) cells[oy + 7][ox + i] = false;
    }
  }
  drawFinder(0, 0);
  drawFinder(size - 7, 0);
  drawFinder(0, size - 7);

  return cells;
}

function QrCode({ text, size = 200 }: { text: string; size?: number }) {
  const cells = pseudoQrCells(text);
  const cellCount = cells.length;
  const cellSize = size / cellCount;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-card bg-white p-2 shadow-lg"
      style={{ width: size, height: size }}
    >
      <rect width={size} height={size} fill="#ffffff" />
      {cells.flatMap((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#04060e"
            />
          ) : null
        )
      )}
      {/* Center logo */}
      <rect
        x={size / 2 - 18}
        y={size / 2 - 18}
        width={36}
        height={36}
        rx={6}
        fill="white"
      />
      <rect
        x={size / 2 - 14}
        y={size / 2 - 14}
        width={28}
        height={28}
        rx={4}
        fill="url(#qr-logo)"
      />
      <text
        x={size / 2}
        y={size / 2 + 5}
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="white"
        fontFamily="system-ui,-apple-system,sans-serif"
      >
        EHB
      </text>
      <defs>
        <linearGradient id="qr-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7B6EF6" />
          <stop offset="100%" stopColor="#2BBFA0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AffiliatePromoteModal({
  open,
  onClose,
  product,
  referralCode,
  baseUrl,
}: Props) {
  const code = referralCode || 'yourname-DEMO';
  const link = `${baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://ehb.com')}/gosellr/${product.id}?ref=${code}`;
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setShareSupported(true);
    }
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  function copyLink() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function nativeShare() {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      (navigator as any)
        .share({
          title: product.title,
          text: `Check out ${product.title} on EHB`,
          url: link,
        })
        .catch(() => {});
    }
  }

  function downloadQr() {
    const cells = pseudoQrCells(link);
    const sz = 25;
    const cellPx = 16;
    const total = sz * cellPx + cellPx * 2;
    const cells_svg = cells
      .flatMap((row, y) =>
        row.map((on, x) =>
          on
            ? `<rect x="${cellPx + x * cellPx}" y="${cellPx + y * cellPx}" width="${cellPx}" height="${cellPx}" fill="#04060e"/>`
            : ''
        )
      )
      .join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}" viewBox="0 0 ${total} ${total}"><rect width="${total}" height="${total}" fill="#ffffff"/>${cells_svg}</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ehb-promote-${product.id}-${code}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function shareTo(platform: 'whatsapp' | 'twitter' | 'facebook' | 'email') {
    const text = `🚀 Check out ${product.title} on EHB — real cashback, no joining fees! ${link}`;
    let url = '';
    if (platform === 'whatsapp') url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    else if (platform === 'twitter') url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    else if (platform === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    else if (platform === 'email')
      url = `mailto:?subject=${encodeURIComponent(`EHB · ${product.title}`)}&body=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') window.open(url, '_blank');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-card border border-glass bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-glass px-5 py-4">
          <div>
            <h3 className="text-lg font-bold">Promote Product</h3>
            <p className="mt-0.5 text-xs text-white/60">
              Share your unique links to earn commissions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-glass bg-card/40 text-white/60 transition hover:border-white/30 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-5">
          {/* Product info */}
          <div className="rounded-card border border-glass bg-nested/40 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="line-clamp-1 text-sm font-semibold">{product.title}</span>
              <span className="shrink-0 text-base font-bold tabular-nums text-teal">
                ${product.priceUsd.toFixed(2)}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/50">
              {product.industry && <Chip tone="purple">{product.industry}</Chip>}
              {product.sellerName && <span>by {product.sellerName}</span>}
            </div>
          </div>

          {/* QR + native share */}
          <div className="flex items-center justify-center gap-4 rounded-card border border-glass bg-nested/40 p-4">
            <QrCode text={link} size={160} />
            <div className="flex flex-col gap-2">
              <button
                onClick={downloadQr}
                className="rounded-card border border-glass bg-card/60 px-3 py-2 text-xs hover:border-purple-light hover:text-purple-light"
              >
                ⬇️ Download QR
              </button>
              {shareSupported && (
                <button
                  onClick={nativeShare}
                  className="rounded-card border border-glass bg-card/60 px-3 py-2 text-xs hover:border-teal hover:text-teal"
                >
                  📤 Native Share
                </button>
              )}
            </div>
          </div>

          {/* Tracking link */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/50">
              Your Unique Tracking Link
              <span className="ml-1 text-[9px] text-white/40">DEFAULT</span>
            </div>
            <div className="mt-1 flex gap-2">
              <code className="min-w-0 flex-1 truncate rounded-card border border-glass bg-nested px-3 py-2 font-mono text-[11px] text-teal">
                {link}
              </code>
              <button
                onClick={copyLink}
                className={`shrink-0 rounded-card border px-3 py-2 text-xs transition ${
                  copied
                    ? 'border-teal bg-teal/20 text-teal'
                    : 'border-glass bg-card/60 hover:border-teal'
                }`}
              >
                {copied ? '✓' : '📋'}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-white/50">
              Anyone who clicks this link and purchases within 30 days will be attributed to your network line.{' '}
              <a href="/affiliate/how-it-works" className="text-purple-light underline">
                View tracking policy
              </a>
              .
            </p>
          </div>

          {/* Social share buttons */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/50">
              Quick share
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {[
                { key: 'whatsapp', icon: '💬', label: 'WhatsApp', color: '#25D366' },
                { key: 'twitter', icon: '𝕏', label: 'Twitter', color: '#000000' },
                { key: 'facebook', icon: '📘', label: 'Facebook', color: '#1877F2' },
                { key: 'email', icon: '✉️', label: 'Email', color: '#7B6EF6' },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => shareTo(p.key as any)}
                  className="flex flex-col items-center gap-1 rounded-card border border-glass bg-card/40 px-2 py-2.5 transition hover:-translate-y-0.5"
                  style={{ borderColor: `${p.color}55` }}
                >
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-[9px] text-white/70">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Promote Now CTA */}
          <button
            onClick={copyLink}
            className="flex w-full items-center justify-center gap-2 rounded-card bg-gradient-to-r from-purple-light to-teal px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            {copied ? '✓ Link copied — paste anywhere' : '📤 Promote Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
