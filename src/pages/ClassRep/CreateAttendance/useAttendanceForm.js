import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateAttendance } from '../../../hooks/useAttendance';
import { toast } from 'react-toastify';
import { useErrorModal } from '../../../hooks/useErrorModal';

const useAttendanceForm = (groupId, scheduleId) => {
  const methods = useForm({
    defaultValues: {
      courseCode: '',
      courseTitle: '',
      lecturer: {
        name: '',
        email: '',
      },
      classDate: '', // YYYY-MM-DD string
      classTime: {
        start: '', // e.g., '14:00'
        end: '', // e.g., '16:00'
      },
      entry: {
        start: '0H5M',
        end: '1H0M',
      },
      attendanceType: 'physical',

      location: {
        latitude: null,
        longitude: null,
        radiusMeters: 100,
      },

      markingConfig: {
        type: 'strict',
        mode: 'no_code',
      },

      settings: {
        markOnce: true,
        allowLateJoiners: true,
        lateThreshold: 10,
        pleaWindow: 3,
        proofRequirement: 'none',
        enableCheckInOut: false,
        allowEarlyCheckInOut: false,
        allowLateCheckInOut: true,
        minimumPresenceDuration: 45,
        autoCheckOut: true,
        deviceLock: true,
        ipRestriction: false,
        repeatable: false,
        notifyOnStart: true,
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
