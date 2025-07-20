import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdInfoOutline,
  MdSelectAll,
} from 'react-icons/md';
import { FaCrown, FaUserGraduate, FaUserPlus } from 'react-icons/fa';

import FieldSet from '../../components/FieldSet/FieldSet';
import './DynamicForm.css';
import button from '../../components/Button/Button';
import { useInfoModal } from '../../context/infoModalContext';

const DynamicForm = ({ title = '', selectOptions = [], id = '', methods }) => {
  const {
    formState: { errors },
    watch,
    // getValues,
  } = methods;

  const enableCheckInOut = watch('settings.enableCheckInOut');

  console.log(enableCheckInOut);

  const { openModal } = useInfoModal();

  return (
    <>
      {Object.keys(errors).length > 0 && (
        <div className="form-errors-summary">
          <p>
            <strong>Please fix the following:</strong>
          </p>
          <ul>
            {Object.entries(errors).map(([key, error]) => (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
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
          {selectOptions.map((item) => (
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
                (item.dependsOn && !watch(item.dependsOn)) ||
                (item.name === 'settings.allowLateCheckOut' &&
                  enableCheckInOut === 'No (check-in only)') ||
                (item.name === 'settings.allowEarlyCheckOut' &&
                  enableCheckInOut === 'No (check-in only)')
                  ? true
                  : item.disabled
              }
              readOnly={
                !!item.readOnly || (item.dependsOn && !watch(item.dependsOn))
              }
              catenate={item.catenate}
              mapToValue={item.mapToValue}
              enabled={enableCheckInOut}
              error={errors?.[item.name]}
              methods={methods}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default DynamicForm;
