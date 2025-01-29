import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHotelStore } from '../store/useHotelStore';
import ErrorPage from './ErrorPage';
import ShareButton from '../components/ShareButton';
import ImageGallery from '../components/HotelDetailPage/ImageGallery';
import TabComponent from '../components/TabComponent';
import Loader from '../components/Loader';
import DetailsTab from '../components/HotelDetailPage/Tabs/DetailsTab';
import AmenitiesTab from '../components/HotelDetailPage/Tabs/AmenitiesTab';
import RoomsTab from '../components/HotelDetailPage/Tabs/RoomsTab';
import TermsTab from '../components/HotelDetailPage/Tabs/TermsTab';
import CancellationTab from '../components/HotelDetailPage/Tabs/CancellationTab';

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const {
    selectedHotel,
    setSelectedHotel,
    fetchHotelById,
    isFetching,
    hotels,
  } = useHotelStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!selectedHotel || selectedHotel.hotel_id !== hotelId) {
      const hotel = hotels.find((h) => h.hotel_id === hotelId);
      if (hotel) {
        setSelectedHotel(hotel);
      } else {
        fetchHotelById(hotelId);
      }
    }
  }, [hotelId, selectedHotel, hotels, setSelectedHotel, fetchHotelById]);

  if (isFetching)
    return (
      <div className="w-screen h-[calc(100dvh-116px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  if (!isFetching && !selectedHotel) return <ErrorPage />;

  return (
    <main className="bg-peach/50">
      <section>
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-[70%,auto] py-12">
            <h1 className="text-4xl text-darkgreen font-medium flex-1">
              {selectedHotel.hotel_name}
            </h1>
            <ShareButton
              url={window.location.href}
              title={selectedHotel.hotel_name}
            />
          </div>

          <ImageGallery />

          <TabComponent
            tabs={[
              { title: 'Details', content: <DetailsTab /> },
              { title: 'Amenities', content: <AmenitiesTab /> },
              { title: 'Rooms & Prices', content: <RoomsTab /> },
              { title: 'Terms & Conditions', content: <TermsTab /> },
              { title: 'Cancellation Policy', content: <CancellationTab /> },
            ]}
          />
        </div>
      </section>
    </main>
  );
};

export default HotelDetailPage;
