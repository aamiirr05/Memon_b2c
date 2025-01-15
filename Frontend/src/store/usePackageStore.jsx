import { create } from 'zustand';

export const usePackageStore = create((set) => ({
  packages: [
    {
      id: 'PKG001',
      name: 'Majestic Dubai Experience',
      imageUrl: 'https://via.placeholder.com/150',
      type: 'Luxury Tour',
      description:
        'A 5-day tour of the beautiful city of Dubai, exploring modern marvels and traditional culture.',
      makkahItinerary: [
        'Visit to the Dubai Mall',
        'Burj Khalifa',
        'Desert safari',
      ],
      madinaItinerary: [
        'Visit the Grand Mosque',
        'Al Fahidi Fort',
        'Cultural evening',
      ],
      inclusions: [
        'Flights',
        'Accommodation',
        'City tours',
        'Meals',
        'Desert Safari',
      ],
      exclusions: [
        'Personal expenses',
        'Optional activities',
        'Travel insurance',
      ],
      groupDates: ['10th February - 15th February 2025'],
      bookingDeadline: '5th February 2025',
      totalDays: 5,
      totalNights: 4,
      makkahHotelName: 'Makkah Royal Hotel',
      makkahHotelImages: [
        {
          public_id: 'sik9yipfzmovivbjoqjs',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942819/sik9yipfzmovivbjoqjs.png',
        },
        {
          public_id: 'vroxodmm2vflrtoxqmy2',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942821/vroxodmm2vflrtoxqmy2.png',
        },
        {
          public_id: 'ufxjkrowtw3u0lpzcc9w',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942826/ufxjkrowtw3u0lpzcc9w.png',
        },
      ],
      medinaHotelName: 'Medina Oasis Hotel',
      medinaHotelImages: [
        {
          public_id: 'sik9yipfzmovivbjoqjs',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942819/sik9yipfzmovivbjoqjs.png',
        },
        {
          public_id: 'vroxodmm2vflrtoxqmy2',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942821/vroxodmm2vflrtoxqmy2.png',
        },
        {
          public_id: 'ufxjkrowtw3u0lpzcc9w',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942826/ufxjkrowtw3u0lpzcc9w.png',
        },
      ],
      cancellationPolicy: 'Free cancellation up to 48 hours before departure.',
      termsAndConditions: 'Non-refundable after the cancellation period.',
      bookingTerms: 'Booking must be confirmed with a 50% deposit.',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      finalPrice: 2500,
      basePrice: 2200,
      discount: 300,
      youSaved: 300,
      isActive: true,
    },
    {
      id: 'PKG002',
      name: 'Cultural Wonders of Egypt',
      imageUrl: 'https://via.placeholder.com/150',
      type: 'Cultural Heritage Tour',
      description:
        'Explore the ancient wonders of Egypt, from the Pyramids to the Sphinx, with expert guides.',
      makkahItinerary: [
        'Visit the Pyramids of Giza',
        'The Sphinx',
        'Egyptian Museum',
      ],
      madinaItinerary: [
        'Tour of Luxor Temple',
        'Karnak Temple',
        'Nile River Cruise',
      ],
      inclusions: [
        'Flights',
        'Accommodation',
        'Guided Tours',
        'Meals',
        'Nile Cruise',
      ],
      exclusions: [
        'Personal expenses',
        'Optional activities',
        'Travel insurance',
      ],
      groupDates: ['1st March - 7th March 2025'],
      bookingDeadline: '20th February 2025',
      totalDays: 7,
      totalNights: 6,
      makkahHotelName: 'Cairo Grand Hotel',
      makkahHotelImages: [
        {
          public_id: 'sik9yipfzmovivbjoqjs',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942819/sik9yipfzmovivbjoqjs.png',
        },
        {
          public_id: 'vroxodmm2vflrtoxqmy2',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942821/vroxodmm2vflrtoxqmy2.png',
        },
        {
          public_id: 'ufxjkrowtw3u0lpzcc9w',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942826/ufxjkrowtw3u0lpzcc9w.png',
        },
      ],
      medinaHotelName: 'Luxor Nile View Hotel',
      medinaHotelImages: [
        {
          public_id: 'sik9yipfzmovivbjoqjs',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942819/sik9yipfzmovivbjoqjs.png',
        },
        {
          public_id: 'vroxodmm2vflrtoxqmy2',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942821/vroxodmm2vflrtoxqmy2.png',
        },
        {
          public_id: 'ufxjkrowtw3u0lpzcc9w',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942826/ufxjkrowtw3u0lpzcc9w.png',
        },
      ],
      cancellationPolicy: 'Free cancellation up to 7 days before departure.',
      termsAndConditions: 'Non-refundable after the cancellation period.',
      bookingTerms:
        'Booking requires a 30% deposit and full payment 7 days before departure.',
      departureCity: 'London',
      arrivalCity: 'Cairo',
      finalPrice: 3500,
      basePrice: 3200,
      discount: 400,
      youSaved: 400,
      isActive: true,
    },
    {
      id: 'PKG003',
      name: 'Romantic Paris Getaway',
      imageUrl: 'https://via.placeholder.com/150',
      type: 'Romantic Escape',
      description:
        'A 4-day romantic escape to the city of love, Paris, with visits to iconic landmarks.',
      makkahItinerary: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
      madinaItinerary: [
        'Notre-Dame Cathedral',
        'Montmartre',
        'Evening in a Parisian café',
      ],
      inclusions: [
        'Flights',
        'Accommodation',
        'City tours',
        'Meals',
        'Seine River Cruise',
      ],
      exclusions: [
        'Personal expenses',
        'Optional activities',
        'Travel insurance',
      ],
      groupDates: ['20th April - 24th April 2025'],
      bookingDeadline: '10th April 2025',
      totalDays: 4,
      totalNights: 3,
      makkahHotelName: 'Le Meridien Paris',
      makkahHotelImages: [
        {
          public_id: 'sik9yipfzmovivbjoqjs',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942819/sik9yipfzmovivbjoqjs.png',
        },
        {
          public_id: 'vroxodmm2vflrtoxqmy2',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942821/vroxodmm2vflrtoxqmy2.png',
        },
        {
          public_id: 'ufxjkrowtw3u0lpzcc9w',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942826/ufxjkrowtw3u0lpzcc9w.png',
        },
      ],
      medinaHotelName: 'Hotel du Louvre',
      medinaHotelImages: [
        {
          public_id: 'sik9yipfzmovivbjoqjs',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942819/sik9yipfzmovivbjoqjs.png',
        },
        {
          public_id: 'vroxodmm2vflrtoxqmy2',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942821/vroxodmm2vflrtoxqmy2.png',
        },
        {
          public_id: 'ufxjkrowtw3u0lpzcc9w',
          secure_url:
            'https://res.cloudinary.com/memonb2c/image/upload/v1736942826/ufxjkrowtw3u0lpzcc9w.png',
        },
      ],
      cancellationPolicy: 'Free cancellation up to 72 hours before departure.',
      termsAndConditions: 'Non-refundable after the cancellation period.',
      bookingTerms:
        'A 20% non-refundable deposit is required at the time of booking.',
      departureCity: 'San Francisco',
      arrivalCity: 'Paris',
      finalPrice: 2000,
      basePrice: 1800,
      discount: 200,
      youSaved: 200,
      isActive: true,
    },
  ],
  setPackages: (newPackges) => set({ packages: newPackges }),

  selectedPackage: null,
  setSelectedPackage: (seletedPkg) => set({ selectedPackage: seletedPkg }),
}));
