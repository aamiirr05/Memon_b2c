/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Pencil, Trash2 } from 'lucide-react';
import axiosInstance from '../../components/axios/AxiosInstance';
import toast from 'react-hot-toast';
import trash from '../../assets/img/trash.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const PackageCards = ({
  data,
  refreshPackages,
  isChildLoading,
  setIsChildLoading,
}) => {
  const [isloading, setIsLoading] = useState(false);
  const deletePackage = async (id) => {
    const toastId = toast.loading(
      'Deleting package. This may take some time...',
      {
        icon: (
          <div className="relative w-10 h-10">
            <div className="absolute w-5 h-5 border-4 top-0 animate-spin mx-4 border-peach border-l-darkgreen rounded-full"></div>
          </div>
        ),
        className: 'text-center flex item-center',
      }
    );
    try {
      setIsChildLoading(true);
      setIsLoading(true);
      const res = await axiosInstance.delete(
        `/packages/delete-umrah-package/${id}`
      );
      console.log(res);
      toast.dismiss(toastId);
      const msg = res.data.data;
      toast.success(msg);
      refreshPackages();
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      const errmsg = error.response.data.message;
      toast.error(errmsg);
    } finally {
      setIsLoading(false);
      setIsChildLoading(false);
    }
  };

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
      <div
        className={`w-full md:w-2/5 lg:w-1/4 xl:w-1/4 p-3 rounded-xl shadow-lg`}
      >
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
          <div className="text-xs mt-10  mb-3 font-zodiak text-mediumgreen w-2/3 xl:w-full">
            Created on : {formattedDate}
          </div>
          <div className="flex flex-col gap-3 absolute top-14 right-0">
            <NavLink
              to={`/admin/umrahpackages/update/${data.package_id}/details`}
              className={`rounded-full border border-darkgreen cursor-pointer hover:bg-darkgreen hover:text-peach transition-colors hover:shadow-xl w-8 h-8 flex items-center justify-center ${isChildLoading ? 'opacity-50' : 'opacity-100'}`}
            >
              <Pencil size={15} />
            </NavLink>
            <div
              className={`rounded-full border border-red-600 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-colors hover:shadow-xl w-8 h-8 flex items-center justify-center ${isChildLoading ? 'opacity-50' : 'opacity-100'}`}
            >
              <Trash2
                size={15}
                onClick={() => {
                  toast((t) => (
                    <div className="flex flex-col items-center">
                      <img src={trash} alt="" className="w-1/4 my-8" />
                      <span className="flex text-center flex-col items-center justify-center font-zodiak text-darkgreen">
                        Are you sure you want to delete this package?
                        <div className="flex w-full items-center justify-center gap-5 my-8">
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className=" p-2 rounded-lg text-darkgreen w-full border border-darkgreen bg-peach"
                          >
                            Cancel
                          </button>
                          <button
                            className=" bg-red-600 p-2 rounded-lg  px-4 w-full text-white"
                            onClick={() => {
                              toast.dismiss(t.id);
                              deletePackage(data.package_id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </span>
                    </div>
                  ));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageCards;
