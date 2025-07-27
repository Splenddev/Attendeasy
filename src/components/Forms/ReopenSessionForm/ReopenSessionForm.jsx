import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaUserCheck,
  FaUserEdit,
  FaSignInAlt,
  FaSignOutAlt,
  FaRedo, // Reopen / Retry
  FaClock, // Time-related
  FaCommentDots,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaEnvelopeOpenText,
} from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

import styles from './ReopenSessionForm.module.css';
import { NormalButton } from '../../Button/ButtonsList';
import { useMatricValidator } from '../../../hooks/useMatricValidator';
import SettingItem from '../../../pages/ClassManagement/components/GroupSettings/Shared/SettingsItem';
import RadioGroup from '../../../pages/ClassManagement/components/GroupSettings/Shared/RadioGroup';

const OPTIONS = [
  { label: 'All Students', value: 'all' },
  { label: 'Students with Approved Pleas', value: 'approved_pleas' },
  { label: 'Custom Student Matric Numbers', value: 'custom' },
];

const ReopenSessionForm = ({ onSubmit, groupId, load }) => {
  const { validate, loading, result } = useMatricValidator();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [matricNumbers, setMatricNumbers] = useState(['']);
  const [durationMinutes, setDurationMinutes] = useState(15);

  const [reopenFeatures, setReopenFeatures] = useState({
    requireGeo: false,
    allowCheckOutForCheckedIn: false,
    allowEditByRep: false,
    enableFinalStatusControl: true,
    notifyScope: 'affected_admin',
  });

  const handleFeatureToggle = (key) => {
    setReopenFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isDisabled = selectedOptions.includes('all');

  const handleRuleChange = (ruleKey, option) => {
    if (ruleKey === 'notifyScope') {
      setReopenFeatures((prev) => ({
        ...prev,
        notifyScope: option,
      }));
    } else
      setReopenFeatures((prev) => ({
        ...prev,
        finalStatusRules: {
          ...prev.finalStatusRules,
          [ruleKey]: option,
        },
      }));
  };

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
      duration: formattedDuration,
      reopenFeatures,
    });
  };

  const InfoBox = ({ text, children }) => (
    <div className={styles.infoBox}>
      <FaExclamationTriangle className={styles.infoIcon} />
      {children ? <div>{children}</div> : <span>{text}</span>}
    </div>
  );

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
              await validate({ groupId, matricNumbers: cleanedMatricNumbers });
            }}
          />

          {result && (
            <motion.div
              className={styles.resultBox}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <div className={styles.resultsHeader}>
                <h4 className={styles.resultTitle}>Validation Results</h4>
                {!result?.isValid && (
                  <span className={styles.badNote}>
                    <FaTimesCircle className={styles.iconInvalid} />
                    Some matric numbers are invalid
                  </span>
                )}
              </div>

              <div
                className={`${styles.resultsContainer} ${
                  result?.valid.length && result?.invalid.length
                    ? styles.dual
                    : ''
                }`}>
                {result?.valid.length > 0 && (
                  <div className={styles.cardCompact}>
                    <div className={styles.header}>
                      <FaCheckCircle className={styles.iconValid} />
                      <h5>Valid ({result.valid.length})</h5>
                    </div>
                    <ul className={styles.matricChipList}>
                      {result.valid.map((matric) => (
                        <li
                          key={matric}
                          className={styles.validChip}>
                          {matric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result?.invalid.length > 0 && (
                  <div className={styles.cardCompact}>
                    <div className={styles.header}>
                      <FaTimesCircle className={styles.iconInvalid} />
                      <h5>Invalid ({result.invalid.length})</h5>
                    </div>
                    <ul className={styles.matricChipList}>
                      {result.invalid.map((matric) => (
                        <li
                          key={matric}
                          className={styles.invalidChip}>
                          {matric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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

      {/* Feature Toggles */}
      <div className={styles.settingsSection}>
        <h2 className={styles.sectionTitle}>Reopened Session Features</h2>

        <SettingItem
          icon={<FaMapMarkerAlt />}
          title="Require Location (Geo)"
          description="Ensure students are within allowed location to mark attendance during reopen."
          checked={reopenFeatures.requireGeo}
          onChange={() => handleFeatureToggle('requireGeo')}
        />
        <InfoBox text="Students must be within range (e.g., classroom or campus) to mark during reopened sessions." />

        <SettingItem
          icon={<FaSignOutAlt />}
          id={'finalStatusRules.partialHandling'}
          title="Allow Check-Out for Checked-In Students"
          description="Enable students to mark their check-out if they forgot earlier."
          checked={reopenFeatures.allowCheckOutForCheckedIn}
          onChange={() => handleFeatureToggle('allowCheckOutForCheckedIn')}
        />
        <InfoBox text="Students who already check in before session closed can check out, but there final status will be marked as late." />

        <SettingItem
          icon={<FaUserEdit />}
          title="Allow Manual Edits by Rep"
          description="Permit class rep (assistant reps) to manually mark or fix records."
          checked={reopenFeatures.allowEditByRep}
          onChange={() => handleFeatureToggle('allowEditByRep')}
        />
        <InfoBox text="You’ll be able to mark entries directly in the dashboard." />

        <SettingItem
          icon={<FaEnvelopeOpenText />}
          title="Notification Scope"
          description="Choose who receives notifications when marking happens."
          checked={!!reopenFeatures.notifyScope}
          onChange={() => handleFeatureToggle('notifyScope')}
        />
        {reopenFeatures.notifyScope && (
          <RadioGroup
            name="notifyScope"
            value={reopenFeatures.notifyScope}
            onChange={(val) => handleRuleChange('notifyScope', val)}
            options={[
              {
                value: 'affected_admin',
                label: 'Only affected students and admins/reps',
              },
              { value: 'everyone', label: 'Everyone' },
              { value: 'admins', label: 'Only Class Reps/Admins' },
            ]}
          />
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={load}
        className={styles.submitBtn}>
        <FaCheckCircle className={styles.iconBtn} />{' '}
        {load ? <FiLoader className="spin" /> : 'Reopen Session'}
      </motion.button>
    </motion.form>
  );
};

export default ReopenSessionForm;
