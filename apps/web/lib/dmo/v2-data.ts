/**
 * EHB AI · DMO Console V2 · Demo data
 *
 * Per F.18 (DMO governance) +
 *     EHB-DMO-AUTO-ARCHITECT skill canonicals +
 *     Production Blueprint §15 (Officer dashboards)
 *
 * Production wiring (TODO for dev team):
 * - Replace DEMO_QUEUE with GET /api/dmo/queue?tier=N
 * - Replace DEMO_KILL_SWITCHES with GET /api/dmo/kill-switches
 * - Replace DEMO_OFFICERS with GET /api/dmo/officers
 * - Wire AI pre-classify to POST /api/dmo/classify (uses AGT_GOV_ASSIST)
 */

export type ComplaintTier =
  | 1 // L1 · auto-resolved by AI (low risk)
  | 2 // L2 · officer review (standard)
  | 3 // L3 · senior officer (sensitive)
  | 4 // L4 · DMO supervisor (slashing)
  | 5 // L5 · regional manager (cross-franchise)
  | 6 // L6 · legal review (litigation risk)
  | 7; // L7 · founder + EAB (existential)

export type ComplaintCategory =
  | 'service-quality'
  | 'fraud-payment'
  | 'fraud-identity'
  | 'harassment'
  | 'data-leak'
  | 'cert-misuse'
  | 'refund-dispute'
  | 'platform-bug'
  | 'safeguarding'
  | 'aml-flag';

export type ComplaintStatus =
  | 'queued'
  | 'in-review'
  | 'awaiting-evidence'
  | 'resolved-favor-complainant'
  | 'resolved-favor-respondent'
  | 'escalated'
  | 'dismissed';

