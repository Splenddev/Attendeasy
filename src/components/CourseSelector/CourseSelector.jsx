import { useState } from 'react';
import styles from './CourseSelector.module.css';
import {
  MdPerson,
  MdSchool,
  MdAdd,
  MdMail,
  MdCheckCircle,
} from 'react-icons/md';

const CourseSelector = ({ courses, onSelect, onAdd }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className={styles.courseSelector}>
      <h3>Select a Course</h3>
      <div className={styles.courseList}>
        {courses.map((course, i) => (
          <div
            key={i}
            className={styles.courseCard}
            onClick={() => {
              onSelect(course);
              setSelected(course.courseCode);
            }}>
            {selected === course.courseCode && (
              <span className={`center ${styles.check}`}>
                <MdCheckCircle />
              </span>
            )}
            <h4>{course.courseCode}</h4>
            <div className={styles.courseTitle}>{course.courseTitle}</div>

            <div className={styles.courseInfo}>
              <MdPerson size={18} />
              <span>{course.lecturer.name}</span>
            </div>

            <div className={styles.courseInfo}>
              <MdMail size={18} />
              <span>{course.lecturer.email}</span>
            </div>

            <div className={styles.courseInfo}>
              <MdSchool size={18} />
              <span>{course.unit} unit</span>
            </div>
          </div>
        ))}
        <div
          className={styles.courseCard}
          onClick={onAdd}>
          <div className={styles.addCourse}>
            <MdAdd />
            Add new Course
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;
