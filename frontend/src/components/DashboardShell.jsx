'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  BookOpen,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Megaphone,
  Moon,
  PlaySquare,
  QrCode,
  Search,
  Settings,
  Sparkles,
  Sun,
  TestTube2,
  UserRound,
  Users,
  WalletCards,
  X,
  LoaderCircle
} from 'lucide-react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Brand } from './Brand';
import { useAuth } from '@/context/AuthContext';

const studentNav = [
  ['', 'Overview', LayoutDashboard],
  ['courses', 'My Courses', BookOpen],
  ['attendance', 'Attendance', CalendarCheck],
  ['materials', 'Study Material', FileText],
  ['lectures', 'Recorded Lectures', PlaySquare],
  ['results', 'Test Results', ClipboardCheck],
  ['fees', 'Fee Management', CreditCard],
  ['notices', 'Notices', Megaphone],
  ['ai-assistant', 'AI Doubt Solver', Sparkles],
  ['profile', 'Profile', UserRound]
];

const adminNav = [
  ['', 'Overview', LayoutDashboard],
  ['students', 'Students', Users],
  ['courses', 'Courses', GraduationCap],
  ['attendance', 'Attendance', QrCode],
  ['fees', 'Fees & Payments', WalletCards],
  ['materials', 'Study Material', FileText],
  ['notices', 'Notices', Megaphone],
  ['tests', 'Tests & Results', TestTube2],
  ['settings', 'Settings', Settings]
];

export function DashboardShell({ role = 'student', children, title, subtitle, actions }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const base = role === 'admin' ? '/admin' : '/student';
  const nav = role === 'admin' ? adminNav : studentNav;

  useEffect(() => {
    const d = localStorage.getItem('onevriksh-theme') === 'dark';
    setDark(d);
    document.documentElement.dataset.theme = d ? 'dark' : 'light';
  }, []);

  // Redirect to local /login if unauthenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  const toggle = useCallback(() => {
    const d = !dark;
    setDark(d);
    document.documentElement.dataset.theme = d ? 'dark' : 'light';
    localStorage.setItem('onevriksh-theme', d ? 'dark' : 'light');
  }, [dark]);

  const handleLogout = useCallback(async (e) => {
    e.preventDefault();
    await logout();
    router.push('/login');
  }, [logout, router]);

  const userInitials = useMemo(() => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return role === 'admin' ? 'AD' : 'ST';
  }, [user, role]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)' }}>
        <div style={{ textAlign: 'center' }}>
          <LoaderCircle size={36} className="spin" style={{ color: 'var(--primary)', margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)' }}>
        <div style={{ textAlign: 'center' }}>
          <LoaderCircle size={36} className="spin" style={{ color: 'var(--primary)', margin: '0 auto 1rem' }} />
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className={open ? 'dashboard-sidebar open' : 'dashboard-sidebar'}>
        <div className="sidebar-brand">
          <Brand />
          <button className="icon-button sidebar-close" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="portal-label">{role === 'admin' ? 'Administration' : 'Student Portal'}</div>
        <nav className="sidebar-nav">
          {nav.map(([path, label, Icon]) => {
            const href = path ? `${base}/${path}` : base;
            const active = pathname === href;
            return (
              <Link key={label} href={href} className={active ? 'active' : ''} onClick={() => setOpen(false)}>
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-user">
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--primary-soft)',
              color: 'var(--primary)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: '0.82rem'
            }}
          >
            {userInitials}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <strong style={{ fontSize: '0.82rem', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.name}
            </strong>
            <small style={{ fontSize: '0.68rem', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.email}
            </small>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="icon-button dashboard-menu" onClick={() => setOpen(true)} style={{ marginRight: '12px' }}>
            <Menu size={18} />
          </button>
          <div className="dashboard-search">
            <Search size={16} style={{ color: 'var(--muted)' }} />
            <input type="search" placeholder="Search portal resources, classes..." />
          </div>
          <div className="dashboard-actions" style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="icon-button" onClick={toggle} title="Toggle Dark/Light Mode">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/" className="button button-ghost button-small">
              <span>View Website</span>
            </Link>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="dashboard-heading" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '1.4rem', margin: '0 0 4px' }}>{title}</h1>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>{subtitle}</p>
            </div>
            {actions && <div className="heading-actions">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
