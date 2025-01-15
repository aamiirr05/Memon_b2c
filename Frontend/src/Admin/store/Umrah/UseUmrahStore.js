import { create } from 'zustand';

const useUmrahStore = create((set) => ({
  umrahPackages: [],
  loading: true,
  isChildLoading: false,
  isUpdating: false,
  isModalOpen: false,
  updateId: null,

  // Actions
  setUmrahPackages: (packages) => set({ umrahPackages: packages }),
  setIsUpdating: (status) => set({ isUpdating: status }),
  setLoading: (status) => set({ loading: status }),
  setIsChildLoading: (status) => set({ isChildLoading: status }),
  setIsModalOpen: (status) => set({ isModalOpen: status }),
}));

export default useUmrahStore;
