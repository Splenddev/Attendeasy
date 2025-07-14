import React, { useEffect, useState } from 'react';
import './ErrorModal.css';
import { MdErrorOutline } from 'react-icons/md';
import { registerErrorModal } from '../../../hooks/useErrorModal';
import errorSound from '../../../assets/sounds/error.mp3'; // ⬅️ Add your file here
import useDisableScroll from '../../../hooks/useDisableScroll';

const ErrorModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    error: {
      title: 'Unexpected Error',
      message: '',
      code: '',
      errors: [],
    },
  });
  useDisableScroll(modal.isOpen);

  useEffect(() => {
    registerErrorModal(setModal);
  }, []);

  useEffect(() => {
    if (modal.isOpen) {
      // 🔊 Play error sound
      const sound = new Audio(errorSound);
      sound.play().catch((e) => {
        if (import.meta.env.DEV) console.warn('Failed to play error sound:', e);
      });
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  }, [modal.isOpen]);

  if (!modal.isOpen) return null;

  const error = modal.error || {};
  const {
    title = 'Application Error',
    message,
    code,
    status,
    errors = [],
    timestamp,
    ...rest
  } = error;

  const initiator = modal.initiator || 'Unknown Source';

  return (
    <div className="em-backdrop">
      <div className="em-card">
        <div className="em-header">
          <MdErrorOutline
            size={28}
            className="em-icon"
          />
          <h2>{title}</h2>
        </div>

        <div className="em-body">
          {message && <p className="em-message">{message}</p>}

          {code && (
            <div className="em-field">
              <span className="em-label">Code:</span>
              <span className="em-value code">{code}</span>
            </div>
          )}

          {status && (
            <div className="em-field">
              <span className="em-label">Status:</span>
              <span className="em-value">{status}</span>
            </div>
          )}

          {initiator && (
            <div className="em-field">
              <span className="em-label">Initiator:</span>
              <span className="em-value initiator">{initiator}</span>
            </div>
          )}

          {timestamp && (
            <div className="em-field">
              <span className="em-label">Time:</span>
              <span className="em-value">
                {new Date(timestamp).toLocaleString()}
              </span>
            </div>
          )}

          {errors.length > 0 && (
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
            onClick={() => setModal((m) => ({ ...m, isOpen: false }))}
            className="em-close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
