import { create } from 'zustand';

const useHolidayStore = create((set) => ({
  holidayPackages: [''],
  loading: true,
  isCreating: false,
  isUpdating: false,
  isModalOpen: false,
  warning: false,
  categories: [],

  setWarning: (val) => set({ warning: val }),
  setCategories: (cat) => {
    set((state) => ({
      categories: [...state.categories, cat],
    }));
  },

  updateCategory: (cat) => {
    set({ categories: cat });
  },

  setIsModalOpen: (status) => set({ isModalOpen: status }),
  setHolidayPackages: (packages) => set({ holidayPackages: packages }),
  setIsUpdating: (status) => set({ isUpdating: status }),
  setLoading: (status) => set({ loading: status }),
  setIsCreating: (status) => set({ isCreating: status }),

  groupDates: [''],
  inclusion: [''],
  exclusion: [''],
  bookingterms: [''],
  cancelpolicy: [''],
  termcondition: [''],
  isActive: true,
  isFeatured: false,
  itenaries: [{ day: 'Day 1', itenary: '' }],

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

  addDates: () => {
    set((state) => ({
      groupDates: [...state.groupDates, ''],
    }));
  },
  removeDates: (val) =>
    set((state) => ({
      groupDates: state.groupDates.filter((_, i) => i !== val),
    })),
  setGroupDates: (dates) => set(() => ({ groupDates: dates })),
  updateGroupDates: (date) => {
    set(() => ({
      groupDates: date,
    }));
  },
  setInclusion: (inclusionList) => set(() => ({ inclusion: inclusionList })),
  updateInclusion: (inclusions) => {
    set({ inclusion: inclusions });
  },
  setExclusion: (exclusionList) => set(() => ({ exclusion: exclusionList })),
  updateExclusion: (exclusions) => {
    set({ exclusion: exclusions });
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
  setItenaries: (itenary) => set(() => ({ itenaries: itenary })),
  updateItenaries: (items) => {
    set({ itenaries: items });
  },

  addInclusion: () => set((state) => ({ inclusion: [...state.inclusion, ''] })),
  removeInclusion: (index) =>
    set((state) => ({
      inclusion: state.inclusion.filter((_, i) => i !== index),
    })),

  addExclusion: () => set((state) => ({ exclusion: [...state.exclusion, ''] })),
  removeExclusion: (index) =>
    set((state) => ({
      exclusion: state.exclusion.filter((_, i) => i !== index),
    })),

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

  addItenaries: () =>
    set((state) => {
      const newDay = {
        day: `Day ${state.itenaries.length + 1}`,
        itenary: '',
      };
      return { itenaries: [...state.itenaries, newDay] };
    }),
  removeItenaries: (index) =>
    set((state) => {
      const updatedItenaries = state.itenaries.filter((_, i) => i !== index);
      const reassignedItenaries = updatedItenaries.map((itenary, i) => ({
        ...itenary,
        day: `Day ${i + 1}`,
      }));
      return { itenaries: reassignedItenaries };
    }),
}));

export default useHolidayStore;
