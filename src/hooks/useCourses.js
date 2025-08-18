import { useState, useEffect } from 'react';
import {
  getCourses,
  createCourse,
  editCourse,
  deleteCourse,
} from '../services/courses.service.js';
import { toast } from 'react-toastify';
import { useErrorModal } from './useErrorModal.js';

const useCourses = (autoFetch = true) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const { open } = useErrorModal();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCourses();
      setCourses(data.courses || []);
    } catch (error) {
      setError(error);
      open(error);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course) => {
    try {
      setLoading(true);
      const res = await createCourse(course);
      setCourses((prev) => [...prev, res.course]);
      toast.success('Course added.');
      return res;
    } catch (error) {
      open(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (courseCode, updatedData) => {
    try {
      const { course: updatedCourse } = await editCourse(
        courseCode,
        updatedData
      );
      setCourses((prev) =>
        prev.map((c) =>
          c.courseCode.toUpperCase() === courseCode.toUpperCase()
            ? updatedCourse
            : c
        )
      );
      toast.success('Course updated.');
    } catch (error) {
      open(error);
    }
  };

  const removeCourse = async (courseCode) => {
    try {
      await deleteCourse(courseCode);
      setCourses((prev) =>
        prev.filter(
          (c) => c.courseCode.toUpperCase() !== courseCode.toUpperCase()
        )
      );
      toast.info('Course removed.');
    } catch (error) {
      open(error);
    }
  };

  useEffect(() => {
    let didCancel = false;

    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await getCourses();
        if (!didCancel) setCourses(data.courses || []);
      } catch (error) {
        if (!didCancel)
          toast.error(error.message || 'Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };

    if (autoFetch) {
      loadCourses();
    }

    return () => {
      didCancel = true;
    };
  }, [autoFetch]);

  return {
    courses,
    loading,
    addCourse,
    updateCourse,
    removeCourse,
    refetch: fetchCourses,
    error,
  };
};

export default useCourses;
