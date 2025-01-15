const PackagesPage = () => {
  return (
    <div>
      <pre>{JSON.stringify(packages, null, 2)}</pre>
    </div>
  );
};

export default PackagesPage;

const packages = [
  {
    id: 'PKG001',
    name: 'Majestic Dubai Experience',
    imageUrl: 'https://via.placeholder.com/150',
    type: 'Luxury Tour',
    description:
      'A 5-day tour of the beautiful city of Dubai, exploring modern marvels and traditional culture.',
    makkahItinerary:
      'Visit to the Dubai Mall, Burj Khalifa, and desert safari.',
    madinaItinerary:
      'Visit the Grand Mosque, Al Fahidi Fort, and a cultural evening.',
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
    groupDates: '10th February - 15th February 2025',
    bookingDeadline: '5th February 2025',
    totalDays: 5,
    totalNights: 4,
    makkahHotel: {
      name: 'Makkah Royal Hotel',
      imageUrl: 'https://via.placeholder.com/150',
    },
    medinaHotel: {
      name: 'Medina Oasis Hotel',
      imageUrl: 'https://via.placeholder.com/150',
    },
    cancellationPolicy: 'Free cancellation up to 48 hours before departure.',
    termsAndConditions: 'Non-refundable after the cancellation period.',
    bookingTerms: 'Booking must be confirmed with a 50% deposit.',
    departureCity: 'New York',
    arrivalCity: 'Dubai',
    isActive: true,
  },
  {
    id: 'PKG002',
    name: 'Cultural Wonders of Egypt',
    imageUrl: 'https://via.placeholder.com/150',
    type: 'Cultural Heritage Tour',
    description:
      'Explore the ancient wonders of Egypt, from the Pyramids to the Sphinx, with expert guides.',
    makkahItinerary:
      'Visit to the Pyramids of Giza, the Sphinx, and Egyptian Museum.',
    madinaItinerary:
      'Tour of Luxor Temple, Karnak Temple, and Nile River Cruise.',
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
    groupDates: '1st March - 7th March 2025',
    bookingDeadline: '20th February 2025',
    totalDays: 7,
    totalNights: 6,
    makkahHotel: {
      name: 'Cairo Grand Hotel',
      imageUrl: 'https://via.placeholder.com/150',
    },
    medinaHotel: {
      name: 'Luxor Nile View Hotel',
      imageUrl: 'https://via.placeholder.com/150',
    },
    cancellationPolicy: 'Free cancellation up to 7 days before departure.',
    termsAndConditions: 'Non-refundable after the cancellation period.',
    bookingTerms:
      'Booking requires a 30% deposit and full payment 7 days before departure.',
    departureCity: 'London',
    arrivalCity: 'Cairo',
    isActive: true,
  },
  {
    id: 'PKG003',
    name: 'Romantic Paris Getaway',
    imageUrl: 'https://via.placeholder.com/150',
    type: 'Romantic Escape',
    description:
      'A 4-day romantic escape to the city of love, Paris, with visits to iconic landmarks.',
    makkahItinerary: 'Eiffel Tower, Louvre Museum, Seine River Cruise.',
    madinaItinerary:
      'Notre-Dame Cathedral, Montmartre, and evening in a Parisian café.',
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
    groupDates: '20th April - 24th April 2025',
    bookingDeadline: '10th April 2025',
    totalDays: 4,
    totalNights: 3,
    makkahHotel: {
      name: 'Le Meridien Paris',
      imageUrl: 'https://via.placeholder.com/150',
    },
    medinaHotel: {
      name: 'Hotel du Louvre',
      imageUrl: 'https://via.placeholder.com/150',
    },
    cancellationPolicy: 'Free cancellation up to 72 hours before departure.',
    termsAndConditions: 'Non-refundable after the cancellation period.',
    bookingTerms:
      'A 20% non-refundable deposit is required at the time of booking.',
    departureCity: 'San Francisco',
    arrivalCity: 'Paris',
    isActive: true,
  },
];
