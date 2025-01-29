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

  bookingterms : [  
    "All hotel bookings must be confirmed with full payment in advance.",  
    "Rates are subject to availability and may change without prior notice.",  
    "Guest names must match passport details; any changes may incur additional charges.",  
    "Check-in and check-out times vary by hotel and must be adhered to.",  
    "Any special requests (early check-in, late check-out, extra beds) are subject to hotel availability and additional charges.",  
    "Local tourism taxes, if applicable, must be paid directly at the hotel.",  
    "Hotels may require a security deposit at check-in, refundable upon check-out.",  
    "Visa services are separate from hotel bookings and must be arranged independently.",  
    "Room service is provided by the hotel and not by us."  
  ], 
  
  cancelpolicy : [  
    "Cancellation charges apply as per hotel policy and booking terms.",  
    "No-shows or last-minute cancellations may result in full booking charges.",  
    "Refunds, if applicable, will be processed within 15-30 working days.",  
    "Changes in travel dates are subject to hotel availability and additional fees.",  
    "Peak season and special event bookings may be non-refundable.",  
    "Early departures may not be eligible for refunds or adjustments."  
  ],  

  termcondition : [  
    "Hotel booking confirmation is subject to availability at the time of final payment.",  
    "Rates are based on standard room categories unless specified otherwise.",  
    "Hotels reserve the right to change room allocations based on availability.",  
    "Guests must comply with hotel policies regarding check-in, identification, and security deposits.",  
    "Memon Haj Umrah Tours and Travels is not responsible for any service lapses or disputes between the guest and the hotel.",  
    "Any additional services availed at the hotel (meals, transport, etc.) must be settled directly by the guest.",  
    "Hotel star ratings are as per local tourism standards and may vary from international classifications.",  
    "Guests are responsible for verifying local regulations regarding COVID-19 or other health requirements before check-in.",  
    "All rooms are fully air-conditioned; fans are not provided.",  
    "Rooms are equipped with Western-style toilets only."  
  ],

  isActive: true,
  isFeatured: false,
  
  amenities : [  
    "Fully air-conditioned rooms (no fans)",  
    "Western-style toilets in all rooms",  
    "Free Wi-Fi",    
    "24-hour front desk service",  
    "In-room safe",  
    "Flat-screen TV with satellite channels",   
    "Private bathroom with toiletries",   
    "Business center facilities",  
    "Luggage storage",  
    "Laundry and dry-cleaning services",  
    "Prayer room or nearby mosque access (for Saudi hotels)",  
    "Proximity to Haram (for Saudi hotels)",  
      
  ],

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
