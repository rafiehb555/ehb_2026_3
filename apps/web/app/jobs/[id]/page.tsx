'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const [job, setJob] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applied, setApplied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/api/jobs/${params?.id}`).then(setJob).catch(() => {
      setJob({
        _id: params?.id,
        title: 'Senior Full-Stack Developer',
        description: 'Full-stack role — React + Node + Mongo. Build + scale. Remote OK with 4-hour PKT overlap.',
        category: 'Tech',
        employmentType: 'full_time',
        designation: 'senior',
        location: 'Islamabad / Remote',
        remoteOk: true,
        salaryMin: 2500,
        salaryMax: 4500,
        requiredStl: 7,
        requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        stats: { views: 142, applications: 18 },
      });
    });
  }, [params?.id]);

  async function apply() {
    setBusy(true);
    setErr(null);
    try {
      await api.post(`/api/jobs/${params?.id}/apply`, { coverLetter });
      setApplied(true);
    } catch (e: any) {
      setErr(e?.message || 'Apply failed');
    } finally {
      setBusy(false);
    }
  }

  if (!job) return <div className="p-10 text-white/50">Loading…</div>;

  const userStl = user?.stl?.level || 0;
  const meetsStl = userStl >= job.requiredStl;

  return (
    <>
      <PublicNav />
      <main className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link href="/jobs" className="text-xs text-white/50 hover:text-white">← All jobs</Link>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_340px]">
            <PlasticCard className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Chip tone="purple">{job.category}</Chip>
                  <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{job.title}</h1>
                  <div className="mt-2 text-sm text-white/60">
                    📍 {job.location} {job.remoteOk ? '· Remote OK' : ''}
                  </div>
                </div>
                <StlBadge level={job.requiredStl} />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <Chip>{job.employmentType?.replace('_', ' ')}</Chip>
                <Chip>{job.designation}</Chip>
                <Chip tone="ok">
                  ${job.salaryMin?.toLocaleString()}–${job.salaryMax?.toLocaleString()} / mo
                </Chip>
              </div>

              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Description</div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-white/80">{job.description}</p>
              </div>

              {job.requiredSkills?.length > 0 ? (
                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Required skills</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((s: string) => (
                      <Chip key={s} tone="teal">{s}</Chip>
                    ))}
                  </div>
                </div>
              ) : null}

              {job.requiredCrbExams?.length > 0 ? (
                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Required CRB certifications</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.requiredCrbExams.map((c: string) => (
                      <Chip key={c} tone="amber">📜 {c}</Chip>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 border-t border-glass pt-4 text-xs text-white/50">
                👁️ {job.stats?.views || 0} views · 📝 {job.stats?.applications || 0} applied
              </div>
            </PlasticCard>

            <PlasticCard className="p-5 h-fit">
              <div className="text-[10px] uppercase tracking-widest text-white/40">Apply</div>
              <h3 className="mt-1 text-lg font-semibold">Your match</h3>

              {user ? (
                <>
                  <div className="mt-3 rounded-card border border-glass bg-nested/60 p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Your STL</span>
                      <StlBadge level={userStl} size="xs" showName={false} />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-white/60">Required</span>
                      <StlBadge level={job.requiredStl} size="xs" showName={false} />
                    </div>
                    <div className="mt-3 rounded-chip border p-2 text-center text-[11px]"
                      style={{
                        borderColor: meetsStl ? '#38C878' : '#F0A030',
                        background: meetsStl ? 'rgba(56,200,120,0.1)' : 'rgba(240,160,48,0.1)',
                        color: meetsStl ? '#38C878' : '#F0A030',
                      }}
                    >
                      {meetsStl ? '✓ You meet the STL requirement' : 'Your STL is too low — take a CRB exam to qualify'}
                    </div>
                  </div>

                  {applied ? (
                    <div className="mt-4 rounded-card border border-[#38C878]/30 bg-[#38C878]/10 p-4 text-center text-sm">
                      <div className="text-2xl">✅</div>
                      <div className="mt-1 font-semibold">Applied!</div>
                      <div className="mt-1 text-xs text-white/60">The employer will contact you.</div>
                      <Link href="/profile/jps" className="mt-3 inline-block text-xs text-purple-light hover:underline">
                        View my applications →
                      </Link>
                    </div>
                  ) : (
                    <>
                      <textarea
                        rows={3}
                        placeholder="Brief cover note (optional)"
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="mt-4 w-full resize-none rounded-input border border-glass bg-nested px-3 py-2 text-xs"
                      />
                      {err ? <div className="mt-2 text-xs text-[#F05858]">{err}</div> : null}
                      <Button3D variant="purple" size="lg" className="mt-3 w-full" onClick={apply} disabled={busy || !meetsStl}>
                        {busy ? 'Applying…' : meetsStl ? 'Apply now' : 'STL too low'}
                      </Button3D>
                      <Link href="/ai-marketplace/resume" className="mt-2 block text-center text-[11px] text-purple-light hover:underline">
                        💡 Generate AI-tailored resume →
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <div className="mt-3 rounded-card border border-glass bg-nested/60 p-4 text-sm">
                  <div className="text-center">Sign in to apply</div>
                  <div className="mt-3 flex justify-center gap-2">
                    <Link href="/login" className="rounded-chip border border-glass bg-card/60 px-3 py-1.5 text-xs">Login</Link>
                    <Link href="/register" className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-3 py-1.5 text-xs font-semibold">Register</Link>
                  </div>
                </div>
              )}
            </PlasticCard>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
