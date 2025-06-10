import React from 'react';
import { useFormContext } from 'react-hook-form';
import BtnGroup from '../BtnGroup';
import button from '../../../../components/Button/Button';
import { useAuth } from '../../../../context/AuthContext';

const ReviewStep = ({ onBack }) => {
  const { getValues } = useFormContext();
  const { authBtnsLoading } = useAuth();

  const values = getValues();
  const preview = values.profilePicture
    ? URL.createObjectURL(values.profilePicture)
    : null;

  return (
    <div className="form-step review-step">
      <h2 className="review-title">Review Your Information</h2>
      {preview && (
        <div className="image-wrap">
          <img src={preview} />
          <span className="cap">
            {/* {values.role === 'student' ? 'student' : 'class rep'} */}
            {values.role === 'student' ? 'student' : 'class rep'}
          </span>
        </div>
      )}

      <div className="review-card">
        {!preview && (
          <div className="review-row">
            <span className="label">Role:</span>
            <span className="value">{values.role}</span>
          </div>
        )}
        <div className="review-row">
          <span className="label">Name:</span>
          <span className="value">{values.name}</span>
        </div>
        <div className="review-row">
          <span className="label">Email:</span>
          <span className="value">{values.email}</span>
        </div>
        <div className="review-row">
          <span className="label">Username:</span>
          <span className="value">{values.username}</span>
        </div>
        <div className="review-row">
          <span className="label">Matric Number:</span>
          <span className="value">{values.matricNumber}</span>
        </div>
        <div className="review-row">
          <span className="label">Faculty:</span>
          <span className="value">{values.faculty}</span>
        </div>
        <div className="review-row">
          <span className="label">Department:</span>
          <span className="value">{values.department}</span>
        </div>
      </div>
      {button.normal({
        type: 'submit',
        element: authBtnsLoading.submit ? 'Submitting...' : 'Finish',
        name: 'review-step-btn',
      })}

      <BtnGroup onBack={onBack} />
    </div>
  );
};

export default ReviewStep;
