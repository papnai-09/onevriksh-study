import bcrypt from 'bcryptjs';

// Pre-hashed password for 'password123'
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('password123', 10);

const DEFAULT_COURSES = [
  {
    _id: 'c1',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Marketing',
    status: 'published',
    published: true,
    featured: true,
    duration: '4 – 12 Months',
    deliveryModes: ['Classroom Training', 'Live Interactive Sessions'],
    shortDescription: 'Practical, career-focused digital marketing training with hands-on projects and industry tools.',
    longDescription: 'Master the full spectrum of digital marketing from organic search optimization and paid campaign acquisition to performance analytics and conversion strategy. Learn through hands-on exercises, live campaign case studies, and practical briefs.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    curriculum: [
      { module: 'Search Engine Optimization (SEO)', description: 'Understand how search engines index, rank, and surface content organically.', topics: ['On-page SEO', 'Technical SEO', 'Keyword Research'] },
      { module: 'Search Engine Marketing (SEM / Paid Ads)', description: 'Build, target, and optimize paid search campaigns on Google Ads.', topics: ['Google Ads', 'Search & Display Ads', 'PPC Budgeting'] },
      { module: 'Social Media Marketing', description: 'Develop multi-platform organic and paid brand communication strategies.', topics: ['Meta Ads', 'LinkedIn B2B', 'Content Calendars'] }
    ],
    levels: [
      { name: 'Foundation', duration: '4 Months', suitableFor: 'Beginners starting from scratch with digital marketing fundamentals.' },
      { name: 'Advanced', duration: '8 Months', suitableFor: 'Learners seeking deeper practical execution and campaign management skills.' },
      { name: 'Mastery', duration: '12 Months', suitableFor: 'Career-oriented advanced learners aiming for full-stack marketing leadership.' }
    ]
  },
  {
    _id: 'c2',
    slug: 'graphic-ui-ux-design',
    title: 'Graphic & UI/UX Design',
    category: 'Design',
    status: 'published',
    published: true,
    featured: true,
    duration: '4 – 12 Months',
    deliveryModes: ['Classroom Training', 'Live Interactive Sessions'],
    shortDescription: 'From design fundamentals to Figma design systems and production-ready portfolio case studies.',
    longDescription: 'Build strong visual communication skills and user-centred design thinking.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    curriculum: [
      { module: 'Visual Design Fundamentals', description: 'Master colour theory, typography and grid layouts.', topics: ['Colour Theory', 'Typography', 'Figma Basics'] },
      { module: 'UI & Interaction Design', description: 'Design responsive mobile and web interfaces.', topics: ['Design Systems', 'Prototyping', 'Component Libraries'] }
    ],
    levels: [
      { name: 'Foundation', duration: '4 Months', suitableFor: 'Design enthusiasts and career starters.' },
      { name: 'Advanced', duration: '8 Months', suitableFor: 'Designers wanting strong UI/UX portfolio projects.' },
      { name: 'Mastery', duration: '12 Months', suitableFor: 'Product designers and creative directors.' }
    ]
  },
  {
    _id: 'c3',
    slug: 'web-app-development',
    title: 'Full Stack Web & App Development',
    category: 'Development',
    status: 'published',
    published: true,
    featured: true,
    duration: '4 – 12 Months',
    deliveryModes: ['Classroom Training', 'Live Interactive Sessions'],
    shortDescription: 'Modern web & mobile development using JavaScript, React, Next.js, Node.js and database architecture.',
    longDescription: 'Become an industry-ready full-stack software engineer building real-world production web applications and APIs.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    curriculum: [
      { module: 'Frontend Engineering', description: 'Modern responsive interfaces using HTML5, CSS3, JavaScript and React.', topics: ['React.js', 'Next.js', 'State Management'] },
      { module: 'Backend Architecture', description: 'Build REST APIs and scalable server architectures.', topics: ['Node.js', 'Express', 'MongoDB & SQL'] }
    ],
    levels: [
      { name: 'Foundation', duration: '4 Months', suitableFor: 'Beginners with no prior coding experience.' },
      { name: 'Advanced', duration: '8 Months', suitableFor: 'Developers building full-stack applications.' },
      { name: 'Mastery', duration: '12 Months', suitableFor: 'Software engineers targeting senior development roles.' }
    ]
  },
  {
    _id: 'c4',
    slug: 'french-language',
    title: 'French Language Training',
    category: 'Languages',
    status: 'published',
    published: true,
    featured: true,
    duration: '3 – 9 Months',
    deliveryModes: ['Classroom Training', 'Live Interactive Sessions'],
    shortDescription: 'CEFR-aligned French language training from A1 beginner to B2 professional proficiency for study abroad and careers.',
    longDescription: 'Prepare for DELF / DALF certification exams required for French university admissions, Canadian immigration, and multinational corporate roles.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    curriculum: [
      { module: 'DELF A1 / A2 Foundation', description: 'Basic communication, grammar, phonetics and daily conversational fluency.', topics: ['Pronunciation', 'Grammar', 'Daily Dialogues'] },
      { module: 'DELF B1 / B2 Fluency', description: 'Advanced comprehension, essay writing and visa interview readiness.', topics: ['Complex Grammar', 'DELF Mock Exams', 'Academic French'] }
    ],
    levels: [
      { name: 'A1 - Beginner', duration: '3 Months', suitableFor: 'First-time French learners.' },
      { name: 'A2 - Elementary', duration: '3 Months', suitableFor: 'Basic conversational speakers.' },
      { name: 'B1 / B2 - Intermediate', duration: '6 Months', suitableFor: 'Study abroad and career aspirants.' }
    ]
  },
  {
    _id: 'c5',
    slug: 'german-language',
    title: 'German Language Training',
    category: 'Languages',
    status: 'published',
    published: true,
    featured: true,
    duration: '3 – 9 Months',
    deliveryModes: ['Classroom Training', 'Live Interactive Sessions'],
    shortDescription: 'Master Goethe-Zertifikat A1 to B2 German for German university admissions and job seeker visas.',
    longDescription: 'Structured German language courses designed to meet APS certificate requirements and Goethe-Institut exam standards.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    curriculum: [
      { module: 'Goethe A1 / A2', description: 'Sentence structure, articles, cases and everyday communication.', topics: ['Akkusativ & Dativ', 'Speaking Drills', 'Listening Practice'] },
      { module: 'Goethe B1 / B2', description: 'Technical German, presentation skills and Goethe exam preparation.', topics: ['Goethe Mock Tests', 'APS Prep', 'Professional German'] }
    ],
    levels: [
      { name: 'A1 - Beginner', duration: '3 Months', suitableFor: 'Starters aiming for German university prep.' },
      { name: 'A2 - Elementary', duration: '3 Months', suitableFor: 'Learners expanding vocabulary and cases.' },
      { name: 'B1 / B2 - Advanced', duration: '6 Months', suitableFor: 'Visa and university admission applicants.' }
    ]
  },
  {
    _id: 'c6',
    slug: 'spanish-language',
    title: 'Spanish Language Training',
    category: 'Languages',
    status: 'published',
    published: true,
    featured: false,
    duration: '3 – 9 Months',
    deliveryModes: ['Classroom Training', 'Live Interactive Sessions'],
    shortDescription: 'DELE & SIELE exam preparation from A1 to B2 with certified Hispanic language trainers.',
    longDescription: 'Learn global Spanish for European university admissions, international trade, and career expansion.',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    curriculum: [
      { module: 'DELE A1 / A2', description: 'Basic conversational Spanish and Hispanic culture.', topics: ['Vocabulary', 'Present & Past Tenses', 'Listening'] }
    ],
    levels: [
      { name: 'A1 - Beginner', duration: '3 Months', suitableFor: 'Beginners.' },
      { name: 'B1 - Intermediate', duration: '6 Months', suitableFor: 'Global career and travel preparation.' }
    ]
  }
];