export type Complaint = {
  id: string;
  createdAt: string; // ISO
  category: ComplaintCategory;
  tier: ComplaintTier;
  status: ComplaintStatus;
  complainantId: string;
  complainantName: string;
  complainantStl: number;
  respondentId: string;
  respondentName: string;
  respondentStl: number;
  region: string;
  industry: string;
  summary: string;
  // AI pre-classification
  aiSeverity: 'low' | 'medium' | 'high' | 'critical';
  aiConfidence: number; // 0-1
  aiSuggestedAction: string;
  aiTags: string[];
  // SLA
  slaHours: number;
  hoursElapsed: number;
  // Evidence
  evidenceCount: number;
  // Assignment
  assignedOfficerId: string | null;
  assignedOfficerName: string | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// 7-tier escalation map (per F.18 §3.2 · slashing matrix)
// ─────────────────────────────────────────────────────────────────────────────

export const TIER_DEFINITIONS: Array<{
  tier: ComplaintTier;
  label: string;
  description: string;
  slaHours: number;
  decisionAuthority: string;
  aiAuthority: 'A1-recommend' | 'A2-suggest' | 'A3-execute-low' | 'A4-execute-high' | 'NONE';
  examples: string[];
  color: string;
}> = [
  {
    tier: 1,
    label: 'L1 · Auto-Resolved',
    description: 'Low-risk · AI handles end-to-end · refund < Rs 500',
    slaHours: 1,
    decisionAuthority: 'AGT_GOV_ASSIST (auto)',
    aiAuthority: 'A3-execute-low',
    examples: ['Class no-show < 30min', 'Lecture audio glitch', 'Wrong subject tag'],
    color: 'emerald',
  },
  {
    tier: 2,
    label: 'L2 · Officer Review',
    description: 'Standard complaints · single officer triage',
    slaHours: 4,
    decisionAuthority: 'DMO Officer',
    aiAuthority: 'A2-suggest',
    examples: ['Tutor late repeatedly', 'Quality complaint', 'Refund Rs 500-5000'],
    color: 'blue',
  },
  {
    tier: 3,
    label: 'L3 · Senior Officer',
    description: 'Sensitive · requires interview + evidence',
    slaHours: 24,
    decisionAuthority: 'DMO Senior Officer',
    aiAuthority: 'A1-recommend',
    examples: ['Verbal harassment', 'False CRB exam', 'Refund Rs 5K-50K'],
    color: 'amber',
  },
  {
    tier: 4,
    label: 'L4 · Supervisor + Slashing',
    description: 'STL slashing · franchise warning · multi-day investigation',
    slaHours: 72,
    decisionAuthority: 'DMO Supervisor',
    aiAuthority: 'A1-recommend',
    examples: ['Cert misuse', 'Repeated quality fail (3-strike)', 'AML mid-tier'],
    color: 'orange',
  },
  {
    tier: 5,
    label: 'L5 · Regional Manager',
    description: 'Cross-franchise · regional kill switch consideration',
    slaHours: 168,
    decisionAuthority: 'Regional Manager',
    aiAuthority: 'A1-recommend',
    examples: ['Multi-franchise scam ring', 'Regional fraud cluster', 'Boycott-worthy'],
    color: 'red',
  },
  {
    tier: 6,
    label: 'L6 · Legal Review',
    description: 'Litigation risk · external counsel · police involvement',
    slaHours: 336,
    decisionAuthority: 'Pakistani Legal Counsel + DMO Supervisor',
    aiAuthority: 'NONE',
    examples: ['Child safeguarding', 'Sexual harassment', 'Doxxing', 'Major fraud >Rs 500K'],
    color: 'rose',
  },
  {
    tier: 7,
    label: 'L7 · Founder + EAB',
    description: 'Existential risk · founder + Executive Advisory Board',
    slaHours: 24,
    decisionAuthority: 'Founder · Senior Advisor · Legal',
    aiAuthority: 'NONE',
    examples: ['Data breach >1000 users', 'Regulator action', 'Shutdown threat', 'PR crisis'],
    color: 'purple',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Demo queue · 12 sample complaints across tiers
// ─────────────────────────────────────────────────────────────────────────────

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600 * 1000).toISOString();

export const DEMO_QUEUE: Complaint[] = [
  {
    id: 'CMP-2026-0001',
    createdAt: hoursAgo(0.5),
    category: 'platform-bug',
    tier: 1,
    status: 'queued',
    complainantId: 'u_abc',
    complainantName: 'Ali Khan',
    complainantStl: 4,
    respondentId: 'sys',
    respondentName: 'Platform',
    respondentStl: 0,
    region: 'Islamabad',
    industry: 'Education',
    summary: 'Math quiz ne galat answer accept kiya · 1/2 ko 1.5 dikhaya',
    aiSeverity: 'low',
    aiConfidence: 0.92,
    aiSuggestedAction: 'Auto-refund Rs 50 quiz fee · log bug ticket #2031',
    aiTags: ['platform', 'quiz-engine', 'math', 'auto-refundable'],
    slaHours: 1,
    hoursElapsed: 0.5,
    evidenceCount: 1,
    assignedOfficerId: null,
    assignedOfficerName: null,
  },
  {
    id: 'CMP-2026-0002',
    createdAt: hoursAgo(2),
    category: 'service-quality',
    tier: 2,
    status: 'in-review',
    complainantId: 'u_def',
    complainantName: 'Sadia Ahmed',
    complainantStl: 3,
    respondentId: 't_ghi',
    respondentName: 'Tutor Imran',
    respondentStl: 6,
    region: 'Rawalpindi',
    industry: 'Education',
    summary: 'Tutor 20 minute late aaya · class sirf 25 min ki · refund chahiye',
    aiSeverity: 'medium',
    aiConfidence: 0.85,
    aiSuggestedAction: 'Partial refund Rs 200 · CRB warning to tutor · -1 STL if 2nd offense',
    aiTags: ['tardiness', 'first-offense', 'refund-eligible'],
    slaHours: 4,
    hoursElapsed: 2,
    evidenceCount: 2,
    assignedOfficerId: 'off_001',
    assignedOfficerName: 'Officer Zainab',
  },
  {
    id: 'CMP-2026-0003',
    createdAt: hoursAgo(6),
    category: 'fraud-payment',
    tier: 3,
    status: 'awaiting-evidence',
    complainantId: 'u_jkl',
    complainantName: 'Mariam Tariq',
    complainantStl: 5,
    respondentId: 't_mno',
    respondentName: 'Academy Punjab',
    respondentStl: 4,
    region: 'Lahore',
    industry: 'Education',
    summary: 'Rs 8000 advance liya · classes shuru nahin ki · 2 hafte ho gaye',
    aiSeverity: 'high',
    aiConfidence: 0.78,
    aiSuggestedAction: 'Freeze respondent wallet Rs 8000 · request bank statement · escalate L4 if no response 48h',
    aiTags: ['payment-fraud', 'advance-fraud', 'pending-evidence', 'freeze-recommended'],
    slaHours: 24,
    hoursElapsed: 6,
    evidenceCount: 4,
    assignedOfficerId: 'off_002',
    assignedOfficerName: 'Officer Hassan',
  },
  {
    id: 'CMP-2026-0004',
    createdAt: hoursAgo(18),
    category: 'cert-misuse',
    tier: 4,
    status: 'in-review',
    complainantId: 'u_pqr',
    complainantName: 'Bilal Sheikh',
    complainantStl: 6,
    respondentId: 't_stu',
    respondentName: 'Tutor Faisal',
    respondentStl: 8,
    region: 'Karachi',
    industry: 'Education',
    summary: 'Tutor ne MBBS degree show ki thi · NADRA verify pe match nahin · forged document',
    aiSeverity: 'critical',
    aiConfidence: 0.96,
    aiSuggestedAction: 'Slash STL by -3 · suspend listing · refund all paying students · file FIR if confirmed',
    aiTags: ['credential-fraud', 'NADRA-mismatch', 'slashing', 'FIR-eligible'],
    slaHours: 72,
    hoursElapsed: 18,
    evidenceCount: 6,
    assignedOfficerId: 'off_003',
    assignedOfficerName: 'Supv. Ayesha',
  },
  {
    id: 'CMP-2026-0005',
    createdAt: hoursAgo(36),
    category: 'aml-flag',
    tier: 4,
    status: 'in-review',
    complainantId: 'sys',
    complainantName: 'AML Auto-Detect',
    complainantStl: 0,
    respondentId: 'u_vwx',
    respondentName: 'Khalid Memon',
    respondentStl: 5,
    region: 'Karachi',
    industry: 'Education',
    summary: 'User ne 1 mahine me Rs 12L bheje · 47 different recipients · structured transactions',
    aiSeverity: 'critical',
    aiConfidence: 0.89,
    aiSuggestedAction: 'Freeze wallet · request KYC re-verification · file SAR with FBR · L5 escalation likely',
    aiTags: ['AML', 'structuring', 'high-volume', 'SAR-required'],
    slaHours: 72,
    hoursElapsed: 36,
    evidenceCount: 12,
    assignedOfficerId: 'off_004',
    assignedOfficerName: 'Compliance Lead',
  },
  {
    id: 'CMP-2026-0006',
    createdAt: hoursAgo(48),
    category: 'safeguarding',
    tier: 6,
    status: 'escalated',
    complainantId: 'u_yza',
    complainantName: 'Parent (anonymous)',
    complainantStl: 0,
    respondentId: 't_bcd',
    respondentName: 'Tutor Adeel',
    respondentStl: 7,
    region: 'Islamabad',
    industry: 'Education',
    summary: 'Tutor ne 14-year-old student ko private WhatsApp se contact kiya · inappropriate messages',
    aiSeverity: 'critical',
    aiConfidence: 0.94,
    aiSuggestedAction: 'IMMEDIATE suspend · WhatsApp logs preserve · contact parent · police referral · external legal counsel',
    aiTags: ['child-safeguarding', 'L6-immediate', 'police-referral', 'legal-required'],
    slaHours: 336,
    hoursElapsed: 48,
    evidenceCount: 8,
    assignedOfficerId: 'off_005',
    assignedOfficerName: 'Legal · Adv. Hamid',
  },
  {
    id: 'CMP-2026-0007',
    createdAt: hoursAgo(0.2),
    category: 'platform-bug',
    tier: 1,
    status: 'queued',
    complainantId: 'u_efg',
    complainantName: 'Sara Yusuf',
    complainantStl: 3,
    respondentId: 'sys',
    respondentName: 'Platform',
    respondentStl: 0,
    region: 'Multan',
    industry: 'Education',
    summary: 'AI Tutor ne wrong language me jawab diya · Urdu mode pe English bola',
    aiSeverity: 'low',
    aiConfidence: 0.97,
    aiSuggestedAction: 'Re-route to Urdu prompt · log #2032 · no compensation needed',
    aiTags: ['platform', 'i18n-bug', 'auto-resolvable'],
    slaHours: 1,
    hoursElapsed: 0.2,
    evidenceCount: 1,
    assignedOfficerId: null,
    assignedOfficerName: null,
  },
  {
    id: 'CMP-2026-0008',
    createdAt: hoursAgo(8),
    category: 'refund-dispute',
    tier: 2,
    status: 'queued',
    complainantId: 'u_hij',
    complainantName: 'Tariq Mahmood',
    complainantStl: 4,
    respondentId: 't_klm',
    respondentName: 'Tutor Nida',
    respondentStl: 7,
    region: 'Faisalabad',
    industry: 'Education',
    summary: 'Cancel kiya 1 hafta pehle · refund nahin mila · tutor jawab nahin de raha',
    aiSeverity: 'medium',
    aiConfidence: 0.81,
    aiSuggestedAction: 'Auto-refund per cancellation policy (Rs 1500) · note vs tutor payout · -1 DMO if pattern',
    aiTags: ['refund-policy', 'tutor-unresponsive'],
    slaHours: 4,
    hoursElapsed: 8,
    evidenceCount: 3,
    assignedOfficerId: null,
    assignedOfficerName: null,
  },
  {
    id: 'CMP-2026-0009',
    createdAt: hoursAgo(120),
    category: 'data-leak',
    tier: 7,
    status: 'escalated',
    complainantId: 'sys',
    complainantName: 'Security Auto-Detect',
    complainantStl: 0,
    respondentId: 'sys',
    respondentName: 'Internal Investigation',
    respondentStl: 0,
    region: 'Multi',
    industry: 'Platform',
    summary: 'Possible CSV leak · 3000 student records · pastebin URL detected',
    aiSeverity: 'critical',
    aiConfidence: 0.72,
    aiSuggestedAction: 'EAB convene IMMEDIATELY · external forensics · PDP regulator notify within 72h · user notification within 96h',
    aiTags: ['data-breach', 'PDP-mandatory-notification', 'EAB-required', 'forensics-needed'],
    slaHours: 24,
    hoursElapsed: 120,
    evidenceCount: 15,
    assignedOfficerId: 'founder',
    assignedOfficerName: 'Muhammad Rafi',
  },
  {
    id: 'CMP-2026-0010',
    createdAt: hoursAgo(1.5),
    category: 'service-quality',
    tier: 2,
    status: 'queued',
    complainantId: 'u_nop',
    complainantName: 'Hassan Ali',
    complainantStl: 4,
    respondentId: 't_qrs',
    respondentName: 'Tutor Sania',
    respondentStl: 6,
    region: 'Islamabad',
    industry: 'Education',
    summary: 'Audio quality kharab thi · samjh nahin aaya · 3 baar try kiya',
    aiSeverity: 'low',
    aiConfidence: 0.74,
    aiSuggestedAction: 'Diagnostic check tutor connection · refund if confirmed (Rs 300) · device test prompt',
    aiTags: ['audio-quality', 'connection-issue', 'borderline-l1'],
    slaHours: 4,
    hoursElapsed: 1.5,
    evidenceCount: 2,
    assignedOfficerId: null,
    assignedOfficerName: null,
  },
  {
    id: 'CMP-2026-0011',
    createdAt: hoursAgo(72),
    category: 'harassment',
    tier: 3,
    status: 'in-review',
    complainantId: 'u_tuv',
    complainantName: 'Zainab Iqbal',
    complainantStl: 5,
    respondentId: 't_wxy',
    respondentName: 'Tutor Junaid',
    respondentStl: 5,
    region: 'Karachi',
    industry: 'Education',
    summary: 'Tutor ne off-platform contact try kiya · personal questions · uncomfortable',
    aiSeverity: 'high',
    aiConfidence: 0.88,
    aiSuggestedAction: 'Suspend tutor pending investigation · interview both parties · slashing -2 if confirmed · POSH protocol',
    aiTags: ['harassment', 'POSH', 'off-platform-contact', 'investigation'],
    slaHours: 24,
    hoursElapsed: 72,
    evidenceCount: 5,
    assignedOfficerId: 'off_006',
    assignedOfficerName: 'POSH Officer Faiza',
  },
  {
    id: 'CMP-2026-0012',
    createdAt: hoursAgo(2.5),
    category: 'fraud-identity',
    tier: 3,
    status: 'queued',
    complainantId: 'u_zab',
    complainantName: 'Imran Sajjad',
    complainantStl: 5,
    respondentId: 't_cde',
    respondentName: 'Tutor "Ahmed"',
    respondentStl: 4,
    region: 'Lahore',
    industry: 'Education',
    summary: 'Tutor ki photo CNIC pe match nahin · alag person seems',
    aiSeverity: 'high',
    aiConfidence: 0.91,
    aiSuggestedAction: 'Liveness re-check required · suspend listing · NADRA verify · slashing -3 if mismatch',
    aiTags: ['identity-fraud', 'photo-mismatch', 'liveness-recheck'],
    slaHours: 24,
    hoursElapsed: 2.5,
    evidenceCount: 3,
    assignedOfficerId: null,
    assignedOfficerName: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Kill switches (per F.18 §3.1 · ≤30s SLO)
// ─────────────────────────────────────────────────────────────────────────────

export type KillSwitch = {
  id: string;
  scope: 'global' | 'region' | 'industry' | 'feature' | 'user';
  scopeValue: string;
  status: 'armed' | 'fired' | 'disarmed';
  description: string;
  authority: 'A0-founder' | 'A4-supervisor' | 'A3-officer';
  lastFiredAt: string | null;
  affectedCount: number;
};

export const DEMO_KILL_SWITCHES: KillSwitch[] = [
  {
    id: 'ks_global_payouts',
    scope: 'global',
    scopeValue: 'all-payouts',
    status: 'armed',
    description: 'Pause all wallet withdrawals · use during fraud/breach',
    authority: 'A0-founder',
    lastFiredAt: null,
    affectedCount: 0,
  },
  {
    id: 'ks_global_signup',
    scope: 'global',
    scopeValue: 'new-signups',
    status: 'armed',
    description: 'Block new user registration · use during attack',
    authority: 'A0-founder',
    lastFiredAt: null,
    affectedCount: 0,
  },
  {
    id: 'ks_global_ai_tutor',
    scope: 'feature',
    scopeValue: 'ai-tutor',
    status: 'armed',
    description: 'Disable AI Tutor responses · fall back to human queue',
    authority: 'A4-supervisor',
    lastFiredAt: null,
    affectedCount: 0,
  },
  {
    id: 'ks_region_karachi',
    scope: 'region',
    scopeValue: 'Karachi',
    status: 'armed',
    description: 'Pause all transactions in Karachi · use for regional fraud cluster',
    authority: 'A4-supervisor',
    lastFiredAt: hoursAgo(168), // last fired a week ago for test
    affectedCount: 230,
  },
  {
    id: 'ks_industry_education',
    scope: 'industry',
    scopeValue: 'Education',
    status: 'armed',
    description: 'Pause new course listings · keep existing classes running',
    authority: 'A4-supervisor',
    lastFiredAt: null,
    affectedCount: 0,
  },
  {
    id: 'ks_feature_otp',
    scope: 'feature',
    scopeValue: 'sms-otp',
    status: 'armed',
    description: 'Disable SMS OTP · force WhatsApp OTP only',
    authority: 'A3-officer',
    lastFiredAt: null,
    affectedCount: 0,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Slashing matrix (per F.18 §3.2)
// ─────────────────────────────────────────────────────────────────────────────

export const SLASHING_MATRIX = [
  { offense: 'Tardiness (1st)', stlImpact: 0, walletImpact: 0, suspension: 0, note: 'Warning only' },
  { offense: 'Tardiness (2nd)', stlImpact: -1, walletImpact: -200, suspension: 0, note: 'CRB note' },
  { offense: 'Tardiness (3rd)', stlImpact: -2, walletImpact: -500, suspension: 1, note: '24h suspension' },
  { offense: 'Quality fail (1st)', stlImpact: -1, walletImpact: -300, suspension: 0, note: 'Refund + CRB note' },
  { offense: 'Refund unjust', stlImpact: -1, walletImpact: 0, suspension: 0, note: 'Wallet hold pending' },
  { offense: 'Cert misuse (forged)', stlImpact: -3, walletImpact: -5000, suspension: 7, note: 'FIR-eligible · L4' },
  { offense: 'Identity fraud', stlImpact: -4, walletImpact: -10000, suspension: 30, note: 'Banned · L4' },
  { offense: 'Harassment (POSH)', stlImpact: -3, walletImpact: -3000, suspension: 14, note: 'POSH protocol · L3' },
  { offense: 'Child safeguarding', stlImpact: -10, walletImpact: -50000, suspension: 9999, note: 'Permanent ban + police · L6' },
  { offense: 'AML structuring', stlImpact: -5, walletImpact: -20000, suspension: 90, note: 'Wallet freeze + SAR · L4-L5' },
  { offense: 'Data breach (leak)', stlImpact: -8, walletImpact: -100000, suspension: 9999, note: 'Permanent ban · L7 · regulator notify' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Officer roster (V1 demo)
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_OFFICERS = [
  { id: 'off_001', name: 'Officer Zainab', tier: 2, region: 'Rawalpindi', activeQ: 8, avgResolveHrs: 3.2 },
  { id: 'off_002', name: 'Officer Hassan', tier: 3, region: 'Lahore', activeQ: 5, avgResolveHrs: 18 },
  { id: 'off_003', name: 'Supv. Ayesha', tier: 4, region: 'Karachi', activeQ: 3, avgResolveHrs: 52 },
  { id: 'off_004', name: 'Compliance Lead', tier: 4, region: 'All-Pakistan', activeQ: 2, avgResolveHrs: 60 },
  { id: 'off_005', name: 'Legal · Adv. Hamid', tier: 6, region: 'All-Pakistan', activeQ: 1, avgResolveHrs: 240 },
  { id: 'off_006', name: 'POSH Officer Faiza', tier: 3, region: 'All-Pakistan', activeQ: 2, avgResolveHrs: 22 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Live KPIs (V1 demo aggregates)
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_KPIS = {
  open: 47,
  resolvedToday: 32,
  avgResolveHrsToday: 4.8,
  slaBreachToday: 2,
  aiAutoResolved24h: 18,
  aiSuggestedAccepted: 0.86, // 86% of officer decisions match AI suggestion
  hottestRegion: 'Karachi',
  hottestCategory: 'service-quality' as ComplaintCategory,
  killSwitchesArmed: 6,
  killSwitchesFired24h: 0,
};
