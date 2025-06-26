import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { createScheduleFormDataAssets, userCourses } from './assets';
import DynamicForm from '../../../features/DynamicForm/DynamicForm';
import { FormProvider } from 'react-hook-form';
import useScheduleForm from './useScheduleForm';
import './CreateSchedule.css';
// import InfoModal from '../../../components/Modals/Info/InfoModal';
import button from '../../../components/Button/Button';
import { MdAddchart } from 'react-icons/md';
import CourseSelector from '../../../components/CourseSelector/CourseSelector';
import { AnimatePresence, motion } from 'framer-motion';

const CreateSchedule = () => {
  const { setNavTitle } = useAuth();
  const [courseSelected, setCourseSelected] = useState(false);

  const { methods, handleSubmit, onSubmit } = useScheduleForm();

  const { setValue } = methods;

  useEffect(() => {
    setNavTitle('Create Schedules');
  }, [setNavTitle]);

  const handleCourseSelect = (course) => {
    setValue('courseCode', course.courseCode);
    setValue('courseTitle', course.courseTitle);
    setValue('lecturerName', course.lecturerName);
    setValue('department', course.department);
    setValue('faculty', course.faculty);
    setValue('level', course.level);
    setCourseSelected(true); // ✅ Enable form
  };

  return (
    <FormProvider {...methods}>
      <h1 className="header">Add a New Schedule</h1>
      <CourseSelector
        courses={userCourses}
        onSelect={handleCourseSelect}
      />

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-schedule">
          <div className="create-schedule-sections">
            <div className="create-schedule-section">
              {createScheduleFormDataAssets.slice(0, 3).map((schedule) => (
                <DynamicForm
                  key={schedule.id}
                  title={schedule.title}
                  selectOptions={schedule.selectOptions}
                />
              ))}
            </div>
            <div className="create-schedule-section">
              {createScheduleFormDataAssets.slice(3).map((schedule) => (
                <DynamicForm
                  key={schedule.id}
                  title={schedule.title}
                  selectOptions={schedule.selectOptions}
                />
              ))}
            </div>
          </div>
          {button.multiple({
            icon: MdAddchart,
            func: () => console.log('submitted'),
            element: 'Add Schedule',
            type: 'submit',
          })}
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateSchedule;
