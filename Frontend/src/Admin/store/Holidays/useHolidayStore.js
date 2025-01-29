import { create } from 'zustand';

const useHolidayStore = create((set) => ({
  holidayPackages: [''],
  loading: true,
  isCreating: false,
  isUpdating: false,
  isModalOpen: false,
  categories: [],

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
  inclusion : [  
    "Accommodation as per the itinerary.",  
    "Visa assistance (where applicable).",  
    "Airport transfers (private & personal).",  
    "Meals as mentioned in the itinerary.",  
    "Sightseeing as per the itinerary.",    
    "Private and personal transfers for sightseeing and travel within the destination.",  
    "Air ticket available on request."  
  ],
  exclusion: ["Room service charges.",  
  "Any meals not mentioned in the itinerary.",  
  "Anything not specifically mentioned in the inclusions.", 
  "GST and TCS", 
  "Personal expenses such as shopping, tips, etc.",  
  "Travel insurance (unless specified).",  
  "Visa fees (unless explicitly included in the package).",  
  "Airport taxes, baggage fees, and any additional charges levied by airlines or hotels.",  
  "Additional excursions or activities not included in the itinerary.",  
  "Early check-in/late check-out charges."
],
  bookingterms : [  
    "Payment schedule depends on destination, time of booking, inclusions, airline and hotel payment policy; it is specific to your package booking.",  
    "Payment schedule will be part of our proposal to you for the package.",  
    "If payment is not made as per the schedule provided in the first booking confirmation email, Memon Haj Umrah Tours and Travels reserves the right to cancel the booking after attempting to get in touch with you. Refunds would be as per the package cancellation policy.",  
    "All bookings are subject to availability at the time of confirmation.",  
    "Booking confirmations will only be processed after receiving the full or agreed advance payment.",  
    "Prices are subject to change due to fluctuations in exchange rates, airline fares, and other external factors.",  
    "Travel insurance is recommended and should be arranged by the traveler.",  
    "Special requests (such as room preferences, meals, etc.) are subject to availability and additional charges.",  
    "All travelers must ensure they meet visa and passport requirements for their destination."  
  ],
  
  cancelpolicy : [  
    "Once booking is received: INR 5000 (Per PAX) + actual ticket cancellation + hotel cancellation as per hotel policy + visa fee if visa is applied.",  
    "60 – 45 days prior to departure: 25% of land cost + INR 5000 (Per PAX) + actual ticket cancellation + visa fee if visa is applied.",  
    "45 – 30 days prior to departure: 50% of land cost + INR 5000 (Per PAX) + actual ticket cancellation + visa fee if visa is applied.",  
    "30 – 10 days prior to departure: 75% of land cost + INR 5000 (Per PAX) + actual ticket cancellation + visa fee if visa is applied.",  
    "Within 10 days of departure: 100% cancellation fee applies (no refund).",  
    "Refunds, if applicable, will be processed within 15-30 working days.",  
    "No refunds will be provided for no-shows or unused services.",  
    "Cancellations due to force majeure (natural disasters, political instability, airline strikes) will be subject to supplier policies and may result in rescheduling instead of refunds.",  
    "In case of partial cancellations, refunds will be as per supplier policies and applicable deductions.",  
    "Travelers are responsible for checking cancellation terms before booking."  
  ],  
  
  termcondition : [  
    "In case the client wishes to prepone/postpone their travel dates, they must inform us at least 15 days prior to the journey date via email/SMS.",  
    "Customers can prepone/postpone their tour once without additional charges if intimated at least 15 days before travel. Any subsequent changes will attract additional charges.",  
    "Some service providers (hotels, transporters, airlines, etc.) may impose additional charges for rescheduling, which will be deducted from the advance payment.",  
    "All prepone or postpone scenarios are subject to hotel/transport availability and seasonal price changes.",  
    "No changes to travel plans will be accepted within 15 days of the departure date unless caused by unforeseen circumstances such as climatic conditions or strikes.",  
    "In case of postponement due to unavoidable reasons, the advance payment will be valid for up to 1 year from the original booking date.",  
    "Advance payments and invoice numbers are transferable, allowing customers to transfer their booking to relatives or friends, provided all terms and conditions are met.",  
    "Travelers are responsible for ensuring they meet all visa, passport, and health requirements for their destination.",  
    "Memon Haj Umrah Tours and Travels is not responsible for any denial of services due to visa rejection or failure to meet entry requirements.",  
    "All disputes shall be subject to jurisdiction as per company policy."  
  ], 
  isActive: true,
  isFeatured: false,
  itenaries: [{ day: 'Day 1', itenary: 'Arrival at destination. Meet and greet at the airport. Transfer to hotel. Check-in and relax. Evening free for leisure activities. Overnight stay at the hotel.' },
    { day: 'Day 2', itenary: 'Breakfast at the hotel. Full-day sightseeing tour of the city. Visit popular attractions such as museums, parks, and historical landmarks. Evening at leisure. Overnight stay at the hotel.' },
    { day: 'Day 3', itenary: 'Breakfast at the hotel. Visit cultural landmarks, temples, or local markets. Optional activities such as a cooking class or local experience. Overnight stay at the hotel.' },
    { day: 'Day 4', itenary: 'Breakfast at the hotel. Day trip to a nearby tourist destination or natural site (e.g., mountains, beach, wildlife reserve). Packed lunch provided. Return to hotel for overnight stay.' },
    { day: 'Day 5', itenary: 'Breakfast at the hotel. Explore a local village or town. Enjoy an authentic cultural experience. Afternoon at leisure. Optional activities like shopping or spa treatment. Overnight stay at the hotel.' },
    { day: 'Day 6', itenary: 'Breakfast at the hotel. Visit a local market for souvenirs. Afternoon at leisure for personal activities. Evening dinner at a local restaurant. Overnight stay at the hotel.' },
    { day: 'Day 7', itenary: 'Breakfast at the hotel. Visit to a scenic or historical site. Optional activities like hiking, boating, or visiting local attractions. Return to hotel for overnight stay.' },
    { day: 'Day 8', itenary: 'Breakfast at the hotel. Full-day excursion to nearby landmarks or nature reserve. Explore the beauty of the destination with activities like photography, bird-watching, or nature walks. Overnight stay at the hotel.' },
    { day: 'Day 9', itenary: 'Breakfast at the hotel. Leisure day for shopping, optional tours, or relaxation. Final opportunity to enjoy the local culture or cuisine. Farewell dinner at a local restaurant. Overnight stay at the hotel.' },
    { day: 'Day 10', itenary: 'Breakfast at the hotel. Check-out and transfer to the airport for return flight. End of the holiday package.' }
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
