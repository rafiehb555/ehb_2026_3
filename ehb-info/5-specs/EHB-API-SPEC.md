# EHB API Specification — Complete Endpoint Reference

**Status:** v1.0 · 2026-04-18  
**Related:** EHB-BUILD-BLUEPRINT.md v1.0, EHB-DATABASE-SCHEMA.md v1.0  
**Scope:** All HTTP API endpoints across 12 phases, with request/response structures

---

## API Overview

**Base URL (Dev):** `http://localhost:3000/api`  
**Base URL (Prod):** `https://api.ehb.io/api`  
**Protocol:** RESTful JSON over HTTPS  
**Auth:** JWT Bearer token (all protected endpoints)  
**Rate Limit:** 100 requests/minute per user  
**Response Format:** Standard JSON with `status`, `data`, `error`

### Standard Response Structure

**Success (2xx):**
```json
{
  "status": "success",
  "data": { /* endpoint-specific */ },
  "meta": { "timestamp": "2026-04-18T14:30:00Z" }
}
```

**Error (4xx/5xx):**
```json
{
  "status": "error",
  "error": { "code": "VALIDATION_ERROR", "message": "Email already registered" },
  "meta": { "timestamp": "2026-04-18T14:30:00Z" }
}
```

---

## Authentication Endpoints

### POST /auth/register
Register new user (public)

**Request:**
```json
{
  "name": "Ahmad Hassan",
  "email": "ahmad@example.com",
  "phone": "+923001234567",
  "password": "SecurePass123!",
  "roles": ["seller"]
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "userId": "user_123",
    "email": "ahmad@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "pssLevel": 1,
    "stl": 0
  }
}
```

**Errors:** 409 (email exists), 400 (invalid input)

---

### POST /auth/login
User login (public)

**Request:**
```json
{
  "email": "ahmad@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "userId": "user_123",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 86400,
    "roles": ["seller"],
    "pssLevel": 5,
    "stl": 72
  }
}
```

**Errors:** 401 (invalid credentials), 404 (user not found)

---

## PSS (Personal Security System) Endpoints

### POST /pss/submit
Submit PSS verification documents (protected)

**Request (multipart/form-data):**
```
user_id: "user_123"
cnic_document: <file>
face_selfie: <file>
address_proof: <file>
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "pssId": "pss_456",
    "userId": "user_123",
    "status": "verifying",
    "submittedAt": "2026-04-18T14:30:00Z",
    "estimatedDecisionTime": "1-2 hours"
  }
}
```

**Errors:** 400 (missing docs), 413 (file too large)

---

