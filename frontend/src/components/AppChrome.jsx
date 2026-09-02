'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { Header } from './Header';
import { Scroll3D } from './Scroll3D';
import { AuthModalHost } from './AuthModalHost';

export function AppChrome({ children }) {
  const pathname = usePathname();
  const appRoute = pathname.startsWith('/student') || pathname.startsWith('/admin');
  const authRoute = ['/login', '/register', '/forgot-password', '/reset-password'].some((path) => pathname.startsWith(path));

  if (appRoute || authRoute) {
    return (
      <>
        {children}
        <AuthModalHost />
      </>
    );
  }

  return (
    <>
      <Scroll3D />
      <Header />
      <main className="up-main-content">{children}</main>
      <Footer />
      <AuthModalHost />
    </>
  );
}
