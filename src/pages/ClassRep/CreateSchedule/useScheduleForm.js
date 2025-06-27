import { useForm } from 'react-hook-form';

const useScheduleForm = () => {
  const methods = useForm({ defaultValues: { classDaysTimes: [] } });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    const formData = {
      ...data,
    };
    alert('submitted');
    console.log(formData);
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useScheduleForm;
