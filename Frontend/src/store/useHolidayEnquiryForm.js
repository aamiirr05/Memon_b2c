import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useHolidayEnquiryForm = create((set) => ({
  isSubmitting: false,

  submit: async (data, closeModal) => {
    set({ isSubmitting: true });

    const prepareData = {
      fullname: data.fullName,
      contact: data.contact,
      email: data.email,
      nationality: data.nationality,
      preferreddate: data.preferredDate,
      numberofnights: data.numberOfNights,
      numberofadults: data.numberOfAdults,
      numberofchildren: data.numberOfChildren,
      childrenages: data.childrenAges,
      preferreddeparturecity: data.preferredDepartureCity,
    };

    console.log(prepareData);
    try {
      const res = await axiosInstance.post(
        '/users/enquiry/holiday',
        prepareData
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      set({ isSubmitting: false });
      closeModal();
    }
  },
}));
