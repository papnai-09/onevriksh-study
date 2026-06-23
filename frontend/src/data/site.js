export const institute = {
  name: 'Onevriksh Study',
  tagline: 'Root Your Skills. Rise Your Future.',
  phone: '+91 87005 36553',
  secondaryPhone: '+91 85958 40141',
  email: 'study@onevriksh.com',
  address: 'Shop No. 28, NDMC Market, Connaught Place, New Delhi 110001',
  whatsapp: 'https://wa.me/918700536553?text=Hi%20Onevriksh%20Study%2C%20I%20want%20details%20about%20your%20courses.'
};

export const courses = [
  {
    slug: 'digital-marketing', title: 'Advanced Digital Marketing', category: 'Marketing',
    duration: '6 months', fee: 29999, rating: 4.9, students: 420, level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Build campaigns that perform with hands-on SEO, social media, paid advertising, analytics and portfolio projects.',
    trainer: 'Rohit Sharma', trainerRole: 'Performance Marketing Lead',
    benefits: ['15+ live projects', 'Google and Meta certification prep', 'Interview and placement support'],
    curriculum: ['Marketing foundations and customer journeys', 'SEO and content strategy', 'Meta and Google Ads', 'Email automation', 'Analytics and capstone campaign']
  },
  {
    slug: 'graphic-design', title: 'Graphic Design Mastery', category: 'Design',
    duration: '5 months', fee: 24999, rating: 4.8, students: 286, level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    description: 'Master visual thinking, branding and industry tools through a portfolio-first studio curriculum.',
    trainer: 'Meera Kapoor', trainerRole: 'Brand and Visual Designer',
    benefits: ['Adobe tool mastery', 'Professional portfolio', 'Agency workflow practice'],
    curriculum: ['Design principles', 'Photoshop and image making', 'Illustrator and identity', 'Layouts and typography', 'Portfolio presentation']
  },
  {
    slug: 'french-language', title: 'French Language Program', category: 'Languages',
    duration: '4 months', fee: 18999, rating: 4.9, students: 198, level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    description: 'Speak French with confidence through interactive classes, practical conversation and DELF-focused preparation.',
    trainer: 'Ananya Verma', trainerRole: 'DELF Certified French Trainer',
    benefits: ['DELF exam preparation', 'Conversation labs', 'Small batch mentoring'],
    curriculum: ['A1 foundations', 'Everyday conversation', 'Grammar in context', 'Listening and pronunciation', 'DELF mock assessment']
  },
  {
    slug: 'german-language', title: 'German Language Program', category: 'Languages',
    duration: '4 months', fee: 18999, rating: 4.8, students: 174, level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    description: 'Learn practical German and prepare for Goethe certification with guided speaking and exam practice.',
    trainer: 'Nikhil Arora', trainerRole: 'Goethe Certified German Trainer',
    benefits: ['Goethe-aligned curriculum', 'Weekly speaking club', 'Study abroad guidance'],
    curriculum: ['A1 vocabulary and grammar', 'Listening essentials', 'Speaking situations', 'Reading and writing', 'Goethe mock tests']
  },
  {
    slug: 'spanish-language', title: 'Spanish Language Program', category: 'Languages',
    duration: '4 months', fee: 16999, rating: 4.7, students: 152, level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    description: 'A lively, conversation-led Spanish program for travel, work and global opportunities.',
    trainer: 'Aarav Mehta', trainerRole: 'Spanish Language Educator',
    benefits: ['Conversation-first classes', 'Cultural immersion', 'Flexible batches'],
    curriculum: ['Sounds and introductions', 'Daily communication', 'Grammar patterns', 'Workplace Spanish', 'Final speaking project']
  },
  {
    slug: 'english-speaking', title: 'English Speaking & Personality', category: 'Communication',
    duration: '3 months', fee: 14999, rating: 4.9, students: 510, level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    description: 'Strengthen spoken English, confidence, presentation and interview skills in a supportive small batch.',
    trainer: 'Priya Malhotra', trainerRole: 'Communication and Soft Skills Coach',
    benefits: ['Daily speaking practice', 'Interview simulations', 'Personal feedback'],
    curriculum: ['Fluency foundations', 'Vocabulary and pronunciation', 'Public speaking', 'Group discussions', 'Interview mastery']
  }
];

