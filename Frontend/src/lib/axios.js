import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://memon-b2c.onrender.com/api/v1',
  // baseURL: 'http://localhost:10000/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Attach Bearer token from localStorage as a fallback to cookies
// (some mobile browsers block cross-site SameSite=None cookies)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminAccessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

    const isAuthRoute =
      originalRequest.url.includes('/refresh-token') ||
      originalRequest.url.includes('/login') ||
      originalRequest.url.includes('/check-auth-admin') ||
      originalRequest.url.includes('/check-auth'); // user-side auth check too

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axiosInstance.post('/admin/refresh-token');
        const newToken = refreshRes.data?.data?.accessToken;
        if (newToken) {
          localStorage.setItem('adminAccessToken', newToken);
        }
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        localStorage.removeItem('adminAccessToken');
        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.includes('/login')
        ) {
          window.location.replace('/admin/login');
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
