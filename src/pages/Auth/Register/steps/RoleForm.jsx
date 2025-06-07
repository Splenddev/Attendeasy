import React from 'react';
import { useFormContext } from 'react-hook-form';

const RoleForm = ({ onNext }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const selected = watch('role');

  return (
    <div className="form-step">
      <h2>Select Your Role</h2>
      <div className="role-cards">
        <label className="role-card">
          <img
            src="https://i.postimg.cc/XYb4k6jb/copilot-image-1749254049413.png"
            alt="student avatar"
          />
          <div className="input-wrap">
            <input
              type="radio"
              value="student"
              {...register('role', { required: true })}
            />
          </div>
          <p>Student</p>
        </label>
        <label className="role-card">
          <img
            src="https://i.postimg.cc/pLhzz8L7/copilot-image-1749254654511.png"
            alt="class-rep avatar"
          />
          
          <div className="input-wrap">
            <input
              type="radio"
              value="classRep"
              {...register('role', { required: true })}
            />
          </div>
          <p>Class Rep</p>
        </label>
      </div>
      {errors.role && <p className="error">Please select a role.</p>}
      <button
        type="button"
        onClick={onNext}
        disabled={!selected}>
        Next
      </button>
    </div>
  );
};

export default RoleForm;
