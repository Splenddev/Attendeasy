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
        start: '0H5M', // Parsed as minutes before start time
        end: '1H0M', // Parsed as minutes after start time
      },
      attendanceType: 'physical',

      location: {
        latitude: null,
        longitude: null,
        radiusMeters: 100,
      },

      markingConfig: {
        type: 'strict', // 'strict' | 'flexible'
        mode: 'no_code', // 'no_code' | 'code'
      },

      autoEnd: true,

      settings: {
        markOnce: true, // Prevent double marking
        allowLateJoiners: true, // Whether students who joined after creation can mark
        lateThreshold: 10, // Minutes after classStart to count as late
        pleaWindow: 3, // Days allowed to submit plea
        proofRequirement: 'none', // 'none' | 'selfie' | 'document'
        enableCheckInOut: true, // Enable both check-in and check-out
        allowEarlyCheckIn: false, // Allow check-in/out before window
        allowLateCheckIn: true, // Allow check-in/out after window
        allowEarlyCheckOut: false, // Separate for check-out
        allowLateCheckOut: false,
        minimumPresenceDuration: 45, // Used to validate if student stayed long enough
        autoCheckOut: true, // System auto-checks out after duration
        repeatable: false, // Is this session recurring?
        notifyOnStart: true, // Notify students on creation
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
