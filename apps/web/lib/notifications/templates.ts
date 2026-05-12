/**
 * EHB AI · Notification Template Library V1
 *
 * Centralized message templates for all transactional notifications:
 *   - SMS (Jazz/Easypaisa/Twilio)        · ≤160 char (Latin) / ≤70 char (Unicode)
 *   - WhatsApp Business (Meta/Twilio)    · template-approved · parameter slots
 *   - Email (SendGrid/Postmark)          · subject + plain + html
 *   - In-app push                        · short title + body
 *
 * Locales: 'ur' (Urdu script) · 'en' (English) · 'roman-ur' (Roman Urdu)
 * Default fallback: 'roman-ur' (works on every Pakistani phone · no font issue)
 *
 * Char rules:
 *   - SMS Unicode (Urdu script): max 70 char per segment · prefer single segment
 *   - SMS GSM-7 (English/Roman): max 160 char per segment · prefer single segment
 *   - WhatsApp Body: max 1024 char (we keep ≤300)
 *   - Email subject: ≤78 char (RFC) · we keep ≤60
 *
 * Per Production Blueprint §11 (notifications) +
 *     File 3 §9 (integration) +
 *     PDPB compliance (no PII in URLs · short links via /n/<token>)
 */

export type Locale = 'ur' | 'en' | 'roman-ur';
export type Channel = 'sms' | 'whatsapp' | 'email' | 'push';

export type RenderedSms = { text: string; segments: number; encoding: 'gsm-7' | 'unicode' };
export type RenderedWhatsApp = {
  templateName: string;
  language: string;
  components: Array<{ type: 'body' | 'header' | 'button'; parameters: Array<{ type: 'text'; text: string }> }>;
  preview: string; // for dev/log only
};
export type RenderedEmail = { subject: string; text: string; html: string };
export type RenderedPush = { title: string; body: string; data?: Record<string, string> };

// ─────────────────────────────────────────────────────────────────────────────
// Template registry · keyed by event id
// ─────────────────────────────────────────────────────────────────────────────

export type TemplateId =
  | 'otp.signup'
  | 'welcome.new-user'
  | 'class.reminder'
  | 'progress.weekly-digest'
  | 'tutor.onboarding-complete'
  | 'tutor.first-earning'
  | 'payout.confirmed'
  | 'refill.cert-expiring'
  | 'complaint.received'
  | 'account.suspended'
  | 'stl.upgrade-unlocked'
  | 'quiz.streak-broken';

type SmsBody = Record<Locale, string>;
type WaBody = { templateName: string; bodyByLocale: Record<Locale, string>; paramOrder: string[] };
type EmailBody = { subject: Record<Locale, string>; text: Record<Locale, string>; html: Record<Locale, string> };
type PushBody = { title: Record<Locale, string>; body: Record<Locale, string> };

type TemplateDef = {
  id: TemplateId;
  description: string;
  channels: Channel[];
  variables: string[];           // keys that must be passed in render context
  sms?: SmsBody;
  whatsapp?: WaBody;
  email?: EmailBody;
  push?: PushBody;
};

