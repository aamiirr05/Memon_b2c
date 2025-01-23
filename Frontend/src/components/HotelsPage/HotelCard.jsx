import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHotelStore } from '../../store/useHotelStore';

const HotelCard = ({ hotel }) => {
  const { setSelectedHotel } = useHotelStore();
  // Get the lowest price from the available room prices
  const lowestPrice = Math.min(
    parseFloat(hotel.rooms[0].double_price),
    parseFloat(hotel.rooms[0].triple_price),
    parseFloat(hotel.rooms[0].quad_price),
    parseFloat(hotel.rooms[0].quint_price)
  );

  return (
    <div className="flex flex-col md:flex-row  gap-2 md:gap-4 h-auto rounded-xl overflow-hidden shadow-lg">
      {/* Hotel image */}
      <div className="h-56 md:h-full w-full md:w-72 flex-shrink-0">
        <img
          src={hotel.hotel_images[0].secure_url}
          alt={hotel.hotel_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hotel details */}
      <div className="py-4 px-4 flex flex-col justify-between w-full">
        <div>
          <div className="flex gap-1 mb-2">
            {/* Hotel star rating */}
            {Array(+hotel.star)
              .fill(null)
              .map((_, index) => (
                <span key={index}>
                  <Star size={16} fill="#386641" color="#386641" />
                </span>
              ))}
          </div>

          {/* Hotel name and location */}
          <Link
            to={`hotel-details/${hotel.hotel_id}`}
            onClick={() => setSelectedHotel(hotel)}
            className="text-xl font-semibold text-darkgreen hover:underline"
          >
            {hotel.hotel_name}
          </Link>
          <p className="text-sm text-neutral-500">
            {hotel.hotel_city}, {hotel.hotel_country}
          </p>

          {/* Hotel description */}
          <p className="mt-2 text-neutral-800">{hotel.hotel_description}</p>
        </div>

        <div className="flex justify-between items-end w-full">
          {/* Price starting from */}
          <div className="mt-4 w-3/4 md:w-1/2">
            <p className="text-sm text-neutral-600 leading-tight">
              Starting from:
            </p>
            <p className="text-xl font-medium text-neutral-800 flex justify-start items-start">
              <span className="text-sm leading-loose"> ₹</span>
              {lowestPrice}
            </p>
          </div>
          {/* View More Button */}
          <div className="md:mt-4 w-full md:w-auto flex justify-end md:justify-normal">
            <Link
              to={`hotel-details/${hotel.hotel_id}`}
              onClick={() => setSelectedHotel(hotel)}
              className="text-peach bg-darkgreen px-4 py-2 rounded-md hover:bg-darkgreen/80 transition-colors text-sm md:w-auto"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
