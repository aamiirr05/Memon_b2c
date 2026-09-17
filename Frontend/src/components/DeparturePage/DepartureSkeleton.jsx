const DepartureSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white/80 backdrop-blur-sm border border-darkgreen/10 rounded-2xl p-6 shadow-sm animate-pulse"
        >
          {/* Header shimmer */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-darkgreen/10">
            <div className="space-y-2">
              <div className="h-6 w-56 bg-darkgreen/10 rounded-md"></div>
              <div className="h-4 w-32 bg-darkgreen/5 rounded-md"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-28 bg-darkgreen/10 rounded-full"></div>
              <div className="h-8 w-24 bg-darkgreen/10 rounded-full"></div>
            </div>
          </div>

          {/* Tiers shimmer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {[1, 2].map((tier) => (
              <div
                key={tier}
                className="bg-peach/30 border border-darkgreen/10 rounded-xl p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="h-5 w-24 bg-darkgreen/15 rounded"></div>
                  <div className="h-5 w-20 bg-darkgreen/10 rounded-full"></div>
                </div>
                <div className="h-4 w-32 bg-darkgreen/10 rounded"></div>
                <div className="space-y-1.5 pt-2 border-t border-darkgreen/10">
                  <div className="h-3 w-40 bg-darkgreen/10 rounded"></div>
                  <div className="h-3 w-36 bg-darkgreen/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Button shimmer */}
          <div className="mt-6 flex justify-end">
            <div className="h-11 w-48 bg-darkgreen/20 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartureSkeleton;
