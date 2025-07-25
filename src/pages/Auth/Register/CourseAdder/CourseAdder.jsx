// CourseAdder.jsx  (RHF version)
import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrashAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import stringSimilarity from 'string-similarity';
import { toast } from 'react-toastify';
import styles from './CourseAdder.module.css';
import button from '../../../../components/Button/Button';

const COURSE_CODE_REGEX = /^[A-Z]{3}\d{3}$/;
const similarityThreshold = 0.65;

const emptyCourse = {
  courseCode: '',
  courseTitle: '',
  unit: '',
  lecturer: { name: '', email: '' },
};

const CourseAdder = () => {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'courses',
  });

  const [draft, setDraft] = React.useState(emptyCourse);
  const [editingIndex, setEditingIndex] = React.useState(null);

  /* ---------- helpers ---------- */
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

    // basic presence check
    if (!courseCode || !unit || !courseTitle) {
      toast.error('Course code, title, and unit are required.');
      return;
    }

    const code = courseCode.trim().toUpperCase();
    const title = courseTitle.trim();

    // code format
    if (!COURSE_CODE_REGEX.test(code)) {
      toast.error(
        'Course code must be 3 uppercase letters followed by 3 digits (e.g., CSC101).'
      );
      return;
    }

    // exact‑title collision check (case‑insensitive)
    const exactTitleExists = fields.some(
      (c, idx) =>
        idx !== editingIndex &&
        c.courseTitle?.trim().toLowerCase() === title.toLowerCase()
    );
    if (exactTitleExists) {
      toast.warning('A course with the same title already exists.');
      return;
    }

    // similar‑title prompt (only when adding)
    if (editingIndex === null) {
      const similar = fields.find((c) => {
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

    if (editingIndex !== null) {
      update(editingIndex, payload);
      toast.success('Course updated.');
    } else {
      // duplicate code check
      const codeExists = fields.some((c) => c.courseCode === code);
      if (codeExists) {
        toast.warning('Course with this code already exists.');
        return;
      }
      append(payload);
      toast.success('Course added.');
    }

    resetDraft();
  };

  /* ---------- UI ---------- */
  return (
    <div className={styles.container}>
      {/* form grid for draft */}
      <div className={styles.formGrid}>
        <input
          name="courseCode"
          placeholder="Code (CSC101)"
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
          {button.multiple({
            element: editingIndex === null ? 'Add' : 'Save',
            icon: editingIndex === null ? FaPlus : FaSave,
            func: handleAddOrUpdate,
            name: styles.addBtn,
          })}
          {editingIndex !== null &&
            button.multiple({
              element: 'Cancel',
              icon: FaTimes,
              func: resetDraft,
              name: styles.cancelBtn,
            })}
        </div>
      </div>

      {/* list */}
      {fields.length === 0 ? (
        <p className={styles.empty}>No courses added yet.</p>
      ) : (
        <ul className={styles.courseList}>
          {fields.map((c, idx) => (
            <li
              key={c.id}
              className={styles.courseItem}>
              <div className={styles.courseInfo}>
                <strong>{c.courseCode}</strong> — {c.courseTitle || 'Untitled'}{' '}
                ({c.unit} unit{c.unit > 1 ? 's' : ''})
                <br />
                <small>
                  Lecturer: {c.lecturer.name || 'N/A'} •{' '}
                  {c.lecturer.email || 'None'}
                </small>
              </div>
              <div className={styles.actionBtns}>
                {button.icon({
                  icon: FaEdit,
                  func: () => {
                    setDraft(c);
                    setEditingIndex(idx);
                  },
                })}
                {button.icon({ icon: FaTrashAlt, func: () => remove(idx) })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseAdder;
