import './globals.css';
import { AppChrome } from '@/components/AppChrome';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  metadataBase: new URL('https://study.onevriksh.com'),
  title: { default: 'Onevriksh Study | Root Your Skills. Rise Your Future.', template: '%s | Onevriksh Study' },
  description: 'Practical offline coaching in Digital Marketing, Graphic Design, English, French, German and Spanish in New Delhi.',
  openGraph: { title: 'Onevriksh Study', description: 'Practical skills. Expert mentors. Stronger careers.', type: 'website' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <AppChrome>{children}</AppChrome>
        </AuthProvider>
      </body>
    </html>
  );
}
