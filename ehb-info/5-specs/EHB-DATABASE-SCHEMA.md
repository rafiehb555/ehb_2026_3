# EHB Database Schema — MongoDB Collections & Models

**Status:** v1.0 · 2026-04-18  
**Related:** EHB-BUILD-BLUEPRINT.md v1.0, EHB-API-SPEC.md v1.0  
**Database:** MongoDB 7 · Atlas (Cloud)  
**ORM:** Mongoose (Node.js driver)

---

## Collection: Users

Stores core user profile and authentication data.

```javascript
{
  _id: ObjectId,
  email: String, // Unique
  phone: String, // Unique with country code
  password: String, // Hashed (bcrypt)
  name: String,
  profilePicture: String, // URL
  bio: String, // Optional
  roles: [String], // ["seller", "buyer", "franchise", "inspector", "admin"]
  status: String, // "active", "banned", "suspended", "inactive"
  pssLevel: Number, // 1-10
  crbLevel: Number, // 1-10
  dmoLevel: Number, // 1-10
  ehbSTL: Number, // 0-100
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
  verifiedAt: Date,
  bannedAt: Date, // Optional, when banned
  banReason: String, // Optional
  banExpiresAt: Date, // Optional
  twoFactorEnabled: Boolean,
  twoFactorSecret: String, // Optional
  preferences: {
    language: String, // "en", "ur"
    currency: String, // "PKR"
    theme: String, // "dark", "light"
    emailNotifications: Boolean,
    pushNotifications: Boolean
  }
}
```

**Indexes:**
- `email` (unique)
- `phone` (unique)
- `createdAt`

---

## Collection: PSS (Personal Security System)

Stores identity verification documents and status.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  level: Number, // 1-10
  overallStatus: String, // "unverified", "verifying", "verified", "rejected", "expired"
  documents: {
    cnic: {
      status: String, // "pending", "verified", "rejected", "expired"
      fileUrl: String,
      issuedDate: Date,
      expiryDate: Date,
      submittedAt: Date,
      verifiedAt: Date,
      verificationScore: Number, // 0-100
      rejectReason: String // Optional
    },
    face: {
      status: String,
      fileUrl: String,
      submittedAt: Date,
      verifiedAt: Date,
      livenessScore: Number, // 0-100
      rejectReason: String
    },
    address: {
      status: String,
      fileUrl: String,
      submittedAt: Date,
      verifiedAt: Date
    },
    financial: {
      status: String,
      fileUrl: String,
      submittedAt: Date,
      verifiedAt: Date
    }
  },
  verifiedBy: ObjectId, // Reference to Admin user
  failureCount: Number, // Rejections count
  lastAttemptDate: Date,
  expiryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (unique)
- `level`
- `overallStatus`

---

## Collection: CRB (Central Record Blockchain)

Stores certifications, inspections, and on-chain hashes.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  level: Number, // 1-10
  status: String, // "pending", "verified", "expired", "suspended"
  certifications: [
    {
      certificationId: ObjectId,
      name: String, // e.g., "E-Commerce Expert"
      category: String, // e.g., "seller", "inspector", "franchisee"
      issuedDate: Date,
      expiryDate: Date,
      certificateNumber: String,
      onChainHash: String, // Polkadot blockchain hash
      blockchainTxHash: String,
      isActive: Boolean,
      verifiedBy: ObjectId // Reference to Inspector
    }
  ],
  inspections: [
    {
      inspectionId: ObjectId,
      inspectorId: ObjectId, // Reference to Inspector user
      inspectionType: String, // "physical", "skills", "background", "renewal"
      scheduledDate: Date,
      completedDate: Date,
      location: String,
      result: String, // "approved", "rejected", "pending_review"
      notes: String,
      reportUrl: String,
      photosUrl: [String],
      score: Number // 0-100
    }
  ],
  refillDueDate: Date,
  nextRefillScheduledDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (unique)
