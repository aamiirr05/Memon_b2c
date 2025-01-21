import { Star } from 'lucide-react';

const HotelCardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 h-auto rounded-xl overflow-hidden shadow-lg">
      {/* Hotel image */}
      <div className="h-56 md:h-full w-full md:w-72 flex-shrink-0 bg-darkgreen/50 animate-pulse">
        {/* Placeholder for hotel image */}
      </div>

      {/* Hotel details */}
      <div className="py-4 px-4 flex flex-col justify-between w-full">
        <div>
          <div className="flex gap-1 mb-2">
            {/* Placeholder for stars */}
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <span key={index}>
                  <Star
                    size={18}
                    fill="#386641"
                    color="#ddd"
                    className="opacity-50 animate-pulse"
                  />
                </span>
              ))}
          </div>

          {/* Placeholder for hotel name and location */}
          <div className="w-1/2 h-6 bg-darkgreen/50 animate-pulse mb-2" />
          <div className="w-2/3 h-4 bg-darkgreen/50 animate-pulse mb-4" />

          {/* Placeholder for hotel description */}
          <div className="mt-2 h-12 bg-darkgreen/50 animate-pulse" />
        </div>

        <div className="flex justify-between items-end w-full">
          {/* Price starting from */}
          <div className="mt-4 w-3/4 md:w-1/2">
            <div className="w-2/3 h-4 bg-darkgreen/50 animate-pulse mb-2" />
            <div className="w-1/4 h-6 bg-darkgreen/50 animate-pulse" />
          </div>

          {/* View More Button */}
          <div className="md:mt-4 w-full md:w-auto flex justify-end md:justify-normal">
            <div className="w-24 h-8 bg-darkgreen/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
