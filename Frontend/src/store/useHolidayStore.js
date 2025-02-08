import { create } from 'zustand';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

export const useHolidayStore = create((set) => ({
  holidays: [],
  isFetching: false,
  areHolidaysFetched: false,

  setHolidays: (holiday) => set({ holidays: holiday }),

  selectedHoliday: null,
  setSelectedHoliday: (selectedHoli) => set({ selectedHoliday: selectedHoli }),

  fetchHolidays: async () => {
    set({ isFetching: true });

    try {
      const res = await axiosInstance.get('/users/fetch-all-holiday-packages');
      set({ holidays: res.data.data, areHolidaysFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching holidays:', error);
    } finally {
      set({ isFetching: false });
    }
  },

  fetchHolidayById: async (id) => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get(
        `/users/fetch-holiday-packages/${id}`
      );
      set({ selectedHoliday: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching holiday by ID:', error);
    } finally {
      set({ isFetching: false });
    }
  },

  fetchZiyarat: async () => {
    set({ isFetching: true });

    try {
      const res = await axiosInstance.get(
        '/users/fetch-holiday-by-type/ziyarat'
      );
      set({ holidays: res.data.data, areHolidaysFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching holidays:', error);
    } finally {
      set({ isFetching: false });
    }
  },
}));