### GET /pss/status/:user_id
Get PSS verification status (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "pssLevel": 5,
    "overallStatus": "verified",
    "documents": [
      { "type": "cnic", "status": "verified", "submittedAt": "2026-01-15", "expiryDate": "2028-01-15" },
      { "type": "face", "status": "verified", "submittedAt": "2026-01-18", "expiryDate": "2028-01-18" },
      { "type": "address", "status": "verified", "submittedAt": "2026-02-01", "expiryDate": "2026-08-01" }
    ],
    "lastUpdated": "2026-04-18T10:00:00Z"
  }
}
```

---

## CRB (Central Record Blockchain) Endpoints

### POST /crb/apply
Apply for CRB inspection (protected)

**Request:**
```json
{
  "userId": "user_123",
  "inspectionType": "physical_verification",
  "certificationArea": "e-commerce_seller"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "crbApplicationId": "crb_app_789",
    "status": "pending",
    "estimatedLeadTime": "5-7 business days",
    "cost": 2500,
    "currency": "PKR",
    "scheduledDate": null,
    "appliedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### POST /crb/inspect
Inspector submits inspection report (inspector role)

**Request:**
```json
{
  "crbApplicationId": "crb_app_789",
  "inspectorId": "inspector_555",
  "result": "approved",
  "notes": "All documents verified, identity confirmed",
  "certificateIssueDate": "2026-04-18",
  "certificateExpiryDate": "2027-04-18",
  "onChainHash": "0x7f3d4e2a..."
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "crbId": "crb_123",
    "userId": "user_123",
    "crbLevel": 5,
    "certificateHash": "0x7f3d4e2a...",
    "blockchainTxHash": "0xabc123def456...",
    "expiryDate": "2027-04-18",
    "inspectedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### GET /crb/status/:user_id
Get CRB verification status (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "crbLevel": 5,
    "overallStatus": "verified",
    "certifications": [
      { "name": "E-Commerce Expert", "issuedDate": "2025-12-01", "expiryDate": "2026-12-01", "certificateHash": "0x..." }
    ],
    "inspectionReports": [
      { "inspectionDate": "2026-03-15", "inspector": "inspector_555", "type": "physical", "result": "approved" }
    ],
    "nextRefillDue": "2026-10-18"
  }
}
```

---

## STL (Service Trust Level) Endpoints

### POST /stl/calculate
Calculate/recalculate STL score for entity (protected or admin)

**Request:**
```json
{
  "entityId": "user_123",
  "entityType": "personal",
  "forceRecalc": false
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "entityId": "user_123",
    "finalSTL": 72,
    "level": "L5",
    "levelName": "PROFESSIONAL",
    "components": {
      "pss": { "score": 40, "weight": 0.4, "contribution": 16 },
      "crb": { "score": 35, "weight": 0.3, "contribution": 10.5 },
      "dmo": { "score": 40, "weight": 0.3, "contribution": 12 }
    },
    "formula": "(40×0.4) + (35×0.3) + (40×0.3) = 72",
    "calculatedAt": "2026-04-18T14:30:00Z",
    "history": [
      { "date": "2026-04-18", "stl": 72, "change": "+2", "reason": "Order completed" }
    ]
  }
}
```

**Errors:** 400 (invalid entity), 404 (entity not found)

---

### GET /stl/status/:entity_id
Get current STL status (public with limited fields)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "entityId": "user_123",
    "finalSTL": 72,
    "level": "L5",
    "levelName": "PROFESSIONAL",
    "lastUpdated": "2026-04-18T14:30:00Z",
    "percentage": 72
  }
}
```

---

## DMO (Governance) Endpoints

### GET /dmo/:user_id
Get DMO status and scores (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "dmoId": "dmo_123",
    "userId": "user_123",
    "level": 5,
    "levelName": "PROFESSIONAL",
    "subscription": {
      "status": "active",
      "tier": "professional",
      "monthlyFee": 1000,
      "currency": "PKR",
      "billingCycle": { "startDate": "2026-04-15", "endDate": "2026-05-15" },
      "nextDeduction": "2026-05-15",
      "daysRemaining": 8
    },
    "scores": {
      "behavior": 78,
      "activity": 65,
      "risk": 12,
      "calculated": "2026-04-18T14:30:00Z"
    },
    "tools": ["order_management", "complaint_resolution", "ai_assistant", "analytics"]
  }
}
```

---

### POST /dmo/check-action
Check if user can perform specific action (protected)

**Request:**
```json
{
  "userId": "user_123",
  "actionType": "add_product",
  "productValue": 5000
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "allowed": true,
    "checks": {
      "pssMinimum": { "required": 2, "current": 5, "passed": true },
      "crbMinimum": { "required": 0, "current": 5, "passed": true },
      "stlMinimum": { "required": 1, "current": 5, "passed": true },
      "dmoApproval": { "required": false, "passed": true },
      "walletSufficient": { "required": true, "current": 45250, "passed": true }
    },
    "approvalStatus": "auto_approved",
    "approvedAt": "2026-04-18T14:30:00Z"
  }
}
```

**Errors:** 403 (action not allowed)

---

### POST /dmo/update
Update DMO scores (admin only, or auto-triggered by system)

