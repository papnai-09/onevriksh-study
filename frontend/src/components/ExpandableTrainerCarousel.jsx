'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Award, BadgeCheck, CheckCircle2, Sparkles } from 'lucide-react';

export function ExpandableTrainerCarousel({
  trainers = [],
  title = 'Our Expert Trainers & Mentors',
  eyebrow = 'Faculty Excellence',
  text = 'Learn directly from certified industry veterans who bring real-world case studies and personal mentoring into every session.'
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

  if (!trainers || trainers.length === 0) return null;

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
              aria-label="Previous trainers"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="icon-button expand-arrow-btn"
              aria-label="Next trainers"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* TRACK */}
      <div className="expand-carousel-track-container">
        <div className="expand-carousel-track" ref={trackRef}>
          {trainers.map((item, idx) => {
            const isExpanded = hoveredIndex === idx;
            const displayInitials = item.initials || item.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

            return (
              <div
                key={item.name + idx}
                className={`expand-trainer-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
              >
                {/* COLLAPSED / HALF CARD VIEW */}
                <div className="expand-card-collapsed-content">
                  <div className="expand-trainer-collapsed-avatar">
                    {displayInitials}
                  </div>
                  <div className="expand-collapsed-bottom">
                    <h3 className="expand-collapsed-title">{item.name}</h3>
                    <span className="expand-trainer-role-pill">{item.role}</span>
                    <span className="expand-hint-pill">Hover to expand &rarr;</span>
                  </div>
                </div>

                {/* EXPANDED / FULL CARD VIEW */}
                <div className="expand-card-expanded-content">
                  <div className="expand-trainer-expanded-header">
                    <div className="expand-trainer-avatar-lg">
                      {displayInitials}
                    </div>
                    <div>
                      <h3 className="expand-trainer-name">{item.name}</h3>
                      <strong className="expand-trainer-role">{item.role}</strong>
                      {item.experience && (
                        <span className="expand-trainer-exp-badge">
                          <Award size={13} /> {item.experience}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="expand-trainer-bio">
                    {item.bio || 'Dedicated classroom mentor committed to hands-on project reviews, interview simulations, and individual student progress.'}
                  </p>

                  {item.expertise && item.expertise.length > 0 && (
                    <div className="expand-trainer-skills-box">
                      <span className="expand-skills-label">
                        <Sparkles size={13} /> Core Expertise:
                      </span>
                      <div className="expand-skills-pills">
                        {item.expertise.map((skill) => (
                          <span key={skill} className="expand-skill-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="expand-trainer-footer">
                    <div className="expand-trainer-badge">
                      <BadgeCheck size={15} /> Verified Industry Expert
                    </div>
                    <Link href="/demo" className="button button-primary expand-action-btn">
                      Book Demo Class
                    </Link>
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
