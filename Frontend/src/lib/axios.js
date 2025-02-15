import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://memon-b2c.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

export default axiosInstance;
