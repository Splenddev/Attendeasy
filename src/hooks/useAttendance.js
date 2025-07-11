// src/hooks/useAttendance.js
import { useState, useCallback, useEffect } from 'react';
import {
  createAttendance,
  getGroupAttendances,
  getGroupTabAttendances,
  submitAbsencePlea,
} from '../services/attendance.service';

export const useCreateAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (formData) => {
    try {
      setLoading(true);
      const res = await createAttendance(formData);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error };
};

export const useFetchGroupAttendances = (groupId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getGroupAttendances(groupId);
      setData(res.attendances || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, fetch, loading, error };
};
export const useFetchGroupTabAttendances = (groupId) => {
  const [data, setData] = useState(null); // it’s an object, not array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!groupId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getGroupTabAttendances(groupId);
      setData(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, refetch: fetch, loading, error };
};

export const useSubmitPlea = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (attendanceId, payload) => {
    try {
      setLoading(true);
      const res = await submitAbsencePlea(attendanceId, payload);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error };
};
