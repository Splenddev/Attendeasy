// hooks/useSchedules.js
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchSchedulesByGroup } from '../services/schedule.service';

const useSchedules = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSchedules = useCallback(async () => {
    if (!user?.group) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetchSchedulesByGroup(user.group);
      setSchedules(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load schedules');
    } finally {
      setLoading(false);
    }
  }, [user?.group]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  return {
    schedules,
    loading,
    error,
    retry: loadSchedules, // expose retry function
  };
};

export default useSchedules;
