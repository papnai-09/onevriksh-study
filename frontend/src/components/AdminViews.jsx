'use client';

import { BookOpen, CalendarCheck, CheckCircle2, ChevronRight, CircleDollarSign, Download, Edit3, FilePlus2, GraduationCap, MoreHorizontal, Plus, QrCode, Search, Send, Trash2, TrendingUp, Upload, UserPlus, Users, WalletCards, X } from 'lucide-react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { adminStats as mockStats, courses as mockCourses, notices as mockNotices, recentStudents as mockStudents } from '@/data/site';
import { api } from '@/utils/api';
import { DashboardShell } from './DashboardShell';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const RevenueChart = dynamic(() => import('./DashboardCharts').then(m => m.RevenueChart), {
  ssr: false,
  loading: () => <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading chart...</div>
});

const EnrollmentDonut = dynamic(() => import('./DashboardCharts').then(m => m.EnrollmentDonut), {
  ssr: false,
  loading: () => <div style={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading chart...</div>
});

const titles = {
  students: ['Student management', 'Add students, manage records and review progress.'],
  courses: ['Course management', 'Create courses and organize learning content.'],
  attendance: ['Attendance management', 'Mark attendance and review daily reports.'],
  fees: ['Fees & payments', 'Track collections, pending fees and transaction reports.'],
  materials: ['Study material', 'Upload and organize notes, assignments and resources.'],
  notices: ['Notice management', 'Publish announcements to students and batches.'],
  tests: ['Tests & results', 'Create assessments and manage student performance.'],
  settings: ['Institute settings', 'Manage business information, integrations and security.']
};

const tones = { Paid: 'green', Active: 'green', Partial: 'amber', Due: 'red', Paused: 'neutral' };

function Status({ children }) {
  return <span className={'status ' + (tones[children] || 'blue')}>{children}</span>;
}

function AdminStat({ item, index }) {
  const icons = [Users, CircleDollarSign, GraduationCap, CalendarCheck];
  const Icon = icons[index] || Users;
  return (
    <article className={'dash-stat ' + item.tone}>
      <span><Icon /></span>
      <div>
        <small>{item.label}</small>
        <strong>{item.value}</strong>
        <p>{item.delta} from last month</p>
      </div>
    </article>
  );
}

function Toolbar({ search = 'Search records', action = 'Add new', onAdd, query, setQuery }) {
  return (
    <div className="management-toolbar">
      <label>
        <Search />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={search} />
      </label>
      <div>
        <select>
          <option>All statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button className="button button-ghost"><Download /> Export</button>
        <button className="button button-primary" onClick={onAdd}><Plus /> {action}</button>
      </div>
    </div>
  );
}

function Table({ headers, children }) {
  return (
    <div className="table-scroll">
      <table className="data-table management-table">
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function AdminOverview() {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadStats() {
      try {
        const res = await api.getAdminStats();
        if (active) setStats(res);
      } catch {
        console.warn('Could not load live admin statistics.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadStats();
    return () => { active = false; };
  }, []);

  return (
    <DashboardShell role="admin" title="Dashboard overview" subtitle="Monitor institute performance and today’s activity." actions={<button className="button button-primary"><UserPlus /> Add student</button>}>
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading overview...</div>
      ) : (
        <>
          <div className="dash-stats-grid">{stats.map((s, i) => <AdminStat key={s.label} item={s} index={i} />)}</div>
          <div className="dashboard-grid-main admin-charts">
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h2>Revenue overview</h2>
                  <p>₹36.4L collected in the last 6 months</p>
                </div>
                <select><option>Last 6 months</option></select>
              </div>
              <RevenueChart />
            </section>
            <section className="panel enrollment-panel">
              <div className="panel-head">
                <div>
                  <h2>Enrollments</h2>
                  <p>By course category</p>
                </div>
                <button className="icon-button"><MoreHorizontal /></button>
              </div>
              <EnrollmentDonut />
              <div className="chart-legend">
                <span><i style={{ background: '#1685f8' }} />Marketing 38%</span>
                <span><i style={{ background: '#993366' }} />Languages 34%</span>
                <span><i style={{ background: '#20a779' }} />Design 18%</span>
                <span><i style={{ background: '#f4a224' }} />Communication 10%</span>
              </div>
            </section>
          </div>
          <section className="panel table-panel">
            <div className="panel-head">
              <div>
                <h2>Recent enrollments</h2>
                <p>Students added in the past seven days</p>
              </div>
              <Link href="/admin/students">View all <ChevronRight /></Link>
            </div>
            <StudentTable list={mockStudents.slice(0, 4)} />
          </section>
        </>
      )}
    </DashboardShell>
  );
}

export function AdminSection({ section }) {
  const [modal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const title = useMemo(() => titles[section] || titles.students, [section]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAdminCollection(section);
      setItems(data);
    } catch {
      console.warn('API error fetching items for section:', section);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleAdd = useCallback(async (data) => {
    try {
      const newItem = await api.createAdminItem(section, data);
      setItems((prev) => [newItem, ...prev]);
    } catch (err) {
      console.error(err);
    }
    setModal(false);
  }, [section]);

  const handleDelete = useCallback(async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await api.deleteAdminItem(section, id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  }, [section]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const s = query.toLowerCase();
      return (
        item.name?.toLowerCase().includes(s) ||
        item.title?.toLowerCase().includes(s) ||
        item.email?.toLowerCase().includes(s) ||
        item.course?.toLowerCase().includes(s)
      );
    });
  }, [items, query]);

  let body;

  if (loading) {
    body = <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading section details...</div>;
  } else if (section === 'students') {
    body = (
      <section className="panel management-panel">
        <Toolbar search="Search name, email or ID" action="Add student" onAdd={() => setModal(true)} query={query} setQuery={setQuery} />
        <StudentTable list={filteredItems} actions onDelete={handleDelete} />
      </section>
    );
  } else if (section === 'courses') {
    body = (
      <>
        <Toolbar search="Search courses" action="Create course" onAdd={() => setModal(true)} query={query} setQuery={setQuery} />
        <div className="admin-course-grid">
          {filteredItems.map((c) => (
            <article className="panel admin-course-card" key={c._id || c.slug}>
              <span className="course-category">{c.category}</span>
              <button className="icon-button"><MoreHorizontal /></button>
              <div className="course-initial">{c.title.split(' ').slice(0, 2).map((x) => x[0]).join('')}</div>
              <h3>{c.title}</h3>
              <p>{c.duration} · {c.students || 0} students</p>
              <div className="progress-line"><span style={{ width: Math.min((c.students || 0) / 5, 100) + '%' }} /></div>
              <footer>
                <strong>₹{c.fee?.toLocaleString('en-IN')}</strong>
                <Status>{c.active ? 'Active' : 'Paused'}</Status>
              </footer>
            </article>
          ))}
        </div>
      </>
    );
  } else if (section === 'attendance') {
    body = (
      <>
        <div className="attendance-admin-grid">
          <section className="panel qr-panel">
            <span><QrCode /></span>
            <div>
              <h2>QR attendance session</h2>
              <p>Generate a time-limited QR code students can scan in class.</p>
            </div>
            <button className="button button-primary">Generate QR code</button>
          </section>
          <section className="panel attendance-today">
            <strong>87.2%</strong>
            <div>
              <h3>Attendance today</h3>
              <p>418 present · 61 absent</p>
            </div>
          </section>
        </div>
        <section className="panel management-panel">
          <Toolbar search="Search student" action="Mark attendance" query={query} setQuery={setQuery} />
          <Table headers={['Student', 'Course', 'Batch', 'Status', 'Check-in', 'Action']}>
            {mockStudents.map((s, i) => (
              <tr key={s.name + i}>
                <td>
                  <div className="table-person">
                    <span>{s.name.split(' ').map((n) => n[0]).join('')}</span>
                    <div>
                      <strong>{s.name}</strong>
                      <small>OVS-2026-{1048 + i}</small>
                    </div>
                  </div>
                </td>
                <td>{s.course}</td>
                <td>Evening A</td>
                <td><Status>{i === 3 ? 'Paused' : 'Active'}</Status></td>
                <td>{i === 3 ? '—' : '3:' + (45 + i * 3) + ' PM'}</td>
                <td>
                  <select defaultValue={i === 3 ? 'Absent' : 'Present'}>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </Table>
        </section>
      </>
    );
  } else if (section === 'fees') {
    body = (
      <>
        <div className="dash-stats-grid three">
          <MiniStat icon={CircleDollarSign} label="Collected this month" value="₹8.42L" text="+8.2% vs May" />
          <MiniStat icon={WalletCards} label="Pending fees" value="₹2.18L" text="48 students" tone="amber" />
          <MiniStat icon={TrendingUp} label="Collection rate" value="79.4%" text="+3.1% this month" tone="green" />
        </div>
        <section className="panel management-panel">
          <Toolbar search="Search transaction or student" action="Record payment" query={query} setQuery={setQuery} />
          <Table headers={['Transaction', 'Student', 'Course', 'Date', 'Amount', 'Method', 'Status']}>
            {[
              ['#OVS24018', 'Neha Gupta', 'French Language', '22 Jun', '₹18,999', 'UPI', 'Paid'],
              ['#OVS24012', 'Kabir Joshi', 'Digital Marketing', '21 Jun', '₹10,000', 'Card', 'Partial'],
              ['#OVS23998', 'Simran Kaur', 'Graphic Design', '20 Jun', '₹24,999', 'Net Banking', 'Paid'],
              ['#OVS23972', 'Dev Verma', 'English Speaking', '18 Jun', '₹5,000', 'Cash', 'Due']
            ].map((r) => (
              <tr key={r[0]}>
                {r.map((v, i) => (
                  <td key={i}>{i === 1 ? <strong>{v}</strong> : i === 6 ? <Status>{v}</Status> : v}</td>
                ))}
              </tr>
            ))}
          </Table>
        </section>
      </>
    );
  } else if (section === 'materials') {
    body = (
      <>
        <div className="upload-zone">
          <Upload />
          <h2>Upload study material</h2>
          <p>Drag PDF, DOCX, ZIP or video files here, or choose from your device.</p>
          <button className="button button-primary">Choose files</button>
          <small>Maximum file size: 250 MB</small>
        </div>
        <section className="panel management-panel">
          <Toolbar search="Search resources" action="Add resource" query={query} setQuery={setQuery} />
          <Table headers={['Resource', 'Course', 'Type', 'Size', 'Uploaded', 'Actions']}>
            {[
              ['SEO Keyword Research Guide', 'Digital Marketing', 'PDF', '2.4 MB', '18 Jun'],
              ['French A1 Vocabulary', 'French Language', 'PDF', '1.8 MB', '17 Jun'],
              ['Brand Identity Brief', 'Graphic Design', 'Assignment', '3.1 MB', '16 Jun'],
              ['Interview Practice Pack', 'English Speaking', 'ZIP', '8.6 MB', '14 Jun']
            ].map((r) => (
              <tr key={r[0]}>
                <td><strong>{r[0]}</strong></td>
                {r.slice(1).map((v) => <td key={v}>{v}</td>)}
                <td><RowActions /></td>
              </tr>
            ))}
          </Table>
        </section>
      </>
    );
  } else if (section === 'notices') {
    body = (
      <section className="panel management-panel">
        <Toolbar search="Search notices" action="Create notice" onAdd={() => setModal(true)} query={query} setQuery={setQuery} />
        <Table headers={['Notice', 'Audience', 'Published', 'Status', 'Actions']}>
          {filteredItems.map((n) => (
            <tr key={n._id}>
              <td>
                <strong>{n.title}</strong>
                <small className="table-sub">{n.text}</small>
              </td>
              <td>All students</td>
              <td>{n.date || 'Today'} 2026</td>
              <td><Status>{n.published ? 'Active' : 'Draft'}</Status></td>
              <td><RowActions onDelete={() => handleDelete(n._id)} /></td>
            </tr>
          ))}
        </Table>
      </section>
    );
  } else if (section === 'tests') {
    body = (
      <>
        <div className="ai-generator-banner">
          <span><FilePlus2 /></span>
          <div>
            <small>AI-POWERED</small>
            <h2>Generate a test from your notes</h2>
            <p>Upload course material and create a reviewed MCQ test in minutes.</p>
          </div>
          <button className="button button-light">Generate test</button>
        </div>
        <section className="panel management-panel">
          <Toolbar search="Search tests" action="Create test" query={query} setQuery={setQuery} />
          <Table headers={['Test', 'Course', 'Questions', 'Attempts', 'Average', 'Status', 'Actions']}>
            {[
              ['SEO Foundations', 'Digital Marketing', '25', '28', '72%', 'Active'],
              ['A1 Vocabulary', 'French Language', '30', '24', '81%', 'Active'],
              ['Typography Basics', 'Graphic Design', '20', '18', '76%', 'Draft'],
              ['Business Communication', 'English Speaking', '25', '31', '74%', 'Active']
            ].map((r) => (
              <tr key={r[0]}>
                {r.map((v, i) => (
                  <td key={i}>{i === 0 ? <strong>{v}</strong> : i === 5 ? <Status>{v}</Status> : v}</td>
                ))}
                <td><RowActions /></td>
              </tr>
            ))}
          </Table>
        </section>
      </>
    );
  } else {
    body = (
      <div className="settings-grid">
        <section className="panel settings-section">
          <h2>Institute information</h2>
          <div className="form-grid">
            <label><span>Institute name</span><input defaultValue="Onevriksh Study" /></label>
            <label><span>Contact number</span><input defaultValue="+91 87005 36553" /></label>
            <label className="full"><span>Email</span><input defaultValue="study@onevriksh.com" /></label>
            <label className="full"><span>Address</span><textarea defaultValue="Shop No. 28, NDMC Market, Connaught Place, New Delhi 110001" /></label>
          </div>
          <button className="button button-primary">Save changes</button>
        </section>
        <section className="panel integrations">
          <h2>Integrations</h2>
          {[
            ['Razorpay', 'Payment gateway', 'Connected'],
            ['WhatsApp Business', 'Messaging', 'Connected'],
            ['AI Provider', 'Doubt solver and tests', 'Setup required'],
            ['Cloud storage', 'Videos and documents', 'Setup required']
          ].map(([a, b, c]) => (
            <div key={a}>
              <span><strong>{a}</strong><small>{b}</small></span>
              <Status>{c === 'Connected' ? 'Active' : 'Due'}</Status>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <DashboardShell role="admin" title={title[0]} subtitle={title[1]}>
      {body}
      {modal && <Modal title={section === 'notices' ? 'Create notice' : section === 'students' ? 'Add new student' : 'Create record'} close={() => setModal(false)} onSave={handleAdd} />}
    </DashboardShell>
  );
}

function StudentTable({ list, actions = false, onDelete }) {
  return (
    <Table headers={['Student', 'Course', 'Joined', 'Status', 'Fees', ...(actions ? ['Actions'] : [])]}>
      {list.map((s, i) => (
        <tr key={s._id || s.name + i}>
          <td>
            <div className="table-person">
              <span>{s.name.split(' ').map((n) => n[0]).join('')}</span>
              <div>
                <strong>{s.name}</strong>
                <small>{s.email}</small>
              </div>
            </div>
          </td>
          <td>{s.course}</td>
          <td>{s.joined || 'Today'}</td>
          <td><Status>{s.status || 'Active'}</Status></td>
          <td><Status>{s.fees || 'Paid'}</Status></td>
          {actions && <td><RowActions onDelete={() => onDelete?.(s._id)} /></td>}
        </tr>
      ))}
    </Table>
  );
}

function RowActions({ onDelete }) {
  return (
    <div className="row-actions">
      <button title="Edit"><Edit3 /></button>
      <button title="Delete" onClick={onDelete}><Trash2 /></button>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, text, tone = 'blue' }) {
  return (
    <article className={'dash-stat ' + tone}>
      <span><Icon /></span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <p>{text}</p>
      </div>
    </article>
  );
}

function Modal({ title, close, onSave }) {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')?.toString(),
      title: formData.get('name')?.toString(), // maps to both schemas
      email: formData.get('email')?.toString(),
      phone: formData.get('phone')?.toString(),
      text: formData.get('notes')?.toString(),
      course: formData.get('category')?.toString(),
      fee: 19999,
      duration: '4 months',
      category: 'Languages',
    };
    onSave(data);
  }, [onSave]);

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">New record</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={close}><X /></button>
        </div>
        <div className="form-grid">
          <label>
            <span>Name / Title</span>
            <input name="name" placeholder="Enter details" required />
          </label>
          <label>
            <span>Category / Course</span>
            <select name="category" defaultValue="Languages">
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Languages">Languages</option>
              <option value="Design">Design</option>
            </select>
          </label>
          <label>
            <span>Email address</span>
            <input name="email" type="email" placeholder="name@example.com" />
          </label>
          <label>
            <span>Mobile number</span>
            <input name="phone" placeholder="+91 98765 43210" />
          </label>
          <label className="full">
            <span>Notes / Description</span>
            <textarea name="notes" rows="4" placeholder="Additional details" />
          </label>
        </div>
        <footer>
          <button type="button" className="button button-ghost" onClick={close}>Cancel</button>
          <button className="button button-primary"><Send /> Save record</button>
        </footer>
      </form>
    </div>
  );
}
