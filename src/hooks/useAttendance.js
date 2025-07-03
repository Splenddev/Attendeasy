// src/hooks/useAttendance.js
import { useState, useCallback } from 'react';
import {
  createAttendance,
  getGroupAttendances,
  markAttendance,
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

export const useFetchGroupAttendances = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (groupId) => {
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

export const useMarkAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mark = useCallback(async (attendanceId, payload) => {
    try {
      setLoading(true);
      const res = await markAttendance(attendanceId, payload);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { mark, loading, error };
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
