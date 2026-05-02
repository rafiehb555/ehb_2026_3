// EHB STL — 58 Gold-Master Regression Tests
// Run: node --test src/services/stlService.test.js
//      pnpm test:stl
//
// PROTECTED: these baseline values are the canonical truth.
// Never edit without regenerating ALL 58 expected values and getting sign-off.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSTL,
  scoreToLevel,
  validateProductChain,
  effectsForLevel,
} from './stlService.js';

describe('STL scoreToLevel (10 tests)', () => {
  it('#1 score 0 → L1 FREE', () => assert.equal(scoreToLevel(0), 1));
  it('#2 score 9.99 → L1', () => assert.equal(scoreToLevel(9.99), 1));
  it('#3 score 10 → L2 BASIC', () => assert.equal(scoreToLevel(10), 2));
  it('#4 score 19.99 → L2', () => assert.equal(scoreToLevel(19.99), 2));
  it('#5 score 20 → L3', () => assert.equal(scoreToLevel(20), 3));
  it('#6 score 39.99 → L4', () => assert.equal(scoreToLevel(39.99), 4));
  it('#7 score 50 → L6', () => assert.equal(scoreToLevel(50), 6));
  it('#8 score 69.99 → L7', () => assert.equal(scoreToLevel(69.99), 7));
  it('#9 score 89.99 → L9', () => assert.equal(scoreToLevel(89.99), 9));
  it('#10 score 100 → L10 SUPREME', () => assert.equal(scoreToLevel(100), 10));
});

describe('STL calculateSTL — zero/edge cases (8 tests)', () => {
  it('#11 all zero → L1, score 0', () => {
    const r = calculateSTL({ pssLevel: 0, crbLevel: 0, dmoLevel: 0 });
    assert.equal(r.level, 1);
    assert.equal(r.score, 0);
    assert.equal(r.levelName, 'FREE');
    assert.equal(r.ehbgcLockRequired, 0);
  });

  it('#12 negative clamped to 0', () => {
    const r = calculateSTL({ pssLevel: -5, crbLevel: -1, dmoLevel: 0 });
    assert.equal(r.pssLevel, 0);
    assert.equal(r.level, 1);
  });

  it('#13 overflow clamped to 10', () => {
    const r = calculateSTL({ pssLevel: 99, crbLevel: 100, dmoLevel: 50 });
    assert.equal(r.pssLevel, 10);
    assert.equal(r.crbLevel, 10);
    assert.equal(r.dmoLevel, 10);
    assert.equal(r.level, 10);
  });

  it('#14 only PSS: L10/0/0 blocked by lowest=0', () => {
    const r = calculateSTL({ pssLevel: 10, crbLevel: 0, dmoLevel: 0 });
    assert.equal(r.breakdown.lowestComponent, 0);
    assert.equal(r.breakdown.cap, 10); // 0 * 10 + 10
    assert.ok(r.score <= 10);
  });

  it('#15 only CRB: 0/L10/0 blocked', () => {
    const r = calculateSTL({ pssLevel: 0, crbLevel: 10, dmoLevel: 0 });
    assert.equal(r.breakdown.lowestComponent, 0);
    assert.ok(r.score <= 10);
  });

  it('#16 only DMO: 0/0/L10 blocked', () => {
    const r = calculateSTL({ pssLevel: 0, crbLevel: 0, dmoLevel: 10 });
    assert.equal(r.breakdown.lowestComponent, 0);
    assert.ok(r.score <= 10);
  });

  it('#17 all L1 → low composite', () => {
    const r = calculateSTL({ pssLevel: 1, crbLevel: 1, dmoLevel: 1 });
    assert.equal(r.rawScore, 12);
    assert.equal(r.breakdown.cap, 20); // 1*10+10
    assert.equal(r.score, 10); // min(12/1.2, 20) = min(10, 20) = 10
    assert.equal(r.level, 2);
  });

  it('#18 all L10 → max', () => {
    const r = calculateSTL({ pssLevel: 10, crbLevel: 10, dmoLevel: 10 });
    assert.equal(r.rawScore, 120);
    assert.equal(r.score, 100);
    assert.equal(r.level, 10);
    assert.equal(r.levelName, 'SUPREME');
    assert.equal(r.ehbgcLockRequired, 10000);
  });
});

