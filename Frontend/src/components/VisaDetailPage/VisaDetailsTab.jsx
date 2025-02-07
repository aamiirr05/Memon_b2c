import { MapPin } from 'lucide-react';
import Modal from '../../components/Modal';
import { useVisaStore } from '../../store/useVisaStore';
import { useState } from 'react';
import VisaEnquiryForm from './VisaEnquiryForm';

const VisaDetailsTab = () => {
  const { selectedVisa } = useVisaStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col md:flex-row pb-8 ">
        {/* description */}
        <div className="w-full md:w-2/3 pr-8 mb-4 ">
          <h2 className="text-2xl font-medium font-zodiak text-neutral-700 mt-4 mb-4">
            About the Visa
          </h2>
          <p className="text-neutral-700 font-jakarta mb-6">
            {selectedVisa.description}
          </p>
        </div>

        {/* Card */}
        <div className="py-4 w-full md:w-1/3 font-jakarta">
          <div className="h-full border-2 border-darkgreen/10 rounded-lg p-4">
            <div className="text-neutral-700 font-normal flex gap-2 items-center">
              <p className="text-3xl font-semibold text-neutral-900">
                INR {selectedVisa.price}.00{' '}
                <i className="text-sm text-neutral-500 tracking-tight font-normal">
                  {selectedVisa.validity}
                </i>
              </p>
            </div>

            <div>
              <h1 className="text-xl text-darkgreen font-bold mt-2 inline-flex items-center gap-2">
                <MapPin className="-mb-0.5" size={20} />{' '}
                {selectedVisa.visa_country}
              </h1>
            </div>

            <div className="grid grid-cols-2 space-y-4 my-4 text-neutral-700">
              <div>
                <p className="text-neutral-500 text-[15px] leading-tight">
                  Validity
                </p>
                <p className="font-medium text-xl">{selectedVisa.validity}</p>
              </div>
              <div className="!mt-0">
                <p className="text-neutral-500 text-[15px] leading-tight">
                  Stay Period
                </p>
                <p className="font-medium text-xl">{selectedVisa.validity}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-[15px] leading-tight">
                  Visa Type
                </p>
                <p className="font-medium text-xl">{selectedVisa.visa_type}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-[15px] leading-tight">
                  Entry Type
                </p>
                <p className="font-medium text-xl">
                  {' '}
                  {selectedVisa.entry === '1'
                    ? 'Single Entry'
                    : 'Multiple Entry'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-md font-semibold text-darkgreen">
                Processing time:{' '}
                <span className="text-neutral-700 font-normal text-[13px]">
                  {selectedVisa.processing_time}
                </span>
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
      {/* enquiry modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedVisa.visa_country + ' Visa'}
      >
        <VisaEnquiryForm
          onClose={closeModal}
          visaCountry={selectedVisa.visa_country}
          visaType={selectedVisa.visa_type}
        />
      </Modal>
    </>
  );
};

export default VisaDetailsTab;
