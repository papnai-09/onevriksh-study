import { StudyWorldHeaderShowcase } from '@/components/StudyWorldHeader';

export const metadata = {
  title: 'StudyWorld Responsive Navigation Header System - Figma Showcase',
  description: 'Production-ready responsive header component presentation displaying Desktop (1440px), Tablet (834px), Mobile (390px), and Mobile Drawer Open states.'
};

export default function HeaderShowcasePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F1F5F9' }}>
      <StudyWorldHeaderShowcase />
    </main>
  );
}
