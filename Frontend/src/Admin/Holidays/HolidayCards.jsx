/* eslint-disable react/prop-types */
import { ChevronDown, Pencil, Trash2, X } from 'lucide-react';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';
import trash from '../../assets/img/trash.png';
import { NavLink } from 'react-router-dom';
import useHolidayStore from '../store/Holidays/useHolidayStore';
import { useState } from 'react';

const ViewPackageDetails = ({ isOpen, onClose, selectedPackage }) => {
  const [openSection, setOpenSection] = useState(null);
  const isActive = selectedPackage?.is_active === 'true';
  const isFeatured = selectedPackage?.featured === 'true';

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  if (!isOpen || !selectedPackage) return null;

  return (
    <div
      className="fixed -right-5 -top-5 w-full xl:w-2/3 z-50 flex items-start justify-center rounded-lg"
      onClick={onClose}
    >
      <div
        className="bg-[#F8F5EB] rounded-2xl shadow-2xl w-full max-w-5xl mx-auto p-6 blur-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute md:top-8 md:left-8 text-darkgreen"
        >
          <X size={24} />
        </button>

        {/* Header Section */}
        <div className="flex justify-end gap-5 flex-col lg:flex-row items-end lg:items-center border-b border-opacity-50 border-darkgreen pb-5 mt-10 md:mt-0">
          <h4 className="font-semibold font-jakarta">
            {selectedPackage?.package_id || 'Loading...'}
          </h4>
          <div className="flex lg:items-center justify-center gap-4">
            <h2
              className={`
               font-bold gap-2 p-1 rounded-lg px-5 flex items-center justify-center font-zodiak

              ${isActive ? 'bg-emerald-100 text-emerald-600 border border-emerald-600' : 'bg-red-100 text-red-600 border border-red-600'}
              
              `}
            >
              <div
                className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-red-600'}`}
              ></div>
              {isActive ? 'Active' : 'Not Active'}
            </h2>
            <h2
              className={`
               font-bold gap-2 p-1 rounded-lg px-5 flex items-center justify-center font-zodiak
              ${isFeatured ? 'bg-yellow-100 text-yellow-600 border border-yellow-600' : 'bg-red-100 text-red-600 border border-red-600'}
              `}
            >
              <div
                className={`w-2 h-2 rounded-full ${isFeatured ? 'bg-yellow-600' : 'bg-red-600'}`}
              ></div>
              {isFeatured ? 'Featured' : 'Not Featured'}
            </h2>
          </div>
        </div>

        {/* Sections */}
        {renderSection(
          'Package Details',
          'packageDetails',
          openSection,
          toggleSection,
          () => (
            <>
              {/* Package Name and Type */}
              <div className="flex font-jakarta flex-col md:flex-row w-full mt-5 items-center md:gap-10">
                <div className="w-full">
                  <div className="flex items-center justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                    <h1>Package Name:</h1>
                    <h1 className="font-semibold">
                      {selectedPackage?.package_name || 'Loading...'}
                    </h1>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen mt-5 md:mt-0">
                    <h1>Package Type:</h1>
                    <h1 className="font-semibold">
                      {selectedPackage?.package_type || 'Loading...'}
                    </h1>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="flex font-jakarta items-start mt-5 justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                <h1>Package Description:</h1>
                <h1 className="font-semibold">
                  {selectedPackage?.description || 'Loading...'}
                </h1>
              </div>
            </>
          )
        )}

        {renderSection('Dates', 'dates', openSection, toggleSection, () => (
          <>
            <div className="flex font-jakarta items-start mt-10 justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
              <h1>Package Dates:</h1>
              <h1 className="font-semibold flex flex-wrap gap-4">
                {selectedPackage?.group_dates.map((date, i) => (
                  <div
                    key={i}
                    className="flex list-none rounded-xl items-center justify-center gap-3 bg-green-200 bg-opacity-70 p-1 px-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-darkgreen"></div>
                    {date}
                  </div>
                ))}
              </h1>
            </div>
            <div className="flex font-jakarta items-start mt-5 justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
              <h1>Booking Deadline:</h1>
              <h1 className="font-semibold">
                {selectedPackage?.booking_deadline || 'Loading...'}
              </h1>
            </div>
          </>
        ))}

        {renderSection('Prices', 'prices', openSection, toggleSection, () => (
          <>
            <div className="flex flex-col font-jakarta md:flex-row w-full mt-5 items-center gap-10">
              <div className="w-full">
                <div className="flex items-center justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                  <h1 className="">Base Price :</h1>
                  <h1 className="font-semibold">
                    {selectedPackage?.base_price || 'Loading...'}
                  </h1>
                </div>
                <div className="flex items-center mt-5 justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                  <h1 className="">Final Price :</h1>
                  <h1 className="font-semibold">
                    {selectedPackage?.final_price || 'Loading...'}
                  </h1>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center font-jakarta justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                  <h1 className="">Discount :</h1>
                  <h1 className="font-semibold">
                    {selectedPackage?.discount || 'Loading...'}
                  </h1>
                </div>
                <div className="flex items-center mt-5 justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                  <h1 className="">You Saved :</h1>
                  <h1 className="font-semibold">
                    {selectedPackage?.you_saved || 'Loading...'}
                  </h1>
                </div>
              </div>
            </div>
          </>
        ))}

        {renderSection(
          'City & Hotels',
          'city&hotels',
          openSection,
          toggleSection,
          () => (
            <>
              <div className="flex font-jakarta flex-col md:flex-row w-full mt-5 items-center gap-10">
                <div className="w-full">
                  <div className="flex items-center justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                    <h1 className="">Arrival City :</h1>
                    <h1 className="font-semibold">
                      {selectedPackage?.arrival_city || 'Loading...'}
                    </h1>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                    <h1 className="">Departure City :</h1>
                    <h1 className="font-semibold">
                      {selectedPackage?.departure_city || 'Loading...'}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center mt-5 justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen">
                  <h1 className="">Hotel Name :</h1>
                  <h1 className="font-semibold">
                    {selectedPackage?.hotel_name || 'Loading...'}
                  </h1>
                </div>
              </div>
            </>
          )
        )}

        {renderSection(
          'Itenaries',
          'itenaries',
          openSection,
          toggleSection,
          () => (
            <>
              {selectedPackage?.itinerary.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex font-jakarta items-start mt-5 justify-between gap-3 border-b border-opacity-50 pb-5 border-darkgreen"
                  >
                    <h1 className="">{item.day} :</h1>
                    <h1 className="font-semibold">{item.itenary}</h1>
                  </div>
                );
              })}
            </>
          )
        )}

        {renderSection(
          'Inclusion',
          'inclusion',
          openSection,
          toggleSection,
          () => (
            <>
              {selectedPackage?.inclusion.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex font-jakarta items-start mt-5 gap-3 border-b border-opacity-50 pb-5 border-darkgreen"
                  >
                    <h1 className="font-semibold">{item}</h1>
                  </div>
                );
              })}
            </>
          )
        )}

        {renderSection(
          'Exclusion',
          'Exclusion',
          openSection,
          toggleSection,
          () => (
            <>
              {selectedPackage?.exclusion.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex font-jakarta items-start mt-5 gap-3 border-b border-opacity-50 pb-5 border-darkgreen"
                  >
                    <h1 className="font-semibold">{item}</h1>
                  </div>
                );
              })}
            </>
          )
        )}

        {renderSection(
          'Terms & Condition',
          'term&condition',
          openSection,
          toggleSection,
          () => (
            <>
              {selectedPackage?.term_condition.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex font-jakarta items-start mt-5 gap-3 border-b border-opacity-50 pb-5 border-darkgreen"
                  >
                    <h1 className="font-semibold">{item}</h1>
                  </div>
                );
              })}
            </>
          )
        )}

        {renderSection(
          'Booking Terms',
          'bookingterms',
          openSection,
          toggleSection,
          () => (
            <>
              {selectedPackage?.booking_terms.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex font-jakarta items-start mt-5 gap-3 border-b border-opacity-50 pb-5 border-darkgreen"
                  >
                    <h1 className="font-semibold">{item}</h1>
                  </div>
                );
              })}
            </>
          )
        )}

        {renderSection(
          'Cancellation Policy',
          'cancellationpolicy',
          openSection,
          toggleSection,
          () => (
            <>
              {selectedPackage?.cancellation_policy.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex font-jakarta items-start mt-5 gap-3 border-b border-opacity-50 pb-5 border-darkgreen"
                  >
                    <h1 className="font-semibold">{item}</h1>
                  </div>
                );
              })}
            </>
          )
        )}
      </div>
    </div>
  );
};

