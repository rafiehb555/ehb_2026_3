// Jumio KYC Adapter — v3.3 §13.6.5
//
// Global KYC vendor. Used for non-Pakistan users + Pakistani users with passport (not CNIC).
// Phase 1 MVP: STUB. Phase 2: Jumio Netverify integration.

class JumioAdapter {
  constructor() {
    this.name = 'jumio';
    this.vendor = 'Jumio';
    this.country = '*'; // global
    this.enabled = true;
    this.isStub = true;
    this.supportedDocs = ['passport', 'national_id', 'driving_license', 'selfie', 'address_proof'];
  }

  async init(config) {
    if (config?.apiToken && config?.apiSecret) this.isStub = false;
  }

  async healthCheck() {
    return { ok: true, latencyMs: 150, vendor: this.vendor, mode: this.isStub ? 'stub' : 'production' };
  }

  async submitDocument({ documentType, fileUrl, extractedData }) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 1000));
      return {
        ok: true,
        transactionId: `JUMIO_STUB_${Date.now()}`,
        status: 'verified',
        extractedData: extractedData || {},
        note: 'STUB — Phase 2 will hit Jumio Netverify API',
      };
    }
    throw new Error('Jumio production adapter not yet implemented');
  }

  async checkStatus(transactionId) {
    if (this.isStub) return { ok: true, transactionId, status: 'verified' };
    throw new Error('Jumio production adapter not yet implemented');
  }

  async liveness({ selfieUrl }) {
    if (this.isStub) {
      await new Promise((r) => setTimeout(r, 800));
      return { ok: true, passed: true, score: 0.92 };
    }
    throw new Error('Jumio production adapter not yet implemented');
  }
}

export default new JumioAdapter();
