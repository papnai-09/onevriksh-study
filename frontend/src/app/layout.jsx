import './globals.css';
import { AppChrome } from '@/components/AppChrome';
import { AuthProvider } from '@/context/AuthContext';
import { RegionProvider } from '@/context/RegionContext';

export const metadata = {
  metadataBase: new URL('https://study.onevriksh.com'),
  title: { default: 'ONEVRIKSH Study | Root Your Skills. Rise Your Future.', template: '%s | ONEVRIKSH Study' },
  description: 'Practical offline coaching in Digital Marketing, Graphic Design, English, French, German and Spanish in New Delhi.',
  openGraph: { title: 'ONEVRIKSH Study', description: 'Practical skills. Expert mentors. Stronger careers.', type: 'website' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <RegionProvider>
            <AppChrome>{children}</AppChrome>
          </RegionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
