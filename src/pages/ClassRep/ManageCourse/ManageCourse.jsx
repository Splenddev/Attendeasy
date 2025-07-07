// ManageCourse.jsx
import React, { useState } from 'react';
import styles from '../../Auth/Register/CourseAdder/CourseAdder.module.css';
import { FaPlus, FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import stringSimilarity from 'string-similarity';
import { toast } from 'react-toastify';
import useCourses from '../../../hooks/useCourses';

const COURSE_CODE_REGEX = /^[A-Z]{3}\d{3}$/;
const similarityThreshold = 0.65;

const emptyCourse = {
  courseCode: '',
  courseTitle: '',
  unit: '',
  lecturer: { name: '', email: '' },
};

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [draft, setDraft] = useState(emptyCourse);
  const [editingIndex, setEditingIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  const { addCourse } = useCourses();

  const resetDraft = () => {
    setDraft(emptyCourse);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('lecturer.')) {
      const key = name.split('.')[1];
      setDraft((d) => ({ ...d, lecturer: { ...d.lecturer, [key]: value } }));
    } else {
      setDraft((d) => ({ ...d, [name]: value }));
    }
  };

  const handleAddOrUpdate = () => {
    const { courseCode, courseTitle, unit, lecturer } = draft;

    if (!courseCode || !unit || !courseTitle) {
      toast.error('Course code, title, and unit are required.');
      return;
    }

    const code = courseCode.trim().toUpperCase();
    const title = courseTitle.trim();

    if (!COURSE_CODE_REGEX.test(code)) {
      toast.error(
        'Course code must be 3 uppercase letters followed by 3 digits (e.g., CSC101).'
      );
      return;
    }

    const exactTitleExists = courses.some(
      (c, idx) =>
        idx !== editingIndex &&
        c.courseTitle?.trim().toLowerCase() === title.toLowerCase()
    );
    if (exactTitleExists) {
      toast.warning('A course with the same title already exists.');
      return;
    }

    if (editingIndex === null) {
      const similar = courses.find((c) => {
        const sim = stringSimilarity.compareTwoStrings(
          c.courseTitle.toLowerCase(),
          title.toLowerCase()
        );
        return sim >= similarityThreshold;
      });
      if (similar) {
        const ok = window.confirm(
          `A similar course "${similar.courseTitle}" exists. Still add?`
        );
        if (!ok) return;
      }
    }

    const payload = {
      courseCode: code,
      courseTitle: title,
      unit: Number(unit),
      lecturer: {
        name: lecturer.name.trim(),
        email: lecturer.email.trim(),
      },
    };

    const updated = [...courses];
    if (editingIndex !== null) {
      updated[editingIndex] = payload;
      toast.success('Course updated.');
    } else {
      const codeExists = courses.some((c) => c.courseCode === code);
      if (codeExists) {
        toast.warning('Course with this code already exists.');
        return;
      }
      updated.push(payload);
      toast.success('Course added.');
    }

    setCourses(updated);
    resetDraft();
  };

  const handleRemove = (index) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
    resetDraft();
    toast.info('Course removed.');
  };

  const handleSaveToBackend = async () => {
    if (courses.length === 0) {
      toast.error('You must add at least one course.');
      return;
    }

    try {
      setSaving(true);
      const res = await addCourse(courses);
      toast.success(res.message || 'Courses saved successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to save courses.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Course Manager</h2>

      <div className={styles.formGrid}>
        <input
          name="courseCode"
          placeholder="Course Code (e.g. CSC101)"
          value={draft.courseCode}
          onChange={handleChange}
        />
        <input
          name="courseTitle"
          placeholder="Course Title"
          value={draft.courseTitle}
          onChange={handleChange}
        />
        <input
          type="number"
          name="unit"
          placeholder="Unit"
          value={draft.unit}
          onChange={handleChange}
        />
        <input
          name="lecturer.name"
          placeholder="Lecturer Name"
          value={draft.lecturer.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="lecturer.email"
          placeholder="Lecturer Email"
          value={draft.lecturer.email}
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <button
            className={styles.addBtn}
            onClick={handleAddOrUpdate}>
            {editingIndex !== null ? <FaSave /> : <FaPlus />}{' '}
            {editingIndex !== null ? 'Save' : 'Add'}
          </button>
          {editingIndex !== null && (
            <button
              className={styles.cancelBtn}
              onClick={resetDraft}>
              <FaTimes /> Cancel
            </button>
          )}
        </div>
      </div>

      {courses.length === 0 ? (
        <p className={styles.empty}>No courses added yet.</p>
      ) : (
        <>
          <ul className={styles.courseList}>
            {courses.map((c, idx) => (
              <li
                key={c.courseCode}
                className={styles.courseItem}>
                <div className={styles.courseInfo}>
                  <strong>{c.courseCode}</strong> — {c.courseTitle} ({c.unit}{' '}
                  unit
                  {c.unit > 1 ? 's' : ''})
                  <br />
                  <small>
                    Lecturer: {c.lecturer.name || 'N/A'} •{' '}
                    {c.lecturer.email || 'N/A'}
                  </small>
                </div>
                <div className={styles.actionBtns}>
                  <button
                    onClick={() => {
                      setDraft(c);
                      setEditingIndex(idx);
                    }}
                    title="Edit">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(idx)}
                    title="Remove">
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.saveWrapper}>
            <button
              className={styles.saveBtn}
              onClick={handleSaveToBackend}
              disabled={saving}>
              {saving ? 'Saving...' : 'Save to Backend'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageCourse;
