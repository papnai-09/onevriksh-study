import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata = {
  title: 'Terms of Service | OneVriksh Study',
  description: 'Terms and conditions for student admissions, offline classes, batch attendance, and certification.'
};

export default function TermsPage() {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderBottom: '1px solid var(--line)', padding: '36px 0' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Terms of Service' }]} />
          <h1 style={{ marginBottom: '8px' }}>Terms of Service</h1>
          <p className="lead" style={{ maxWidth: '640px', margin: 0 }}>
            Guidelines governing course enrollment, classroom code of conduct, and certificate issuance.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', padding: '36px 0' }}>
        <div className="container" style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--ink-secondary)' }}>
          <h2 style={{ fontSize: '1.4rem', marginTop: '24px', marginBottom: '12px' }}>1. Enrollment & Admission</h2>
          <p>Admission to batches is subject to seat availability (maximum 15-20 students per batch) and fee completion or agreed installment terms.</p>

          <h2 style={{ fontSize: '1.4rem', marginTop: '24px', marginBottom: '12px' }}>2. Attendance & Certification Criteria</h2>
          <p>To qualify for a Course Completion Certificate, students must maintain at least 85% attendance and successfully submit all assigned capstone projects and practical lab briefs.</p>

          <h2 style={{ fontSize: '1.4rem', marginTop: '24px', marginBottom: '12px' }}>3. Classroom Discipline</h2>
          <p>All learners are expected to maintain professional conduct inside the Connaught Place studio and on all digital communication channels.</p>
        </div>
      </section>
    </>
  );
}
