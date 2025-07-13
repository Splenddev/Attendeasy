import axios from 'axios';
import { API_BASE } from '../utils/apiBaseUrl';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      const customError = new Error('No Internet Connection');
      customError.title = 'No Internet Connection';
      customError.code = 'NETWORK_ERROR';
      customError.message = 'Please check your network and try again.';
      return Promise.reject(customError);
    }

    if (err.response.status === 401) {
      const authError = new Error('Invalid or expired token');
      authError.title = 'Authentication Error';
      authError.code = 'TOKEN_EXPIRED';
      authError.message = 'Invalid or expired token. Please login again.';
      return Promise.reject(authError);
    }

    const apiError = new Error(err.response?.data?.message || 'Request Failed');
    apiError.title = 'Request Failed';
    apiError.code = err.response?.status || 'UNKNOWN';
    Object.assign(apiError, err.response?.data || {});
    return Promise.reject(apiError);
  }
);

export default api;