**Request:**
```json
{
  "userId": "user_123",
  "behavior": 78,
  "activity": 65,
  "risk": 12,
  "reason": "Nightly recalc based on activity"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "dmoId": "dmo_123",
    "previousLevel": 5,
    "newLevel": 5,
    "levelChanged": false,
    "previousSubscriptionFee": 1000,
    "newSubscriptionFee": 1000,
    "updatedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

## Products Endpoints

### POST /products/add
Create product listing (protected, DMO gate)

**Request:**
```json
{
  "sellerId": "user_123",
  "name": "Wireless Bluetooth Earbuds",
  "price": 3500,
  "currency": "PKR",
  "category": "electronics",
  "description": "High-quality sound...",
  "images": ["https://...", "https://..."],
  "stock": 25,
  "deliveryTimeHours": 2,
  "specifications": { "brand": "Sony", "color": "black" }
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "productId": "prod_789",
    "sellerId": "user_123",
    "name": "Wireless Bluetooth Earbuds",
    "slug": "wireless-bluetooth-earbuds",
    "stlLevel": 5,
    "status": "active",
    "createdAt": "2026-04-18T14:30:00Z",
    "dmoApprovedAt": "2026-04-18T14:30:00Z"
  }
}
```

**Errors:** 403 (DMO not approved), 400 (invalid input)

---

### GET /products
List products with filtering (public)

**Query Params:**
```
?category=electronics&minPrice=1000&maxPrice=10000&minSTL=3&page=1&limit=20&sort=stl_desc&location=islamabad&radius_km=10
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "productId": "prod_789",
        "name": "Wireless Bluetooth Earbuds",
        "price": 3500,
        "currency": "PKR",
        "seller": { "id": "user_123", "name": "Tech Store", "stlLevel": 5 },
        "stlLevel": 5,
        "rating": 4.8,
        "reviewCount": 45,
        "deliveryTime": 2,
        "image": "https://...",
        "badge": "Trusted"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 156 }
  }
}
```

---

### GET /products/:product_id
Get product detail (public)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "productId": "prod_789",
    "name": "Wireless Bluetooth Earbuds",
    "price": 3500,
    "seller": {
      "id": "user_123",
      "name": "Tech Store",
      "stlLevel": 5,
      "rating": 4.8,
      "responseTime": "45 min",
      "joinedDate": "2025-06-01"
    },
    "stlBreakdown": { "seller": 5, "company": 4, "product": 5 },
    "finalSTL": 4,
    "crbVerified": true,
    "images": ["https://..."],
    "description": "...",
    "specifications": { "brand": "Sony", "color": "black" },
    "stock": 25,
    "deliveryTime": 2,
    "rating": 4.8,
    "reviews": [
      { "id": "rev_1", "buyer": "Ali", "rating": 5, "comment": "Great quality!", "date": "2026-04-15" }
    ],
    "complaints": 0,
    "returnPolicy": "7 days",
    "warranty": "1 year manufacturer"
  }
}
```

---

### PUT /products/:product_id
Update product (protected, seller or admin)

