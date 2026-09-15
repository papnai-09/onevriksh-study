import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';

export function CourseCard({ course }) {
  return (
    <article className="course-card">
      <Link href={'/' + course.slug} className="course-image">
        <Image src={course.image} alt={course.title} fill sizes="(max-width: 700px) 100vw, 33vw" />
        <span className="course-level">{course.level || 'Beginner'}</span>
      </Link>
      <div className="course-body">
        <span className="course-category">{course.category}</span>
        <h3>
          <Link href={'/' + course.slug}>{course.title}</Link>
        </h3>
        <p className="course-card-desc">{course.description}</p>
        <div className="course-meta">
          <span>
            <Clock size={15} /> {course.duration}
          </span>
          {course.fee && (
            <span className="course-meta-fee">
              Fee: ₹{course.fee?.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <div className="course-footer">
          <Link href={'/' + course.slug} className="button button-primary button-small">
            View Details
          </Link>
          <Link href="/demo" className="button button-light button-small">
            Free Demo
          </Link>
        </div>
      </div>
    </article>
  );
}

