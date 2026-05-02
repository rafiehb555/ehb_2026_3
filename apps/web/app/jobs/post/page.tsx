'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { FieldWithHint } from '@/components/ui/field-with-hint';
import { Chip } from '@/components/ui/chip';

export default function PostJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [employmentType, setEmploymentType] = useState('full_time');
  const [designation, setDesignation] = useState('intermediate');
  const [location, setLocation] = useState('');
  const [remoteOk, setRemoteOk] = useState(false);
  const [salaryMin, setSalaryMin] = useState(1000);
  const [salaryMax, setSalaryMax] = useState(2500);
  const [requiredStl, setRequiredStl] = useState(3);
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setErr(null);
    try {
      await api.post('/api/jobs', {
        title,
        category,
        employmentType,
        designation,
        location,
        remoteOk,
        salaryMin,
        salaryMax,
        requiredStl,
        description,
        requiredSkills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      });
      router.push('/jobs');
    } catch (e: any) {
      setErr(e?.message || 'Post failed');
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return (
      <>
        <PublicNav />
        <main className="flex min-h-screen items-center justify-center p-6">
          <PlasticCard className="max-w-md p-8 text-center">
            <div className="text-5xl">🧑‍💼</div>
            <h2 className="mt-4 text-xl font-semibold">Sign in to post jobs</h2>
            <div className="mt-4 flex justify-center gap-2">
              <Link href="/login" className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm">Login</Link>
              <Link href="/register" className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-sm font-semibold">Register</Link>
            </div>
          </PlasticCard>
        </main>
        <PublicFooter />
      </>
    );
  }

  return (
    <>
      <PublicNav />
      <main className="min-h-screen py-6 sm:py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Link href="/jobs" className="text-xs text-white/50 hover:text-white">← Jobs board</Link>
          <PlasticCard className="mt-4 p-6 sm:p-8">
            <Chip tone="purple">Employer · Post a job</Chip>
            <h1 className="mt-3 text-2xl font-bold">Hire through JPS</h1>
            <p className="mt-1 text-sm text-white/60">
              Your job posting carries your employer STL. Higher STL = more applicants, better candidates.
            </p>

            <div className="mt-5 space-y-4">
              <FieldWithHint label="Job title" required hint="Clear, searchable — first thing candidates see.">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-base sm:text-sm" />
              </FieldWithHint>

              <div className="grid gap-3 sm:grid-cols-2">
                <FieldWithHint label="Category" hint="Industry category — affects which candidates see your job.">
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-sm">
                    {['Tech', 'Healthcare', 'Business', 'Marketing', 'Legal', 'Education', 'Other'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </FieldWithHint>
                <FieldWithHint label="Employment type" hint="Full-time = monthly salary, Freelance = per-task.">
                  <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-sm">
                    <option value="full_time">Full-time</option>
                    <option value="part_time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                </FieldWithHint>
              </div>

              <FieldWithHint label="Designation level" hint="Junior = entry. Expert = CRB certified + PSS L7+.">
                <div className="flex flex-wrap gap-2">
                  {['junior', 'intermediate', 'senior', 'expert'].map((d) => (
                    <button key={d} onClick={() => setDesignation(d)} className={`rounded-chip border px-3 py-1.5 text-xs capitalize ${
                      designation === d ? 'border-purple-light bg-purple/20 text-white' : 'border-glass text-white/60'
                    }`}>{d}</button>
                  ))}
                </div>
              </FieldWithHint>

              <div className="grid gap-3 sm:grid-cols-2">
                <FieldWithHint label="Location" hint="City or 'Remote'">
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Islamabad" className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-sm" />
                </FieldWithHint>
                <div className="flex items-center gap-2 pt-6">
                  <input type="checkbox" checked={remoteOk} onChange={(e) => setRemoteOk(e.target.checked)} />
                  <label className="text-sm text-white/70">Remote OK</label>
                </div>
              </div>

              <FieldWithHint label="Salary range (USD/mo)" hint="Range gives candidates clarity, improves fit.">
                <div className="flex items-center gap-2">
                  <input type="number" value={salaryMin} onChange={(e) => setSalaryMin(Number(e.target.value))} className="flex-1 rounded-input border border-glass bg-nested px-3 py-2.5 text-sm" />
                  <span className="text-white/40">—</span>
                  <input type="number" value={salaryMax} onChange={(e) => setSalaryMax(Number(e.target.value))} className="flex-1 rounded-input border border-glass bg-nested px-3 py-2.5 text-sm" />
                </div>
              </FieldWithHint>

              <FieldWithHint label="Required STL" hint="Minimum candidate trust level. L5 = verified professional, L7 = premium tier.">
                <div className="flex items-center gap-3">
                  <input type="range" min={1} max={10} value={requiredStl} onChange={(e) => setRequiredStl(Number(e.target.value))} className="flex-1" />
                  <div className="w-12 text-center text-sm font-bold">L{requiredStl}</div>
                </div>
              </FieldWithHint>

              <FieldWithHint label="Required skills (comma-separated)" hint="Candidates who have CRB certs matching these show first.">
                <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node.js, TypeScript" className="w-full rounded-input border border-glass bg-nested px-3 py-2.5 text-sm" />
              </FieldWithHint>

              <FieldWithHint label="Description" hint="Role description, responsibilities, culture.">
                <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full resize-none rounded-input border border-glass bg-nested px-3 py-2.5 text-sm" />
              </FieldWithHint>

              {err ? <div className="rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-2 text-xs text-[#F05858]">{err}</div> : null}

              <Button3D variant="purple" size="lg" className="w-full" onClick={submit} disabled={busy || !title}>
                {busy ? 'Publishing…' : 'Publish job posting'}
              </Button3D>
            </div>
          </PlasticCard>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