class MemoryStore {
  constructor() {
    this.reset();
  }

  reset() {
    this.users = [
      {
        _id: 'u-admin',
        accountId: 'u-admin',
        name: 'Platform Administrator',
        email: 'admin@onevriksh.com',
        password: DEFAULT_PASSWORD_HASH,
        phone: '+91 9876543210',
        role: 'admin',
        active: true,
        studentId: 'OVS-ADM-001',
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePassword: async function(entered) {
          return bcrypt.compare(entered, this.password);
        },
        matchPassword: async function(entered) {
          return bcrypt.compare(entered, this.password);
        }
      },
      {
        _id: 'u-student',
        accountId: 'u-student',
        name: 'Rahul Sharma',
        email: 'student@onevriksh.com',
        password: DEFAULT_PASSWORD_HASH,
        phone: '+91 9812345678',
        role: 'student',
        active: true,
        studentId: 'OVS202601',
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePassword: async function(entered) {
          return bcrypt.compare(entered, this.password);
        },
        matchPassword: async function(entered) {
          return bcrypt.compare(entered, this.password);
        }
      }
    ];

    this.courses = [...DEFAULT_COURSES];

    this.certificates = [
      {
        _id: 'cert-1',
        certificateNumber: 'OVS-CERT-2026-001',
        credentialId: 'OVS-CERT-2026-001',
        studentName: 'Rahul Sharma',
        courseName: 'Full Stack Web & App Development',
        courseTitle: 'Full Stack Web & App Development',
        issuedAt: new Date('2026-01-15'),
        issueDate: new Date('2026-01-15'),
        status: 'Verified & Issued',
        verified: true,
        grade: 'Grade A+',
        certificateUrl: null
      },
      {
        _id: 'cert-2',
        certificateNumber: 'OVS-CERT-2026-SAMPLE',
        credentialId: 'OVS-CERT-2026-SAMPLE',
        studentName: 'Priya Verma',
        courseName: 'Digital Marketing',
        courseTitle: 'Digital Marketing',
        issuedAt: new Date('2026-02-10'),
        issueDate: new Date('2026-02-10'),
        status: 'Verified & Issued',
        verified: true,
        grade: 'Grade A',
        certificateUrl: null
      }
    ];

    this.notices = [
      {
        _id: 'n-1',
        title: 'New Batch Schedule - September 2026',
        content: 'Weekday morning and evening classroom batches commence on Monday at our Connaught Place training studio.',
        category: 'academic',
        audience: 'all',
        published: true,
        publishedAt: new Date()
      },
      {
        _id: 'n-2',
        title: 'DELF & Goethe Mock Exam Workshop',
        content: 'Special mock exam simulation with individual trainer feedback this Saturday at 11:00 AM.',
        category: 'exam',
        audience: 'all',
        published: true,
        publishedAt: new Date()
      }
    ];

    this.leads = [];
    this.enrollments = [
      {
        _id: 'e-1',
        student: 'u-student',
        course: 'c3',
        status: 'active',
        progress: 68,
        batchName: 'Morning Web Dev Batch A',
        enrollmentDate: new Date('2026-01-10'),
        createdAt: new Date()
      }
    ];

    this.attendances = [
      {
        _id: 'att-1',
        student: 'u-student',
        date: new Date(),
        status: 'present',
        topic: 'Building Production REST APIs'
      }
    ];

    this.studyMaterials = [
      {
        _id: 'm-1',
        title: 'Full Stack Architecture Handbook',
        type: 'pdf',
        course: 'c3',
        url: '#'
      }
    ];

    this.tests = [
      {
        _id: 't-1',
        title: 'React & Node.js Practical Assessment',
        course: 'c3',
        totalMarks: 100
      }
    ];

    this.results = [
      {
        _id: 'r-1',
        student: 'u-student',
        test: 't-1',
        score: 92,
        totalMarks: 100,
        grade: 'A+'
      }
    ];

    this.payments = [
      {
        _id: 'p-1',
        student: 'u-student',
        amount: 25000,
        status: 'completed',
        date: new Date('2026-01-10'),
        receiptId: 'REC-2026-001'
      }
    ];
  }
}

