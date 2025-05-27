import { useForm } from 'react-hook-form';
// import { useAuth } from '../../../context/AuthContext';
import { selectOneStudent, selectAllStudents } from './attendanceHelpers';

const useAttendanceForm = () => {
  const methods = useForm({ defaultValues: { students: [] } });
  // const { setAttendanceList } = useAuth();
  const { handleSubmit, setValue, watch, getValues } = methods;

  const selectedStudents = watch('students');

  const onSubmit = (data) => {
    const formData = {
      ...data,
      students: selectedStudents,
      list: [],
    };
    alert('submitted');
    console.log(formData);
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
