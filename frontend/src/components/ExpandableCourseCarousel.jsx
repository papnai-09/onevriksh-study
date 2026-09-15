'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Star } from 'lucide-react';

export function ExpandableCourseCarousel({ courses = [], title = '', eyebrow = '', text = '', viewAllHref = '/courses' }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const trackRef = useRef(null);

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  if (!courses || courses.length === 0) return null;

  return (
    <div className="expand-carousel-wrapper">
      {(title || eyebrow || viewAllHref) && (
        <div className="expand-carousel-header">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2 className="expand-carousel-title">{title}</h2>}
            {text && <p className="expand-carousel-desc">{text}</p>}
          </div>
          <div className="expand-carousel-controls">
            {viewAllHref && (
              <Link href={viewAllHref} className="button button-ghost expand-carousel-view-all">
                View all <ArrowRight size={15} />
              </Link>
            )}
            <div className="expand-carousel-arrows">
              <button
                type="button"
                onClick={handlePrev}
                className="icon-button expand-arrow-btn"
                aria-label="Previous courses"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="icon-button expand-arrow-btn"
                aria-label="Next courses"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPANDABLE CAROUSEL TRACK */}
      <div className="expand-carousel-track-container">
        <div className="expand-carousel-track" ref={trackRef}>
          {courses.map((course, idx) => {
            const isExpanded = hoveredIndex === idx;

            return (
              <div
                key={course.slug || idx}
                className={`expand-course-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
              >
                {/* BACKGROUND IMAGE CONTAINER */}
                <div className="expand-card-bg-wrap">
                  <Image
                    src={course.image || '/courses/master-digital-marketing.jpg'}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="expand-card-bg-image"
                  />
                  <div className="expand-card-overlay" />
                </div>

                {/* COLLAPSED / HALF CARD VIEW ("ADHA CARD") */}
                <div className="expand-card-collapsed-content">
                  <span className="expand-card-badge">{course.category || 'Program'}</span>
                  <div className="expand-collapsed-bottom">
                    <h3 className="expand-collapsed-title">{course.title}</h3>
                    <div className="expand-collapsed-meta">
                      <span><Clock size={13} /> {course.duration}</span>
                      <span><Star size={13} fill="currentColor" /> {course.rating}</span>
                    </div>
                  </div>
                </div>

                {/* EXPANDED / FULL CARD VIEW ("PURA KHULE") */}
                <div className="expand-card-expanded-content">
                  <div className="expand-expanded-top">
                    <div className="expand-tag-row">
                      <span className="expand-category-pill">{course.category}</span>
                      <span className="expand-level-pill">{course.level || 'Certificate'}</span>
                    </div>
                    <div className="expand-rating-badge">
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <strong>{course.rating || 4.9}</strong>
                      <small>({course.students || 350}+ learners)</small>
                    </div>
                  </div>

                  <h3 className="expand-expanded-title">{course.title}</h3>
                  <p className="expand-expanded-desc">{course.description}</p>

                  {/* FOOTER WITH DURATION, FEE & ACTION BUTTONS */}
                  <div className="expand-expanded-footer">
                    <div className="expand-price-block">
                      <small>Course Fee</small>
                      <strong>₹{course.fee?.toLocaleString('en-IN')}</strong>
                      <span><Clock size={12} /> {course.duration}</span>
                    </div>
                    <div className="expand-action-group">
                      <Link href={`/${course.slug}`} className="button button-primary expand-action-btn">
                        View Details <ArrowUpRight size={15} />
                      </Link>
                      <Link href="/demo" className="button button-light expand-demo-btn">
                        Free Demo
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

