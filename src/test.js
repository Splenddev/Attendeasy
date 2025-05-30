import React from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdInfoOutline,
  MdSelectAll,
} from 'react-icons/md';
import { FaUserCheck, FaUserPlus } from 'react-icons/fa';

import Select from '../../components/Select/Select';
import './Contents.css';
import { list } from '../../utils/contants';
import button from '../../components/Button/Button';

const Contents = ({
  title = '',
  selectOptions = [],
  selectedStudents = [],
  toggleStudent,
  setAllStudents,
}) => {
  const allSelected =
    list.length > 0 && selectedStudents.length === list.length;
  const totalStudents = list.length;
  const selectedCount = selectedStudents.length;

  return (
    <section>
      <div className="title cap">
        {title} <MdInfoOutline />
      </div>

      {title === 'students' ? (
        <div className="container">
          <p className="selection-count">
            Selected {selectedCount} of {totalStudents} students
          </p>

          <div className="student-list">
            {list.slice(0, 4).map((student) => {
              const isSelected = selectedStudents.includes(student.name);
              return (
                <div key={student.name}>
                  <div className="student">
                    <p>{student.name}</p>
                    <label htmlFor={`select-student-${student.name}`}>
                      <p>{student.role}</p>
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
              icon: FaUserCheck,
              element: 'add selected',
              name: selectedCount < 1 ? 'btn-deselect' : 'btn-select',
            })}
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
            <Select
              key={item.title}
              title={item.title}
              options={item.options}
              type={item.type}
              input={item.input}
              choices={item.choices}
              choiceMode={item.choiceMode}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Contents;
