import { useEffect } from 'react';
import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';
import useFetchPackages from '../hooks/UseFetchPackages';
import Loader from '../../components/Loader';
import useUmrahStore from '../store/Umrah/UseUmrahStore';

const UpdateUmrahPackage = () => {
  // const [getAllPackages, setAllPackages] = useState([]);
  const { umrahPackages } = useUmrahStore();

  const getUmrahPackages = useFetchPackages('/packages/fetch-umrah-packages');
  const { updateid } = useParams();
  const { refreshPackages } = useOutletContext();

  useEffect(() => {
    if (getUmrahPackages.data) {
      // setAllPackages(getUmrahPackages.data.data);
    }
  }, [getUmrahPackages.data]);

  console.log(getUmrahPackages);

  const umrahPackage = umrahPackages.find(
    (item) => item.package_id === updateid
  );

  if (!getUmrahPackages) {
    return <Loader />;
  }

  console.log(umrahPackage);
  return (
    <>
      <h1 className="font-zodiak text-3xl mb-10">Update Umrah Package.</h1>
      <div className="w-full border-b border-darkgreen border-opacity-50 flex items-center justify-start gap-10 overflow-x-scroll md:overflow-x-auto text-nowrap pb-5 md:pb-0">
        <NavLink
          to={`/admin/umrahpackages/update/${updateid}/details`}
          className={({ isActive }) =>
            `
            p-2
            ${isActive ? 'border-b-4 rounded-sm border-darkgreen ' : ''}
            `
          }
        >
          Details
        </NavLink>
        <NavLink
          to={`/admin/umrahpackages/update/${updateid}/packageimages`}
          className={({ isActive }) =>
            `
            p-2
            ${isActive ? 'border-b-4 rounded-sm border-darkgreen ' : ''}
            `
          }
        >
          Package Images
        </NavLink>
        <NavLink
          to={`/admin/umrahpackages/update/${updateid}/meccaimages`}
          className={({ isActive }) =>
            `
            p-2
            ${isActive ? 'border-b-4 rounded-sm border-darkgreen ' : ''}
            `
          }
        >
          Mecca Hotel Images
        </NavLink>
        <NavLink
          to={`/admin/umrahpackages/update/${updateid}/madinaimages`}
          className={({ isActive }) =>
            `
            p-2
            ${isActive ? 'border-b-4 rounded-sm border-darkgreen ' : ''}
            `
          }
        >
          Madina Hotel Images
        </NavLink>
      </div>
      {/*  */}

      <div className="mt-10">
        <Outlet context={{ umrahPackage, refreshPackages }} />
      </div>
    </>
  );
};

export default UpdateUmrahPackage;
