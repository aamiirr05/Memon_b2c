/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import { usePackageStore } from '../../store/usePackageStore';
import { useState } from 'react';
import Modal from '../Modal';
import UmrahEnquiryForm from './EnquiryForms/UmrahEnquiryForm';

const PackageCard = ({ pkg }) => {
  const { setSelectedPackage } = usePackageStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col md:flex-row overflow-clip bg-darkgreen/10 rounded-xl shadow-md h-full font-jakarta ">
      {/* Image Section */}
      <div className="w-full md:w-[280px] h-48 md:h-auto flex-shrink-0">
        <img
          src={pkg?.package_image?.[0]?.secure_url || pkg?.package_image?.[1]?.secure_url || 'https://res.cloudinary.com/memonb2c/image/upload/v1739885803/rmf00msx8vhusevuc2iv.png'}
          alt={pkg?.package_name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-6 space-y-4 w-full ">
        <div>
          {/* Package Name and Category */}
          <Link
            to={`package-details/${pkg?.package_id}`}
            onClick={() => setSelectedPackage(pkg)}
            className="text-xl font-zodiak font-semibold text-darkgreen hover:text-darkgreen/90 hover:underline transition-colors line-clamp-1"
          >
            {pkg?.package_name}
          </Link>
          {/* Category and Sharing Rate */}
          {/* <p className="text-sm text-neutral-800">
            <strong>{pkg?.category}</strong> | <strong>{pkg?.basePrice}</strong>
          </p> */}
          {/* Package Duration */}
          <div className="flex ">
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
            <i className="text-neutral-600 text-[12px] font-normal tracking-tight">
              5 Sharing Basis
            </i>
          </p>
          <div className="flex gap-2">
            {/* View Details Button */}
            <Link
              to={`package-details/${pkg?.package_id}`}
              onClick={() => setSelectedPackage(pkg)}
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
        <UmrahEnquiryForm
          onClose={closeModal}
          packageName={pkg?.package_name}
          packageType={pkg?.package_type}
        />
      </Modal>
    </div>
  );
};

export default PackageCard;
