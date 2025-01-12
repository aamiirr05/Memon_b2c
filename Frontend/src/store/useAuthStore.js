import { create } from 'zustand';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: false,
  isVerifyingOtp: false,

  setAuthUserAccessToken: (accessToken) =>
    set((state) => ({
      authUser: { ...state.authUser, accessToken },
    })),

  signup: async (data, navigate) => {
    set({ isSigningUp: true });
    const signupData = {
      salutation: data.salutation,
      firstname: data.fname,
      lastname: data.lname,
      email: data.email,
      contact: data.phone,
      password: data.password,
      confirmpassword: data.confpassword,
    };
    console.log(signupData);
    try {
      const res = await axiosInstance.post('/users/signup', signupData);

      set({ authUser: res.data.data });

      toast.success(res.data.message);
      setTimeout(() => {
        navigate('/verify');
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data, navigate) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/users/login', data);
      set({ authUser: res.data.data.user });
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/users/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/users/check-auth');
      set({ authUser: res.data.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  refreshToken: async () => {
    try {
      const res = await axiosInstance.post('/users/refresh-token');
      const { accessToken } = res.data;
      if (accessToken) {
        // Update access token in store and axios instance
        get().setAuthUserAccessToken(accessToken);
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
      }
    } catch (error) {
      useAuthStore.getState().logout();
      throw error;
    }
  },

  verifyOtp: async (data, navigate) => {
    console.log(data);
    set({ isVerifyingOtp: false });
    try {
      const res = await axiosInstance.post('/users/verify-otp', data);
      console.log(res.data);
      toast.success(res.data.message);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isVerifyingOtp: false });
    }
  },
}));

// // Axios interceptor for token refresh
// let refreshPromise = null;

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401 errors
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         if (!refreshPromise) {
//           // Start refresh process if not already in progress
//           refreshPromise = useAuthStore.getState().refreshToken();
//           await refreshPromise;
//           refreshPromise = null;
//         } else {
//           // Wait for the ongoing refresh process
//           await refreshPromise;
//         }

//         // Retry the original request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         useAuthStore.getState().logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
