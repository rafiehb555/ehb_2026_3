/**
 * EHB Top Companies by STL — per Country
 *
 * Spec: ehb-info/15-ui-system/COMPANIES-BY-STL.md
 *
 * Companies listed are PROJECTED placements at launch · subject to verification.
 * `verified: false` until they actually onboard on EHB platform.
 */

export interface CompanyByStl {
  countryCode: 'PK' | 'AE' | 'SA' | 'TR' | 'MY' | string;
  level: number; // 1-10
  name: string;
  sector: string;
  initials: string;
  iconFrom: string;
  iconTo: string;
  iconText: string;
  verified: boolean;
  industryCodes?: string[];
}

export const companiesByStl: CompanyByStl[] = [
  // 🇵🇰 Pakistan (Phase 1)
  { countryCode: 'PK', level: 4, name: 'Bykea',         sector: 'Mobility',   initials: 'B',   iconFrom: '#042C53', iconTo: '#F0B90B', iconText: '#F0B90B', verified: false, industryCodes: ['LDS'] },
  { countryCode: 'PK', level: 4, name: 'Foodpanda',     sector: 'Delivery',   initials: 'F',   iconFrom: '#A32D2D', iconTo: '#791F1F', iconText: '#fff',    verified: false, industryCodes: ['LDS'] },
  { countryCode: 'PK', level: 4, name: 'Careem',        sector: 'Mobility',   initials: 'C',   iconFrom: '#1D9E75', iconTo: '#04342C', iconText: '#fff',    verified: false, industryCodes: ['LDS'] },
  { countryCode: 'PK', level: 5, name: 'JS Bank',       sector: 'Banking',    initials: 'JS',  iconFrom: '#6F62D6', iconTo: '#26215C', iconText: '#fff',    verified: false, industryCodes: ['FIN'] },
  { countryCode: 'PK', level: 5, name: 'Servis',        sector: 'Industrial', initials: 'SV',  iconFrom: '#534AB7', iconTo: '#26215C', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 5, name: 'Sapphire',      sector: 'Textiles',   initials: 'SP',  iconFrom: '#F0997B', iconTo: '#A32D2D', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 6, name: 'Lucky Tex',     sector: 'Textiles',   initials: 'LT',  iconFrom: '#8B4DC4', iconTo: '#4F1F7A', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 6, name: 'Bonanza',       sector: 'Apparel',    initials: 'BG',  iconFrom: '#BA7517', iconTo: '#412402', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 6, name: 'Hashoo',        sector: 'Hospitality',initials: 'HH',  iconFrom: '#854F0B', iconTo: '#412402', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 7, name: 'TPL Trakker',   sector: 'Tech',       initials: 'TPL', iconFrom: '#C44D8B', iconTo: '#7A1F50', iconText: '#fff',    verified: false, industryCodes: ['ITS'] },
  { countryCode: 'PK', level: 7, name: 'NetSol',        sector: 'Tech',       initials: 'NS',  iconFrom: '#E24B4A', iconTo: '#791F1F', iconText: '#fff',    verified: false, industryCodes: ['ITS'] },
  { countryCode: 'PK', level: 7, name: 'Systems Ltd',   sector: 'Tech',       initials: 'SL',  iconFrom: '#C44D8B', iconTo: '#7A1F50', iconText: '#fff',    verified: false, industryCodes: ['ITS'] },
  { countryCode: 'PK', level: 8, name: 'Engro',         sector: 'Industrial', initials: 'EN',  iconFrom: '#F0B90B', iconTo: '#BA7517', iconText: '#412402', verified: false },
  { countryCode: 'PK', level: 8, name: 'Lucky Cement',  sector: 'Industrial', initials: 'LC',  iconFrom: '#1D9E75', iconTo: '#04342C', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 8, name: 'FFC',           sector: 'Industrial', initials: 'FFC', iconFrom: '#1D9E75', iconTo: '#04342C', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 9, name: 'HBL',           sector: 'Banking',    initials: 'HBL', iconFrom: '#8B6B3F', iconTo: '#3F2D14', iconText: '#fff',    verified: false, industryCodes: ['FIN'] },
  { countryCode: 'PK', level: 9, name: 'MCB Bank',      sector: 'Banking',    initials: 'MCB', iconFrom: '#185FA5', iconTo: '#0C2E5C', iconText: '#fff',    verified: false, industryCodes: ['FIN'] },
  { countryCode: 'PK', level: 9, name: 'PSO',           sector: 'Energy',     initials: 'PSO', iconFrom: '#185FA5', iconTo: '#0C2E5C', iconText: '#fff',    verified: false },
  { countryCode: 'PK', level: 10,name: 'Telenor',       sector: 'Telecom',    initials: 'T',   iconFrom: '#5F4D7A', iconTo: '#2F1F4A', iconText: '#F0B90B', verified: false },
  { countryCode: 'PK', level: 10,name: 'Jazz',          sector: 'Telecom',    initials: 'J',   iconFrom: '#A32D2D', iconTo: '#501313', iconText: '#fff',    verified: false },

  // 🇦🇪 UAE (Phase 1)
  { countryCode: 'AE', level: 4, name: 'Talabat',       sector: 'Delivery',   initials: 'TL',  iconFrom: '#F0B90B', iconTo: '#BA7517', iconText: '#412402', verified: false },
  { countryCode: 'AE', level: 5, name: 'Emaar',         sector: 'Real estate',initials: 'EM',  iconFrom: '#185FA5', iconTo: '#0C2E5C', iconText: '#fff',    verified: false },
  { countryCode: 'AE', level: 7, name: 'Etisalat',      sector: 'Telecom',    initials: 'ET',  iconFrom: '#1D9E75', iconTo: '#04342C', iconText: '#fff',    verified: false },
  { countryCode: 'AE', level: 8, name: 'Emirates NBD',  sector: 'Banking',    initials: 'EN',  iconFrom: '#185FA5', iconTo: '#0C2E5C', iconText: '#fff',    verified: false },
  { countryCode: 'AE', level: 10,name: 'ADNOC',         sector: 'Energy',     initials: 'AD',  iconFrom: '#5F4D7A', iconTo: '#2F1F4A', iconText: '#F0B90B', verified: false },

  // 🇸🇦 Saudi Arabia (Phase 1)
  { countryCode: 'SA', level: 5, name: 'Al Rajhi Bank', sector: 'Banking',    initials: 'AR',  iconFrom: '#1D9E75', iconTo: '#04342C', iconText: '#fff',    verified: false },
  { countryCode: 'SA', level: 7, name: 'STC',           sector: 'Telecom',    initials: 'STC', iconFrom: '#6F62D6', iconTo: '#3B2F8A', iconText: '#fff',    verified: false },
  { countryCode: 'SA', level: 8, name: 'SABIC',         sector: 'Industrial', initials: 'SB',  iconFrom: '#F0B90B', iconTo: '#7A5A04', iconText: '#412402', verified: false },
  { countryCode: 'SA', level: 10,name: 'Saudi Aramco',  sector: 'Energy',     initials: 'AR',  iconFrom: '#1D9E75', iconTo: '#04342C', iconText: '#fff',    verified: false },
];

export function getCompaniesByCountry(countryCode: string): CompanyByStl[] {
  return companiesByStl
    .filter((c) => c.countryCode === countryCode)
    .sort((a, b) => a.level - b.level);
}
