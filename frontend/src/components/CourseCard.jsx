import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock, Star, Users } from 'lucide-react';

export function CourseCard({ course }) {
  return (
    <article className="course-card">
      <Link href={'/courses/' + course.slug} className="course-image">
        <Image src={course.image} alt={course.title} fill sizes="(max-width: 700px) 100vw, 33vw" />
        <span className="course-level">{course.level}</span>
      </Link>
      <div className="course-body">
        <span className="course-category">{course.category}</span>
        <h3><Link href={'/courses/' + course.slug}>{course.title}</Link></h3>
        <div className="course-meta">
          <span><Clock size={15} /> {course.duration}</span>
          <span><Users size={15} /> {course.students}</span>
          <span><Star size={15} fill="currentColor" /> {course.rating}</span>
        </div>
        <div className="course-footer">
          <div><small>Course fee</small><strong>₹{course.fee.toLocaleString('en-IN')}</strong></div>
          <Link href={'/courses/' + course.slug} className="icon-button arrow-button" aria-label={'View ' + course.title}>
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}