// ─────────────────────────────────────────────────────────────────────────────
// 12 V1 templates
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATES: Record<TemplateId, TemplateDef> = {
  // 1. OTP signup — SMS only · GSM-7 ASCII safe
  'otp.signup': {
    id: 'otp.signup',
    description: 'OTP code for phone verification',
    channels: ['sms'],
    variables: ['otp'],
    sms: {
      'roman-ur': 'EHB AI: Aap ka code {{otp}} hai. 5 minute me expire ho ga. Kisi ke saath share na karein.',
      en: 'EHB AI: Your code is {{otp}}. Expires in 5 minutes. Do not share with anyone.',
      ur: 'EHB AI: آپ کا کوڈ {{otp}} ہے۔ 5 منٹ میں ختم۔ کسی سے شیئر نہ کریں۔',
    },
  },

  // 2. Welcome — SMS + WhatsApp
  'welcome.new-user': {
    id: 'welcome.new-user',
    description: 'Welcome message after signup',
    channels: ['sms', 'whatsapp'],
    variables: ['name', 'firstClassLink'],
    sms: {
      'roman-ur': 'Khush amdeed {{name}}! Ab AI Teacher ready hai. Apni pehli class shuru karein: {{firstClassLink}}',
      en: 'Welcome {{name}}! Your AI Teacher is ready. Start your first class: {{firstClassLink}}',
      ur: 'خوش آمدید {{name}}! AI ٹیچر تیار ہے۔ پہلی کلاس شروع کریں: {{firstClassLink}}',
    },
    whatsapp: {
      templateName: 'ehb_welcome_v1',
      paramOrder: ['name', 'firstClassLink'],
      bodyByLocale: {
        'roman-ur': 'Asalam-o-Alaikum {{1}}! 🎉\n\nEHB AI me khush amdeed. Aap ka AI Teacher 24/7 ready hai · Math · Science · Urdu · English · sab kuch.\n\nPehli class start karein: {{2}}\n\nHelp ke liye reply karein "help".',
        en: 'Welcome {{1}}! 🎉\n\nYour AI Teacher is ready 24/7 · Math · Science · Urdu · English · everything.\n\nStart first class: {{2}}\n\nReply "help" for support.',
        ur: 'السلام علیکم {{1}}! 🎉\n\nEHB AI میں خوش آمدید۔ AI ٹیچر 24/7 تیار ہے۔\n\nپہلی کلاس: {{2}}',
      },
    },
  },

  // 3. Class reminder — Push primary · SMS fallback
  'class.reminder': {
    id: 'class.reminder',
    description: 'Reminder for scheduled study session',
    channels: ['push', 'sms'],
    variables: ['subject', 'time'],
    push: {
      title: {
        'roman-ur': '📚 Class ka time hai',
        en: '📚 Class time',
        ur: '📚 کلاس کا وقت',
      },
      body: {
        'roman-ur': '{{subject}} class {{time}} pe shuru hai. AI Teacher wait kar raha hai.',
        en: '{{subject}} class starts at {{time}}. AI Teacher is waiting.',
        ur: '{{subject}} کلاس {{time}} پر شروع ہے۔',
      },
    },
    sms: {
      'roman-ur': 'EHB: {{subject}} class {{time}} pe shuru. Login: ehb.ai',
      en: 'EHB: {{subject}} class at {{time}}. Login: ehb.ai',
      ur: 'EHB: {{subject}} کلاس {{time}}۔ ehb.ai',
    },
  },

  // 4. Weekly progress digest — WhatsApp rich · Email backup
  'progress.weekly-digest': {
    id: 'progress.weekly-digest',
    description: 'Weekly student progress summary',
    channels: ['whatsapp', 'email'],
    variables: ['name', 'minutesStudied', 'quizzesPassed', 'weakArea', 'streak'],
    whatsapp: {
      templateName: 'ehb_weekly_progress_v1',
      paramOrder: ['name', 'minutesStudied', 'quizzesPassed', 'weakArea', 'streak'],
      bodyByLocale: {
        'roman-ur': '📊 {{1}} ka hafta:\n\n⏱ {{2}} minute parhai\n✅ {{3}} quiz pass\n🎯 Weak area: {{4}}\n🔥 Streak: {{5}} din\n\nAgla week behtar karein!',
        en: '📊 {{1}}\'s week:\n\n⏱ {{2}} min studied\n✅ {{3}} quizzes passed\n🎯 Weak area: {{4}}\n🔥 Streak: {{5}} days\n\nKeep it up!',
        ur: '📊 {{1}} کا ہفتہ:\n⏱ {{2}} منٹ\n✅ {{3}} کوئز\n🎯 کمزوری: {{4}}\n🔥 سلسلہ: {{5}} دن',
      },
    },
    email: {
      subject: {
        'roman-ur': 'EHB AI · {{name}} ka weekly progress',
        en: 'EHB AI · {{name}}\'s weekly progress',
        ur: 'EHB AI · {{name}} کی ہفتہ وار پیش رفت',
      },
      text: {
        'roman-ur': '{{name}}, is hafte aap ne {{minutesStudied}} minute parhai ki, {{quizzesPassed}} quiz pass kiye, weak area: {{weakArea}}. Streak: {{streak}} din.\n\nDashboard: https://ehb.ai/dashboard',
        en: '{{name}}, this week you studied for {{minutesStudied}} minutes, passed {{quizzesPassed}} quizzes, weak area: {{weakArea}}. Streak: {{streak}} days.\n\nDashboard: https://ehb.ai/dashboard',
        ur: '{{name}}، اس ہفتہ آپ نے {{minutesStudied}} منٹ پڑھائی کی۔ کوئز پاس: {{quizzesPassed}}۔',
      },
      html: {
        'roman-ur':
          '<h2 style="font-family:DM Sans,sans-serif">📊 {{name}} ka hafta</h2><ul><li>⏱ {{minutesStudied}} minute parhai</li><li>✅ {{quizzesPassed}} quiz pass</li><li>🎯 Weak area: {{weakArea}}</li><li>🔥 Streak: {{streak}} din</li></ul><p><a href="https://ehb.ai/dashboard" style="background:#7B6EF6;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none">Dashboard kholein</a></p>',
        en:
          '<h2 style="font-family:DM Sans,sans-serif">📊 {{name}}\'s week</h2><ul><li>⏱ {{minutesStudied}} min studied</li><li>✅ {{quizzesPassed}} quizzes</li><li>🎯 Weak area: {{weakArea}}</li><li>🔥 Streak: {{streak}} days</li></ul><p><a href="https://ehb.ai/dashboard" style="background:#7B6EF6;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none">Open dashboard</a></p>',
        ur:
          '<h2 dir="rtl" style="font-family:Noto Nastaliq Urdu,sans-serif">📊 {{name}} کا ہفتہ</h2><ul dir="rtl"><li>⏱ {{minutesStudied}} منٹ</li><li>✅ {{quizzesPassed}} کوئز</li></ul>',
      },
    },
  },

  // 5. Tutor onboarding complete — SMS + Email
  'tutor.onboarding-complete': {
    id: 'tutor.onboarding-complete',
    description: 'Sub-tutor passed PSS+CRB · ready to teach',
    channels: ['sms', 'email'],
    variables: ['name', 'subType', 'dashboardLink'],
    sms: {
      'roman-ur': 'Mubarak {{name}}! Aap {{subType}} verify ho gaye. Pehla tasleem: {{dashboardLink}}',
      en: 'Congrats {{name}}! You are verified as {{subType}}. First task: {{dashboardLink}}',
      ur: 'مبارک {{name}}! آپ {{subType}} ویریفائی۔ {{dashboardLink}}',
    },
    email: {
      subject: {
        'roman-ur': '🎉 Aap EHB AI tutor ban gaye',
        en: '🎉 You are now an EHB AI tutor',
        ur: '🎉 آپ EHB AI ٹیوٹر بن گئے',
      },
      text: {
        'roman-ur': 'Mubarak ho {{name}}! PSS L4 + CRB exam pass · ab aap {{subType}} hain. Login: {{dashboardLink}}\n\nPehli class lene ke liye dashboard kholein.',
        en: 'Congratulations {{name}}! PSS L4 + CRB exam passed. You are now {{subType}}. Login: {{dashboardLink}}\n\nOpen dashboard to take first class.',
        ur: 'مبارک {{name}}! آپ ویریفائی ہو گئے۔ {{dashboardLink}}',
      },
      html: {
        'roman-ur':
          '<h2>🎉 Mubarak {{name}}!</h2><p>PSS L4 + CRB exam pass · ab aap <strong>{{subType}}</strong> hain.</p><p><a href="{{dashboardLink}}" style="background:#2BBFA0;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none">Tutor Dashboard kholein</a></p>',
        en:
          '<h2>🎉 Welcome {{name}}!</h2><p>PSS L4 + CRB passed · you are now <strong>{{subType}}</strong>.</p><p><a href="{{dashboardLink}}" style="background:#2BBFA0;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none">Open Tutor Dashboard</a></p>',
        ur:
          '<h2 dir="rtl">🎉 مبارک {{name}}!</h2>',
      },
    },
  },

  // 6. First earning — gamification · WhatsApp + SMS
  'tutor.first-earning': {
    id: 'tutor.first-earning',
    description: 'Sub-tutor earned first payment',
    channels: ['whatsapp', 'sms'],
    variables: ['name', 'amount', 'studentName'],
    sms: {
      'roman-ur': '🎉 {{name}}! Aap ne ₨{{amount}} kamaye · {{studentName}} ne aap ko select kiya. Wallet check karein.',
      en: '🎉 {{name}}! You earned ₨{{amount}} · {{studentName}} chose you. Check wallet.',
      ur: '🎉 {{name}}! ₨{{amount}} کمائے · {{studentName}} نے منتخب کیا۔',
    },
    whatsapp: {
      templateName: 'ehb_tutor_first_earning_v1',
      paramOrder: ['name', 'amount', 'studentName'],
      bodyByLocale: {
        'roman-ur': '🎉🎉 BAHUT MUBARAK {{1}}!\n\nAap ne EHB AI per pehla ₨{{2}} kamaya.\n\n👨‍🎓 Student: {{3}}\n\nAaj pehla qadam · kal bahut bara safar. Keep going!\n\nWallet: https://ehb.ai/wallet',
        en: '🎉🎉 CONGRATS {{1}}!\n\nYou earned your first ₨{{2}} on EHB AI.\n\n👨‍🎓 Student: {{3}}\n\nFirst step today · big journey ahead. Keep going!\n\nWallet: https://ehb.ai/wallet',
        ur: '🎉🎉 مبارک {{1}}!\nپہلی کمائی ₨{{2}}۔',
      },
    },
  },

  // 7. Payout confirmed — SMS + Email
  'payout.confirmed': {
    id: 'payout.confirmed',
    description: 'Withdrawal to bank/JazzCash confirmed',
    channels: ['sms', 'email'],
    variables: ['amount', 'method', 'reference'],
    sms: {
      'roman-ur': 'EHB: ₨{{amount}} {{method}} pe transfer · Ref: {{reference}}. 24 ghante me account me.',
      en: 'EHB: ₨{{amount}} sent via {{method}} · Ref: {{reference}}. Within 24h in account.',
      ur: 'EHB: ₨{{amount}} {{method}} ٹرانسفر · Ref: {{reference}}',
    },
    email: {
      subject: {
        'roman-ur': 'EHB · ₨{{amount}} payout confirmed',
        en: 'EHB · ₨{{amount}} payout confirmed',
        ur: 'EHB · ₨{{amount}} ادائیگی',
      },
      text: {
        'roman-ur': '₨{{amount}} {{method}} pe bhej diye gaye hain. Reference: {{reference}}. 24 ghante me account me reach hoga.\n\nSawal ho to support@ehb.ai',
        en: '₨{{amount}} sent via {{method}}. Reference: {{reference}}. Reaches account within 24h.\n\nQuestions: support@ehb.ai',
        ur: '₨{{amount}} ادائیگی · Ref: {{reference}}',
      },
      html: {
        'roman-ur': '<p>₨{{amount}} {{method}} pe bhej diye gaye · <strong>Ref: {{reference}}</strong>.</p><p>24 ghante me account me reach hoga.</p>',
        en: '<p>₨{{amount}} sent via {{method}} · <strong>Ref: {{reference}}</strong>.</p><p>Reaches account within 24h.</p>',
        ur: '<p dir="rtl">₨{{amount}} ادائیگی · Ref: {{reference}}</p>',
      },
    },
  },

  // 8. CRB cert expiring — SMS + Email · refill workflow
  'refill.cert-expiring': {
    id: 'refill.cert-expiring',
    description: 'CRB certificate expires in 30 days · refill required',
    channels: ['sms', 'email', 'push'],
    variables: ['name', 'certName', 'daysLeft', 'refillLink'],
    sms: {
      'roman-ur': '⚠️ {{name}}: {{certName}} {{daysLeft}} din me expire hoga. Refill: {{refillLink}}',
      en: '⚠️ {{name}}: {{certName}} expires in {{daysLeft}} days. Refill: {{refillLink}}',
      ur: '⚠️ {{name}}: {{certName}} {{daysLeft}} دن میں ختم۔',
    },
    push: {
      title: {
        'roman-ur': '⚠️ Cert expire ho rahi hai',
        en: '⚠️ Cert expiring soon',
        ur: '⚠️ سرٹیفکیٹ ختم',
      },
      body: {
        'roman-ur': '{{certName}} sirf {{daysLeft}} din baqi · refill abhi karein',
        en: '{{certName}} only {{daysLeft}} days left · refill now',
        ur: '{{certName}} {{daysLeft}} دن باقی',
      },
    },
    email: {
      subject: {
        'roman-ur': '⚠️ {{certName}} {{daysLeft}} din me expire',
        en: '⚠️ {{certName}} expires in {{daysLeft}} days',
        ur: '⚠️ {{certName}} ختم',
      },
      text: {
        'roman-ur': 'Aap ka {{certName}} {{daysLeft}} din me expire ho ga. Time pe refill na kiya to aap ka STL gir sakta hai · listings pause ho jayengi.\n\nRefill abhi karein: {{refillLink}}',
        en: 'Your {{certName}} expires in {{daysLeft}} days. If not refilled, your STL may drop · listings paused.\n\nRefill now: {{refillLink}}',
        ur: '{{certName}} {{daysLeft}} دن میں ختم۔',
      },
      html: {
        'roman-ur': '<p>⚠️ <strong>{{certName}}</strong> {{daysLeft}} din me expire ho ga.</p><p>Refill na kiya to STL girega · listings pause.</p><p><a href="{{refillLink}}" style="background:#F0A030;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none">Refill abhi karein</a></p>',
        en: '<p>⚠️ <strong>{{certName}}</strong> expires in {{daysLeft}} days.</p><p><a href="{{refillLink}}" style="background:#F0A030;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none">Refill now</a></p>',
        ur: '<p dir="rtl">⚠️ <strong>{{certName}}</strong> {{daysLeft}} دن باقی۔</p>',
      },
    },
  },

  // 9. Complaint received — SMS · DMO acknowledgment
  'complaint.received': {
    id: 'complaint.received',
    description: 'DMO complaint received and queued',
    channels: ['sms', 'email'],
    variables: ['complaintId', 'slaHours'],
    sms: {
      'roman-ur': 'EHB: Aap ki complaint {{complaintId}} receive ho gayi. {{slaHours}} ghante me jawab milega.',
      en: 'EHB: Complaint {{complaintId}} received. Reply within {{slaHours}} hours.',
      ur: 'EHB: شکایت {{complaintId}} موصول · {{slaHours}} گھنٹے میں جواب۔',
    },
    email: {
      subject: {
        'roman-ur': 'EHB Complaint #{{complaintId}} received',
        en: 'EHB Complaint #{{complaintId}} received',
        ur: 'EHB شکایت #{{complaintId}}',
      },
      text: {
        'roman-ur': 'Complaint ID: {{complaintId}}. {{slaHours}} ghante ke andar DMO officer se jawab milega.\n\nStatus check: https://ehb.ai/complaints/{{complaintId}}',
        en: 'Complaint ID: {{complaintId}}. DMO officer will respond within {{slaHours}} hours.\n\nStatus: https://ehb.ai/complaints/{{complaintId}}',
        ur: 'شکایت {{complaintId}} · {{slaHours}} گھنٹے۔',
      },
      html: {
        'roman-ur': '<p>Complaint ID: <strong>{{complaintId}}</strong></p><p>{{slaHours}} ghante me DMO se jawab.</p>',
        en: '<p>Complaint ID: <strong>{{complaintId}}</strong></p><p>DMO response within {{slaHours}} hours.</p>',
        ur: '<p dir="rtl">شکایت <strong>{{complaintId}}</strong></p>',
      },
    },
  },

  // 10. Account suspended — SMS · DMO action · serious tone
  'account.suspended': {
    id: 'account.suspended',
    description: 'DMO suspended account · slashing applied',
    channels: ['sms', 'email'],
    variables: ['reason', 'appealLink'],
    sms: {
      'roman-ur': '⛔ EHB: Aap ka account suspended. Wajah: {{reason}}. Appeal: {{appealLink}}',
      en: '⛔ EHB: Account suspended. Reason: {{reason}}. Appeal: {{appealLink}}',
      ur: '⛔ EHB: اکاؤنٹ معطل · {{reason}} · {{appealLink}}',
    },
    email: {
      subject: {
        'roman-ur': '⛔ EHB account suspended',
        en: '⛔ EHB account suspended',
        ur: '⛔ EHB اکاؤنٹ معطل',
      },
      text: {
        'roman-ur': 'Aap ka EHB AI account suspend kar diya gaya hai.\n\nWajah: {{reason}}\n\nAap appeal kar sakte hain (24 ghante ke andar): {{appealLink}}\n\nAppeal review · 7 din ke andar reply.',
        en: 'Your EHB AI account has been suspended.\n\nReason: {{reason}}\n\nYou may appeal within 24 hours: {{appealLink}}\n\nAppeal review takes 7 days.',
        ur: 'اکاؤنٹ معطل · {{reason}} · اپیل: {{appealLink}}',
      },
      html: {
        'roman-ur': '<h3 style="color:#dc2626">⛔ Account Suspended</h3><p>Wajah: {{reason}}</p><p><a href="{{appealLink}}">Appeal kholein (24 ghante ke andar)</a></p>',
        en: '<h3 style="color:#dc2626">⛔ Account Suspended</h3><p>Reason: {{reason}}</p><p><a href="{{appealLink}}">File appeal (within 24h)</a></p>',
        ur: '<h3 dir="rtl" style="color:#dc2626">⛔ معطل</h3>',
      },
    },
  },

  // 11. STL upgrade unlocked — gamification push + WhatsApp
  'stl.upgrade-unlocked': {
    id: 'stl.upgrade-unlocked',
    description: 'User reached new STL level',
    channels: ['push', 'whatsapp'],
    variables: ['name', 'newLevel', 'benefits'],
    push: {
      title: {
        'roman-ur': '🎉 STL L{{newLevel}} unlock!',
        en: '🎉 STL L{{newLevel}} unlocked!',
        ur: '🎉 STL L{{newLevel}}',
      },
      body: {
        'roman-ur': 'Mubarak {{name}}! Aap ne L{{newLevel}} hasil ki · {{benefits}}',
        en: 'Congrats {{name}}! You hit L{{newLevel}} · {{benefits}}',
        ur: 'مبارک {{name}}! L{{newLevel}}',
      },
    },
    whatsapp: {
      templateName: 'ehb_stl_upgrade_v1',
      paramOrder: ['name', 'newLevel', 'benefits'],
      bodyByLocale: {
        'roman-ur': '🎉 BAHUT MUBARAK {{1}}!\n\nAap ne STL Level {{2}} hasil kar liya.\n\nNaya benefit: {{3}}\n\nAur upar jane ke liye improvement path: https://ehb.ai/stl/path',
        en: '🎉 CONGRATS {{1}}!\n\nYou reached STL Level {{2}}.\n\nNew benefit: {{3}}\n\nKeep climbing: https://ehb.ai/stl/path',
        ur: '🎉 {{1}}! L{{2}} مبارک · {{3}}',
      },
    },
  },

  // 12. Streak broken — push only · gentle re-engagement
  'quiz.streak-broken': {
    id: 'quiz.streak-broken',
    description: 'Daily streak broken · gentle nudge',
    channels: ['push'],
    variables: ['name', 'previousStreak'],
    push: {
      title: {
        'roman-ur': '😢 Streak toot gayi',
        en: '😢 Streak broken',
        ur: '😢 سلسلہ ٹوٹا',
      },
      body: {
        'roman-ur': '{{name}}, {{previousStreak}} din ki streak khatm hui. Aaj phir start karein!',
        en: '{{name}}, your {{previousStreak}}-day streak ended. Start fresh today!',
        ur: '{{name}}، {{previousStreak}} دن کا سلسلہ۔',
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Renderer · interpolates {{var}} and computes SMS segments
// ─────────────────────────────────────────────────────────────────────────────

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+|\d+)\}\}/g, (_, key) => {
    const v = vars[key];
    return v === undefined || v === null ? '' : String(v);
  });
}

