'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { Header } from './Header';
import { WhatsappButton } from './WhatsappButton';

export function AppChrome({ children }) {
  const pathname = usePathname();
  const appRoute = pathname.startsWith('/student') || pathname.startsWith('/admin');
  const authRoute = ['/login', '/register', '/forgot-password', '/reset-password'].some((path) => pathname.startsWith(path));

  if (appRoute || authRoute) return children;
  return <><Header /><main>{children}</main><Footer /><WhatsappButton /></>;
}
