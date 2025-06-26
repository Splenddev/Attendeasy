// pages/CreateSchedule.jsx
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FormProvider } from 'react-hook-form';
import { MdAddchart } from 'react-icons/md';

import { useAuth } from '../../../context/AuthContext';
import { createScheduleFormDataAssets, userCourses } from './assets';
import DynamicForm from '../../../features/DynamicForm/DynamicForm';
import useScheduleForm from './useScheduleForm';
import button from '../../../components/Button/Button';
import CourseSelector from '../../../components/CourseSelector/CourseSelector';
import './CreateSchedule.css';
import { useCreateSchedule } from '../../../hooks/useCreateSchedule';

const CreateSchedule = () => {
  /* ───────────────────  set page header  ─────────────────── */
  const { setNavTitle } = useAuth();
  useEffect(() => setNavTitle('Create Schedules'), [setNavTitle]);

  /* ───────────────────  form setup  ──────────────────────── */
  const { methods } = useScheduleForm(); // provides RHF methods & validation
  const { handleSubmit, setValue, reset } = methods;

  /* ───────────────────  schedule-creator hook  ───────────── */
  const { handleCreateSchedule } = useCreateSchedule();

  /* ───────────────────  UI state  ────────────────────────── */
  const [courseSelected, setCourseSelected] = useState(false);

  /* ───────────────────  helper fns  ──────────────────────── */
  const onSubmit = async (data) => {
    await handleCreateSchedule({
      data,
      onSuccess: () => {
        reset(); // clear form
        setCourseSelected(false);
      },
    });
  };

  const handleCourseSelect = (course) => {
    // Autofill form fields
    Object.entries({
      courseCode: course.courseCode,
      courseTitle: course.courseTitle,
      lecturerName: course.lecturerName,
      department: course.department,
      faculty: course.faculty,
      level: course.level,
    }).forEach(([key, value]) => setValue(key, value));

    setCourseSelected(true);
  };

  /* ───────────────────  render  ──────────────────────────── */
  return (
    <FormProvider {...methods}>
      <h1 className="header">Add a New Schedule</h1>

      {/* course picker */}
      <CourseSelector
        courses={userCourses}
        onSelect={handleCourseSelect}
      />

      <div className="form-container">
        {/* overlay prompts until a course is picked or skipped */}
        <AnimatePresence>
          {!courseSelected && (
            <motion.div
              className="form-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <motion.div
                className="overlay-message"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}>
                <p>Please select a course to autofill relevant fields.</p>
                <p>Or continue without selecting one.</p>
                <button
                  type="button"
                  onClick={() => setCourseSelected(true)}
                  className="skip-course-button">
                  Skip Course Selection
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* main form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-schedule">
          <div className="create-schedule-sections">
            <div className="create-schedule-section">
              {createScheduleFormDataAssets.slice(0, 3).map((section) => (
                <DynamicForm
                  key={section.id}
                  title={section.title}
                  selectOptions={section.selectOptions}
                />
              ))}
            </div>

            <div className="create-schedule-section">
              {createScheduleFormDataAssets.slice(3).map((section) => (
                <DynamicForm
                  key={section.id}
                  title={section.title}
                  selectOptions={section.selectOptions}
                />
              ))}
            </div>
          </div>

          {button.multiple({
            icon: MdAddchart,
            element: 'Add Schedule',
            type: 'submit',
          })}
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateSchedule;
