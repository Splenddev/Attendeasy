// src/hooks/useAttendance.js
import { useState, useCallback, useEffect } from 'react';
import {
  createAttendance,
  deleteSession,
  finalizeSession,
  getGroupAttendances,
  getGroupTabAttendances,
  reopenSession,
  submitAbsencePlea,
} from '../services/attendance.service';
import { useErrorModal } from './useErrorModal';
import { useSuccessModal } from './useSuccessModal';
export const useCreateAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { open: openError } = useErrorModal();
  const { open: openSuccess } = useSuccessModal();

  const submit = useCallback(async (formData) => {
    try {
      setLoading(true);
      const res = await createAttendance(formData);
      if (res.success) {
        openSuccess({
          title: 'Attendance created',
          message: res.message,
          details: {
            AttendanceID: res.attendance.id,
            Date: res.attendance.classDate,
            TotalStudent: res.attendance.totalStudents,
            status: res.attendance.status,
          },
        });
      } else {
        openError({
          initiator: 'Create Attendance',
          res,
        });
      }
      return res;
    } catch (err) {
      setError(err.message);
      openError({
        initiator: 'Create Attendance',
        ...err?.response?.data,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error };
};
export const useFinalizeAttendance = () => {
  const { open: openError } = useErrorModal();
  const [finalizing, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const finalize = useCallback(async (attendanceId) => {
    try {
      setLoading(true);
      const res = await finalizeSession(attendanceId);
      return res;
    } catch (err) {
      setError(err.message);
      openError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { finalize, finalizing, error };
};
export const useReopenAttendance = () => {
  const { open: openError } = useErrorModal();
  const [opening, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reopen = useCallback(async (attendanceId) => {
    try {
      setLoading(true);
      const res = await reopenSession(attendanceId);
      return res;
    } catch (err) {
      setError(err.message);
      openError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { reopen, opening, error };
};

export const useFetchGroupAttendances = (groupId, autoFetch = false) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(
    async (id) => {
      const group = id || groupId;
      if (!group) return;

      try {
        setLoading(true);
        const res = await getGroupAttendances(group);
        setData(res.attendances || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch attendance');
      } finally {
        setLoading(false);
      }
    },
    [groupId]
  );

  useEffect(() => {
    if (autoFetch && groupId) fetch(groupId);
  }, [autoFetch, groupId, fetch]);

  return { data, fetch, loading, error, setData };
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

export const useDeleteAttendance = () => {
  const [loading, setLoading] = useState(false);
  const { open: openError } = useErrorModal();
  const { open: openSuccess } = useSuccessModal();

  const deleteAttendance = async (attendanceId) => {
    setLoading(true);
    try {
      const data = await deleteSession(attendanceId);
      if (data.success) {
        openSuccess({
          title: 'Attendance Deleted',
          message: data.message,
          details: {
            AttendanceID: data.data.attendanceId,
            Date: data.data.classDate,
          },
        });
      } else {
        openError({
          initiator: 'Delete Attendance',
          data,
        });
      }
      return { success: data.success, data: data.data };
    } catch (err) {
      openError({
        initiator: 'Delete Attendance',
        ...err,
      });
      console.log(err.message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { deleteAttendance, loading };
};
