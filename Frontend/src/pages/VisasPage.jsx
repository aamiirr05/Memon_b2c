import { useEffect, useState } from 'react';
import { useVisaStore } from '../store/useVisaStore';
import VisaCard from '../components/VisasPage/VisaCard';
import SearchableDropdown from '../components/VisasPage/SearchableDropdown';

const VisasPage = () => {
  const { visas, fetchVisas, areVisasFetched } = useVisaStore();
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

  return (
    <main className="bg-peach/50">
      <div className="pt-20 flex items-center flex-col">
        <h1 className="text-4xl text-center text-darkgreen font-semibold font-zodiak">
          Find Your Perfect Visa
        </h1>
        {/* Searchable Dropdown for selecting visa country */}
        <div className="mt-6 min-w-80">
          <SearchableDropdown
            options={uniqueCountries}
            selectedValue={selectedCountry}
            onSelect={handleSelectCountry}
          />
        </div>
      </div>

      {/* Display filtered visas */}
      <div className="flex gap-4 justify-center flex-wrap mt-12 pb-12">
        {filteredVisas.map((visa) => (
          <VisaCard key={visa.visa_id} visaData={visa} />
        ))}
      </div>
    </main>
  );
};

export default VisasPage;
