import React from 'react';
import { useFormContext } from 'react-hook-form';

const ReviewStep = ({ onBack }) => {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="form-step">
      <h2>Review Your Info</h2>
      <ul>
        <li>
          <strong>Role:</strong> {values.role}
        </li>
        <li>
          <strong>Name:</strong> {values.name}
        </li>
        <li>
          <strong>Email:</strong> {values.email}
        </li>
      </ul>

      <div className="button-group">
        <button
          type="button"
          onClick={onBack}>
          Back
        </button>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

export default ReviewStep;
