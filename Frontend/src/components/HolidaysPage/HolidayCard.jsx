import { Link } from 'react-router-dom';

import { useState } from 'react';
import Modal from '../Modal';
import { useHolidayStore } from '../../store/useHolidayStore';
import HolidayEnquiryForm from './HolidayEnquiryForm';
// import UmrahEnquiryForm from './EnquiryForms/UmrahEnquiryForm';

const HolidayCard = ({ pkg }) => {
  const { setSelectedHoliday } = useHolidayStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col md:flex-row bg-darkgreen/10 rounded-xl shadow-md overflow-hidden font-jakarta ">
      {/* Image Section */}
      <div className="w-full md:w-[40%] h-56 md:max-h-56 flex-shrink-0">
        <img
          src={`${pkg?.package_images?.[0]?.secure_url || ''}`}
          alt={pkg?.package_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-6 space-y-4 w-full ">
        <div>
          {/* Package Name and Category */}
          <Link
            to={`holiday-details/${pkg?.package_id}`}
            onClick={() => setSelectedHoliday(pkg)}
            className="text-xl font-zodiak font-semibold text-darkgreen hover:text-darkgreen/90 hover:underline transition-colors"
          >
            {pkg?.package_name}
          </Link>
          {/* Category and Sharing Rate */}
          {/* <p className="text-sm text-neutral-800">
            <strong>{pkg?.category}</strong> | <strong>{pkg?.basePrice}</strong>
          </p> */}
          {/* Package Duration */}
          <div className="flex">
            <p className="text-sm text-neutral-800 mt-4 mb-3 mr-3">
              <strong>{pkg?.total_days}</strong> Days
            </p>
            <p className="text-sm text-neutral-800 mt-4 mb-3">
              <strong>{pkg?.total_nights}</strong> Nights
            </p>
          </div>
          {/* Description */}
          <p className="text-neutral-600 text-sm leading-tight line-clamp-2 mt-1 font-medium">
            {pkg?.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <p className="text-xl font-bold text-darkgreen">
            INR {pkg?.final_price}/-{' '}
            {/* <i className="text-neutral-600 text-[12px] font-normal tracking-tight">
              5 Sharing Basis
            </i> */}
          </p>
          <div className="flex gap-2">
            {/* View Details Button */}
            <Link
              to={`holiday-details/${pkg?.package_id}`}
              onClick={() => setSelectedHoliday(pkg)}
              className="text-sm px-4 py-2 text-darkgreen border border-darkgreen rounded-md hover:bg-darkgreen/10 transition-colors"
            >
              View Details
            </Link>

            {/* Enquire Now Button */}

            <button
              onClick={openModal}
              className="px-4 py-2 bg-darkgreen text-peach border text-sm font-semibold rounded-md hover:bg-darkgreen/80 transition-colors"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* enquiry modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={pkg?.package_name}
      >
        <HolidayEnquiryForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default HolidayCard;
