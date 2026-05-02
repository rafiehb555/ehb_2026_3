import CrbExam from '../models/CrbExam.js';
import CrbAttempt from '../models/CrbAttempt.js';
import User from '../models/User.js';
import { isConnected } from '../config/db.js';
import { anchor } from './blockchainService.js';
import { logActivity } from './auditService.js';
import { calculateSTL } from './stlService.js';

export async function listAvailableExams(userStlLevel = 1) {
  if (!isConnected()) return [];
  return CrbExam.find({ active: true, levelTarget: { $lte: userStlLevel + 2 } })
    .select('-questions.correctIndex') // hide answers
    .lean();
}

export async function startExam({ userId, examId }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const exam = await CrbExam.findById(examId);
  if (!exam) throw Object.assign(new Error('Exam not found'), { status: 404 });
  const attempt = await CrbAttempt.create({
    userId,
    examId: exam._id,
    examCode: exam.code,
    startedAt: new Date(),
    answers: [],
  });
  // Return exam with questions but without correctIndex
  const publicExam = {
    _id: exam._id,
    code: exam.code,
    title: exam.title,
    type: exam.type,
    durationMin: exam.durationMin,
    passPct: exam.passPct,
    levelTarget: exam.levelTarget,
    questions: exam.questions.map((q) => ({
      _id: q._id,
      prompt: q.prompt,
      options: q.options,
    })),
  };
  return { attemptId: attempt._id, exam: publicExam };
}

export async function submitAttempt({ attemptId, userId, answers }) {
  if (!isConnected()) throw Object.assign(new Error('DB not connected'), { status: 503 });
  const attempt = await CrbAttempt.findById(attemptId);
  if (!attempt) throw Object.assign(new Error('Attempt not found'), { status: 404 });
  if (String(attempt.userId) !== String(userId)) throw Object.assign(new Error('Forbidden'), { status: 403 });
  if (attempt.submittedAt) throw Object.assign(new Error('Already submitted'), { status: 409 });

  const exam = await CrbExam.findById(attempt.examId);
  if (!exam) throw Object.assign(new Error('Exam not found'), { status: 404 });

  let correct = 0;
  exam.questions.forEach((q, i) => {
    if (answers?.[i] === q.correctIndex) correct++;
  });
  const total = exam.questions.length || 1;
  const scorePct = (correct / total) * 100;
  const passed = scorePct >= (exam.passPct || 70);

  attempt.answers = answers || [];
  attempt.submittedAt = new Date();
  attempt.scorePct = Math.round(scorePct * 100) / 100;
  attempt.passed = passed;

  let anchoredHash = null;
  if (passed) {
    // Update user's CRB level + recompute STL
    const user = await User.findById(userId);
    const newCrb = Math.max(user.crb?.level || 0, exam.levelTarget || 1);
    const newStl = calculateSTL({
      pssLevel: user.pss?.level || 0,
      crbLevel: newCrb,
      dmoLevel: user.dmo?.level || 2,
    });
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          'crb.level': newCrb,
          'crb.certifications': [
            ...(user.crb?.certifications || []),
            { name: exam.code, issuer: 'EHB CRB', expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) },
          ],
          'stl.score': newStl.score,
          'stl.level': newStl.level,
        },
      }
    );

    // Anchor certificate hash on blockchain (stub)
    const proof = await anchor({
      targetType: 'crb_certificate',
      targetId: `${userId}-${exam.code}-${Date.now()}`,
      payload: { userId: String(userId), examCode: exam.code, scorePct, passedAt: new Date() },
    });
    anchoredHash = proof.hash;
    attempt.levelAwarded = newCrb;
    attempt.certificateHash = proof.hash;
  }

  await attempt.save();
  await logActivity({
    actorUserId: userId,
    action: `crb.${passed ? 'passed' : 'failed'}`,
    target: 'crb_exam',
    targetId: String(exam._id),
    after: { scorePct, passed, levelAwarded: attempt.levelAwarded, hash: anchoredHash },
  });

  return {
    scorePct: attempt.scorePct,
    passed,
    levelAwarded: attempt.levelAwarded,
    certificateHash: anchoredHash,
  };
}

export async function myCertificates(userId) {
  if (!isConnected()) return [];
  return CrbAttempt.find({ userId, passed: true }).sort({ createdAt: -1 }).lean();
}
