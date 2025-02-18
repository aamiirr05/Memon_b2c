import useFetchPackages from '../Admin/hooks/UseFetchPackages';
import { CalendarBlank, IdentificationBadge } from '@phosphor-icons/react';

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

  console.log(getEnquiries);
  return (
    <div className="w-full h-full p-10 text-darkgreen font-jakarta">
      <h1 className="text-3xl font-semibold font-zodiak ">
        User&apos;s Enquiry
      </h1>

      <div className="mt-20 flex flex-col gap-5 items-center justify-center">
        <EnquiryCards />
        <EnquiryCards />
        <EnquiryCards />
        <EnquiryCards />
        <EnquiryCards />
        <EnquiryCards />
        <EnquiryCards />
        <EnquiryCards />
      </div>
    </div>
  );
};

export default Enquiries;
