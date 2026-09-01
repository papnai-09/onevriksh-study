import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    studentName: {
      type: String,
      trim: true
    },
    courseName: {
      type: String,
      trim: true
    },
    grade: {
      type: String,
      default: 'A'
    },
    certificateUrl: String,
    issuedAt: {
      type: Date,
      default: Date.now,
      index: true
    },
    verified: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

certificateSchema.index({ student: 1, course: 1 });

export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
