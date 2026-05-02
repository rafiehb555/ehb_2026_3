/**
 * EHB · Founder Daily Brief
 *
 * Auto-refreshes every 5 minutes.
 * Shows: metrics + AI summary + top 3 decisions + going well + risks.
 *
 * Founder reads this each morning. ~30 seconds to scan.
 */

'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type Brief = {
  date: string;
  generated_at: string;
  metrics: Record<string, string | number>;
  summary: string;
  top_decisions_needed: string[];
  going_well: string[];
  risks: string[];
  suggested_focus: string;
};

export default function DailyBriefPage() {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/founder/daily-brief`, { credentials: 'include' });
      if (r.ok) setBrief(await r.json());
    } catch {}
    setLoading(false);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5 * 60 * 1000); // 5-min refresh
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0E1A] text-[#F4F5FA] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">☀️ Daily Brief</h1>
            <p className="text-[#A0A4BC] text-sm mt-1">
              {brief?.date && new Date(brief.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              {brief?.generated_at && ` · refreshed ${new Date(brief.generated_at).toLocaleTimeString()}`}
            </p>
          </div>
          <button onClick={load} className="px-4 py-2 bg-[#7B6EF6] hover:bg-[#5C4DD0] rounded-pill text-sm font-medium">
            ↻ Refresh
          </button>
        </div>

        {loading && !brief && <p className="text-[#6B7088]">Loading...</p>}

        {brief && (
          <>
            {/* AI Summary */}
            <div className="bg-gradient-to-br from-[#7B6EF6]/20 to-[#A098F8]/10 border border-[#7B6EF6]/40 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A098F8] mb-1">AI Summary</div>
                  <p className="text-lg leading-relaxed">{brief.summary}</p>
                </div>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">📊 Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(brief.metrics).map(([k, v]) => (
                  <div key={k} className="bg-[#1A1D33] rounded-lg p-3">
                    <div className="text-xs text-[#A0A4BC] uppercase tracking-wider mb-1">{k}</div>
                    <div className="text-xl font-bold">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 columns: decisions / going well / risks */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Column
                icon="🎯"
                title="Decisions Needed"
                items={brief.top_decisions_needed}
                color="#F0A030"
                bg="#F0A030"
              />
              <Column
                icon="✅"
                title="Going Well"
                items={brief.going_well}
                color="#2BBFA0"
                bg="#2BBFA0"
              />
              <Column
                icon="⚠️"
                title="Risks"
                items={brief.risks}
                color="#F05858"
                bg="#F05858"
              />
            </div>

            {/* Suggested focus */}
            <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#A0A4BC] mb-1">Today's Focus</div>
                  <p className="text-lg font-medium">{brief.suggested_focus}</p>
                </div>
              </div>
            </div>
          </>
        )}

        <p className="text-xs text-[#6B7088] mt-6 text-center">
          Auto-refreshes every 5 min · Data from real platform metrics + AI summary
        </p>
      </div>
    </div>
  );
}

function Column({ icon, title, items, color, bg }: { icon: string; title: string; items: string[]; color: string; bg: string }) {
  return (
    <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold" style={{ color }}>{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm">
            <span style={{ color: bg }}>•</span>
            <span className="text-[#D3D1C7]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
