import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHotelStore } from '../store/useHotelStore';
import ErrorPage from './ErrorPage';
import ShareButton from '../components/ShareButton';
import ImageGallery from '../components/HotelDetailPage/ImageGallery';
import TabComponent from '../components/TabComponent';
import Loader from '../components/Loader';

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const {
    hotels,
    selectedHotel,
    setSelectedHotel,
    fetchHotelById,
    isFetching,
  } = useHotelStore();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  useEffect(() => {
    if (!selectedHotel || selectedHotel.hotel_id !== hotelId) {
      const hotel = hotels.find((h) => h.hotel_id === hotelId);

      if (hotel) {
        setSelectedHotel(hotel);
      } else {
        // fetchHotelById(hotelId);
      }
    }
  }, [hotelId, selectedHotel, hotels, setSelectedHotel]);

  if (isFetching)
    return (
      <div className="w-screen h-[calc(100dvh-116px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  if (!isFetching && selectedHotel === null) return <ErrorPage />;

  const pageUrl = window.location.href;
  const pageTitle = selectedHotel.hotel_name;

  return (
    <main className="bg-peach/50">
      <section>
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-[70%,auto] py-12">
            <h1 className="text-4xl text-darkgreen font-medium flex-1">
              {selectedHotel.hotel_name}
            </h1>
            <ShareButton url={pageUrl} title={pageTitle} />
          </div>
          <ImageGallery images={selectedHotel.hotel_images} />

          <TabComponent
            tabs={[
              {
                title: 'Details',
                content: (
                  <div className="text-gray-800 space-y-4">
                    <div>
                      <span className="font-semibold text-darkgreen">
                        Category:{' '}
                      </span>
                      <span>{selectedHotel.hotel_category}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-darkgreen">
                        Location:{' '}
                      </span>
                      <span>
                        {selectedHotel.hotel_city},{' '}
                        {selectedHotel.hotel_country}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-darkgreen">
                        Distance:{' '}
                      </span>
                      <span>{selectedHotel.hotel_distance}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-darkgreen">
                        Description:{' '}
                      </span>
                      <span>{selectedHotel.hotel_description}</span>
                    </div>
                  </div>
                ),
              },
              {
                title: 'Amenities',
                content: (
                  <ul>
                    {selectedHotel.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Rooms & Prices',
                content: (
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">
                          Room Type
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Price (USD)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedHotel.rooms.map((room) => (
                        <>
                          <tr key={`${room.room_id}-quintuple`}>
                            <td className="border border-gray-300 px-4 py-2">
                              Quintuple
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              ${room.quint_price}
                            </td>
                          </tr>
                          <tr key={`${room.room_id}-quadruple`}>
                            <td className="border border-gray-300 px-4 py-2">
                              Quadruple
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              ${room.quad_price}
                            </td>
                          </tr>
                          <tr key={`${room.room_id}-triple`}>
                            <td className="border border-gray-300 px-4 py-2">
                              Triple
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              ${room.triple_price}
                            </td>
                          </tr>
                          <tr key={`${room.room_id}-double`}>
                            <td className="border border-gray-300 px-4 py-2">
                              Double
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              ${room.double_price}
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                ),
              },
              {
                title: 'Terms & Conditions',
                content: (
                  <ul>
                    {selectedHotel.term_condition.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Cancellation Policy',
                content: (
                  <ul>
                    {selectedHotel.cancellation_policy.map((policy, index) => (
                      <li key={index}>{policy}</li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </section>
    </main>
  );
};

export default HotelDetailPage;
