// EHB Seed Script — Phase 1 + Phase 2 demo data
// Run: pnpm --filter @ehb/api run seed

import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import Franchise from '../models/Franchise.js';
import FranchiseApplication from '../models/FranchiseApplication.js';
import SerialCounter from '../models/SerialCounter.js';
import ActivityLog from '../models/ActivityLog.js';
import AiInvocation from '../models/AiInvocation.js';
import BlockchainProof from '../models/BlockchainProof.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Rider from '../models/Rider.js';
import Delivery from '../models/Delivery.js';
import Complaint from '../models/Complaint.js';
import Penalty from '../models/Penalty.js';
import Notification from '../models/Notification.js';
import CrbExam from '../models/CrbExam.js';
import CrbAttempt from '../models/CrbAttempt.js';
import Affiliate from '../models/Affiliate.js';
import AffiliateCommission from '../models/AffiliateCommission.js';
import AffiliateWallet from '../models/AffiliateWallet.js';
import Transaction from '../models/Transaction.js';
import { calculateSTL } from '../services/stlService.js';
import { anchor } from '../services/blockchainService.js';

const NAMES = [
  'Ahmed Raza', 'Zainab Iqbal', 'Bilal Khan', 'Fatima Sheikh', 'Usman Ali',
  'Ayesha Malik', 'Hamza Tariq', 'Saad Mehmood', 'Hina Ahmad', 'Waleed Qureshi',
  'Nimra Aslam', 'Omer Javed', 'Sana Rafique', 'Imran Baig', 'Rabia Nasir',
];

// Products seed — multi-industry coverage to unblock R2+ rank promotions in demo.
// industryCode follows v3.2 §12.6 mapping (38 EHB verticals across 6 categories).
const PRODUCT_SEEDS = [
  // Standard category (default Track A 10/5/2)
  { title: 'Organic Basmati Rice 5kg',  category: 'Food',        industryCode: 'FBS', priceUsd:  22, productStl: 7, deliverySpeed:  3 },
  { title: 'Handcrafted Leather Wallet',category: 'Accessories', industryCode: 'FWS', priceUsd:  48, productStl: 8, deliverySpeed:  6 },
  { title: 'Premium Tea Gift Set',      category: 'Food',        industryCode: 'FBS', priceUsd:  35, productStl: 6, deliverySpeed:  2 },
  { title: 'Vintage Ajrak Shawl',       category: 'Apparel',     industryCode: 'FWS', priceUsd:  62, productStl: 9, deliverySpeed: 12 },
  { title: 'Artisan Chocolate Box',     category: 'Food',        industryCode: 'FBS', priceUsd:  38, productStl: 7, deliverySpeed:  3 },
  { title: 'GoSellr Brand Kit (Logo)',  category: 'Marketing',   industryCode: 'GSM', priceUsd:  60, productStl: 6, deliverySpeed:  1 },

  // High-Margin services (15/5/2)
  { title: 'Online Business School - Module 1', category: 'Education', industryCode: 'OBS', priceUsd:  99, productStl: 8, deliverySpeed:  1 },
  { title: 'IT Services - Web Setup',           category: 'IT',        industryCode: 'ITS', priceUsd: 250, productStl: 7, deliverySpeed:  2 },
  { title: 'Legal Consult — Family Law',        category: 'Legal',     industryCode: 'OLS', priceUsd: 120, productStl: 8, deliverySpeed:  1 },
  { title: 'Insurance - Health Plan Bronze',    category: 'Insurance', industryCode: 'INS', priceUsd:  85, productStl: 7, deliverySpeed:  1 },

  // Recurring services (8/3/1 per cycle)
  { title: 'Telemedicine — 1 Month Subscription', category: 'Health',  industryCode: 'WMS', priceUsd:  29, productStl: 8, deliverySpeed:  1 },
  { title: 'Yoga Class — Monthly Pass',           category: 'Fitness', industryCode: 'WES', priceUsd:  45, productStl: 8, deliverySpeed:  1 },
  { title: 'Telecom SIM — 1 Month Data',          category: 'Telecom', industryCode: 'TCS', priceUsd:  10, productStl: 6, deliverySpeed:  1 },
  { title: 'Streaming — 1 Year Subscription',     category: 'Media',   industryCode: 'CMS', priceUsd:  60, productStl: 7, deliverySpeed:  1 },

  // Premium / High Ticket (5/2/1)
  { title: 'Hotel — 3 Nights Murree',  category: 'Hospitality', industryCode: 'HMS', priceUsd: 350, productStl: 7, deliverySpeed:  1 },
  { title: 'Real Estate — Plot Listing Fee', category: 'Real Estate', industryCode: 'RES', priceUsd: 200, productStl: 6, deliverySpeed:  2 },

  // Strategic / Government (6/2/1 + KPI)
  { title: 'Job Profile Premium Boost',  category: 'Jobs',     industryCode: 'JPS', priceUsd:  25, productStl: 6, deliverySpeed:  1 },
  { title: 'Government Form Filing Service', category: 'Govt', industryCode: 'GES', priceUsd:  35, productStl: 7, deliverySpeed:  2 },

  // Commodity / Volume (7/3/1)
  { title: 'Logistics — Same-Day Delivery PK', category: 'Logistics', industryCode: 'LDS', priceUsd:  15, productStl: 6, deliverySpeed:  1 },
  { title: 'Agricultural Seeds — Wheat 25kg',  category: 'Agriculture',industryCode: 'AGTS',priceUsd:  40, productStl: 7, deliverySpeed:  4 },
];

