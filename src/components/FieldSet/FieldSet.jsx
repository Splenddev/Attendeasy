import './FieldSet.css';
import {
  MdCheckCircle,
  MdError,
  MdOutlineCheckCircleOutline,
} from 'react-icons/md';
import { useFormContext } from 'react-hook-form';
import {
  catenateCredentialsSecure,
  onChoiceChange,
  toCamelCase,
} from '../../utils/helpers';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { variants } from '../../utils/contants';
import LocationModal from '../LocationModal/LocationModal';
import DateTimeSelector from './DateTimeSelector/DateTimeSelector';

const FieldSet = ({
  options = [],
  title = '',
  type,
  input = { type: '', placeholder: '' },
  choices = [],
  choiceMode = 'multiple',
  required = false,
  disabled = false,
  fontSize = '14px',
  fieldName,
  readOnly = false,
  catenate = false,
  mapToValue = null,
  enabled = false,
  methods = {},
  dependsOn = null,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    getValues,
  } = methods;

  const dependsValue = dependsOn ? watch(dependsOn) : null;

  const validationRules =
    type === 'toggle' && required
      ? {
          validate: (val) =>
            typeof val === 'boolean' ? true : `${title} is required`,
        }
      : required
      ? { required: `${title} is required` }
      : {};

  const name = fieldName || toCamelCase(title);

  const defaultRadius = 100;

  const inputValue =
    input.type === 'range' ? watch(name) ?? defaultRadius : watch(name) ?? '';

  const catenateValues = getValues(name);

  const classLocation = watch('classLocation');

  useEffect(() => {
    if (input.type === 'range' && watch(name) == null) {
      setValue(name, defaultRadius);
    }
  }, []);

  const checkedChoices = watch(`${name}_choices`) || {};

  const hasError = !!errors[name];

  // Local state to force re-trigger shake animation on repeated submits
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (hasError && isSubmitting) {
      // Change key to remount/make motion.div replay animation
      setShakeKey((k) => k + 1);
    }
  }, [hasError, isSubmitting]);

  return (
    <motion.div
      key={`${name}-shake-${shakeKey}`}
      className="option-select"
      variants={variants.shake}
      animate={hasError ? 'shake' : 'still'}>
      {hasError && (
        <motion.p
          variants={variants.blink}
          animate={hasError ? 'blink' : 'still'}
          className="error">
          <MdError />
        </motion.p>
      )}
      <p className="title cap">
        {title} <b className="highlight">{required && '*'}</b>
      </p>
      <hr />

      {/* Input Field */}
      {type === 'input' &&
        (input.type === 'range' ? (
          <div className="option-range">
            <div className="option-range-minmax">
              <p>20m</p>
              <p>200m</p>
            </div>
            <Slider.Root
              className="SliderRoot"
              value={[Number(inputValue)]}
              onValueChange={(val) => {
                const newVal = val[0];
                setValue(name, newVal, { shouldValidate: true });
              }}
              min={20}
              max={200}
              step={20}>
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb" />
            </Slider.Root>
            <div className="option-range-value">{inputValue}m</div>
          </div>
        ) : readOnly ? (
          <input
            type="text"
            value={
              !catenate || catenate === false
                ? catenateValues
                : catenateCredentialsSecure([catenateValues], {
                    maxLength: 10,
                    obfuscate: true,
                  })
            }
            readOnly
            {...register(name, validationRules)}
            className="readonly-input"
          />
        ) : (
          <input
            type={input.type}
            placeholder={input.placeholder}
            {...register(name, {
              ...validationRules,
              valueAsNumber: input.type === 'number',
            })}
            step={input.step}
            disabled={disabled}
          />
        ))}

      {/* Dropdown */}
      {type === 'select' && (
        <select
          {...register(name, {
            ...validationRules,
            setValueAs: (val) => {
              if (val === 'true') return true;
              if (val === 'false') return false;
              return val;
            },
          })}
          disabled={
            disabled || (dependsOn && dependsValue?.toString() === 'false')
          }
          style={{ fontSize }}>
          <option value="">-- Select an option --</option>
          {options.map((option, index) => {
            const isObject = typeof option === 'object' && option !== null;
            const value = isObject && 'value' in option ? option.value : option;
            const label =
              isObject && 'text' in option ? option.text : String(option);

            return (
              <option
                key={String(value) + index}
                value={String(value)}>
                {label}
              </option>
            );
          })}
        </select>
      )}

      {/* Textarea */}
      {type === 'textarea' && (
        <div className="textarea">
          <textarea
            {...register(name, validationRules)}
            placeholder={input.placeholder}></textarea>
        </div>
      )}

      {/* Choice Selection */}
      {type === 'choice' && (
        <div className="choices">
          {choices.map((choice) => {
            const isChecked = checkedChoices[choice];
            return (
              <div
                className="choice"
                key={`choice-${choice}`}>
                <label htmlFor={`checkbox-${choice}`}>
                  {isChecked ? (
                    <MdCheckCircle />
                  ) : (
                    <MdOutlineCheckCircleOutline />
                  )}
                  {choice}
                </label>
                <input
                  type="checkbox"
                  id={`checkbox-${choice}`}
                  checked={!!isChecked}
                  onChange={() =>
                    onChoiceChange(
                      choice,
                      checkedChoices,
                      choiceMode,
                      name,
                      setValue,
                      getValues,
                      mapToValue
                    )
                  }
                  className="visually-hidden"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Toggle Switch */}
      {type === 'toggle' && (
        <div className="toggle-wrapper">
          <label className="toggle-label">
            <input
              type="checkbox"
              {...register(name, validationRules)}
              disabled={disabled}
              className="toggle-input"
            />
            <span className="toggle-slider" />
            <span className="toggle-text">
              {watch(name)
                ? input?.toggleTrueText || 'On'
                : input?.toggleFalseText || 'Off'}
            </span>
          </label>
        </div>
      )}

      {/* Day/Time Selector */}
      {type === 'dayTimeChoice' && (
        <>
          <DateTimeSelector name={name} />
          {/* Hidden input for RHF to track field and allow validation */}
          <input
            type="text"
            className="visually-hidden"
            {...register(name, {
              required: required ? `${title} is required` : false,
              validate: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                  return 'Select at least one day';
                }
                for (const { timing } of value) {
                  if (!timing.startTime || !timing.endTime) {
                    return 'Both start and end times are required';
                  }
                  if (timing.startTime >= timing.endTime) {
                    return 'Start time must be before end time';
                  }
                }
                return true;
              },
            })}
          />
        </>
      )}

      {type === 'location' && (
        <div style={{ position: 'relative' }}>
          {classLocation && (
            <p style={{ fontSize: '14px', padding: '10px' }}>
              {classLocation.label}
            </p>
          )}
          <LocationModal fieldName={name} />
          <input
            type="text"
            className="visually-hidden"
            {...register(name, {
              required: required ? `${title} is required` : false,
            })}
          />
        </div>
      )}
    </motion.div>
  );
};

export default FieldSet;
