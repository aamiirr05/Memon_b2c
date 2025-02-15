import { useState } from 'react';
import { usePackageStore } from '../../store/usePackageStore';

const Tab3 = () => {
  const [activeTab, setActiveTab] = useState('makkah');
  const { selectedPackage } = usePackageStore();

  const renderItineraryContent = (itineraryData) => {
    return (
      <ul className="space-y-4">
        {itineraryData.map((item, index) => (
          <li key={index} className="border-neutral-200 flex gap-4">
            <div className="bg-darkgreen/40 px-8 pt-5 pb-4 rounded-lg flex justify-center items-center flex-col border border-peach">
              <h3 className="text-lg font-semibold text-darkgreen leading-snug font-zodiak">
                Day
              </h3>
              <p className="text-center leading-tight text-lg text-darkgreen font-semibold font-zodiak">
                {index + 1}
              </p>
            </div>{' '}
            <div className="bg-peach/60 w-full rounded-lg flex items-center px-4 border border-dashed border-darkgreen">
              <p className="text-darkgreen text-lg sm:text-base font-jakarta">
                {item.activities}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full mt-8 pb-12">
      {/* Tab Headers */}
      <div className="flex gap-4 sm:gap-8 border-b border-darkgreen/10 mb-8 font-jakarta">
        <button
          className={`py-2 text-[15px] font-medium ${
            activeTab === 'makkah'
              ? 'border-b-2 border-darkgreen text-darkgreen font-bold'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('makkah')}
        >
          🕋 Makkah Itinerary
        </button>
        <button
          className={`py-2 text-[15px] font-medium ${
            activeTab === 'medina'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('medina')}
        >
          🌙 Medina Itinerary
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === 'makkah'
          ? renderItineraryContent(selectedPackage.makkah_itinerary)
          : renderItineraryContent(selectedPackage.medina_itinerary)}
      </div>
    </div>
  );
};

export default Tab3;