- `level`
- `status`
- `refillDueDate`

---

## Collection: STL (Service Trust Level)

Stores STL scores and history.

```javascript
{
  _id: ObjectId,
  entityId: ObjectId, // Reference to Users, Products, Companies, etc.
  entityType: String, // "personal", "product", "service", "franchise", "company"
  finalSTL: Number, // 0-100
  level: Number, // 1-10
  levelName: String, // "FREE", "BASIC", ..., "SUPREME"
  components: {
    pssScore: Number, // 0-100
    pssWeight: Number, // 0.4
    pssContribution: Number,
    
    crbScore: Number,
    crbWeight: Number, // 0.3
    crbContribution: Number,
    
    dmoScore: Number,
    dmoWeight: Number, // 0.3
    dmoContribution: Number
  },
  formula: String, // "(40×0.4) + (35×0.3) + (40×0.3) = 72"
  minChainComponent: Number, // MIN-chain rule
  calculatedAt: Date,
  lastUpdatedAt: Date,
  recalcTrigger: String, // "order_completed", "complaint_filed", "refill_submitted", etc.
  history: [
    {
      date: Date,
      stl: Number,
      change: Number, // +2, -5, etc.
      reason: String,
      components: {
        pss: Number,
        crb: Number,
        dmo: Number
      }
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `entityId` (unique per entityType)
- `finalSTL`
- `level`
- `calculatedAt`

---

## Collection: DMO (Decentralized Management Office)

Stores governance, approvals, and subscription data.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  level: Number, // 1-10
  levelName: String,
  subscription: {
    status: String, // "active", "inactive", "suspended", "grace_period"
    tier: String, // "basic", "professional", "advanced", "elite"
    monthlyFee: Number, // PKR amount
    currency: String, // "PKR"
    billingStartDate: Date,
    billingEndDate: Date,
    nextDeductionDate: Date,
    autoRenew: Boolean,
    gracePeriodEndsAt: Date // Optional
  },
  scores: {
    behavior: Number, // 0-100
    activity: Number, // 0-100
    risk: Number, // 0-100
    calculated: Date
  },
  tools: [String], // ["order_management", "complaint_resolution", "ai_assistant", ...]
  approvalQueues: [
    {
      approvalId: ObjectId,
      actionType: String, // "add_product", "add_franchise", "make_payout"
      userId: ObjectId,
      requestedAt: Date,
      status: String, // "pending", "approved", "rejected"
      decisionAt: Date,
      decidedBy: ObjectId // Reference to DMO admin
    }
  ],
  activityLog: [
    {
      date: Date,
      action: String,
      details: String,
      ipAddress: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (unique)
- `level`
- `subscription.status`
- `subscription.nextDeductionDate`

---

## Collection: Products

E-commerce product listings.

```javascript
{
  _id: ObjectId,
  sellerId: ObjectId, // Reference to Users
  companyId: ObjectId, // Reference to Companies (optional)
  name: String,
  slug: String, // URL-friendly unique identifier
  description: String,
  category: String,
  subcategory: String,
  images: [String], // URLs
  price: Number, // PKR
  currency: String,
  stock: Number,
  stlLevel: Number, // Inherits from seller/company
  rating: Number, // 0-5
  ratingCount: Number,
  deliveryTimeHours: Number,
  deliveryOptions: [String], // ["standard", "express", "same_day"]
  specifications: Object, // Dynamic fields (brand, size, color, etc.)
  returnPolicy: String,
  warranty: String,
  status: String, // "active", "inactive", "suspended", "review"
  dmoApprovedAt: Date,
  dmoApprovedBy: ObjectId, // Reference to DMO
  createdAt: Date,
  updatedAt: Date,
  views: Number,
  purchases: Number,
  lastSoldAt: Date
}
```

**Indexes:**
- `sellerId`
- `category`
- `slug` (unique)
- `stlLevel`
- `rating`
- `createdAt`
- `status`

---

## Collection: Orders

Purchase orders and transaction records.

```javascript
{
  _id: ObjectId,
  orderId: String, // Unique custom ID (ord_456)
  buyerId: ObjectId, // Reference to Users
  sellerId: ObjectId, // Reference to Users
  productId: ObjectId, // Reference to Products
  quantity: Number,
  unitPrice: Number,
  subtotal: Number,
  ehbFee: Number, // 2% of subtotal
  totalAmount: Number,
  currency: String,
  status: String, // "pending", "confirmed", "picked", "in_transit", "delivered", "completed", "cancelled", "refunded"
  deliveryStatus: String, // "pending", "picked", "in_transit", "delivered"
  paymentStatus: String, // "locked_in_wallet", "released", "refunded"
  walletLockedAmount: Number,
  walletLockedAt: Date,
  walletReleasedAmount: Number,
  walletReleasedAt: Date,
  deliveryAddress: String,
  deliveryCoordinates: {
    latitude: Number,
    longitude: Number
  },
  preferredDeliveryTime: Date,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  rider: {
    riderId: ObjectId,
    riderName: String,
    riderPhone: String,
    riderRating: Number
  },
  franchise: {
    franchiseId: ObjectId,
    franchiseName: String,
    type: String // "online", "city", "state", "country"
  },
  review: {
    rating: Number, // 1-5
    comment: String,
    submittedAt: Date,
    submittedBy: ObjectId // buyer or seller
  },
  complaints: [
    {
      complaintId: ObjectId,
      filed: Date,
      resolved: Date
    }
  ],
  timeline: [
    {
      status: String,
      timestamp: Date,
      notes: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `buyerId`
- `sellerId`
- `orderId` (unique)
- `status`
- `createdAt`
- `estimatedDeliveryTime`

---

## Collection: Wallets

User wallet and balance tracking.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users (unique)
  balance: {
    available: Number, // Can withdraw/use
    locked: Number, // In active orders
    earning: Number, // Pending payouts
    total: Number // available + locked + earning
  },
  currency: String, // "PKR"
  transactions: [
    {
      transactionId: ObjectId,
      type: String, // "deposit", "withdrawal", "order_lock", "order_release", "refund", "commission", "dmo_fee"
      description: String,
      amount: Number,
      direction: String, // "in", "out"
      status: String, // "completed", "pending", "failed"
      date: Date,
      relatedOrder: ObjectId, // Reference to Orders (optional)
      relatedPaymentMethod: String, // "bank_transfer", "card", "jazzcash"
    }
  ],
  bankAccounts: [
    {
      accountId: ObjectId,
      accountHolderName: String,
      accountNumber: String,
      iban: String,
      bankName: String,
      isDefault: Boolean,
      isVerified: Boolean,
      addedAt: Date
    }
  ],
  paymentMethods: [
    {
      methodId: ObjectId,
      type: String, // "bank_transfer", "card", "jazzcash"
      details: Object,
      isDefault: Boolean,
      addedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (unique)
- `balance.available`
- `transactions.date`

---

## Collection: Complaints

Customer service complaints and disputes.

```javascript
{
  _id: ObjectId,
  complaintId: String, // Unique (cmp_001)
  orderId: ObjectId, // Reference to Orders
  buyerId: ObjectId, // Reference to Users
  sellerId: ObjectId, // Reference to Users
  franchiseId: ObjectId, // Reference to Franchises (optional)
  type: String, // "fraud", "delay", "damage", "quality", "other"
  description: String,
  evidence: [
    {
      type: String, // "image", "document", "text"
      url: String,
      uploadedAt: Date
    }
  ],
  status: String, // "open", "ai_reviewing", "investigating", "resolved", "rejected", "appealed"
  priority: String, // "low", "medium", "high"
  aiReview: {
    result: String, // "fraud", "valid", "invalid"
    outcome: String, // "refund", "partial_refund", "no_action"
    suggestedAmount: Number,
    confidence: Number, // 0-1
    reasoning: String,
    analyzedAt: Date
  },
  sellerResponse: {
    message: String,
    evidence: [String],
    submittedAt: Date
  },
  dmoDecision: {
    decision: String, // "approved", "partially_approved", "rejected", "escalated"
    finalAmount: Number,
    reason: String,
    decidedBy: ObjectId, // Reference to Admin
    decidedAt: Date
  },
  appeal: {
    submitted: Boolean,
    message: String,
    submittedAt: Date,
    appealDecision: String
  },
  penaltyApplied: {
    stlChange: Number, // e.g., -2
    appliedAt: Date
  },
  walletRefunded: Boolean,
  refundedAmount: Number,
  refundedAt: Date,
  filedAt: Date,
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `orderId`
- `buyerId`
- `sellerId`
- `status`
- `type`
- `filedAt`

---

## Collection: Franchises

Franchise ownership and performance.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users (franchise owner)
  type: String, // "online", "city", "state", "country"
  area: String, // Geographic area (e.g., "Islamabad")
  stlLevel: Number,
  status: String, // "active", "inactive", "suspended", "terminated"
  performance: {
    ordersPerMonth: Number,
    rating: Number, // 0-5
    complaints: Number,
    revenue: Number
  },
  sellers: [
    {
      sellerId: ObjectId,
      status: String // "active", "inactive"
    }
  ],
  riders: [
    {
      riderId: ObjectId,
      status: String
    }
  ],
  purchasePrice: Number, // EHBGC
  purchaseDate: Date,
  activationDate: Date,
  warningCount: Number,
  warnings: [
    {
      date: Date,
      reason: String
    }
  ],
  terminationDate: Date,
  refundAmount: Number, // 80% of purchase
  penaltyAmount: Number, // 20% of purchase
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (unique)
- `type`
- `area`
- `status`

---

## Collection: Riders

Delivery rider profiles.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  franchiseId: ObjectId, // Reference to Franchises
  stlLevel: Number,
  vehicleType: String, // "bike", "car", "van"
  vehicleRegistration: String,
  vehicleDocumentUrl: String,
  cnic: String,
  availability: String, // "online", "offline", "on_break"
  onlineHours: {
    startTime: String, // "09:00"
    endTime: String, // "18:00"
    daysOfWeek: [Number] // 0-6 (0=Sunday)
  },
  earnings: {
    total: Number,
    thisMonth: Number,
    thisWeek: Number
  },
  rating: Number, // 0-5
  ratingCount: Number,
  ordersCompleted: Number,
  activeDeliveries: Number,
  status: String, // "active", "on_break", "inactive", "suspended"
  banHistory: [
    {
      date: Date,
      duration: Number, // days
      reason: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (unique)
- `franchiseId`
- `availability`
- `rating`

---

## Collection: Deliveries

Delivery tracking and logistics.

```javascript
{
  _id: ObjectId,
  orderId: ObjectId, // Reference to Orders
  riderId: ObjectId, // Reference to Riders
  franchiseId: ObjectId, // Reference to Franchises
  status: String, // "pending", "picked", "in_transit", "delivered", "failed", "cancelled"
  pickupLocation: {
    address: String,
    latitude: Number,
    longitude: Number,
    sellerContactName: String,
    sellerPhone: String
  },
  deliveryLocation: {
    address: String,
    latitude: Number,
    longitude: Number,
    recipientName: String,
    recipientPhone: String
  },
  pickupTime: Date,
  pickupPhotoUrl: String,
  deliveryTime: Date,
  deliveryProof: {
    photoUrl: String,
    signatureUrl: String,
    location: {
      latitude: Number,
      longitude: Number
    },
    notes: String
  },
  trackingHistory: [
    {
      timestamp: Date,
      latitude: Number,
      longitude: Number,
      accuracy: Number,
      speed: Number
    }
  ],
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  delayReason: String, // Optional
  riderEarning: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `orderId` (unique)
- `riderId`
- `status`
- `deliveryTime`

---

## Collection: Notifications

User notifications and alerts.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  title: String,
  message: String,
  type: String, // "order", "complaint", "payout", "alert", "promo", "system"
  actionUrl: String, // Optional
  icon: String, // Optional
  read: Boolean,
  readAt: Date, // Optional
  createdAt: Date,
  expiresAt: Date, // TTL auto-delete
  metadata: Object // Additional context
}
```

**Indexes:**
- `userId`
- `read`
- `createdAt`
- `expiresAt` (TTL index for auto-cleanup)

---

## Collection: Admins

System administrators with roles and permissions.

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users
  role: String, // "super", "admin", "operator", "finance", "support"
  permissions: [String], // ["user_management", "finance", "franchise", "complaints", "stl_control"]
  status: String, // "active", "inactive"
  twoFactorEnabled: Boolean,
  twoFactorSecret: String,
  createdBy: ObjectId, // Reference to another Admin (creator)
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
  activityLog: [
    {
      date: Date,
      action: String,
      details: String,
      ipAddress: String,
      userId: ObjectId // User affected by action
    }
  ]
}
```

**Indexes:**
- `userId` (unique)
- `role`
- `status`
- `createdAt`

---

## Collection: Companies

Company/business profiles (for corporate sellers).

```javascript
{
  _id: ObjectId,
  ownerId: ObjectId, // Reference to Users
  name: String,
  registrationNumber: String,
  ntnNumber: String, // Tax ID
  businessLicense: String,
  stlLevel: Number,
  description: String,
  website: String,
  contactEmail: String,
  contactPhone: String,
  address: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  employees: [ObjectId], // Reference to Users (employees)
  products: [ObjectId], // Reference to Products
  rating: Number,
  status: String, // "active", "inactive", "suspended"
  verifiedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `ownerId`
- `name`
- `stlLevel`
- `status`

---

## Collection: AuditLog

Immutable audit trail for compliance.

```javascript
{
  _id: ObjectId,
  action: String, // e.g., "user_created", "stl_changed", "complaint_resolved"
  actorId: ObjectId, // Who performed the action (admin/system)
  targetId: ObjectId, // Affected entity
  targetType: String, // "user", "order", "complaint", "product"
  details: Object, // Change details
  ipAddress: String,
  timestamp: Date,
  createdAt: Date // Immutable
}
```

**Indexes:**
- `targetId`
- `action`
- `timestamp`

---

## Database Optimization

### Indexes Summary

**High-cardinality indexes:**
- `Users.email`, `Users.phone` (unique)
- `Products.slug`, `Products.createdAt`
- `Orders.orderId`, `Orders.createdAt`
- `Wallets.userId` (unique)

**Query optimization:**
- `Orders.buyerId`, `Orders.sellerId`, `Orders.status`
- `Complaints.orderId`, `Complaints.status`, `Complaints.filedAt`
- `Deliveries.orderId`, `Deliveries.status`
- `DMO.userId` (unique), `DMO.subscription.nextDeductionDate`

### TTL (Time-To-Live) Indexes

- `Notifications.expiresAt` (auto-delete after expiry)
- `DMO.subscription.gracePeriodEndsAt` (reference)

### Sharding Strategy (Future)

- Shard on `userId` (balanced key)
- Collections: Users, Orders, Wallets, Complaints, Notifications
- Range size: ~10M documents per shard

---

## Collection: Affiliates

Stores referral network and commission tracking.

```javascript
{
  _id: ObjectId,
  user_id: String, // Unique
  referral_code: String, // Unique, 8-12 alphanumeric
  referred_by: String, // Parent user_id or null
  referrals: [
    {
      user_id: String,
      joined_at: Date,
      verification_status: String // "pending|verified|banned"
    }
  ],
  earnings: {
    direct_bonus: Number,
    level_bonus: Number,
    pool_bonus: Number,
    franchise_bonus: Number,
    product_commission: Number,
    total: Number,
    pending_approval: Number
  },
  stats: {
    total_referrals: Number,
    verified_referrals: Number,
    banned_referrals: Number,
    avg_referral_order_value: Number
  },
  settings: {
    affiliate_enabled: Boolean,
    auto_withdraw: Boolean,
    bank_account: String // optional
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `user_id` (unique)
- `referral_code` (unique)
- `referred_by` (for network traversal)

---

## Collection: BlockchainProofs

Stores on-chain hashes for CRB certificates, STL snapshots, audit trails.

```javascript
{
  _id: ObjectId,
  entity_type: String, // "crb|stl|transfer|audit"
  entity_id: String,
  data_hash: String, // SHA-256 hash of entity data
  chain: String, // "bsc|polkadot"
  tx_id: String, // Blockchain transaction ID
  tx_url: String, // Blockchain explorer URL
  verified: Boolean,
  block_number: Number,
  on_chain_at: Date,
  created_at: Date
}
```

**Indexes:**
- `entity_type`, `entity_id`
- `data_hash` (unique)
- `tx_id` (unique)
- `on_chain_at` (for history queries)

---

## Collection: Payments

Tracks deposits, withdrawals, gateway interactions.

```javascript
{
  _id: ObjectId,
  user_id: String,
  deposit_id: String, // Unique
  type: String, // "deposit|withdrawal"
  gateway: String, // "jazzcash|easypaisa|bank|stripe"
  amount: Number,
  status: String, // "pending|success|failed|refunded"
  phone: String, // For mobile wallets
  bank_account_id: String, // optional
  signature: String, // HMAC for webhook verification
  webhook_received: Boolean,
  retry_count: Number,
  external_id: String, // Gateway transaction ID
  error_message: String, // optional
  created_at: Date,
  updated_at: Date,
  completed_at: Date // optional
}
```

**Indexes:**
- `user_id`, `type`, `status`
- `deposit_id` (unique)
- `external_id` (gateway transaction lookup)
- `created_at` (for reconciliation)

---

## Data Relationships

```
Users (1) ──→ (∞) Orders
         ──→ (1) Wallet
         ──→ (1) PSS
         ──→ (1) CRB
         ──→ (1) STL
         ──→ (1) DMO
         ──→ (1) Affiliate
         ──→ (∞) Products (if seller)
         ──→ (∞) Deliveries (if rider)
         ──→ (1) Franchise (if franchise owner)
         ──→ (∞) Complaints
         ──→ (∞) Payments

Affiliates (1) ──→ (∞) Affiliates (self-referential for tree)
            ──→ (1) Wallet (commissions credited)

BlockchainProofs (∞) ──→ (1) CRB | STL | Payment

Products (1) ──→ (∞) Orders
          ──→ (∞) Reviews

Orders (1) ──→ (1) Delivery
        ──→ (∞) Complaints
        ──→ (1) Payment (if paid)

Complaints (1) ──→ (1) Order

Franchises (1) ──→ (∞) Sellers
           ──→ (∞) Riders
```

---

## Changelog

| Date | Ver | Change |
|------|-----|--------|
| 2026-04-18 | 1.1 | Added 3 collections: Affiliates (referral_code, referrals[], earnings{}), BlockchainProofs (entity hash, chain, tx_id, verified), Payments (deposit/withdrawal, gateway, status). Total 17 collections. Updated data relationships. |
| 2026-04-18 | 1.0 | Complete MongoDB schema for all 12 phases. 14 collections: Users, PSS, CRB, STL, DMO, Products, Orders, Wallets, Complaints, Franchises, Riders, Deliveries, Notifications, Admins, Companies, AuditLog. Full field definitions, indexes, TTL, sharding strategy, data relationships. |

---

*EHB Technologies (Pvt.) Ltd. · Database Schema v1.0 · 2026-04-18*
