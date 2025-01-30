import { Gem, Handshake } from 'lucide-react';
import { useHotelStore } from '../../../store/useHotelStore';

const AmenitiesTab = () => {
  const { selectedHotel } = useHotelStore();

  if (!selectedHotel) return <p>Loading...</p>;

  return (
    <ul className="mt-4">
      {selectedHotel.amenities?.length ? (
        selectedHotel.amenities.map((amenity, index) => (
          <li key={index} className="flex items-start gap-4 mb-2">
            <div className="bg-darkgreen/40 text-darkgreen rounded-full p-1 mt-1">
              <Gem size={16} />
            </div>
            <span className="text-base text-neutral-700">{amenity}</span>
          </li>
        ))
      ) : (
        <li>No amenities available</li>
      )}
    </ul>
  );
};

export default AmenitiesTab;
