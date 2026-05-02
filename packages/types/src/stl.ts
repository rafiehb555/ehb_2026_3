export type StlLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type StlLevelName =
  | 'FREE'
  | 'BASIC'
  | 'NORMAL'
  | 'STANDARD'
  | 'ADVANCED'
  | 'HIGH'
  | 'PRO'
  | 'VIP'
  | 'ELITE'
  | 'SUPREME';

export interface StlBreakdown {
  pssPoints: number;
  crbPoints: number;
  dmoPoints: number;
  lowestComponent: number;
  cap: number;
}

export interface StlResult {
  pssLevel: number;
  crbLevel: number;
  dmoLevel: number;
  rawScore: number;
  score: number;
  level: StlLevel;
  levelName: StlLevelName;
  ehbgcLockRequired: number;
  breakdown: StlBreakdown;
}

export interface ProductChainInput {
  productSTL: StlLevel;
  sellerSTL: StlLevel;
  companySTL: StlLevel;
  ownerSTL: StlLevel;
}

export interface ProductChainResult {
  finalStl: StlLevel;
  finalLevelName: StlLevelName;
  blockingLayer: 'product' | 'seller' | 'company' | 'owner';
  chain: Array<{ name: string; level: number }>;
}

export interface StlEffects {
  level: StlLevel;
  levelName: StlLevelName;
  searchVisibilityMultiplier: number;
  platformFeePct: number;
  dailyEarningsCapUsd: number;
  canList: boolean;
  canFranchise: boolean;
  ehbgcLockRequired: number;
}
