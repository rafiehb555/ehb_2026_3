// Commission Service — 40/25/20/15 split + seller/rider/EHB cuts.
// Called by orderService.confirmDelivery when an order is finalized.

import Transaction from '../models/Transaction.js';
import Franchise from '../models/Franchise.js';
import { isConnected } from '../config/db.js';

/**
 * EHB commission contract (from Franchise.md §9.1 + §9.2):
 *   Total order = 100%
 *   Seller:       70%
 *   Rider:        10%
 *   Franchise:    10% (split 40/25/20/15 across Company/Sub/Master/Corporate)
 *   EHB platform: 10%
 *
 * The franchise 10% becomes: 4% company, 2.5% sub, 2% master, 1.5% corporate.
 */
export async function settleCommission(order) {
  const total = order.totals?.totalUsd || 0;
  const breakdown = {
    total,
    seller: total * 0.7,
    rider: total * 0.1,
    franchiseNetwork: total * 0.1,
    ehb: total * 0.1,
    subSplit: {
      company: total * 0.1 * 0.4,
      sub: total * 0.1 * 0.25,
      master: total * 0.1 * 0.2,
      corporate: total * 0.1 * 0.15,
    },
  };

  if (!isConnected()) return breakdown;

  const tx = [];
  // Seller payout per item (proportional)
  for (const it of order.items || []) {
    tx.push({
      toUserId: it.sellerId,
      type: 'commission_credit',
      currency: 'USD',
      amount: it.subtotalUsd * 0.7,
      status: 'completed',
      referenceId: order.orderNumber,
      referenceType: 'order_seller',
    });
  }

  // Rider payout (if riderId assigned)
  if (order.delivery?.riderId) {
    tx.push({
      toUserId: order.delivery.riderId,
      type: 'commission_credit',
      currency: 'USD',
      amount: breakdown.rider,
      status: 'completed',
      referenceId: order.orderNumber,
      referenceType: 'order_rider',
    });
  }

  // Franchise payouts (if franchise ids set)
  const fr = order.franchise || {};
  async function payFranchise(franchiseId, amount, tier) {
    if (!franchiseId || amount <= 0) return;
    const f = await Franchise.findById(franchiseId).select('ownerUserId');
    if (!f) return;
    tx.push({
      toUserId: f.ownerUserId,
      type: 'commission_credit',
      currency: 'USD',
      amount,
      status: 'completed',
      referenceId: order.orderNumber,
      referenceType: `franchise_${tier}`,
    });
  }
  await payFranchise(fr.subId, breakdown.subSplit.sub, 'sub');
  await payFranchise(fr.masterId, breakdown.subSplit.master, 'master');
  await payFranchise(fr.corporateId, breakdown.subSplit.corporate, 'corporate');

  // EHB platform + Company cut recorded as platform earning
  tx.push({
    type: 'commission_credit',
    currency: 'USD',
    amount: breakdown.ehb + breakdown.subSplit.company,
    status: 'completed',
    referenceId: order.orderNumber,
    referenceType: 'platform_ehb',
    notes: 'EHB platform + company cut',
  });

  await Transaction.insertMany(tx);
  return breakdown;
}
