'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export function ExpandableFeatureCarousel({
  items = [],
  title = '',
  eyebrow = '',
  text = '',
  viewAllHref = '',
  viewAllLabel = 'View all'
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

  if (!items || items.length === 0) return null;

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
                {viewAllLabel} <ArrowRight size={15} />
              </Link>
            )}
            <div className="expand-carousel-arrows">
              <button
                type="button"
                onClick={handlePrev}
                className="icon-button expand-arrow-btn"
                aria-label="Previous items"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="icon-button expand-arrow-btn"
                aria-label="Next items"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRACK */}
      <div className="expand-carousel-track-container">
        <div className="expand-carousel-track" ref={trackRef}>
          {items.map((item, idx) => {
            const isExpanded = hoveredIndex === idx;

            return (
              <div
                key={item.id || item.title || idx}
                className={`expand-feature-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
              >
                {/* BACKGROUND ACCENT */}
                <div className="expand-feature-bg" />

                {/* COLLAPSED / HALF CARD VIEW */}
                <div className="expand-card-collapsed-content">
                  <div className="expand-collapsed-top">
                    {item.step && <span className="expand-feature-step">{item.step}</span>}
                    {item.flag && <span className="expand-feature-flag">{item.flag}</span>}
                    {item.tag && <span className="expand-card-badge">{item.tag}</span>}
                  </div>
                  <div className="expand-collapsed-bottom">
                    <h3 className="expand-collapsed-title">{item.title}</h3>
                    {item.shortDesc && <p className="expand-collapsed-subtitle">{item.shortDesc}</p>}
                  </div>
                </div>

                {/* EXPANDED / FULL CARD VIEW */}
                <div className="expand-card-expanded-content">
                  <div className="expand-expanded-top">
                    <div className="expand-tag-row">
                      {item.step && <span className="expand-feature-step-pill">Step {item.step}</span>}
                      {item.flag && <span className="expand-feature-flag-pill">{item.flag} {item.country || ''}</span>}
                      {item.tag && <span className="expand-category-pill">{item.tag}</span>}
                    </div>
                  </div>

                  <h3 className="expand-expanded-title">{item.title}</h3>
                  <p className="expand-expanded-desc">{item.desc || item.description}</p>

                  {/* ACTION LINK */}
                  {item.linkHref && (
                    <div className="expand-feature-footer">
                      <Link href={item.linkHref} className="button button-primary expand-action-btn">
                        {item.linkText || 'Explore Details'} <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
