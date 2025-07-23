import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from './ReopenSessionForm.module.css';
import { NormalButton } from '../../Button/ButtonsList';
import { useMatricValidator } from '../../../hooks/useMatricValidator';

const OPTIONS = [
  { label: 'All Students', value: 'all' },
  { label: 'Students with Approved Pleas', value: 'approved_pleas' },
  { label: 'Forgot to Check Out', value: 'forgot_checkout' },
  { label: 'Not Checked In or Out', value: 'not_marked' },
  { label: 'Late Check-In Only', value: 'late_checkin' },
  { label: 'Marked but Outside Range', value: 'outside_range' },
  { label: 'Custom Student Matric Numbers', value: 'custom' },
];

const ReopenSessionForm = ({ onSubmit, groupId, load }) => {
  const { validate, loading, result } = useMatricValidator();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [matricNumbers, setMatricNumbers] = useState(['']);
  const [durationMinutes, setDurationMinutes] = useState(15);

  const isDisabled = selectedOptions.includes('all');

  const handleChange = (value) => {
    if (value === 'all') {
      setSelectedOptions((prev) => (prev.includes('all') ? [] : ['all']));
    } else {
      setSelectedOptions((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev.filter((v) => v !== 'all'), value]
      );
    }
  };

  const handleMatricChange = (index, value) => {
    const updated = [...matricNumbers];
    updated[index] = value;
    setMatricNumbers(updated);
  };

  const addMatricField = () => {
    setMatricNumbers([...matricNumbers, '']);
  };

  const removeMatricField = (index) => {
    const updated = matricNumbers.filter((_, i) => i !== index);
    setMatricNumbers(updated);
  };

  const cleanedMatricNumbers = matricNumbers
    .map((num) => num.trim())
    .filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const formattedDuration = `${hours}H${minutes
      .toString()
      .padStart(2, '0')}M`;

    onSubmit({
      allowedOptions: selectedOptions,
      customMatricNumbers: cleanedMatricNumbers,
      duration: formattedDuration, // changed from durationMinutes
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.form}
      onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        <FaUsers className={styles.icon} /> Reopen Attendance For
      </h2>

      <div className={styles.options}>
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={styles.option}>
            <input
              type="checkbox"
              value={opt.value}
              checked={selectedOptions.includes(opt.value)}
              disabled={isDisabled && opt.value !== 'all'}
              onChange={() => handleChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {selectedOptions.includes('custom') && (
        <motion.div
          className={styles.matricSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          <label className={styles.sectionLabel}>
            Enter Matric Numbers
            <button
              type="button"
              onClick={addMatricField}
              className={styles.addBtn}>
              + Add
            </button>
          </label>

          {matricNumbers.map((num, idx) => (
            <div
              key={idx}
              className={styles.matricRow}>
              <input
                type="text"
                placeholder={`Matric Number ${idx + 1}`}
                value={num}
                onChange={(e) => handleMatricChange(idx, e.target.value)}
                required
              />
              {matricNumbers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMatricField(idx)}
                  className={styles.removeBtn}>
                  ×
                </button>
              )}
            </div>
          ))}
          <NormalButton
            element={'validate inputs'}
            disabled={loading}
            func={async () => {
              await validate({
                groupId,
                matricNumbers: cleanedMatricNumbers,
              });
            }}
          />
          {result && (
            <motion.div
              className={styles.resultBox}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <h3 className={styles.title}>Validation Results</h3>

              <div className={styles.resultsContainer}>
                {result?.valid.length > 0 && (
                  <div className={styles.card}>
                    <div className={styles.header}>
                      <FaCheckCircle className={styles.iconValid} />
                      <h4>Valid ({result.valid.length})</h4>
                    </div>
                    <ul className={styles.matricList}>
                      {result.valid.map((matric) => (
                        <li key={matric}>{matric}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result?.invalid.length > 0 && (
                  <div className={styles.card}>
                    <div className={styles.header}>
                      <FaTimesCircle className={styles.iconInvalid} />
                      <h4>Invalid ({result.invalid.length})</h4>
                    </div>
                    <ul className={styles.matricList}>
                      {result.invalid.map((matric) => (
                        <li key={matric}>{matric}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {!result?.isValid && (
                <div className={styles.note}>
                  <FaTimesCircle className={styles.iconInvalid} />
                  Some matric numbers are invalid. Please fix and resubmit.
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      <div className={styles.durationField}>
        <label htmlFor="duration">Reopen Duration (minutes):</label>
        <input
          id="duration"
          type="number"
          min={5}
          max={120}
          step={5}
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          required
        />
        <span className={styles.hint}>Max: 120 mins</span>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={load}
        className={styles.submitBtn}>
        <FaCheckCircle className={styles.iconBtn} /> Reopen Session
      </motion.button>
    </motion.form>
  );
};

export default ReopenSessionForm;
