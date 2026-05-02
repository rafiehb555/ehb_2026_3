export type UserRole =
  | 'user'
  | 'franchisee'
  | 'DMO_MANAGER'
  | 'DMO_ANALYST'
  | 'DMO_SUPPORT'
  | 'DMO_INSPECTOR'
  | 'DMO_DIRECTOR'
  | 'SUPER_ADMIN';

export interface PssState {
  level: number; // 0–10
  status: 'pending' | 'verified' | 'rejected';
  submittedAt?: string;
  verifiedAt?: string;
}

export interface CrbState {
  level: number; // 0–10
  certifications: Array<{
    name: string;
    issuer: string;
    hash: string;
    expiresAt?: string;
  }>;
}

export interface DmoState {
  level: number; // 1–10
  score: number; // 0–100
  lastRecalc?: string;
}

export interface WalletState {
  ehbgcBalance: number;
  ehbgcLocked: number;
  usdBalance: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  pss: PssState;
  crb: CrbState;
  dmo: DmoState;
  stl: {
    score: number;
    level: number;
    history?: Array<{ ts: string; score: number; event: string }>;
  };
  wallet: WalletState;
  createdAt: string;
  updatedAt: string;
}
