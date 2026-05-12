/**
 * Education AI — mock data layer.
 *
 * Source of truth: ehb-info/15-ui-system/EDUCATION-AI-DASHBOARD.md
 *
 * Phase 1 ships with seeded mock data so the dashboard works offline.
 * Production swap-in: fetch from `/api/education/{subjects,classes,institutions,books}`.
 */

export type Level = 'school' | 'college' | 'university' | 'professional';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  pillar: 'STEM' | 'Languages' | 'Social' | 'Arts' | 'Religious';
  levels: Level[];
}

export interface Institution {
  id: string;
  name: string;
  city: string;
  country: string;
  type: 'school' | 'college' | 'university';
  isEhbVerified: boolean;
  stlLevel: number;
  studentsEnrolled?: number;
  registrationNumber?: string;
}

export interface Book {
  id: string;
  title: string;
  subject: string;       // subject id
  classId: string;       // e.g. "school-9", "uni-bs-cs-2"
  board: string;         // e.g. "Punjab Textbook Board"
  author?: string;
  edition?: string;
  pages: number;
  chapterCount: number;
  coverColor: string;    // hex for cover
  stlLevel: number;      // 1–10
  verifier: string;      // adara/board name
  verifierStl: number;   // adara's own STL
  verifiedBy?: string;   // person name
  verifiedAt?: string;   // ISO
  globalReadersThisMonth: number;
}

export interface ClassDef {
  id: string;
  label: string;        // "Grade 9" / "BS CS — Year 2"
  level: Level;
  subjects: string[];   // subject ids
  board?: string;
}

// =============================================================================
// SUBJECTS — Pakistan-first, expandable
// =============================================================================
export const SUBJECTS: Subject[] = [
  { id: 'math',      name: 'Mathematics',      icon: '🧮', pillar: 'STEM',     levels: ['school', 'college', 'university'] },
  { id: 'physics',   name: 'Physics',          icon: '⚛️', pillar: 'STEM',     levels: ['school', 'college', 'university'] },
  { id: 'chemistry', name: 'Chemistry',        icon: '🧪', pillar: 'STEM',     levels: ['school', 'college', 'university'] },
  { id: 'biology',   name: 'Biology',          icon: '🌱', pillar: 'STEM',     levels: ['school', 'college', 'university'] },
  { id: 'computer',  name: 'Computer Science', icon: '💻', pillar: 'STEM',     levels: ['school', 'college', 'university', 'professional'] },
  { id: 'english',   name: 'English',          icon: '🔤', pillar: 'Languages',levels: ['school', 'college', 'university'] },
  { id: 'urdu',      name: 'Urdu',             icon: '🇵🇰', pillar: 'Languages',levels: ['school', 'college', 'university'] },
  { id: 'arabic',    name: 'Arabic',           icon: '🇸🇦', pillar: 'Languages',levels: ['school', 'college', 'university'] },
  { id: 'islamiat',  name: 'Islamiat',         icon: '🕌', pillar: 'Religious',levels: ['school', 'college', 'university'] },
  { id: 'pak-studies', name: 'Pakistan Studies', icon: '🇵🇰', pillar: 'Social',  levels: ['school', 'college', 'university'] },
  { id: 'history',   name: 'History',          icon: '📜', pillar: 'Social',   levels: ['school', 'college', 'university'] },
  { id: 'geography', name: 'Geography',        icon: '🗺️', pillar: 'Social',   levels: ['school', 'college', 'university'] },
  { id: 'economics', name: 'Economics',        icon: '📈', pillar: 'Social',   levels: ['college', 'university', 'professional'] },
  { id: 'accounting',name: 'Accounting',       icon: '📒', pillar: 'Social',   levels: ['college', 'university', 'professional'] },
  { id: 'art',       name: 'Art & Design',     icon: '🎨', pillar: 'Arts',     levels: ['school', 'college', 'university'] },
  { id: 'psychology',name: 'Psychology',       icon: '🧠', pillar: 'Social',   levels: ['college', 'university'] },
];

