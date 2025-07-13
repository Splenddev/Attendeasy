import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateAttendance } from '../../../hooks/useAttendance';
import { toast } from 'react-toastify';
import { useErrorModal } from '../../../hooks/useErrorModal';

const useAttendanceForm = (groupId, scheduleId) => {
  const methods = useForm({
    defaultValues: {
      location: {
        radiusMeters: 100,
      },
    },
  });
  const { handleSubmit, watch, reset } = methods;

  const { open } = useErrorModal();

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
        open(res);
      }
    } catch (err) {
      toast.error(err.message || 'error');
      open(err);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    selectedStudents,
    showSuccess,
    successData,
    setShowSuccess,
    loading,
  };
};

export default useAttendanceForm;
