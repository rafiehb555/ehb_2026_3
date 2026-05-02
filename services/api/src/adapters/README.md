# EHB Adapter Layer

> **Spec:** `ehb-info/departments/Affiliate.md` §11 (adapter pattern)
> **Founder rule:** swappable interface — stub for demo, real driver for production.

This directory contains all external-vendor adapters. Each adapter implements a
common interface so business logic stays vendor-agnostic.

## Subdirectories

```
adapters/
├── bank/        Bank rails (PK / UAE / USA / IN / UK)
│   ├── jazzcash.js     Pakistan digital wallet
│   ├── hbl.js          Pakistan commercial bank
│   ├── bank-interface.js  Common interface
│   └── README.md
├── usdt/        Stablecoin rails
│   ├── tron-trc20.js   Default network ($1 fee)
│   ├── ethereum-erc20.js  Higher fee, Phase 3
│   ├── bsc-bep20.js    Lower fee alternative
│   ├── usdt-interface.js  Common interface
│   └── README.md
├── kyc/         KYC verification vendors
│   ├── nadra.js        Pakistan-specific
│   ├── jumio.js        Global vendor
│   ├── onfido.js       EU + UK
│   ├── sumsub.js       Multi-jurisdiction
│   ├── kyc-interface.js   Common interface
│   └── README.md
└── README.md (this file)
```

## How to Use

```javascript
import { getBankAdapter } from './bank/index.js';

const jazzcash = getBankAdapter('JAZZCASH_PK');
const result = await jazzcash.deposit({ userId, amountUsd: 100, accountInfo: {...} });
```

Switching from stub to production = changing 1 environment variable
(`BANK_ADAPTER_PK=jazzcash` or future production driver).

## Interface Contract

Every adapter exports:

```typescript
interface AdapterInterface {
  name: string;
  vendor: string;
  enabled: boolean;
  init(config): Promise<void>;
  healthCheck(): Promise<{ok: boolean, latencyMs?: number}>;
}

// Bank-specific
interface BankAdapter extends AdapterInterface {
  deposit(req: DepositRequest): Promise<TransactionResult>;
  withdraw(req: WithdrawRequest): Promise<TransactionResult>;
  status(externalRefId: string): Promise<TxStatus>;
  webhook(req: ExpressRequest): Promise<WebhookEvent>;
}

// USDT-specific
interface UsdtAdapter extends AdapterInterface {
  generateDepositAddress(userId: string): Promise<{address, network, qr}>;
  withdraw(req: WithdrawRequest): Promise<TxResult>;
  watchAddress(address: string): EventEmitter;
  getNetworkFee(): Promise<number>;
}

// KYC-specific
interface KycAdapter extends AdapterInterface {
  submitDocument(doc: DocumentSubmission): Promise<{transactionId, status}>;
  checkStatus(transactionId: string): Promise<{status, rejectedReason?, extractedData}>;
  liveness(req: LivenessRequest): Promise<{passed, score}>;
}
```

## Phase 1 MVP (Current)

All adapters are **stub implementations** that return mock responses. Real
integration deferred to Phase 2.

| Adapter | Stub Behavior | Phase 2 Target |
|---|---|---|
| `bank/jazzcash` | Returns simulated success after 1s delay | JazzCash Merchant Services API |
| `bank/hbl` | Returns simulated success | HBL Merchant API + IBFT rail |
| `usdt/tron-trc20` | Returns simulated address `T...stub` | TronWeb + private key signer |
| `kyc/nadra` | Returns `verified` after 2s | NADRA Verisys API |
| `kyc/jumio` | Returns `verified` after 1s | Jumio Netverify |

## Phase 2 Migration

When real vendor onboarded:
1. Update env var: `KYC_ADAPTER_PK=nadra-prod`
2. Add real credentials to `.env`: `NADRA_API_KEY=...`
3. Replace stub functions with real SDK calls
4. Run integration tests
5. Soft launch with 1% traffic, ramp to 100% over 7 days

Business logic in services/ never changes — only adapter implementation swaps.
