import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { variants } from '../../../../utils/contants';

const PersonalForm = () => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  return (
    <AnimatePresence>
      <motion.div
        className="form-step"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}>
        <h2 className="form-title">Enter Personal Details</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="Full Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <motion.p
              variants={variants.shake}
              animate={errors.name ? 'shake' : 'still'}
              className="error-text">
              {errors.name.message}
            </motion.p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            className={`form-input ${
              errors.email
                ? 'input-error'
                : dirtyFields.email
                ? 'input-valid'
                : ''
<<<<<<< HEAD
            }`} placeholder='Email address'
=======
            }`}
            placeholder="Email address"
>>>>>>> 02e6744 (latest wednessdayd)
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && (
            <motion.p
              variants={variants.shake}
              animate={errors.email ? 'shake' : 'still'}
              className="error-text">
              {errors.email.message}
            </motion.p>
          )}
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            className={`form-input ${
              errors.username
                ? 'input-error'
                : dirtyFields.username
                ? 'input-valid'
                : ''
            }`}
            placeholder="username"
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^[a-zA-Z0-9_.-]{3,20}$/,
                message:
                  'Username must be 3–20 characters (letters, numbers, ., _, -)',
              },
            })}
          />
          {errors.username && (
            <motion.p
              variants={variants.shake}
              animate={errors.username ? 'shake' : 'still'}
              className="error-text">
              {errors.username.message}
            </motion.p>
          )}
        </div>
        <div className="form-group">
          <label>Matric Number</label>
          <input
            className={`form-input ${errors.matricNumber && 'input-error'}`}
            {...register('matricNumber', {
              required: 'Matric Number is required',
            })}
            placeholder="Enter matric number"
          />
          {errors.matricNumber && (
            <motion.p
              variants={variants.shake}
              animate={errors.matricNumber ? 'shake' : 'still'}
              className="error-text">
              {errors.matricNumber.message}
            </motion.p>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <motion.p
              variants={variants.shake}
              animate={errors.password ? 'shake' : 'still'}
              className="error-text">
              {errors.password.message}
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PersonalForm;
