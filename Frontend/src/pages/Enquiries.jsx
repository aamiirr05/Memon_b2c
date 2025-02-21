/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useFetchPackages from '../Admin/hooks/UseFetchPackages';
import {
  CalendarDots,
  UserCheck,
  EnvelopeSimple,
  UsersThree,
  Baby,
  BabyCarriage,
  CircleNotch,
  CheckCircle,
  Money,
  GlobeHemisphereWest,
  MapPinArea,
  XCircle,
  Moon,
  BuildingApartment,
  Article,
  Phone,
  AirplaneTilt,
} from '@phosphor-icons/react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { RefreshCcw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const EnquiryUmrah = ({ data, getStatusClass, getStatusIcon }) => {
  return (
    <div className="w-full lg:w-2/3 flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      {/*  */}
      <div className="flex items-start md:items-center md:justify-center gap-2 lg:gap-5 flex-col md:flex-row">
        <h2 className="text-lg font-bold">{data?.package_name}</h2>
        <p className="text-xs lg:text-sm">{data?.enquiry_id}</p>
        <div
          className={`rounded-lg flex gap-2 text-xs p-1 px-3 ${getStatusClass(data?.status)}`}
        >
          {getStatusIcon(data?.status)} {data?.status}
        </div>
      </div>
      {/*  */}
      <div className="border-b border-gray-300 pb-5 flex gap-6 mt-4 items-start justify-start mditems-center flex-wrap w-full">
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <UserCheck size={20} />
          {`${data?.salutation} ${data?.first_name}
          ${data?.last_name}
          `}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          {data?.email}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          {data?.contact}
        </h2>
        {/* <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          {new Date(data?.traveller_date).toDateString()}
        </h2> */}
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <UsersThree size={20} />
          {data?.total_adults}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Baby size={20} />
          {data?.total_children}
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <BabyCarriage size={20} />
          {data?.total_infants}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          {new Date(data?.traveller_date).toLocaleDateString()}
        </h2>
      </div>
      {/* <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div> */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
            {data?.package_type}
          </h2>
        </div>
        <div className="px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
            {new Date(data?.created_at).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryVisa = ({ data, getStatusClass, getStatusIcon }) => {
  return (
    <div className="w-full lg:w-2/3 flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      {/*  */}
      <div className="flex items-start md:items-center md:justify-center gap-2 lg:gap-5 flex-col md:flex-row">
        <h2 className="text-lg font-bold">{data?.visa_country}</h2>
        <p className="text-xs lg:text-sm">{data?.enquiry_id}</p>
        <div
          className={`rounded-lg flex gap-2 text-xs p-1 px-3 ${getStatusClass(data?.status)}`}
        >
          {getStatusIcon(data?.status)} {data?.status}
        </div>
      </div>
      {/*  */}
      <div className="border-b border-gray-300 pb-5 flex gap-6 mt-4 items-start justify-start md:items-center flex-wrap w-full">
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <UserCheck size={20} />
          {`${data?.salutation} ${data?.first_name}
          ${data?.last_name}
          `}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          {data?.email}
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          {data?.contact}
        </h2>
      </div>
      {/*  */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
        <div className="px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
            {data?.visa_type}
          </h2>
        </div>
        <div className="px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
            {new Date(data?.created_at).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryForex = ({ data, getStatusClass, getStatusIcon }) => {
  return (
    <div className="w-full lg:w-2/3 flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-start md:items-center md:justify-center gap-2 lg:gap-5 flex-col md:flex-row">
        <h2 className="text-lg font-bold ">
          {' '}
          {`${data?.salutation} ${data?.first_name}
          ${data?.last_name}
          `}
        </h2>
        <p className="text-xs lg:text-sm">{data?.enquiry_id}</p>
        <div
          className={`rounded-lg flex gap-2 text-xs p-1 px-3 ${getStatusClass(data?.status)}`}
        >
          {getStatusIcon(data?.status)} {data?.status}
        </div>
      </div>
      <div className="border-b border-gray-300 pb-5 flex gap-6 mt-4 items-start justify-start md:items-center flex-wrap w-full">
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          {data?.email}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          {data?.contact}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Money size={20} />
          {data?.amount_required}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <GlobeHemisphereWest size={20} />
          {data?.country}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <MapPinArea size={20} />
          {data?.address}
        </h2>
      </div>
      <div className="mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
            {new Date(data?.created_at).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryContact = ({ data, getStatusClass, getStatusIcon }) => {
  return (
    <div className=" w-full lg:w-2/3 flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-start md:items-center md:justify-center gap-2 lg:gap-5 flex-col md:flex-row">
        <h2 className="text-lg font-bold">
          {' '}
          {`${data?.salutation} ${data?.first_name}
          ${data?.last_name}
          `}
        </h2>
        <p className="text-xs lg:text-sm">{data?.enquiry_id}</p>
        <div
          className={`rounded-lg flex gap-2 text-xs p-1 px-3 ${getStatusClass(data?.status)}`}
        >
          {getStatusIcon(data?.status)} {data?.status}
        </div>
      </div>
      <div className="border-b border-gray-300 pb-5 flex gap-6 mt-4 items-start justify-start md:items-center flex-wrap w-full">
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          {data?.email}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          {data?.contact}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          {data?.message}
        </h2>
      </div>
      <div className="mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
            {new Date(data?.created_at).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

// const EnquiryHotel = () => {
//   return (
//     <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
//       <div className="flex items-center justify-center gap-5">
//         <h2 className="text-lg font-bold">Mr Zaid Achhwa</h2>
//         <p className="text-sm">#t647389209348</p>
//         <div className="rounded-lg flex gap-2 text-xs border border-yellow-600 bg-yellow-100 p-1 px-3 text-yellow-600">
//           <CircleNotch size={18} /> Pending
//         </div>
//       </div>
//       <div className="flex gap-6 mt-4 items-center justify-center">
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <EnvelopeSimple size={20} />
//           Email
//         </h2>
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <CalendarDots size={20} />
//           <h2>Check In:</h2>
//           Check In Date
//         </h2>
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <CalendarDots size={20} />
//           <h2>Check Out:</h2>
//           Check Out Date
//         </h2>
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <Moon size={20} />
//           No of Nights
//         </h2>
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <BuildingApartment size={20} />
//           No of Rooms
//         </h2>

//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <BowlFood size={20} />
//           Meal Plan
//         </h2>
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <UsersThree size={20} />
//           No of Adults
//         </h2>
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <Baby size={20} />
//           No of Children
//         </h2>
//         <h2 className="text-sm flex items-center justify-center gap-2">
//           <Article size={20} />
//           Lorem ipsum.....
//         </h2>
//       </div>
//       <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
//       <div className="flex gap-8 mt-2">
//         <div className=" px-6 py-2 border border-gray-400 rounded-full">
//           <h2 className="text-sm flex items-center justify-center gap-4">
//             <BuildingApartment size={20} />
//             Room type
//           </h2>
//         </div>
//         <div className=" px-6 py-2 border border-gray-400 rounded-full">
//           <h2 className="text-sm flex items-center justify-center gap-2 ">
//             Created At
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

const EnquiryHoliday = ({ data, getStatusClass, getStatusIcon }) => {
  return (
    <div className=" w-full lg:w-2/3 flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-start md:items-center md:justify-center gap-2 lg:gap-5 flex-col md:flex-row">
        <h2 className="text-lg font-bold">
          {' '}
          {`${data?.full_name} 
          `}
        </h2>
        <p className="text-xs lg:text-sm">{data?.enquiry_id}</p>
        <div
          className={`rounded-lg flex gap-2 text-xs p-1 px-3 ${getStatusClass(data?.status)}`}
        >
          {getStatusIcon(data?.status)} {data?.status}
        </div>
      </div>
      <div className="border-b border-gray-300 pb-5 flex gap-6 mt-4 items-start justify-start md:items-center flex-wrap w-full">
        <h2 className="text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          {data?.email}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          {data?.contact}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <GlobeHemisphereWest size={20} />
          {data?.nationality}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          {data?.preferred_date}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Moon size={20} />
          {data?.number_of_nights}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <UsersThree size={20} />
          {data?.number_of_adults}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <Baby size={20} />
          {data?.number_of_children}
        </h2>
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
          <MapPinArea size={20} />
          {data?.preferred_departure_city}
        </h2>
      </div>
      <div className="flex gap-8 mt-2">
        {/* <div className=" px-6 py-2 border border-gray-400 rounded-full">
          {/* <h2 className="text-sm flex items-center justify-center gap-4">
            <BuildingApartment size={20} />
            Room type
          </h2> 
        </div> */}
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
            {new Date(data?.created_at).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryCustomizedPackage = ({ data, getStatusClass, getStatusIcon }) => (
  <div className=" w-full lg:w-2/3 flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
    <div className="flex items-start md:items-center md:justify-center gap-2 lg:gap-5 flex-col md:flex-row">
      <h2 className="text-lg font-bold">
        {' '}
        {` ${data?.first_name}
          ${data?.last_name}
          `}
      </h2>
      <p className="text-xs lg:text-sm">{data?.enquiry_id}</p>
      <div
        className={`rounded-lg flex gap-2 text-xs p-1 px-3 ${getStatusClass(data?.status)}`}
      >
        {getStatusIcon(data?.status)} {data?.status}
      </div>
    </div>
    <div className="border-b border-gray-300 pb-5 flex gap-6 mt-4 items-start justify-start md:items-center flex-wrap w-full">
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <EnvelopeSimple size={20} />
        {data?.email}
      </h2>
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <Phone size={20} />
        {data?.contact}
      </h2>
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <AirplaneTilt size={20} />
        {data?.travel_class}
      </h2>
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <BuildingApartment size={20} />
        {data?.makkah_hotel_name}
      </h2>
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <BuildingApartment size={20} />
        {data?.medina_hotel_name}
      </h2>
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <UsersThree size={20} />
        {data?.adults}
      </h2>
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <Baby size={20} />
        {data?.kids}
      </h2>
      <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2">
        <Article size={20} />
        {data?.message}
      </h2>
    </div>
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-2">
      <div className=" px-6 py-2 border border-gray-400 rounded-full">
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-4">
          <BuildingApartment size={20} />
          {data?.room_type}
        </h2>
      </div>
      <div className=" px-6 py-2 border border-gray-400 rounded-full">
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-4">
          <BuildingApartment size={20} />
          {data?.booking_type}
        </h2>
      </div>
      <div className=" px-6 py-2 border border-gray-400 rounded-full">
        <h2 className="text-xs lg:text-sm flex items-center justify-center gap-2 ">
          {new Date(data?.created_at).toLocaleString()}
        </h2>
      </div>
    </div>
  </div>
);

const Enquiries = () => {
  const getEnquiries = useFetchPackages('/users/get-user');
  const { authUser } = useAuthStore();

  const userData = getEnquiries?.data?.data;

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-800 bg-green-100 border border-green-900 ';
      case 'Rejected':
        return 'text-red-600 border border-red-900 bg-red-100';
      default:
        return 'text-yellow-800 bg-yellow-100 border border-yellow-900';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle size={18} />;
      case 'Rejected':
        return <XCircle size={20} />;
      default:
        return <CircleNotch size={18} />;
    }
  };

  const [isupdating, setIsUpdating] = useState(false);
  const refreshPackages = () => {
    setIsUpdating(true);
    getEnquiries.refresh();
  };

  useEffect(() => {
    if (
      userData?.customized_package >= 0 ||
      userData?.enquiry_visa >= 0 ||
      userData?.enquiry_contact >= 0 ||
      userData?.enquiry_forex >= 0 ||
      userData?.enquiry_holiday >= 0 ||
      userData?.enquiry_umrah
    )
      setIsUpdating(false);
  }, [
    userData?.customized_package,
    userData?.enquiry_contact,
    userData?.enquiry_forex,
    userData?.enquiry_holiday,
    userData?.enquiry_umrah,
    userData?.enquiry_visa,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
  return (
    <>
      <Helmet>
        <title>Enquiries</title>
        <meta name="description" content={`description`} />
        <meta property="og:title" content={`title`} />
        <meta property="og:description" content={`description`} />
        <meta property="og:image" content={`image`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div
        className={`bg-peach/10 w-full ${authUser ? 'h-full' : 'h-screen flex items-center justify-center'} p-10 text-darkgreen font-jakarta`}
      >
        {authUser ? (
          <>
            {userData ? (
              <div className="w-full flex items-center justify-between">
                <h1 className="text-3xl mt-5 ml-2 font-semibold font-zodiak">
                  {userData.first_name} {userData.last_name}&apos;s Enquiry
                </h1>
                <div
                  className={`font-semibold cursor-pointer ${isupdating ? 'animate-spin' : 'animate-none'}`}
                >
                  <RefreshCcw
                    onClick={() => {
                      refreshPackages();
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="h-10 w-1/3 flex gap-4">
                  <div className="h-10 w-1/4 bg-gray-200 rounded animate-pulse mt-5"></div>
                  <div className="h-10 w-1/4 bg-gray-200 rounded animate-pulse mt-5"></div>
                  <div className="h-10 w-1/4 bg-gray-200 rounded animate-pulse mt-5"></div>
                </div>
              </>
            )}
          </>
        ) : null}

        <div className="mt-10 w-full flex flex-col gap-5 items-center justify-center">
          {authUser ? (
            <>
              {userData?.enquiry_umrah &&
                userData?.enquiry_umrah.map((item, index) => (
                  <EnquiryUmrah
                    key={index}
                    getStatusClass={getStatusClass}
                    getStatusIcon={getStatusIcon}
                    data={item}
                  />
                ))}
              {userData?.enquiry_visa &&
                userData?.enquiry_visa.map((item, index) => (
                  <EnquiryVisa
                    key={index}
                    getStatusClass={getStatusClass}
                    getStatusIcon={getStatusIcon}
                    data={item}
                  />
                ))}
              {userData?.enquiry_forex &&
                userData?.enquiry_forex.map((item, index) => (
                  <EnquiryForex
                    key={index}
                    getStatusClass={getStatusClass}
                    getStatusIcon={getStatusIcon}
                    data={item}
                  />
                ))}
              {userData?.enquiry_contact &&
                userData?.enquiry_contact.map((item, index) => (
                  <EnquiryContact
                    key={index}
                    getStatusClass={getStatusClass}
                    getStatusIcon={getStatusIcon}
                    data={item}
                  />
                ))}
              {userData?.enquiry_holiday &&
                userData?.enquiry_holiday.map((item, index) => (
                  <EnquiryHoliday
                    key={index}
                    getStatusClass={getStatusClass}
                    getStatusIcon={getStatusIcon}
                    data={item}
                  />
                ))}
              {userData?.customized_package &&
                userData?.customized_package.map((item, index) => (
                  <EnquiryCustomizedPackage
                    getStatusClass={getStatusClass}
                    getStatusIcon={getStatusIcon}
                    key={index}
                    data={item}
                  />
                ))}
            </>
          ) : (
            <div className=" flex  flex-col items-center justify-center p-6  rounded-lg mb-24 ">
              <h2 className="text-xl text-center text-darkgreen">
                If you’d like to track your enquiry status and receive updates,
                we recommend creating an account.
              </h2>
              <div className="mt-12 flex items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-darkgreen text-peach font-zodiak cursor-pointer rounded-md shadow-md hover:bg-darkgreen/80 transition-all"
                >
                  Login
                </Link>
                <span className="text-gray-600">or</span>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-darkgreen text-peach font-zodiak cursor-pointer rounded-md shadow-md hover:bg-darkgreen/80 transition-all"
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Enquiries;
