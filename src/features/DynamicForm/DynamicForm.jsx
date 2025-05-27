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

  const { openModal } = useInfoModal();

  return (
    <section className="dynamic-form">
      <div className="title cap">
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
                      {isSelected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
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
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default DynamicForm;
