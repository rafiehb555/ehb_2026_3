import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true, index: true },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    coverLetter: String,
    resumeText: String,
    candidateStlSnapshot: Number,
    status: { type: String, enum: ['applied', 'shortlisted', 'interview', 'offered', 'hired', 'rejected'], default: 'applied', index: true },
    matchScore: Number, // 0-1 AI match score
    aiResumeUsed: Boolean,
  },
  { timestamps: true }
);

JobApplicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