// GSM-7 character set (most common subset · Latin only)
const GSM7_RE =
  /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\[~\]|€]+$/;

export function detectSmsEncoding(text: string): 'gsm-7' | 'unicode' {
  return GSM7_RE.test(text) ? 'gsm-7' : 'unicode';
}

export function countSmsSegments(text: string, encoding: 'gsm-7' | 'unicode'): number {
  const len = text.length;
  if (encoding === 'gsm-7') {
    if (len <= 160) return 1;
    return Math.ceil(len / 153); // multipart overhead
  }
  if (len <= 70) return 1;
  return Math.ceil(len / 67);
}

export function renderSms(
  id: TemplateId,
  vars: Record<string, string | number>,
  locale: Locale = 'roman-ur',
): RenderedSms | null {
  const tpl = TEMPLATES[id];
  if (!tpl?.sms) return null;
  const raw = tpl.sms[locale] ?? tpl.sms['roman-ur'];
  const text = interpolate(raw, vars);
  const encoding = detectSmsEncoding(text);
  const segments = countSmsSegments(text, encoding);
  return { text, segments, encoding };
}

export function renderWhatsApp(
  id: TemplateId,
  vars: Record<string, string | number>,
  locale: Locale = 'roman-ur',
): RenderedWhatsApp | null {
  const tpl = TEMPLATES[id];
  if (!tpl?.whatsapp) return null;
  const wa = tpl.whatsapp;
  const body = wa.bodyByLocale[locale] ?? wa.bodyByLocale['roman-ur'];

  // WhatsApp uses positional {{1}}, {{2}}, ... — map by paramOrder
  const params = wa.paramOrder.map((key) => ({
    type: 'text' as const,
    text: String(vars[key] ?? ''),
  }));

  // Preview · interpolate positionals back for logging
  let preview = body;
  wa.paramOrder.forEach((key, i) => {
    preview = preview.replace(new RegExp(`\\{\\{${i + 1}\\}\\}`, 'g'), String(vars[key] ?? ''));
  });

  return {
    templateName: wa.templateName,
    language: locale === 'ur' ? 'ur' : locale === 'en' ? 'en' : 'en', // roman-ur ships as en in WA
    components: [{ type: 'body', parameters: params }],
    preview,
  };
}

