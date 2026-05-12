/**
 * EHB Education AI · Learning Page Demo Data + Types
 *
 * Used by: apps/web/app/education/learn/[subjectId]/page.tsx
 *
 * Production: replace with API calls to:
 * - GET /api/courses/:id (curriculum + chapters)
 * - GET /api/progress/:userId/:subjectId (progress data)
 * - GET /api/notes/:userId (saved notes)
 * - GET /api/bookmarks/:userId (saved bookmarks)
 *
 * Per File 1 (Master Data Index) + File 3 (Integration Plan §6) for STL display.
 */

export interface Chapter {
  id: string;
  number: number;
  title: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  emoji: string;
  classGrade: string;
  curriculumRef: string; // e.g., "FBISE Class 5"
  chapters: Chapter[];
  currentChapterId: string;
  progressPct: number;
  courseStl: number;
  tutorStl?: number;
  tutorName?: string;
  institutionStl?: number;
  institutionName?: string;
}

export interface Note {
  id: string;
  text: string;
  chapterId: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  chapterId: string;
  page: number;
  note?: string;
}

export interface AiTutorMode {
  id: 'explain' | 'eli5' | 'summary' | 'quiz' | 'ask' | 'weak' | 'notes' | 'crash';
  label: string;
  emoji: string;
  description: string;
}

