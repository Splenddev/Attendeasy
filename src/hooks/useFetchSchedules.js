import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchSchedulesByGroup } from '../services/schedule.services';

export const useFetchSchedules = (groupId) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!groupId) return;

    fetchSchedulesByGroup(groupId)
      .then((res) => {
        console.log(res.data);
        setSchedules(res.data);
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || 'Failed to load schedules';
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  }, [groupId]);

  return { schedules, loading, error };
};
