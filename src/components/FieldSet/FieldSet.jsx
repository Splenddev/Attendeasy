import './FieldSet.css';
import {
  MdCheckCircle,
  MdError,
  MdOutlineCheckCircleOutline,
} from 'react-icons/md';
import { useFormContext } from 'react-hook-form';
import { onChoiceChange, toCamelCase } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DayTimeSelector from './DateTimeSelector/DateTimeSelector';
import * as Slider from '@radix-ui/react-slider';
import { variants } from '../../utils/contants';
import LocationModal from '../LocationModal/LocationModal';

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
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    getValues,
  } = useFormContext();

  const validationRules = required ? { required: `${title} is required` } : {};
  const name = toCamelCase(title);

  const inputValue = watch(name) ?? (input.type === 'range' ? [100] : '');

  useEffect(() => {
    if (input.type === 'range' && !watch(name)) {
      setValue(name, [100]);
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
        {title} <b style={{ color: 'var(--red)' }}>{required && '*'}</b>
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
              value={inputValue}
              onValueChange={(val) => setValue(name, val)}
              min={20}
              max={200}
              step={20}>
              <Slider.Track className="SliderTrack">
                <Slider.Range className="SliderRange" />
              </Slider.Track>
              <Slider.Thumb className="SliderThumb" />
            </Slider.Root>
            <div className="option-range-value">{inputValue[0]}m</div>
          </div>
        ) : (
          <input
            type={input.type}
            placeholder={input.placeholder}
            {...register(name, validationRules)}
            autoComplete="off"
          />
        ))}

      {/* Dropdown */}
      {type === 'select' && (
        <select
          {...register(name, validationRules)}
          disabled={disabled}
          style={{ fontSize: fontSize }}
          onClick={() => {
            console.log(name);
          }}>
          <option value="">-- Select an option --</option>
          {options.map((option, index) => {
            const value = option.value || option.text || option;
            const label = option.text || option;
            return (
              <option
                key={value + index}
                value={value}>
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
                      getValues
                    )
                  }
                  className="visually-hidden"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Day/Time Selector */}
      {type === 'dayTimeChoice' && (
        <DayTimeSelector
          name={name}
          register={register}
          watch={watch}
          setValue={setValue}
        />
      )}

      {type === 'location' && <LocationModal fieldName={name} />}
    </motion.div>
  );
};

export default FieldSet;
