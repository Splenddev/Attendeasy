import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { createScheduleFormDataAssets } from './assets';
import DynamicForm from '../../../features/DynamicForm/DynamicForm';
import { FormProvider } from 'react-hook-form';
import useScheduleForm from './useScheduleForm';
import './CreateSchedule.css';
// import InfoModal from '../../../components/Modals/Info/InfoModal';
import button from '../../../components/Button/Button';
import { MdAddchart } from 'react-icons/md';

const CreateSchedule = () => {
  const { setNavTitle } = useAuth();
  const { methods, handleSubmit, onSubmit } = useScheduleForm();
  useEffect(() => {
    setNavTitle('Create Schedules');
  }, [setNavTitle]);
  return (
    <>
      <FormProvider {...methods}>
        <h1 className="header">Add a New Schedule</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-schedule">
          <div className="create-schedule-sections">
            <div className="create-schedule-section">
              {createScheduleFormDataAssets.slice(0, 3).map((schedule) => {
                return (
                  <DynamicForm
                    key={schedule.id}
                    title={schedule.title}
                    selectOptions={schedule.selectOptions}
                  />
                );
              })}
            </div>
            <div className="create-schedule-section">
              {createScheduleFormDataAssets.slice(3).map((schedule) => {
                return (
                  <DynamicForm
                    key={schedule.id}
                    title={schedule.title}
                    selectOptions={schedule.selectOptions}
                  />
                );
              })}
            </div>
          </div>
          {button.multiple({
            icon: MdAddchart,
            func: () => console.log('submitted'),
            element: 'Add Schedule',
            type: 'submit',
          })}
        </form>
      </FormProvider>
      {/* <InfoModal /> */}
    </>
  );
};

export default CreateSchedule;
