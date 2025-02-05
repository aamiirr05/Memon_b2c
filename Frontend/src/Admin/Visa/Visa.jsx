import { Plus, RefreshCcw } from 'lucide-react';
import Loader from '../../components/Loader';
import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import VisaCard from './VisaCard';
import useFetchPackages from '../hooks/UseFetchPackages';
import useVisaStore from '../store/Visa/useVisaStore';

const Visa = () => {
  const { loading, setLoading, getVisa, setVisa, isCreating } = useVisaStore();

  const location = useLocation();

  const getPackages = useFetchPackages('admin/visa/fetch-Visa');

  useEffect(() => {
    if (getPackages.data) {
      setVisa(getPackages.data.data);
    }
    setLoading(false);
  }, [getPackages.data, setVisa, setLoading]);

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
  const isChildRoute = currentPath !== '/admin/visa';

  return (
    <div
      className={`w-full h-full ${isCreating ? 'pointer-events-none blur-sm' : 'pointer-events-auto blur-0'}`}
    >
      {!isChildRoute && (
        <>
          <NavLink
            onClick={() => localStorage.clear()}
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
              getVisa.map((i, index) => {
                return (
                  <VisaCard data={i} key={index} getPackages={getPackages} />
                );
              })
            )}
          </div>
        </>
      )}

      {/* Outlet */}
      <div className="mt-5">
        <Outlet context={{ getPackages: getPackages }} />
      </div>
    </div>
  );
};

export default Visa;
