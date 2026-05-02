// NADRA (Pakistan) KYC Adapter — v3.3 §13.6.5
//
// Phase 1 MVP: STUB. Phase 2: NADRA Verisys API integration.
// Pakistan-specific identity verification authority.
// Real implementation will need:
//   - NADRA_API_URL (https://nadra.gov.pk/...)
//   - NADRA_AGENT_ID + NADRA_API_KEY (require official onboarding)

class NadraAdapter {
  constructor() {
    this.name = 'nadra';
    this.vendor = 'NADRA Pakistan';
    this.country = 'PK';
    this.enabled = true;
    this.isStub = true;
    this.supportedDocs = ['cnic']; // NADRA only handles Pakistani CNIC
  }

  async init(config) {
    if (config?.agentId && config?.apiKey) this.isStub = false;
  }

  async healthCheck() {
    return { ok: true, latencyMs: 100, vendor: this.vendor, mode: this.isStub ? 'stub' : 'production' };
  }

  /**
   * Submit a CNIC for verification.
   */
  async submitDocument({ documentType, fileUrl, extractedData }) {
    if (documentType !== 'cnic') {
      return { ok: false, error: 'NADRA only verifies CNIC. Use Jumio/Onfido for other documents.' };
    }
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 2000));
      return {
        ok: true,
        transactionId: `NADRA_STUB_${Date.now()}`,
        status: 'verified',
        extractedData: extractedData || {
          name: 'Stub User',
          dateOfBirth: '1990-01-01',
          idNumber: '12345-6789012-3',
          country: 'PK',
        },
        note: 'STUB — Phase 2 will hit NADRA Verisys API',
      };
    }
    throw new Error('NADRA production adapter not yet implemented');
  }

  async checkStatus(transactionId) {
    if (this.isStub) {
      return { ok: true, transactionId, status: 'verified' };
    }
    throw new Error('NADRA production adapter not yet implemented');
  }

  async liveness({ selfieUrl, documentTransactionId }) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 1500));
      return { ok: true, passed: true, score: 0.95, note: 'STUB' };
    }
    throw new Error('NADRA production adapter not yet implemented');
  }
}

export default new NadraAdapter();