describe('STL calculateSTL — balanced combos (10 tests)', () => {
  it('#19 all L5 → L6 HIGH 50 pts', () => {
    const r = calculateSTL({ pssLevel: 5, crbLevel: 5, dmoLevel: 5 });
    assert.equal(r.rawScore, 60);
    assert.equal(r.breakdown.cap, 60);
    assert.equal(r.score, 50); // min(60/1.2, 60) = 50
    assert.equal(r.level, 6);
  });

  it('#20 all L3', () => {
    const r = calculateSTL({ pssLevel: 3, crbLevel: 3, dmoLevel: 3 });
    assert.equal(r.rawScore, 36);
    assert.equal(r.score, 30);
    assert.equal(r.level, 4);
  });

  it('#21 all L4', () => {
    const r = calculateSTL({ pssLevel: 4, crbLevel: 4, dmoLevel: 4 });
    assert.equal(r.score, 40);
    assert.equal(r.level, 5);
  });

  it('#22 all L7', () => {
    const r = calculateSTL({ pssLevel: 7, crbLevel: 7, dmoLevel: 7 });
    assert.equal(r.score, 70);
    assert.equal(r.level, 8);
  });

  it('#23 all L8', () => {
    const r = calculateSTL({ pssLevel: 8, crbLevel: 8, dmoLevel: 8 });
    assert.equal(r.score, 80);
    assert.equal(r.level, 9);
  });

  it('#24 all L9', () => {
    const r = calculateSTL({ pssLevel: 9, crbLevel: 9, dmoLevel: 9 });
    assert.equal(r.score, 90);
    assert.equal(r.level, 10);
  });

  it('#25 all L6', () => {
    const r = calculateSTL({ pssLevel: 6, crbLevel: 6, dmoLevel: 6 });
    assert.equal(r.score, 60);
    assert.equal(r.level, 7);
  });

  it('#26 all L2', () => {
    const r = calculateSTL({ pssLevel: 2, crbLevel: 2, dmoLevel: 2 });
    assert.equal(r.score, 20);
    assert.equal(r.level, 3);
  });

  it('#27 level names correct', () => {
    const names = ['FREE', 'BASIC', 'NORMAL', 'STANDARD', 'ADVANCED', 'HIGH', 'PRO', 'VIP', 'ELITE', 'SUPREME'];
    for (let i = 1; i <= 10; i++) {
      const r = calculateSTL({ pssLevel: i, crbLevel: i, dmoLevel: i });
      assert.equal(r.levelName, names[r.level - 1]);
    }
  });

  it('#28 EHBGC lock matches level canonical ladder (via calc output)', () => {
    const locks = { 1: 0, 2: 20, 3: 40, 4: 80, 5: 200, 6: 400, 7: 800, 8: 2000, 9: 5000, 10: 10000 };
    // Balanced input i yields output level i+1 (or 10 if i===10). Verify lock matches OUTPUT level.
    for (let i = 1; i <= 10; i++) {
      const r = calculateSTL({ pssLevel: i, crbLevel: i, dmoLevel: i });
      const expected = locks[r.level];
      assert.equal(r.ehbgcLockRequired, expected, `input L${i} → output L${r.level} lock should be ${expected}`);
    }
  });
});

