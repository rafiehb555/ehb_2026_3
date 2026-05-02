'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';

const DEMO_JOBS = [
  { _id: 'dj1', title: 'Senior Full-Stack Developer', category: 'Tech', employmentType: 'full_time', designation: 'senior', location: 'Islamabad / Remote', remoteOk: true, salaryMin: 2500, salaryMax: 4500, currency: 'USD', requiredStl: 7, requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript'], stats: { views: 142, applications: 18 } },
  { _id: 'dj2', title: 'Medical Officer (WMS)', category: 'Healthcare', employmentType: 'full_time', designation: 'senior', location: 'Karachi', remoteOk: false, salaryMin: 1800, salaryMax: 3200, currency: 'USD', requiredStl: 7, requiredSkills: ['MBBS', 'FCPS'], requiredCrbExams: ['Medical license MCQ', 'Clinical video demo'], stats: { views: 86, applications: 12 } },
  { _id: 'dj3', title: 'Content Writer', category: 'Marketing', employmentType: 'freelance', designation: 'intermediate', location: 'Remote', remoteOk: true, salaryMin: 500, salaryMax: 1200, currency: 'USD', requiredStl: 4, requiredSkills: ['SEO', 'English'], stats: { views: 240, applications: 34 } },
  { _id: 'dj4', title: 'Customer Success Manager', category: 'Business', employmentType: 'full_time', designation: 'intermediate', location: 'Lahore', remoteOk: true, salaryMin: 1000, salaryMax: 1800, currency: 'USD', requiredStl: 5, requiredSkills: ['Communication', 'CRM'], stats: { views: 96, applications: 22 } },
  { _id: 'dj5', title: 'Legal Consultant', category: 'Legal', employmentType: 'contract', designation: 'expert', location: 'Islamabad', remoteOk: false, salaryMin: 3000, salaryMax: 6000, currency: 'USD', requiredStl: 8, requiredSkills: ['Bar member', 'Contract drafting'], requiredCrbExams: ['Bar association MCQ'], stats: { views: 42, applications: 6 } },
  { _id: 'dj6', title: 'Math Tutor (Grade 9-12)', category: 'Education', employmentType: 'part_time', designation: 'intermediate', location: 'Remote', remoteOk: true, salaryMin: 300, salaryMax: 800, currency: 'USD', requiredStl: 5, requiredSkills: ['Mathematics', 'Teaching'], stats: { views: 184, applications: 28 } },
];

const CATEGORIES = ['All', 'Tech', 'Healthcare', 'Business', 'Marketing', 'Legal', 'Education'];
const EMPLOYMENT = ['All', 'full_time', 'part_time', 'contract', 'freelance', 'internship'];

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [emp, setEmp] = useState('All');
  const [q, setQ] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<{ jobs: any[] }>('/api/jobs');
        setJobs(res.jobs?.length ? res.jobs : DEMO_JOBS);
      } catch {
        setJobs(DEMO_JOBS);
      }
    })();
  }, []);

  const filtered = jobs.filter(
    (j) =>
      (category === 'All' || j.category === category) &&
      (emp === 'All' || j.employmentType === emp) &&
      (q === '' || j.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        <section className="border-b border-glass bg-gradient-to-br from-[#13162A] via-[#0C0E1A] to-[#1A1D33]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
            <Chip tone="purple">JPS · Job Profile & Skill System</Chip>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
              Verified jobs.{' '}
              <span className="bg-gradient-to-r from-[#ec4899] to-[#7B6EF6] bg-clip-text text-transparent">
                STL-gated hiring.
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/60 sm:text-base">
              Every employer verified via PSS. Every job tagged with min STL + required CRB certs.
              AI Resume Builder helps candidates — AI matching ranks for employers.
            </p>
          </div>
        </section>

        {/* How JPS works */}
        <section className="border-b border-glass bg-nested/20">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <div className="grid gap-3 sm:grid-cols-4">
              <QuickStep n={1} t="Build profile" d="PSS + CRB exams raise your STL — unlocks higher-paying jobs" />
              <QuickStep n={2} t="AI Resume" d="Generate + tailor CV per job posting" />
              <QuickStep n={3} t="Apply" d="One-click apply — employer sees your STL + CRB certs" />
              <QuickStep n={4} t="Contract + pay" d="Wallet-first salary, on-time delivery tracked for your STL" />
            </div>
            <div className="mt-4 flex flex-wrap justify-between gap-2">
              <Link href="/jobs/post" className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-xs font-semibold">
                Post a job →
              </Link>
              <Link href="/profile/jps" className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-xs hover:border-purple-light">
                My JPS profile →
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <PlasticCard className="p-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search jobs…"
                className="w-full rounded-input border border-glass bg-nested px-3 py-2 text-sm sm:w-64"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-input border border-glass bg-nested px-3 py-2 text-xs"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={emp}
                onChange={(e) => setEmp(e.target.value)}
                className="rounded-input border border-glass bg-nested px-3 py-2 text-xs"
              >
                {EMPLOYMENT.map((e) => (
                  <option key={e} value={e}>{e === 'All' ? 'All types' : e.replace('_', ' ')}</option>
                ))}
              </select>
              <div className="ml-auto text-xs text-white/40">
                {filtered.length} jobs
              </div>
            </div>
          </PlasticCard>
        </section>

        {/* Job cards */}
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((j) => (
              <Link key={j._id} href={`/jobs/${j._id}`} className="group">
                <PlasticCard className="flex h-full flex-col p-5 transition group-hover:border-purple-light">
                  <div className="flex items-start justify-between gap-2">
                    <Chip tone="purple">{j.category}</Chip>
                    <StlBadge level={j.requiredStl} size="xs" showName={false} />
                  </div>
                  <h3 className="mt-3 text-base font-bold">{j.title}</h3>
                  <div className="mt-2 text-xs text-white/60">
                    📍 {j.location} {j.remoteOk ? '· Remote ok' : ''}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Chip>{j.employmentType.replace('_', ' ')}</Chip>
                    <Chip>{j.designation}</Chip>
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="text-xs text-white/40">Salary range</div>
                    <div className="text-lg font-bold tabular-nums text-teal">
                      ${j.salaryMin?.toLocaleString()} – ${j.salaryMax?.toLocaleString()}
                      <span className="text-xs text-white/40"> / {j.employmentType === 'full_time' ? 'month' : 'project'}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-white/50">
                      <span>👁️ {j.stats?.views || 0}</span>
                      <span>📝 {j.stats?.applications || 0} applied</span>
                    </div>
                  </div>
                </PlasticCard>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function QuickStep({ n, t, d }: { n: number; t: string; d: string }) {
  return (
    <div className="rounded-card border border-glass bg-card/60 p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#ec4899] to-[#7B6EF6] text-xs font-bold text-white">
          {n}
        </div>
        <div className="text-sm font-semibold">{t}</div>
      </div>
      <div className="mt-2 text-[11px] text-white/60">{d}</div>
    </div>
  );
}
