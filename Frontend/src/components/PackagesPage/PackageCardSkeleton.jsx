// PackageCardSkeleton.js
const PackageCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-darkgreen/10 rounded-xl shadow-md overflow-hidden">
      {/* Image Section Skeleton */}
      <div className="w-full md:w-[70%] h-56 md:max-h-56 bg-darkgreen/50 animate-pulse" />

      {/* Content Section Skeleton */}
      <div className="flex flex-col justify-between p-6 space-y-4 w-full">
        <div>
          {/* Package Name Skeleton */}
          <div className="h-6 w-3/4 bg-darkgreen/50 animate-pulse mb-4" />

          {/* Duration Skeleton */}
          <div className="h-4 w-1/2 bg-darkgreen/50 animate-pulse mt-4 mb-2" />

          {/* Description Skeleton */}
          <div className="h-4 w-full bg-darkgreen/50 animate-pulse line-clamp-3 mt-1 font-medium" />
        </div>

        {/* Price Section Skeleton */}
        <div className="flex justify-between items-center flex-wrap">
          <div className="h-6 w-1/4 bg-darkgreen/50 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-darkgreen/50 animate-pulse" />
            <div className="h-8 w-24 bg-darkgreen/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCardSkeleton;
