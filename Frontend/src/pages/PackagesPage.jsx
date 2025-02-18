import { useEffect } from 'react';
// import Filter from '../components/PackagesPage/Filter';
import PackageCard from '../components/PackagesPage/PackageCard';
import { usePackageStore } from '../store/usePackageStore';
import PackageCardSkeleton from '../components/PackagesPage/PackageCardSkeleton';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const PackagesPage = () => {
  const {
    packages,
    fetchUmrahPackages,
    fetchRamadanPackages,
    isFetching,
    areUmrahPackagesFetched,
    // areRamadanPackagesFetched,
    fetchHajjPackages,
  } = usePackageStore();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    switch (path) {
      case '/umrah-packages':
        fetchUmrahPackages();
        break;
      case '/ramadan-2025':
        fetchRamadanPackages();
        break;
      case '/hajj-2025':
        fetchHajjPackages();
        break;
      default:
        break;
    }
  }, [
    fetchUmrahPackages,
    fetchRamadanPackages,
    areUmrahPackagesFetched,
    fetchHajjPackages,
    path,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const imagesArray = [
    'https://res.cloudinary.com/memonb2c/image/upload/v1739891494/d66bade93c0741463cb68f100b80321b_tmy3db.webp',
    'https://res.cloudinary.com/memonb2c/image/upload/v1739891540/59521a32d39ba43ac18a6b90704c28bd_wfcmfr.webp',
    'https://res.cloudinary.com/memonb2c/image/upload/v1739891581/4196e38a9f5bc91eb89856f601a7fdb9_x6mynn.webp',
    'https://res.cloudinary.com/memonb2c/image/upload/v1739891613/e3cecf0f2423c5eced925c08a8ca0e53_cwqrs7.webp',
  ];

  return (
    <main className="">
      <section>
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="pt-12 pb-8">
            <h1 className="font-jakarta lg:text-3xl sm:text-2xl text-md font-semibold text-center text-darkgreen">
              <strong title="Indeed, the first House [of worship] established for mankind was that at Bakkah [Makkah], blessed and a guidance for the worlds. (Quran 3:96)">
                إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ
                مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ
              </strong>
            </h1>
            <h2 className="text-center sm:text-3xl lg:text-4xl text-lg text-darkgreen font-zodiak mt-4 mb-6">
              Explore Our Exclusive Umrah & Hajj Packages
            </h2>
          </div>

          <div className="pb-14">
            <div className=" flex gap-6">
              <Sidebar images={imagesArray} />

              {/* listing all packages pkg = package; 'package' is a reserved word in strict mode. Modules are automatically in strict mode.*/}
              <div className="flex flex-col gap-6 w-full">
                {isFetching ? (
                  Array(3)
                    .fill()
                    .map((_, index) => <PackageCardSkeleton key={index} />)
                ) : (
                  <>
                    {' '}
                    {packages.map((pkg) => (
                      <PackageCard key={pkg.package_id} pkg={pkg} />
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

export default PackagesPage;
