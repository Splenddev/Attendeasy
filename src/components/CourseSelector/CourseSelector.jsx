import { useState } from 'react';
import styles from './CourseSelector.module.css';
import {
  MdPerson,
  MdSchool,
  MdAdd,
  MdMail,
  MdCheckCircle,
} from 'react-icons/md';
import { LuRepeat } from 'react-icons/lu';

const CourseSelector = ({ courses, onSelect, onAdd }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.courseSelector}>
      <h3>Select a Course</h3>

      <div className={styles.courseList}>
        {courses.map((course, i) => (
          <div
            key={i}
            className={styles.courseDetail}
            onClick={() => {
              onSelect(course);
              setSelected(course.courseCode);
            }}>
            {/* Thumbnail */}
            <div className={styles.courseThumbnail}>
              <img
                src={course.thumbnail}
                alt={`${course.courseTitle} thumbnail`}
              />
              <h4>{course.courseCode}</h4>
            </div>

            {/* Card Content */}
            <div className={styles.courseCard}>
              {/* Selected checkmark */}
              {selected === course.courseCode && (
                <span className={`center ${styles.check}`}>
                  <MdCheckCircle />
                </span>
              )}

              {/* Course Title */}
              <div className={styles.courseTitle}>{course.courseTitle}</div>

              {/* Instructor */}
              <div className={styles.courseInfo}>
                <MdPerson size={18} />
                <span>{course.instructor.name}</span>
              </div>

              {course.instructor.email && (
                <div className={styles.courseInfo}>
                  <MdMail size={18} />
                  <span>{course.instructor.email}</span>
                </div>
              )}

              {/* Units */}
              <div className={styles.courseInfo}>
                <MdSchool size={18} />
                <span>{course.unit} unit</span>
              </div>

              {/* Classes per week */}
              <div className={styles.courseInfo}>
                <LuRepeat size={18} />
                <span>
                  {course.classesPerWeek} class
                  {course.classesPerWeek > 1 ? 'es' : ''} per week
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add course card */}
        <div
          className={styles.courseDetail}
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
