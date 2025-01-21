import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useHotelStore = create((set) => ({
  hotels: [],
  isFetching: false,
  areHotelsFetched: false,

  selectedHotel: null,
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),

  fetchHotels: async () => {
    set({ isFetching: true });

    // artificial delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    try {
      const res = await axiosInstance.get('/users/fetch-all-hotels');
      set({ hotels: res.data.data, areHotelsFetched: true });
    } catch (error) {
      toast.error(error.response.data.message || 'Error while fetching hotels');
      console.log(error);
    } finally {
      set({ isFetching: false });
    }
  },
}));
