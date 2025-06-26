import React, { useState } from 'react';
import styles from './CourseAdder.module.css';
import { FaPlus, FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CourseAdder = ({ onCoursesChange }) => {
  const [course, setCourse] = useState({
    courseCode: '',
    courseTitle: '',
    unit: '',
  });
  const [courses, setCourses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCourse({ courseCode: '', courseTitle: '', unit: '' });
    setEditingIndex(null);
  };

  const COURSE_CODE_REGEX = /^[A-Z]{3}\d{3}$/;

  const handleAddOrUpdate = () => {
    if (!course.courseCode || !course.unit) return;
    const rawCode = course.courseCode.trim().toUpperCase();
    if (!COURSE_CODE_REGEX.test(rawCode)) {
      toast.error(
        'Course code must be 3 uppercase letters followed by 3 digits (e.g., MTH101).'
      );
      return;
    }

    const newCourse = {
      courseCode: course.courseCode.toUpperCase().trim(),
      courseTitle: course.courseTitle.trim(),
      unit: Number(course.unit),
    };

    const updated = [...courses];
    if (editingIndex !== null) {
      updated[editingIndex] = newCourse;
    } else {
      const exists = courses.some((c) => c.courseCode === newCourse.courseCode);
      if (exists) return alert('Course already added');
      updated.push(newCourse);
    }

    setCourses(updated);
    if (onCoursesChange) onCoursesChange(updated);
    resetForm();
  };

  const handleEdit = (index) => {
    const toEdit = courses[index];
    setCourse(toEdit);
    setEditingIndex(index);
  };

  const handleRemove = (index) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
    if (onCoursesChange) onCoursesChange(updated);
    if (editingIndex === index) resetForm();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Courses</h2>
      <div className={styles.formGrid}>
        <input
          type="text"
          name="courseCode"
          placeholder="Course Code (e.g. PHY101)"
          value={course.courseCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="courseTitle"
          placeholder="Course Title"
          value={course.courseTitle}
          onChange={handleChange}
        />
        <input
          type="number"
          name="unit"
          placeholder="Units"
          value={course.unit}
          onChange={handleChange}
        />
        <button
          type="button"
          className={styles.addBtn}
          onClick={handleAddOrUpdate}>
          {editingIndex !== null ? <FaSave /> : <FaPlus />}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={resetForm}
            title="Cancel Edit">
            <FaTimes />
          </button>
        )}
      </div>

      <div className={styles.courseListBox}>
        {courses.length === 0 ? (
          <p className={styles.empty}>No courses added yet.</p>
        ) : (
          <ul className={styles.courseList}>
            {courses.map((c, index) => (
              <li
                key={c.courseCode}
                className={styles.courseItem}>
                <div className={styles.courseInfo}>
                  <strong>{c.courseCode}</strong> —{' '}
                  {c.courseTitle || 'Untitled'} ({c.unit} unit
                  {c.unit > 1 ? 's' : ''})
                </div>
                <div className={styles.actionBtns}>
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    title="Edit">
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    title="Remove">
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseAdder;
