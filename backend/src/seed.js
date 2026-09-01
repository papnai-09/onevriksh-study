import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Course } from './models/Course.js';
import { Notice } from './models/Notice.js';
import { Certificate } from './models/Certificate.js';
import { Lead } from './models/Lead.js';

dotenv.config();

const coursesToSeed = [
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Marketing',
    status: 'published',
    published: true,
    featured: true,
    duration: '4 – 12 Months',
    deliveryModes: ['Classroom Training', 'Live Interactive Sessions'],
    shortDescription: 'Practical, career-focused digital marketing training with hands-on projects and industry tools.',
    longDescription:
      'Master the full spectrum of digital marketing from organic search optimization and paid campaign acquisition to performance analytics and conversion strategy. Learn through hands-on exercises, live campaign case studies, and practical briefs.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    levels: [
      {
        name: 'Foundation',
        duration: '4 Months',
        suitableFor: 'Beginners starting from scratch with digital marketing fundamentals.',
        coreTopics: [
          'Digital marketing fundamentals & digital landscape',
          'Search Engine Optimization (SEO) basics',
          'Search Engine Marketing (SEM) basics',
          'Social media marketing fundamentals',
          'Website fundamentals & user experience',
          'Content creation basics',
          'Keyword research methodologies'
        ]
      },
      {
        name: 'Advanced',
        duration: '8 Months',
        suitableFor: 'Learners seeking deeper practical execution and campaign management skills.',
        coreTopics: [
          'Advanced SEO (Technical SEO, site audits & backlink strategy)',
          'Google Ads campaign architecture & optimization',
          'Meta Advertising (Facebook & Instagram Ads Manager)',
          'Multi-channel social media marketing strategy',
          'Web analytics & GA4 measurement setup',
          'Performance reporting & KPI tracking',
          'End-to-end campaign implementation'
        ]
      },
      {
        name: 'Mastery',
        duration: '12 Months',
        suitableFor: 'Career-oriented advanced learners aiming for full-stack marketing leadership or freelancing.',
        coreTopics: [
          'Full-stack digital marketing strategy & execution',
          'Comprehensive multi-channel campaign management',
          'Marketing automation & lifecycle funnels',
          'Advanced analytics, attribution & data reporting',
          'Performance marketing & CRO (Conversion Rate Optimization)',
          'Freelancing, client acquisition & consulting workflows',
          'Capstone portfolio building & strategic project defense'
        ]
      }
    ],
    curriculum: [
      {
        module: 'Search Engine Optimization (SEO)',
        description: 'Understand how search engines index, rank, and surface content organically.',
        topics: [
          'On-page SEO: title tags, meta descriptions, headings, internal linking & content optimization',
          'Off-page SEO: ethical link building, digital PR & domain authority growth',
          'Technical SEO: site speed, crawlability, XML sitemaps & schema markup',
          'Keyword research: search intent analysis, competitor benchmarking & keyword mapping',
          'Search visibility tracking & organic performance reporting'
        ]
      },
      {
        module: 'Search Engine Marketing (SEM / Paid Ads)',
        description: 'Build, target, and optimize paid search campaigns on Google Ads.',
        topics: [
          'Google Ads account setup, structure & campaign types',
          'Search advertising: keyword match types, ad copy creation & quality score optimization',
          'Display advertising & visual banner targeting',
          'YouTube video advertising & audience segmentation',
          'PPC budget management, bidding strategies & ROI measurement'
        ]
      },
      {
        module: 'Social Media Marketing',
        description: 'Develop multi-platform organic and paid brand communication strategies.',
        topics: [
          'Facebook & Instagram marketing, content pillars & audience targeting',
          'LinkedIn B2B marketing & professional network growth',
          'Twitter / X engagement strategies where relevant',
          'Social media content calendar & campaign planning',
          'Community management, engagement & platform algorithms'
        ]
      },
      {
        module: 'Content & Copywriting Strategy',
        description: 'Craft audience-centric content that educates, engages, and converts.',
        topics: [
          'Content marketing strategy & audience persona definition',
          'Editorial planning, content calendars & distribution funnels',
          'Copywriting fundamentals for ads, landing pages & blogs',
          'Content distribution across owned, earned & paid channels'
        ]
      },
      {
        module: 'Email Marketing & Basic Automation',
        description: 'Build email subscriber lists, craft newsletters, and setup automated sequences.',
        topics: [
          'Email marketing fundamentals & subscriber segmentation',
          'Campaign creation, newsletter templates & subject line testing',
          'Basic welcome automation workflows & drip sequences',
          'Open rate, click-through rate (CTR) & deliverability tracking'
        ]
      },
      {
        module: 'Affiliate Marketing',
        description: 'Understand partner marketing, tracking networks, and campaign scaling.',
        topics: [
          'Affiliate marketing fundamentals & network ecosystems',
          'Campaign strategy, partner selection & compliance',
          'Commission structures & performance tracking'
        ]
      },
      {
        module: 'Web Analytics & Measurement',
        description: 'Collect, analyze, and interpret traffic and conversion data.',
        topics: [
          'Google Analytics 4 (GA4) setup, events & conversion tracking',
          'Google Search Console (GSC) for crawl monitoring & organic queries',
          'User behavior tracking & performance attribution',
          'Custom marketing dashboards & analytical reporting'
        ]
      },
      {
        module: 'E-commerce Marketing',
        description: 'Drive traffic, reduce cart abandonment, and grow product sales.',
        topics: [
          'E-commerce marketing fundamentals & product listing optimization',
          'Product catalog promotion & shopping ads',
          'Conversion-oriented marketing & promotional strategies'
        ]
      },
      {
        module: 'Online Reputation Management (ORM)',
        description: 'Protect, monitor, and elevate brand reputation across digital channels.',
        topics: [
          'Brand reputation monitoring & sentiment analysis',
          'Review response strategy & customer feedback management',
          'Brand protection & crisis response guidelines'
        ]
      },
      {
        module: 'Influencer Marketing',
        description: 'Plan, execute, and measure collaborative influencer campaigns.',
        topics: [
          'Influencer outreach strategy & niche creator discovery',
          'Campaign planning, brief creation & contract essentials',
          'Performance evaluation, reach & ROI measurement'
        ]
      }
    ],
    tools: [
      'Google Analytics 4 (GA4)',
      'Google Search Console',
      'Google Ads',
      'Meta Ads Manager',
      'SEMrush',
      'Canva',
      'WordPress'
    ],
    practicalActivities: [
      'Practical projects covering SEO audits and keyword mapping',
      'Hands-on Google Ads & Meta Ads campaign simulations',
      'Social media content calendar and creative design exercises',
      'Analytics setup, conversion tracking, and performance reporting',
      'Capstone digital marketing strategy defense'
    ],
    targetAudience: [
      'Students and fresh graduates seeking digital career entry',
      'Job seekers transitioning into digital marketing roles',
      'Working professionals looking to upskill in performance marketing',
      'Entrepreneurs & small business owners wanting to market their own products',
      'Freelancers looking to offer digital marketing services'
    ],
    careerPaths: [
      'SEO Executive / Specialist',
      'Google Ads / PPC Specialist',
      'Social Media Marketer',
      'Content Strategist',
      'Email Marketing Executive',
      'Digital Marketing Executive / Manager',
      'Affiliate Marketer',
      'Web & Performance Analyst',
      'E-commerce Marketing Executive'
    ],
    certification: {
      title: 'OneVriksh Skill Certificate in Digital Marketing',
      description: 'Awarded upon course completion, minimum 85% attendance, and successful submission of all required practical projects.',
      requirements: [
        'Completion of all core modules in the enrolled track',
        'Submission and faculty review of practical assignments',
        'Final capstone project presentation'
      ]
    },
    placementSupport: {
      rate: '100% Placement Rate*',
      disclaimer: '*Based on students placed by OneVriksh to date. Past placement outcomes do not guarantee future results.',
      features: [
        'Resume review and portfolio presentation guidance',
        'Mock interview preparation sessions',
        'Direct referral support for matching entry-level opportunities'
      ]
    },
    faqs: [
      {
        question: 'Which level (Foundation, Advanced, or Mastery) should I join?',
        answer: 'If you are new to marketing, the Foundation level (4 months) covers the core essentials. If you want hands-on campaign execution experience, the Advanced (8 months) or Mastery (12 months) tracks provide deep project-based training.'
      },
      {
        question: 'Do you offer a free demo class?',
        answer: 'Yes, you can book a free demo session to explore our interactive teaching style, meet the instructor, and review the detailed curriculum.'
      },
      {
        question: 'What are the practical learning requirements?',
        answer: 'Learners complete hands-on assignments including live keyword research, ad campaign planning, content calendars, and analytics reporting.'
      }
    ]
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Designing',
    category: 'Design',
    status: 'pending',
    published: true,
    featured: false,
    duration: 'Under Development',
    deliveryModes: ['Classroom Training', 'Live Online'],
    shortDescription: 'Comprehensive visual design, typography, branding, and digital creative production training.',
    longDescription:
      'This course curriculum is currently being structured with updated industry modules, creative project briefs, and design software workflows. Detailed curriculum and schedule will be published shortly.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    levels: [
      {
        name: 'Comprehensive Course',
        duration: 'Course Content Being Updated',
        suitableFor: 'Aspiring visual designers and creative enthusiasts.',
        coreTopics: ['Content pending final business confirmation']
      }
    ],
    curriculum: [
      {
        module: 'Course Overview & Foundations',
        description: 'Curriculum details for Graphic Designing are currently being finalized.',
        topics: [
          'Visual design principles & composition',
          'Typography, color theory & layout hierarchy',
          'Industry software fundamentals',
          'Practical creative briefs'
        ]
      }
    ],
    tools: ['Adobe Creative Suite (Workflows Under Finalization)'],
    practicalActivities: ['Creative project-based assignments upon curriculum launch'],
    targetAudience: [
      'Students interested in creative visual communication',
      'Beginners wanting to learn digital graphic design tools',
      'Professionals seeking to create marketing visuals'
    ],
    careerPaths: [
      'Junior Graphic Designer',
      'Visual Content Creator',
      'Brand Identity Designer',
      'Social Media Designer'
    ],
    certification: {
      title: 'OneVriksh Skill Certificate in Graphic Designing',
      description: 'Will be issued upon successful course completion and portfolio defense.',
      requirements: ['Full attendance and approved portfolio submission']
    },
    placementSupport: {
      rate: '100% Placement Rate*',
      disclaimer: '*Based on students placed by OneVriksh to date. Past placement outcomes do not guarantee future results.',
      features: ['Portfolio structuring guidance', 'Mock interviews']
    },
    faqs: [
      {
        question: 'When will the detailed Graphic Designing syllabus be published?',
        answer: 'The full module breakdown and batch schedules are currently being updated. You can contact us for upcoming batch previews.'
      }
    ]
  },
  {
    slug: 'spanish-language',
    title: 'Spanish Language',
    category: 'Languages',
    status: 'published',
    published: true,
    featured: true,
    duration: 'CEFR A1 – C2',
    deliveryModes: ['Interactive Classroom', 'Live Online'],
    shortDescription: 'Structured Spanish language training from beginner A1 to proficient C2 aligned with CEFR standards.',
    longDescription:
      'Learn to speak, understand, read, and write Spanish with confidence. Structured according to the Common European Framework of Reference for Languages (CEFR), this course combines grammar foundations, pronunciation drills, real-world conversational role-play, and cultural awareness.',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    levels: [
      {
        name: 'A1–A2 (Beginner)',
        duration: 'Foundational Stage',
        suitableFor: 'Learners starting with zero prior knowledge of Spanish.',
        coreTopics: [
          'Spanish alphabet, phonetics & basic pronunciation',
          'Greetings, introductions & essential everyday phrases',
          'Fundamental grammar: present tense, gender of nouns & basic verbs (ser, estar, tener)',
          'Core vocabulary: numbers, days, time, family, food & daily routines',
          'Basic conversational exchanges for travel, shopping & directions'
        ]
      },
      {
        name: 'B1–B2 (Intermediate)',
        duration: 'Independent User Stage',
        suitableFor: 'Learners who want to communicate fluently in everyday, social, and workplace situations.',
        coreTopics: [
          'Expressing opinions, narrating past events & future plans',
          'Complex grammar: past tenses (pretérito perfecto, indefinido, imperfecto) & subjunctive mood',
          'Extended conversational fluency & group discussions',
          'Reading comprehension of Spanish articles, literature & media',
          'Workplace communication, formal email drafting & presentation basics'
        ]
      },
      {
        name: 'C1–C2 (Advanced)',
        duration: 'Proficient User Stage',
        suitableFor: 'Learners aiming for professional, academic, or high-level bilingual fluency.',
        coreTopics: [
          'Nuanced professional communication & public speaking in Spanish',
          'Advanced vocabulary, idiomatic expressions & regional dialects',
          'Critical comprehension of complex texts and business reports',
          'Formal essay writing, translations & academic discourse'
        ]
      }
    ],
    curriculum: [
      {
        module: 'Pronunciation & Phonetics',
        description: 'Master the sounds, accents, and rhythms of the Spanish language.',
        topics: [
          'Spanish vowels and distinct consonant sounds (r, rr, j, ll, ñ)',
          'Stress patterns, accent marks (tildes) & intonation',
          'Guided pronunciation drills and voice recordings'
        ]
      },
      {
        module: 'Grammar & Sentence Structure',
        description: 'Build robust grammatical foundations for clear and accurate communication.',
        topics: [
          'Verb conjugations across regular and irregular groups',
          'Tenses: Present, Past (Pretérito & Imperfecto), Future & Conditional',
          'Subjunctive mood and conditional sentences',
          'Sentence syntax, prepositions & pronouns (direct/indirect)'
        ]
      },
      {
        module: 'Speaking & Conversational Practice',
        description: 'Develop spontaneous speaking skills through active dialogue.',
        topics: [
          'Everyday conversational practice and situational dialogues',
          'Role-play scenarios: travel, dining, shopping, emergencies & appointments',
          'Group discussions, debates & oral presentations'
        ]
      },
      {
        module: 'Listening Comprehension',
        description: 'Train your ear to understand varied accents and speeds of native speech.',
        topics: [
          'Structured listening exercises with native audio dialogues',
          'Audio/video comprehension and dialogue transcript analysis',
          'Listening for main ideas vs. specific details'
        ]
      },
      {
        module: 'Reading & Text Analysis',
        description: 'Understand written Spanish across a variety of text genres.',
        topics: [
          'Short stories, dialogues & practical signs',
          'Spanish news articles, blogs & informational texts',
          'Vocabulary expansion through context'
        ]
      },
      {
        module: 'Writing Skills',
        description: 'Compose structured personal and formal written communications.',
        topics: [
          'Informal notes, messages & personal letters',
          'Formal emails, inquiries & business correspondence',
          'Descriptive essays & structured paragraph writing'
        ]
      },
      {
        module: 'Culture & Hispanic World',
        description: 'Explore the diverse cultural customs of Spain and Latin America.',
        topics: [
          'Cultural traditions, festivities & customs across Spanish-speaking nations',
          'Polite conventions, formal vs. informal addressing (tú vs. usted)',
          'Cross-cultural communication etiquette'
        ]
      }
    ],
    tools: [
      'Interactive audio/video listening materials',
      'Grammar worksheets & structured exercise workbooks',
      'Vocabulary flashcards & pronunciation practice drills',
      'Google Classroom / Learning portal resources'
    ],
    practicalActivities: [
      'Conversational role-plays and real-life dialogue simulations',
      'Translation and sentence formation exercises',
      'Business and travel communication scenarios',
      'Mock interview and speaking assessments'
    ],
    targetAudience: [
      'Students planning international education or exchange programs',
      'Job seekers looking to add foreign language proficiency to their resume',
      'Professionals working with Spanish-speaking clients or global teams',
      'Travelers and language enthusiasts'
    ],
    careerPaths: [
      'Language Specialist / Bilingual Executive',
      'Translator (Written Translation)',
      'Interpreter (Spoken Interpretation)',
      'Travel & Tourism Consultant',
      'International Customer Support / BPO Representative',
      'Multilingual Content Writer / Editor',
      'Language Trainer / Tutor'
    ],
    certification: {
      title: 'OneVriksh Spanish Language Certificate',
      description: 'Certifies CEFR-aligned proficiency level attained upon passing the level assessment test.',
      requirements: ['Regular class attendance and passing the comprehensive end-of-level evaluation']
    },
    placementSupport: {
      rate: '100% Placement Rate*',
      disclaimer: '*Based on students placed by OneVriksh to date. Past placement outcomes do not guarantee future results.',
      features: ['Resume translation and bilingual CV guidance', 'Interview preparation for language roles']
    },
    faqs: [
      {
        question: 'Is this course suitable for complete beginners?',
        answer: 'Yes! The A1 level starts from the alphabet, basic sounds, and everyday greetings, requiring zero prior Spanish knowledge.'
      },
      {
        question: 'Do you prepare students for official DELE / SIELE exams?',
        answer: 'Our curriculum follows the CEFR syllabus, which aligns directly with the format and requirements of official DELE and SIELE exams.'
      }
    ]
  },
  {
    slug: 'german-language',
    title: 'German Language',
    category: 'Languages',
    status: 'published',
    published: true,
    featured: true,
    duration: 'CEFR A1 – C2',
    deliveryModes: ['Interactive Classroom', 'Live Online'],
    shortDescription: 'Systematic German language training from A1 to C2 with rigorous grammar, speaking, and listening focus.',
    longDescription:
      'Build solid fluency in the German language through structured modules covering vocabulary, grammatical precision, conversational dialogue, and cultural context. Designed to prepare learners for everyday life, German university study, and professional communication.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    levels: [
      {
        name: 'A1 (Beginner)',
        duration: 'Introductory Stage',
        suitableFor: 'Complete beginners starting German from scratch.',
        coreTopics: [
          'German alphabet, pronunciation & umlauts (ä, ö, ü, ß)',
          'Self-introduction, greetings & basic personal questions',
          'Everyday phrases, numbers, time, food, shopping & directions',
          'Basic grammar: articles (der, die, das), basic verb conjugation & nominative case'
        ]
      },
      {
        name: 'A2 (Elementary)',
        duration: 'Elementary Stage',
        suitableFor: 'Learners who have mastered A1 basics.',
        coreTopics: [
          'Daily conversation on familiar topics (family, work, living environment)',
          'Expressing personal needs, preferences & making appointments',
          'Grammar: Akkusativ & Dativ cases, modal verbs, separable verbs & perfect tense (Perfekt)',
          'Describing past events and simple future plans'
        ]
      },
      {
        name: 'B1 (Intermediate)',
        duration: 'Intermediate Stage',
        suitableFor: 'Learners seeking independent communication for travel, study, or work.',
        coreTopics: [
          'Entering unprepared into conversations on familiar topics',
          'Narrating stories, describing dreams, hopes & ambitions',
          'Giving brief reasons and explanations for opinions and plans',
          'Grammar: Genitiv case, relative clauses, passive voice & subjunctive II (Konjunktiv II)',
          'Paragraph writing, formal letters & comprehensive reading'
        ]
      },
      {
        name: 'B2 (Upper Intermediate)',
        duration: 'Upper Intermediate Stage',
        suitableFor: 'Learners preparing for workplace integration or university study in Germany.',
        coreTopics: [
          'Fluency development & spontaneous interaction with native speakers',
          'Understanding complex texts on concrete and abstract topics',
          'Advanced grammar structures, connectors & nuanced expression',
          'Workplace communication, technical discussions & formal presentations'
        ]
      },
      {
        name: 'C1 (Advanced)',
        duration: 'Advanced User Stage',
        suitableFor: 'Learners aiming for professional or academic excellence.',
        coreTopics: [
          'Expressing ideas fluently and spontaneously without obvious searching for expressions',
          'Flexible and effective language use for social, academic & professional purposes',
          'Producing clear, well-structured, detailed text on complex subjects'
        ]
      },
      {
        name: 'C2 (Mastery)',
        duration: 'Mastery Stage',
        suitableFor: 'Learners aiming for bilingual native-like command.',
        coreTopics: [
          'Understanding with ease virtually everything heard or read',
          'Summarizing information from different spoken and written sources',
          'Expressing oneself spontaneously, very fluently, and precisely, differentiating finer shades of meaning'
        ]
      }
    ],
    curriculum: [
      {
        module: 'Vocabulary & Sentence Formation',
        description: 'Expand your practical lexicon and understand German word order (Satzbau).',
        topics: [
          'Thematic vocabulary: everyday routines, family, hobbies, office & travel',
          'Word order in main clauses vs. subordinate clauses (Verb-second rule, Weil/Dass clauses)',
          'Compound nouns and word formation techniques'
        ]
      },
      {
        module: 'Grammar Foundations & Precision',
        description: 'Master German cases, verb patterns, and tense systems step by step.',
        topics: [
          'The 4 Cases: Nominativ, Akkusativ, Dativ, Genitiv',
          'Tenses: Präsens, Perfekt, Präteritum, Plusquamperfekt, Futur I & II',
          'Modal verbs, reflexive verbs, and prepositions with cases',
          'Passive voice (Passiv) and Subjunctive (Konjunktiv I & II)'
        ]
      },
      {
        module: 'Pronunciation & Phonetics',
        description: 'Speak German clearly with accurate phonetics and intonation.',
        topics: [
          'German vowel length, diphthongs (ei, eu, au) & umlauts',
          'Consonant clusters (sch, ch, sp, st) and word stress',
          'Rhythm and sentence intonation in connected speech'
        ]
      },
      {
        module: 'Conversational German & Speaking Practice',
        description: 'Build spontaneous conversation skills in formal and informal settings.',
        topics: [
          'Formal vs. informal communication (Sie vs. Du etiquette)',
          'Everyday dialogue simulations (doctor, restaurant, train station, office)',
          'Expressing opinions, agreeing, disagreeing, and debating',
          'Structured oral presentations and discussions'
        ]
      },
      {
        module: 'Reading Comprehension & Listening',
        description: 'Understand authentic German audio, podcasts, and written materials.',
        topics: [
          'Listening to dialogues, announcements & podcasts with varied accents',
          'Reading news articles, short essays & informational reports',
          'Extracting specific details vs. overarching concepts'
        ]
      },
      {
        module: 'Written Expression & Correspondence',
        description: 'Write accurate personal letters, formal emails, and essays.',
        topics: [
          'Writing formal emails for workplace and administrative purposes',
          'Composing personal letters, descriptions & opinion essays',
          'Proofreading, grammar checking & editing strategies'
        ]
      },
      {
        module: 'Cultural Awareness & Everyday Life in DACH',
        description: 'Gain insight into the culture and customs of Germany, Austria, and Switzerland.',
        topics: [
          'Social etiquette, punctuality, and workplace culture in Germany',
          'Life in German-speaking countries: housing, transport & daily systems',
          'Regional traditions and language variations'
        ]
      }
    ],
    tools: [
      'Structured German audio dialogues & podcast resources',
      'Grammar worksheets, case tables & exercise workbooks',
      'Vocabulary flashcards & word-building drills',
      'Learning portal materials & practice assessments'
    ],
    practicalActivities: [
      'Conversational role-plays and real-life dialogue simulations',
      'Writing formal emails and situational case studies',
      'Oral presentations and structured group discussions',
      'Revision sheets, regular assessments, and doubt-clearing sessions'
    ],
    targetAudience: [
      'Students planning to study at German universities',
      'Job seekers preparing for employment or language requirements in Germany',
      'Working professionals collaborating with German corporate clients',
      'Language enthusiasts wanting a rigorous, structured Germanic language'
    ],
    careerPaths: [
      'Bilingual Specialist / Corporate Communication Executive',
      'German Language Translator',
      'German Language Interpreter',
      'Language Tutor / Trainer',
      'Customer Support & BPO Executive for DACH Clients',
      'Hospitality & Tourism Specialist',
      'Freelance Language Consultant'
    ],
    certification: {
      title: 'OneVriksh German Language Certificate',
      description: 'Validates CEFR level achievement based on comprehensive assessment performance.',
      requirements: ['Attendance threshold and passing the end-of-level written and oral evaluation']
    },
    placementSupport: {
      rate: '100% Placement Rate*',
      disclaimer: '*Based on students placed by OneVriksh to date. Past placement outcomes do not guarantee future results.',
      features: ['German CV (Lebenslauf) structuring support', 'Interview coaching for bilingual roles']
    },
    faqs: [
      {
        question: 'Does this course prepare for official Goethe-Zertifikat exams?',
        answer: 'Yes, the curriculum follows the CEFR guidelines aligned with the Goethe-Institut exam structure (A1 to C2).'
      },
      {
        question: 'How much time does it take to complete each level?',
        answer: 'Typically, A1 and A2 take about 2 to 3 months each in regular batches, while intermediate levels (B1/B2) require deeper study.'
      }
    ]
  },
  {
    slug: 'french-language',
    title: 'French Language',
    category: 'Languages',
    status: 'published',
    published: true,
    featured: true,
    duration: 'CEFR A1 – C2',
    deliveryModes: ['Interactive Classroom', 'Live Online'],
    shortDescription: 'Comprehensive French language training from beginner A1 to advanced C2 aligned with CEFR standards.',
    longDescription:
      'Immerse yourself in the French language with a balanced curriculum covering phonetics, grammar conjugation, natural conversation, and cultural nuance. Designed to develop practical speaking fluency and structured reading and writing proficiency.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    levels: [
      {
        name: 'A1–A2 (Beginner)',
        duration: 'Foundational Stage',
        suitableFor: 'Complete beginners starting their French learning journey.',
        coreTopics: [
          'French alphabet, accents (é, è, ê, ç, à) & nasal vowel sounds',
          'Basic pronunciation rules, liaison & silent ending letters',
          'Simple sentence structures, greetings, introductions & numbers',
          'Grammar: gender of nouns, articles (le, la, les, un, une, des) & present tense (-er, -ir, -re verbs)',
          'Essential everyday communication for travel, shopping & daily routines'
        ]
      },
      {
        name: 'B1–B2 (Intermediate)',
        duration: 'Independent Stage',
        suitableFor: 'Learners who want to speak confidently in everyday, academic, and workplace situations.',
        coreTopics: [
          'Expressing opinions, arguments, emotions & abstract thoughts',
          'Advanced grammar: past tenses (Passé Composé vs. Imparfait), Future (Futur Simple) & Subjunctive (Subjonctif)',
          'Workplace communication, formal correspondence & professional dialogue',
          'Reading comprehension of authentic French articles, literature & essays',
          'Essay writing and structured oral presentations'
        ]
      },
      {
        name: 'C1–C2 (Advanced)',
        duration: 'Proficient Stage',
        suitableFor: 'Learners aiming for high-level professional, diplomatic, or academic fluency.',
        coreTopics: [
          'Advanced conversational fluency and spontaneous discourse',
          'Complex grammatical subtleties, idioms & register variation',
          'Professional writing, literary analysis & formal business communication',
          'Nuanced comprehension of rapid native speech, debate & cultural subtext'
        ]
      }
    ],
    curriculum: [
      {
        module: 'Grammar & Verb Conjugation',
        description: 'Understand the logic of French verb groups and grammatical rules.',
        topics: [
          'Regular (-er, -ir, -re) and key irregular verbs (être, avoir, aller, faire)',
          'Tenses: Présent, Passé Composé, Imparfait, Plus-que-parfait, Futur Simple',
          'Subjonctif (Subjunctive mood) and Conditionnel (Conditional)',
          'Pronouns (COD, COI, y, en), prepositions & sentence structures'
        ]
      },
      {
        module: 'Listening Comprehension & Spoken French',
        description: 'Develop sharp listening skills and conversational confidence.',
        topics: [
          'Listening to native French audio dialogues and video clips',
          'Everyday conversational practice and situational role-plays',
          'Informal vs. formal speaking conventions (Tu vs. Vous)',
          'Oral expression, storytelling & group debates'
        ]
      },
      {
        module: 'Pronunciation & Accent Training',
        description: 'Master French phonetics, rhythm, and liaison.',
        topics: [
          'French nasal vowels and unique consonant pronunciations (r, u, eu)',
          'Liaison, elision & rhythmic phrasing in natural speech',
          'Phonetic drills and corrective pronunciation practice'
        ]
      },
      {
        module: 'Reading & Text Comprehension',
        description: 'Read and understand varied French written materials.',
        topics: [
          'Reading short stories, dialogues & cultural passages',
          'French newspaper articles, magazines & online blogs',
          'Analyzing textual structures and building rich vocabulary'
        ]
      },
      {
        module: 'Written Expression & Correspondence',
        description: 'Draft clear, grammatically sound written communications.',
        topics: [
          'Informal messages, postcards & personal letters',
          'Formal correspondence, inquiry letters & administrative emails',
          'Structured essays, opinion pieces & descriptive paragraphs'
        ]
      },
      {
        module: 'French Culture & Francophone World',
        description: 'Explore traditions, manners, and global Francophone diversity.',
        topics: [
          'Daily French lifestyle, traditions, cuisine & cultural etiquette',
          'Social politeness rules and cultural manners (formules de politesse)',
          'The Francophone world: France, Canada (Quebec), Switzerland, Belgium & West Africa'
        ]
      }
    ],
    tools: [
      'Audio resources with varied French accents',
      'Structured grammar workbooks and conjugation guides',
      'Vocabulary flashcards and listening comprehension sheets',
      'Interactive learning materials and study portal'
    ],
    practicalActivities: [
      'Conversational role-play and dialogue simulations',
      'Verbal presentations, discussions, and collaborative assignments',
      'Written email drafting and short essay assignments',
      'Listening comprehension drills and level mock tests'
    ],
    targetAudience: [
      'Students preparing for university study in France, Canada, or Europe',
      'Job seekers targeting bilingual career opportunities',
      'Professionals working in international trade, diplomacy, or hospitality',
      'Enthusiasts drawn to French culture, literature, and global travel'
    ],
    careerPaths: [
      'Bilingual Customer / Corporate Support Specialist',
      'French Language Translator',
      'French Language Interpreter',
      'French Language Trainer / Tutor',
      'Travel & Hospitality Consultant',
      'International Content Specialist'
    ],
    certification: {
      title: 'OneVriksh French Language Certificate',
      description: 'Certifies CEFR level proficiency upon successful completion of the course assessment.',
      requirements: ['Attendance threshold and passing the end-of-level written and oral evaluation']
    },
    placementSupport: {
      rate: '100% Placement Rate*',
      disclaimer: '*Based on students placed by OneVriksh to date. Past placement outcomes do not guarantee future results.',
      features: ['French CV and cover letter guidance', 'Interview practice for bilingual roles']
    },
    faqs: [
      {
        question: 'Does this course align with DELF / DALF exam requirements?',
        answer: 'Yes, our syllabus is structured around the CEFR levels (A1 to C2) which form the foundation of official DELF and DALF certification exams.'
      },
      {
        question: 'Is French pronunciation difficult for beginners?',
        answer: 'Our course includes dedicated phonetics training, nasal sound practice, and liaison rules early on so you build clean pronunciation right from day one.'
      }
    ]
  },
  {
    slug: 'english-speaking',
    title: 'English Speaking',
    category: 'Communication',
    status: 'pending',
    published: true,
    featured: false,
    duration: 'Course Content Being Updated',
    deliveryModes: ['Interactive Classroom', 'Live Online'],
    shortDescription: 'Build spoken English fluency, confidence, vocabulary, and workplace communication skills.',
    longDescription:
      'Detailed curriculum and batch structures for English Speaking are currently being updated to incorporate modern conversational drills, workplace presentations, and interview simulations.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    levels: [
      {
        name: 'Fluency & Communication Track',
        duration: 'Course Content Being Updated',
        suitableFor: 'Learners seeking to improve fluency, confidence, and pronunciation.',
        coreTopics: [
          'Practical grammar in conversation',
          'Vocabulary building & clear pronunciation',
          'Fluency drills & overcoming hesitation',
          'Daily conversation & group discussions',
          'Public speaking & presentation basics',
          'Interview preparation essentials'
        ]
      }
    ],
    curriculum: [
      {
        module: 'Core Focus Areas (Under Finalization)',
        description: 'Key areas covered during conversational communication training.',
        topics: [
          'Grammar in spoken context & sentence construction',
          'Vocabulary enhancement and natural idioms',
          'Pronunciation, voice modulation & clarity',
          'Real-life conversational practice & group role-plays',
          'Confidence building & overcoming speaking hesitation',
          'Interview preparation and professional communication'
        ]
      }
    ],
    tools: ['Audio-visual conversational resources & vocabulary practice sheets'],
    practicalActivities: [
      'Daily conversational practice and group speaking drills',
      'Role-play exercises and situational simulations',
      'Mock interview drills upon curriculum finalization'
    ],
    targetAudience: [
      'Students looking to build speaking confidence for interviews',
      'Working professionals seeking polished workplace communication',
      'Individuals wanting to eliminate hesitation in daily conversation'
    ],
    careerPaths: [
      'Enhanced communication across any professional career path',
      'Client-facing and corporate communication roles',
      'Customer service & executive communication'
    ],
    certification: {
      title: 'OneVriksh Certificate in English Communication',
      description: 'Awarded upon completion of speaking drills and final communication assessment.',
      requirements: ['Consistent attendance and active participation in speaking sessions']
    },
    placementSupport: {
      rate: '100% Placement Rate*',
      disclaimer: '*Based on students placed by OneVriksh to date. Past placement outcomes do not guarantee future results.',
      features: ['Interview communication drills', 'Body language & resume presentation']
    },
    faqs: [
      {
        question: 'When will the full English Speaking curriculum be published?',
        answer: 'The complete module breakdown is currently being updated. You can contact our admissions desk for current batch schedules and demo sessions.'
      }
    ]
  },
  // Draft / Unpublished Courses
  {
    slug: 'data-science',
    title: 'Data Science',
    category: 'Technology',
    status: 'draft',
    published: false,
    duration: 'Pending Curriculum',
    shortDescription: 'Data science and analytical program (Pending curriculum review).'
  },
  {
    slug: 'computer-training',
    title: 'Computer Training',
    category: 'Technology',
    status: 'draft',
    published: false,
    duration: 'Pending Curriculum',
    shortDescription: 'Foundational computer and office productivity training (Pending curriculum review).'
  },
  {
    slug: 'web-app-development',
    title: 'Web & App Development',
    category: 'Technology',
    status: 'draft',
    published: false,
    duration: 'Pending Curriculum',
    shortDescription: 'Full-stack web and mobile application engineering (Pending curriculum review).'
  }
];

