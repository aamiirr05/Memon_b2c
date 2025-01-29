import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useVisaStore = create((set) => ({
  visas: [],
  isFetching: false,
  areVisasFetched: false,

  selectedVisa: null,
  setSelectedVisa: (selectedVisa) => set({ selectedVisa }),

  fetchVisas: async () => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get('/users/fetch-all-visas');
      set({ visas: res.data.data, areVisasFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetching: false });
    }
  },

  fetchVisaById: () => {},
}));