**Request:**
```json
{
  "price": 3200,
  "stock": 20,
  "description": "Updated description..."
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "productId": "prod_789",
    "updated": { "price": 3200, "stock": 20 },
    "updatedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### DELETE /products/:product_id
Delete product (protected, seller or admin)

**Response (200):**
```json
{
  "status": "success",
  "data": { "productId": "prod_789", "deleted": true }
}
```

---

## Orders Endpoints

### POST /orders/create
Create order (protected, wallet lock triggered)

**Request:**
```json
{
  "buyerId": "buyer_123",
  "productId": "prod_789",
  "quantity": 2,
  "deliveryAddress": "House 123, Street A, Islamabad",
  "deliveryLat": 33.7298,
  "deliveryLng": 73.1786,
  "preferredDeliveryTime": "2026-04-18T18:00:00Z"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "orderId": "ord_456",
    "buyerId": "buyer_123",
    "sellerId": "user_123",
    "productId": "prod_789",
    "quantity": 2,
    "unitPrice": 3500,
    "subtotal": 7000,
    "ehbFee": 140,
    "total": 7140,
    "currency": "PKR",
    "walletLocked": 7140,
    "status": "pending_seller_confirmation",
    "createdAt": "2026-04-18T14:30:00Z",
    "estimatedDelivery": "2026-04-18T18:00:00Z"
  }
}
```

**Errors:** 403 (DMO not approved), 400 (insufficient wallet), 404 (product not found)

---

### GET /orders
List user's orders (protected)

**Query Params:**
```
?status=all&filter=active&page=1&limit=20&sort=date_desc
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "orders": [
      {
        "orderId": "ord_456",
        "productName": "Wireless Bluetooth Earbuds",
        "seller": "Tech Store",
        "amount": 7140,
        "status": "in_transit",
        "deliveryStatus": "out_for_delivery",
        "rider": "Ali Ahmed",
        "riderPhone": "+923001234567",
        "riderLocation": { "lat": 33.73, "lng": 73.18 },
        "eta": "18:30",
        "createdAt": "2026-04-18T14:30:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 156 }
  }
}
```

---

### GET /orders/:order_id
Get order detail (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "orderId": "ord_456",
    "buyer": { "id": "buyer_123", "name": "Hassan", "rating": 4.9 },
    "seller": { "id": "user_123", "name": "Tech Store", "stl": 5 },
    "product": { "id": "prod_789", "name": "Wireless Earbuds", "price": 3500 },
    "quantity": 2,
    "total": 7140,
    "status": "in_transit",
    "timeline": [
      { "status": "pending", "time": "2026-04-18T14:30:00Z" },
      { "status": "confirmed", "time": "2026-04-18T14:35:00Z" },
      { "status": "picked", "time": "2026-04-18T15:00:00Z" },
      { "status": "in_transit", "time": "2026-04-18T15:30:00Z" }
    ],
    "delivery": {
      "address": "House 123, Street A, Islamabad",
      "riderId": "rdr_123",
      "rider": "Ali Ahmed",
      "riderPhone": "+923001234567",
      "currentLocation": { "lat": 33.73, "lng": 73.18 },
      "eta": "2026-04-18T18:30:00Z"
    },
    "paymentStatus": "locked_in_wallet"
  }
}
```

---

## Wallet Endpoints

