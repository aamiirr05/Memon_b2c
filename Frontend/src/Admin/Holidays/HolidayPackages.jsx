import { Check, Plus, RefreshCcw } from 'lucide-react';
import Loader from '../../components/Loader';
import { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import HolidayCards from './HolidayCards';
import useFetchPackages from '../hooks/UseFetchPackages';
import useHolidayStore from '../store/Holidays/useHolidayStore';

const HolidayPackages = () => {
  const {
    holidayPackages,
    setHolidayPackages,
    loading,
    setLoading,
    isCreating,
    isModalOpen,
  } = useHolidayStore();

  const location = useLocation();
  const { updateid } = useParams();

  const getPackages = useFetchPackages('admin/packages/fetch-holiday-package');

  useEffect(() => {
    if (getPackages.data) {
      setHolidayPackages(getPackages.data.data);
      setLoading(false);
    }
  }, [getPackages.data, setHolidayPackages, setLoading]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (getPackages.error) {
    return (
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center mt-32">
        <div className="w-full h-full flex items-center md:gap-2 text-mediumgreen justify-center  text-xs font-zodiak md:text-3xl">
          <div className=""> {getPackages.error.message} </div>
          <div className="">{`:(`}</div>
        </div>
        <div
          className="flex items-center justify-center gap-3 bg-mediumgreen font-jakarta font-semibold p-2 px-5 rounded-lg cursor-pointer text-peach"
          onClick={() => getPackages.refresh()}
        >
          <RefreshCcw />
          Try Again{' '}
        </div>
      </div>
    );
  }

  // Route Checks
  const currentPath = location.pathname;
  const isChildRoute = currentPath !== '/admin/holidays';
  const isDetailForm = currentPath === '/admin/holidays/createholiday-form';
  const isImgForm = currentPath === '/admin/holidays/createholiday-package';
  const isPreview = currentPath.includes(
    '/admin/holidays/createholiday-preview/'
  );

  return (
    <div
      className={`w-full h-full ${isCreating ? 'blur-sm pointer-events-none' : 'pointer-events-auto blur-0'}`}
    >
      {!isChildRoute && (
        <>
          <NavLink
            onClick={() => localStorage.clear()}
            to="/admin/holidays/createholiday-form"
            className={`flex w-2/3 md:w-1/2 lg:w-1/4 items-center justify-center outline-none border border-darkgreen hover:bg-peach hover:bg-opacity-40 font-semibold font-jakarta hover:text-darkgreen transition-colors hover:animate-shift-up gap-1 bg-darkgreen text-peach p-3 rounded-lg ${isModalOpen ? 'blur-sm pointer-events-none' : 'blur-0 pointer-events-auto'}`}
          >
            <Plus />
            Add New Packages
          </NavLink>

          {/* All packages */}
          <div className="my-10 w-full mx-auto flex items-center justify-center gap-5 lg:gap-10 flex-wrap">
            {holidayPackages.length == 0 ? (
              <h1 className="text-center text-3xl mt-44 opacity-60 font-zodiak">
                No Holiday Packages
              </h1>
            ) : (
              holidayPackages.map((i) => (
                <HolidayCards
                  data={i}
                  key={i.package_id}
                  refreshPackages={getPackages.refresh}
                />
              ))
            )}
          </div>
        </>
      )}

      {isChildRoute && (
        <div
          className={`bg-[#FAF9F3] top-1 z-50 sticky  w-full h-[20vh] shadow-md rounded-xl p-10 ${updateid ? 'hidden' : ''}`}
        >
          <div
            className={`
            
            
            
            relative w-full lg:w-10/12 mx-auto h-1 bg-peach before:absolute before:content-[''] before:h-1 before:bg-darkgreen
            before:transition-all before:ease-custom before:duration-600


            ${isDetailForm ? 'before:w-0' : ''}


            ${isImgForm ? 'before:w-1/2' : ''}

            ${isPreview ? 'before:w-full' : ''}
            
            
            
            
            
            
            
            
            
            
            `}
          >
            <NavLink
              to="/admin/holidays/createholiday-form"
              className={({ isActive }) =>
                `
                  w-8 h-8 md:w-14 md:h-14 text-darkgreen font-jakarta font-bold -left-3 -top-[16px] md:-top-[26px]  rounded-full absolute flex items-center justify-center cursor-pointer transition-all
                  ${isActive ? 'border-4 border-darkgreen bg-peach' : ''}
                  ${!isDetailForm ? 'bg-darkgreen  border-none' : ''}
                `
              }
            >
              {isDetailForm ? '1' : <Check className="text-peach" />}
              <div className="absolute right-1 top-[4.5rem] text-sm text-center">
                Details
              </div>
            </NavLink>
            <NavLink
              to="/admin/holidays/createholiday-package"
              className={({ isActive }) =>
                `
                  w-8 h-8 md:w-14 md:h-14 text-darkgreen font-jakarta font-bold right-[47%] -top-[16px] md:-top-[26px]  rounded-full absolute flex items-center justify-center cursor-pointer transition-all 
                  ${isActive ? 'border-4 border-darkgreen bg-peach' : ''}
                  ${!isPreview && (isDetailForm || isImgForm) ? 'bg-peach' : 'bg-darkgreen  border-none'}
                  ${!isDetailForm && !isPreview ? 'pointer-events-none' : 'pointer-events-auto'}
                 
                `
              }
            >
              {!isPreview && (isDetailForm || isImgForm) ? (
                '2'
              ) : (
                <Check className="text-peach" />
              )}
              <div className="absolute right-0 top-[4.5rem] text-sm text-center">
                Images
              </div>
            </NavLink>
            <NavLink
              to="/admin/holidays/createholiday-preview"
              className={({ isActive }) =>
                `
                w-8 h-8 md:w-14 md:h-14 text-darkgreen font-jakarta font-bold -right-3 -top-[16px] md:-top-[26px] rounded-full absolute flex items-center justify-center cursor-pointer transition-all
                  ${isActive ? 'border-4 border-darkgreen bg-peach' : ''}
                  ${isDetailForm || isImgForm ? 'text-darkgreen bg-peach pointer-events-none' : 'pointer-events-auto'}

                
                 
                `
              }
            >
              3
              <div className="absolute right-0 top-[4.5rem] text-sm text-center">
                Preview
              </div>
            </NavLink>
          </div>
        </div>
      )}
      {/* Outlet */}
      <div className="mt-10">
        <Outlet
          context={{
            getPackages: getPackages,
            refreshPackages: getPackages.refresh,
          }}
        />
      </div>
    </div>
  );
};

export default HolidayPackages;
