'use client';

import Link from 'next/link';
import { CompliancePortalLayout } from '@/components/portal/layout';
import { PlasticCard } from '@/components/ui/plastic-card';
import { Button3D } from '@/components/ui/button-3d';

export default function PortalTestCheckoutPage() {
  return (
    <CompliancePortalLayout title="Test Checkout" breadcrumb={['System', 'Test Checkout']}>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold sm:text-3xl">Test Checkout</h1>
        <PlasticCard className="p-8 text-center">
          <div className="text-5xl">🧪</div>
          <h3 className="mt-3 text-lg font-semibold">Sandbox checkout flow</h3>
          <p className="mt-2 text-sm text-white/60">
            End-to-end checkout test with affiliate attribution · validates JazzCash/HBL/USDT rails without charging real money.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/checkout?test=1"><Button3D variant="purple" size="md">Start Test Checkout</Button3D></Link>
            <Link href="/affiliate/marketplace"><Button3D variant="green" size="md">Browse DAM Products</Button3D></Link>
          </div>
        </PlasticCard>
      </div>
    </CompliancePortalLayout>
  );
}
