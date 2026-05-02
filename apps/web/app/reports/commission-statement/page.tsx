'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * EHB — Print-ready Commission Statement (PDF export layout)
 *
 * Visit `/reports/commission-statement?period=2026-04` then File → Print → Save as PDF.
 * Optimized for A4 with proper page breaks, no navigation chrome, regulatory-grade formatting.
 *
 * Use as a regulatory/tax export template. Compatible with finance reconciliation.
 */

interface CommissionLine {
  date: string;
  txnId: string;
  type: string;
  source: string;
  productOrService: string;
  basisUsd: number;
  ratePct: number;
  commissionUsd: number;
  status: 'paid' | 'pending' | 'reversed';
}

const DEMO_DATA = {
  affiliateName: 'Sarah Jenkins',
  affiliateCode: 'SJ892-PRO',
  affiliateId: 'AFF-08291',
  rank: 'R5 Manager',
  taxId: 'PK-NTN-XXXXXXX-X',
  address: 'Plot 42, F-7 Markaz, Islamabad, Pakistan',
  email: 'sarah.jenkins@example.com',
  period: '2026-04',
  periodStart: '2026-04-01',
  periodEnd: '2026-04-30',
  generatedAt: '2026-04-26',
  statementNo: 'STMT-2026-04-08291',
  lines: [
    { date: '2026-04-02', txnId: 'TXN-9821', type: 'direct_sale', source: 'Ahmed K.', productOrService: 'OBS Pro Annual', basisUsd: 299, ratePct: 10, commissionUsd: 29.9, status: 'paid' as const },
    { date: '2026-04-03', txnId: 'TXN-9822', type: 'level_2', source: 'via Ahmed K.', productOrService: 'GoSellr Order #4821', basisUsd: 65, ratePct: 1.5, commissionUsd: 0.98, status: 'paid' as const },
    { date: '2026-04-05', txnId: 'TXN-9823', type: 'first_sale_bonus', source: 'Hassan M.', productOrService: 'Welcome bonus', basisUsd: 0, ratePct: 0, commissionUsd: 5.0, status: 'paid' as const },
    { date: '2026-04-08', txnId: 'TXN-9824', type: 'stl_purchase_bonus', source: 'Zara B.', productOrService: 'STL L3 → L4 upgrade', basisUsd: 320, ratePct: 3, commissionUsd: 9.6, status: 'paid' as const },
    { date: '2026-04-12', txnId: 'TXN-9825', type: 'direct_sale', source: 'Ayesha R.', productOrService: 'WMS 3-Month Plan', basisUsd: 180, ratePct: 8, commissionUsd: 14.4, status: 'paid' as const },
    { date: '2026-04-14', txnId: 'TXN-9826', type: 'matching_bonus', source: 'Ahmed K. team', productOrService: 'L1 matching 5%', basisUsd: 124, ratePct: 5, commissionUsd: 6.2, status: 'paid' as const },
    { date: '2026-04-15', txnId: 'TXN-9827', type: 'direct_sale', source: 'Imran S.', productOrService: 'OLS Premium Retainer', basisUsd: 450, ratePct: 15, commissionUsd: 67.5, status: 'paid' as const },
    { date: '2026-04-18', txnId: 'TXN-9828', type: 'rank_achievement', source: 'System', productOrService: 'R5 Manager promotion', basisUsd: 0, ratePct: 0, commissionUsd: 500.0, status: 'paid' as const },
    { date: '2026-04-20', txnId: 'TXN-9829', type: 'team_performance', source: 'Team monthly threshold', productOrService: '2% of $100K+', basisUsd: 124800, ratePct: 2, commissionUsd: 200.0, status: 'paid' as const },
    { date: '2026-04-22', txnId: 'TXN-9830', type: 'direct_sale', source: 'Bilal F.', productOrService: 'GSM Premium Bundle', basisUsd: 89, ratePct: 10, commissionUsd: 8.9, status: 'pending' as const },
    { date: '2026-04-23', txnId: 'TXN-9831', type: 'level_2', source: 'via Sara M.', productOrService: 'OBS Starter', basisUsd: 99, ratePct: 1.5, commissionUsd: 1.49, status: 'pending' as const },
    { date: '2026-04-24', txnId: 'TXN-9832', type: 'direct_sale', source: 'Nadia S.', productOrService: 'JPS Resume Builder', basisUsd: 49, ratePct: 6, commissionUsd: 2.94, status: 'pending' as const },
    { date: '2026-04-15', txnId: 'TXN-9810', type: 'reversal', source: 'Refund — Ahmed K.', productOrService: 'OBS refund window', basisUsd: 299, ratePct: 10, commissionUsd: -29.9, status: 'reversed' as const },
  ] as CommissionLine[],
};

