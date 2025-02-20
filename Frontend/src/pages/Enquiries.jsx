import { useEffect } from 'react';
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
  BowlFood,
  Article,
  Phone,
  AirplaneTilt,
} from '@phosphor-icons/react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const EnquiryUmrah = () => {
  return (
    <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-center gap-5">
        <h2 className="text-lg font-bold">Package Name</h2>
        <p className="text-sm">#t647389209348</p>
        <div className="rounded-lg flex gap-2 text-xs border border-yellow-600 bg-yellow-100 p-1 px-3 text-yellow-600">
          <CircleNotch size={18} /> Pending
        </div>
      </div>
      <div className="flex gap-6 mt-4 items-center justify-center">
        <h2 className="text-sm flex items-center justify-center gap-2">
          <UserCheck size={20} />
          Mr Zaid Achhwa
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          Email
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          Contact
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          Traveller Date
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <UsersThree size={20} />
          Total Adults
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Baby size={20} />
          Total Children
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <BabyCarriage size={20} />
          Total Infants
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          30-12-2025
        </h2>
      </div>
      <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
      <div className="flex gap-8 mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Package Type
          </h2>
        </div>
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Created At
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryVisa = () => {
  return (
    <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-center gap-5">
        <h2 className="text-lg font-bold">Visa Country</h2>
        <p className="text-sm">#t647389209348</p>
        <div className="rounded-lg flex gap-2 text-xs border border-green-600 bg-green-100 p-1 px-3 text-green-600">
          <CheckCircle size={18} /> Approved
        </div>
      </div>
      <div className="flex gap-6 mt-4 items-center justify-center">
        <h2 className="text-sm flex items-center justify-center gap-2">
          <UserCheck size={20} />
          Mr Zaid Achhwa
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          Email
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          Contact
        </h2>
      </div>
      <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
      <div className="flex gap-8 mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Visa Type
          </h2>
        </div>
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Created At
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryForex = () => {
  return (
    <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-center gap-5">
        <h2 className="text-lg font-bold ">Mr Zaid Achhwa</h2>
        <p className="text-sm">#t647389209348</p>
        <div className="rounded-lg flex gap-2 text-xs border border-red-600 bg-red-100 p-1 px-3 text-red-600">
          <XCircle size={20} /> Rejected
        </div>
      </div>
      <div className="flex gap-6 mt-4 items-center justify-center">
        <h2 className="text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          Email
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          Contact
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Money size={20} />
          Amount Required
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <GlobeHemisphereWest size={20} />
          Country
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <MapPinArea size={20} />
          Address
        </h2>
      </div>
      <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
      <div className="mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Created At
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryContact = () => {
  return (
    <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-center gap-5">
        <h2 className="text-lg font-bold">Mr Zaid Achhwa</h2>
        <p className="text-sm">#t647389209348</p>
        <div className="rounded-lg flex gap-2 text-xs border border-green-600 bg-green-100 p-1 px-3 text-green-600">
          <CheckCircle size={18} /> Approved
        </div>
      </div>
      <div className="flex gap-6 mt-4 items-center justify-center">
        <h2 className="text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          Email
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          Contact
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          Message
        </h2>
      </div>
      <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
      <div className="mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Created At
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryHotel = () => {
  return (
    <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-center gap-5">
        <h2 className="text-lg font-bold">Mr Zaid Achhwa</h2>
        <p className="text-sm">#t647389209348</p>
        <div className="rounded-lg flex gap-2 text-xs border border-yellow-600 bg-yellow-100 p-1 px-3 text-yellow-600">
          <CircleNotch size={18} /> Pending
        </div>
      </div>
      <div className="flex gap-6 mt-4 items-center justify-center">
        <h2 className="text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          Email
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          <h2>Check In:</h2>
          Check In Date
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          <h2>Check Out:</h2>
          Check Out Date
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Moon size={20} />
          No of Nights
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <BuildingApartment size={20} />
          No of Rooms
        </h2>

        <h2 className="text-sm flex items-center justify-center gap-2">
          <BowlFood size={20} />
          Meal Plan
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <UsersThree size={20} />
          No of Adults
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Baby size={20} />
          No of Children
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Article size={20} />
          Lorem ipsum.....
        </h2>
      </div>
      <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
      <div className="flex gap-8 mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-4">
            <BuildingApartment size={20} />
            Room type
          </h2>
        </div>
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Created At
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryHoliday = () => {
  return (
    <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-center gap-5">
        <h2 className="text-lg font-bold">Mr Zaid Achhwa</h2>
        <p className="text-sm">#t647389209348</p>
        <div className="rounded-lg flex gap-2 text-xs border border-red-600 bg-red-100 p-1 px-3 text-red-600">
          <XCircle size={18} /> Rejected
        </div>
      </div>
      <div className="flex gap-6 mt-4 items-center justify-center">
        <h2 className="text-sm flex items-center justify-center gap-2">
          <EnvelopeSimple size={20} />
          Email
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Phone size={20} />
          Contact
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <GlobeHemisphereWest size={20} />
          Nationality
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <CalendarDots size={20} />
          Preferred Date
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Moon size={20} />
          No of Nights
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <UsersThree size={20} />
          No of Adults
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <Baby size={20} />
          No of Children
        </h2>
        <h2 className="text-sm flex items-center justify-center gap-2">
          <MapPinArea size={20} />
          Preferred Departure City
        </h2>
      </div>
      <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
      <div className="flex gap-8 mt-2">
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-4">
            <BuildingApartment size={20} />
            Room type
          </h2>
        </div>
        <div className=" px-6 py-2 border border-gray-400 rounded-full">
          <h2 className="text-sm flex items-center justify-center gap-2 ">
            Created At
          </h2>
        </div>
      </div>
    </div>
  );
};

const EnquiryCustomizedPackage = () => (
  <div className=" w-[99%] flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
    <div className="flex items-center justify-center gap-5">
      <h2 className="text-lg font-bold">Mr Zaid Achhwa</h2>
      <p className="text-sm">#t647389209348</p>
      <div className="rounded-lg flex gap-2 text-xs border border-red-600 bg-red-100 p-1 px-3 text-red-600">
        <XCircle size={18} /> Rejected
      </div>
    </div>
    <div className="flex gap-6 mt-4 items-center justify-center">
      <h2 className="text-sm flex items-center justify-center gap-2">
        <EnvelopeSimple size={20} />
        Email
      </h2>
      <h2 className="text-sm flex items-center justify-center gap-2">
        <Phone size={20} />
        Contact
      </h2>
      <h2 className="text-sm flex items-center justify-center gap-2">
        <AirplaneTilt size={20} />
        Travel Class
      </h2>
      <h2 className="text-sm flex items-center justify-center gap-2">
        <BuildingApartment size={20} />
        Makkah Hotel Name
      </h2>
      <h2 className="text-sm flex items-center justify-center gap-2">
        <BuildingApartment size={20} />
        Medina Hotel Name
      </h2>
      <h2 className="text-sm flex items-center justify-center gap-2">
        <UsersThree size={20} />
        No of Adults
      </h2>
      <h2 className="text-sm flex items-center justify-center gap-2">
        <Baby size={20} />
        No of kids
      </h2>
      <h2 className="text-sm flex items-center justify-center gap-2">
        <Article size={20} />
        Lorem ipsum dolor sit amet, consectetur adipisicing......
      </h2>
    </div>
    <div className="h-0.5 w-full bg-gray-200 mt-2 rounded-full "></div>
    <div className="flex gap-8 mt-2">
      <div className=" px-6 py-2 border border-gray-400 rounded-full">
        <h2 className="text-sm flex items-center justify-center gap-4">
          <BuildingApartment size={20} />
          Room type
        </h2>
      </div>
      <div className=" px-6 py-2 border border-gray-400 rounded-full">
        <h2 className="text-sm flex items-center justify-center gap-4">
          <BuildingApartment size={20} />
          Booking type
        </h2>
      </div>
      <div className=" px-6 py-2 border border-gray-400 rounded-full">
        <h2 className="text-sm flex items-center justify-center gap-2 ">
          Created At
        </h2>
      </div>
    </div>
  </div>
);

const Enquiries = () => {
  const getEnquiries = useFetchPackages('/users/get-user');
  const { authUser } = useAuthStore();

  console.log(getEnquiries);

  const userData = getEnquiries?.data?.data;

  console.log(userData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
  return (
    <div
      className={`bg-peach/10 w-full ${authUser ? 'h-full' : 'h-screen flex items-center justify-center'} p-10 text-darkgreen font-jakarta`}
    >
      {authUser ? (
        <>
          {userData ? (
            <h1 className="text-3xl mt-5 ml-2 font-semibold font-zodiak">
              {userData.first_name} {userData.last_name}&apos;s Enquiry
            </h1>
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

      <div className="mt-10 flex flex-col gap-5 items-center justify-center">
        {authUser ? (
          <>
            <EnquiryUmrah />
            <EnquiryVisa />
            <EnquiryForex />
            <EnquiryContact />
            <EnquiryHotel />
            <EnquiryHoliday />
            <EnquiryCustomizedPackage />
          </>
        ) : (
          <div className=" flex  flex-col items-center justify-center p-6  rounded-lg mb-24 ">
            <h2 className="text-xl text-center text-darkgreen">
              If you’d like to track your enquiry status and receive updates, we
              recommend creating an account.
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
  );
};

export default Enquiries;
