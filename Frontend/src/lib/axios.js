import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://memon-b2c.onrender.com/api/v1',
  // baseURL: 'http://localhost:10000/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Auto-refresh access token on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying and not the refresh/login route itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh-token') &&
      !originalRequest.url.includes('/login') &&
      !originalRequest.url.includes('/check-auth-admin')
    ) {
      if (isRefreshing) {
        // Queue the request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post('/admin/refresh-token');
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Refresh failed — redirect to login
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
