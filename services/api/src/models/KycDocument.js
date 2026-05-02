import mongoose from 'mongoose';

/**
 * KYC Document Model — v3.3 §13.6.5
 *
 * Spec: ehb-info/departments/Affiliate.md §13.6.5 (v3.3)
 *
 * Tracks user-submitted identity/address/source-of-funds documents
 * for KYC tier elevation. Verified docs unlock higher wallet limits.
 *
 * Tier ladder (per spec §13.6.5):
 *   Tier 0 (Sandbox)       : email + phone           · $100/mo in, $50/mo out
 *   Tier 1 (Basic)         : + ID document          · $1K/mo in, $500/mo out
 *   Tier 2 (Standard)      : + selfie + address     · $10K/mo in, $5K/mo out
 *   Tier 3 (Pro)           : + bank statement + SOF · $100K/mo in, $50K/mo out
 *   Tier 4 (Institutional) : + corporate docs + audit · unlimited
 */

const KycDocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    /** Document type — drives which tier it contributes to */
    documentType: {
      type: String,
      required: true,
      enum: [
        // Tier 0 (built into signup) — not stored as documents
        // Tier 1
        'cnic',           // Pakistan ID
        'passport',
        'national_id',    // generic foreign ID
        'driving_license',
        // Tier 2
        'selfie',
        'address_proof',  // utility bill, bank statement
        // Tier 3
        'bank_statement',
        'source_of_funds_letter',
        'tax_return',
        // Tier 4 (corporate)
        'corporate_certificate',
        'business_license',
        'audit_report',
        'directors_list',
      ],
      index: true,
    },

    /** Storage URL (cloud bucket; production: encrypted at rest) */
    fileUrl: { type: String, required: true },

    /** Document metadata extracted via OCR (Phase 2 via Jumio/Onfido adapter) */
    extractedData: {
      name: String,
      dateOfBirth: String,
      idNumber: String,
      issueDate: Date,
      expiryDate: Date,
      country: String,
    },

    /** Verification status */
    status: {
      type: String,
      enum: ['pending', 'under_review', 'verified', 'rejected', 'expired'],
      default: 'pending',
      index: true,
    },

    /** Tier this document contributes to (1-4) */
    contributesToTier: { type: Number, min: 1, max: 4, required: true },

    /** Verification audit */
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: Date,
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: Date,
    rejectedReason: String,

    /**
     * Vendor adapter info (Phase 2):
     *   adapter: 'jumio' | 'onfido' | 'sumsub' | 'nadra' (Pakistan-specific)
     *   adapterTransactionId: external reference for re-fetching
     */
    adapter: { type: String, default: 'manual' },
    adapterTransactionId: String,
    adapterResponse: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

KycDocumentSchema.index({ userId: 1, status: 1 });
KycDocumentSchema.index({ userId: 1, contributesToTier: 1 });

export default mongoose.models.KycDocument ||
  mongoose.model('KycDocument', KycDocumentSchema);
