export type AiServiceId =
  | 'lawyer'
  | 'diagnosis'
  | 'tutor'
  | 'resume'
  | 'business'
  | 'fraud'
  | 'recommend';

export interface AiServiceConfig {
  id: AiServiceId;
  displayName: string;
  industry: string;
  desc: string;
  stlMin: number;
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'stub';
}

export interface AiInvocationInput {
  [key: string]: unknown;
}

export interface AiInvocationOutput {
  text: string;
  confidence: number; // 0–1
  disclaimer: string;
  meta: {
    model: string;
    latencyMs: number;
    tokensUsed?: number;
  };
}

export interface AiInvocationResult {
  service: AiServiceId;
  output: AiInvocationOutput;
}
