import React from 'react';
import './ErrorSummary.css';

const ErrorSummary = ({ setShowErrors, errors, isOpen }) => {
  const formatKey = (key) => {
    return key
      .split('.')
      .map((k) => k.replace(/([A-Z])/g, ' $1'))
      .join(' > ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (!isOpen) return;

  return (
    <div className="form-errors-summary">
      <p>
        <strong>🚨 Please fix the following:</strong>
        <button
          className="close-error-button"
          onClick={() => setShowErrors(false)}
          aria-label="Close error summary">
          <MdClose size={18} />
        </button>
      </p>

      <ul>
        {Object.entries(errors).map(([key, error]) => (
          <li
            key={key}
            onClick={() => {
              const el = document.querySelector(`[name="${CSS.escape(key)}"]`);

              if (el)
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}>
            <strong>
              {formatKey(key)}
              {error.message ? ':' : ''}
            </strong>{' '}
            {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorSummary;