// =============================================================================
// CLASSES — sample (production: dynamic per board)
// =============================================================================
export const CLASSES: ClassDef[] = [
  // School grades
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `school-${i + 1}`,
    label: `Grade ${i + 1}`,
    level: 'school' as const,
    subjects: ['math', 'english', 'urdu', 'pak-studies', 'islamiat', 'science', 'physics', 'chemistry', 'biology', 'computer'],
    board: 'Punjab Textbook Board',
  })),
  // College
  { id: 'college-fsc-1', label: 'F.Sc Pre-Medical · Year 1', level: 'college', subjects: ['physics', 'chemistry', 'biology', 'english', 'urdu'], board: 'BISE Lahore' },
  { id: 'college-fsc-2', label: 'F.Sc Pre-Medical · Year 2', level: 'college', subjects: ['physics', 'chemistry', 'biology', 'english', 'pak-studies'], board: 'BISE Lahore' },
  { id: 'college-fsc-eng-1', label: 'F.Sc Pre-Engineering · Year 1', level: 'college', subjects: ['physics', 'chemistry', 'math', 'english', 'urdu'], board: 'BISE Lahore' },
  { id: 'college-ics-1', label: 'I.C.S · Year 1', level: 'college', subjects: ['physics', 'math', 'computer', 'english', 'urdu'], board: 'BISE Lahore' },
  { id: 'college-icom-1', label: 'I.Com · Year 1', level: 'college', subjects: ['accounting', 'economics', 'english', 'urdu', 'islamiat'], board: 'BISE Lahore' },
  // University
  { id: 'uni-bs-cs-2', label: 'BS Computer Science · Year 2', level: 'university', subjects: ['computer', 'math', 'physics'], board: 'HEC' },
  { id: 'uni-bs-eco-1', label: 'BS Economics · Year 1', level: 'university', subjects: ['economics', 'math', 'english'], board: 'HEC' },
  { id: 'uni-mbbs-1', label: 'MBBS · Year 1', level: 'university', subjects: ['biology', 'chemistry', 'physics', 'english'], board: 'PMC' },
  { id: 'uni-llb-1', label: 'LLB · Year 1', level: 'university', subjects: ['english', 'history'], board: 'HEC' },
];

// =============================================================================
// INSTITUTIONS — sample seeded (production: full DB)
// =============================================================================
export const INSTITUTIONS: Institution[] = [
  { id: 'ins-1',  name: 'Beaconhouse School System',         city: 'Lahore',   country: 'PK', type: 'school',     isEhbVerified: true,  stlLevel: 8, studentsEnrolled: 12400, registrationNumber: 'PUN-EDU-001' },
  { id: 'ins-2',  name: 'The City School',                   city: 'Karachi',  country: 'PK', type: 'school',     isEhbVerified: true,  stlLevel: 7, studentsEnrolled: 9800,  registrationNumber: 'SND-EDU-014' },
  { id: 'ins-3',  name: 'Aitchison College',                 city: 'Lahore',   country: 'PK', type: 'college',    isEhbVerified: true,  stlLevel: 9, studentsEnrolled: 1100,  registrationNumber: 'PUN-COL-002' },
  { id: 'ins-4',  name: 'Lahore Grammar School',             city: 'Lahore',   country: 'PK', type: 'school',     isEhbVerified: true,  stlLevel: 8, studentsEnrolled: 5400,  registrationNumber: 'PUN-EDU-003' },
  { id: 'ins-5',  name: 'LUMS — Lahore Univ of Management',  city: 'Lahore',   country: 'PK', type: 'university', isEhbVerified: true,  stlLevel: 9, studentsEnrolled: 4200,  registrationNumber: 'HEC-UNI-007' },
  { id: 'ins-6',  name: 'NUST — Nat University Sci & Tech',  city: 'Islamabad',country: 'PK', type: 'university', isEhbVerified: true,  stlLevel: 9, studentsEnrolled: 9000,  registrationNumber: 'HEC-UNI-001' },
  { id: 'ins-7',  name: 'Aga Khan University',               city: 'Karachi',  country: 'PK', type: 'university', isEhbVerified: true,  stlLevel: 10, studentsEnrolled: 2800, registrationNumber: 'HEC-UNI-022' },
  { id: 'ins-8',  name: 'Roots International School',        city: 'Islamabad',country: 'PK', type: 'school',     isEhbVerified: false, stlLevel: 5, studentsEnrolled: 3200 },
  { id: 'ins-9',  name: 'King Saud University',              city: 'Riyadh',   country: 'SA', type: 'university', isEhbVerified: true,  stlLevel: 9, studentsEnrolled: 60000, registrationNumber: 'SA-MOE-001' },
  { id: 'ins-10', name: 'American University of Sharjah',    city: 'Sharjah',  country: 'AE', type: 'university', isEhbVerified: true,  stlLevel: 9, studentsEnrolled: 5500,  registrationNumber: 'AE-KHDA-009' },
];

