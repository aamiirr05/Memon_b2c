import { CalendarDays, MapPinned } from 'lucide-react';

const PackageCard = () => {
  return (
    <div className=" w-10/12 lg:11/12 xl:w-[95%] mx-auto bg-white bg-opacity-10 shadow-lg overflow-hidden rounded-xl">
      <div className="w- overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551041777-575d3855ca71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rounded-t-xl object-cover"
        />{' '}
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-xl font-semibold font-zodiak text-darkgreen">
          Premium Umrah Package
        </h3>
        <h6 className="mt-3 flex items-center gap-2 text-sm font-medium font-jakarta">
          <CalendarDays size={20} /> 15 Days , 14 Nights
        </h6>
        <h3 className="font-medium flex items-center gap-2 font-jakarta text-sm">
          <MapPinned size={20} />
          Destination : Mecca , Jeddah
        </h3>
        <div className="mt-3 flex flex-col gap-1">
          <h3 className="font-semibold font-jakarta text-xs text-gray-500">
            Starts from
          </h3>
          <h2 className="text-lg font-bold">$100</h2>
        </div>
        <button className="hover:animate-shift-up cursor-pointer rounded-md border border-darkgreen my-3 w-1/2 p-2 text-darkgreen font-zodiak hover:bg-darkgreen hover:text-white transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
