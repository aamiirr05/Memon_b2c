import { NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';

const UpdateHotel = () => {
  const { updateid } = useParams();
  const { getHotels } = useOutletContext();

  const extractedPackages = getHotels.data.data.find(
    (item) => item.hotel_id === updateid
  );

  console.log(extractedPackages);
  return (
    <>
      <h1 className="font-zodiak text-3xl mb-10">Update Hotel Package.</h1>
      <div className="w-full border-b border-darkgreen border-opacity-50 flex items-center justify-start gap-10 overflow-x-scroll md:overflow-x-auto text-nowrap pb-5 md:pb-0">
        <NavLink
          to={`/admin/hotel/update/${updateid}/details`}
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
          to={`/admin/hotel/update/${updateid}/hotelimages`}
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
            getHotels: getHotels,
          }}
        />
      </div>
    </>
  );
};

export default UpdateHotel;
