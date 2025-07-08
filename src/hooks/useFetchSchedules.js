import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchSchedulesByGroup } from '../services/schedule.service';

export const useFetchSchedules = (groupId) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = () => {
    if (!groupId) return;

    setLoading(true);
    fetchSchedulesByGroup(groupId)
      .then((res) => {
        setSchedules(res.data);
        setError('');
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || 'Failed to load schedules';
        setError(msg);
        toast.error(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [groupId]);

  return { schedules, loading, error, refetch: fetchData };
};
