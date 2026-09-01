import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Foundation", "Advanced", "Mastery", "A1–A2", etc.
    duration: { type: String, required: true }, // e.g. "4 Months", "8 Months", "12 Months"
    suitableFor: { type: String, default: '' },
    coreTopics: [{ type: String }]
  },
  { _id: false }
);

const moduleTopicSchema = new mongoose.Schema(
  {
    module: { type: String, required: true },
    description: { type: String, default: '' },
    topics: [{ type: String }]
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    category: { type: String, required: true, trim: true, index: true }, // Marketing, Design, Languages, Technology
    shortDescription: { type: String, trim: true },
    longDescription: { type: String, trim: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'pending'],
      default: 'published',
      index: true
    },
    published: { type: Boolean, default: true, index: true },
    duration: { type: String, default: '4 Months' },
    deliveryModes: [{ type: String, default: ['Offline Classroom', 'Live Online'] }],
    levels: [levelSchema],
    curriculum: [moduleTopicSchema],
    learningOutcomes: [{ type: String }],
    practicalActivities: [{ type: String }],
    tools: [{ type: String }],
    targetAudience: [{ type: String }],
    careerPaths: [{ type: String }],
    certification: {
      title: { type: String, default: 'OneVriksh Skill Certificate' },
      description: { type: String, default: 'Issued upon successful course completion and project review.' },
      requirements: [{ type: String }]
    },
    placementSupport: {
      rate: { type: String, default: '100% Placement Rate*' },
      disclaimer: {
        type: String,
        default: '*Based on students placed by OneVriksh to date. Past placement outcomes do not guarantee future results.'
      },
      features: [{ type: String }]
    },
    faqs: [faqSchema],
    image: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    fee: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

courseSchema.index({ published: 1, featured: -1, createdAt: -1 });
courseSchema.index({ published: 1, category: 1 });

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
