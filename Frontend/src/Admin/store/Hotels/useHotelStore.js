import { create } from 'zustand';

const useHotelStore = create((set) => ({
  hotelPackages: [''],
  loading: true,
  isCreating: false,
  isUpdating: false,
  isModalOpen: false,

  setIsModalOpen: (status) => set({ isModalOpen: status }),
  setHotelPackages: (packages) => set({ hotelPackages: packages }),
  setIsUpdating: (status) => set({ isUpdating: status }),
  setLoading: (status) => set({ loading: status }),
  setIsCreating: (status) => set({ isCreating: status }),

  bookingterms: [''],
  cancelpolicy: [''],
  termcondition: [''],
  isActive: true,
  isFeatured: false,
  amenities: [''],

  handleisActive: () => {
    set((state) => ({
      isActive: !state.isActive,
    }));
  },
  handleisFeatured: () => {
    set((state) => ({
      isFeatured: !state.isFeatured,
    }));
  },

  updateIsActive: (val) => {
    set({ isActive: val });
  },
  updateIsFeatured: (val) => {
    set({ isFeatured: val });
  },
  setBookingTerms: (terms) => set(() => ({ bookingterms: terms })),
  updateBookingTerms: (items) => {
    set({ bookingterms: items });
  },
  setCancelPolicy: (policy) => set(() => ({ cancelpolicy: policy })),
  updateCancelPolicy: (policies) => {
    set({ cancelpolicy: policies });
  },
  setTermCondition: (conditions) => set(() => ({ termcondition: conditions })),
  updateTermsCondition: (con) => {
    set({ termcondition: con });
  },
  setAmenities: (amenities) => set(() => ({ amenities: amenities })),
  updateAmenities: (items) => {
    set({ amenities: items });
  },

  addBookingTerms: () =>
    set((state) => ({ bookingterms: [...state.bookingterms, ''] })),
  removeBookingTerms: (index) =>
    set((state) => ({
      bookingterms: state.bookingterms.filter((_, i) => i !== index),
    })),

  addTermsCondition: () =>
    set((state) => ({ termcondition: [...state.termcondition, ''] })),
  removeTermsCondition: (index) =>
    set((state) => ({
      termcondition: state.termcondition.filter((_, i) => i !== index),
    })),

  addPolicy: () =>
    set((state) => ({ cancelpolicy: [...state.cancelpolicy, ''] })),
  removePolicy: (index) =>
    set((state) => ({
      cancelpolicy: state.cancelpolicy.filter((_, i) => i !== index),
    })),

  addAmenities: () => set((state) => ({ amenities: [...state.amenities, ''] })),
  removeAmenities: (index) =>
    set((state) => ({
      amenities: state.amenities.filter((_, i) => i !== index),
    })),
}));

export default useHotelStore;
