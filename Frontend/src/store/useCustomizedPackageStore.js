import { create } from 'zustand';

const useCustomizedPackageStore = create((set) => ({
  formData: {
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    booking_type: '',
    travel_class: '',
    makkah_hotel_name: '',
    medina_hotel_name: '',
    room_type: '',
    adults: 1,
    kids: 0,
    status: 'Pending',
    additional_info: '',
  },
  isSubmitting: false,

  // To update form data
  setFormData: (newData) =>
    set((state) => ({ formData: { ...state.formData, ...newData } })),

  // To reset the form
  resetForm: () =>
    set({
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        booking_type: '',
        travel_class: '',
        makkah_hotel_name: '',
        medina_hotel_name: '',
        room_type: '',
        adults: 1,
        kids: 0,
        status: 'Pending',
        additional_info: '',
      },
    }),

  // Simulate form submission
  submit: async (data, navigate) => {
    set({ isSubmitting: true });
    try {
      // Simulate an API call or some other async operation
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      set({ isSubmitting: false });
      // Handle navigation or any other logic after form submission
      navigate('/thank-you'); // Example route
    } catch (error) {
      set({ isSubmitting: false });
      console.error('Error submitting form:', error);
    }
  },
}));

export default useCustomizedPackageStore;
