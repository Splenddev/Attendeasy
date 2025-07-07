import { useState, useEffect } from 'react';
import {
  getCourses,
  createCourse,
  editCourse,
  deleteCourse,
} from '../services/courses.service.js';
import { toast } from 'react-toastify';

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data.courses || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course) => {
    try {
      const { course: newCourse } = await createCourse(course);
      setCourses((prev) => [...prev, newCourse]);
      toast.success('Course added.');
    } catch (error) {
      toast.error(error.message);
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
          c.courseCode.toLowerCase() === courseCode.toLowerCase()
            ? updatedCourse
            : c
        )
      );
      toast.success('Course updated.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeCourse = async (courseCode) => {
    try {
      await deleteCourse(courseCode);
      setCourses((prev) =>
        prev.filter(
          (c) => c.courseCode.toLowerCase() !== courseCode.toLowerCase()
        )
      );
      toast.info('Course removed.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
