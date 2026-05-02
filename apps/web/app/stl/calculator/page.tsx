/**
 * EHB · STL Calculator (public preview)
 *
 * User adjusts PSS / CRB / DMO sliders (0-10 each) + locked EHBGC.
 * Returns STL score + level + which industries unlock.
 *
 * No auth required — public marketing tool.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const LEVEL_COLORS: Record<number, string> = {
  1: '#64748b', 2: '#94a3b8', 3: '#3b82f6', 4: '#10b981', 5: '#06b6d4',
  6: '#8b5cf6', 7: '#a855f7', 8: '#f59e0b', 9: '#ef4444', 10: '#fbbf24',
};

type Result = {
  score: number;
  level: number;
  levelName: string;
  levelTier: string;
  authority: string;
  breakdown: {
    pssPoints: number;
    crbPoints: number;
    dmoPoints: number;
    lowestComponent: number;
    cap: number;
  };
  weakestComponentName: string;
  lockRequired: number;
  lockSatisfied: boolean;
  industriesUnlocked: string[];
  industriesGateAtThisLevel: string[];
  climbingPath: {
    nextLevel: number | null;
    nextName?: string;
    nextLockNeeded?: number;
    nextAuthority?: string;
    pointsNeeded?: number;
    message?: string;
  };
};

export default function StlCalculatorPage() {
  const [pss, setPss] = useState(3);
  const [crb, setCrb] = useState(2);
  const [dmo, setDmo] = useState(2);
  const [locked, setLocked] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function calculate() {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/stl/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pssLevel: pss, crbLevel: crb, dmoLevel: dmo, ehbgcLocked: locked }),
      });
      if (r.ok) setResult(await r.json());
    } catch {}
    setLoading(false);
  }

  // Auto-recalculate on input change (debounced)
  useEffect(() => {
    const t = setTimeout(calculate, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pss, crb, dmo, locked]);

  return (
    <div className="min-h-screen bg-[#0C0E1A] text-[#F4F5FA] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🧮 EHB STL Calculator</h1>
          <p className="text-[#A0A4BC]">
            Apna trust score preview karein. Adjust the sliders to see your level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* INPUTS */}
          <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold mb-2">Your Inputs</h2>

            <SliderRow label="PSS Level (Identity)" value={pss} onChange={setPss} desc="Email → KYC → Biometric" />
            <SliderRow label="CRB Level (Skills)" value={crb} onChange={setCrb} desc="Exams + certifications + refills" />
            <SliderRow label="DMO Level (Behavior)" value={dmo} onChange={setDmo} desc="Activity + clean record" />

            <div className="border-t border-[#2D3147] pt-4">
              <label className="block text-sm font-medium mb-2">EHBGC Locked</label>
              <input
                type="number"
                min={0}
                value={locked}
                onChange={(e) => setLocked(Number(e.target.value) || 0)}
                className="w-full bg-[#1A1D33] border border-[#2D3147] rounded px-3 py-2"
              />
              <p className="text-xs text-[#6B7088] mt-1">
                Min lock for L4 = 100 · L7 = 800 · L10 = 10,000
              </p>
            </div>

            <div className="text-xs text-[#6B7088] bg-[#1A1D33] p-3 rounded">
              <strong className="text-[#A098F8]">Formula:</strong>
              <br />Score = (PSS×4 + CRB×3 + DMO×3) → MIN(score/1.2, lowest+1)
            </div>
          </div>

          {/* OUTPUT */}
          <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold mb-2">Your Result</h2>

            {loading && <p className="text-[#6B7088]">Computing...</p>}

            {result && (
              <>
                {/* Big level badge */}
                <div
                  className="text-center py-8 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${LEVEL_COLORS[result.level]}33, ${LEVEL_COLORS[result.level]}11)`,
                    border: `1px solid ${LEVEL_COLORS[result.level]}55`,
                  }}
                >
                  <div className="text-xs uppercase tracking-wider text-[#A0A4BC] mb-1">EHB STL</div>
                  <div className="text-6xl font-bold" style={{ color: LEVEL_COLORS[result.level] }}>
                    L{result.level}
                  </div>
                  <div className="text-xl font-semibold mt-2">{result.levelName}</div>
                  <div className="text-sm text-[#A0A4BC] mt-1">
                    Score: {result.score} / 100 · {result.levelTier} tier
                  </div>
                </div>

                <div className="text-sm text-center text-[#A0A4BC]">
                  {result.authority}
                </div>

                {/* Breakdown */}
                <div className="space-y-2">
                  <BreakdownRow label="PSS contribution" value={result.breakdown.pssPoints} max={40} color="#7B6EF6" />
                  <BreakdownRow label="CRB contribution" value={result.breakdown.crbPoints} max={40} color="#2BBFA0" />
                  <BreakdownRow label="DMO contribution" value={result.breakdown.dmoPoints} max={40} color="#F0A030" />
                </div>

                {/* MIN-chain info */}
                <div className="text-xs text-[#6B7088] bg-[#1A1D33] p-3 rounded">
                  <strong>Weakest link:</strong> {result.weakestComponentName} L{result.breakdown.lowestComponent} ·
                  This caps your level at L{Math.floor(result.breakdown.cap / 10)}
                </div>

                {/* Lock status */}
                <div className={`p-3 rounded border ${result.lockSatisfied ? 'bg-[#2BBFA022] border-[#2BBFA0] text-[#2BBFA0]' : 'bg-[#F0A03022] border-[#F0A030] text-[#F0A030]'}`}>
                  {result.lockSatisfied ? '✅ Lock satisfied' : `⚠️ Need ${result.lockRequired - locked} more EHBGC locked for L${result.level}`}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Industries unlocked */}
        {result && (
          <div className="mt-6 bg-[#13162A] border border-[#2D3147] rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">
              🌍 Industries you can list in: {result.industriesUnlocked.length} of 38
            </h2>
            <div className="flex flex-wrap gap-2">
              {result.industriesUnlocked.map((code) => (
                <span key={code} className="px-3 py-1 bg-[#7B6EF622] text-[#A098F8] rounded-full text-xs font-medium">
                  {code}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Climbing path */}
        {result?.climbingPath?.nextLevel && (
          <div className="mt-6 bg-[#13162A] border border-[#2D3147] rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">📈 Next: L{result.climbingPath.nextLevel} {result.climbingPath.nextName}</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-[#6B7088] text-xs uppercase">Points needed</div>
                <div className="text-xl font-bold text-[#A098F8]">+{result.climbingPath.pointsNeeded}</div>
              </div>
              <div>
                <div className="text-[#6B7088] text-xs uppercase">Lock needed</div>
                <div className="text-xl font-bold text-[#F0A030]">{result.climbingPath.nextLockNeeded} EHBGC</div>
              </div>
              <div>
                <div className="text-[#6B7088] text-xs uppercase">Unlocks</div>
                <div className="text-sm">{result.climbingPath.nextAuthority}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-[#6B7088]">
          <Link href="/signup" className="text-[#A098F8] hover:underline">
            Sign up to start building real STL →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SliderRow({ label, value, onChange, desc }: { label: string; value: number; onChange: (v: number) => void; desc: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-bold text-[#A098F8]">L{value}</span>
      </div>
      <input
        type="range" min={0} max={10} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <p className="text-xs text-[#6B7088] mt-1">{desc}</p>
    </div>
  );
}

function BreakdownRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span style={{ color }}>{value.toFixed(1)} / {max}</span>
      </div>
      <div className="h-2 bg-[#1A1D33] rounded-full overflow-hidden">
        <div className="h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
