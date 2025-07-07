import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateAttendance } from '../../../hooks/useAttendance';
import { toast } from 'react-toastify';

const useAttendanceForm = (groupId, scheduleId) => {
  const methods = useForm({ defaultValues: {} });
  const { handleSubmit, watch, reset } = methods;

  const [modalError, setModalError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState(false);

  const { submit, loading } = useCreateAttendance();
  const selectedStudents = watch('students');

  const onSubmit = async (data) => {
    if (
      data.location?.radiusMeters &&
      Array.isArray(data.location.radiusMeters)
    ) {
      data.location.radiusMeters = data.location.radiusMeters[0];
    }

    const formData = {
      ...data,
      groupId,
      scheduleId,
    };

    try {
      const res = await submit(formData);
      if (res.success) {
        setModalError(null);
        setShowModal(false);
        toast.success(res.message || 'Success');
        setSuccessData({
          message: res.message,
          details: {
            AttendanceID: res.attendance?.attendanceId,
            Date: res.attendance?.classDate,
            Status: res.attendance?.status,
          },
        });
        setShowSuccess(true);
        reset();
      } else {
        toast.error(res.message);
        setModalError(res);
        setShowModal(true);
      }
    } catch (err) {
      const errData = err.response?.data || {
        message: err.message,
        code: 'REQUEST_FAILED',
      };

      setModalError(errData);
      setShowModal(true);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    selectedStudents,
    modalError,
    setModalError,
    showModal,
    setShowModal,
    showSuccess,
    successData,
    setShowSuccess,
  };
};

export default useAttendanceForm;