### GET /wallet/:user_id
Get wallet balance and history (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "userId": "user_123",
    "balance": { "available": 45250, "locked": 5000, "earning": 12350 },
    "currency": "PKR",
    "transactions": [
      { "id": "txn_001", "date": "2026-04-18T14:30:00Z", "type": "order_lock", "description": "Order #456", "amount": -2500, "balanceAfter": 47750, "status": "pending" }
    ],
    "pagination": { "page": 1, "limit": 50, "total": 234 }
  }
}
```

---

### POST /wallet/deposit
Deposit funds (protected)

**Request:**
```json
{
  "userId": "user_123",
  "amount": 5000,
  "currency": "PKR",
  "paymentMethod": "bank_transfer",
  "bankAccount": "account_123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "transactionId": "txn_dep_001",
    "userId": "user_123",
    "amount": 5000,
    "status": "pending_transfer",
    "bankDetails": {
      "bankName": "HBL",
      "accountNumber": "1234567890",
      "iban": "PK36HBLA0001234567890"
    },
    "instructions": "Transfer amount to above account with reference: txn_dep_001",
    "expiresAt": "2026-04-25T14:30:00Z"
  }
}
```

---

### POST /wallet/withdraw
Withdraw funds (protected)

**Request:**
```json
{
  "userId": "user_123",
  "amount": 10000,
  "currency": "PKR",
  "bankAccount": "account_456"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "withdrawalId": "wd_001",
    "userId": "user_123",
    "amount": 10000,
    "fee": 50,
    "netAmount": 9950,
    "status": "processing",
    "destination": "****4567",
    "estimatedArrival": "2–3 business days",
    "initiatedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

## Delivery Endpoints

### POST /delivery/assign
Auto-assign rider (internal, triggered by order creation)

**Request:**
```json
{
  "orderId": "ord_456",
  "sellerId": "user_123",
  "pickupLocation": { "lat": 33.75, "lng": 73.20 },
  "deliveryLocation": { "lat": 33.73, "lng": 73.18 }
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "deliveryId": "del_123",
    "orderId": "ord_456",
    "riderId": "rdr_123",
    "riderName": "Ali Ahmed",
    "riderPhone": "+923001234567",
    "riderRating": 4.9,
    "franchiseId": "frc_001",
    "estimatedPickupTime": "2026-04-18T15:30:00Z",
    "estimatedDeliveryTime": "2026-04-18T18:30:00Z",
    "assignedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### POST /delivery/update-location
Real-time rider location update (rider app, socket.io)

**Request:**
```json
{
  "deliveryId": "del_123",
  "riderId": "rdr_123",
  "latitude": 33.73,
  "longitude": 73.18,
  "accuracy": 10,
  "speed": 25
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "deliveryId": "del_123",
    "location": { "lat": 33.73, "lng": 73.18 },
    "updatedAt": "2026-04-18T17:45:00Z",
    "eta": "2026-04-18T18:15:00Z"
  }
}
```

---

### POST /delivery/deliver
Mark delivery complete with proof (rider app)

**Request (multipart/form-data):**
```
deliveryId: "del_123"
riderId: "rdr_123"
proof_photo: <file>
signature: <file> OR location: { "lat": 33.73, "lng": 73.18 }
notes: "Left at main gate"
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "deliveryId": "del_123",
    "orderId": "ord_456",
    "status": "delivered",
    "deliveredAt": "2026-04-18T18:15:00Z",
    "proofPhoto": "https://...",
    "proofSignature": "https://...",
    "walletReleased": 7140,
    "riderEarning": 150
  }
}
```

---

### GET /delivery/:order_id
Get delivery tracking (public/protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "orderId": "ord_456",
    "deliveryId": "del_123",
    "rider": { "id": "rdr_123", "name": "Ali Ahmed", "rating": 4.9 },
    "status": "in_transit",
    "currentLocation": { "lat": 33.73, "lng": 73.18 },
    "eta": "2026-04-18T18:30:00Z",
    "route": [
      { "lat": 33.75, "lng": 73.20, "time": "2026-04-18T15:30:00Z" },
      { "lat": 33.74, "lng": 73.19, "time": "2026-04-18T17:00:00Z" }
    ],
    "pickupLocation": { "lat": 33.75, "lng": 73.20, "address": "Tech Store, Street B" },
    "deliveryLocation": { "lat": 33.73, "lng": 73.18, "address": "House 123, Street A" }
  }
}
```

---

## Complaint Endpoints

### POST /complaints/create
File complaint (protected)

**Request:**
```json
{
  "buyerId": "buyer_123",
  "orderId": "ord_456",
  "type": "delay",
  "description": "Delivery was 3 hours late",
  "evidence": ["https://proof1.jpg"]
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "complaintId": "cmp_001",
    "orderId": "ord_456",
    "status": "ai_reviewing",
    "aiReview": {
      "type": "delay",
      "predictedOutcome": "partial_refund",
      "predictedAmount": 1250,
      "confidence": 0.92
    },
    "priority": "medium",
    "filedAt": "2026-04-18T14:30:00Z",
    "estimatedResolutionDate": "2026-04-19T14:30:00Z"
  }
}
```

---

### GET /complaints
List user complaints (protected)

