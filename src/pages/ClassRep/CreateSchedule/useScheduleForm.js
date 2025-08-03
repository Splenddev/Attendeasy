import { useForm } from 'react-hook-form';

const useScheduleForm = () => {
  const methods = useForm({
    defaultValues: {
      classDaysTimes: [],
      repeatPattern: 'weekly',
      notificationLeadTime: 10,
      isActive: 'Yes',
      classType: false,
    },
  });

  return {
    methods,
  };
};

export default useScheduleForm;
