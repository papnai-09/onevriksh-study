import { courses, notices, studentData, adminStats } from '@/data/site';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong.');
  return data;
}

export const api = {
  // ==========================================
  // Password-Based Authentication (Real API)
  // ==========================================

  async login({ phone, password }) {
    return apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
  },

  async register({ name, phone, password, course }) {
    return apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, phone, password, course }),
    });
  },

  async resetPassword({ phone, password }) {
    return apiFetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    });
  },

  async logout() {
    return apiFetch('/api/auth/logout', { method: 'POST' });
  },

  async getMe() {
    try {
      return await apiFetch('/api/auth/me');
    } catch {
      return null;
    }
  },

  async updateProfile(profileData) {
    return apiFetch('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
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
