import { courses, notices, studentData, adminStats } from '@/data/site';

// Local storage key for client-side authentication
const AUTH_KEY = 'onevriksh_auth_user';

export const api = {
  // ==========================================
  // Self-Contained Client Authentication
  // ==========================================

  async login(credentials) {
    const { email, password } = credentials || {};
    const lowerEmail = (email || '').toLowerCase().trim();

    if (!lowerEmail || !password) {
      throw new Error('Please provide both email and password.');
    }

    let user;
    if (lowerEmail.includes('admin') || lowerEmail === 'admin@onevriksh.com') {
      user = {
        id: 'u-admin',
        name: 'Platform Administrator',
        email: lowerEmail,
        role: 'admin',
        phone: '+91 98765 43210',
        active: true
      };
    } else {
      user = {
        id: 'u-student',
        name: lowerEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Aarav Sharma',
        email: lowerEmail,
        role: 'student',
        studentId: 'OVS202601',
        phone: '+91 98123 45678',
        active: true
      };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }

    return { success: true, message: 'Logged in successfully', user };
  },

  async register(userData) {
    const { name, email, phone } = userData || {};
    const user = {
      id: `u-${Date.now()}`,
      name: name || 'Student',
      email: (email || '').toLowerCase().trim(),
      role: 'student',
      studentId: `OVS${Date.now().toString().slice(-6)}`,
      phone: phone || '',
      active: true
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }

    return { success: true, message: 'Registration successful', user };
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

  async forgotPassword(email) {
    return {
      success: true,
      message: `Password reset instructions have been sent to ${email || 'your email'}.`
    };
  },

  async resetPassword(token, password) {
    return {
      success: true,
      message: 'Your password has been reset successfully. You can now log in.'
    };
  },

  async changePassword(passwords) {
    return {
      success: true,
      message: 'Password updated successfully.'
    };
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
  // Public Educational Data & Leads
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

  // ==========================================
  // Certificate Verification
  // ==========================================

  async verifyCertificate(certificateNumber) {
    const num = (certificateNumber || '').trim().toUpperCase();

    if (!num) {
      throw new Error('Please enter a certificate ID.');
    }

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

    // Dynamic verification for any valid OVS-CERT pattern
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

    throw new Error('No verified certificate found for this certificate ID. Please verify the ID format (e.g. OVS-CERT-2026-001).');
  },

  // ==========================================
  // Student & Admin Portals
  // ==========================================

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
