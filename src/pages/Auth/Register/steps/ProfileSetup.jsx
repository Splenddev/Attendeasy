import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import '../styles/ProfileSetup.css';
import FieldSet from '../../../../components/FieldSet/FieldSet';
import { MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import BtnGroup from '../BtnGroup';
import { variants } from '../../../../utils/contants';
import { AnimatePresence, motion } from 'framer-motion';
import CourseAdder from '../CourseAdder/CourseAdder';

const faculties = ['Sciences', 'Arts', 'Engineering', 'Social Sciences'];
const departments = {
  Sciences: ['Biology', 'Chemistry', 'Physics'],
  Arts: ['History', 'Philosophy', 'Languages'],
  Engineering: ['Mechanical', 'Electrical', 'Civil'],
  'Social Sciences': ['Economics', 'Sociology', 'Psychology'],
};
const levels = ['100L', '200L', '300L', '400L', '500L'];

const ProfileSetup = ({ onNext, onBack }) => {
  const {
    watch,
    setValue,
    trigger,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  const selectedFaculty = watch('faculty');
  const values = getValues();

  const [preview, setPreview] = useState(() =>
    values.profilePicture ? URL.createObjectURL(values.profilePicture) : null
  );
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image must be 1MB or less.');
        setTimeout(() => setError(null), 3000);
        return;
      }
      if (preview) URL.revokeObjectURL(preview);
      setValue('profilePicture', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = await trigger(['faculty', 'department', 'level', 'terms']);
    if (!valid) {
      setError('Please complete all required fields and agree to the terms.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    if (onNext) onNext();
  };

  const handleSkip = () => {
    setValue('profilePicture', null);
    onNext();
  };

  return (
    <div className="profile-step profile-step-container">
      <h2>Tell Us More About You</h2>
      <hr />

      <h3>Add a profile picture</h3>
      <p className="hint">Upload a picture of up to 1MB</p>

      <div className="profile-preview">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
          />
        ) : (
          <div className="placeholder-circle">No Image</div>
        )}
      </div>

      <label className="button">
        {preview ? 'Replace Photo' : 'Upload a Photo'}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="visually-hidden"
        />
      </label>

      <button
        type="button"
        className="skip-link"
        onClick={handleSkip}>
        Skip for now
      </button>

      <hr />
      <h3>Academic Details</h3>

      <FieldSet
        options={faculties}
        title={'faculty'}
        type={'select'}
        required={true}
      />

      <FieldSet
        options={departments[selectedFaculty]}
        title={'department'}
        type={'select'}
        disabled={!selectedFaculty}
        required={true}
      />

      <FieldSet
        options={levels}
        title={'level'}
        type={'select'}
        required={true}
      />

      {error && (
        <p
          className="error-text"
          style={{ marginTop: '15px' }}>
          {error}
        </p>
      )}
      <AnimatePresence>
        {errors.terms && (
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="error-text"
            style={{ marginTop: '15px' }}>
            You must agree to the terms.
          </motion.p>
        )}
      </AnimatePresence>
      <CourseAdder
        onCoursesChange={(updatedCourses) => console.log(updatedCourses)}
      />

      <hr />

      <div className="term-cond">
        <label>
          {watch('terms') ? <MdCheckCircle /> : <MdCheckCircleOutline />}
          <input
            type="checkbox"
            {...register('terms', { required: true })}
            className="visually-hidden"
          />
        </label>
        <p>
          By continuing, you confirm that you've read and agree to Vigilo's{' '}
          <span>Terms of Use</span> and <span>Privacy Policy</span>.
        </p>
      </div>

      <BtnGroup
        onNext={handleSubmit}
        onBack={onBack}
        step={3}
        nextText="Submit"
        type="submit"
      />
    </div>
  );
};

export default ProfileSetup;
