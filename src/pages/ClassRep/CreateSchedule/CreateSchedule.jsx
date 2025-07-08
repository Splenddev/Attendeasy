import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FormProvider } from 'react-hook-form';
import { MdAddchart } from 'react-icons/md';

import { useAuth } from '../../../context/AuthContext';
import { createScheduleFormDataAssets } from './assets';
import DynamicForm from '../../../features/DynamicForm/DynamicForm';
import useScheduleForm from './useScheduleForm';
import button from '../../../components/Button/Button';
import CourseSelector from '../../../components/CourseSelector/CourseSelector';
import './CreateSchedule.css';
import { useCreateSchedule } from '../../../hooks/useCreateSchedule';
import useCourses from '../../../hooks/useCourses';
import Spinner from '../../../components/Loader/Spinner/Spinner';
import PopupBox from '../../../components/Modals/PopupBox/PopupBox';
import CourseAdder from '../../Auth/Register/CourseAdder/CourseAdder';
import ManagerCourse from '../ManageCourse/ManageCourse';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';

const CreateSchedule = () => {
  const { setNavTitle, user } = useAuth();
  useEffect(() => setNavTitle('Create Schedules'), [setNavTitle]);

  const [openPopup, setOpenPopup] = useState(false);

  const { courses, refetch, loading } = useCourses('fetch');

  const { methods } = useScheduleForm();
  const { handleSubmit, setValue, reset, watch } = methods;

  const { handleCreateSchedule } = useCreateSchedule();

  const classLocation = watch('classLocation');
  const [courseSelected, setCourseSelected] = useState(false);

  const onSubmit = async (data) => {
    await handleCreateSchedule({
      data,
      groupId: user.group,
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
      lecturerName: course.lecturer.name,
      creditUnit: course.unit,
      lecturerEmail: course.lecturer.email,
      faculty: user.faculty,
      department: user.department,
      level: user.level,
    }).forEach(([key, value]) => setValue(key, value));

    setCourseSelected(true);
  };

  return (
    <>
      <FormProvider {...methods}>
        <h1
          className="header"
          onClick={() => console.log(classLocation)}>
          Add a New Schedule
        </h1>
        {loading ? (
          <div className="loaderWrapper">
            <Spinner
              size="25px"
              scale=".8"
            />
          </div>
        ) : !courses.length ? (
          <div className="fallbackActions">
            <p>No course found.</p>
            <div className="buttonGroup">
              {button.multiple({
                disabled: loading,
                icon: FiRefreshCw,
                element: 'Retry',
                func: refetch,
              })}
              {button.multiple({
                icon: FiPlus,
                element: 'Add Course',
                func: () => setOpenPopup(true),
              })}
            </div>
          </div>
        ) : (
          <CourseSelector
            courses={courses}
            onSelect={handleCourseSelect}
            onAdd={() => setOpenPopup(true)}
          />
        )}
        <div className="form-container">
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
        <PopupBox
          isOpen={openPopup}
          onClose={() => setOpenPopup(false)}>
          <ManagerCourse />
        </PopupBox>{' '}
      </FormProvider>
    </>
  );
};

export default CreateSchedule;
