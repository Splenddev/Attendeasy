import { useState, useEffect } from 'react';
import {
  getCourses,
  createCourse,
  editCourse,
  deleteCourse,
} from '../services/courses.service.js';
import { toast } from 'react-toastify';

const useCourses = (autoFetch = true) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(autoFetch);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data.courses || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course) => {
    try {
      const res = await createCourse(course);
      setCourses((prev) => [...prev, res.course]);
      toast.success('Course added.');
      return res;
    } catch (error) {
      toast.error(error.message || 'Failed to add course.');
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
      toast.error(error.message || 'Failed to update course.');
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
      toast.error(error.message || 'Failed to remove course.');
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
        if (!didCancel) setLoading(false);
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
  };
};

export default useCourses;
