import { useForm } from 'react-hook-form';

const useScheduleForm = () => {
  const methods = useForm({ defaultValues: { classDaysTimes: [] } });

  return {
    methods,
  };
};

export default useScheduleForm;
