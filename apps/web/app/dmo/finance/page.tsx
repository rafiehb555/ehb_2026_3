/**
 * EHB · DMO Finance Dashboard
 *
 * Admin-only view of platform finance:
 *   - Overview: pending/approved/paid counters + total USD lifetime
 *   - Reports: per-industry / per-country / per-type
 *   - Reconciliation runner
 *   - Tax + FX quick lookup
 */

'use client';

import { useEffect, useState } from 'react';

type Overview = {
  earnings_count: { pending: number; approved: number; paid: number };
  total_usd_lifetime: number;
};

type ReportRow = {
  _id: string;
  count: number;
  total_gross: number;
  total_tax: number;
  total_net: number;
  total_usd: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function FinanceDashboardPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [report, setReport] = useState<ReportRow[]>([]);
  const [groupBy, setGroupBy] = useState('industry');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [oRes, rRes] = await Promise.all([
          fetch(`${API_BASE}/api/finance/overview`, { credentials: 'include' }),
          fetch(`${API_BASE}/api/finance/reports?groupBy=${groupBy}`, { credentials: 'include' }),
        ]);
        if (oRes.ok) setOverview(await oRes.json());
        if (rRes.ok) {
          const data = await rRes.json();
          setReport(data.items || []);
        }
      } catch (err) {
        console.error('finance fetch failed', err);
      }
      setLoading(false);
    }
    fetchData();
  }, [groupBy]);

  return (
    <div className="min-h-screen bg-[#0C0E1A] text-[#F4F5FA] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">💰 Finance Dashboard</h1>
            <p className="text-[#A0A4BC] text-sm mt-1">DMO admin view — earnings, reports, reconciliation</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#7B6EF6] text-white rounded-pill text-sm font-medium hover:bg-[#5C4DD0]">
              Run Reconciliation
            </button>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <KpiCard label="Pending earnings" value={overview?.earnings_count.pending} color="#F0A030" />
          <KpiCard label="Approved" value={overview?.earnings_count.approved} color="#7B6EF6" />
          <KpiCard label="Paid" value={overview?.earnings_count.paid} color="#38C878" />
          <KpiCard
            label="Lifetime USD"
            value={overview?.total_usd_lifetime ? `$${overview.total_usd_lifetime.toLocaleString()}` : '$0'}
            color="#2BBFA0"
          />
        </div>

        {/* Report Section */}
        <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">📊 Platform Report</h2>
            <select
              className="bg-[#1A1D33] border border-[#2D3147] rounded-input px-3 py-1.5 text-sm"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="industry">By Industry</option>
              <option value="country">By Country</option>
              <option value="type">By Type</option>
              <option value="status">By Status</option>
            </select>
          </div>

          {loading ? (
            <p className="text-[#6B7088]">Loading...</p>
          ) : report.length === 0 ? (
            <p className="text-[#6B7088]">No earnings recorded yet. Run an order flow to populate.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#A0A4BC] border-b border-[#2D3147]">
                  <th className="text-left py-3">{groupBy.toUpperCase()}</th>
                  <th className="text-right py-3">Count</th>
                  <th className="text-right py-3">Gross</th>
                  <th className="text-right py-3">Tax</th>
                  <th className="text-right py-3">Net</th>
                  <th className="text-right py-3">USD</th>
                </tr>
              </thead>
              <tbody>
                {report.map((r) => (
                  <tr key={r._id} className="border-b border-[#1F2238] hover:bg-[#1A1D33]">
                    <td className="py-3 font-medium">{r._id || '—'}</td>
                    <td className="text-right text-[#A0A4BC]">{r.count}</td>
                    <td className="text-right">${(r.total_gross || 0).toFixed(2)}</td>
                    <td className="text-right text-[#F0A030]">${(r.total_tax || 0).toFixed(2)}</td>
                    <td className="text-right">${(r.total_net || 0).toFixed(2)}</td>
                    <td className="text-right text-[#2BBFA0] font-semibold">${(r.total_usd || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">🧾 Tax Quick Lookup</h3>
            <p className="text-sm text-[#A0A4BC] mb-3">
              Use <code className="text-[#A098F8]">GET /api/finance/tax/rate?country=PK&industry=WMS</code>
            </p>
            <p className="text-xs text-[#6B7088]">Industry exemptions auto-applied (WMS / HCS / EDS / HPS / OBS = 0%)</p>
          </div>

          <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">💱 FX Rates</h3>
            <p className="text-sm text-[#A0A4BC] mb-3">
              Use <code className="text-[#A098F8]">POST /api/finance/fx/convert</code>
            </p>
            <p className="text-xs text-[#6B7088]">Cached 24h; quote with 0.5% buffer</p>
          </div>
        </div>

        {/* Operations Note */}
        <div className="mt-6 p-4 bg-[#13162A]/50 border border-[#2D3147] rounded-lg">
          <p className="text-xs text-[#6B7088]">
            💡 Approve earnings via <code className="text-[#A098F8]">POST /api/finance/earnings/:id/approve</code>.
            Mark paid after wallet release. Run reconciliation weekly.
          </p>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, color }: { label: string; value: number | string | undefined; color: string }) {
  return (
    <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-5">
      <p className="text-xs text-[#A0A4BC] uppercase tracking-wider mb-2">{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value ?? '—'}</p>
    </div>
  );
}