**Query Params:**
```
?status=all&filter=active&page=1&limit=20
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "complaints": [
      {
        "complaintId": "cmp_001",
        "orderId": "ord_456",
        "seller": "Tech Store",
        "type": "delay",
        "status": "ai_reviewing",
        "priority": "medium",
        "filedAt": "2026-04-18T14:30:00Z",
        "aiPrediction": "partial_refund: PKR 1,250"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 9 }
  }
}
```

---

### GET /complaints/:complaint_id
Get complaint detail (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "complaintId": "cmp_001",
    "orderId": "ord_456",
    "buyer": { "id": "buyer_123", "name": "Hassan" },
    "seller": { "id": "user_123", "name": "Tech Store" },
    "type": "delay",
    "description": "Delivery was 3 hours late",
    "status": "ai_reviewing",
    "evidence": [{ "type": "image", "url": "https://..." }],
    "aiAnalysis": {
      "type": "delay",
      "timeOverdue": "3 hours",
      "verdict": "delay_confirmed",
      "recommendation": "partial_refund",
      "suggestedAmount": 1250,
      "confidence": 0.92,
      "reasoning": "Delivery SLA breached, buyer inconvenience justified"
    },
    "sellerResponse": null,
    "dmoDecision": null,
    "filedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### POST /complaints/:complaint_id/resolve
Resolve complaint (admin/DMO)

**Request:**
```json
{
  "decision": "approved",
  "refundAmount": 1250,
  "reason": "Delay confirmed by AI, standard refund applied"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "complaintId": "cmp_001",
    "decision": "approved",
    "refundAmount": 1250,
    "walletRefunded": true,
    "status": "resolved",
    "resolvedAt": "2026-04-18T15:00:00Z"
  }
}
```

---

## AI Marketplace Endpoints

### GET /ai/search
Search products with AI ranking (public)

**Query Params:**
```
?q=wireless+earbuds&category=electronics&minPrice=1000&maxPrice=10000&minSTL=3&location=islamabad&page=1&limit=20
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "query": "wireless earbuds",
    "results": [
      {
        "productId": "prod_789",
        "name": "Wireless Bluetooth Earbuds",
        "price": 3500,
        "seller": "Tech Store",
        "stl": 5,
        "rating": 4.8,
        "relevanceScore": 0.95,
        "rankReason": "High STL + excellent rating + exact match"
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 156 },
    "filters": { "appliedCategory": "electronics", "appliedSTL": 3 }
  }
}
```

---

### GET /ai/recommend
Get AI personalized recommendations (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "userId": "user_123",
    "recommendations": [
      {
        "productId": "prod_790",
        "name": "Phone Case",
        "price": 800,
        "seller": "Tech Store",
        "stl": 5,
        "relevance": "Based on your purchase of earbuds",
        "confidence": 0.88
      }
    ],
    "algorithm": "collaborative_filtering + purchase_history",
    "generatedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### GET /ai/trending
Get trending products (public)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "trending": [
      { "rank": 1, "productId": "prod_789", "name": "Wireless Earbuds", "ordersToday": 23, "trend": "↑ +15% from yesterday" }
    ],
    "period": "today",
    "location": "islamabad"
  }
}
```

---

## Notifications Endpoints

### POST /notifications/send
Send notification (internal, system-triggered)

**Request:**
```json
{
  "userId": "user_123",
  "title": "Order Delivered",
  "message": "Your order #456 has been delivered",
  "type": "order",
  "actionUrl": "/orders/456",
  "expiresIn": 604800
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "notificationId": "notif_001",
    "userId": "user_123",
    "sentAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### GET /notifications/:user_id
Get notifications (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "notifications": [
      {
        "id": "notif_001",
        "title": "Order Delivered",
        "message": "Your order #456 has been delivered",
        "type": "order",
        "read": false,
        "actionUrl": "/orders/456",
        "createdAt": "2026-04-18T14:30:00Z"
      }
    ],
    "unreadCount": 2,
    "pagination": { "page": 1, "limit": 50, "total": 120 }
  }
}
```

---

### PUT /notifications/:notification_id/read
Mark notification as read (protected)

**Response (200):**
```json
{
  "status": "success",
  "data": { "notificationId": "notif_001", "read": true }
}
```

---

## Admin Endpoints (Admin Role Required)

### POST /admin/create
Create admin user (super admin only)

**Request:**
```json
{
  "email": "admin@ehb.io",
  "password": "SecureAdminPass123!",
  "role": "admin",
  "permissions": ["user_management", "finance", "complaints"]
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "adminId": "admin_001",
    "email": "admin@ehb.io",
    "role": "admin",
    "createdAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### GET /admin
List admins (super admin only)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "admins": [
      {
        "id": "admin_001",
        "email": "admin@ehb.io",
        "role": "admin",
        "permissions": ["user_management", "finance", "complaints"],
        "status": "active",
        "createdAt": "2026-04-18T14:30:00Z"
      }
    ]
  }
}
```

---

### POST /admin/user-action
Perform action on user (admin)

**Request:**
```json
{
  "userId": "user_123",
  "action": "ban",
  "reason": "Suspected fraud activity",
  "duration": "7 days"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "userId": "user_123",
    "action": "ban",
    "status": "applied",
    "expiresAt": "2026-04-25T14:30:00Z",
    "appliedBy": "admin_001",
    "appliedAt": "2026-04-18T14:30:00Z"
  }
}
```

---

### GET /admin/finance/transactions
Get all transactions (admin)

**Query Params:**
```
?startDate=2026-04-01&endDate=2026-04-30&type=all&status=completed&limit=100
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "transactions": [
      {
        "id": "txn_001",
        "userId": "user_123",
        "type": "order",
        "amount": 7140,
        "status": "completed",
        "date": "2026-04-18T14:30:00Z"
      }
    ],
    "summary": { "totalCount": 456, "totalAmount": 1234567, "currency": "PKR" },
    "pagination": { "page": 1, "limit": 100, "total": 456 }
  }
}
```

---

### GET /admin/analytics
Get system analytics (admin)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "today": {
      "orders": 234,
      "revenue": 567890,
      "complaints": 3,
      "errors": 2
    },
    "week": {
      "orders": 1456,
      "revenue": 3456789,
      "topProduct": "Wireless Earbuds",
      "topSeller": "Tech Store"
    },
    "month": {
      "orders": 5678,
      "revenue": 13456789,
      "activeUsers": 1234,
      "newUsers": 234
    }
  }
}
```

