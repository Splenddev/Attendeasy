import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdInfoOutline,
  MdSelectAll,
} from 'react-icons/md';
import { FaCrown, FaUserGraduate, FaUserPlus } from 'react-icons/fa';

import FieldSet from '../../components/FieldSet/FieldSet';
import './DynamicForm.css';
import { list } from '../../utils/contants';
import button from '../../components/Button/Button';
import { useInfoModal } from '../../context/infoModalContext';
import { useForm } from 'react-hook-form';

const DynamicForm = ({
  title = '',
  selectOptions = [],
  selectedStudents = [],
  toggleStudent,
  setAllStudents,
  id = '',
}) => {
  const allSelected =
    list.length > 0 && selectedStudents.length === list.length;
  const totalStudents = list.length;
  const selectedCount = selectedStudents.length;

  const methods = useForm();
  const {
    formState: { errors },
  } = methods;

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
        {title === 'students' ? (
          <div className="container">
            <p className="selection-count">
              Selected {selectedCount} of {totalStudents} students
            </p>
            <div className="student-list">
              {list.slice(0, 4).map((student) => {
                const isSelected =
                  Array.isArray(selectedStudents) &&
                  selectedStudents.includes(student.name);
                return (
                  <div key={student.name}>
                    <div className="student">
                      <p>
                        {student.role === 'class-rep' ? (
                          <FaCrown />
                        ) : (
                          <FaUserGraduate />
                        )}{' '}
                        {student.name}
                      </p>
                      <label htmlFor={`select-student-${student.name}`}>
                        <p> {student.role}</p>
                        {isSelected ? (
                          <MdCheckBox />
                        ) : (
                          <MdCheckBoxOutlineBlank />
                        )}
                      </label>
                      <input
                        id={`select-student-${student.name}`}
                        onChange={() => toggleStudent(student.name)}
                        hidden
                        type="checkbox"
                        checked={isSelected}
                      />
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
            {button.normal({
              element: `all students ${list.length}`,
              name: 'all-students',
            })}
            <div className="btns">
              {button.multiple({
                icon: MdSelectAll,
                element: allSelected ? 'Deselect All' : 'Select All',
                name: allSelected ? 'btn-deselect' : 'btn-select',
                func: setAllStudents,
              })}
              {button.multiple({
                icon: FaUserPlus,
                element: 'new student',
              })}
            </div>
          </div>
        ) : (
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
                disabled={item.disabled}
                readOnly={true}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default DynamicForm;
