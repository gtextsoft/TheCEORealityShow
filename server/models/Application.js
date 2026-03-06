import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    age: { type: Number, required: true },
    occupation: { type: String, required: true },
    experience: { type: String, required: true },
    whyYou: { type: String, required: true },
    socials: { type: String, required: true },
    videoUrl: { type: String, default: null },
    videoPublicId: { type: String, default: null },
    referral: { type: String, required: true },
  },
  { timestamps: true }
);

applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ email: 1 });

export default mongoose.model('Application', applicationSchema);
