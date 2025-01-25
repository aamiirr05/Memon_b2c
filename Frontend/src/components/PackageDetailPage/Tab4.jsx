import { useState } from 'react';
import { usePackageStore } from '../../store/usePackageStore';
import CustomSlider from './CustomSlider'; // Import the CustomSlider component
import { MapPin, Star } from 'lucide-react';

const Tab4 = () => {
  const { selectedPackage } = usePackageStore();
  console.log(selectedPackage);
  const [activeTab, setActiveTab] = useState('makkah');

  const getHotelDetails = (tab) => {
    const hotelData =
      tab === 'makkah'
        ? selectedPackage.mak_hotel_name
        : selectedPackage.med_hotel_name;

    const hotelImages =
      tab === 'makkah'
        ? selectedPackage.mak_hotel_images
        : selectedPackage.med_hotel_images;

    const hotelLocation =
      tab === 'makkah'
        ? selectedPackage.mak_hotel_location
        : selectedPackage.med_hotel_location;

    const hotelStar =
      tab === 'makkah'
        ? selectedPackage.mak_hotel_star
        : selectedPackage.med_hotel_star;

    return { hotelData, hotelImages, hotelLocation, hotelStar };
  };

  const { hotelData, hotelImages, hotelLocation, hotelStar } =
    getHotelDetails(activeTab);

  return (
    <div className="w-full mt-8 pb-12">
      {/* Tab Headers */}
      <div className="flex gap-4 sm:gap-8 border-b border-darkgreen/10 mb-8">
        <button
          className={`py-2 text-[15px] font-medium ${
            activeTab === 'makkah'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('makkah')}
        >
          🕋 Makkah Hotel
        </button>
        <button
          className={`py-2 text-[15px] font-medium ${
            activeTab === 'medina'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('medina')}
        >
          🌙 Medina Hotel
        </button>
      </div>

      {/* Hotel Information */}
      <div className="space-y-6">
        {/* Hotel Star Rating */}
        <div className="flex items-center gap-2 !mt-2">
          {[...Array(hotelStar)].map((_, index) => (
            <span key={index} role="img" aria-label="star">
              <Star className="size-5" color="#FFD700 " fill="#FFD700 " />
            </span>
          ))}
        </div>

        {/* Hotel Name */}
        <h2 className="text-2xl sm:text-3xl font-bold text-darkgreen !mt-2">
          {hotelData}{' '}
          <i className="text-neutral-600 text-lg font-medium">
            ({hotelStar} Star)
          </i>
        </h2>

        {/* Hotel Image Slider */}
        <div className="my-6">
          <CustomSlider images={hotelImages} />
        </div>

        {/* Google Map Location */}
        <div className="pt-12">
          <h2 className="text-2xl font-medium text-neutral-700 mb-4">
            Map Location
          </h2>
          <iframe
            src={hotelLocation}
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-[300px] rounded-md"
            title="Hotel Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Tab4;
