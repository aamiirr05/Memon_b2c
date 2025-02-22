import { useEffect, useState } from 'react';
import { useVisaStore } from '../store/useVisaStore';
import VisaCard from '../components/VisasPage/VisaCard';
import SearchableDropdown from '../components/VisasPage/SearchableDropdown';
import VisaCardSkeleton from '../components/VisasPage/VisaCardSkeleton';
import { Helmet } from 'react-helmet-async';

const VisasPage = () => {
  const { visas, isFetching, fetchVisas, areVisasFetched } = useVisaStore();
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    if (!areVisasFetched) {
      fetchVisas();
    }
  }, [fetchVisas, areVisasFetched]);

  // Filter visas based on selected country
  const filteredVisas = selectedCountry
    ? visas.filter((visa) => visa.visa_country === selectedCountry)
    : visas;

  // Get unique countries from the visas
  const uniqueCountries = [...new Set(visas.map((visa) => visa.visa_country))];

  // Handle selecting a country from the dropdown
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Visa</title>
        <meta name="description" content={`description`} />
        <meta property="og:title" content={`title`} />
        <meta property="og:description" content={`description`} />
        <meta property="og:image" content={`image`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <main className="bg-peach/10">
        <div className="pt-10 pb-10 flex items-center flex-col">
          <h1 className="sm:text-3xl lg:text-4xl text-lg pb-4 text-center text-darkgreen font-semibold font-zodiak">
            Find Your Perfect Visa
          </h1>
          {/* Searchable Dropdown for selecting visa country */}
          <div className="mt-6 min-w-80 ">
            <SearchableDropdown
              options={uniqueCountries}
              selectedValue={selectedCountry}
              onSelect={handleSelectCountry}
            />
          </div>
        </div>

        {/* Display filtered visas */}
        <div className="flex gap-4 justify-center flex-wrap mt-4 pb-12 transition-all">
          {isFetching ? (
            Array(4)
              .fill()
              .map((_, index) => <VisaCardSkeleton key={index} />)
          ) : (
            <>
              {filteredVisas.map((visa) => (
                <VisaCard key={visa.visa_id} visaData={visa} />
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default VisasPage;
