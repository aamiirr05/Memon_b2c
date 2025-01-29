import { useHotelStore } from '../../../store/useHotelStore';

const DetailsTab = () => {
  const { selectedHotel } = useHotelStore();

  if (!selectedHotel) return <p>Loading...</p>;

  return (
    <div className="text-gray-800 space-y-4">
      <div>
        <span className="font-semibold text-darkgreen">Category: </span>
        <span>{selectedHotel.hotel_category || 'N/A'}</span>
      </div>
      <div>
        <span className="font-semibold text-darkgreen">Location: </span>
        <span>
          {selectedHotel.hotel_city}, {selectedHotel.hotel_country}
        </span>
      </div>
      <div>
        <span className="font-semibold text-darkgreen">Distance: </span>
        <span>{selectedHotel.hotel_distance || 'N/A'}</span>
      </div>
      <div>
        <span className="font-semibold text-darkgreen">Description: </span>
        <span>{selectedHotel.hotel_description || 'N/A'}</span>
      </div>
    </div>
  );
};

export default DetailsTab;
