import React from 'react';
import { useFormContext } from 'react-hook-form';

const PersonalForm = ({ onNext, onBack }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-step">
      <h2>Enter Personal Details</h2>
      <input
        placeholder="Full Name"
        {...register('name', { required: 'Name is required' })}
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <input
        placeholder="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        placeholder="Password"
        type="password"
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <div className="button-group">
        <button
          type="button"
          onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalForm;
