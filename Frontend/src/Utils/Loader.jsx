const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-opacity-20">
      <div className="relative w-16 h-16">
        <div className="absolute border-4 border-t-darkgreen border-r-peach border-b-transparent border-l-transparent rounded-full w-full h-full animate-spin"></div>
        <div className="absolute border-4 border-t-peach border-r-darkgreen border-b-transparent border-l-transparent rounded-full w-12 h-12 top-2 left-2 animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default Loader;
