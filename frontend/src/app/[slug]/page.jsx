import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Award, BadgeCheck, Check, ChevronDown, Clock, Languages, Star, Users } from 'lucide-react';
import { courses } from '@/data/site';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  return { title: course ? `${course.title} | Onevriksh Study` : 'Course' };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();

  return (
    <>
      <section className="course-detail-hero">
        <div className="container detail-hero-grid">
          <div>
            <span className="course-category light">{course.category}</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="detail-meta">
              <span>
                <Star fill="currentColor" size={16} /> {course.rating} rating
              </span>
              <span>
                <Users size={16} /> {course.students}+ learners
              </span>
              <span>
                <Clock size={16} /> {course.duration}
              </span>
            </div>
            <div className="detail-actions">
              <Link href="/demo" className="button button-primary button-large">
                Book free demo
              </Link>
              <a href="#curriculum" className="button button-light button-large">
                View curriculum
              </a>
            </div>
          </div>
          <div className="detail-image">
            <Image src={course.image} alt={course.title} fill priority sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section id="overview" className="section detail-section">
        <div className="container detail-layout">
          <div className="detail-content">
            <span className="eyebrow">Course overview</span>
            <h2>Turn learning into a real-world skill.</h2>
            <p className="lead">{course.description}</p>
            <p>
              This program combines guided classroom instruction with practical exercises and mentor feedback. You will leave with stronger fundamentals, proof of your ability and a clear next step.
            </p>
            <div className="benefit-grid">
              {course.benefits?.map((item) => (
                <span key={item}>
                  <Check size={16} />
                  {item}
                </span>
              ))}
            </div>

            <div id="curriculum" className="curriculum-block">
              <span className="eyebrow">What you will learn</span>
              <h2>Course curriculum</h2>
              {course.curriculum?.map((item, index) => (
                <div className="curriculum-item" key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <ChevronDown size={18} />
                </div>
              ))}
            </div>

            <div id="trainer" className="trainer-card">
              <div className="trainer-avatar">
                {course.trainer ? course.trainer.split(' ').map((n) => n[0]).join('') : 'OV'}
              </div>
              <div>
                <span className="eyebrow">Your trainer</span>
                <h2>{course.trainer}</h2>
                <strong>{course.trainerRole}</strong>
                <p>Experienced practitioner and classroom mentor focused on clear explanation, practical feedback and confident application.</p>
                <div className="trainer-badges">
                  <span>
                    <BadgeCheck size={16} /> Verified trainer
                  </span>
                  <span>
                    <Award size={16} /> Industry expert
                  </span>
                </div>
              </div>
            </div>
          </div>

          <aside className="enroll-card">
            <small>Complete program fee</small>
            <strong>₹{course.fee?.toLocaleString('en-IN')}</strong>
            <span>Easy installments available</span>
            <Link href="/demo" className="button button-primary button-wide">
              Enroll now
            </Link>
            <ul>
              <li>
                <Clock size={16} /> {course.duration} classroom training
              </li>
              <li>
                <Languages size={16} /> Hindi and English
              </li>
              <li>
                <Award size={16} /> Completion certificate
              </li>
              <li>
                <Users size={16} /> Small batch mentoring
              </li>
            </ul>
            <p>
              Need help? Call <a href="tel:+918700536553">+91 87005 36553</a>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
