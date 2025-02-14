import { usePackageStore } from '../../store/usePackageStore';

import { CalendarDays, MapPin, Star } from 'lucide-react';
import Modal from '../Modal';
// import UmrahEnquiryForm from '../PackagesPage/EnquiryForms/UmrahEnquiryForm';
import { useState } from 'react';
import { useHolidayStore } from '../../store/useHolidayStore';
import HolidayEnquiryForm from '../HolidaysPage/HolidayEnquiryForm';

const Tab1 = () => {
  const { selectedHoliday } = useHolidayStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col md:flex-row pb-8">
        <div className="w-full md:w-2/3 pr-8 mb-4">
          <div className="grid grid-cols-2 space-y-2 my-4 text-neutral-700">
            <div>
              <p className="text-neutral-700 text-xl leading-tight mb-4">
                Depature City
              </p>
              <p className="font-medium text-lg text-darkgreen">
                {selectedHoliday.departure_city}
              </p>
            </div>
            <div>
              <p className="text-neutral-700 text-lg leading-tight mb-4">
                Arrival City
              </p>
              <p className="font-medium text-xl text-darkgreen">
                {selectedHoliday.arrival_city}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-medium font-zodiak text-neutral-700 mb-4 mt-10">
              About The Destination
            </h2>
            <p className="text-neutral-700 font-jakarta tracking-tight mb-6">
              {selectedHoliday.description}
            </p>
          </div>
        </div>

        <div className="py-4 w-full md:w-1/3 font-jakarta">
          <div className="h-full border-2 border-darkgreen/10 rounded-lg p-4">
            {/* Pricing Section */}
            <div className="mb-6">
              <div className="text-neutral-700 font-normal flex gap-2 items-center">
                <p className="text-lg line-through text-neutral-500">
                  INR {selectedHoliday.base_price}.00
                </p>
                <p className="text-md text-green-700 font-medium">
                  INR {selectedHoliday.you_saved}.00 ({selectedHoliday.discount}
                  % off)
                </p>
              </div>

              <p className="text-3xl font-semibold text-neutral-900">
                INR {selectedHoliday.final_price}.00{' '}
                <i className="text-sm text-neutral-500 tracking-tight font-normal"></i>
              </p>
            </div>

            <div className="">
              <h1 className="text-xl text-darkgreen font-bold inline-flex items-center gap-2">
                <MapPin className="-mb-0.5" size={20} /> {selectedHoliday.city},{' '}
                {selectedHoliday.country}
              </h1>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-2 space-y-2 my-4 text-neutral-700">
              <div>
                <p className="text-neutral-500 text-[15px] leading-tight">
                  Total Day
                </p>
                <p className="font-medium text-xl">
                  {selectedHoliday.total_days}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 text-[15px] leading-tight">
                  Total Night
                </p>
                <p className="font-medium text-xl">
                  {selectedHoliday.total_nights}
                </p>
              </div>
            </div>

            {/* Group Dates Section */}
            <div className="my-4 mb-6">
              {selectedHoliday.group_dates.length > 1 ? (
                <>
                  <h3 className="text-neutral-500 mb-2">Group Dates</h3>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedHoliday.group_dates.map((date, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-darkgreen/10 text-darkgreen rounded-lg px-3 py-2 shadow-sm"
                      >
                        <span role="img" aria-label="calendar">
                          <CalendarDays size={18} />
                        </span>
                        <span className="font-medium tracking-tight">
                          {new Date(date).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center bg-darkgreen/10 border border-darkgreen/30 text-darkgreen rounded-lg px-4 py-3 shadow-sm">
                  <p className="text-lg font-medium">Exclusive Date</p>
                  <div className="flex items-center gap-2 mt-2 ">
                    <span role="img" aria-label="calendar">
                      <CalendarDays size={18} />
                    </span>
                    <span className="font-semibold ">
                      {new Date(
                        selectedHoliday.group_dates[0]
                      ).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2 text-center">
                    Hurry! Limited availability on this date.
                  </p>
                </div>
              )}
            </div>

            {/* Booking Button */}
            <div
              onClick={openModal}
              className="w-full flex justify-center items-center"
            >
              <button className="bg-darkgreen text-peach w-full py-2 px-4 rounded-lg hover:bg-darkgreen/80">
                Book Now
              </button>
            </div>
            <p className="text-sm mt-3 text-center text-neutral-600">
              Booking Deadline{' '}
              <span className="font-medium tracking-tight">
                {new Date(selectedHoliday.booking_deadline).toLocaleDateString(
                  'en-US',
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* enquiry modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedHoliday?.package_name}
      >
        <HolidayEnquiryForm
          onClose={closeModal}
          // packageName={selectedHoliday?.package_name}
          // packageType={selectedHoliday?.package_type}
        />
      </Modal>
    </>
  );
};

export default Tab1;
