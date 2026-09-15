'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/utils/api';
import {
  Award,
  BadgeCheck,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  FileCheck,
  GraduationCap,
  Layers,
  LoaderCircle,
  Search,
  ShieldCheck,
  User,
  UserCheck,
  Building2,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { ExpandableCourseCarousel } from '@/components/ExpandableCourseCarousel';

const eligibleCourses = [
  {
    title: 'Digital Marketing',
    category: 'Career Skills',
    slug: 'master-in-digital-marketing-course',
    image: '/master-digital-marketing.jpg',
    description: 'Learn practical digital marketing skills across SEO, paid advertising, social media, content, analytics, and more.'
  },
  {
    title: 'Graphic Design',
    category: 'Design',
    slug: 'graphic-design',
    image: '/graphic-design.jpg',
    description: 'Develop practical graphic design skills and learn to create professional visual content.'
  },
  {
    title: 'Spanish Language',
    category: 'Language',
    slug: 'spanish-language',
    image: '/spanish.jpg',
    description: 'Develop Spanish communication skills across speaking, listening, reading, and writing.'
  },
  {
    title: 'German Language',
    category: 'Language',
    slug: 'german-language',
    image: '/german.jpg',
    description: 'Build German language skills through structured learning and practical communication practice.'
  },
  {
    title: 'French Language',
    category: 'Language',
    slug: 'french-language',
    image: '/french-language.jpg',
    description: 'Develop French communication skills through structured language learning and practical practice.'
  },
  {
    title: 'English Speaking',
    category: 'Language',
    slug: 'english-speaking',
    image: '/english.jpg',
    description: 'Improve your English communication, speaking confidence, vocabulary, pronunciation, and practical conversation skills.'
  }
];

const faqs = [
  {
    question: 'What type of certificate does OneVriksh provide?',
    answer: 'OneVriksh provides a Course Completion Certificate for eligible programs after the applicable completion requirements are met.'
  },
  {
    question: 'Which courses offer certification?',
    answer: 'Certification is currently available for the programs listed on this page.'
  },
  {
    question: 'How do I receive my certificate?',
    answer: 'Complete the applicable course requirements. Once requirements are successfully completed, the certificate can be issued according to the program’s certificate process.'
  },
  {
    question: 'Can my certificate be verified?',
    answer: 'Certificates with a valid Certificate ID can be verified through the OneVriksh verification system, where available.'
  },
  {
    question: 'Is the certificate a university degree?',
    answer: 'No. A OneVriksh Course Completion Certificate represents completion of a OneVriksh training program. It is not a university degree.'
  },
  {
    question: 'Are certification requirements the same for every course?',
    answer: 'Requirements may vary depending on the course.'
  }
];

export default function CertificationPage() {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const trimmed = certId.trim().toUpperCase();
    if (!trimmed) {
      setError('Please enter a valid Certificate ID.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.verifyCertificate(trimmed);
      if (data && data.verified && data.certificate) {
        setResult(data.certificate);
      } else {
        setError('Certificate record not found in the verification database. Please verify the ID or contact support.');
      }
    } catch (err) {
      setError(err.message || 'Verification lookup failed. Please check the Certificate ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToVerify = (e) => {
    e.preventDefault();
    const el = document.getElementById('verify-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="simple-hero" style={{ padding: '52px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="eyebrow light" style={{ marginBottom: '12px' }}>ONEVRIKSH CERTIFICATION</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', lineHeight: 1.15, margin: '8px 0 16px', color: 'var(--ink)', maxWidth: '820px', fontWeight: 700 }}>
            Learn. Complete. Get Certified.
          </h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '780px', margin: '0 0 24px' }}>
            Successfully complete your chosen OneVriksh program and earn a Course Completion Certificate that reflects your learning and practical work.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <Link href="/courses" className="button button-primary" style={{ padding: '0 24px', height: '46px' }}>
              Explore Courses
            </Link>
            <Link href="/contact" className="button button-ghost" style={{ padding: '0 24px', height: '46px' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRODUCTION */}
      <section className="section" style={{ background: 'var(--surface)', padding: '52px 0' }}>
        <div className="container">
          <span className="eyebrow">COURSE CERTIFICATES</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', margin: '6px 0 14px', color: 'var(--ink)', maxWidth: '820px', fontWeight: 700 }}>
            Certification That Recognizes Your Learning
          </h2>
          <p style={{ fontSize: '1.02rem', color: 'var(--muted)', lineHeight: 1.7, margin: 0, maxWidth: '820px' }}>
            At OneVriksh, certification is connected to course completion and learning requirements. Students who successfully complete the applicable requirements of their program can receive a OneVriksh Course Completion Certificate.
          </p>
        </div>
      </section>

      {/* SECTION 3 — COURSES WITH CERTIFICATION EXPANDABLE CAROUSEL */}
      <section className="section" style={{ background: 'var(--surface-2)', padding: '52px 0' }}>
        <div className="container">
          <ExpandableCourseCarousel
            courses={eligibleCourses}
            eyebrow="CERTIFICATION COURSES"
            title="Get Certified in Your Chosen Course"
            text="Explore the courses offering a course completion certificate after completing assignments and assessments."
            viewAllHref="/courses"
          />
        </div>
      </section>

      {/* SECTION 4 — WHAT DOES THE CERTIFICATE REPRESENT? */}
      <section className="section" style={{ background: 'var(--surface)', padding: '36px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span className="eyebrow">WHAT IT REPRESENTS</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--ink)', margin: '6px 0 10px' }}>
              More Than Just a Certificate
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '28px 24px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.08rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Structured Learning</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Complete a structured learning program designed around practical skill development.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '28px 24px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.08rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Practical Work</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Apply what you learn through applicable assignments, exercises, and projects.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '28px 24px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.08rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Course Completion</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Receive your certificate after meeting the applicable completion requirements of your program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW YOU GET CERTIFIED */}
      <section className="section" style={{ background: 'var(--surface-2)', padding: '52px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span className="eyebrow">PROCESS</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--ink)', margin: '6px 0 10px' }}>
              How You Get Certified
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '28px 24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#EE2C3C', display: 'block', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>01</span>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Choose Your Course</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Select the OneVriksh course you want to learn.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '28px 24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#EE2C3C', display: 'block', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>02</span>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Complete Your Learning</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Attend your sessions and complete the course topics.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '28px 24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#EE2C3C', display: 'block', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>03</span>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Complete Requirements</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Complete assignments, assessments, and practical exercises.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '28px 24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#EE2C3C', display: 'block', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>04</span>
              <h3 style={{ fontSize: '1.05rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Get Certified</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Receive your OneVriksh Course Completion Certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CERTIFICATION REQUIREMENTS */}
      <section className="section" style={{ background: 'var(--surface)', padding: '52px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span className="eyebrow">REQUIREMENTS</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--ink)', margin: '6px 0 10px' }}>
              What Does It Take to Get Certified?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1.02rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Attendance</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Maintain regular attendance throughout your classes.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1.02rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Practical Assignments</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Complete the practical assignments and exercises.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1.02rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Assessment</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Pass the course assessments and quizzes.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1.02rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Final Project</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Complete the final project where applicable.
              </p>
            </div>
          </div>

          <p style={{ textAlign: 'left', fontSize: '0.82rem', color: 'var(--muted)', margin: 0, fontWeight: 500 }}>
            * Certification requirements may vary by course.
          </p>
        </div>
      </section>

      {/* SECTION 7 — CERTIFICATE PREVIEW */}
      <section className="section" style={{ background: 'var(--surface-2)', padding: '36px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ maxWidth: '680px', marginBottom: '28px' }}>
            <span className="eyebrow">CERTIFICATE PREVIEW</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#000000', margin: '6px 0 10px' }}>
              Your OneVriksh Course Completion Certificate
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#111827' }}>
              After successfully completing the requirements of your program, you receive a OneVriksh Course Completion Certificate.
            </p>
          </div>

          {/* Certificate Sample Card */}
          <div style={{
            position: 'relative',
            background: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '10px',
            padding: '36px 32px',
            boxShadow: 'var(--shadow)',
            color: 'var(--ink)',
            overflow: 'hidden',
            maxWidth: '860px',
            border: '1px solid var(--line)'
          }}>
            {/* Watermark Label */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '18px',
              background: '#0F172A',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Sample Certificate
            </div>

            <div style={{ textAlign: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '22px', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '28px', height: '28px', background: '#0F172A', borderRadius: '6px', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.82rem' }}>
                  O
                </div>
                <strong style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', letterSpacing: '0.04em', color: 'var(--ink)' }}>ONEVRIKSH STUDY</strong>
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--ink)', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
                Certificate of Course Completion
              </h3>
            </div>

            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', margin: '0 0 8px' }}>This is to certify that</p>
              <h2 style={{ fontSize: '1.65rem', color: 'var(--ink)', fontFamily: 'var(--font-display)', margin: '0 0 12px', fontWeight: 700 }}>
                [ Student Name ]
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', maxWidth: '580px', margin: '0 auto 14px', lineHeight: 1.65 }}>
                has successfully completed all the learning modules, practical exercises, and completion requirements for the program:
              </p>
              <h3 style={{ fontSize: '1.2rem', color: '#EE2C3C', margin: '0 0 18px', fontWeight: 700 }}>
                [ Course Name ]
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              borderTop: '1px solid var(--line)',
              paddingTop: '20px',
              marginTop: '20px',
              fontSize: '0.8rem'
            }}>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.72rem' }}>Certificate ID</span>
                <strong style={{ color: 'var(--ink)' }}>OVS-CERT-2026-SAMPLE</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.72rem' }}>Completion Date</span>
                <strong style={{ color: 'var(--ink)' }}>[ DD Month YYYY ]</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.72rem' }}>Authorized Signature</span>
                <strong style={{ color: 'var(--ink)', borderTop: '1px dashed var(--line)', display: 'inline-block', paddingTop: '4px', marginTop: '2px' }}>
                  OneVriksh Academic Council
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CERTIFICATE VERIFICATION */}
      <section id="verify-section" className="section" style={{ background: 'var(--surface)', padding: '52px 0' }}>
        <div className="container">
          <div className="form-card" style={{ padding: '36px 32px', maxWidth: '600px' }}>
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', margin: '0 0 8px', color: 'var(--ink)', fontWeight: 700 }}>Verify a OneVriksh Certificate</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                Verify a OneVriksh Course Completion Certificate using its unique Certificate ID.
              </p>
            </div>

            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#FEF2F2',
                  color: '#DC2626',
                  border: '1px solid #FCA5A5',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  marginBottom: '18px'
                }}
                role="alert"
              >
                <AlertCircle size={16} style={{ minWidth: '16px' }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleVerify} style={{ display: 'grid', gap: '14px', marginBottom: '14px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)' }}>
                  Enter Certificate ID
                </span>
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="e.g. OVS-CERT-2026-001 (Sample ID)"
                  style={{
                    height: '46px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    width: '100%',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    padding: '0 14px',
                    fontSize: '0.88rem'
                  }}
                  required
                  disabled={loading}
                />
              </label>

              <button
                type="submit"
                className="button button-primary button-wide"
                disabled={loading}
                style={{ height: '46px', fontSize: '0.9rem', fontWeight: 600 }}
              >
                {loading ? <LoaderCircle size={18} className="spin" /> : <Search size={18} />}
                <span>{loading ? 'Verifying...' : 'Verify Certificate'}</span>
              </button>
            </form>

            <small style={{ display: 'block', textAlign: 'left', color: 'var(--muted)', fontSize: '0.74rem' }}>
              * Sample ID format: <code>OVS-CERT-YYYY-XXX</code>
            </small>

            {/* Verified Result Card */}
            {result && (
              <div style={{
                marginTop: '22px',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                padding: '20px',
                background: '#FEF2F2'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EE2C3C', marginBottom: '12px' }}>
                  <CheckCircle2 size={18} />
                  <strong style={{ fontSize: '0.9rem' }}>Verified OneVriksh Certificate</strong>
                </div>
                <div style={{ display: 'grid', gap: '8px', fontSize: '0.84rem', color: 'var(--ink)' }}>
                  <div><strong>Student Name:</strong> {result.studentName}</div>
                  <div><strong>Course:</strong> {result.courseTitle}</div>
                  <div><strong>Issue Date:</strong> {new Date(result.issueDate).toLocaleDateString()}</div>
                  <div><strong>Certificate ID:</strong> {result.credentialId}</div>
                  <div><strong>Status:</strong> {result.status || 'Verified & Issued'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 9 — FOR STUDENTS & EMPLOYERS */}
      <section className="section" style={{ background: 'var(--surface-2)', padding: '52px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.15rem', margin: '0 0 10px', color: 'var(--ink)', fontWeight: 700 }}>For Students</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 20px' }}>
                Keep your Certificate ID safe and use it whenever you need to share or verify your OneVriksh course completion.
              </p>
              <button
                onClick={scrollToVerify}
                className="button button-ghost"
                style={{ height: '40px', fontSize: '0.84rem', fontWeight: 600 }}
              >
                <span>Verify Certificate</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.15rem', margin: '0 0 10px', color: 'var(--ink)', fontWeight: 700 }}>For Employers</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 20px' }}>
                Employers can use the Certificate ID to verify whether a certificate was issued by OneVriksh.
              </p>
              <button
                onClick={scrollToVerify}
                className="button button-ghost"
                style={{ height: '40px', fontSize: '0.84rem', fontWeight: 600 }}
              >
                <span>Verify Certificate</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — WHAT'S INCLUDED ON THE CERTIFICATE? */}
      <section className="section" style={{ background: 'var(--surface)', padding: '52px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span className="eyebrow">Credential Elements</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--ink)', margin: '6px 0 10px' }}>
              What&apos;s Included on the Certificate?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px'
          }}>
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Student Name</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                The name of the learner who completed the program.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Course Name</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                The OneVriksh course completed by the learner.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Certificate ID</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                A unique identification number assigned to the certificate.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Completion Date</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                The date on which the program was completed.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Course Completion</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Indicates successful completion of the applicable course requirements.
              </p>
            </div>

            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '24px 20px'
            }}>
              <h3 style={{ fontSize: '1rem', margin: '0 0 6px', color: 'var(--ink)', fontWeight: 700 }}>Verification</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Allows the certificate record to be checked through the verification system, when available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FAQ */}
      <section className="section" style={{ background: 'var(--surface-2)', padding: '52px 0' }}>
        <div className="container">
          <div className="section-heading" style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span className="eyebrow">Common Questions</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--ink)', margin: '6px 0 10px', fontWeight: 700 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'grid', gap: '12px', maxWidth: '880px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 0,
                      textAlign: 'left',
                      fontWeight: 750,
                      fontSize: '0.92rem',
                      color: '#000000'
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: 'var(--blue)'
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 20px 18px',
                      fontSize: '0.86rem',
                      color: '#111827',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--line)',
                      paddingTop: '12px'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 12 — FINAL CTA */}
      <section className="section" style={{ background: 'var(--surface)', padding: '36px 0' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--blue)' }}>Get Started</span>
          <h2 style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.3rem)', color: '#000000', margin: '8px 0 14px' }}>
            Ready to Learn and Get Certified?
          </h2>
          <p style={{ fontSize: '1rem', color: '#111827', lineHeight: 1.65, maxWidth: '620px', margin: '0 0 24px' }}>
            Choose a program, build practical skills, and work toward completing your OneVriksh certification.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <Link href="/courses" className="button button-primary" style={{ padding: '0 26px', height: '46px' }}>
              Explore All Courses
            </Link>
            <Link href="/contact" className="button button-ghost" style={{ padding: '0 26px', height: '46px' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
