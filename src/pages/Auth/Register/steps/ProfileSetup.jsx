import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import '../styles/ProfileSetup.css';
import FieldSet from '../../../../components/FieldSet/FieldSet';

const faculties = ['Sciences', 'Arts', 'Engineering', 'Social Sciences'];
const departments = {
  Sciences: ['Biology', 'Chemistry', 'Physics'],
  Arts: ['History', 'Philosophy', 'Languages'],
  Engineering: ['Mechanical', 'Electrical', 'Civil'],
  'Social Sciences': ['Economics', 'Sociology', 'Psychology'],
};

const levels = ['100L', '200L', '300L', '400L', '500L'];

const ProfileSetup = ({ onNext, onBack }) => {
  const { watch, setValue, trigger } = useFormContext();
  const selectedFaculty = watch('faculty');
  const profilePic = watch('profilePicture');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('profilePicture', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = await trigger([
      'faculty',
      'department',
      'level',
      'profilePicture',
    ]);
    if (!valid) return;
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
        Upload a Photo
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
        fontSize="1rem"
      />
      <FieldSet
        options={departments[selectedFaculty]}
        title={'department'}
        type={'select'}
        disabled={!selectedFaculty}
        fontSize="1rem"
      />
      <FieldSet
        options={levels}
        title={'level'}
        type={'select'}
        fontSize="1rem"
      />

      <div className="button-group">
        <button
          type="button"
          onClick={onBack}
          className="btn secondary">
          Back
        </button>
        <button
          type="submit"
          className="btn primary"
          onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
