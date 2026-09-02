import { courses as fallbackCourses, notices as fallbackNotices, studentData as fallbackStudentData, adminStats as fallbackAdminStats } from '@/data/site';

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
  // Courses (Real API)
  // ==========================================

  async getCourses(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.category && params.category !== 'All') query.set('category', params.category);
      if (params.search) query.set('search', params.search);
      const qs = query.toString() ? `?${query.toString()}` : '';
      return await apiFetch(`/api/courses${qs}`);
    } catch {
      let list = [...fallbackCourses];
      if (params.category && params.category !== 'All') {
        list = list.filter(c => c.category === params.category);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
      }
      return { success: true, courses: list };
    }
  },

  async getCourseBySlug(slug) {
    try {
      return await apiFetch(`/api/courses/${slug}`);
    } catch {
      const course = fallbackCourses.find(c => c.slug === slug);
      if (!course) {
        const error = new Error('Course not found');
        error.status = 404;
        throw error;
      }
      return { success: true, course };
    }
  },

  // ==========================================
  // Notices (Real API)
  // ==========================================

  async getNotices() {
    try {
      return await apiFetch('/api/notices');
    } catch {
      return { success: true, notices: fallbackNotices };
    }
  },

  // ==========================================
  // Leads & Enquiries (Real API)
  // ==========================================

  async submitDemoLead(leadData) {
    return apiFetch('/api/leads/demo', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  },

  async submitContactLead(leadData) {
    return apiFetch('/api/leads/contact', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  },

  // ==========================================
  // Certificate Verification (Real API)
  // ==========================================

  async verifyCertificate(certificateNumber) {
    const num = (certificateNumber || '').trim().toUpperCase();
    if (!num) throw new Error('Please enter a certificate ID.');
    return apiFetch(`/api/certificates/verify/${encodeURIComponent(num)}`);
  },

  // ==========================================
  // Student Dashboard (Real API)
  // ==========================================

  async getStudentOverview() {
    try {
      return await apiFetch('/api/student/overview');
    } catch {
      return { success: true, ...fallbackStudentData };
    }
  },

  async getStudentMaterials() {
    try {
      return await apiFetch('/api/student/materials');
    } catch {
      return {
        success: true,
        materials: [
          { id: 1, title: 'SEO & Keyword Strategy Guide', type: 'PDF' },
          { id: 2, title: 'Google Ads Bidding Formulas', type: 'PDF' }
        ]
      };
    }
  },

  // ==========================================
  // Admin Dashboard (Real API)
  // ==========================================

  async getAdminStats() {
    try {
      return await apiFetch('/api/admin/stats');
    } catch {
      return { success: true, stats: fallbackAdminStats };
    }
  },

  async getAdminStudents() {
    return apiFetch('/api/admin/students');
  }
};
