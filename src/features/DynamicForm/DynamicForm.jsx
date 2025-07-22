import { MdClose, MdInfoOutline } from 'react-icons/md';
import FieldSet from '../../components/FieldSet/FieldSet';
import './DynamicForm.css';
import button from '../../components/Button/Button';
import { useInfoModal } from '../../context/infoModalContext';
import { useEffect, useState } from 'react';

const DynamicForm = ({ title = '', selectOptions = [], id = '', methods }) => {
  const {
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const formatKey = (key) => {
    return key
      .split('.')
      .map((k) => k.replace(/([A-Z])/g, ' $1'))
      .join(' > ')
      .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize
  };

  const enableCheckInOut = watch('settings.enableCheckInOut');

  console.log(enableCheckInOut);

  const { openModal } = useInfoModal();

  const [showErrors, setShowErrors] = useState(true);

  const hasError = Object.keys(errors).length > 0;

  useEffect(() => {
    if (hasError && isSubmitting && errors) {
      setShowErrors(true);
    }
  }, [isSubmitting]);

  return (
    <>
      {hasError && showErrors && (
        <div className="form-errors-summary">
          <p>
            <strong>🚨 Please fix the following:</strong>
            <button
              className="close-error-button"
              onClick={() => setShowErrors(false)}
              aria-label="Close error summary">
              <MdClose size={18} />
            </button>
          </p>

          <ul>
            {Object.entries(errors).map(([key, error]) => (
              <li
                key={key}
                onClick={() => {
                  const el = document.querySelector(
                    `[name="${CSS.escape(key)}"]`
                  );

                  if (el)
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}>
                <strong>
                  {formatKey(key)}
                  {error.message ? ':' : ''}
                </strong>{' '}
                {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <section className="dynamic-form">
        <div
          className="title cap"
          onClick={() => console.log(errors)}>
          {title}
          {button.icon({
            icon: MdInfoOutline,
            func: () => {
              openModal(id);
            },
          })}
        </div>
        <div className="contents">
          {selectOptions
            .filter((item) => {
              if (!item.dependsOn) return true;
              const dependsValue = watch(item.dependsOn);
              return dependsValue.toString() !== 'false'; // hides field if false
            })
            .map((item) => {
              const dependsValue = item.dependsOn
                ? watch(item.dependsOn)
                : true;
              return (
                <FieldSet
                  key={item.title}
                  title={item.title}
                  options={item.options}
                  type={item.type}
                  input={item.input}
                  choices={item.choices}
                  choiceMode={item.choiceMode}
                  required={item.required}
                  fieldName={item.name}
                  disabled={
                    item.dependsOn && !dependsValue ? true : item.disabled
                  }
                  readOnly={
                    !!item.readOnly || (item.dependsOn && !dependsValue)
                  }
                  catenate={item.catenate}
                  mapToValue={item.mapToValue}
                  dependsOn={item.dependsOn}
                  error={errors?.[item.name]}
                  methods={methods}
                />
              );
            })}
        </div>
      </section>
    </>
  );
};

export default DynamicForm;
