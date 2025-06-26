import React from 'react';
import styles from './CourseSelector.module.css';
import { MdPerson, MdSchool, MdLayers } from 'react-icons/md';
import { FaBriefcase } from 'react-icons/fa';

const CourseSelector = ({ courses, onSelect }) => {
  return (
    <div className={styles.courseSelector}>
      <h3>Select a Course</h3>
      <div className={styles.courseList}>
        {courses.map((course, i) => (
          <div
            key={i}
            className={styles.courseCard}
            onClick={() => onSelect(course)}>
            <h4>{course.courseCode}</h4>
            <div className={styles.courseTitle}>{course.courseTitle}</div>

            <div className={styles.courseInfo}>
              <MdPerson size={16} />
              <span>{course.lecturerName}</span>
            </div>

            <div className={styles.courseInfo}>
              <MdSchool size={16} />
              <span>{course.level}</span>
            </div>

            <div className={styles.courseInfo}>
              <MdLayers size={16} />
              <span>{course.department}</span>
            </div>

            <div className={styles.courseInfo}>
              <FaBriefcase size={16} />
              <span>{course.faculty}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;
