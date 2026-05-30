import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useUmrahEnquiryFormStore = create((set) => ({
  isSubmitting: false,

  submit: async (data, closeModal) => {
    set({ isSubmitting: true });
    const prepareData = {
      salutation: data.salutation,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      packagename: data.package_name,
      packagetype: data.package_type,
      totaladults: data.total_adults,
      totalchildren: data.total_children,
      totalinfants: data.total_infants,
      travellerdate: data.traveller_date,
      contact: data.contact,
    };
    try {
      const res = await axiosInstance.post('/users/enquiry/umrah', prepareData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      set({ isSubmitting: false });
      closeModal();
    }
  },
}));
