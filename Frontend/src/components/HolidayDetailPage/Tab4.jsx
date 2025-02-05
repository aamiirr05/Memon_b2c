import { useState } from 'react';
import { usePackageStore } from '../../store/usePackageStore';
import { Star } from 'lucide-react';
import { useHolidayStore } from '../../store/useHolidayStore';

const Tab4 = () => {
  const { selectedHoliday } = useHolidayStore();
  const [selectedImage, setSelectedImage] = useState(
    selectedHoliday?.hotel_images?.[0]?.secure_url || null
  );

  if (!selectedHoliday) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full mt-8 pb-12">
      {/* Hotel Information */}
      <div className="space-y-6">
        {/* Hotel Name */}
        <h2 className="text-2xl sm:text-3xl font-bold font-zodiak text-darkgreen !mt-2">
          {selectedHoliday.hotel_name}{' '}
          <i className="text-neutral-600 text-lg font-medium font-jakarta">
            ({selectedHoliday.hotel_star} Star)
          </i>
        </h2>

        {/* Hotel Star Rating */}
        <div className="flex items-center gap-2 !mt-2">
          {[...Array(selectedHoliday.hotel_star)].map((_, index) => (
            <span key={index} role="img" aria-label="star">
              <Star className="size-5" color="#FFD700" fill="#FFD700" />
            </span>
          ))}
        </div>

        {/* Hotel Image Layout */}
        <div className="my-6 flex flex-col md:flex-row gap-4">
          {/* Large Image */}
          <div className="flex-1 transition-all">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Hotel"
                className="w-full h-[250px] sm:h-[300px] md:h-[500px] object-cover rounded-md shadow-md ring-2 ring-darkgreen"
              />
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="flex flex-row md:flex-col gap-2 p-1 md:py-0.5 md:px-1.5 overflow-y-auto md:custom-scrollbar max-h-[500px]">
            {selectedHoliday.hotel_images.map((img) => (
              <img
                src={img.secure_url}
                key={img.secure_url}
                alt="Hotel thumbnail"
                className={`w-48 h-32 object-cover cursor-pointer rounded-md transition-all ${
                  selectedImage === img.secure_url
                    ? 'ring-2 ring-darkgreen'
                    : ''
                }`}
                onClick={() => setSelectedImage(img.secure_url)}
              />
            ))}
          </div>
        </div>

        {/* Google Map Location */}
        {/* <div className="pt-8">
          <h2 className="text-2xl font-medium font-jakarta text-neutral-700 mb-4">
            Map Location
          </h2>
          <iframe
            src={selectedHoliday.hotel_location}
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-[300px] md:h-[350px] rounded-md border-2 border-dashed border-darkgreen"
            title="Hotel Location"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default Tab4;
