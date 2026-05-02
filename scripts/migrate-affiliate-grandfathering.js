#!/usr/bin/env node
/**
 * Affiliate Grandfathering Migration Script — Phase 8 Epic G.1
 *
 * Annotates legacy v1.0 affiliate records with v3.3 fields without
 * destructive overwrite. Provides dry-run mode + migration report.
 *
 * Usage:
 *   node scripts/migrate-affiliate-grandfathering.js [--dry-run] [--apply]
 *
 * Behavior:
 *   --dry-run (default): scans all affiliate records, reports what would change
 *   --apply             : actually writes the changes
 *
 * Safe to run multiple times — idempotent.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../services/api/src/config/db.js';
import Affiliate from '../services/api/src/models/Affiliate.js';
import AffiliateWallet from '../services/api/src/models/AffiliateWallet.js';

const DRY_RUN = !process.argv.includes('--apply');

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  EHB Affiliate Grandfathering Migration');
  console.log('  Mode:', DRY_RUN ? '🔍 DRY RUN (no writes)' : '⚠️  APPLY (writes enabled)');
  console.log('═══════════════════════════════════════════════════\n');

  await connectDB();

  let scanned = 0;
  let needRankBackfill = 0;
  let needWalletCreate = 0;
  let needV32StatsBackfill = 0;
  let errors = 0;

  const allAffiliates = await Affiliate.find({}).lean();
  console.log(`📊 Scanning ${allAffiliates.length} affiliate records...\n`);

  for (const aff of allAffiliates) {
    scanned++;
    let changes = [];

    // 1. Backfill rank if missing or invalid
    if (!aff.rank || !['R1','R2','R3','R4','R5','R6','R7','R8','R9','R10'].includes(aff.rank)) {
      changes.push(`rank: '${aff.rank || 'missing'}' → 'R1'`);
      needRankBackfill++;
      if (!DRY_RUN) {
        await Affiliate.updateOne({ _id: aff._id }, { $set: { rank: 'R1' } });
      }
    }

    // 2. Backfill v3.2 per-bonus stat fields if missing
    const hasV32Stats = aff.stats && typeof aff.stats.directEarnedUsd === 'number';
    if (!hasV32Stats) {
      changes.push('stats.directEarnedUsd / level2EarnedUsd / firstSaleBonusEarnedUsd / etc. → 0');
      needV32StatsBackfill++;
      if (!DRY_RUN) {
        await Affiliate.updateOne(
          { _id: aff._id },
          {
            $set: {
              'stats.directEarnedUsd': aff.stats?.directEarnedUsd || 0,
              'stats.level2EarnedUsd': aff.stats?.level2EarnedUsd || 0,
              'stats.firstSaleBonusEarnedUsd': aff.stats?.firstSaleBonusEarnedUsd || 0,
              'stats.stlBonusEarnedUsd': aff.stats?.stlBonusEarnedUsd || 0,
              'stats.fastSaleBonusFreePackages': aff.stats?.fastSaleBonusFreePackages || 0,
              'stats.activeLegsCount': aff.stats?.activeLegsCount || 0,
              'stats.industriesActiveCount': aff.stats?.industriesActiveCount || 0,
              'stats.saleVolumeUsd': aff.stats?.saleVolumeUsd || 0,
              productAffiliateEnabled: aff.productAffiliateEnabled !== false,
            },
          }
        );
      }
    }

    // 3. Create AffiliateWallet if missing
    const walletExists = await AffiliateWallet.findOne({ userId: aff.userId });
    if (!walletExists) {
      const lifetime = aff.stats?.lifetimeEarningsUsd || 0;
      changes.push(`AffiliateWallet missing → create with $${lifetime.toFixed(2)} (80/20 USDT/EHBGC)`);
      needWalletCreate++;
      if (!DRY_RUN) {
        await AffiliateWallet.create({
          userId: aff.userId,
          balances: {
            usdt: +(lifetime * 0.8).toFixed(2),
            ehbgc: +(lifetime * 0.2).toFixed(2),
          },
          availableUsd: lifetime,
          stats: {
            lifetimeCreditedUsd: lifetime,
            thisMonthCreditedUsd: aff.stats?.thisMonthEarningsUsd || 0,
            monthAnchor: `${new Date().getUTCFullYear()}-${String(new Date().getUTCMonth() + 1).padStart(2, '0')}`,
          },
          settings: { payoutMix: { usdtPercent: 80, ehbgcPercent: 20 } },
          status: 'active',
        });
      }
    }

    if (changes.length > 0) {
      console.log(`👤 ${aff.userId} (${aff.referralCode || 'no-code'}):`);
      changes.forEach((c) => console.log(`   ${DRY_RUN ? '[would]' : '[did]'} ${c}`));
      console.log();
    }
  }

  console.log('═══════════════════════════════════════════════════');
  console.log('  Migration Report');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Total scanned          : ${scanned}`);
  console.log(`  Rank backfills         : ${needRankBackfill}`);
  console.log(`  v3.2 stats backfills   : ${needV32StatsBackfill}`);
  console.log(`  Wallets created        : ${needWalletCreate}`);
  console.log(`  Errors                 : ${errors}`);
  console.log('═══════════════════════════════════════════════════');

  if (DRY_RUN) {
    console.log('\n💡 This was a DRY RUN. To apply changes:');
    console.log('   node scripts/migrate-affiliate-grandfathering.js --apply\n');
  } else {
    console.log('\n✅ Migration applied.\n');
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((e) => {
  console.error('💥 Migration crashed:', e);
  process.exit(1);
});
