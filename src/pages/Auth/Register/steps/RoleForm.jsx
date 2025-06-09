import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MdCheckCircle } from 'react-icons/md';

const RoleForm = ({ onNext }) => {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const selected = watch('role');

  const handleNext = async () => {
    const isValid = await trigger('role');
    if (isValid) onNext();
  };

  return (
    <motion.div
      className="role-form-step form-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}>
      <h2>Select Your Role</h2>

      <motion.div
        className="role-cards"
        role="radiogroup"
        aria-label="User role selection"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}>
        {['class-rep', 'student'].map((role) => (
          <motion.label
            key={role}
            className={`role-card ${selected === role ? 'selected' : ''}`}
            role="radio"
            aria-checked={selected === role}
            tabIndex={0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}>
            <img
              src={
                role === 'student'
                  ? '/student-avatar.jpg'
                  : '/class_rep-avatar.jpg'
              }
              alt={`${role} avatar`}
            />
            <div className="input-wrap">
              {selected === role && <MdCheckCircle className="check-icon" />}
              <input
                type="radio"
                value={role}
                {...register('role', { required: true })}
                className="visually-hidden"
              />
            </div>
            <p>{role === 'student' ? 'Student' : 'Class Rep'}</p>
          </motion.label>
        ))}
      </motion.div>

      {errors.role && <p className="error">Please select a role.</p>}

      {/* Only show step button here instead of BtnGroup to avoid conflict */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, transition: { delay: 0 } }}
        transition={{ delay: 1 }}
        className="button-group">
        <button
          type="button"
          onClick={handleNext}
          className="btn primary">
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RoleForm;
