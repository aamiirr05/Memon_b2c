/* eslint-disable react/prop-types */
import { Pencil, Trash2 } from 'lucide-react';

const PackageCards = ({ data }) => {
  const IsoDate = data.created_at;

  const date = new Date(IsoDate);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  });
  return (
    <>
      <div className=" w-full md:w-2/5 lg:w-1/4 xl:w-1/4 p-3 rounded-xl shadow-lg">
        <div className="">
          <img
            src={data?.mak_hotel_images[0].secure_url}
            alt=""
            className="aspect-[2/1] rounded-md"
          />
        </div>
        <div className="relative mt-5 px-2">
          <h1 className="text-xl my-2 font-zodiak font-semibold">
            {data.package_name}
          </h1>
          <div className="w-fit font-semibold  my-2 p-1 rounded-lg text-sm px-3 bg-peach font-jakarta text-darkgreen">
            {data.package_type}
          </div>
          <div className="text-xs mt-10  mb-3 font-zodiak text-mediumgreen">
            Created on : {formattedDate}
          </div>
          <div className="flex flex-col gap-3 absolute top-14 right-0">
            <div className="rounded-full border border-darkgreen cursor-pointer hover:bg-darkgreen hover:text-peach transition-colors hover:shadow-xl w-8 h-8 flex items-center justify-center">
              <Pencil size={15} />
            </div>
            <div className="rounded-full border border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-colors hover:shadow-xl w-8 h-8 flex items-center justify-center">
              <Trash2 size={15} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageCards;
