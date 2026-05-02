export type FranchiseType = 'sub' | 'online' | 'master' | 'corporate' | 'country';

export type SubLevel =
  | 'L1'
  | 'L2'
  | 'L3'
  | 'L4'
  | 'L5'
  | 'L6'
  | 'L7'
  | 'L8'
  | 'L9'
  | 'L10';

export type OnlineTier = 'OF1' | 'OF2' | 'OF3' | 'OF4';

export interface FranchisePricing {
  code: SubLevel | OnlineTier | 'M' | 'C' | 'C1';
  type: FranchiseType;
  name: string;
  usd: number;
  ehbgc: number;
  commissionCapPerDayUsd: number | 'unlimited';
  directCommissionRatePct?: number;
  targetMarket: string;
}

export interface FranchiseApplication {
  id: string;
  userId: string;
  type: FranchiseType;
  level: SubLevel | OnlineTier | string;
  country: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_info';
  submittedAt: string;
  reviewedAt?: string;
  reviewerId?: string;
  notes?: string;
}

export interface Franchise {
  id: string;
  serialNumber: string; // EHB-PK-R1-P1-L3-045
  ownerUserId: string;
  type: FranchiseType;
  level: string;
  country: string;
  round: number;
  phase: number;
  pricing: {
    usdPaid: number;
    ehbgcLocked: number;
    commissionCapPerDay: number | 'unlimited';
    directCommissionRate?: number;
  };
  status: 'pending' | 'active' | 'suspended' | 'terminated';
  createdAt: string;
  updatedAt: string;
}