---

## Affiliate Endpoints

### POST /affiliate/register
Generate/retrieve referral code

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "referral_code": "ABC12XYZ9",
    "referral_url": "https://ehb.io/ref/ABC12XYZ9",
    "qr_code_url": "https://api.ehb.io/qr/ABC12XYZ9.png"
  }
}
```

### GET /affiliate/network/:user_id
View referral tree and stats

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "total_referrals": 42,
    "verified_referrals": 38,
    "network_depth": 4,
    "tree": [{ "level": 1, "count": 10, "total_orders": 250 }]
  }
}
```

### GET /affiliate/earnings/:user_id
View commission earnings breakdown

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "earnings": {
      "direct_bonus": 50000,
      "level_bonus": 35000,
      "pool_bonus": 12000,
      "total": 105000,
      "pending_approval": 5000
    },
    "available": 55000
  }
}
```

### POST /affiliate/withdraw
Withdraw affiliate earnings to wallet or bank

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "withdrawal_id": "aff_w_001",
    "amount": 10000,
    "status": "pending_approval"
  }
}
```

---

## Blockchain Endpoints

### POST /blockchain/hash
Store event hash on-chain (BSC/Polkadot)

**Request:**
```json
{
  "entity_type": "crb|stl|transfer|audit",
  "entity_id": "string",
  "data": "object",
  "chain": "bsc|polkadot"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "hash": "0x1a2b3c4d...",
    "tx_id": "string",
    "on_chain_at": "2026-04-18T12:00:00Z"
  }
}
```

