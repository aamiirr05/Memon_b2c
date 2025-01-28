import { create } from 'zustand';

const useVisaStore = create((set) => ({
  getVisa: [''],
  loading: true,
  isCreating: false,
  isUpdating: false,
  isModalOpen: false,

  setVisa: (visa) => set({ getVisa: visa }),
  setIsModalOpen: (status) => set({ isModalOpen: status }),
  setIsUpdating: (status) => set({ isUpdating: status }),
  setLoading: (status) => set({ loading: status }),
  setIsCreating: (status) => set({ isCreating: status }),

  bookingterms: [''],
  cancelpolicy: [''],
  termcondition: [''],
  basicReq: [''],
  docReq: [''],

  setBookingTerms: (terms) => set(() => ({ bookingterms: terms })),
  updateBookingTerms: (items) => {
    set({ bookingterms: items });
  },
  setCancelPolicy: (policy) => set(() => ({ cancelpolicy: policy })),
  updateCancelPolicy: (policies) => {
    set({ cancelpolicy: policies });
  },
  setTermCondition: (conditions) => set(() => ({ termcondition: conditions })),
  updateTermCondition: (con) => {
    set({ termcondition: con });
  },

  setBasicReq: (req) => set({ basicReq: req }),
  updateBasicReq: (req) => {
    set({ basicReq: req });
  },

  setdocReq: (req) => set({ docReq: req }),
  updateDocReq: (req) => {
    set({ docReq: req });
  },

  addBasicReq: () => set((state) => ({ basicReq: [...state.basicReq, ''] })),

  removeBasicReq: (index) =>
    set((state) => ({
      basicReq: state.basicReq.filter((_, i) => i !== index),
    })),

  addDocReq: () => set((state) => ({ docReq: [...state.docReq, ''] })),

  removeDocReq: (index) =>
    set((state) => ({
      docReq: state.docReq.filter((_, i) => i !== index),
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
}));

export default useVisaStore;
