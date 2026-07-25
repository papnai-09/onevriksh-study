'use client';

import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export function FormCard({ title, subtitle, fields, submitLabel = 'Submit request', variant = 'default' }) {
  const [state, setState] = useState('idle');
  const submit = (event) => {
    event.preventDefault();
    setState('loading');
    setTimeout(() => setState('success'), 700);
  };

  if (state === 'success') {
    return (
      <div className={'form-card form-success ' + variant}>
        <CheckCircle2 size={46} />
        <h2>Request received</h2>
        <p>Our admissions team will contact you shortly with batch and course details.</p>
        <button className="button button-ghost" onClick={() => setState('idle')}>Send another request</button>
      </div>
    );
  }

  return (
    <form className={'form-card ' + variant} onSubmit={submit}>
      <div className="form-title"><h2>{title}</h2><p>{subtitle}</p></div>
      <div className="form-grid">
        {fields.map((field) => (
          <label key={field.name} className={field.full ? 'full' : ''}>
            <span>{field.label}</span>
            {field.type === 'select' ? (
              <select name={field.name} required={field.required !== false} defaultValue="">
                <option value="" disabled>Select an option</option>
                {field.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea name={field.name} rows="4" placeholder={field.placeholder} required={field.required !== false} />
            ) : (
              <input name={field.name} type={field.type || 'text'} placeholder={field.placeholder} required={field.required !== false} />
            )}
          </label>
        ))}
      </div>
      <button className="button button-primary button-wide" disabled={state === 'loading'}>
        {state === 'loading' && <LoaderCircle className="spin" size={18} />}
        {submitLabel}
      </button>
    </form>
  );
}
