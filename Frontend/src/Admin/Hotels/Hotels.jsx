import { Check, Plus } from 'lucide-react';

import { useEffect, useState } from 'react';

import { NavLink, Outlet, useLocation } from 'react-router-dom';
import axiosInstance from '../../lib/axios';
import HotelCards from './HotelCards';
import Loader from '../../components/Loader';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChildLoading, setIsChildLoading] = useState(false);

  const location = useLocation();

  const getHotels = async () => {
    try {
      const res = await axiosInstance.get('/hotel/fetch-hotel');
      console.log(res);
      const data = res.data.data;
      setHotels(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(hotels);

  useEffect(() => {
    getHotels();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Route Checks
  const currentPath = location.pathname;
  const isChildRoute = currentPath !== '/admin/hotel';
  const isDetailForm = currentPath === '/admin/hotel/createhotel-form';
  const isImgForm = currentPath === '/admin/hotel/createhotel-package';
  const isPreview = currentPath === '/admin/hotel/createhotel-preview';

  return (
    <div
      className={`w-full h-full ${isChildLoading ? 'blur-sm pointer-events-none' : 'pointer-events-auto blur-0'}`}
    >
      {!isChildRoute && (
        <>
          <NavLink
            to="/admin/hotel/createhotel-form"
            className="flex w-2/3 md:w-1/2 lg:w-1/4 items-center justify-center outline-none border border-darkgreen hover:bg-peach hover:bg-opacity-40 font-semibold font-jakarta hover:text-darkgreen transition-colors hover:animate-shift-up gap-1 bg-darkgreen text-peach p-3 rounded-lg"
          >
            <Plus />
            Add New Hotels
          </NavLink>

          {/* All packages */}
          <div className="my-10 w-full mx-auto flex items-center justify-center gap-5 lg:gap-10 flex-wrap">
            {hotels.length == 0 ? (
              <h1 className="text-center text-3xl mt-40 lg:mt-52 opacity-60 font-zodiak">
                No Hotels Found
              </h1>
            ) : (
              hotels.map((i) => (
                <HotelCards
                  data={i}
                  key={i.hotel_id}
                  getPackages={getHotels}
                  isChildLoading={isChildLoading}
                  setIsChildLoading={setIsChildLoading}
                />
              ))
            )}
          </div>
        </>
      )}

      {isChildRoute && (
        <div className="bg-[#FAF9F3] top-1 z-50 sticky  w-full h-[20vh] shadow-md rounded-xl p-10">
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
              to="/admin/hotel/createhotel-form"
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
              to="/admin/hotel/createhotel-package"
              className={({ isActive }) =>
                `
                  w-8 h-8 md:w-14 md:h-14 text-darkgreen font-jakarta font-bold right-[47%] -top-[16px] md:-top-[26px]  rounded-full absolute flex items-center justify-center cursor-pointer transition-all 
                  ${isActive ? 'border-4 border-darkgreen bg-peach' : ''}
                  ${!isPreview && (isDetailForm || isImgForm) ? 'bg-peach' : 'bg-darkgreen  border-none'}
                 ${isDetailForm ? 'pointer-events-none' : 'pointer-events-auto'}
                `
              }
            >
              {!isPreview && (isDetailForm || isImgForm) ? (
                '2'
              ) : (
                <Check className="text-peach" />
              )}
              <div className="absolute right-0 top-[4.5rem] text-sm text-center">
                Create
              </div>
            </NavLink>
            <NavLink
              to="/admin/hotel/createhotel-preview"
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
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Hotels;