export default function CommissionStatementPage() {
  const searchParams = useSearchParams();
  const data = DEMO_DATA;

  const [printMode, setPrintMode] = useState(false);
  useEffect(() => {
    setPrintMode(true);
  }, []);

  const totalGross = data.lines
    .filter((l) => l.status !== 'reversed')
    .reduce((s, l) => s + l.commissionUsd, 0);
  const totalReversed = Math.abs(
    data.lines.filter((l) => l.status === 'reversed').reduce((s, l) => s + l.commissionUsd, 0)
  );
  const totalNet = totalGross - totalReversed;
  const totalPending = data.lines
    .filter((l) => l.status === 'pending')
    .reduce((s, l) => s + l.commissionUsd, 0);
  const totalPaid = data.lines
    .filter((l) => l.status === 'paid')
    .reduce((s, l) => s + l.commissionUsd, 0);

  return (
    <>
      {/* Print-only style overrides */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: #04060e !important; font-family: Georgia, 'Times New Roman', serif !important; }
          .no-print { display: none !important; }
          .print-page { background: white !important; color: #04060e !important; }
          .print-card { background: white !important; border: 1px solid #ddd !important; box-shadow: none !important; }
          @page { size: A4; margin: 1.5cm; }
        }
        .print-page { background: white; color: #04060e; min-height: 100vh; font-family: Georgia, serif; }
        .print-card { background: white; border: 1px solid #ccc; }
      `}</style>

      <div className="print-page">
        {/* Top action bar — hidden on print */}
        <div className="no-print sticky top-0 z-50 border-b border-glass bg-card/90 px-6 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm">
              <span className="text-white/50">Commission Statement · </span>
              <span className="font-bold">
                {data.period} · {data.affiliateCode}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="rounded-card bg-purple-light px-4 py-2 text-xs font-semibold text-white hover:bg-purple-light/90"
              >
                🖨️ Print / Save as PDF
              </button>
              <button
                onClick={() => {
                  const csv = [
                    'Date,Transaction ID,Type,Source,Product/Service,Basis USD,Rate %,Commission USD,Status',
                    ...data.lines.map(
                      (l) =>
                        `${l.date},${l.txnId},${l.type},"${l.source}","${l.productOrService}",${l.basisUsd},${l.ratePct},${l.commissionUsd.toFixed(2)},${l.status}`
                    ),
                  ].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `commission-statement-${data.period}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="rounded-card border border-glass bg-card px-4 py-2 text-xs font-semibold hover:border-teal"
              >
                ⬇️ Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Document content */}
        <div className="mx-auto max-w-4xl px-8 py-12">
          {/* Letterhead */}
          <header className="border-b-2 border-gray-300 pb-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-block rounded bg-gradient-to-r from-purple-600 to-teal-500 px-3 py-1 text-sm font-bold text-white">
                  EHB
                </div>
                <h1 className="mt-3 text-2xl font-bold" style={{ color: '#04060e' }}>
                  Commission Statement
                </h1>
                <p className="mt-1 text-sm" style={{ color: '#666' }}>
                  EHB Technologies (Pvt.) Ltd. · Affiliate Program
                </p>
              </div>
              <div className="text-right text-xs" style={{ color: '#666' }}>
                <div>
                  Statement No: <strong style={{ color: '#04060e' }}>{data.statementNo}</strong>
                </div>
                <div className="mt-1">
                  Generated: <strong style={{ color: '#04060e' }}>{data.generatedAt}</strong>
                </div>
                <div className="mt-1">
                  Period: <strong style={{ color: '#04060e' }}>{data.periodStart} → {data.periodEnd}</strong>
                </div>
              </div>
            </div>
          </header>

          {/* Affiliate info */}
          <section className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#666' }}>
                Affiliate
              </h2>
              <div className="mt-2 text-sm" style={{ color: '#04060e' }}>
                <div className="text-base font-bold">{data.affiliateName}</div>
                <div className="mt-1">{data.email}</div>
                <div className="mt-0.5">{data.address}</div>
                <div className="mt-1 font-mono text-xs">
                  Code: {data.affiliateCode} · ID: {data.affiliateId}
                </div>
                <div className="mt-1 text-xs">
                  Rank: <strong>{data.rank}</strong>
                </div>
                <div className="mt-1 text-xs">
                  Tax ID: <span className="font-mono">{data.taxId}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#666' }}>
                Issued by
              </h2>
              <div className="mt-2 text-sm" style={{ color: '#04060e' }}>
                <div className="text-base font-bold">EHB Technologies (Pvt.) Ltd.</div>
                <div className="mt-1">Plot 24, Civic Center, F-7</div>
                <div className="mt-0.5">Islamabad 44000, Pakistan</div>
                <div className="mt-1 text-xs">SECP Reg. No: XXX-PK-2025</div>
                <div className="mt-1 text-xs">finance@ehb.com</div>
              </div>
            </div>
          </section>

          {/* Summary card */}
          <section className="mt-8 rounded-lg border border-gray-300 p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#666' }}>
              Period Summary
            </h2>
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div>
                <div className="text-xs" style={{ color: '#666' }}>
                  Gross Earnings
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums" style={{ color: '#04060e' }}>
                  ${totalGross.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: '#666' }}>
                  Reversals
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums" style={{ color: '#c00' }}>
                  −${totalReversed.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs" style={{ color: '#666' }}>
                  Pending
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums" style={{ color: '#c80' }}>
                  ${totalPending.toFixed(2)}
                </div>
              </div>
              <div className="rounded bg-purple-50 p-2">
                <div className="text-xs font-semibold" style={{ color: '#7B6EF6' }}>
                  Net Payable
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums" style={{ color: '#7B6EF6' }}>
                  ${totalNet.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="mt-4 rounded bg-gray-100 p-3 text-xs" style={{ color: '#444' }}>
              Already paid this period: <strong>${totalPaid.toFixed(2)}</strong> · Pending clearance:{' '}
              <strong>${totalPending.toFixed(2)}</strong> (14-day hold) · Reversals: $
              <strong>{totalReversed.toFixed(2)}</strong> (refund window).
            </div>
          </section>

          {/* Line items table */}
          <section className="mt-8">
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: '#666' }}>
              Detailed Transactions ({data.lines.length} lines)
            </h2>
            <table className="mt-3 w-full border-collapse text-xs">
              <thead>
                <tr style={{ background: '#f8f8f8' }}>
                  {[
                    'Date',
                    'Transaction ID',
                    'Type',
                    'Source',
                    'Product / Service',
                    'Basis',
                    'Rate',
                    'Commission',
                    'Status',
                  ].map((h) => (
                    <th
                      key={h}
                      className="border border-gray-300 p-2 text-left font-bold"
                      style={{ color: '#04060e' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.lines.map((l, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? 'white' : '#fafafa',
                      color: l.status === 'reversed' ? '#c00' : '#04060e',
                    }}
                  >
                    <td className="border border-gray-300 p-2">{l.date}</td>
                    <td className="border border-gray-300 p-2 font-mono">{l.txnId}</td>
                    <td className="border border-gray-300 p-2">{l.type.replace(/_/g, ' ')}</td>
                    <td className="border border-gray-300 p-2">{l.source}</td>
                    <td className="border border-gray-300 p-2">{l.productOrService}</td>
                    <td className="border border-gray-300 p-2 text-right tabular-nums">
                      {l.basisUsd > 0 ? `$${l.basisUsd.toFixed(2)}` : '—'}
                    </td>
                    <td className="border border-gray-300 p-2 text-right tabular-nums">
                      {l.ratePct > 0 ? `${l.ratePct}%` : '—'}
                    </td>
                    <td
                      className="border border-gray-300 p-2 text-right font-semibold tabular-nums"
                      style={{
                        color: l.status === 'reversed' ? '#c00' : l.commissionUsd > 0 ? '#0a7' : '#04060e',
                      }}
                    >
                      {l.commissionUsd >= 0 ? '+' : ''}${l.commissionUsd.toFixed(2)}
                    </td>
                    <td
                      className="border border-gray-300 p-2 text-center text-[10px] font-semibold uppercase"
                      style={{
                        color:
                          l.status === 'paid'
                            ? '#0a7'
                            : l.status === 'pending'
                            ? '#c80'
                            : '#c00',
                      }}
                    >
                      {l.status}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: '#f0f0f0' }}>
                  <td colSpan={7} className="border border-gray-300 p-2 text-right font-bold">
                    Total Net Payable
                  </td>
                  <td
                    className="border border-gray-300 p-2 text-right font-bold tabular-nums"
                    style={{ color: '#7B6EF6' }}
                  >
                    ${totalNet.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              </tfoot>
            </table>
          </section>

          {/* Legal footer */}
          <footer className="mt-12 border-t border-gray-300 pt-6 text-xs" style={{ color: '#666' }}>
            <p className="leading-relaxed">
              <strong style={{ color: '#04060e' }}>Disclaimer:</strong> EHB is NOT MLM. Income comes only from real product/service sales — never joining fees or pure recruitment. All commissions are subject to the 80/20 income rule (R3+ must earn ≥80% from external sales) and 30-day cooling-off refund window. This statement is provided for informational and tax purposes. Review for accuracy and report discrepancies within 30 days.
            </p>
            <p className="mt-3 leading-relaxed">
              <strong style={{ color: '#04060e' }}>Tax Notice:</strong> This statement does not constitute tax advice. Affiliates are responsible for reporting income per applicable tax jurisdictions (Pakistan FBR, UAE FTA, India IT Dept, USA IRS, UK HMRC). Consult a licensed tax advisor.
            </p>
            <p className="mt-3 text-center" style={{ color: '#999' }}>
              EHB Technologies (Pvt.) Ltd. · Pakistan SECP-aligned · Generated by EHB Affiliate System v3.10 · {data.generatedAt}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
