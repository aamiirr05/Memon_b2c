import { MapPin, Star } from 'lucide-react';
import { useHotelStore } from '../../../store/useHotelStore';
import RoomsTab from './RoomsTab';
import { useState } from 'react';
import Modal from '../../Modal';
import HotelEnquiryForm from '../../HotelsPage/HotelEnquiryForm';

const DetailsTab = () => {
  const { selectedHotel } = useHotelStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-8 mb-4">
            {/* description */}
            <h2 className="text-2xl font-medium font-zodiak text-neutral-700 mt-4 mb-4">
              About the Hotel
            </h2>
            <p className="text-neutral-700 font-jakarta mb-6 text-lg">
              {selectedHotel.hotel_description}
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-medium font-zodiak text-neutral-700 mb-4">
                Pricing Details
              </h3>
              <RoomsTab />
            </div>
          </div>

          {/* Card */}
          <div className="py-4 mt-2 w-full md:w-1/3 font-jakarta">
            <div className="border-2 border-darkgreen/10 rounded-lg p-4">
              <div className="text-neutral-700 font-normal">
                <span className="flex gap-0.5 mb-2">
                  {new Array(selectedHotel.hotel_star)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill="#FFD700"
                        color="#FFD700"
                        className="-mb-2"
                      />
                    ))}
                </span>
                <p className="text-3xl font-semibold text-neutral-900">
                  {selectedHotel.hotel_name}{' '}
                  <i className="text-sm text-neutral-500 tracking-tight font-normal">
                    {selectedHotel.hotel_star} Star
                  </i>
                </p>
              </div>

              <div className="mt-2">
                <h1 className="text-xl text-darkgreen font-bold  inline-flex items-center gap-2">
                  <MapPin className="-mb-0.5" size={20} />{' '}
                  {selectedHotel.hotel_city}, {selectedHotel.hotel_country}
                </h1>
              </div>

              {/* Details Section */}
              <div className="grid grid-cols-2 my-4 text-neutral-700">
                <div>
                  <p className="text-neutral-500 text-[15px] leading-tight">
                    Meal Basis
                  </p>
                  <p className="font-medium text-xl">
                    {selectedHotel.meal_basis}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 text-[15px] leading-tight">
                    Category
                  </p>
                  <p className="font-medium text-xl">
                    {selectedHotel.hotel_category}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-neutral-500 text-[15px] leading-tight">
                  Distance
                </p>
                <p className="font-medium text-xl">
                  {selectedHotel.hotel_distance}
                </p>
              </div>

              {/* Booking Button */}
              <div className="w-full flex justify-center items-center mt-6">
                <button
                  onClick={openModal}
                  className="bg-darkgreen text-peach w-full py-2 px-4 rounded-lg hover:bg-darkgreen/80"
                >
                  Enquire Now
                </button>
              </div>
              <p className="text-sm mt-3 text-center text-neutral-600">
                We’ll get back to you shortly!
              </p>
            </div>
          </div>
        </div>
        {/* Google Map Location */}
        <div className="pb-12">
          <h2 className="text-2xl font-medium font-jakarta text-neutral-700 mb-4">
            Map Location
          </h2>
          {selectedHotel.hotel_location.startsWith(
            'https://www.google.com/maps'
          ) ? (
            <iframe
              src={selectedHotel.hotel_location}
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              className="w-full h-[300px] md:h-[350px] rounded-md border-2 border-dashed border-darkgreen"
              title="Hotel Location"
            ></iframe>
          ) : (
            <p className=" text-neutral-600">
              Map not available for this location.
            </p>
          )}
        </div>
      </div>

      {/* enquiry modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedHotel?.hotel_name}
      >
        <HotelEnquiryForm onClose={closeModal} />
      </Modal>
    </>
  );
};

export default DetailsTab;
