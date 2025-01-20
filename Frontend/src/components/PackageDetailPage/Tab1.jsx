import { usePackageStore } from '../../store/usePackageStore';

const Tab1 = () => {
  const { selectedPackage } = usePackageStore();

  return (
    <div className="flex flex-row pb-8">
      <div className="w-2/3 pr-8 mb-4">
        <h2 className="text-2xl font-medium text-neutral-700 mb-4">
          About The Destination
        </h2>
        <p className="text-neutral-700 tracking-tight">
          {selectedPackage.description}
        </p>
      </div>

      {/* price card */}
      <div className="py-4 w-1/3">
        <div className="h-full border-2 border-darkgreen/10 rounded-lg p-4">
          {/* Pricing Section */}
          <div className="mb-6">
            <div className="text-neutral-700 font-normal flex gap-2 items-center">
              <p className="text-lg line-through text-neutral-500">
                INR {selectedPackage.base_price}.00
              </p>
              <p className="text-md text-green-700 font-medium">
                INR {selectedPackage.you_saved}.00 ({selectedPackage.discount}%
                off)
              </p>
            </div>

            <p className="text-3xl font-semibold text-neutral-900">
              INR {selectedPackage.final_price}.00{' '}
              <i className="text-sm text-neutral-500 tracking-tight font-normal">
                5 sharing basis
              </i>
            </p>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-2 my-6 text-neutral-700">
            <div>
              <p className="text-neutral-500 text-[15px] leading-tight">
                Total Day
              </p>
              <p className="font-medium text-xl">
                {selectedPackage.total_days}
              </p>
            </div>
            <div>
              <p className="text-neutral-500 text-[15px] leading-tight">
                Total Night
              </p>
              <p className="font-medium text-xl">
                {selectedPackage.total_nights}
              </p>
            </div>
          </div>

          {/* Booking Button */}
          <div className="w-full flex justify-center items-center">
            <button className="bg-darkgreen text-peach w-full py-2 px-4 rounded-lg hover:bg-darkgreen/80">
              Book Now
            </button>
          </div>
          <p className="text-sm mt-4 text-center text-neutral-600">
            Booking Deadline {selectedPackage.booking_deadline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tab1;
