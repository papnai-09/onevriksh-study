'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, BookOpen, CalendarCheck, ChevronDown, ClipboardCheck, CreditCard, FileText, GraduationCap, LayoutDashboard, LogOut, Menu, Megaphone, Moon, PlaySquare, QrCode, Search, Settings, Sparkles, Sun, TestTube2, UserRound, Users, WalletCards, X } from 'lucide-react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Brand } from './Brand';
import { useAuth } from '@/context/AuthContext';

const studentNav = [
  ['','Overview',LayoutDashboard],['courses','My courses',BookOpen],['attendance','Attendance',CalendarCheck],
  ['materials','Study material',FileText],['lectures','Recorded lectures',PlaySquare],['results','Test results',ClipboardCheck],
  ['fees','Fee management',CreditCard],['notices','Notices',Megaphone],['ai-assistant','AI doubt solver',Sparkles],['profile','Profile',UserRound]
];
const adminNav = [
  ['','Overview',LayoutDashboard],['students','Students',Users],['courses','Courses',GraduationCap],
  ['attendance','Attendance',QrCode],['fees','Fees & payments',WalletCards],['materials','Study material',FileText],
  ['notices','Notices',Megaphone],['tests','Tests & results',TestTube2],['settings','Settings',Settings]
];

export function DashboardShell({ role='student', children, title, subtitle, actions }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const base = role === 'admin' ? '/admin' : '/student';
  const nav = role === 'admin' ? adminNav : studentNav;

  useEffect(() => {
    const d = localStorage.getItem('onevriksh-theme') === 'dark';
    setDark(d);
    document.documentElement.dataset.theme = d ? 'dark' : 'light';
  }, []);

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
      return user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return role === 'admin' ? 'AD' : 'ST';
  }, [user, role]);

  return (
    <div className="dashboard-layout">
      <aside className={open ? 'dashboard-sidebar open' : 'dashboard-sidebar'}>
        <div className="sidebar-brand">
          <Brand />
          <button className="icon-button sidebar-close" onClick={() => setOpen(false)}><X /></button>
        </div>
        <div className="portal-label">{role === 'admin' ? 'Administration' : 'Student portal'}</div>
        <nav className="sidebar-nav">
          {nav.map(([path, label, Icon]) => {
            const href = path ? base + '/' + path : base;
            const active = pathname === href;
            return (
              <Link key={label} href={href} className={active ? 'active' : ''} onClick={() => setOpen(false)}>
                <Icon /><span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-user">
          <span className="person-avatar">{userInitials}</span>
          <div>
            <strong>{user?.name || (role === 'admin' ? 'Admin User' : 'Student User')}</strong>
            <small>{user?.role === 'admin' ? 'Super Admin' : (user?.studentId || 'Enrolled Student')}</small>
          </div>
          <ChevronDown size={17} />
        </div>
        <a className="sidebar-logout" href="/login" onClick={handleLogout}><LogOut /> Logout</a>
      </aside>
      {open && <button className="sidebar-scrim" onClick={() => setOpen(false)} aria-label="Close menu" />}
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="icon-button dashboard-menu" onClick={() => setOpen(true)}><Menu /></button>
          <label className="dashboard-search"><Search /><input placeholder="Search anything" /></label>
          <div className="dashboard-actions">
            <button className="icon-button" onClick={toggle}>{dark ? <Sun /> : <Moon />}</button>
            <button className="icon-button notification-button"><Bell /><span /></button>
            <span className="top-avatar">{userInitials}</span>
          </div>
        </header>
        <main className="dashboard-content">
          <div className="dashboard-heading">
            <div>
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
            {actions && <div className="heading-actions">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