### GET /blockchain/verify/:hash
Verify hash on-chain

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "hash": "0x1a2b3c4d...",
    "verified": true,
    "tx_id": "string",
    "block": 1234567
  }
}
```

### GET /blockchain/history/:entity_id
Get on-chain history for entity

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "entity_id": "string",
    "events": [
      {
        "hash": "0x1a2b3c4d...",
        "type": "crb_certification_passed",
        "timestamp": "2026-04-18T12:00:00Z"
      }
    ]
  }
}
```

---

## Payment Gateway Endpoints

### POST /payment/deposit
Initiate deposit via JazzCash/Easypaisa/Bank/Stripe

**Request:**
```json
{
  "user_id": "string",
  "amount": 10000,
  "gateway": "jazzcash|easypaisa|bank|stripe"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "deposit_id": "dep_001",
    "redirect_url": "https://gateway.com/pay/...",
    "expires_in": 900
  }
}
```

### POST /payment/webhook
Gateway callback (JazzCash/Easypaisa/Bank/Stripe)

**Request (from gateway):**
```json
{
  "deposit_id": "dep_001",
  "status": "success|failed",
  "amount": 10000,
  "signature": "hmac_hash"
}
```

**Response (200):**
```json
{
  "status": "success",
  "ack": true
}
```

### POST /payment/withdraw
Initiate withdrawal to bank or personal wallet

**Request:**
```json
{
  "user_id": "string",
  "amount": 5000,
  "bank_account_id": "optional"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "withdrawal_id": "wth_001",
    "status": "pending_approval",
    "bank_processing_time": "1-2 business days"
  }
}
```

### GET /payment/status/:id
Check payment/withdrawal status

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "transaction_id": "id",
    "type": "deposit|withdrawal",
    "amount": 10000,
    "status": "success|pending|failed",
    "created_at": "2026-04-18T12:00:00Z"
  }
}
```

---

## Socket.IO Events (Real-Time)

**Connection:**
```javascript
socket.emit('user_login', { userId: 'user_123' })
socket.on('connection_confirmed', (data) => { /* user joined */ })
```

**Delivery Tracking:**
```javascript
socket.emit('delivery_update', { deliveryId, lat, lng, eta })
socket.on('delivery_location', (data) => { /* update map */ })
```

**Notifications:**
```javascript
socket.on('notification', (data) => { /* new notification */ })
```

**Order Status:**
```javascript
socket.on('order_status_change', (data) => { /* order updated */ })
```

---

## Error Codes

| Code | Meaning | HTTP Status |
|------|---------|-------------|
| VALIDATION_ERROR | Input validation failed | 400 |
| UNAUTHORIZED | Missing/invalid token | 401 |
| FORBIDDEN | Insufficient permissions | 403 |
| NOT_FOUND | Resource not found | 404 |
| CONFLICT | Resource already exists | 409 |
| RATE_LIMITED | Too many requests | 429 |
| SERVER_ERROR | Internal server error | 500 |
| SERVICE_UNAVAILABLE | Service temporarily down | 503 |

---

## Changelog

| Date | Ver | Change |
|------|-----|--------|
| 2026-04-18 | 1.1 | Added 11 endpoints: 4 Affiliate (register, network, earnings, withdraw), 3 Blockchain (hash, verify, history), 4 Payment (deposit, webhook, withdraw, status). Supports multi-level referral tracking, on-chain hashing, JazzCash/Easypaisa/Bank/Stripe integration. |
| 2026-04-18 | 1.0 | Complete API specification with all endpoints from 12-phase build (Auth, PSS, CRB, STL, DMO, Products, Orders, Wallet, Delivery, Complaints, AI Marketplace, Notifications, Admin). Includes request/response structures, error codes, Socket.IO events. ~2,500 lines. |

---

*EHB Technologies (Pvt.) Ltd. · API Spec v1.0 · 2026-04-18*
