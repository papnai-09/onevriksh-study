'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, BookOpen, CalendarCheck, CheckCircle2, ChevronRight, CirclePlay, Clock3, CreditCard, Download, FileArchive, FileText, MessageSquareText, MoreHorizontal, Paperclip, Play, Send, Sparkles, TrendingUp, Upload, Video } from 'lucide-react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { notices as mockNotices, studentData as mockStudentData } from '@/data/site';
import { api } from '@/utils/api';
import { DashboardShell } from './DashboardShell';
import dynamic from 'next/dynamic';
import { ProgressRing } from './ProgressRing';

const PerformanceChart = dynamic(() => import('./DashboardCharts').then(m => m.PerformanceChart), {
  ssr: false,
  loading: () => <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading chart...</div>
});

function StatCard({ icon: Icon, label, value, detail, tone = 'blue' }) {
  return (
    <article className={'dash-stat ' + tone}>
      <span><Icon /></span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <p>{detail}</p>
      </div>
    </article>
  );
}

function Status({ children, tone = 'green' }) {
  return <span className={'status ' + tone}>{children}</span>;
}

export function StudentOverview() {
  const [data, setData] = useState(mockStudentData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const studentInfo = await api.getStudentOverview();
        if (active) setData(studentInfo);
      } catch (err) {
        console.warn('Could not fetch live student overview, using mock data.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => { active = false; };
  }, []);

  const feesPending = useMemo(() => data.totalFees - data.paidFees, [data]);

  return (
    <DashboardShell title={'Good morning, ' + data.name.split(' ')[0]} subtitle="Here is what is happening with your learning today.">
      {loading ? (
        <div className="loading-state" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading overview details...</div>
      ) : (
        <>
          <div className="dash-stats-grid">
            <StatCard icon={CalendarCheck} label="Attendance" value={data.attendance + '%'} detail="4% above batch average" />
            <StatCard icon={BookOpen} label="Course progress" value={data.progress + '%'} detail="12 lessons remaining" tone="magenta" />
            <StatCard icon={CreditCard} label="Pending fees" value={'₹' + feesPending.toLocaleString('en-IN')} detail="Due 30 Jun 2026" tone="amber" />
            <StatCard icon={Award} label="Certificates" value="1 earned" detail="1 more in progress" tone="green" />
          </div>
          <div className="dashboard-grid-main">
            <section className="panel current-course-panel">
              <div className="panel-head">
                <div>
                  <span className="panel-eyebrow">Continue learning</span>
                  <h2>{data.course}</h2>
                </div>
                <button className="icon-button"><MoreHorizontal /></button>
              </div>
              <div className="current-course">
                {data.courses?.[0] && (
                  <>
                    <div className="current-course-image"><Image src={data.courses[0].image} alt="" fill /></div>
                    <div className="current-course-info">
                      <span>Module 4 · Paid Advertising</span>
                      <h3>{data.courses[0].next}</h3>
                      <div className="progress-line"><span style={{ width: data.progress + '%' }} /></div>
                      <div className="progress-label">
                        <span>{data.progress}% complete</span>
                        <span>18 of 28 lessons</span>
                      </div>
                      <button className="button button-primary"><Play size={17} fill="currentColor" /> Continue lesson</button>
                    </div>
                  </>
                )}
              </div>
            </section>
            <section className="panel next-class">
              <div className="panel-head">
                <h2>Upcoming class</h2>
                <Link href="/student/courses">View schedule</Link>
              </div>
              <div className="date-tile"><strong>24</strong><span>JUN</span></div>
              <div>
                <small>Today · 4:00–5:30 PM</small>
                <h3>{data.nextClass.title}</h3>
                <p><Clock3 /> {data.nextClass.room} · Rohit Sharma</p>
              </div>
              <button className="button button-ghost button-wide">View class details</button>
            </section>
          </div>
          <div className="dashboard-grid-main lower">
            <section className="panel">
              <div className="panel-head">
                <div>
                  <h2>Performance</h2>
                  <p>Your score compared with batch average</p>
                </div>
                <select><option>Last 5 tests</option></select>
              </div>
              <PerformanceChart />
            </section>
            <section className="panel">
              <div className="panel-head">
                <h2>Latest notices</h2>
                <Link href="/student/notices">View all</Link>
              </div>
              <div className="notice-mini-list">
                {mockNotices.map((n) => (
                  <article key={n.id}>
                    <span>{n.date.split(' ')[0]}<small>{n.date.split(' ')[1]}</small></span>
                    <div>
                      <strong>{n.title}</strong>
                      <p>{n.type}</p>
                    </div>
                    <ChevronRight />
                  </article>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </DashboardShell>
  );
}

export function StudentSection({ section }) {
  const [data, setData] = useState(mockStudentData);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([{ from: 'ai', text: 'Hi Aarav. Ask me anything from your Digital Marketing course.' }]);
  const [question, setQuestion] = useState('');
  const [submittingDoubt, setSubmittingDoubt] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadData() {
      setLoading(true);
      try {
        if (section === 'materials') {
          const res = await api.getStudentMaterials();
          if (active) setMaterials(res);
        } else {
          const overview = await api.getStudentOverview();
          if (active) setData(overview);
        }
      } catch (err) {
        console.warn('Live fetch failed, using fallback mock data for:', section);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => { active = false; };
  }, [section]);

  const send = useCallback(async (e) => {
    e.preventDefault();
    if (!question.trim() || submittingDoubt) return;
    
    const userMsg = question;
    setQuestion('');
    setChat((prev) => [...prev, { from: 'user', text: userMsg }]);
    setSubmittingDoubt(true);

    try {
      const response = await api.askAIDoubt(userMsg);
      setChat((prev) => [...prev, { from: 'ai', text: response.answer }]);
    } catch {
      setChat((prev) => [...prev, { from: 'ai', text: 'Sorry, I am facing connectivity issues, but I will review this question during our next live session.' }]);
    } finally {
      setSubmittingDoubt(false);
    }
  }, [question, submittingDoubt]);

  const title = useMemo(() => {
    const pageTitles = {
      courses: ['My courses', 'Continue learning and track your progress.'],
      attendance: ['Attendance', 'Your class attendance and monthly history.'],
      materials: ['Study material', 'Notes, assignments and resources from your trainers.'],
      lectures: ['Recorded lectures', 'Revisit classroom concepts at your own pace.'],
      results: ['Test results', 'Track scores, rank and performance trends.'],
      fees: ['Fee management', 'View your fee schedule and payment history.'],
      notices: ['Notices', 'Institute announcements and course updates.'],
      profile: ['Profile', 'Manage personal information and account security.'],
      'ai-assistant': ['AI doubt solver', 'Ask questions from your course content anytime.']
    };
    return pageTitles[section] || pageTitles.courses;
  }, [section]);

  const feesPending = useMemo(() => data.totalFees - data.paidFees, [data]);

  let content;

  if (loading) {
    content = <div className="loading-state" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading section details...</div>;
  } else if (section === 'courses') {
    content = (
      <div className="dashboard-card-grid">
        {data.courses?.map((c) => (
          <article className="learning-card" key={c.slug}>
            <div className="learning-image">
              <Image src={c.image} alt={c.title} fill />
              <button><CirclePlay fill="currentColor" /></button>
            </div>
            <div>
              <span>{c.category} · {c.duration}</span>
              <h3>{c.title}</h3>
              <p>Next: {c.next}</p>
              <div className="progress-line"><span style={{ width: c.progress + '%' }} /></div>
              <div className="progress-label">
                <span>{c.progress}% complete</span>
                <span>{Math.round(c.progress / 5)} lessons done</span>
              </div>
              <button className="button button-primary button-wide">Continue learning</button>
            </div>
          </article>
        ))}
      </div>
    );
  } else if (section === 'attendance') {
    content = (
      <>
        <div className="attendance-summary panel">
          <ProgressRing value={data.attendance} label="attendance" />
          <div>
            <h2>You&apos;re on track</h2>
            <p>Your attendance is above the minimum 75% requirement. Keep showing up consistently.</p>
            <div className="attendance-numbers">
              <span><strong>{Math.round((data.attendanceHistory?.length || 4) * (data.attendance / 100))}</strong>Present</span>
              <span><strong>{Math.round((data.attendanceHistory?.length || 4) * (1 - data.attendance / 100))}</strong>Absent</span>
            </div>
          </div>
        </div>
        <section className="panel table-panel">
          <div className="panel-head">
            <h2>Attendance history</h2>
            <select><option>June 2026</option></select>
          </div>
          <DataTable headers={['Date', 'Class', 'Status']}>
            {data.attendanceHistory?.map((r, idx) => (
              <tr key={r.date + idx}>
                <td>{r.date}</td>
                <td><strong>{r.subject}</strong></td>
                <td><Status tone={r.status === 'Late' ? 'amber' : 'green'}>{r.status}</Status></td>
              </tr>
            ))}
          </DataTable>
        </section>
      </>
    );
  } else if (section === 'materials') {
    content = (
      <section className="panel table-panel">
        <div className="panel-head">
          <div>
            <h2>Course resources</h2>
            <p>{materials.length} files across your enrolled courses</p>
          </div>
          <label className="search-small">Filter: 
            <select>
              <option>All types</option>
              <option>PDF notes</option>
              <option>Assignments</option>
            </select>
          </label>
        </div>
        <div className="resource-list">
          {materials.map((m, idx) => (
            <article key={m.name + idx}>
              <span className="resource-icon">{m.type === 'Assignment' ? <FileArchive /> : <FileText />}</span>
              <div>
                <strong>{m.name}</strong>
                <p>{m.type} · {m.size} · {m.course}</p>
              </div>
              <button className="icon-button" title="Download"><Download /></button>
            </article>
          ))}
        </div>
      </section>
    );
  } else if (section === 'lectures') {
    content = (
      <div className="dashboard-card-grid">
        {[
          ['Google Ads Search Campaigns', '42:18', data.courses?.[0]?.image || mockStudentData.courses[0].image, 72],
          ['Audience Research That Works', '36:05', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80', 18],
          ['Writing High-Converting Copy', '48:22', 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80', 0]
        ].map(([n, d, img, p], idx) => (
          <article className="lecture-card" key={n + idx}>
            <div>
              <Image src={img} alt="" fill />
              <button><Play fill="currentColor" /></button>
              <span>{d}</span>
            </div>
            <section>
              <small>Module 4 · Digital Marketing</small>
              <h3>{n}</h3>
              {p > 0 ? (
                <>
                  <div className="progress-line"><span style={{ width: p + '%' }} /></div>
                  <p>{p}% watched</p>
                </>
              ) : (
                <p>Not started</p>
              )}
            </section>
          </article>
        ))}
      </div>
    );
  } else if (section === 'results') {
    content = (
      <>
        <div className="result-summary">
          <StatCard icon={TrendingUp} label="Average score" value="87%" detail="+6% this month" />
          <StatCard icon={Award} label="Batch rank" value="#4" detail="Out of 28 students" tone="magenta" />
          <StatCard icon={CheckCircle2} label="Tests completed" value={`${data.results?.length || 3}/10`} detail="Evaluations" tone="green" />
        </div>
        <div className="dashboard-grid-main">
          <section className="panel"><div className="panel-head"><h2>Performance trend</h2></div><PerformanceChart /></section>
          <section className="panel table-panel">
            <div className="panel-head"><h2>Recent results</h2></div>
            <DataTable headers={['Test', 'Score', 'Rank']}>
              {data.results?.map((r, idx) => (
                <tr key={r.test + idx}>
                  <td><strong>{r.test}</strong></td>
                  <td>{r.score}%</td>
                  <td>#{r.rank}</td>
                </tr>
              ))}
            </DataTable>
          </section>
        </div>
      </>
    );
  } else if (section === 'fees') {
    content = (
      <>
        <div className="fee-banner">
          <div>
            <span>Outstanding balance</span>
            <strong>₹{feesPending.toLocaleString('en-IN')}</strong>
            <p>Next installment due on 30 June 2026</p>
          </div>
          <button className="button button-light"><CreditCard /> Pay securely with Razorpay</button>
        </div>
        <div className="dash-stats-grid three">
          <StatCard icon={CreditCard} label="Total course fee" value={'₹' + data.totalFees.toLocaleString('en-IN')} detail="Digital Marketing" />
          <StatCard icon={CheckCircle2} label="Amount paid" value={'₹' + data.paidFees.toLocaleString('en-IN')} detail="Confirmed payments" tone="green" />
          <StatCard icon={Clock3} label="Pending amount" value={'₹' + feesPending.toLocaleString('en-IN')} detail="1 installment due" tone="amber" />
        </div>
        <section className="panel table-panel">
          <div className="panel-head">
            <h2>Payment history</h2>
            <button className="button button-ghost"><Download /> Download receipt</button>
          </div>
          <DataTable headers={['Transaction', 'Date', 'Amount', 'Method', 'Status']}>
            <tr>
              <td><strong>#OVS24018</strong></td>
              <td>30 May 2026</td>
              <td>₹10,000</td>
              <td>UPI</td>
              <td><Status>Paid</Status></td>
            </tr>
            <tr>
              <td><strong>#OVS23884</strong></td>
              <td>28 Apr 2026</td>
              <td>₹10,000</td>
              <td>Card</td>
              <td><Status>Paid</Status></td>
            </tr>
          </DataTable>
        </section>
      </>
    );
  } else if (section === 'notices') {
    content = (
      <div className="notice-page-list">
        {mockNotices.concat([{ id: 4, title: 'New study material uploaded', date: '12 Jun', type: 'Course', text: 'Google Ads formula sheet is now available under Study Material.' }]).map((n) => (
          <article className="panel" key={n.id}>
            <div className="notice-date">
              <strong>{n.date.split(' ')[0]}</strong>
              <span>{n.date.split(' ')[1]}</span>
            </div>
            <div>
              <Status tone={n.type === 'Fees' ? 'amber' : n.type === 'Event' ? 'magenta' : 'blue'}>{n.type}</Status>
              <h2>{n.title}</h2>
              <p>{n.text}</p>
            </div>
            <button className="icon-button"><ChevronRight /></button>
          </article>
        ))}
      </div>
    );
  } else if (section === 'profile') {
    content = (
      <div className="profile-layout">
        <section className="panel profile-card">
          <div className="profile-avatar">{data.name.split(' ').map((n) => n[0]).join('').toUpperCase()}<button><Upload /></button></div>
          <h2>{data.name}</h2>
          <p>Student ID: OVS-2026-1048</p>
          <Status>Active student</Status>
          <hr />
          <div><span>Course</span><strong>{data.course}</strong></div>
          <div><span>Joined</span><strong>28 April 2026</strong></div>
        </section>
        <section className="panel profile-form">
          <div className="panel-head">
            <div>
              <h2>Personal information</h2>
              <p>Update your contact and profile details.</p>
            </div>
            <button className="button button-primary">Save changes</button>
          </div>
          <div className="form-grid">
            <label><span>Full name</span><input defaultValue={data.name} /></label>
            <label><span>Email address</span><input defaultValue="student@onevriksh.com" /></label>
            <label><span>Mobile number</span><input defaultValue="+91 98765 43210" /></label>
            <label><span>Date of birth</span><input type="date" defaultValue="2002-08-14" /></label>
            <label className="full"><span>Address</span><textarea defaultValue="Connaught Place, New Delhi" rows="3" /></label>
          </div>
          <div className="password-zone">
            <h3>Change password</h3>
            <button className="button button-ghost">Update password</button>
          </div>
        </section>
      </div>
    );
  } else {
    // AI Assistant
    content = (
      <div className="ai-layout">
        <section className="panel ai-chat">
          <div className="ai-head">
            <span><Sparkles /></span>
            <div>
              <h2>Onevriksh AI Tutor</h2>
              <p>Answers based on your current course</p>
            </div>
            <Status>Online</Status>
          </div>
          <div className="chat-messages">
            {chat.map((m, i) => (
              <div className={'chat-message ' + m.from} key={i}>
                {m.from === 'ai' && <span><Sparkles /></span>}
                <p>{m.text}</p>
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={send}>
            <button type="button"><Paperclip /></button>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question about your course..." disabled={submittingDoubt} />
            <button disabled={submittingDoubt}><Send /></button>
          </form>
        </section>
        <aside className="panel prompt-panel">
          <MessageSquareText />
          <h3>Try asking</h3>
          {['Explain keyword match types', 'Create a revision plan', 'Quiz me on SEO basics', 'Review my campaign idea'].map((q) => (
            <button key={q} onClick={() => setQuestion(q)} disabled={submittingDoubt}>
              {q}<ChevronRight />
            </button>
          ))}
          <div className="ai-note">
            <strong>Study smarter</strong>
            <p>AI answers can make mistakes. Verify important details with your trainer.</p>
          </div>
        </aside>
      </div>
    );
  }

  return <DashboardShell title={title[0]} subtitle={title[1]}>{content}</DashboardShell>;
}

function DataTable({ headers, children }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
