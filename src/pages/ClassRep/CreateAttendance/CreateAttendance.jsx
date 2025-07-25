import './CreateAttendance.css';
import { MdSave } from 'react-icons/md';
import { FormProvider } from 'react-hook-form';
import button from '../../../components/Button/Button';
import DynamicForm from '../../../features/DynamicForm/DynamicForm';
import { formDataAssets } from '../../../utils/contants';
import { useAuth } from '../../../context/AuthContext';
import useAttendanceForm from './useAttendanceForm';
import { useEffect, useState } from 'react';
import { InfoModal } from '../../../components/Modals';
import { useInfoModal } from '../../../context/infoModalContext';
import { infoModalContent } from '../../../components/Modals/Info/infoModalContent';
import ScheduleSelector from './components/ScheduleSelector/ScheduleSelector';
import SuccessModal from '../../../components/Modals/SuccessModal/SuccessModal';
import Spinner from '../../../components/Loader/Spinner/Spinner';
import { LuClipboardList, LuSaveAll } from 'react-icons/lu';

const CreateAttendance = () => {
  const { setNavTitle, user } = useAuth();
  const [groupId, setGroupId] = useState('');
  const [schedId, setSchedId] = useState('');

  const {
    methods,
    handleSubmit,
    onSubmit,
    showSuccess,
    successData,
    setShowSuccess,
    loading,
  } = useAttendanceForm(groupId, schedId);

  useEffect(() => {
    setNavTitle('Create Attendance');
  }, [setNavTitle]);

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
              {button.multiple({ icon: LuSaveAll, element: 'save as draft' })}
              {button.multiple({
                icon: LuClipboardList,
                element: loading ? (
                  <Spinner
                    size="20px"
                    borderColor="white"
                  />
                ) : (
                  'publish'
                ),
                type: 'submit',
              })}
            </div>
          </div>

          <div className="create-attendance-sections">
            <div className="schedule-selector-wrapper">
              <ScheduleSelector
                setGroupId={setGroupId}
                setSchedId={setSchedId}
              />
            </div>
            <div className="create-attendance-section left">
              {formDataAssets.map((data) => (
                <DynamicForm
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  selectOptions={data.selectOptions}
                  methods={methods}
                />
              ))}
            </div>
          </div>
          {button.multiple({
            icon: LuClipboardList,
            element: loading ? (
              <Spinner
                size="20px"
                borderColor="white"
              />
            ) : (
              'publish'
            ),
            type: 'submit',
            name: 'publish-attendance-btn',
          })}
        </form>
      </FormProvider>
      <InfoModal
        visible={visible}
        modalId={modalId}
        onClose={closeModal}
        infoModalContent={infoModalContent}
      />
      <SuccessModal
        isOpen={showSuccess}
        data={successData}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
};

export default CreateAttendance;
