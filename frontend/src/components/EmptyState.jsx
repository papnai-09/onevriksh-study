'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';

export function EmptyState({
  icon: Icon = Search,
  title = 'No records found',
  description = 'There is no data matching your criteria at this moment.',
  actionLabel = null,
  actionHref = null,
  onAction = null
}) {
  return (
    <div className="empty-state-box">
      <Icon />
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="button button-primary button-small">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button type="button" onClick={onAction} className="button button-primary button-small">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
