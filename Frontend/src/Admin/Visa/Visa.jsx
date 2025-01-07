import { Plus } from 'lucide-react';
import Loader from '../../Utils/Loader';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import axiosInstance from '../../components/axios/AxiosInstance';
import VisaCard from './VisaCard';

const Visa = () => {
  const [getVisa, setVisa] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const getPackages = async () => {
    try {
      const res = await axiosInstance.get('/visa/fetch-Visa');
      const data = res.data.data;
      console.log(res);
      setVisa(data);
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
  const isChildRoute = currentPath !== '/admin/visa';

  return (
    <div className="w-full h-full">
      {!isChildRoute && (
        <>
          <NavLink
            to="/admin/visa/createvisa-form"
            className="flex w-2/3 md:w-1/2 lg:w-1/4 items-center justify-center outline-none border border-darkgreen hover:bg-peach hover:bg-opacity-40 font-semibold font-jakarta hover:text-darkgreen transition-colors hover:animate-shift-up gap-1 bg-darkgreen text-peach p-3 rounded-lg"
          >
            <Plus />
            Add Visa
          </NavLink>

          {/* All packages */}
          <div className="my-10 w-full mx-auto flex items-center justify-center gap-5 lg:gap-10 flex-wrap">
            {getVisa.length == 0 ? (
              <h1 className="text-center text-3xl mt-40 opacity-60 font-zodiak">
                No Visa Cards
              </h1>
            ) : (
              getVisa.map((i) => (
                <VisaCard data={i} key={i.visa_id} getPackages={getPackages} />
              ))
            )}
          </div>
        </>
      )}

      {/* Outlet */}
      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Visa;
