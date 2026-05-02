/**
 * EHB · Seller Commission Breakdown
 *
 * Shows the seller exactly where their order revenue went:
 *   - 70% to seller (themselves)
 *   - 10% rider (if delivered)
 *   - 10% franchise (split across 5 tiers)
 *   - 10% EHB platform
 *
 * Per-order drilldown + cumulative totals + tax breakdown.
 */

'use client';

import { useEffect, useState } from 'react';

type Earning = {
  earningId: string;
  orderId: string;
  industry: string;
  country: string;
  type: string;
  gross_amount: number;
  tax_amount: number;
  net_amount: number;
  currency: string;
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'REJECTED';
  createdAt: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CommissionPage() {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch_() {
      setLoading(true);
      try {
        const r = await fetch(`${API_BASE}/api/finance/me/earnings${statusFilter ? `?status=${statusFilter}` : ''}`, { credentials: 'include' });
        if (r.ok) setEarnings((await r.json()).items || []);
      } catch {}
      setLoading(false);
    }
    fetch_();
  }, [statusFilter]);

  const totalGross = earnings.reduce((s, e) => s + (e.gross_amount || 0), 0);
  const totalTax = earnings.reduce((s, e) => s + (e.tax_amount || 0), 0);
  const totalNet = earnings.reduce((s, e) => s + (e.net_amount || 0), 0);
  const paidCount = earnings.filter((e) => e.status === 'PAID').length;
  const pendingCount = earnings.filter((e) => e.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#0C0E1A] text-[#F4F5FA] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">💰 My Commission & Earnings</h1>
        <p className="text-[#A0A4BC] text-sm mb-6">Per-order breakdown · Tax-aware · Wallet-ready</p>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard label="Total Gross" value={`$${totalGross.toFixed(2)}`} color="#7B6EF6" />
          <SummaryCard label="Tax Withheld" value={`$${totalTax.toFixed(2)}`} color="#F0A030" />
          <SummaryCard label="Net Earned" value={`$${totalNet.toFixed(2)}`} color="#2BBFA0" />
          <SummaryCard label="Pending / Paid" value={`${pendingCount} / ${paidCount}`} color="#A098F8" />
        </div>

        {/* Revenue split visual */}
        <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">📊 How Each Order's Revenue Splits</h2>
          <div className="space-y-3">
            <SplitBar label="You (Seller)" pct={70} amount={totalGross * 0.7} color="#2BBFA0" />
            <SplitBar label="Rider (LDS)" pct={10} amount={totalGross * 0.1} color="#F0A030" note="if delivered" />
            <SplitBar label="Franchise (5-tier)" pct={10} amount={totalGross * 0.1} color="#7B6EF6" />
            <SplitBar label="EHB Platform" pct={10} amount={totalGross * 0.1} color="#A098F8" />
          </div>
          <p className="text-xs text-[#6B7088] mt-4">
            Franchise 10% splits: Sub 4% · Corporate 1.5% · Master 2.5% · Country 1.5% · HQ 0.5%
          </p>
        </div>

        {/* Filter + table */}
        <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">📋 Earnings Ledger</h2>
            <select
              className="bg-[#1A1D33] border border-[#2D3147] rounded px-3 py-1.5 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="PAID">Paid</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {loading ? (
            <p className="text-[#6B7088]">Loading...</p>
          ) : earnings.length === 0 ? (
            <div className="text-center py-12 text-[#6B7088]">
              <p className="text-3xl mb-2">📭</p>
              <p>No earnings yet. Complete your first order to see breakdown here.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#A0A4BC] border-b border-[#2D3147]">
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Order</th>
                  <th className="text-left py-3">Industry</th>
                  <th className="text-right py-3">Gross</th>
                  <th className="text-right py-3">Tax</th>
                  <th className="text-right py-3">Net</th>
                  <th className="text-center py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((e) => (
                  <tr key={e.earningId} className="border-b border-[#1F2238] hover:bg-[#1A1D33]">
                    <td className="py-3 text-[#A0A4BC]">{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 font-mono text-xs">{e.orderId?.slice(-8) || '—'}</td>
                    <td className="py-3"><span className="px-2 py-0.5 bg-[#1A1D33] rounded text-xs">{e.industry}</span></td>
                    <td className="text-right py-3">{e.currency} {e.gross_amount?.toFixed(2)}</td>
                    <td className="text-right py-3 text-[#F0A030]">{e.tax_amount?.toFixed(2) || '0.00'}</td>
                    <td className="text-right py-3 text-[#2BBFA0] font-semibold">{e.net_amount?.toFixed(2)}</td>
                    <td className="text-center py-3"><StatusPill status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-xs text-[#6B7088] mt-4">
          💡 Earnings flow: order settled → PENDING → DMO approves → APPROVED → wallet release → PAID
        </p>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#13162A] border border-[#2D3147] rounded-xl p-5">
      <p className="text-xs text-[#A0A4BC] uppercase tracking-wider mb-2">{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

function SplitBar({ label, pct, amount, color, note }: { label: string; pct: number; amount: number; color: string; note?: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span><span className="font-medium">{label}</span> {note && <span className="text-[#6B7088] text-xs">({note})</span>}</span>
        <span className="text-[#A0A4BC]">{pct}% · <span style={{ color }}>${amount.toFixed(2)}</span></span>
      </div>
      <div className="h-2 bg-[#1A1D33] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: '#F0A030',
    APPROVED: '#7B6EF6',
    PAID: '#2BBFA0',
    REJECTED: '#F05858',
  };
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: `${colors[status] || '#6B7088'}22`, color: colors[status] || '#6B7088' }}
    >
      {status}
    </span>
  );
}
