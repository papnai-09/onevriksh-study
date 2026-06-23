import Image from 'next/image';
import { BadgeCheck, Clock, Users } from 'lucide-react';
import { FormCard } from '@/components/FormCard';
import { courses } from '@/data/site';

export const metadata = { title: 'Book a Free Demo' };
const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Your full name' },
  { name: 'phone', label: 'Mobile number', type: 'tel', placeholder: '+91 98765 43210' },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com' },
  { name: 'course', label: 'Course interested in', type: 'select', options: courses.map(c=>c.title) },
  { name: 'mode', label: 'Preferred time', type: 'select', options: ['Weekday morning','Weekday evening','Weekend'] },
  { name: 'message', label: 'Anything we should know?', type: 'textarea', full: true, placeholder: 'Optional message', required: false }
];

export default function DemoPage() {
  return (
    <main className="demo-page">
      <div className="demo-bg"><Image src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=85" alt="" fill priority /></div>
      <div className="demo-overlay"/>
      <div className="container demo-layout">
        <div className="demo-copy"><span className="eyebrow light">Experience Onevriksh</span><h1>Your first class is on us.</h1><p>Meet the trainer, experience our teaching style and get a personalized course recommendation with no pressure to enroll.</p><div className="demo-points"><span><BadgeCheck/> Live trainer-led session</span><span><Users/> Small batch experience</span><span><Clock/> 45-minute class and counselling</span></div></div>
        <FormCard variant="glass" title="Book your free demo" subtitle="Choose your course and our counsellor will confirm a slot." fields={fields} submitLabel="Reserve my demo seat" />
      </div>
    </main>
  );
}