const renderSection = (title, key, openSection, toggleSection, content) => (
  <div className="my-10">
    <div
      className="flex items-center text-xl font-zodiak p-2 rounded-lg justify-between cursor-pointer"
      onClick={() => toggleSection(key)}
    >
      {title}{' '}
      <ChevronDown className={`${openSection === key ? 'rotate-180' : ''}`} />
    </div>
    {openSection === key && (
      <div className="transition-all ease-in-out duration-300 overflow-hidden">
        {content()}
      </div>
    )}
  </div>
);

const HolidayCards = ({ data, refreshPackages }) => {
  const { setIsCreating, isModalOpen, setIsModalOpen } = useHolidayStore();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const deletePackage = async (id) => {
    setIsCreating(true);
    const toastId = toast.loading(
      'Deleting package. This may take some time...',
      {
        icon: (
          <div className="relative w-10 h-10">
            <div className="absolute w-5 h-5 border-4 top-0 animate-spin mx-4 border-peach border-l-darkgreen rounded-full"></div>
          </div>
        ),
        className: 'text-center flex item-center',
      }
    );
    try {
      const res = await axiosInstance.delete(
        `admin/packages/delete-holiday-package/${id}`
      );
      toast.dismiss(toastId);
      const msg = res.data.data;
      toast.success(msg);
      refreshPackages();
    } catch (error) {
      toast.dismiss(toastId);
      const errmsg = error.response.data.message;
      toast.error(errmsg);
    } finally {
      setIsCreating(false);
    }
  };

  const IsoDate = data.created_at;

  const date = new Date(IsoDate);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  });
  const openModal = (packages) => {
    setSelectedPackage(packages);
    setIsModalOpen(true);
  };
  return (
    <>
      <div
        className={` w-full md:w-2/5 lg:w-1/4 xl:w-1/4 p-3 rounded-xl shadow-lg ${isModalOpen ? 'blur-sm' : 'blur-0'}`}
      >
        <div className="">
          <img
            src={data?.package_images[0].secure_url}
            alt=""
            className="aspect-[2/1] rounded-md"
          />
        </div>
        <div className="relative mt-5 px-2">
          <h1
            className="text-xl my-2 font-zodiak font-semibold hover:cursor-pointer hover:underline"
            onClick={() => openModal(data)}
          >
            {data.package_name}
          </h1>
          <div className="w-fit font-semibold  my-2 p-1 rounded-lg text-sm px-3 bg-peach font-jakarta text-darkgreen">
            {data.package_type}
          </div>
          <div className="text-xs mt-10  mb-3 font-zodiak text-mediumgreen w-2/3 xl:w-full">
            Created on : {formattedDate}
          </div>
          <div className="flex flex-col gap-3 absolute top-14 right-0">
            <NavLink
              to={`/admin/holidays/update/${data.package_id}/details`}
              className="rounded-full border border-darkgreen cursor-pointer hover:bg-darkgreen hover:text-peach transition-colors hover:shadow-xl w-8 h-8 flex items-center justify-center"
            >
              <Pencil size={15} />
            </NavLink>
            <div className="rounded-full border border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-colors hover:shadow-xl w-8 h-8 flex items-center justify-center">
              <Trash2
                size={15}
                onClick={() => {
                  toast((t) => (
                    <div className="flex flex-col items-center">
                      <img src={trash} alt="" className="w-1/4 my-8" />
                      <span className="flex text-center flex-col items-center justify-center font-zodiak text-darkgreen">
                        Are you sure you want to delete this package?
                        <div className="flex w-full items-center justify-center gap-5 my-8">
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className=" p-2 rounded-lg text-darkgreen w-full border border-darkgreen bg-peach"
                          >
                            Cancel
                          </button>
                          <button
                            className=" bg-red-600 p-2 rounded-lg  px-4 w-full text-white"
                            onClick={() => {
                              toast.dismiss(t.id);
                              deletePackage(data.package_id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </span>
                    </div>
                  ));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ViewPackageDetails
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        selectedPackage={selectedPackage}
      />
    </>
  );
};

export default HolidayCards;
