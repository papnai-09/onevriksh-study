import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    type: { type: String, default: 'general' },
    audience: { type: String, enum: ['all', 'students', 'course'], default: 'all' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    published: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

noticeSchema.index({ published: 1, publishedAt: -1 });

export const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);
