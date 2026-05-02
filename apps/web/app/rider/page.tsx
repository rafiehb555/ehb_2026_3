'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';
import { Chip } from '@/components/ui/chip';
import { StlBadge } from '@/components/ui/stl-badge';
import { PublicNav } from '@/components/ui/public-nav';
import { PublicFooter } from '@/components/ui/public-footer';

export default function RiderPage() {
  const { user } = useAuth();
  const [rider, setRider] = useState<any>(null);
  const [zone, setZone] = useState('Islamabad');
  const [vehicle, setVehicle] = useState('bike');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    api
      .get('/api/riders/me')
      .then((r: any) => (r && r._id ? setRider(r) : setRider(null)))
      .catch(() => setRider(null));
  }, [user]);

  async function apply() {
    setBusy(true);
    setErr(null);
    try {
      const r = await api.post('/api/riders/apply', { zone, vehicleType: vehicle });
      setRider(r);
    } catch (e: any) {
      setErr(e?.message || 'Apply failed');
    } finally {
      setBusy(false);
    }
  }

  async function toggleOnline() {
    setBusy(true);
    try {
      const r = await api.post('/api/riders/availability', { online: !rider?.online });
      setRider(r);
    } catch (e: any) {
      setErr(e?.message || 'Toggle failed');
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
            <div className="text-5xl">🛵</div>
            <h2 className="mt-3 text-xl font-semibold">Sign in to become a rider</h2>
            <div className="mt-5 flex justify-center gap-3">
              <Link href="/login" className="rounded-chip border border-glass bg-card/60 px-4 py-2 text-sm">
                Login
              </Link>
              <Link href="/register" className="rounded-chip bg-gradient-to-r from-[#7B6EF6] to-[#A098F8] px-4 py-2 text-sm font-semibold">
                Register
              </Link>
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
      <main className="min-h-screen py-8">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-bold">Rider Program</h1>
        <p className="mt-2 text-sm text-white/60">
          PSS L3+ and STL L3+ required. Assignment algorithm scores by rating × STL × zone match.
        </p>

        {/* How rider works intro */}
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <div className="rounded-card border border-glass bg-card/60 p-3">
            <div className="text-xl">1️⃣</div>
            <div className="mt-1 text-xs font-semibold">Apply</div>
            <div className="mt-1 text-[10px] text-white/60">Zone + vehicle</div>
          </div>
          <div className="rounded-card border border-glass bg-card/60 p-3">
            <div className="text-xl">2️⃣</div>
            <div className="mt-1 text-xs font-semibold">Go online</div>
            <div className="mt-1 text-[10px] text-white/60">Toggle availability</div>
          </div>
          <div className="rounded-card border border-glass bg-card/60 p-3">
            <div className="text-xl">3️⃣</div>
            <div className="mt-1 text-xs font-semibold">Auto-assigned</div>
            <div className="mt-1 text-[10px] text-white/60">STL × rating × zone</div>
          </div>
          <div className="rounded-card border border-glass bg-card/60 p-3">
            <div className="text-xl">4️⃣</div>
            <div className="mt-1 text-xs font-semibold">Earn 10%</div>
            <div className="mt-1 text-[10px] text-white/60">Per confirmed delivery</div>
          </div>
        </div>

        {rider && rider._id ? (
          <PlasticCard className="mt-6 p-6">
            <div className="flex items-start justify-between">
              <div>
                <Chip tone={rider.status === 'active' ? 'ok' : 'warn'}>{rider.status}</Chip>
                <h2 className="mt-2 text-xl font-bold">Your Rider Dashboard</h2>
                <div className="mt-1 text-xs text-white/50">
                  {rider.zone} · {rider.vehicleType}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase text-white/40">Rating</div>
                <div className="text-2xl font-bold">⭐ {rider.rating?.toFixed(1) || '5.0'}</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <Stat label="Deliveries" value={rider.stats?.totalDeliveries || 0} />
              <Stat label="On time" value={rider.stats?.onTimeDeliveries || 0} />
              <Stat label="Active now" value={rider.stats?.activeOrders || 0} />
              <Stat label="Earnings" value={`$${(rider.stats?.earningsTotalUsd || 0).toFixed(2)}`} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button3D
                variant={rider.online ? 'red' : 'green'}
                onClick={toggleOnline}
                disabled={busy}
              >
                {rider.online ? '● Go Offline' : '● Go Online'}
              </Button3D>
              <span className="text-xs text-white/50">
                {rider.online
                  ? 'You are available for new deliveries'
                  : 'You will not receive new assignments'}
              </span>
            </div>
          </PlasticCard>
        ) : (
          <PlasticCard className="mt-6 p-6">
            <h2 className="text-lg font-semibold">Apply to ride</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs text-white/70">Zone / City</label>
                <input
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full rounded-input border border-glass bg-nested px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Vehicle</label>
                <div className="flex gap-2">
                  {['bike', 'car', 'van'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVehicle(v)}
                      className={`rounded-chip border px-3 py-1.5 text-xs ${
                        vehicle === v
                          ? 'border-purple-light bg-purple/20 text-white'
                          : 'border-glass text-white/60'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              {err ? (
                <div className="rounded-input border border-[#F05858]/40 bg-[#F05858]/10 p-2 text-xs text-[#F05858]">
                  {err}
                </div>
              ) : null}
              <Button3D variant="green" onClick={apply} disabled={busy}>
                {busy ? 'Applying…' : 'Submit rider application'}
              </Button3D>
            </div>

            <div className="mt-6 rounded-card border border-glass bg-nested/60 p-3 text-xs text-white/60">
              <div className="text-xs font-semibold text-white">Activation gates</div>
              <ul className="mt-2 space-y-1">
                <li>• PSS ≥ L3 (identity verified)</li>
                <li>• STL ≥ L3 (NORMAL)</li>
                <li>• Current status: PSS L{user.stl ? 3 : 0} · STL L{user.stl?.level || 1}</li>
              </ul>
            </div>
          </PlasticCard>
        )}
      </div>
      </main>
      <PublicFooter />
    </>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-card border border-glass bg-nested p-3">
      <div className="text-xs uppercase text-white/40">{label}</div>
      <div className="mt-1 text-xl font-bold tabular-nums">{value}</div>
    </div>
  );
}
