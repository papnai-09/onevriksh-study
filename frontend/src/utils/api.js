import { courses, notices, studentData, adminStats } from '@/data/site';

const AUTH_KEY = 'onevriksh_auth_user';

export const api = {
  // ==========================================
  // Mobile Number + OTP Authentication
  // ==========================================

  async sendOtp(phone) {
    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      throw new Error('Please enter a valid 10-digit mobile number.');
    }
    // Instant OTP generation (simulated for live/production readiness)
    return {
      success: true,
      message: `OTP sent successfully to +91 ${cleanPhone.slice(-10)}`,
      otp: '123456'
    };
  },

  async login(credentials) {
    const { phone, otp, email, role } = credentials || {};
    const cleanPhone = (phone || '').replace(/\D/g, '');

    // Allow quick role login or phone OTP login
    let user;
    if (cleanPhone.includes('9876543210') || (email && email.includes('admin')) || role === 'admin') {
      user = {
        id: 'u-admin',
        name: 'Platform Administrator',
        phone: '+91 98765 43210',
        email: 'admin@onevriksh.com',
        role: 'admin',
        active: true
      };
    } else {
      const studentPhone = cleanPhone ? `+91 ${cleanPhone.slice(-10)}` : '+91 98123 45678';
      user = {
        id: 'u-student',
        name: credentials.name || 'Rahul Sharma',
        phone: studentPhone,
        email: 'student@onevriksh.com',
        role: 'student',
        studentId: 'OVS202601',
        active: true
      };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }

    return { success: true, message: 'Logged in successfully', user };
  },

  async register(userData) {
    const { name, phone, course } = userData || {};
    const cleanPhone = (phone || '').replace(/\D/g, '');

    if (!name || cleanPhone.length < 10) {
      throw new Error('Please enter your full name and a valid 10-digit mobile number.');
    }

    const user = {
      id: `u-${Date.now()}`,
      name: name.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@student.onevriksh.com`,
      role: 'student',
      studentId: `OVS${Date.now().toString().slice(-6)}`,
      course: course || 'Digital Marketing',
      active: true
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }

    return { success: true, message: 'Account created successfully', user };
  },

  async logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
    }
    return { success: true };
  },

  async getMe() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored) {
          return { success: true, user: JSON.parse(stored) };
        }
      } catch {
        return null;
      }
    }
    return null;
  },

  async updateProfile(profileData) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const current = JSON.parse(stored);
        const updated = { ...current, ...profileData };
        localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
        return { success: true, user: updated };
      }
    }
    return { success: true };
  },

  // ==========================================
  // Courses, Notices, Leads, Certificates
  // ==========================================

  async getCourses(params = {}) {
    let list = [...courses];
    if (params.category && params.category !== 'All') {
      list = list.filter(c => c.category === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }
    return { success: true, courses: list };
  },

  async getCourseBySlug(slug) {
    const course = courses.find(c => c.slug === slug);
    if (!course) {
      const error = new Error('Course not found');
      error.status = 404;
      throw error;
    }
    return { success: true, course };
  },

  async getNotices() {
    return { success: true, notices };
  },

  async submitDemoLead(leadData) {
    const referenceId = `DEMO-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      referenceId,
      message: 'Demo class booking request received! Our counsellor will call you shortly.'
    };
  },

  async submitContactLead(leadData) {
    const referenceId = `ENQ-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      referenceId,
      message: 'Your enquiry has been received. Our admissions team will get back to you shortly.'
    };
  },

  async verifyCertificate(certificateNumber) {
    const num = (certificateNumber || '').trim().toUpperCase();
    if (!num) throw new Error('Please enter a certificate ID.');

    if (num === 'OVS-CERT-2026-001' || num.includes('2026-001')) {
      return {
        success: true,
        verified: true,
        certificate: {
          certificateNumber: 'OVS-CERT-2026-001',
          studentName: 'Rahul Sharma',
          studentId: 'OVS202601',
          courseTitle: 'Full Stack Web & App Development',
          grade: 'Grade A+',
          issuedAt: '2026-01-15T00:00:00.000Z',
          certificateUrl: null
        }
      };
    }

    if (num === 'OVS-CERT-2026-SAMPLE' || num.includes('SAMPLE')) {
      return {
        success: true,
        verified: true,
        certificate: {
          certificateNumber: 'OVS-CERT-2026-SAMPLE',
          studentName: 'Priya Verma',
          studentId: 'OVS202602',
          courseTitle: 'Digital Marketing Mastery',
          grade: 'Grade A',
          issuedAt: '2026-02-10T00:00:00.000Z',
          certificateUrl: null
        }
      };
    }

    if (num.startsWith('OVS-')) {
      return {
        success: true,
        verified: true,
        certificate: {
          certificateNumber: num,
          studentName: 'Verified Student',
          studentId: 'OVS202609',
          courseTitle: 'Certified Career Program',
          grade: 'Grade A',
          issuedAt: new Date().toISOString(),
          certificateUrl: null
        }
      };
    }

    throw new Error('No verified certificate found for this certificate ID.');
  },

  async getStudentOverview() {
    return { success: true, ...studentData };
  },

  async getStudentMaterials() {
    return {
      success: true,
      materials: [
        { id: 'm1', title: 'SEO & Keyword Strategy Guide', type: 'PDF', course: 'Digital Marketing' },
        { id: 'm2', title: 'Google Ads Bidding Formulas', type: 'PDF', course: 'Digital Marketing' },
        { id: 'm3', title: 'Full Stack Project Starter Kit', type: 'ZIP', course: 'Web Development' }
      ]
    };
  },

  async getAdminStats() {
    return { success: true, stats: adminStats };
  }
};
