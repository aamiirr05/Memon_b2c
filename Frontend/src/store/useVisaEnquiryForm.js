import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useVisaEnquiryForm = create((set) => ({
  isSubmitting: false,

  submit: async (data, closeModal) => {
    set({ isSubmitting: true });

    try {
      const res = await axiosInstance.post('/users/enquiry/visa', data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      set({ isSubmitting: false });
      closeModal?.();
    }
  },
}));
