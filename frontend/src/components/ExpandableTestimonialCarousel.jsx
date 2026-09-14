'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star, CheckCircle, Award } from 'lucide-react';

export function ExpandableTestimonialCarousel({
  testimonials = [],
  title = 'What Our Students Say',
  eyebrow = 'Real Student Stories',
  text = 'Hear from graduates who transformed their careers and achieved language proficiency at ONEVRIKSH.'
}) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const trackRef = useRef(null);

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="expand-carousel-wrapper">
      <div className="expand-carousel-header">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2 className="expand-carousel-title">{title}</h2>}
          {text && <p className="expand-carousel-desc">{text}</p>}
        </div>
        <div className="expand-carousel-controls">
          <div className="expand-carousel-arrows">
            <button
              type="button"
              onClick={handlePrev}
              className="icon-button expand-arrow-btn"
              aria-label="Previous testimonials"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="icon-button expand-arrow-btn"
              aria-label="Next testimonials"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* TRACK */}
      <div className="expand-carousel-track-container">
        <div className="expand-carousel-track" ref={trackRef}>
          {testimonials.map((item, idx) => {
            const isExpanded = hoveredIndex === idx;
            const displayInitials = item.initials || item.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

            return (
              <div
                key={item.name + idx}
                className={`expand-testimonial-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
              >
                {/* COLLAPSED / HALF CARD VIEW */}
                <div className="expand-card-collapsed-content">
                  <div className="expand-testimonial-collapsed-avatar">
                    {displayInitials}
                  </div>
                  <div className="expand-collapsed-bottom">
                    <h3 className="expand-collapsed-title">{item.name}</h3>
                    <span className="expand-testimonial-course-pill">{item.course}</span>
                    <div className="expand-collapsed-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <span className="expand-hint-pill">Hover to expand &rarr;</span>
                  </div>
                </div>

                {/* EXPANDED / FULL CARD VIEW */}
                <div className="expand-card-expanded-content">
                  <div className="expand-testimonial-expanded-header">
                    <div className="expand-testimonial-expanded-user">
                      <div className="expand-testimonial-avatar-lg">
                        {displayInitials}
                      </div>
                      <div>
                        <strong className="expand-testimonial-name">{item.name}</strong>
                        <span className="expand-testimonial-course-sub">{item.course}</span>
                      </div>
                    </div>
                    <Quote size={28} className="expand-testimonial-quote-icon" />
                  </div>

                  <div className="expand-rating-row">
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <span className="expand-verified-badge">
                      <CheckCircle size={13} /> Verified Graduate
                    </span>
                  </div>

                  <p className="expand-testimonial-quote">“{item.quote}”</p>

                  <div className="expand-testimonial-footer">
                    <div className="expand-testimonial-meta-badge">
                      <Award size={14} /> Classroom Studio Batch
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
