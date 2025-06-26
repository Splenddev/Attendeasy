// hooks/useCreateSchedule.js
import { toast } from 'react-toastify';
import { createSchedule } from '../services/schedule.services';

export const useCreateSchedule = () => {
  const handleCreateSchedule = async ({ data, onSuccess }) => {
    try {
      const res = await createSchedule(data);
      toast.success('✅ Schedule created successfully');
      if (onSuccess) onSuccess(res);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return { handleCreateSchedule };
};
