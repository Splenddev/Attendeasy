import axios from 'axios';
import { API_BASE } from '../utils/apiBaseUrl';

const COURSE_BASE_URL = `${API_BASE}courses/`;

export const getCourses = async () => {
  try {
    const res = await axios.get(`${COURSE_BASE_URL}my-courses`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Course fetching failed';
    throw new Error(message);
  }
};

export const createCourse = async (data) => {
  try {
    const res = await axios.post(`${COURSE_BASE_URL}add`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Course creation failed';
    throw new Error(message);
  }
};

export const editCourse = async (courseCode, data) => {
  try {
    const res = await axios.put(`${COURSE_BASE_URL}edit/${courseCode}`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Course editing failed';
    throw new Error(message);
  }
};

export const deleteCourse = async (courseCode) => {
  try {
    const res = await axios.delete(`${COURSE_BASE_URL}delete/${courseCode}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Course deletion failed';
    throw new Error(message);
  }
};
