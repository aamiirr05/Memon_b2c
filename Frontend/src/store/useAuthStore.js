import { create } from 'zustand';
import toast from 'react-hot-toast';

import axiosInstance from '../lib/axios';

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: false,

  signup: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
      console.log(data);
      const signupData = {
        salutation: data.salutation,
        firstname: data.fname,
        lastname: data.lastname,
        email: data.email,
        contact: data.phone,
        password: data.password,
        confirmpassword: data.confpassword,
      };

      const res = await axiosInstance.post('/users/signup', signupData);
      set({ authUser: res.data.data.user });

      toast.success(res.data.message);
      navigate('/verify');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post('/users/logout');
      set({ authUser: null });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.post('/users/');

      set({ authUser: res.data.data.user });
    } catch (error) {
      toast.success(error.response.message.data);
    }
  },
}));
