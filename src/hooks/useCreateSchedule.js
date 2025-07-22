import { useState } from 'react';
import { toast } from 'react-toastify';
import { createSchedule } from '../services/schedule.service';

export const useCreateSchedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateSchedule = async ({
    data,
    groupId,
    onSuccess,
    onError,
    onSettled,
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = { ...data, groupId };
      console.log(payload);
      const res = await createSchedule(payload);

      toast.success('✅ Schedule created successfully');
      if (onSuccess) onSuccess(res);
      return res;
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || 'Something went wrong';
      toast.error(`❌ ${msg}`);
      setError(err);
      if (onError) onError(err);
    } finally {
      setIsLoading(false);
      if (onSettled) onSettled();
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
  };

  return {
    handleCreateSchedule,
    isLoading,
    error,
    reset,
  };
};
