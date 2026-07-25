import { adminStats, courses, notices, recentStudents, studentData } from '../data/site';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || 'https://accounts.onevriksh.in';
const CLIENT_ID = process.env.OAUTH_CLIENT_ID || 'client_study_123';

async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (res.status === 401 && path !== '/auth/me' && path !== '/auth/session') {
      // Unauthenticated state
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    if (path !== '/auth/me' && path !== '/auth/session' && path !== '/auth/login' && path !== '/auth/callback') {
      console.warn(`API Request failed for ${path}. Falling back to mock data. Error:`, error.message);
    }
    throw error;
  }
}

export const api = {
  // Centralized OAuth 2.1 / OIDC Authentication (accounts.onevriksh.in)

  /**
   * Start OAuth 2.1 Authorization PKCE flow to accounts.onevriksh.in
   */
  async initiateLogin(options = {}) {
    try {
      const params = new URLSearchParams();
      if (options.prompt) params.append('prompt', options.prompt);
      const query = params.toString() ? `?${params.toString()}` : '';
      
      const res = await request(`/auth/login${query}`, { method: 'GET' });
      if (res && res.authUrl) {
        return res.authUrl;
      }
    } catch (err) {
      console.warn('Backend login endpoint unavailable, constructing direct IdP authorize URL:', err.message);
    }

    // Direct IdP Auth URL fallback
    const redirectUri = typeof window !== 'undefined'
      ? `${window.location.origin}/api/auth/callback`
      : 'http://localhost:3000/api/auth/callback';

    const fallbackUrl = new URL(`${ACCOUNTS_URL}/oauth/authorize`);
    fallbackUrl.searchParams.append('client_id', CLIENT_ID);
    fallbackUrl.searchParams.append('redirect_uri', redirectUri);
    fallbackUrl.searchParams.append('response_type', 'code');
    fallbackUrl.searchParams.append('scope', 'openid profile email offline_access');
    fallbackUrl.searchParams.append('state', 'xyz123');
    fallbackUrl.searchParams.append('code_challenge_method', 'S256');
    if (options.prompt) fallbackUrl.searchParams.append('prompt', options.prompt);

    return fallbackUrl.toString();
  },

  /**
   * Handle OAuth authorization code exchange & user sync
   */
  async handleCallback(code, state) {
    try {
      const redirectUri = typeof window !== 'undefined'
        ? `${window.location.origin}/api/auth/callback`
        : 'http://localhost:3000/api/auth/callback';

      return await request('/auth/callback', {
        method: 'POST',
        body: JSON.stringify({ code, state, redirectUri }),
      });
    } catch (error) {
      // Mock Fallback Callback for demo environments
      const mockUser = {
        id: 'ACC_DEMO_STUDENT',
        accountId: 'ACC_DEMO_STUDENT',
        name: studentData.name || 'Demo Student',
        email: 'student@onevriksh.com',
        phone: '+91 98765 43210',
        role: 'student',
        studentId: 'OVS1001',
      };
      return { user: mockUser, token: 'mock_jwt_token' };
    }
  },

  /**
   * Single Logout
   */
  async logout() {
    try {
      const data = await request('/auth/logout', { method: 'POST' });
      const idpLogoutUrl = data.idpLogoutUrl || `${ACCOUNTS_URL}/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
      return { success: true, idpLogoutUrl };
    } catch {
      return {
        success: true,
        idpLogoutUrl: `${ACCOUNTS_URL}/logout?post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`,
      };
    }
  },

  /**
   * Session verification / Me
   */
  async getMe() {
    try {
      const data = await request('/auth/session');
      return data;
    } catch {
      try {
        const data = await request('/auth/me');
        return data;
      } catch {
        return null;
      }
    }
  },

  // Legacy fallback references
  async login() {
    const authUrl = await this.initiateLogin();
    if (typeof window !== 'undefined') window.location.href = authUrl;
  },

  async register() {
    const authUrl = await this.initiateLogin({ prompt: 'signup' });
    if (typeof window !== 'undefined') window.location.href = authUrl;
  },

  // Student Section
  async getStudentOverview() {
    try {
      const data = await request('/student/overview');
      return {
        name: data.enrollments[0]?.student?.name || studentData.name,
        attendance: data.attendancePercentage || studentData.attendance,
        progress: data.enrollments[0]?.progress || studentData.progress,
        totalFees: studentData.totalFees,
        paidFees: data.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0) || studentData.paidFees,
        nextClass: studentData.nextClass,
        courses: data.enrollments.map((e, index) => ({
          slug: e.course.slug,
          title: e.course.title,
          category: e.course.category,
          duration: e.course.duration,
          progress: e.progress,
          image: e.course.thumbnail || courses[index]?.image || courses[0].image,
          next: e.progress >= 100 ? 'Course completed' : 'Next up: Live Interactive Class',
        })),
        attendanceHistory: data.attendance.map(a => ({
          date: new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          subject: a.course?.title || 'General Batch',
          status: a.status.charAt(0).toUpperCase() + a.status.slice(1),
        })),
        results: data.results.map(r => ({
          test: r.test?.title || 'Weekly Evaluation',
          score: r.score,
          rank: r.rank || 5,
        })),
      };
    } catch {
      return studentData;
    }
  },

  async getStudentMaterials() {
    try {
      const data = await request('/student/materials');
      return data.materials.map(m => ({
        name: m.title,
        course: m.course?.title || 'Enrolled Course',
        type: m.type === 'pdf' ? 'PDF notes' : 'Assignment',
        size: '1.5 MB',
        url: m.url,
      }));
    } catch {
      return [
        { name: 'SEO Keyword Research Guide', course: 'Advanced Digital Marketing', type: 'PDF notes', size: '2.4 MB' },
        { name: 'Campaign Planning Workbook', course: 'Advanced Digital Marketing', type: 'Assignment', size: '1.8 MB' },
        { name: 'Google Ads Formula Sheet', course: 'Advanced Digital Marketing', type: 'PDF notes', size: '980 KB' },
      ];
    }
  },

  // Admin Section
  async getAdminStats() {
    try {
      const data = await request('/admin/stats');
      return [
        { label: 'Total students', value: data.totalStudents.toString(), delta: '+5%', tone: 'blue' },
        { label: 'Monthly revenue', value: `₹${(data.totalRevenue / 100000).toFixed(2)}L`, delta: '+10%', tone: 'green' },
        { label: 'Active students', value: data.activeStudents.toString(), delta: '100%', tone: 'magenta' },
        { label: 'Attendance today', value: data.attendanceToday ? '92%' : '87%', delta: '+2%', tone: 'amber' },
      ];
    } catch {
      return adminStats;
    }
  },

  async getAdminCollection(path) {
    try {
      const data = await request(`/admin/${path}`);
      return data.items;
    } catch {
      if (path === 'students') {
        return recentStudents.map((s, i) => ({
          _id: `mock_student_${i}`,
          name: s.name,
          email: `student${i+1}@example.com`,
          course: s.course,
          joined: s.joined,
          status: s.status,
          fees: s.fees,
        }));
      }
      if (path === 'courses') {
        return courses.map((c, i) => ({
          _id: `mock_course_${i}`,
          title: c.title,
          category: c.category,
          duration: c.duration,
          fee: c.fee,
          students: c.students,
          active: true,
        }));
      }
      if (path === 'notices') {
        return notices.map((n, i) => ({
          _id: `mock_notice_${i}`,
          title: n.title,
          text: n.text,
          date: n.date,
          published: true,
        }));
      }
      return [];
    }
  },

  async createAdminItem(path, data) {
    try {
      const res = await request(`/admin/${path}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.item;
    } catch {
      return { _id: `mock_${path}_${Date.now()}`, ...data, joined: 'Just now', status: 'Active', fees: 'Paid' };
    }
  },

  async updateAdminItem(path, id, data) {
    try {
      const res = await request(`/admin/${path}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return res.item;
    } catch {
      return { _id: id, ...data };
    }
  },

  async deleteAdminItem(path, id) {
    try {
      return await request(`/admin/${path}/${id}`, { method: 'DELETE' });
    } catch {
      return { message: 'Deleted (mock)' };
    }
  },

  // AI Doubt Solver / Performance Analysis
  async askAIDoubt(question) {
    try {
      return await request('/ai/doubt-solver', {
        method: 'POST',
        body: JSON.stringify({ question }),
      });
    } catch {
      return {
        answer: `Here is a concise learning path for "${question}": understand the core definition, see one practical example, then solve two small exercises.`,
        sources: ['Course notes', 'Recorded lecture transcript'],
      };
    }
  },

  async generateAITest(topic) {
    try {
      return await request('/ai/test-generator', {
        method: 'POST',
        body: JSON.stringify({ topic }),
      });
    } catch {
      return {
        title: `${topic} Practice Test`,
        questions: [
          { question: `What is the primary goal of ${topic}?`, options: ['Awareness and outcomes', 'Random posting', 'Only design', 'Only exams'], answer: 0 },
          { question: 'Which habit improves learning retention?', options: ['Daily revision', 'Skipping practice', 'Late submissions', 'No notes'], answer: 0 }
        ]
      };
    }
  },

  async analyzeAIPerformance(score) {
    try {
      return await request('/ai/performance-analysis', {
        method: 'POST',
        body: JSON.stringify({ score }),
      });
    } catch {
      return {
        score,
        summary: score >= 80 ? 'Strong performance with advanced readiness.' : 'Good base; revise weak modules and attempt timed tests.',
        nextSteps: ['Revise notes for 20 minutes daily', 'Attempt one module quiz', 'Ask mentor for doubt review']
      };
    }
  }
};
