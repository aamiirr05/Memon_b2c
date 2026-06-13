/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

const useAdminAuthStore = create((set, get) => ({
  AuthAdmin: null,
  isAdminLoggingIn: false,
  isAdminSigningIn: false,
  isCheckingAuth: false,

  setAuthAdminAccessToken: (accessToken) =>
    set((state) => ({
      AuthAdmin: { ...state.AuthAdmin, accessToken },
    })),

  login: async (data) => {
    set({ isAdminLoggingIn: true });
    try {
      const res = await axiosInstance.post('/admin/login', data, {
        withCredentials: true,
      });
      toast.success(res.data.message || 'OTP sent to your email');
      return true;
    } catch (error) {
      toast.error(error.response?.data.message);
      return false;
    } finally {
      set({ isAdminLoggingIn: false });
    }
  },

  verifyLoginOtp: async (data, navigate) => {
    set({ isAdminLoggingIn: true });
    try {
      const res = await axiosInstance.post('/admin/verify-login-otp', data, {
        withCredentials: true,
      });
      if (res.data) set({ AuthAdmin: res.data.data });
      if (res.data?.data?.accessToken) {
        localStorage.setItem('adminAccessToken', res.data.data.accessToken);
      }
      toast.success(res.data.message);
      navigate('/admin/enquiry/umrah');
      return true;
    } catch (error) {
      toast.error(error.response?.data.message);
      return false;
    } finally {
      set({ isAdminLoggingIn: false });
    }
  },

  checkAdminAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/admin/check-auth-admin');
      set({ AuthAdmin: res.data });
    } catch (error) {
      set({ AuthAdmin: null });
      localStorage.removeItem('adminAccessToken');
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  refreshToken: async () => {
    try {
      const res = await axiosInstance.post('/admin/refresh-token');
      const accessToken = res.data?.data?.accessToken;
      if (accessToken) {
        get().setAuthAdminAccessToken(accessToken);
        localStorage.setItem('adminAccessToken', accessToken);
      }
    } catch (error) {
      localStorage.removeItem('adminAccessToken');
      useAdminAuthStore.getState().logout?.();
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('adminAccessToken');
    set({ AuthAdmin: null });
  },
}));

export default useAdminAuthStore;
