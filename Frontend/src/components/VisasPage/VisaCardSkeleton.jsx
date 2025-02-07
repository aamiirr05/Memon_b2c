const VisaCardSkeleton = () => {
  return (
    <div className="w-80 bg-darkgreen/10 rounded-2xl shadow-lg overflow-hidden m-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-40 bg-darkgreen/50" />

      <div className="p-4 font-jakarta">
        {/* Visa Type Skeleton */}
        <div className="h-6 w-3/4 bg-darkgreen/50 mb-4" />

        {/* Country Skeleton */}
        <div className="h-4 w-1/2 bg-darkgreen/50 mb-2" />

        {/* Details Skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-darkgreen/50" />
          <div className="h-4 w-3/4 bg-darkgreen/50" />
          <div className="h-4 w-3/4 bg-darkgreen/50" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Price Skeleton */}
          <div className="h-6 w-1/4 bg-darkgreen/50" />

          {/* Button Skeleton */}
          <div className="h-8 w-24 bg-darkgreen/50 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default VisaCardSkeleton;
