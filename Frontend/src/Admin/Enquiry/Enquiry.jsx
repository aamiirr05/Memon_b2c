import { NavLink, Outlet } from 'react-router-dom';
import useFetchPackages from '../hooks/UseFetchPackages';
import Loader from '../../components/Loader';
import useEnquiryStore from '../store/Enquiry/useEnquiryStore';
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

const Enquiry = () => {
  const { checkPending } = useEnquiryStore();
  const umrahEnquiry = useFetchPackages('admin/enquiry/fetch-umrah-enquiries');
  const visaEnquiry = useFetchPackages('admin/enquiry/fetch-visa-enquiries');
  const forexEnquiry = useFetchPackages('admin/enquiry/fetch-forex-enquiries');
  const customEnquiry = useFetchPackages(
    'admin/enquiry/fetch-custom-package-enquiries'
  );
  const contactEnquiry = useFetchPackages(
    'admin/enquiry/fetch-contact-enquiries'
  );

  const [isUpdating, setIsUpdating] = useState(false);

  const refreshPackages = () => {
    setIsUpdating(true); // Set to true immediately
    umrahEnquiry.refresh();
    forexEnquiry.refresh();
    visaEnquiry.refresh();
    customEnquiry.refresh();
  };

  // Use useEffect to monitor data updates
  useEffect(() => {
    if (umrahEnquiry?.data?.data?.length > 0) {
      setIsUpdating(false); // Reset once data updates
    }
  }, [customEnquiry.data]);

  if (!umrahEnquiry) {
    return <Loader />;
  }

  return (
    <div className=" w-full">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-semibold font-zodiak">Enquiry Records</h1>
        <div
          className={`font-semibold cursor-pointer ${isUpdating ? 'animate-spin' : 'animate-none'}`}
          onClick={() => {
            refreshPackages();
          }}
        >
          <RefreshCw />
        </div>
      </div>
      <div className="w-full border-b border-darkgreen border-opacity-50 flex items-center justify-start gap-10 overflow-x-scroll md:overflow-x-auto text-nowrap pb-5 md:pb-0">
        {[
          {
            label: 'Umrah',
            route: '/admin/enquiry/umrah',
            req: checkPending(umrahEnquiry),
          },
          {
            label: 'Forex',
            route: '/admin/enquiry/forex',
            req: checkPending(forexEnquiry),
          },
          {
            label: 'Contact',
            route: '/admin/enquiry/contact',
            req: checkPending(contactEnquiry),
          },

          {
            label: 'Visa',
            route: '/admin/enquiry/visa',
            req: checkPending(visaEnquiry),
          },
          {
            label: 'Holiday',
            route: '/admin/enquiry/holiday',
          },
          {
            label: 'Hotel',
            route: '/admin/enquiry/hotel',
          },
          {
            label: 'Customised Package',
            route: '/admin/enquiry/custom-package',
            req: checkPending(customEnquiry),
          },
        ].map((i, index) => (
          <div className="relative flex items-start justify-center" key={index}>
            <NavLink
              to={i.route}
              className={({ isActive }) =>
                `
              p-2
              ${isActive ? 'border-b-4 rounded-sm border-darkgreen ' : ''}
              `
              }
            >
              {i.label}
            </NavLink>
            <div
              className={`absolute top-0 -right-2 w-5 h-5 text-xs text-lightpeach flex justify-center font-semibold rounded-full bg-green-600 ${
                i.req === undefined || i.req === null
                  ? 'animate-pulse items-start'
                  : 'animate-none items-center'
              }`}
            >
              {i.req === undefined || i.req === null ? '...' : i.req}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Outlet
          context={{
            umrahEnquiry,
            forexEnquiry,
            visaEnquiry,
            contactEnquiry,
            customEnquiry,
          }}
        />
      </div>
    </div>
  );
};

export default Enquiry;
