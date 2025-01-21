import { create } from 'zustand';
import toast from 'react-hot-toast';

import axiosInstance from '../lib/axios';

const useCustomizedPackageStore = create((set) => ({
  isSubmitting: false,

  submit: async (data, navigate) => {
    set({ isSubmitting: true });
    try {
      const res = await axiosInstance.post(
        '/users/enquiry/customized-package',
        data
      );
      toast.success(res.data.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSubmitting: false });
    }
  },
}));

export default useCustomizedPackageStore;
