import React from 'react';
import { useFormContext } from 'react-hook-form';

const ReviewStep = ({ onBack }) => {
  const { getValues } = useFormContext();
  const values = getValues();
  const preview = values.profilePicture
    ? URL.createObjectURL(values.profilePicture)
    : null;

  return (
    <div className="form-step review-step">
      <h2 className="review-title">Review Your Information</h2>
      {preview && <img src={preview} />}

      <div className="review-card">
        <div className="review-row">
          <span className="label">Role:</span>
          <span className="value">{values.role}</span>
        </div>
        <div className="review-row">
          <span className="label">Name:</span>
          <span className="value">{values.name}</span>
        </div>
        <div className="review-row">
          <span className="label">Email:</span>
          <span className="value">{values.email}</span>
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

      <div className="button-group">
        <button
          type="button"
          className="btn secondary"
          onClick={onBack}>
          Back
        </button>
        <button
          type="submit"
          className="btn primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
