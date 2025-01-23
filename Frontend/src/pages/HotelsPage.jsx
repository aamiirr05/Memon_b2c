import { useEffect } from 'react';
import Filter from '../components/PackagesPage/Filter';
import { useHotelStore } from '../store/useHotelStore';
import HotelCard from '../components/HotelsPage/HotelCard';
import HotelCardSkeleton from '../components/HotelsPage/HotelCardSkeleton';

const HotelsPage = () => {
  const { fetchHotels, isFetching, hotels, areHotelsFetched } = useHotelStore();
  useEffect(() => {
    if (!areHotelsFetched) {
      fetchHotels();
    }
  }, [fetchHotels]);

  return (
    <main className="bg-peach/50">
      <section>
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="pt-12 pb-8">
            <h2 className="text-center text-4xl text-darkgreen font-zodiak mt-4 mb-4">
              <span className="hidden md:inline">
                {' '}
                Discover Comfort and Convenience:{' '}
              </span>
              Our Handpicked Hotels for Umrah & Hajj Pilgrims
            </h2>
            <p className="text-center text-lg text-darkgreen mb-6">
              Stay Near the Holy Sites with Our Premium Hotel Options in Makkah
              & Madinah
            </p>
          </div>

          <div className="pb-14">
            <div className=" flex gap-6">
              <Filter />

              {/* list all hotels */}
              <div className="flex flex-col gap-6 w-full">
                {isFetching ? (
                  Array(3)
                    .fill()
                    .map((_, index) => <HotelCardSkeleton key={index} />)
                ) : (
                  <>
                    {' '}
                    {hotels.map((hotel) => (
                      <HotelCard key={hotel.hotel_id} hotel={hotel} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HotelsPage;
