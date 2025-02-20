import { useState, useEffect } from 'react';
import { usePackageStore } from '../../store/usePackageStore';
import { Star } from 'lucide-react';

const Tab4 = () => {
  const { selectedPackage } = usePackageStore();
  const [activeTab, setActiveTab] = useState('makkah');
  const [selectedImages, setSelectedImages] = useState({});

  const getHotelDetails = (tab) => {
    return {
      hotelData:
        tab === 'makkah'
          ? selectedPackage.mak_hotel_name
          : selectedPackage.med_hotel_name,
      hotelImages:
        tab === 'makkah'
          ? selectedPackage.mak_hotel_images
          : selectedPackage.med_hotel_images,
      hotelLocation:
        tab === 'makkah'
          ? selectedPackage.mak_hotel_location
          : selectedPackage.med_hotel_location,
      hotelStar:
        tab === 'makkah'
          ? selectedPackage.mak_hotel_star
          : selectedPackage.med_hotel_star,
    };
  };

  const { hotelData, hotelImages, hotelLocation, hotelStar } =
    getHotelDetails(activeTab);

  // Automatically set first image when the tab changes
  useEffect(() => {
    if (hotelImages.length > 0 && !selectedImages[activeTab]) {
      setSelectedImages((prev) => ({
        ...prev,
        [activeTab]: hotelImages[0].secure_url,
      }));
    }
  }, [activeTab, hotelImages, selectedImages]);

  return (
    <div className="w-full mt-8 pb-12">
      {/* Tab Headers */}
      <div className="flex gap-4 sm:gap-8 border-b border-darkgreen/10 mb-8 font-jakarta">
        <button
          className={`py-2 text-[15px] font-medium ${activeTab === 'makkah' ? 'border-b-2 border-darkgreen text-darkgreen' : 'text-neutral-600'}`}
          onClick={() => setActiveTab('makkah')}
        >
          🕋 Makkah Hotel
        </button>
        <button
          className={`py-2 text-[15px] font-medium ${activeTab === 'medina' ? 'border-b-2 border-darkgreen text-darkgreen' : 'text-neutral-600'}`}
          onClick={() => setActiveTab('medina')}
        >
          🌙 Medina Hotel
        </button>
      </div>

      {/* Hotel Information */}
      <div className="space-y-6">
        {/* Hotel Name */}
        <h2 className="text-2xl sm:text-3xl font-bold font-zodiak text-darkgreen !mt-2">
          {hotelData}{' '}
          <i className="text-neutral-600 text-lg font-medium font-jakarta">
            ({hotelStar} Star)
          </i>
        </h2>

        {/* Hotel Star Rating */}
        <div className="flex items-center gap-2 !mt-2">
          {[...Array(hotelStar)].map((_, index) => (
            <span key={index} role="img" aria-label="star">
              <Star className="size-5" color="#FFD700" fill="#FFD700" />
            </span>
          ))}
        </div>

        {/* Hotel Image Layout */}
        <div className="my-6 flex flex-col md:flex-row gap-4">
          {/* Left: Large Image */}
          <div className="flex-1 transition-all">
            {selectedImages[activeTab] && (
              <img
                src={selectedImages[activeTab]}
                alt="Selected Hotel"
                className="w-full h-[250px] sm:h-[300px] md:h-[500px] object-cover rounded-md shadow-md ring-2 ring-darkgreen"
              />
            )}
          </div>

          {/* Right: Smaller Images */}
          <div
            className="flex flex-row md:flex-col gap-2 p-1 md:py-0.5 md:px-1.5 overflow-y-auto md:custom-scrollbar max-h-[500px]"
            data-lenis-prevent
          >
            {hotelImages.map((img) => (
              <img
                src={img.secure_url}
                key={img.secure_url}
                alt="Hotel thumbnail"
                className={`w-48 h-32 object-cover cursor-pointer rounded-md transition-all ${
                  selectedImages[activeTab] === img.secure_url
                    ? 'ring-2 ring-darkgreen'
                    : ''
                }`}
                onClick={() =>
                  setSelectedImages((prev) => ({
                    ...prev,
                    [activeTab]: img.secure_url,
                  }))
                }
              />
            ))}
          </div>
        </div>

        {/* Google Map Location */}
        <div className="pt-8">
          <h2 className="text-2xl font-medium font-jakarta text-neutral-700 mb-4">
            Map Location
          </h2>
          <iframe
            src={hotelLocation}
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-[300px] md:h-[350px] rounded-md border-2 border-dashed border-darkgreen"
            title="Hotel Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Tab4;
