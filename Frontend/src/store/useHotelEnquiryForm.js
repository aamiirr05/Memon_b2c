import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useHotelEnquiryFormStore = create((set) => ({
  isSubmitting: false,

  submit: async (data, closeModal) => {
    set({ isSubmitting: true });
    const prepareData = {
      fullname: data.fullName,
      contact: data.contactNumber,
      email: data.email,
      checkindate: data.checkInDate,
      checkoutdate: data.checkOutDate,
      numberofnights: data.numberOfNights,
      numberofrooms: data.numberOfRooms,
      roomtype: data.roomType,
      mealplan: data.mealPlan,
      numberofadults: data.numberOfAdults,
      numberofchildren: data.numberOfChildren,
      specialrequests: data.specialRequests || '',
    };

    try {
      console.log(prepareData);
      const res = await axiosInstance.post('/users/enquiry/hotel', prepareData);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      set({ isSubmitting: false });
      // closeModal();
    }
  },
}));
