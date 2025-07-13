import api from './api'; // central axios instance with interceptors
const COURSE_BASE_URL = `courses/`;

// Fetch courses assigned to the current user
export const getCourses = async () => {
  const res = await api.get(`${COURSE_BASE_URL}my-courses`);
  return res.data;
};

// Create a new course
export const createCourse = async (data) => {
  const res = await api.post(`${COURSE_BASE_URL}add`, data);
  return res.data;
};

// Edit an existing course
export const editCourse = async (courseCode, data) => {
  const res = await api.put(`${COURSE_BASE_URL}edit/${courseCode}`, data);
  return res.data;
};

// Delete a course
export const deleteCourse = async (courseCode) => {
  const res = await api.delete(`${COURSE_BASE_URL}delete/${courseCode}`);
  return res.data;
};
