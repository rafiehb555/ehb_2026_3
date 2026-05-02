'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';

export default function CrbExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ exams: any[] }>('/api/crb/exams')
      .then((r) => setExams(r.exams))
      .catch((e) => setErr(e?.message || 'Failed to load exams'));
  }, []);

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/" className="text-xs text-white/50 hover:text-white">← Home</Link>
        <h1 className="mt-4 text-3xl font-bold">CRB Exams & Certifications</h1>
        <p className="mt-2 text-sm text-white/60">
          Pass exams to raise your CRB level. CRB + PSS + DMO combine to compute final STL.
          Certificates are hashed on-chain for immutable proof.
        </p>

        {err ? (
          <PlasticCard className="mt-6 p-6 text-amber">{err}</PlasticCard>
        ) : exams.length === 0 ? (
          <PlasticCard className="mt-6 p-8 text-center text-white/60">
            No exams available yet. Check back soon or seed the database.
          </PlasticCard>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {exams.map((e) => (
              <PlasticCard key={e._id} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <Chip tone="teal">{e.industry}</Chip>
                    <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
                    <div className="mt-1 text-xs font-mono text-white/40">{e.code}</div>
                  </div>
                  <Chip tone="purple">Target L{e.levelTarget}</Chip>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <Chip>{e.type.toUpperCase()}</Chip>
                  <Chip>{e.durationMin} min</Chip>
                  <Chip tone="amber">Pass ≥ {e.passPct}%</Chip>
                  <Chip>{e.questions?.length || 0} questions</Chip>
                </div>

                <Link
                  href={`/crb/exams/${e._id}`}
                  className="mt-4 inline-block rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-xs font-semibold"
                >
                  Start exam →
                </Link>
              </PlasticCard>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