export function renderEmail(
  id: TemplateId,
  vars: Record<string, string | number>,
  locale: Locale = 'roman-ur',
): RenderedEmail | null {
  const tpl = TEMPLATES[id];
  if (!tpl?.email) return null;
  const e = tpl.email;
  return {
    subject: interpolate(e.subject[locale] ?? e.subject['roman-ur'], vars),
    text: interpolate(e.text[locale] ?? e.text['roman-ur'], vars),
    html: interpolate(e.html[locale] ?? e.html['roman-ur'], vars),
  };
}

export function renderPush(
  id: TemplateId,
  vars: Record<string, string | number>,
  locale: Locale = 'roman-ur',
): RenderedPush | null {
  const tpl = TEMPLATES[id];
  if (!tpl?.push) return null;
  return {
    title: interpolate(tpl.push.title[locale] ?? tpl.push.title['roman-ur'], vars),
    body: interpolate(tpl.push.body[locale] ?? tpl.push.body['roman-ur'], vars),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Validator · verifies all required vars are present + char limits
// ─────────────────────────────────────────────────────────────────────────────

export type ValidationResult = {
  ok: boolean;
  missingVars: string[];
  warnings: string[];
};

export function validateTemplate(
  id: TemplateId,
  vars: Record<string, string | number>,
): ValidationResult {
  const tpl = TEMPLATES[id];
  if (!tpl) return { ok: false, missingVars: [], warnings: [`unknown template: ${id}`] };

  const missing = tpl.variables.filter((k) => vars[k] === undefined || vars[k] === '');
  const warnings: string[] = [];

  // Check SMS segment count for all locales
  if (tpl.sms) {
    for (const loc of ['roman-ur', 'en', 'ur'] as Locale[]) {
      const r = renderSms(id, { ...vars, ...Object.fromEntries(missing.map((k) => [k, '___'])) }, loc);
      if (r && r.segments > 2) {
        warnings.push(`SMS ${loc}: ${r.segments} segments (>2 · cost waste)`);
      }
    }
  }

  return { ok: missing.length === 0, missingVars: missing, warnings };
}

// ─────────────────────────────────────────────────────────────────────────────
// Convenience: render all enabled channels for a single notification
// ─────────────────────────────────────────────────────────────────────────────

export type RenderedNotification = {
  id: TemplateId;
  locale: Locale;
  sms?: RenderedSms;
  whatsapp?: RenderedWhatsApp;
  email?: RenderedEmail;
  push?: RenderedPush;
  validation: ValidationResult;
};

export function renderAll(
  id: TemplateId,
  vars: Record<string, string | number>,
  locale: Locale = 'roman-ur',
): RenderedNotification {
  const tpl = TEMPLATES[id];
  const validation = validateTemplate(id, vars);
  const out: RenderedNotification = { id, locale, validation };
  if (!tpl) return out;
  if (tpl.channels.includes('sms')) out.sms = renderSms(id, vars, locale) ?? undefined;
  if (tpl.channels.includes('whatsapp')) out.whatsapp = renderWhatsApp(id, vars, locale) ?? undefined;
  if (tpl.channels.includes('email')) out.email = renderEmail(id, vars, locale) ?? undefined;
  if (tpl.channels.includes('push')) out.push = renderPush(id, vars, locale) ?? undefined;
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Export list for admin UI / testing
// ─────────────────────────────────────────────────────────────────────────────

export function listTemplates(): Array<{ id: TemplateId; description: string; channels: Channel[]; variables: string[] }> {
  return Object.values(TEMPLATES).map(({ id, description, channels, variables }) => ({
    id,
    description,
    channels,
    variables,
  }));
}
