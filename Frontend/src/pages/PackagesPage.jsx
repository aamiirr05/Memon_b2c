import { useEffect } from 'react';
import Filter from '../components/PackagesPage/Filter';
import PackageCard from '../components/PackagesPage/PackageCard';
import { usePackageStore } from '../store/usePackageStore';
import PackageCardSkeleton from '../components/PackagesPage/PackageCardSkeleton';

const PackagesPage = () => {
  const { packages, fetchPackages, isFetching, arePackagesFetched } =
    usePackageStore();

  useEffect(() => {
    if (!arePackagesFetched) {
      fetchPackages();
    }
  }, [fetchPackages, arePackagesFetched]);

  return (
    <main className="bg-peach/50">
      <section>
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="pt-12 pb-8">
            <h1 className="font-serif text-3xl font-semibold text-center text-darkgreen">
              <strong title="Indeed, the first House [of worship] established for mankind was that at Bakkah [Makkah], blessed and a guidance for the worlds. (Quran 3:96)">
                إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ
                مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ
              </strong>
            </h1>
            <h2 className="text-center text-4xl text-darkgreen font-zodiak mt-4 mb-6">
              Explore Our Exclusive Umrah & Hajj Packages
            </h2>
          </div>

          <div className="pb-14">
            <div className=" flex gap-6">
              <Filter />

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