const CRB_EXAM_SEEDS = [
  {
    code: 'CRB-GSM-L3-MCQ',
    title: 'Seller Basics — Foundation',
    industry: 'GSM',
    levelTarget: 3,
    questions: [
      { prompt: 'What is the minimum STL to list products on GoSellr?', options: ['L1', 'L3', 'L4', 'L6'], correctIndex: 2 },
      { prompt: 'How long does escrow hold funds?', options: ['Until seller ships', 'Until buyer confirms delivery', 'Forever', '30 days'], correctIndex: 1 },
      { prompt: 'What percentage is the platform commission?', options: ['1%', '2%', '5%', '10%'], correctIndex: 1 },
      { prompt: 'What happens if a buyer files 3 upheld complaints in 3 weeks?', options: ['Warning', 'Fine', 'STL -2 levels', 'Ban'], correctIndex: 2 },
      { prompt: 'Who resolves complaints?', options: ['Seller', 'Buyer', 'DMO', 'AI only'], correctIndex: 2 },
    ],
  },
  {
    code: 'CRB-WMS-L5-MCQ',
    title: 'Medical Services — Advanced',
    industry: 'WMS',
    levelTarget: 5,
    questions: [
      { prompt: 'What does MIN-chain protect against?', options: ['Spam', 'Trust spoofing', 'Downtime', 'Fraud'], correctIndex: 1 },
      { prompt: 'Which system stores certificate hashes?', options: ['MongoDB', 'Polkadot', 'Redis', 'MySQL'], correctIndex: 1 },
      { prompt: 'What is the PSS source cap?', options: ['L3', 'L5', 'L8', 'L10'], correctIndex: 1 },
    ],
  },
  {
    code: 'CRB-JPS-L4-MCQ',
    title: 'Job Seeker Certification',
    industry: 'JPS',
    levelTarget: 4,
    questions: [
      { prompt: 'Who can be inspector for CRB audits?', options: ['Anyone', 'PSS L4+ only', 'Anyone with STL L10', 'Only DMO staff'], correctIndex: 1 },
      { prompt: 'Is CRB refill mandatory?', options: ['No', 'Yes, every 3 months', 'Yes, every 6 months', 'Only if complaints filed'], correctIndex: 2 },
    ],
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[SEED] MONGODB_URI not set.');
    process.exit(1);
  }

  await connectDB(uri);
  console.log('[SEED] Connected to MongoDB');

  console.log('[SEED] Clearing demo collections…');
  await Promise.all([
    User.deleteMany({ email: /@demo\.ehb$/ }),
    Wallet.deleteMany({}),
    Franchise.deleteMany({ country: 'PK' }),
    FranchiseApplication.deleteMany({}),
    SerialCounter.deleteMany({}),
    ActivityLog.deleteMany({}),
    AiInvocation.deleteMany({}),
    BlockchainProof.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    Review.deleteMany({}),
    Rider.deleteMany({}),
    Delivery.deleteMany({}),
    Complaint.deleteMany({}),
    Penalty.deleteMany({}),
    Notification.deleteMany({}),
    CrbExam.deleteMany({}),
    CrbAttempt.deleteMany({}),
    Affiliate.deleteMany({}),
    AffiliateCommission.deleteMany({}),
    AffiliateWallet.deleteMany({}),
  ]);

  // --- Users ---
  const roles = ['user', 'user', 'user', 'user', 'franchisee', 'DMO_MANAGER', 'DMO_ANALYST'];
  const userDocs = [];
  for (let i = 0; i < 50; i++) {
    const name = NAMES[i % NAMES.length] + (i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : '');
    const pssLevel = Math.min(5, Math.floor(Math.random() * 6));
    const crbLevel = Math.floor(Math.random() * 6);
    const dmoLevel = Math.max(1, Math.floor(Math.random() * 6));
    const stl = calculateSTL({ pssLevel, crbLevel, dmoLevel });
    userDocs.push({
      email: `user${String(i + 1).padStart(3, '0')}@demo.ehb`,
      passwordHash: await bcrypt.hash('demo1234', 10),
      name,
      role: roles[i % roles.length],
      pss: { level: pssLevel, status: pssLevel >= 1 ? 'verified' : 'pending' },
      crb: { level: crbLevel, certifications: [] },
      dmo: { level: dmoLevel, score: stl.score, lastRecalc: new Date() },
      stl: { score: stl.score, level: stl.level, history: [] },
    });
  }
  const insertedUsers = await User.insertMany(userDocs);
  console.log(`[SEED] Inserted ${insertedUsers.length} demo users.`);

  // --- DMO Manager ---
  let dmoManager = await User.findOne({ email: 'dmo.manager@ehb.com' });
  if (!dmoManager) {
    dmoManager = await User.create({
      email: 'dmo.manager@ehb.com',
      passwordHash: await bcrypt.hash('ehbDmo2026', 10),
      name: 'DMO Manager',
      role: 'DMO_MANAGER',
      pss: { level: 8, status: 'verified' },
      crb: { level: 8, certifications: [] },
      dmo: { level: 8, score: 90, lastRecalc: new Date() },
      stl: { score: 90, level: 9, history: [] },
    });
    console.log('[SEED] Added dmo.manager@ehb.com (password: ehbDmo2026)');
  }

  // --- Wallets ---
  await Wallet.insertMany(
    [...insertedUsers, dmoManager].map((u) => ({
      userId: u._id,
      ehbgcBalance: 5000 + Math.floor(Math.random() * 20000),
      ehbgcLocked: 0,
      usdBalance: 100 + Math.floor(Math.random() * 500),
    }))
  );

  // --- Franchises (10) ---
  const franchiseSeeds = [
    { level: 'L1', area: 'F-10 Islamabad', usd: 5000 },
    { level: 'L2', area: 'Gulberg Lahore', usd: 8000 },
    { level: 'L3', area: 'Saddar Karachi', usd: 12000 },
    { level: 'L4', area: 'Bahria Town Rwp', usd: 16000 },
    { level: 'L5', area: 'DHA Karachi', usd: 20000 },
    { level: 'L6', area: 'Clifton Karachi', usd: 25000 },
    { level: 'OF1', area: 'National', usd: 100 },
    { level: 'OF2', area: 'Punjab', usd: 250 },
    { level: 'OF3', area: 'National', usd: 750 },
    { level: 'OF4', area: 'International', usd: 1500 },
  ];
  for (let i = 0; i < franchiseSeeds.length; i++) {
    const s = franchiseSeeds[i];
    const owner = insertedUsers[i];
    const isOnline = s.level.startsWith('OF');
    await Franchise.create({
      serialNumber: `EHB-PK-R1-P1-${s.level}-${String(i + 1).padStart(3, '0')}`,
      ownerUserId: owner._id,
      type: isOnline ? 'online' : 'sub',
      level: s.level,
      country: 'PK',
      round: 1,
      phase: 1,
      pricing: {
        usdPaid: s.usd,
        ehbgcLocked: isOnline ? s.usd * 4 : s.usd,
        commissionCapPerDay: isOnline ? 50 : 200,
      },
      geography: { area: s.area },
      status: 'active',
      activatedAt: new Date(Date.now() - Math.random() * 30 * 86400000),
    });
  }

  // --- Pending applications ---
  for (let i = 0; i < 5; i++) {
    await FranchiseApplication.create({
      applicationId: `APP-DEMO-${String(i + 1001).padStart(4, '0')}`,
      userId: insertedUsers[20 + i]._id,
      type: i % 2 === 0 ? 'sub' : 'online',
      level: ['L1', 'L2', 'OF1', 'OF2', 'L3'][i],
      country: 'PK',
      area: ['G-9 Islamabad', 'Johar Town Lahore', 'National', 'Sindh', 'Blue Area'][i],
      pricingConfirmed: { usdPaid: 0, ehbgcReserved: 0 },
      kycSnapshot: { pssLevel: 3, crbLevel: 0, stlLevel: 3 },
      status: 'pending',
    });
  }

  // --- Products (15) ---
  const productDocs = [];
  for (let i = 0; i < PRODUCT_SEEDS.length; i++) {
    const p = PRODUCT_SEEDS[i];
    const seller = insertedUsers[(i % 10) + 30];
    productDocs.push({
      sellerId: seller._id,
      title: p.title,
      slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + i,
      description: `${p.title} — hand-picked and verified by EHB sellers.`,
      category: p.category,
      industry: p.industryCode || 'GSM', // v3.2 §12.6 — drives industry counter for rank engine (Product model uses 'industry')
      priceUsd: p.priceUsd,
      stock: 10 + Math.floor(Math.random() * 50),
      productStl: p.productStl,
      stats: {
        views: Math.floor(Math.random() * 500),
        orders: Math.floor(Math.random() * 100),
        ratingAvg: 3.5 + Math.random() * 1.5,
        ratingCount: Math.floor(Math.random() * 50),
        complaintCount: Math.floor(Math.random() * 5),
        deliverySpeedHours: p.deliverySpeed,
      },
      status: 'active',
    });
  }
  const insertedProducts = await Product.insertMany(productDocs);
  console.log(`[SEED] Inserted ${insertedProducts.length} products.`);

  // --- Orders (20 — mix of statuses) ---
  const statuses = ['confirmed', 'confirmed', 'delivered', 'in_transit', 'assigned', 'paid', 'pending'];
  const orderDocs = [];
  for (let i = 0; i < 20; i++) {
    const buyer = insertedUsers[i % 15];
    const prod = insertedProducts[i % insertedProducts.length];
    const qty = 1 + Math.floor(Math.random() * 3);
    const sub = prod.priceUsd * qty;
    orderDocs.push({
      orderNumber: `ORD-DEMO-${String(i + 1).padStart(5, '0')}`,
      buyerId: buyer._id,
      items: [
        {
          productId: prod._id,
          sellerId: prod.sellerId,
          title: prod.title,
          unitPriceUsd: prod.priceUsd,
          quantity: qty,
          subtotalUsd: sub,
          productStl: prod.productStl,
          sellerStl: 5,
        },
      ],
      totals: { subtotalUsd: sub, platformFeeUsd: sub * 0.02, totalUsd: sub, shippingUsd: 0 },
      status: statuses[i % statuses.length],
      finalStl: Math.min(prod.productStl, 5),
      blockingLayer: 'seller',
      createdAt: new Date(Date.now() - Math.random() * 30 * 86400000),
      delivery: { address: `Demo address ${i + 1}, Pakistan` },
      timeline: [{ at: new Date(), event: 'created', by: String(buyer._id) }],
    });
  }
  await Order.insertMany(orderDocs);
  console.log(`[SEED] Inserted ${orderDocs.length} orders.`);

  // --- Reviews (30) ---
  const reviewDocs = [];
  for (let i = 0; i < 30; i++) {
    const prod = insertedProducts[i % insertedProducts.length];
    const buyer = insertedUsers[i % 20];
    reviewDocs.push({
      orderId: new mongoose.Types.ObjectId(),
      productId: prod._id,
      sellerId: prod.sellerId,
      buyerId: buyer._id,
      buyerStlTier: buyer.stl?.level || 3,
      rating: 3 + Math.floor(Math.random() * 3),
      title: ['Great quality', 'Fast delivery', 'As described', 'Good value', 'Satisfied'][i % 5],
      body: 'Auto-generated demo review.',
    });
  }
  await Review.insertMany(reviewDocs);

  // --- Riders (5) ---
  for (let i = 0; i < 5; i++) {
    await Rider.create({
      userId: insertedUsers[i + 10]._id,
      zone: ['Islamabad', 'Lahore', 'Karachi', 'Islamabad', 'Lahore'][i],
      vehicleType: ['bike', 'bike', 'car', 'bike', 'van'][i],
      verified: true,
      online: i < 3,
      rating: 4.2 + Math.random() * 0.7,
      status: 'active',
      stats: {
        totalDeliveries: 50 + Math.floor(Math.random() * 200),
        onTimeDeliveries: 45 + Math.floor(Math.random() * 180),
        activeOrders: Math.floor(Math.random() * 3),
        earningsTotalUsd: 200 + Math.random() * 800,
      },
      activationGate: { pssLevel: 3, crbLevel: 2, stlLevel: 3, met: true },
    });
  }

  // --- Complaints (8) ---
  const complaintCats = ['late_delivery', 'item_damaged', 'not_as_described', 'refund_dispute', 'quality_issue', 'fraud', 'abusive_behavior', 'other'];
  for (let i = 0; i < 8; i++) {
    const tier = i === 5 ? 6 : i === 6 ? 5 : Math.floor(i / 2) + 1;
    await Complaint.create({
      complaintNumber: `CMP-DEMO-${String(i + 1).padStart(4, '0')}`,
      filerId: insertedUsers[i]._id,
      againstUserId: insertedUsers[i + 10]._id,
      category: complaintCats[i],
      tier,
      summary: `Demo complaint #${i + 1}`,
      details: 'This is a seeded demo complaint.',
      slaDeadlineAt: new Date(Date.now() + (72 - tier * 10) * 3600 * 1000),
      status: i < 5 ? 'open' : 'resolved',
      createdAt: new Date(Date.now() - Math.random() * 7 * 86400000),
    });
  }

  // --- Notifications (10) ---
  for (let i = 0; i < 10; i++) {
    await Notification.create({
      userId: dmoManager._id,
      category: ['order', 'franchise', 'complaint', 'stl'][i % 4],
      title: ['New order placed', 'Franchise approved', 'Complaint filed', 'STL drop alert'][i % 4],
      body: `Demo notification #${i + 1}`,
      severity: i % 4 === 3 ? 'warn' : 'info',
      read: i >= 6,
      createdAt: new Date(Date.now() - i * 3600 * 1000),
    });
  }

  // --- AI invocations (100) ---
  const serviceIds = ['resume', 'tutor', 'recommend', 'business', 'diagnosis', 'lawyer', 'fraud'];
  const invocations = [];
  for (let i = 0; i < 100; i++) {
    invocations.push({
      userId: insertedUsers[i % insertedUsers.length]._id,
      service: serviceIds[i % serviceIds.length],
      input: { demo: true },
      output: { text: `[demo #${i}]`, confidence: 0.7 + Math.random() * 0.3, disclaimer: 'Demo', meta: { model: 'stub', latencyMs: 100 } },
      flagged: Math.random() < 0.05,
      createdAt: new Date(Date.now() - Math.random() * 7 * 86400000),
    });
  }
  await AiInvocation.insertMany(invocations);

  // --- CRB Exams ---
  const insertedExams = await CrbExam.insertMany(CRB_EXAM_SEEDS);
  console.log(`[SEED] Inserted ${insertedExams.length} CRB exams.`);

  // --- Affiliates v3.2-MVP (15 users joined, with referral chain + R1 rank) ---
  const affDocs = [];
  for (let i = 0; i < 15; i++) {
    const u = insertedUsers[i];
    const upstream = i > 0
      ? [insertedUsers[Math.max(0, i - 1)]._id, ...(i > 1 ? [insertedUsers[Math.max(0, i - 2)]._id] : [])].slice(0, 10)
      : [];
    const directs = Math.floor(Math.random() * 10);
    const networkSize = directs + Math.floor(Math.random() * 20);
    const lifetimeUsd = +(Math.random() * 500).toFixed(2);
    const monthUsd = +(Math.random() * 80).toFixed(2);
    affDocs.push({
      userId: u._id,
      referralCode: `${(u.name || 'ref').toLowerCase().replace(/[^a-z]/g,'').slice(0,6)}-${String(i).padStart(2,'0')}A1`,
      referredBy: i > 0 ? insertedUsers[i - 1]._id : null,
      upstream,
      // v3.2 — R1 default for MVP, Phase 2 unlocks R2-R10
      rank: 'R1',
      // Legacy v1.0 tier kept for backward-compat
      tier: i >= 10 ? 'L3_AMBASSADOR' : i >= 5 ? 'L2_PROMOTER' : 'L1_REFERRER',
      stats: {
        directReferrals: directs,
        networkSize,
        lifetimeEarningsUsd: lifetimeUsd,
        thisMonthEarningsUsd: monthUsd,
        pendingEarningsUsd: +(Math.random() * 30).toFixed(2),
        // v3.2 per-bonus tracking
        directEarnedUsd: +(lifetimeUsd * 0.6).toFixed(2),
        level2EarnedUsd: +(lifetimeUsd * 0.25).toFixed(2),
        firstSaleBonusEarnedUsd: i > 2 ? 5 : 0,
        stlBonusEarnedUsd: +(lifetimeUsd * 0.1).toFixed(2),
        fastSaleBonusFreePackages: Math.floor(Math.random() * 3),
      },
      // First Sale Bonus claimed for users with directs > 0
      firstSaleClaimedAt: directs > 0 ? new Date(Date.now() - Math.random() * 20 * 86400000) : null,
      productAffiliateEnabled: true,
      eligible: true,
      activatedAt: new Date(Date.now() - Math.random() * 30 * 86400000),
    });
  }
  const insertedAff = await Affiliate.insertMany(affDocs);
  console.log(`[SEED] Inserted ${insertedAff.length} affiliates (v3.2-MVP).`);

  // --- Affiliate commissions v3.2 (40 entries — direct/level/first_sale/stl_purchase/fast_sale) ---
  // industryCode rotated across all 14 covered industries to populate distinct-industry counter
  // for rank engine. Top affiliates (idx 0-2) get full 14-industry coverage to demo R5+ promotion.
  const commDocs = [];
  const v32Types = ['direct', 'level', 'first_sale', 'stl_purchase', 'fast_sale'];
  const ALL_INDUSTRIES = ['FBS', 'FWS', 'GSM', 'OBS', 'ITS', 'OLS', 'INS', 'WMS', 'WES', 'TCS', 'CMS', 'HMS', 'RES', 'JPS', 'GES', 'LDS', 'AGTS'];

  for (let i = 0; i < 40; i++) {
    const earnerIdx = Math.floor(Math.random() * 15);
    const earner = insertedUsers[earnerIdx];
    const orderValue = 50 + Math.random() * 400;
    const t = v32Types[i % v32Types.length];

    let level, rate, amount;
    if (t === 'direct') {
      level = 1;
      rate = 0.03; // 3% per v3.2 §12.2
      amount = orderValue * rate;
    } else if (t === 'level') {
      level = 2;
      rate = 0.015; // 1.5% per v3.2 §12.2
      amount = orderValue * rate;
    } else if (t === 'first_sale') {
      level = undefined;
      rate = null;
      amount = 5; // $5 fixed per v3.2 §12.7 #4
    } else if (t === 'stl_purchase') {
      level = (i % 2) + 1;
      rate = level === 1 ? 0.03 : 0.02;
      amount = orderValue * rate;
    } else {
      // fast_sale
      level = undefined;
      rate = null;
      amount = orderValue;
    }

    // Top 3 earners get full industry diversity (R5 needs 10, R10 needs 38);
    // others get a smaller rotating subset
    const industryCode = earnerIdx < 3
      ? ALL_INDUSTRIES[i % ALL_INDUSTRIES.length]              // up to 17 distinct
      : ALL_INDUSTRIES[i % Math.min(5, ALL_INDUSTRIES.length)]; // up to 5 distinct

    commDocs.push({
      earnerUserId: earner._id,
      sourceUserId: insertedUsers[(earnerIdx + 5) % 15]._id,
      type: t,
      track: t === 'direct' || t === 'level' ? 'A' : null,
      level,
      productPriceUsd: orderValue,
      orderValueUsd: orderValue,
      rateApplied: rate,
      amountUsd: amount,
      sellerProfitPercent: t === 'direct' || t === 'level' ? 15 + Math.floor(Math.random() * 16) : null,
      networkPoolPercent: t === 'direct' || t === 'level' ? 5 : null,
      industryCode, // v3.2 §12.6 — drives rank engine industry counter
      status: 'paid',
      paidAt: new Date(Date.now() - Math.random() * 14 * 86400000),
    });
  }
  await AffiliateCommission.insertMany(commDocs);
  console.log(`[SEED] Inserted ${commDocs.length} affiliate commissions (5 v3.2 types, ${ALL_INDUSTRIES.length}-industry coverage).`);

  // --- Affiliate Wallets v3.3 (per affiliate user with realistic balances) ---
  const affWalletDocs = [];
  const affTxnDocs = [];
  for (let i = 0; i < insertedAff.length; i++) {
    const aff = insertedAff[i];
    const lifetimeUsd = aff.stats?.lifetimeEarningsUsd || 0;
    const withdrawnUsd = +(lifetimeUsd * Math.random() * 0.4).toFixed(2);
    const availableUsd = +(lifetimeUsd - withdrawnUsd).toFixed(2);
    const usdtShare = +(availableUsd * 0.8).toFixed(2);
    const ehbgcShare = +(availableUsd * 0.2).toFixed(2);

    affWalletDocs.push({
      userId: aff.userId,
      balances: { usdt: usdtShare, ehbgc: ehbgcShare },
      pendingHold: 0,
      availableUsd,
      stats: {
        lifetimeCreditedUsd: lifetimeUsd,
        lifetimeWithdrawnUsd: withdrawnUsd,
        thisMonthCreditedUsd: aff.stats?.thisMonthEarningsUsd || 0,
        monthAnchor: `${new Date().getUTCFullYear()}-${String(new Date().getUTCMonth() + 1).padStart(2, '0')}`,
      },
      settings: { payoutMix: { usdtPercent: 80, ehbgcPercent: 20 } },
      lastCreditedAt: new Date(Date.now() - Math.random() * 7 * 86400000),
      status: 'active',
    });

    // Sample wallet transactions for first 5 users (more activity)
    if (i < 5 && availableUsd > 10) {
      // 3 commission credit events
      for (let j = 0; j < 3; j++) {
        const amt = +(Math.random() * 50).toFixed(2);
        affTxnDocs.push({
          toUserId: aff.userId,
          type: 'affiliate_commission_credit',
          currency: 'USD',
          amount: amt,
          status: 'completed',
          referenceType: ['affiliate_direct_L1', 'affiliate_level_L2', 'affiliate_first_sale'][j],
          notes: `USDT ${(amt * 0.8).toFixed(2)} + EHBGC ${(amt * 0.2).toFixed(2)}`,
          createdAt: new Date(Date.now() - (j + 1) * 2 * 86400000),
        });
      }
      // 1 transfer-to-main event
      if (withdrawnUsd > 0) {
        affTxnDocs.push({
          fromUserId: aff.userId,
          toUserId: aff.userId,
          type: 'affiliate_to_main_transfer',
          currency: 'USD',
          amount: withdrawnUsd,
          status: 'completed',
          referenceType: 'internal_transfer',
          notes: `From Affiliate (USDT ${(withdrawnUsd * 0.8).toFixed(2)} + EHBGC ${(withdrawnUsd * 0.2).toFixed(2)}) → Main (EHBGC)`,
          createdAt: new Date(Date.now() - 1 * 86400000),
        });
      }
    }
  }
  await AffiliateWallet.insertMany(affWalletDocs);
  if (affTxnDocs.length > 0) await Transaction.insertMany(affTxnDocs);
  console.log(`[SEED] Inserted ${affWalletDocs.length} affiliate wallets (v3.3) + ${affTxnDocs.length} sample transactions.`);

  // --- Blockchain proofs ---
  for (let i = 0; i < 3; i++) {
    await anchor({
      targetType: 'pss_kyc',
      targetId: insertedUsers[i]._id.toString(),
      payload: { pssLevel: 3 },
    });
  }

  console.log('[SEED] Done. Summary:');
  const counts = {
    Users: await User.countDocuments(),
    Franchises: await Franchise.countDocuments(),
    PendingApps: await FranchiseApplication.countDocuments({ status: 'pending' }),
    Products: await Product.countDocuments(),
    Orders: await Order.countDocuments(),
    Reviews: await Review.countDocuments(),
    Riders: await Rider.countDocuments(),
    Complaints: await Complaint.countDocuments(),
    Notifications: await Notification.countDocuments(),
    AiInvocations: await AiInvocation.countDocuments(),
    CrbExams: await CrbExam.countDocuments(),
    BlockchainProofs: await BlockchainProof.countDocuments(),
  };
  for (const [k, v] of Object.entries(counts)) console.log(`  ${k.padEnd(20)} ${v}`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((e) => {
  console.error('[SEED] error:', e);
  process.exit(1);
});
