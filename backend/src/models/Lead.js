import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      enum: ['demo', 'contact', 'counselling', 'visit'],
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    course: {
      type: String,
      trim: true
    },
    mode: {
      type: String,
      enum: ['offline', 'online', 'both', 'Weekday morning', 'Weekday evening', 'Weekend', ''],
      default: ''
    },
    preferredTime: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'scheduled', 'converted', 'closed'],
      default: 'new',
      index: true
    },
    referenceId: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ kind: 1, status: 1, createdAt: -1 });

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
