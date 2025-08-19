import { useState, useEffect, useCallback } from 'react';
import {
  getScheduleHistory,
  getTodayInstancesForReps,
  updateInstances,
} from '../services/scheduleInstance.service';
import { toast } from 'react-toastify';

export function useScheduleInstance(scheduleId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstance = useCallback(async () => {
    if (!scheduleId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await getScheduleHistory(scheduleId);
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'error fetching data');
      setError(err.message || 'Failed to fetch schedule instance');
    } finally {
      setLoading(false);
    }
  }, [scheduleId]);

  useEffect(() => {
    fetchInstance();
  }, [fetchInstance]);

  const fetchTodaysInstances = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTodayInstancesForReps();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      toast.error(err.message || 'error fetching data');
      setError(err.message || 'Failed to fetch schedule instances');
    } finally {
      setLoading(false);
    }
  };

  const update = async ({
    id,
    classStatus,
    rescheduledToDate,
    updatedTime,
    lecturerMessage,
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateInstances({
        id,
        classStatus,
        rescheduledToDate,
        updatedTime,
        lecturerMessage,
      });
      fetchInstance();
      fetchTodaysInstances();
      return data;
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to update status'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchInstance,
    fetchTodaysInstances,
    update,
  };
}