export const AI_TUTOR_MODES: AiTutorMode[] = [
  { id: 'explain', label: 'Explain', emoji: '💬', description: 'Clear explanation' },
  { id: 'eli5', label: 'ELI5', emoji: '🍼', description: 'Like I am 5' },
  { id: 'summary', label: 'Summary', emoji: '📋', description: '3-5 bullets' },
  { id: 'quiz', label: 'Quiz me', emoji: '❓', description: '3 adaptive Qs' },
  { id: 'ask', label: 'Ask AI', emoji: '💭', description: 'Custom question' },
  { id: 'weak', label: 'Weak Areas', emoji: '🎯', description: 'My gaps' },
  { id: 'notes', label: 'AI Notes', emoji: '📝', description: 'Generate notes' },
  { id: 'crash', label: 'Crash', emoji: '⚡', description: '2-min priority' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA · Pakistani context · realistic FBISE Class 5 Math
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_SUBJECT: Subject = {
  id: 'math-class5',
  code: 'EDU-MATH-G5',
  name: 'Mathematics',
  emoji: '🧮',
  classGrade: 'Class 5',
  curriculumRef: 'FBISE Class 5',
  currentChapterId: 'ch-4',
  progressPct: 60,
  courseStl: 5,
  tutorStl: 6,
  tutorName: 'Sir Salman Ahmad',
  institutionStl: 7,
  institutionName: 'ABC Academy Islamabad',
  chapters: [
    { id: 'ch-1', number: 1, title: 'Numbers', status: 'completed' },
    { id: 'ch-2', number: 2, title: 'Operations', status: 'completed' },
    { id: 'ch-3', number: 3, title: 'Money', status: 'completed' },
    { id: 'ch-4', number: 4, title: 'Fractions', status: 'in-progress' },
    { id: 'ch-5', number: 5, title: 'Decimals', status: 'not-started' },
    { id: 'ch-6', number: 6, title: 'Percentages', status: 'not-started' },
    { id: 'ch-7', number: 7, title: 'Geometry', status: 'not-started' },
  ],
};

export const DEMO_SUBJECTS_LIST: Pick<Subject, 'id' | 'name' | 'emoji'>[] = [
  { id: 'math-class5', name: 'Math', emoji: '🧮' },
  { id: 'science-class5', name: 'Science', emoji: '🔬' },
  { id: 'english-class5', name: 'English', emoji: '📖' },
  { id: 'urdu-class5', name: 'Urdu', emoji: '📜' },
  { id: 'islamiat-class5', name: 'Islamiat', emoji: '🕌' },
  { id: 'pakstud-class5', name: 'Pak Studies', emoji: '🌍' },
];

export const DEMO_NOTES: Note[] = [
  { id: 'n1', text: 'Fraction = part of whole', chapterId: 'ch-4', createdAt: '2026-05-08' },
  { id: 'n2', text: '½ + ¼ = ¾ · samajh aaya', chapterId: 'ch-4', createdAt: '2026-05-08' },
  { id: 'n3', text: 'Pizza example helpful', chapterId: 'ch-4', createdAt: '2026-05-07' },
];

export const DEMO_BOOKMARKS: Bookmark[] = [
  { id: 'b1', chapterId: 'ch-4', page: 2, note: 'Pizza example' },
  { id: 'b2', chapterId: 'ch-3', page: 5, note: 'Money word problems' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMO BOOK CONTENT (Math Ch 4 · Fractions)
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_CHAPTER_CONTENT = {
  chapterId: 'ch-4',
  title: 'Chapter 4: Fractions',
  curriculum: 'FBISE · Class 5 · Mathematics',
  sections: [
    {
      id: 's1',
      heading: 'Fraction kya hai?',
      paragraphs: [
        'Fractions wo numbers hain jo poora number ko hisson me divide karte hain. Jab aap kisi cheez ko equal parts me todte hain · har part ek fraction hota hai.',
      ],
      visual: {
        type: 'fraction-chart',
        items: [
          { value: '½', label: 'aadha' },
          { value: '¼', label: 'paauwa' },
          { value: '¾', label: 'paun' },
          { value: '1', label: 'poora' },
        ],
      },
    },
    {
      id: 's2',
      heading: 'Example · Pizza ka hisab',
      paragraphs: [
        'Aap ke pas 1 pizza hai. Aap ne 4 doston me share ki. Har dost ko kitna mila?',
      ],
      example: {
        question: '1 pizza ÷ 4 dost = ?',
        answer: '¼ pizza per dost',
        explanation: 'Har dost ko quarter (paauwa) pizza mila.',
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// AI TUTOR DEMO RESPONSES (per mode · for prototype demo · production = real LLM)
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_AI_RESPONSES: Record<AiTutorMode['id'], string> = {
  explain:
    'Fractions wo numbers hain jab aap kisi cheez ko equal parts me todte hain. Jaise ek roti ko aap aadha aadha karein · to har piece ½ kehlata hai. Fractions hamein chhote hisson me cheezon ko measure karna sikhati hain. Aap iss chapter ke baad pizza · roti · paani — sab ko fractions me soch sakte hain. Kya aap chahte hain ke main ek aur example dikhao?',
  eli5:
    'Beta · imagine aap ke ammi roti banati hain · ek poori roti hoti hai. 🍞\n\nAap ne aadhi roti khaayi · to aap ne ½ (aadhi) khaayi.\nBachi hui aadhi roti chhoti behen ko di · usne ½ khaayi.\nDono ne mil kar poori roti khaayi.\n\nYehi fraction hai. Roti hi sab kuch samjhati hai 😊\n\nKya aap khud koi example soch sakte hain?',
  summary:
    '**3 main ideas:**\n\n• Fraction = poora cheez ke chhote hisse\n• ½ aadha · ¼ paauwa · ¾ paun · 1 poora\n• Roz ki cheezein (roti · pizza · paani) sab fractions me ho sakti hain\n\nNext: addition aur subtraction with fractions.',
  quiz:
    '**Quiz time! 3 questions adaptive.**\n\n**Q1:** Aap ne 1 pizza ko 4 doston me share kiya. Har dost ko kitna mila?\n\nA) ½  B) ¼  C) ¾  D) 1\n\nAap ka jawab? (B button click karein)',
  ask: 'Salam · main aap ka AI tutor hu. Aap fractions ke baare me kuch bhi pooch sakte hain — example pooche · explain karwa lein · quiz le lein. Bas type karein!',
  weak: '**Aap ki weak areas (last 7 days):**\n\n🎯 Math · Fractions · 60% accuracy (improving!)\n🎯 Math · Decimals · 45% accuracy (focus needed)\n🎯 Science · Photosynthesis · 50% accuracy\n\n**Suggested:** 5 min revision of fractions · phir decimals start karein.',
  notes:
    '**AI-generated notes for Chapter 4:**\n\n📝 **Key concepts:**\n- Fraction = part of whole\n- Numerator (upar) = kitne parts liye\n- Denominator (neeche) = total parts\n\n📝 **Examples to remember:**\n- 1 roti ÷ 2 = ½ each\n- 1 pizza ÷ 4 = ¼ each\n- 3 of 4 parts = ¾\n\n📝 **Common mistakes:**\n- ½ ≠ ¼ (different sizes!)\n- ¾ > ½ (more parts)\n\n[Save to my notes?] [Edit]',
  crash:
    '**⚡ 2-Minute Crash · Fractions**\n\n1️⃣ Fraction = poora cheez ke chhote hisse\n2️⃣ Format: numerator/denominator\n3️⃣ ½ = aadha · ¼ = paauwa · ¾ = paun\n4️⃣ Real-life: roti · pizza · ghariyaan\n5️⃣ Add same denominator: ¼ + ¼ = ½\n6️⃣ Compare: ¾ > ½ > ¼\n\n**Done. Aap ready hain quiz ke liye.**',
};

// ─────────────────────────────────────────────────────────────────────────────
// SUGGESTION CHIPS (per AI Tutor response)
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_SUGGESTION_CHIPS: Record<AiTutorMode['id'], string[]> = {
  explain: ['Aur examples', 'Quiz mujhe karo', 'Yeh hard hai'],
  eli5: ['Roti example aur', 'Quiz lo', 'Same level continue'],
  summary: ['Detail me explain', 'Quiz mujhe karo', 'Save to notes'],
  quiz: ['Wrong answer · explain', 'Easier Q', 'Skip · next chapter'],
  ask: ['Math help', 'Yeh chapter ka topic', 'Career advice'],
  weak: ['Decimals revise', 'Fractions practice', 'Set goal'],
  notes: ['Save to notes', 'Edit notes', 'Add example'],
  crash: ['Quiz mujhe', 'Detailed version', 'Save crash'],
};

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTION AGT_TUTOR PROMPT RUBRIC (per Production Blueprint §6.4)
// Used by: services/api/src/services/aiTutor.js (or services/ai-core/agentEngine.js)
// ─────────────────────────────────────────────────────────────────────────────

export const AGT_TUTOR_SYSTEM_PROMPT = `You are an EHB Education AI tutor.
You are NOT a chatbot. You are a friendly Pakistani teacher.

Rules:
1. Match the student's language (Urdu / Roman Urdu / English).
   Code-switch naturally when needed.
2. Use simple words. Real-life examples from Pakistan
   (cricket · biryani · Lahore · Karachi · school · ammi · papa).
3. Maximum 3 short paragraphs unless the student asks for more.
4. NEVER quote textbook definitions verbatim — explain in your own words.
5. End with ONE follow-up question to keep them engaged.
6. If the topic is sensitive (medical · legal · billing · self-harm),
   route to human queue immediately. NEVER answer from AI.
7. Mistakes? Apologize lightly. Move on. NEVER blame the student.

Student level: {STUDENT_LEVEL}
Subject: {SUBJECT}
Current chapter: {CHAPTER}
Weak areas: {WEAK_AREAS}
Preferred language: {LANGUAGE_PREF}
Mode: {MODE: explain | eli5 | summary | quiz | crash | ask | weak | notes}`;