async function seed() {
  await connectDB();
  console.log('Seeding clean, verified database...');

  // 1. Seed Users (Admin & Student) with Bcrypt Hashes
  await User.deleteMany({});
  const adminPasswordHash = await bcrypt.hash('Admin@123456', 12);
  const studentPasswordHash = await bcrypt.hash('Student@123456', 12);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@onevriksh.com',
    password: adminPasswordHash,
    role: 'admin',
    active: true
  });

  const student = await User.create({
    name: 'Student User',
    email: 'student@onevriksh.com',
    password: studentPasswordHash,
    role: 'student',
    studentId: 'OV-STU-1001',
    active: true
  });

  console.log('Admin and Student user seeded.');

  // 2. Seed Clean Verified Courses
  await Course.deleteMany({});
  for (const c of coursesToSeed) {
    await Course.create(c);
  }
  console.log(`Seeded ${coursesToSeed.length} courses (${coursesToSeed.filter(c => c.published).length} published, ${coursesToSeed.filter(c => !c.published).length} draft).`);

  // 3. Seed Sample Verifiable Certificate
  await Certificate.deleteMany({});
  const marketingCourse = await Course.findOne({ slug: 'digital-marketing' });
  if (marketingCourse) {
    await Certificate.create({
      student: student._id,
      course: marketingCourse._id,
      certificateNumber: 'OVS-CERT-2026-001',
      studentName: 'Student User',
      courseName: 'Digital Marketing',
      grade: 'Distinction (A+)',
      issuedAt: new Date('2026-02-15'),
      verified: true
    });
    console.log('Sample verifiable certificate OVS-CERT-2026-001 seeded.');
  }

  // 4. Seed Academic Notices
  await Notice.deleteMany({});
  await Notice.create([
    {
      title: 'Digital Marketing Practical Project Review',
      body: 'Faculty review and feedback session for enrolled marketing students.',
      published: true,
      publishedAt: new Date()
    },
    {
      title: 'Language Speaking Practice Session',
      body: 'Interactive conversational session for Spanish, German, and French learners.',
      published: true,
      publishedAt: new Date()
    }
  ]);

  console.log('Database seeding complete.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
