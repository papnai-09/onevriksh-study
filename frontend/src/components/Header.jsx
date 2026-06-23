'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Phone, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Brand } from './Brand';

const links = [
  ['/', 'Home'], ['/about', 'About'], ['/courses', 'Courses'],
  ['/contact', 'Contact']
];

export function Header() {
  const pathname = usePathname();
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
          </nav>
          <div className="nav-actions">
            <button className="icon-button" onClick={toggleTheme} aria-label="Toggle color theme" title="Toggle theme">
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link href="/login" className="button button-ghost login-button">Login</Link>
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
