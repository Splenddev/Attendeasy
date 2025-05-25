import './CreateAttendance.css';
import { MdPublish, MdSave } from 'react-icons/md';
import { FormProvider } from 'react-hook-form';
import button from '../../../components/Button/Button';
import Contents from '../../../features/Contents/Contents';
import { formDataAssets, formDataAssets2 } from '../../../utils/contants';
import { useAuth } from '../../../context/AuthContext';
import useAttendanceForm from './useAttendanceForm';
import { useEffect } from 'react';
import { InfoModal } from '../../../components/Modals';
import { useInfoModal } from '../../../context/infoModalContext';

const CreateAttendance = () => {
  const { setNavTitle, user } = useAuth();
  const {
    methods,
    handleSubmit,
    onSubmit,
    selectedStudents,
    toggleStudent,
    setAllStudents,
  } = useAttendanceForm();

  useEffect(() => {
    setNavTitle('Create Attendance');
  }, []);

  const { visible, modalId, closeModal } = useInfoModal();

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="create-attendance">
          <div className="create-attendance-header">
            <p>
              Created By <span>{user.name}</span>
            </p>
            <div className="create-attendance-header-action">
              {button.multiple({ icon: MdSave, element: 'save as draft' })}
              {button.multiple({
                icon: MdPublish,
                element: 'publish',
                type: 'submit',
              })}
            </div>
          </div>

          <div className="create-attendance-sections">
            <div className="create-attendance-section left">
              {formDataAssets.map((data) => (
                <Contents
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  selectOptions={data.selectOptions}
                />
              ))}
            </div>

            <div className="create-attendance-section right">
              {formDataAssets2.map((data) => (
                <Contents
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  selectOptions={data.selectOptions}
                />
              ))}
              <Contents
                view="grid"
                title="students"
                id="students"
                selectOptions={[{}]}
                selectedStudents={selectedStudents}
                toggleStudent={toggleStudent}
                setAllStudents={setAllStudents}
              />
            </div>
          </div>
        </form>
      </FormProvider>
      <InfoModal
        visible={visible}
        modalId={modalId}
        onClose={closeModal}
      />
    </>
  );
};

export default CreateAttendance;
