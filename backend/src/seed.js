import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { Course, Enrollment, Notice, Payment, StudyMaterial, User } from './models/index.js';

dotenv.config();

const courses = [
  {
    title: 'Digital Marketing Mastery',
    slug: 'digital-marketing-mastery',
    description: 'SEO, ads, analytics, content strategy, funnels, and client-ready campaign practice.',
    category: 'Marketing',
    level: 'Beginner',
    duration: '4 Months',
    fee: 24999,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    benefits: ['Live campaign projects', 'Placement support', 'Portfolio reviews'],
    curriculum: [{ module: 'Foundations', lessons: [{ title: 'SEO Basics', duration: 45, order: 1 }] }]
  },
  {
    title: 'Graphic Design Professional',
    slug: 'graphic-design-professional',
    description: 'Photoshop, Illustrator, brand systems, social creatives, and portfolio presentation.',
    category: 'Design',
    level: 'Beginner',
    duration: '3 Months',
    fee: 21999,
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    featured: true,
    benefits: ['Design portfolio', 'Creative briefs', 'Print and digital workflows'],
    curriculum: [{ module: 'Visual Design', lessons: [{ title: 'Layout Systems', duration: 40, order: 1 }] }]
  },
  {
    title: 'French Language Certification',
    slug: 'french-language-certification',
    description: 'A1 to B1 spoken French, grammar, vocabulary, listening practice, and exam preparation.',
    category: 'Languages',
    level: 'Intermediate',
    duration: '5 Months',
    fee: 18999,
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    featured: false,
    benefits: ['Small batches', 'Speaking drills', 'International exam guidance'],
    curriculum: [{ module: 'A1 Basics', lessons: [{ title: 'Introductions', duration: 35, order: 1 }] }]
  }
];

async function seed() {
  if (!process.env.MONGODB_URI) throw new Error('Set MONGODB_URI before running seed.');
  await connectDatabase();
  await Promise.all([Course.deleteMany({}), User.deleteMany({}), Notice.deleteMany({}), Payment.deleteMany({}), Enrollment.deleteMany({}), StudyMaterial.deleteMany({})]);

  const admin = await User.create({ name: 'Onevriksh Admin', email: 'admin@onevriksh.com', phone: '8700536553', password: 'Admin@123', role: 'admin' });
  const student = await User.create({ name: 'Demo Student', email: 'student@onevriksh.com', phone: '8595840141', password: 'Student@123', role: 'student', studentId: 'OVS1001' });
  const createdCourses = await Course.insertMany(courses.map((course) => ({ ...course, trainer: admin._id })));

  await Enrollment.create({ student: student._id, course: createdCourses[0]._id, progress: 65 });
  await Payment.create({ student: student._id, course: createdCourses[0]._id, amount: createdCourses[0].fee, status: 'paid', method: 'Razorpay', paidAt: new Date() });
  await Notice.create({ title: 'New weekend batch starts soon', body: 'Digital Marketing and Graphic Design weekend batches begin this Sunday.', createdBy: admin._id });
  await StudyMaterial.create({ title: 'SEO Starter Notes', course: createdCourses[0]._id, type: 'pdf', url: 'https://example.com/seo-notes.pdf', uploadedBy: admin._id });

  console.log('Seed complete');
  console.log('Admin: admin@onevriksh.com / Admin@123');
  console.log('Student: student@onevriksh.com / Student@123');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
