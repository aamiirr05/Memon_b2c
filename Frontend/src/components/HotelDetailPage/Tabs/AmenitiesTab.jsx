import { useHotelStore } from '../../../store/useHotelStore';

const AmenitiesTab = () => {
  const { selectedHotel } = useHotelStore();

  if (!selectedHotel) return <p>Loading...</p>;

  return (
    <ul>
      {selectedHotel.amenities?.length ? (
        selectedHotel.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))
      ) : (
        <li>No amenities available</li>
      )}
    </ul>
  );
};

export default AmenitiesTab;
