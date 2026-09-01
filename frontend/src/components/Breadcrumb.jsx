'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <Link href="/" aria-label="Home" style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Home size={15} />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label || index} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ChevronRight size={14} />
            {isLast || !item.href ? (
              <span className="current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
