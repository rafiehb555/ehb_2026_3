import mongoose from 'mongoose';

const JobPostingSchema = new mongoose.Schema(
  {
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, index: true },
    industry: { type: String, default: 'JPS' },
    employmentType: { type: String, enum: ['full_time', 'part_time', 'contract', 'freelance', 'internship'], default: 'full_time' },
    location: String,
    remoteOk: { type: Boolean, default: false },
    salaryMin: Number,
    salaryMax: Number,
    currency: { type: String, default: 'USD' },
    requiredStl: { type: Number, default: 3 },
    requiredSkills: [String],
    requiredCrbExams: [String],
    designation: { type: String, enum: ['junior', 'intermediate', 'senior', 'expert'], default: 'junior' },
    status: { type: String, enum: ['draft', 'active', 'paused', 'closed'], default: 'active' },
    stats: {
      views: { type: Number, default: 0 },
      applications: { type: Number, default: 0 },
    },
    closingAt: Date,
  },
  { timestamps: true }
);

JobPostingSchema.index({ status: 1, createdAt: -1 });
JobPostingSchema.index({ category: 1, status: 1 });

export default mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema);
