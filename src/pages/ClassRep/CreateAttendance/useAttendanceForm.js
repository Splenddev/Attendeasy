import { useForm } from 'react-hook-form';
// import { useAuth } from '../../../context/AuthContext';
import { selectOneStudent, selectAllStudents } from './attendanceHelpers';
import { useCreateAttendance } from '../../../hooks/useAttendance';
import { toast } from 'react-toastify';

const useAttendanceForm = (groupId) => {
  const methods = useForm({ defaultValues: {} });

  const { submit, loading, error } = useCreateAttendance();
  // const { setAttendanceList } = useAuth();
  const { handleSubmit, setValue, watch, getValues } = methods;

  const selectedStudents = watch('students');

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      groupId,
    };
    alert('submitted');
    console.log(formData);
    try {
      const res = await submit(formData);
      alert('Attendance created: ' + res.attendance.attendanceId);
    } catch (err) {
      toast.error('Failed: ' + err.message);
    }
    // setAttendanceList((prev) => [...prev, formData]);
  };

  const toggleStudent = (name) => selectOneStudent(setValue, name, getValues);
  const setAllStudents = () => selectAllStudents(setValue, getValues);

  return {
    methods,
    handleSubmit,
    onSubmit,
    selectedStudents,
    toggleStudent,
    setAllStudents,
  };
};

export default useAttendanceForm;
