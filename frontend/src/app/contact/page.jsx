import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FormCard } from '@/components/FormCard';
import { institute } from '@/data/site';

export const metadata = { title: 'Contact Us' };

const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Your name' },
  { name: 'phone', label: 'Mobile number', type: 'tel', placeholder: '+91 98765 43210' },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com' },
  { name: 'subject', label: 'How can we help?', type: 'select', options: ['Course enquiry','Free demo','Fee information','Career counselling','Other'] },
  { name: 'message', label: 'Message', type: 'textarea', full: true, placeholder: 'Tell us what you would like to know' }
];

export default function ContactPage() {
  return (
    <>
      <section className="simple-hero"><div className="container"><span className="eyebrow light">Talk to us</span><h1>Let&apos;s plan your next step.</h1><p>Questions about courses, batches or careers? Our team is ready to help.</p></div></section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Visit or contact us</span><h2>We&apos;re right in the heart of Delhi.</h2>
            <p>Drop in for counselling, attend a free demo, or reach us by phone and WhatsApp.</p>
            <div className="contact-list">
              <a href="tel:+918700536553"><span><Phone/></span><div><small>Call us</small><strong>{institute.phone}</strong></div></a>
              <a href={'mailto:'+institute.email}><span><Mail/></span><div><small>Email us</small><strong>{institute.email}</strong></div></a>
              <div><span><MapPin/></span><div><small>Visit us</small><strong>{institute.address}</strong></div></div>
              <div><span><Clock3/></span><div><small>Institute hours</small><strong>Mon–Sat, 9:00 AM–7:00 PM</strong></div></div>
            </div>
            <a className="button whatsapp-cta" href={institute.whatsapp} target="_blank" rel="noreferrer"><MessageCircle/> Chat on WhatsApp</a>
          </div>
          <FormCard title="Send an enquiry" subtitle="We usually respond within one working day." fields={fields} submitLabel="Send message" />
        </div>
      </section>
      <section className="map-section"><iframe title="Onevriksh Study location" src="https://maps.google.com/maps?q=Connaught%20Place%20New%20Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" /></section>
    </>
  );
}
