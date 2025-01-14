import { create } from 'zustand';

const useUmrahStore = create((set) => ({
  umrahPackages: [],
  loading: true,
  isChildLoading: false,
  isModalOpen: false,
  updateId: null,

  // Actions
  setUmrahPackages: (packages) => set({ umrahPackages: packages }),
  setLoading: (status) => set({ loading: status }),
  setIsChildLoading: (status) => set({ isChildLoading: status }),
  setIsModalOpen: (status) => set({ isModalOpen: status }),
}));

export default useUmrahStore;
