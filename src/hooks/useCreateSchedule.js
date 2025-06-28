// hooks/useCreateSchedule.js
import { toast } from 'react-toastify';
import { createSchedule } from '../services/schedule.service';

export const useCreateSchedule = () => {
  const handleCreateSchedule = async ({ data, groupId, onSuccess }) => {
    try {
      const payload = { ...data, groupId };
      console.log(payload);
      const res = await createSchedule(payload);
      toast.success('✅ Schedule created successfully');
      if (onSuccess) onSuccess(res);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return { handleCreateSchedule };
};
