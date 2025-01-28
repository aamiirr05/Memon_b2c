import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';
const UpdateVisa = () => {
  const { updateid } = useParams();
  const { getPackages } = useOutletContext();

  const extractedPackages = getPackages.data?.data.find(
    (item) => item.visa_id == updateid
  );

  return (
    <>
      <h1 className="font-zodiak text-3xl mb-10">Update Holiday Package.</h1>
      <div className="w-full border-b border-darkgreen border-opacity-50 flex items-center justify-start gap-10 overflow-x-scroll md:overflow-x-auto text-nowrap pb-5 md:pb-0">
        <NavLink
          to={`/admin/visa/update/${updateid}/details`}
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
          to={`/admin/visa/update/${updateid}/visaimage`}
          className={({ isActive }) =>
            `
              p-2
              ${isActive ? 'border-b-4 rounded-sm border-darkgreen ' : ''}
              `
          }
        >
          Visa Image
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

export default UpdateVisa;
