import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const usePackageStore = create((set) => ({
  packages: [],
  isFetching: false,
  areUmrahPackagesFetched: false,
  areRamadanPackagesFetched: false,
  setPackages: (newPackages) => set({ packages: newPackages }),

  selectedPackage: null,
  setSelectedPackage: (selectedPkg) => set({ selectedPackage: selectedPkg }),

  fetchUmrahPackages: async () => {
    set({ isFetching: true });

    try {
      const res = await axiosInstance.get('/users/fetch-all-umrah-packages');
      set({ packages: res.data.data, areUmrahPackagesFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching packages:', error);
    } finally {
      set({ isFetching: false });
    }
  },

  fetchRamadanPackages: async () => {
    set({ isFetching: true });

    try {
      const res = await axiosInstance.get('/users/fetch-umrah-by-type/ramadan');
      set({ packages: res.data.data, areRamadanPackagesFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching packages:', error);
    } finally {
      set({ isFetching: false });
    }
  },

  fetchHajjPackages: async () => {
    set({ isFetching: true });

    try {
      const res = await axiosInstance.get('/users/fetch-umrah-by-type/hajj');
      set({ packages: res.data.data, areRamadanPackagesFetched: true });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching packages:', error);
    } finally {
      set({ isFetching: false });
    }
  },

  fetchPackageById: async (id) => {
    set({ isFetching: true });
    try {
      const res = await axiosInstance.get(`/users/fetch-umrah-packages/${id}`);
      set({ selectedPackage: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error fetching package by ID:', error);
    } finally {
      set({ isFetching: false });
    }
  },
}));