describe('STL calculateSTL — MIN-chain cap enforcement (10 tests)', () => {
  it('#29 L10/L10/L1 → cap at L1+1=L2', () => {
    const r = calculateSTL({ pssLevel: 10, crbLevel: 10, dmoLevel: 1 });
    assert.equal(r.breakdown.lowestComponent, 1);
    assert.equal(r.breakdown.cap, 20);
    assert.equal(r.score, 20);
    assert.equal(r.level, 3);
  });

  it('#30 L10/L1/L10 → cap by CRB', () => {
    const r = calculateSTL({ pssLevel: 10, crbLevel: 1, dmoLevel: 10 });
    assert.equal(r.breakdown.lowestComponent, 1);
    assert.equal(r.score, 20);
  });

  it('#31 L1/L10/L10 → cap by PSS', () => {
    const r = calculateSTL({ pssLevel: 1, crbLevel: 10, dmoLevel: 10 });
    assert.equal(r.breakdown.lowestComponent, 1);
    assert.equal(r.score, 20);
  });

  it('#32 L5/L5/L1 → cap 20', () => {
    const r = calculateSTL({ pssLevel: 5, crbLevel: 5, dmoLevel: 1 });
    assert.equal(r.breakdown.cap, 20);
  });

  it('#33 L3/L2/L1 → cap 20, level NORMAL', () => {
    const r = calculateSTL({ pssLevel: 3, crbLevel: 2, dmoLevel: 1 });
    assert.equal(r.score, 20);
    assert.equal(r.level, 3);
  });

  it('#34 L7/L6/L5 → cap 60 (lowest=5)', () => {
    const r = calculateSTL({ pssLevel: 7, crbLevel: 6, dmoLevel: 5 });
    assert.equal(r.breakdown.cap, 60);
    // raw/1.2 = 72/1.2 = 60, cap = 60 → score = 60
    assert.equal(r.score, 60);
  });

  it('#35 source cap PSS L5 only → max L6', () => {
    // If user has only PSS L5 (no CRB, no DMO), their cap from PSS alone = L5
    // But lowest = 0 makes it cap at 10, which = L2
    const r = calculateSTL({ pssLevel: 5, crbLevel: 0, dmoLevel: 0 });
    assert.equal(r.breakdown.lowestComponent, 0);
    assert.ok(r.level <= 2);
  });

  it('#36 L8/L7/L6 balanced mid-high', () => {
    const r = calculateSTL({ pssLevel: 8, crbLevel: 7, dmoLevel: 6 });
    assert.equal(r.breakdown.cap, 70);
    // raw = 84, raw/1.2 = 70 → score = 70
    assert.equal(r.score, 70);
    assert.equal(r.level, 8);
  });

  it('#37 L2/L2/L2 lowest ok', () => {
    const r = calculateSTL({ pssLevel: 2, crbLevel: 2, dmoLevel: 2 });
    assert.equal(r.breakdown.cap, 30);
    assert.equal(r.score, 20);
  });

  it('#38 Increasing lowest raises cap monotonically', () => {
    let prev = 0;
    for (let l = 1; l <= 10; l++) {
      const r = calculateSTL({ pssLevel: 10, crbLevel: 10, dmoLevel: l });
      assert.ok(r.score >= prev, `score should not decrease: L${l}=${r.score} vs prev=${prev}`);
      prev = r.score;
    }
  });
});

