'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';

export function AuthModal({ children }) {
  const router = useRouter();

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="auth-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* X Close Button */}
        <button
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