// =============================================================================
// BOOKS — sample seeded (production: full library)
// =============================================================================
export const BOOKS: Book[] = [
  // Grade 9 set
  { id: 'b-math-9',     title: 'Mathematics — Grade 9',          subject: 'math',     classId: 'school-9', board: 'Punjab Textbook Board', edition: '2024', pages: 287, chapterCount: 17, coverColor: '#7B6EF6', stlLevel: 7, verifier: 'Punjab Textbook Board', verifierStl: 7, verifiedBy: 'Dr. Aysha Khan',   verifiedAt: '2024-08-12', globalReadersThisMonth: 412000 },
  { id: 'b-physics-9',  title: 'Physics — Grade 9',              subject: 'physics',  classId: 'school-9', board: 'Punjab Textbook Board', edition: '2024', pages: 213, chapterCount: 12, coverColor: '#0080c8', stlLevel: 7, verifier: 'Punjab Textbook Board', verifierStl: 7, verifiedBy: 'Prof. Tahir Ali',  verifiedAt: '2024-07-20', globalReadersThisMonth: 388000 },
  { id: 'b-chem-9',     title: 'Chemistry — Grade 9',            subject: 'chemistry',classId: 'school-9', board: 'Punjab Textbook Board', edition: '2024', pages: 198, chapterCount: 10, coverColor: '#1D9E75', stlLevel: 7, verifier: 'Punjab Textbook Board', verifierStl: 7, verifiedBy: 'Dr. Sana Shah',    verifiedAt: '2024-07-22', globalReadersThisMonth: 356000 },
  { id: 'b-biology-9',  title: 'Biology — Grade 9',              subject: 'biology',  classId: 'school-9', board: 'Punjab Textbook Board', edition: '2024', pages: 236, chapterCount: 14, coverColor: '#2BBFA0', stlLevel: 7, verifier: 'Punjab Textbook Board', verifierStl: 7, verifiedBy: 'Dr. Kamran Iqbal', verifiedAt: '2024-07-25', globalReadersThisMonth: 340000 },
  { id: 'b-english-9',  title: 'English — Grade 9',              subject: 'english',  classId: 'school-9', board: 'Punjab Textbook Board', edition: '2024', pages: 174, chapterCount: 18, coverColor: '#F0B90B', stlLevel: 7, verifier: 'Punjab Textbook Board', verifierStl: 7, verifiedBy: 'Mr. James Reid',   verifiedAt: '2024-08-01', globalReadersThisMonth: 410000 },
  { id: 'b-urdu-9',     title: 'Urdu — Grade 9',                 subject: 'urdu',     classId: 'school-9', board: 'Punjab Textbook Board', edition: '2024', pages: 167, chapterCount: 16, coverColor: '#C44D8B', stlLevel: 7, verifier: 'Punjab Textbook Board', verifierStl: 7, verifiedBy: 'Prof. Saima Riaz',  verifiedAt: '2024-08-03', globalReadersThisMonth: 312000 },
  { id: 'b-pak-9',      title: 'Pakistan Studies — Grade 9',     subject: 'pak-studies',classId:'school-9', board: 'Punjab Textbook Board', edition: '2024', pages: 142, chapterCount: 9, coverColor: '#1a7020', stlLevel: 7, verifier: 'Punjab Textbook Board', verifierStl: 7, verifiedBy: 'Dr. Shahzad Hussain', verifiedAt: '2024-07-30', globalReadersThisMonth: 290000 },
  // F.Sc Pre-Med
  { id: 'b-bio-fsc1',   title: 'Biology — F.Sc Year 1',          subject: 'biology',  classId: 'college-fsc-1', board: 'BISE Lahore', edition: '2025', pages: 412, chapterCount: 14, coverColor: '#2BBFA0', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Kashif Mehmood', verifiedAt: '2025-01-15', globalReadersThisMonth: 198000 },
  { id: 'b-chem-fsc1',  title: 'Chemistry — F.Sc Year 1',        subject: 'chemistry',classId: 'college-fsc-1', board: 'BISE Lahore', edition: '2025', pages: 388, chapterCount: 12, coverColor: '#1D9E75', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Mehwish Tariq', verifiedAt: '2025-01-18', globalReadersThisMonth: 196000 },
  { id: 'b-phy-fsc1',   title: 'Physics — F.Sc Year 1',          subject: 'physics',  classId: 'college-fsc-1', board: 'BISE Lahore', edition: '2025', pages: 364, chapterCount: 11, coverColor: '#0080c8', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Prof. Zubair Akhtar', verifiedAt: '2025-01-20', globalReadersThisMonth: 210000 },
  // BS CS Year 2
  { id: 'b-cs-os',      title: 'Operating Systems',              subject: 'computer', classId: 'uni-bs-cs-2', board: 'HEC', author: 'A. Silberschatz', edition: '10th', pages: 880, chapterCount: 19, coverColor: '#7B6EF6', stlLevel: 9, verifier: 'HEC + ACM', verifierStl: 9, verifiedBy: 'Prof. Sarmad Ishfaq', verifiedAt: '2024-09-10', globalReadersThisMonth: 850000 },
  { id: 'b-cs-algo',    title: 'Introduction to Algorithms',     subject: 'computer', classId: 'uni-bs-cs-2', board: 'HEC', author: 'CLRS', edition: '4th', pages: 1312, chapterCount: 35, coverColor: '#534AB7', stlLevel: 10, verifier: 'MIT Press · HEC reviewed', verifierStl: 10, verifiedBy: 'Prof. Asad Khan', verifiedAt: '2024-09-12', globalReadersThisMonth: 1200000 },
  { id: 'b-cs-ds',      title: 'Discrete Mathematics',           subject: 'math',     classId: 'uni-bs-cs-2', board: 'HEC', author: 'Rosen', edition: '8th', pages: 1056, chapterCount: 13, coverColor: '#F0A030', stlLevel: 9, verifier: 'McGraw-Hill · HEC reviewed', verifierStl: 9, verifiedBy: 'Dr. Rahat Hussain', verifiedAt: '2024-09-15', globalReadersThisMonth: 720000 },

  // F.Sc Pre-Med Year 2 (newly seeded)
  { id: 'b-bio-fsc2',   title: 'Biology — F.Sc Year 2',          subject: 'biology',  classId: 'college-fsc-2', board: 'BISE Lahore', edition: '2025', pages: 438, chapterCount: 15, coverColor: '#2BBFA0', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Hamza Saeed',  verifiedAt: '2025-02-10', globalReadersThisMonth: 180000 },
  { id: 'b-chem-fsc2',  title: 'Chemistry — F.Sc Year 2',        subject: 'chemistry',classId: 'college-fsc-2', board: 'BISE Lahore', edition: '2025', pages: 412, chapterCount: 13, coverColor: '#1D9E75', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Hamza Saeed',  verifiedAt: '2025-02-12', globalReadersThisMonth: 178000 },
  { id: 'b-phy-fsc2',   title: 'Physics — F.Sc Year 2',          subject: 'physics',  classId: 'college-fsc-2', board: 'BISE Lahore', edition: '2025', pages: 392, chapterCount: 12, coverColor: '#0080c8', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Prof. Ayesha Hayat', verifiedAt: '2025-02-14', globalReadersThisMonth: 192000 },
  { id: 'b-eng-fsc2',   title: 'English — F.Sc Year 2',          subject: 'english',  classId: 'college-fsc-2', board: 'BISE Lahore', edition: '2025', pages: 220, chapterCount: 16, coverColor: '#F0B90B', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Mrs. Saima Khan',  verifiedAt: '2025-02-15', globalReadersThisMonth: 165000 },
  { id: 'b-pak-fsc2',   title: 'Pakistan Studies — F.Sc Year 2', subject: 'pak-studies', classId: 'college-fsc-2', board: 'BISE Lahore', edition: '2025', pages: 184, chapterCount: 10, coverColor: '#1a7020', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Tahir Mehmood', verifiedAt: '2025-02-18', globalReadersThisMonth: 140000 },

  // F.Sc Pre-Eng Year 1
  { id: 'b-math-fsce1', title: 'Mathematics — F.Sc Pre-Eng Y1',   subject: 'math',     classId: 'college-fsc-eng-1', board: 'BISE Lahore', edition: '2025', pages: 426, chapterCount: 14, coverColor: '#7B6EF6', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Imran Ali', verifiedAt: '2025-01-25', globalReadersThisMonth: 195000 },
  { id: 'b-phy-fsce1',  title: 'Physics — F.Sc Pre-Eng Y1',       subject: 'physics',  classId: 'college-fsc-eng-1', board: 'BISE Lahore', edition: '2025', pages: 380, chapterCount: 11, coverColor: '#0080c8', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Prof. Tariq Raza', verifiedAt: '2025-01-28', globalReadersThisMonth: 188000 },
  { id: 'b-chem-fsce1', title: 'Chemistry — F.Sc Pre-Eng Y1',     subject: 'chemistry',classId: 'college-fsc-eng-1', board: 'BISE Lahore', edition: '2025', pages: 372, chapterCount: 12, coverColor: '#1D9E75', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Saba Naveed', verifiedAt: '2025-01-30', globalReadersThisMonth: 178000 },

  // I.C.S Year 1
  { id: 'b-cs-ics1',    title: 'Computer Science — I.C.S Y1',     subject: 'computer', classId: 'college-ics-1', board: 'BISE Lahore', edition: '2025', pages: 308, chapterCount: 14, coverColor: '#534AB7', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Prof. Bilal Ahmed', verifiedAt: '2025-01-22', globalReadersThisMonth: 145000 },
  { id: 'b-math-ics1',  title: 'Mathematics — I.C.S Y1',          subject: 'math',     classId: 'college-ics-1', board: 'BISE Lahore', edition: '2025', pages: 358, chapterCount: 12, coverColor: '#7B6EF6', stlLevel: 8, verifier: 'BISE Lahore', verifierStl: 8, verifiedBy: 'Dr. Imran Ali', verifiedAt: '2025-01-25', globalReadersThisMonth: 132000 },

  // I.Com Year 1
  { id: 'b-acc-icom1',  title: 'Accounting — I.Com Y1',           subject: 'accounting', classId: 'college-icom-1', board: 'BISE Lahore', edition: '2025', pages: 326, chapterCount: 13, coverColor: '#F0A030', stlLevel: 7, verifier: 'BISE Lahore', verifierStl: 7, verifiedBy: 'Mr. Asif Khan', verifiedAt: '2025-01-30', globalReadersThisMonth: 110000 },
  { id: 'b-eco-icom1',  title: 'Economics — I.Com Y1',            subject: 'economics',  classId: 'college-icom-1', board: 'BISE Lahore', edition: '2025', pages: 298, chapterCount: 12, coverColor: '#5DCAA5', stlLevel: 7, verifier: 'BISE Lahore', verifierStl: 7, verifiedBy: 'Dr. Hina Tariq', verifiedAt: '2025-02-02', globalReadersThisMonth: 98000 },

  // BS Economics Year 1
  { id: 'b-eco-bs1',    title: 'Principles of Economics',         subject: 'economics', classId: 'uni-bs-eco-1', board: 'HEC', author: 'N. Mankiw', edition: '9th', pages: 880, chapterCount: 36, coverColor: '#5DCAA5', stlLevel: 9, verifier: 'Cengage · HEC reviewed', verifierStl: 9, verifiedBy: 'Dr. Sara Akram', verifiedAt: '2024-08-22', globalReadersThisMonth: 580000 },

  // MBBS Year 1
  { id: 'b-anat-mbbs1', title: 'Gray\'s Anatomy for Students',   subject: 'biology', classId: 'uni-mbbs-1', board: 'PMC', author: 'Drake et al', edition: '4th', pages: 1170, chapterCount: 9, coverColor: '#A32D2D', stlLevel: 10, verifier: 'Elsevier · PMC reviewed', verifierStl: 10, verifiedBy: 'Dr. Aliya Siddiqui', verifiedAt: '2024-10-05', globalReadersThisMonth: 920000 },
  { id: 'b-physio-mbbs1',title: 'Guyton & Hall Physiology',      subject: 'biology', classId: 'uni-mbbs-1', board: 'PMC', author: 'Hall', edition: '14th', pages: 1146, chapterCount: 84, coverColor: '#C44D8B', stlLevel: 10, verifier: 'Elsevier · PMC reviewed', verifierStl: 10, verifiedBy: 'Dr. Aliya Siddiqui', verifiedAt: '2024-10-07', globalReadersThisMonth: 870000 },

  // LLB Year 1
  { id: 'b-llb-const',  title: 'Constitution of Pakistan',        subject: 'history',  classId: 'uni-llb-1',   board: 'HEC', author: 'Hamid Khan', edition: '6th', pages: 642, chapterCount: 12, coverColor: '#7B6EF6', stlLevel: 9, verifier: 'OUP · HEC reviewed', verifierStl: 9, verifiedBy: 'Justice (R) Asif Khosa', verifiedAt: '2024-11-12', globalReadersThisMonth: 88000 },
];

// =============================================================================
// STL palette — 10-tier color system (matches EDUCATION-AI-DASHBOARD.md)
// =============================================================================
export const STL_PALETTE: Record<number, { color: string; label: string; description: string }> = {
  1:  { color: '#9CA3AF', label: 'L1 · Self-uploaded',     description: 'Unverified — community context only' },
  2:  { color: '#A78BFA', label: 'L2 · Community-tagged',  description: 'Tagged by other users · low confidence' },
  3:  { color: '#60A5FA', label: 'L3 · Single-source',     description: 'One verified source · use with care' },
  4:  { color: '#34D399', label: 'L4 · School-board',      description: 'Verified by a school authority' },
  5:  { color: '#FBBF24', label: 'L5 · Multiple sources',  description: 'Two or more independent sources agree' },
  6:  { color: '#F59E0B', label: 'L6 · Regulator',         description: 'Verified by a national regulator' },
  7:  { color: '#10B981', label: 'L7 · National board',    description: 'Issued/verified by a national education board' },
  8:  { color: '#3B82F6', label: 'L8 · International',     description: 'Recognized internationally · cross-board' },
  9:  { color: '#8B5CF6', label: 'L9 · Peer-reviewed',     description: 'Peer-reviewed + CRB audited' },
  10: { color: '#EC4899', label: 'L10 · World-class',      description: 'DMO-anchored · Polkadot tx · world-class' },
};

export function stlChip(level: number) {
  return STL_PALETTE[Math.max(1, Math.min(10, level))] || STL_PALETTE[1];
}

// =============================================================================
// Mock book content — for the reader screen demo
// =============================================================================
export interface BookChapter {
  id: string;
  number: number;
  title: string;
  pageStart: number;
  pageEnd: number;
  paragraphs: { id: string; text: string; }[];
}

export const SAMPLE_CHAPTER_BIOLOGY_9_CH4: BookChapter = {
  id: 'b-biology-9-ch4',
  number: 4,
  title: 'Photosynthesis & Plant Energy',
  pageStart: 47,
  pageEnd: 62,
  paragraphs: [
    { id: 'p1', text: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. The combined effect of light, carbon dioxide, and water produces glucose and releases oxygen as a by-product.' },
    { id: 'p2', text: 'The chemical equation for photosynthesis is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. This reaction takes place primarily in the chloroplasts of plant cells, where the green pigment chlorophyll absorbs light energy.' },
    { id: 'p3', text: 'There are two main stages of photosynthesis: the light-dependent reactions and the light-independent (Calvin cycle) reactions. The light reactions occur in the thylakoid membranes, while the Calvin cycle takes place in the stroma of the chloroplast.' },
    { id: 'p4', text: 'Factors affecting the rate of photosynthesis include light intensity, carbon dioxide concentration, temperature, and water availability. Each factor has an optimal range — too little or too much can slow down the process or stop it completely.' },
    { id: 'p5', text: 'Photosynthesis is essential for life on Earth. It produces the oxygen we breathe and forms the base of nearly every food chain. Without it, the energy from the sun could not be converted into a form that animals (including humans) can use.' },
    { id: 'p6', text: 'Recent research has shown that some plants in shaded environments have adapted to perform photosynthesis at very low light levels, while certain bacteria can carry out anoxygenic photosynthesis using compounds other than water as electron donors.' },
  ],
};

// =============================================================================
// Convenience selectors
// =============================================================================
export function getSubjectsForLevel(level: Level): Subject[] {
  return SUBJECTS.filter((s) => s.levels.includes(level));
}

export function getClassesForLevel(level: Level): ClassDef[] {
  return CLASSES.filter((c) => c.level === level);
}

export function searchInstitutions(query: string, level?: Level): Institution[] {
  const q = query.trim().toLowerCase();
  return INSTITUTIONS.filter((i) => {
    if (q && !i.name.toLowerCase().includes(q) && !i.city.toLowerCase().includes(q)) return false;
    if (level === 'school' && i.type !== 'school') return false;
    if (level === 'college' && !['college', 'school'].includes(i.type)) return false;
    if (level === 'university' && i.type !== 'university') return false;
    return true;
  });
}

export function getBooksForClass(classId: string, subjectId?: string): Book[] {
  return BOOKS.filter((b) => b.classId === classId && (!subjectId || b.subject === subjectId));
}

export function getBookById(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}
