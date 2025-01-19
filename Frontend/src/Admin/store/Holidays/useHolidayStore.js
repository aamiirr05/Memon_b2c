import { create } from 'zustand';

const useHolidayStore = create((set) => ({
  holidayPackages: [''],
  previewData: [''],
  loading: true,

  setHolidayPackages: (packages) => set({ holidayPackages: packages }),
  setLoading: (status) => set({ loading: status }),

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
  setInclusion: (inclusionList) => set(() => ({ inclusion: inclusionList })),
  setExclusion: (exclusionList) => set(() => ({ exclusion: exclusionList })),
  setBookingTerms: (terms) => set(() => ({ bookingterms: terms })),
  setCancelPolicy: (policy) => set(() => ({ cancelpolicy: policy })),
  setTermCondition: (conditions) => set(() => ({ termcondition: conditions })),
  setItenaries: (itenary) => set(() => ({ itenaries: itenary })),

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
