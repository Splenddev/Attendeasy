import './Select.css';
import { MdCheckCircle, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { useFormContext } from 'react-hook-form';
import { onChoiceChange } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

const Select = ({
  options = [],
  title,
  type,
  input = { type: '', placeholder: '' },
  choices = [],
  choiceMode = 'multiple',
  required = true | false,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const inputValue = watch(title) || '';
  const checkedChoices = watch(`${title}_choices`) || {};

  const validationRules = required ? { required: `${title} is required` } : {};

  return (
    <>
      <div className="option-select">
        <p className="title">{title}</p>
        <hr />

        {/* Input Field */}
        {type === 'input' &&
          (input.type === 'range' ? (
            <div className="option-range">
              <div className="option-range-minmax">
                <p>20m</p>
                <p>200m</p>
              </div>
              <input
                type="range"
                min={20}
                max={200}
                step={20}
                {...register(title)}
              />
              <div className="option-range-value">{inputValue}m</div>
            </div>
          ) : (
            <input
              type={input.type}
              placeholder={input.placeholder}
              {...register(title, validationRules)}
            />
          ))}

        {/* Dropdown */}
        {type === 'select' && (
          <select {...register(title, validationRules)}>
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
                        title,
                        setValue
                      )
                    }
                    hidden
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <AnimatePresence>
        {errors[title] && (
          <motion.p
            className="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}>
            {errors[title].message}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};

export default Select;