export const memoryStore = new MemoryStore();

/**
 * Creates an in-memory Model mock supporting common Mongoose query chains.
 */
export function createMemoryModel(collectionName) {
  function getCollection() {
    return memoryStore[collectionName] || [];
  }

  function wrapDoc(doc) {
    if (!doc) return null;
    const cloned = { ...doc };
    if (!cloned._id) cloned._id = `id_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    
    // Add User comparePassword and matchPassword
    if (collectionName === 'users') {
      cloned.comparePassword = async function(entered) {
        return bcrypt.compare(entered, this.password);
      };
      cloned.matchPassword = async function(entered) {
        return bcrypt.compare(entered, this.password);
      };
    }

    cloned.save = async function() {
      const coll = getCollection();
      const idx = coll.findIndex(item => item._id === this._id);
      if (idx >= 0) {
        coll[idx] = { ...this, updatedAt: new Date() };
      } else {
        coll.push(this);
      }
      return this;
    };

    return cloned;
  }

  function matchFilter(doc, filter) {
    if (!filter || Object.keys(filter).length === 0) return true;
    for (const [key, value] of Object.entries(filter)) {
      if (key === '$or' && Array.isArray(value)) {
        const matchesAny = value.some(subFilter => matchFilter(doc, subFilter));
        if (!matchesAny) return false;
        continue;
      }
      if (value instanceof RegExp) {
        if (!value.test(doc[key] || '')) return false;
      } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        if (value.$regex) {
          const reg = new RegExp(value.$regex, value.$options || '');
          if (!reg.test(doc[key] || '')) return false;
        }
      } else if (doc[key] !== value) {
        return false;
      }
    }
    return true;
  }

  class MemoryQuery {
    constructor(promiseFn) {
      this.promiseFn = promiseFn;
      this._select = null;
      this._populate = [];
      this._sort = null;
      this._limit = null;
    }

    select(fields) {
      this._select = fields;
      return this;
    }

    populate(path, selectFields) {
      this._populate.push({ path, selectFields });
      return this;
    }

    sort(sortObj) {
      this._sort = sortObj;
      return this;
    }

    limit(n) {
      this._limit = n;
      return this;
    }

    async exec() {
      let result = await this.promiseFn();
      if (Array.isArray(result)) {
        if (this._limit && typeof this._limit === 'number') {
          result = result.slice(0, this._limit);
        }
        return result.map(wrapDoc);
      }
      return wrapDoc(result);
    }

    then(onFulfilled, onRejected) {
      return this.exec().then(onFulfilled, onRejected);
    }

    catch(onRejected) {
      return this.exec().catch(onRejected);
    }
  }

  return {
    find(filter = {}) {
      return new MemoryQuery(async () => {
        const coll = getCollection();
        return coll.filter(item => matchFilter(item, filter));
      });
    },

    findOne(filter = {}) {
      return new MemoryQuery(async () => {
        const coll = getCollection();
        return coll.find(item => matchFilter(item, filter)) || null;
      });
    },

    findById(id) {
      return new MemoryQuery(async () => {
        const coll = getCollection();
        return coll.find(item => item._id === id || item._id?.toString() === id?.toString()) || null;
      });
    },

    async create(data) {
      const coll = getCollection();
      let docData = { ...data };
      if (!docData._id) {
        docData._id = `mem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      }
      docData.createdAt = new Date();
      docData.updatedAt = new Date();

      if (collectionName === 'users' && docData.password && !docData.password.startsWith('$2a$')) {
        docData.password = await bcrypt.hash(docData.password, 10);
      }

      const doc = wrapDoc(docData);
      coll.push(doc);
      return doc;
    },

    async insertMany(docs) {
      const results = [];
      for (const d of docs) {
        results.push(await this.create(d));
      }
      return results;
    },

    async findByIdAndUpdate(id, update, options = {}) {
      const coll = getCollection();
      const idx = coll.findIndex(item => item._id === id || item._id?.toString() === id?.toString());
      if (idx === -1) return null;
      coll[idx] = { ...coll[idx], ...update, updatedAt: new Date() };
      return wrapDoc(coll[idx]);
    },

    async findByIdAndDelete(id) {
      const coll = getCollection();
      const idx = coll.findIndex(item => item._id === id || item._id?.toString() === id?.toString());
      if (idx === -1) return null;
      const [deleted] = coll.splice(idx, 1);
      return wrapDoc(deleted);
    },

    async countDocuments(filter = {}) {
      const coll = getCollection();
      return coll.filter(item => matchFilter(item, filter)).length;
    }
  };
}
