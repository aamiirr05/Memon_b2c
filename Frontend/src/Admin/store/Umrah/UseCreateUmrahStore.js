import { create } from 'zustand';

const useCreateUmrahStore = create((set) => ({
  groupDates: [''],
  inclusion: [
    'Welcome kit',
    'Visa with insurance',
    'Round-trip ticket (Direct flight)',
    'Transportation',
    'Accommodation',
    'Three times Indian-style buffet meals daily',
    'Ziyarat',
    'Laundry',
    '5L Zam Zam water',
  ],
  exclusion: [
    'Room service',
    'Private and personal transfers',
    'Extra luggage beyond what is mentioned on the ticket will be paid by the pilgrim',
    'No refund for unused services or shorter duration of stay',
    'Buckets and tubs will not be available in hotels',
    'Fans are not available in rooms, only air conditioning',
    'Indian toilets are not available, only English toilets',
    'Water is available only at the buffet, not in rooms',
  ],
  bookingterms: [
    'First payment: Rs. 20,000/- per person at the time of booking.',
    'Final payment: Balance amount to be paid 15 days before departure.',
    'Indian passport valid for at least 6 months with a minimum of 2 blank pages, two white-background photographs (size 4x6 cm), and a PAN card copy are required.',
  ],
  cancelpolicy: ['The package is 100% non-refundable.'],
  termcondition: [
    'Hotel distance may vary. Distances provided are from the outer border of Haram Shareef and Masjid-e-Nabvi. Hotel directions are Google-verified.',
    'Room allotment is as per hotel management; no room choice will be entertained.',
    'Room configurations in Makkah and Madina hotels are as follows: Double Room = 2 normal beds, Triple Room = 2 normal beds + 1 extra bed, Quad Room = 2 normal beds + 2 extra beds.',
    'Food will be provided on a full-board basis by the hotel management.',
    'No refund will be provided for unused services or shorter stays.',
    'In case a passenger tests positive for COVID-19, additional charges shall be borne by the pilgrim directly.',
    'Tour costs are based on the Saudi Riyal exchange rate @ Rs.23.00/. Any increase in rates at the time of passport delivery before tour departure will be collected from passengers.',
    'Flight schedules and itineraries are subject to change without prior notice.',
    'If you travel individually on dates or flights outside the group schedule, you will bear additional transportation charges as per your itinerary.',
    'We are not responsible for any luggage losses, injuries, damages, accidents, or additional expenses due to reasons including but not limited to flight delays, acts of God, deportation, Umrah visa expiry, theft, or personal injuries.',
    'Services, itineraries, and prices are subject to Saudi and Indian government regulations.',
    'Complimentary Zam Zam water will be provided only if accepted by the airlines at the airport.',
    'Arabic dates may change subject to moon sighting.',
    'Subject to BTQ (Basic Travel Quota) passengers.',
    'Subject to Mumbai jurisdiction only.',
    'Requirements: Indian passport valid for at least 6 months with a minimum of 2 blank pages, two white-background photographs (size 4x6 cm), and a PAN card copy.',
  ],
  meccaitenaries: [
    {
      day: 'Day 1',
      itenary: 'Arrival, check-in, and perform Umrah with an expert.',
    },
    {
      day: 'Day 2',
      itenary: 'Tawaf, offer Salah in Masjid Al-Haram, and earn rewards.',
    },
    {
      day: 'Day 3',
      itenary:
        'Ziyarat in Makkah (Jabal Al-Nour, Jabal Thawr, Mina, Arafat, etc.)',
    },
    { day: 'Day 4', itenary: 'Explore Makkah and engage in worship.' },
    {
      day: 'Day 5',
      itenary: 'Perform Umrah from Masjid Ayesha (Taneem) or Jorhana.',
    },
    { day: 'Day 6', itenary: 'Explore Makkah and focus on prayer.' },
    { day: 'Day 7', itenary: 'Check-out and travel to Medina.' },
  ],
  madinaitenaries: [
    {
      day: 'Day 1',
      itenary: 'Arrival, check-in, and offer Salaam at Masjid-e-Nabawi.',
    },
    {
      day: 'Day 2',
      itenary:
        'Medina Ziyarat (Masjid Quba, Masjid Qiblatain, Uhud, Jannat-ul-Baqi).',
    },
    { day: 'Day 3', itenary: 'Rawda visit (subject to permit availability)' },
    { day: 'Day 4', itenary: 'Explore Medina at leisure.' },
    { day: 'Day 5', itenary: 'Continue exploring and offer prayers.' },
    { day: 'Day 6', itenary: 'Devotion and exploration in Medina.' },
    { day: 'Day 7', itenary: 'Check-out and travel to Jeddah.' },
  ],

  setGroupDates: (dates) => set(() => ({ groupDates: dates })),
  setInclusion: (inclusionList) => set(() => ({ inclusion: inclusionList })),
  setExclusion: (exclusionList) => set(() => ({ exclusion: exclusionList })),
  setBookingTerms: (terms) => set(() => ({ bookingterms: terms })),
  setCancelPolicy: (policy) => set(() => ({ cancelpolicy: policy })),
  setTermCondition: (conditions) => set(() => ({ termcondition: conditions })),
  setMeccaItenaries: (itenaries) => set(() => ({ meccaitenaries: itenaries })),
  setMadinaItenaries: (itenaries) =>
    set(() => ({ madinaitenaries: itenaries })),
  setIsActive: (status) => set(() => ({ isActive: status })),
  setIsFeatured: (status) => set(() => ({ isFeatured: status })),

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

  addMeccaItenaries: () =>
    set((state) => {
      const newDay = {
        day: `Day ${state.meccaitenaries.length + 1}`,
        itenary: '',
      };
      return { meccaitenaries: [...state.meccaitenaries, newDay] };
    }),
  removeMeccaItenaries: (index) =>
    set((state) => {
      const updatedItenaries = state.meccaitenaries.filter(
        (_, i) => i !== index
      );
      const reassignedItenaries = updatedItenaries.map((itenary, i) => ({
        ...itenary,
        day: `Day ${i + 1}`,
      }));
      return { meccaitenaries: reassignedItenaries };
    }),

  addMadinaItenaries: () =>
    set((state) => {
      const newDay = {
        day: `Day ${state.madinaitenaries.length + 1}`,
        itenary: '',
      };
      return { madinaitenaries: [...state.madinaitenaries, newDay] };
    }),
  removeMadinaItenaries: (index) =>
    set((state) => {
      const updatedItenaries = state.madinaitenaries.filter(
        (_, i) => i !== index
      );
      const reassignedItenaries = updatedItenaries.map((itenary, i) => ({
        ...itenary,
        day: `Day ${i + 1}`,
      }));
      return { madinaitenaries: reassignedItenaries };
    }),
}));

export default useCreateUmrahStore;
