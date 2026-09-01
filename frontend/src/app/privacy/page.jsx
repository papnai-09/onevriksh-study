import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata = {
  title: 'Privacy Policy | OneVriksh Study',
  description: 'OneVriksh Study privacy policy regarding student data, lead submission, and account information.'
};

export default function PrivacyPage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderBottom: '1px solid var(--line)', padding: '36px 0' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
          <h1 style={{ marginBottom: '8px' }}>Privacy Policy</h1>
          <p className="lead" style={{ maxWidth: '640px', margin: 0 }}>
            How we protect, store, and manage student and visitor information.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', padding: '36px 0' }}>
        <div className="container" style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--ink-secondary)' }}>
          <h2 style={{ fontSize: '1.4rem', marginTop: '24px', marginBottom: '12px' }}>1. Information We Collect</h2>
          <p>We collect student registration details (name, email, phone number, enrollment details) and enquiry lead data submitted through our demo and contact forms solely to provide course counselling and academic services.</p>

          <h2 style={{ fontSize: '1.4rem', marginTop: '24px', marginBottom: '12px' }}>2. How Information is Used</h2>
          <p>Your details are used exclusively for admission communications, class batch notifications, student portal access, attendance tracking, and certificate verification.</p>

          <h2 style={{ fontSize: '1.4rem', marginTop: '24px', marginBottom: '12px' }}>3. Data Security & Storage</h2>
          <p>Passwords are securely hashed using bcrypt prior to database storage. We do not sell or trade student contact details to third-party telemarketers.</p>

          <h2 style={{ fontSize: '1.4rem', marginTop: '24px', marginBottom: '12px' }}>4. Contact Us</h2>
          <p>For questions regarding your data privacy, email us at <a href="mailto:info@onevriksh.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>info@onevriksh.com</a> or visit our Connaught Place training centre.</p>
        </div>
      </section>
    </>
  );
}
