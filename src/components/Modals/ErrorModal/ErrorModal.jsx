import React from 'react';
import './ErrorModal.css';
import { MdErrorOutline } from 'react-icons/md';

const ErrorModal = ({ isOpen, onClose, error }) => {
  if (!isOpen || !error) return null;

  const { message, code, errors, ...rest } = error;

  return (
    <div className="em-backdrop">
      <div className="em-card">
        <div className="em-header">
          <MdErrorOutline
            size={28}
            className="em-icon"
          />
          <h2>Error</h2>
        </div>

        <div className="em-body">
          {message && <p className="em-message">{message}</p>}

          {code && (
            <div className="em-field">
              <span className="em-label">Code:</span>
              <span className="em-value code">{code}</span>
            </div>
          )}

          {errors?.length > 0 && (
            <div className="em-errors">
              <h4>Issues:</h4>
              <ul>
                {errors.map((e, i) => (
                  <li key={i}>
                    {typeof e === 'string' ? e : JSON.stringify(e)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(rest).length > 0 && (
            <div className="em-details">
              <h4>Additional Info:</h4>
              <pre>{JSON.stringify(rest, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="em-footer">
          <button
            onClick={onClose}
            className="em-close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