export const testimonials = [
  { name: 'Sakshi Jain', course: 'Digital Marketing', quote: 'The live projects made all the difference. I walked into interviews with real campaign results, not just a certificate.', initials: 'SJ' },
  { name: 'Aditya Singh', course: 'German Language', quote: 'Small batches meant I could actually speak in every class. The Goethe preparation was structured and practical.', initials: 'AS' },
  { name: 'Riya Mehta', course: 'Graphic Design', quote: 'My portfolio finally looked professional. The trainer feedback was direct, personal and genuinely useful.', initials: 'RM' }
];

export const stats = [
  { value: '2,500+', label: 'Students trained' },
  { value: '12+', label: 'Career courses' },
  { value: '91%', label: 'Placement rate' },
  { value: '4.9/5', label: 'Student rating' }
];

export const notices = [
  { id: 1, title: 'Digital Marketing guest session', date: '24 Jun', type: 'Event', text: 'Industry session with a performance marketing specialist at 4:00 PM.' },
  { id: 2, title: 'Monthly assessment schedule', date: '27 Jun', type: 'Academic', text: 'Check your course section for test slots and syllabus.' },
  { id: 3, title: 'Fee reminder', date: '30 Jun', type: 'Fees', text: 'Second installment is due by the end of this month.' }
];

export const studentData = {
  name: 'Aarav Sharma',
  initials: 'AS',
  course: 'Advanced Digital Marketing',
  attendance: 88,
  progress: 64,
  totalFees: 29999,
  paidFees: 20000,
  nextClass: { title: 'Google Ads: Search Campaigns', time: 'Today, 4:00 PM', room: 'Lab 2' },
  courses: [
    { ...courses[0], progress: 64, next: 'Google Ads: Search Campaigns' },
    { ...courses[5], progress: 32, next: 'Confident Presentations' }
  ],
  attendanceHistory: [
    { date: '21 Jun 2026', subject: 'SEO Strategy', status: 'Present' },
    { date: '19 Jun 2026', subject: 'Content Marketing', status: 'Present' },
    { date: '17 Jun 2026', subject: 'Campaign Planning', status: 'Late' },
    { date: '14 Jun 2026', subject: 'Market Research', status: 'Present' }
  ],
  results: [
    { test: 'SEO Foundations', score: 88, rank: 4, classAverage: 72 },
    { test: 'Content Strategy', score: 82, rank: 7, classAverage: 69 },
    { test: 'Marketing Basics', score: 91, rank: 3, classAverage: 74 }
  ]
};

export const adminStats = [
  { label: 'Total students', value: '2,548', delta: '+12.4%', tone: 'blue' },
  { label: 'Monthly revenue', value: '₹8.42L', delta: '+8.2%', tone: 'green' },
  { label: 'Active students', value: '1,924', delta: '75.5%', tone: 'magenta' },
  { label: 'Attendance today', value: '87.2%', delta: '+2.1%', tone: 'amber' }
];

export const recentStudents = [
  { name: 'Neha Gupta', course: 'French Language', joined: '22 Jun 2026', status: 'Active', fees: 'Paid' },
  { name: 'Kabir Joshi', course: 'Digital Marketing', joined: '21 Jun 2026', status: 'Active', fees: 'Partial' },
  { name: 'Simran Kaur', course: 'Graphic Design', joined: '20 Jun 2026', status: 'Active', fees: 'Paid' },
  { name: 'Dev Verma', course: 'English Speaking', joined: '18 Jun 2026', status: 'Paused', fees: 'Due' }
];
