import { create } from 'zustand';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

export const useForexFormStore = create((set) => ({
  isSubmitting: false,

  submit: async (data, navigate) => {
    set({ isSubmitting: true });
    try {
      const res = await axiosInstance.post('/users/enquiry/forex', data);
      toast.success(res.data.data.message);

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.data.message);
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
