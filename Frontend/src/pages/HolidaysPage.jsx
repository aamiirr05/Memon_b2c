import { useEffect } from 'react';
import { useHolidayStore } from '../store/useHolidayStore';
import HolidayCard from '../components/HolidaysPage/HolidayCard';
import Sidebar from '../components/Sidebar';
import { useLocation } from 'react-router-dom';
import PackageCardSkeleton from '../components/PackagesPage/PackageCardSkeleton';

const HolidaysPage = () => {
  const { fetchHolidays, holidays, isFetching, fetchZiyarat } =
    useHolidayStore();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    switch (path) {
      case '/holidays':
        fetchHolidays();
        break;
      case '/ziyarat':
        fetchZiyarat();
        break;
      default:
        break;
    }
  }, [fetchHolidays, fetchZiyarat, path]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const imagesArray = [
    'https://res.cloudinary.com/memonb2c/image/upload/v1739891421/ec2a38dc668244f68c08f444451d4616_uyx15y.webp',
    'https://res.cloudinary.com/memonb2c/image/upload/v1739891296/64db55cbdc9a5377c129b1533856bdc8_vlnk3k.webp',
    'https://res.cloudinary.com/memonb2c/image/upload/v1739891931/81f0db8467ae5ded650017f0a5bd0b83_jvu8cg.jpg',
  ];

  return (
    <main className="bg-peach/10">
      <section>
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="pt-12 pb-8">
            <h1 className="font-serif lg:text-3xl sm:text-2xl font-semibold text-center text-darkgreen">
              <strong title="Indeed, the first House [of worship] established for mankind was that at Bakkah [Makkah], blessed and a guidance for the worlds. (Quran 3:96)">
                إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ
                مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ
              </strong>
            </h1>
            <h2 className="text-center sm:text-3xl lg:text-4xl text-lg text-darkgreen font-zodiak mt-4 mb-6">
              Explore Our Exclusive Ziyarat & Holiday Packages
            </h2>
          </div>

          <div className="pb-14 ">
            <div className=" flex gap-6 ">
              <Sidebar images={imagesArray} />

              <div className="flex flex-col gap-6 w-full">
                {isFetching ? (
                  Array(3)
                    .fill()
                    .map((_, index) => (
                      <div key={index}>
                        <PackageCardSkeleton />
                      </div>
                    ))
                ) : (
                  <>
                    {' '}
                    {holidays.map((pkg) => (
                      <HolidayCard key={pkg.package_id} pkg={pkg} />
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

export default HolidaysPage;
