'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Phone, Sun, X, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Brand } from './Brand';
import { useAuth } from '@/context/AuthContext';

const links = [
  ['/', 'Home'], ['/about', 'About'], ['/courses', 'Courses'],
  ['/contact', 'Contact']
];

export function Header() {
  const pathname = usePathname();
  const { user, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('onevriksh-theme');
    const useDark = saved === 'dark';
    setDark(useDark);
    document.documentElement.dataset.theme = useDark ? 'dark' : 'light';
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('onevriksh-theme', next ? 'dark' : 'light');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setOpen(false);
    login();
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setOpen(false);
    logout();
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Admissions open for 2026 batches</span>
          <a href="tel:+918700536553"><Phone size={14} /> +91 87005 36553</a>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={pathname === href || (href !== '/' && pathname.startsWith(href)) ? 'active' : ''}>
                {label}
              </Link>
            ))}
            <Link href="/demo" className="nav-mobile-demo" onClick={() => setOpen(false)}>Free demo</Link>
            {user ? (
              <>
                <Link href={user.role === 'admin' ? '/admin' : '/student'} className="nav-mobile-login" onClick={() => setOpen(false)}>
                  Dashboard ({user.name.split(' ')[0]})
                </Link>
                <button onClick={handleLogoutClick} className="nav-mobile-login" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : (
              <button onClick={handleLoginClick} className="nav-mobile-login" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
                Login
              </button>
            )}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" onClick={toggleTheme} aria-label="Toggle color theme" title="Toggle theme">
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            {user ? (
              <>
                <Link href={user.role === 'admin' ? '/admin' : '/student'} className="button button-ghost login-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={16} />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogoutClick} className="button button-ghost" title="Logout" style={{ padding: '8px 12px' }}>
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <button onClick={handleLoginClick} className="button button-ghost login-button">
                Login
              </button>
            )}
            <Link href="/demo" className="button button-primary demo-button">Book free demo</Link>
            <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