describe('STL MIN-chain rule — validateProductChain (10 tests)', () => {
  it('#39 all L10 → final L10', () => {
    const r = validateProductChain({ productSTL: 10, sellerSTL: 10, companySTL: 10, ownerSTL: 10 });
    assert.equal(r.finalStl, 10);
    assert.equal(r.finalLevelName, 'SUPREME');
  });

  it('#40 product weakest', () => {
    const r = validateProductChain({ productSTL: 2, sellerSTL: 8, companySTL: 9, ownerSTL: 10 });
    assert.equal(r.finalStl, 2);
    assert.equal(r.blockingLayer, 'product');
  });

  it('#41 seller weakest', () => {
    const r = validateProductChain({ productSTL: 8, sellerSTL: 3, companySTL: 8, ownerSTL: 9 });
    assert.equal(r.finalStl, 3);
    assert.equal(r.blockingLayer, 'seller');
  });

  it('#42 company weakest', () => {
    const r = validateProductChain({ productSTL: 9, sellerSTL: 8, companySTL: 4, ownerSTL: 10 });
    assert.equal(r.finalStl, 4);
    assert.equal(r.blockingLayer, 'company');
  });

  it('#43 owner weakest', () => {
    const r = validateProductChain({ productSTL: 9, sellerSTL: 9, companySTL: 9, ownerSTL: 5 });
    assert.equal(r.finalStl, 5);
    assert.equal(r.blockingLayer, 'owner');
  });

  it('#44 any L1 in chain → final L1', () => {
    const r = validateProductChain({ productSTL: 10, sellerSTL: 10, companySTL: 1, ownerSTL: 10 });
    assert.equal(r.finalStl, 1);
    assert.equal(r.finalLevelName, 'FREE');
  });

  it('#45 ties → first sorted wins deterministically', () => {
    const r = validateProductChain({ productSTL: 5, sellerSTL: 5, companySTL: 5, ownerSTL: 5 });
    assert.equal(r.finalStl, 5);
  });

  it('#46 chain returns all 4 entries sorted ascending', () => {
    const r = validateProductChain({ productSTL: 8, sellerSTL: 2, companySTL: 10, ownerSTL: 5 });
    assert.equal(r.chain.length, 4);
    assert.equal(r.chain[0].level, 2);
    assert.equal(r.chain[3].level, 10);
  });

  it('#47 defaults to 10 when fields missing', () => {
    const r = validateProductChain({});
    assert.equal(r.finalStl, 10);
  });

  it('#48 partial args respected', () => {
    const r = validateProductChain({ productSTL: 3 });
    assert.equal(r.finalStl, 3);
    assert.equal(r.blockingLayer, 'product');
  });
});

describe('STL effectsForLevel (10 tests)', () => {
  it('#49 L1 effects', () => {
    const e = effectsForLevel(1);
    assert.equal(e.level, 1);
    assert.equal(e.levelName, 'FREE');
    assert.equal(e.canList, false);
    assert.equal(e.canFranchise, false);
  });

  it('#50 L4 can list, cannot franchise', () => {
    const e = effectsForLevel(4);
    assert.equal(e.canList, true);
    assert.equal(e.canFranchise, false);
  });

  it('#51 L7 can franchise', () => {
    const e = effectsForLevel(7);
    assert.equal(e.canList, true);
    assert.equal(e.canFranchise, true);
  });

  it('#52 L10 unlimited', () => {
    const e = effectsForLevel(10);
    assert.equal(e.canFranchise, true);
    assert.ok(e.dailyEarningsCapUsd >= 1500);
  });

  it('#53 visibility multiplier scales with level', () => {
    const e1 = effectsForLevel(1).searchVisibilityMultiplier;
    const e10 = effectsForLevel(10).searchVisibilityMultiplier;
    assert.ok(e10 > e1);
  });

  it('#54 fee decreases with level', () => {
    const f1 = effectsForLevel(1).platformFeePct;
    const f10 = effectsForLevel(10).platformFeePct;
    assert.ok(f10 < f1);
  });

  it('#55 fee never below 0.5%', () => {
    for (let l = 1; l <= 10; l++) {
      assert.ok(effectsForLevel(l).platformFeePct >= 0.5);
    }
  });

  it('#56 out-of-range clamps', () => {
    assert.equal(effectsForLevel(0).level, 1);
    assert.equal(effectsForLevel(99).level, 10);
    assert.equal(effectsForLevel(-5).level, 1);
  });

  it('#57 all levels return a levelName', () => {
    for (let l = 1; l <= 10; l++) {
      const e = effectsForLevel(l);
      assert.ok(e.levelName && e.levelName.length > 0);
    }
  });

  it('#58 ehbgcLockRequired in effects matches canonical ladder', () => {
    const canonical = { 1: 0, 2: 20, 3: 40, 4: 80, 5: 200, 6: 400, 7: 800, 8: 2000, 9: 5000, 10: 10000 };
    for (const [lvl, expected] of Object.entries(canonical)) {
      assert.equal(effectsForLevel(+lvl).ehbgcLockRequired, expected);
    }
  });
});
