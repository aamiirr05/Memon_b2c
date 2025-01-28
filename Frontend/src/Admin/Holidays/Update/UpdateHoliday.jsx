import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';

const UpdateHoliday = () => {
  const { updateid } = useParams();
  const { getPackages } = useOutletContext();

  const extractedPackages = getPackages.data.data.find(
    (item) => item.package_id === updateid
  );
  return (
    <>
      <h1 className="font-zodiak text-3xl mb-10">Update Holiday Package.</h1>
      <div className="w-full border-b border-darkgreen border-opacity-50 flex items-center justify-start gap-10 overflow-x-scroll md:overflow-x-auto text-nowrap pb-5 md:pb-0">
        <NavLink
          to={`/admin/holidays/update/${updateid}/details`}
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
          to={`/admin/holidays/update/${updateid}/packageimages`}
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
          to={`/admin/holidays/update/${updateid}/hotelimages`}
          className={({ isActive }) =>
            `
              p-2
              ${isActive ? 'border-b-4 rounded-sm border-darkgreen ' : ''}
              `
          }
        >
          Hotel Images
        </NavLink>
      </div>
      {/*  */}

      <div className="mt-10">
        <Outlet
          context={{
            extractedPackages: extractedPackages,
            getPackages: getPackages,
          }}
        />
      </div>
    </>
  );
};

export default UpdateHoliday;
