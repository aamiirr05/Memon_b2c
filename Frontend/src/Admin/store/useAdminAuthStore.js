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

  login: async (data, navigate) => {
    set({ isAdminLoggingIn: true });
    try {
      const res = await axiosInstance.post('/admin/login', data, {
        withCredentials: true,
      });
      if (res.data) set({ AuthAdmin: res.data.data });
      toast.success(res.data.message);
      navigate('/admin/enquiry/umrah');
    } catch (error) {
      toast.error(error.response?.data.message);
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
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  refreshToken: async () => {
    try {
      const res = await axiosInstance.post('/admin/refresh-token');
      const { accessToken } = res.data;
      if (accessToken) {
        // Update access token in store and axios instance
        get().setAuthAdminAccessToken(accessToken);
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
      }
    } catch (error) {
      useAdminAuthStore.getState().logout();
      throw error;
    }
  },
}));

export default useAdminAuthStore;
