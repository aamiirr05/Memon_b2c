import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useContactForm = create((set) => ({
  isSubmitting: false,

  submit: async (data) => {
    set({ isSubmitting: true });

    const prepareData = {
      salutation: data.salutation,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      contact: data.contact,
      message: data.message,
    };

    console.log(prepareData);
    try {
      const res = await axiosInstance.post(
        '/users/enquiry/contact',
        prepareData
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
