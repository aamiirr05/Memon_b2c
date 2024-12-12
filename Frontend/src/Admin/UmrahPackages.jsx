import { Check, Plus } from 'lucide-react';
import PackageCards from './UmrahPackages/PackageCards';
import axiosInstance from '../components/axios/AxiosInstance';
import { useEffect, useState } from 'react';
import Loader from '../Utils/Loader';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const UmrahPackages = () => {
  const [getUmrahpackages, setUmrahPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const getPackages = async () => {
    try {
      const res = await axiosInstance.get('/packages/fetch-umrah-packages');
      const data = res.data.data;
      setUmrahPackages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
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
  const isChildRoute = currentPath !== '/admin/umrahpackages';
  const isDetailForm =
    currentPath === '/admin/umrahpackages/createpackage-form';
  const isImgForm = currentPath === '/admin/umrahpackages/createpackage-images';
  const isPreview =
    currentPath === '/admin/umrahpackages/createpackage-preview';

  return (
    <div className="w-full h-full">
      {!isChildRoute && (
        <>
          <NavLink
            to="/admin/umrahpackages/createpackage-form"
            className="flex w-1/5 items-center justify-center outline-none border border-darkgreen hover:bg-peach hover:bg-opacity-40 font-semibold font-jakarta hover:text-darkgreen transition-colors hover:animate-shift-up gap-1 bg-darkgreen text-peach p-3 rounded-lg"
          >
            <Plus />
            Add New Packages
          </NavLink>

          {/* All packages */}
          <div className="my-10 w-full mx-auto flex items-center justify-center gap-5 lg:gap-10 flex-wrap">
            {getUmrahpackages.map((i) => (
              <PackageCards data={i} key={i.package_id} />
            ))}
          </div>
        </>
      )}

      {isChildRoute && (
        <div className="bg-[#FAF9F3] top-1 sticky  w-full h-[20vh] shadow-md rounded-xl p-5 lg:p-10">
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
              to="/admin/umrahpackages/createpackage-form"
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
              to="/admin/umrahpackages/createpackage-images"
              className={({ isActive }) =>
                `
                  w-8 h-8 md:w-14 md:h-14 text-darkgreen font-jakarta font-bold right-[47%] -top-[16px] md:-top-[26px]  rounded-full absolute flex items-center justify-center cursor-pointer transition-all 
                  ${isActive ? 'border-4 border-darkgreen bg-peach' : ''}
                  ${!isPreview && (isDetailForm || isImgForm) ? 'bg-peach' : 'bg-darkgreen  border-none'}
                 
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
              to="/admin/umrahpackages/createpackage-preview"
              className={({ isActive }) =>
                `
                w-8 h-8 md:w-14 md:h-14 text-darkgreen font-jakarta font-bold -right-3 -top-[16px] md:-top-[26px] rounded-full absolute flex items-center justify-center cursor-pointer transition-all
                  ${isActive ? 'border-4 border-darkgreen bg-peach' : ''}
                  ${isDetailForm || isImgForm ? 'text-darkgreen bg-peach' : ''}
                
                 
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

export default UmrahPackages;
