'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items = [], defaultOpenIndex = null, allowMultiple = false }) {
  const [openIndices, setOpenIndices] = useState(() => {
    if (defaultOpenIndex !== null) return [defaultOpenIndex];
    return [];
  });

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div className="accordion-item" key={item.id || item.title || index}>
            <button
              type="button"
              className="accordion-header"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-body-${index}`}
              id={`accordion-header-${index}`}
            >
              <span>{item.title}</span>
              <ChevronDown size={18} />
            </button>
            {isOpen && (
              <div
                id={`accordion-body-${index}`}
                role="region"
                aria-labelledby={`accordion-header-${index}`}
                className="accordion-body"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
