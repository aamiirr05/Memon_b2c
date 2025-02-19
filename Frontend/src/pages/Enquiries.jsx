import { useEffect } from 'react';
import useFetchPackages from '../Admin/hooks/UseFetchPackages';
import { CalendarBlank, IdentificationBadge } from '@phosphor-icons/react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const EnquiryCards = () => {
  return (
    <div className="w-full flex-col mx-auto items-start justify-center gap-3 flex border border-darkgreen/50 p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-center gap-5">
        <h2 className="">Package Name</h2>
        <p className="text-xs">#t647389209348</p>
        <div className="rounded-lg text-xs border border-red-600 bg-red-200 p-1 px-3 text-red-600">
          Pending
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <h2 className="text-xs flex items-center justify-center gap-2">
          <IdentificationBadge size={18} />
          Mr Zaid Achhwa
        </h2>
        <h2 className="text-xs flex items-center justify-center gap-2">
          <CalendarBlank size={18} />
          30-12-2025
        </h2>
      </div>
    </div>
  );
};

const Enquiries = () => {
  const getEnquiries = useFetchPackages('/users/get-user');
  const { authUser } = useAuthStore();

  console.log(getEnquiries);

  const userData = getEnquiries?.data.data;

  console.log(userData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
  return (
    <div
      className={`w-full ${authUser ? 'h-full' : 'h-screen flex items-center justify-center'} p-10 text-darkgreen font-jakarta`}
    >
      {authUser ? (
        <h1 className="text-3xl mt-5 font-semibold font-zodiak ">
          {userData?.first_name} {userData?.last_name}&apos;s Enquiry
        </h1>
      ) : null}

      <div className="mt-10 flex flex-col gap-5 items-center justify-center">
        {authUser ? (
          <>
            <EnquiryCards />
            <EnquiryCards />
            <EnquiryCards />
            <EnquiryCards />
            <EnquiryCards />
            <EnquiryCards />
            <EnquiryCards />
            <EnquiryCards />
          </>
        ) : (
          <div className="flex xl:w-1/2 flex-col items-center justify-center p-6 bg-peach/40 rounded-lg shadow-md">
            <h2 className="text-xl text-center text-darkgreen">
              You can submit an enquiry without logging in. However, if you’d
              like to track your enquiry status and receive updates, we
              recommend creating an account.
            </h2>
            <div className="mt-4 flex items-center justify-center gap-4">
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
