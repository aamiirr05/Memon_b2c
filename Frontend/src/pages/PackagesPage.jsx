import Filter from '../components/PackagesPage/Filter';
import PackageCard from '../components/PackagesPage/PackageCard';
import { usePackageStore } from '../store/usePackageStore';

const PackagesPage = () => {
  const { packages } = usePackageStore();

  return (
    <main>
      <section>
        <div className="max-w-6xl mx-auto">
          <div className="pt-20">
            <h1 className="font-serif text-3xl font-semibold text-center text-darkgreen">
              <strong title="Indeed, the first House [of worship] established for mankind was that at Bakkah [Makkah], blessed and a guidance for the worlds. (Quran 3:96)">
                إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ
                مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ
              </strong>
            </h1>
            <h2 className="text-center text-4xl text-darkgreen font-zodiak my-6">
              Explore Our Exclusive <br /> Umrah & Hajj Packages
            </h2>
          </div>

          <div className="sticky top-0">
            <div className="flex ">
              <Filter />

              {/* listing all packages pkg = package; 'package' is a reserved word in strict mode. Modules are automatically in strict mode.*/}
              <div>
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackagesPage;
