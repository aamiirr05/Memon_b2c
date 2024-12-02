/* eslint-disable react/prop-types */
const BookNow = ({ isMenuOpen }) => {
  return (
    <>
      <section
        className={`section-book-now w-11/12 mx-auto mb-20 ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        {/* Heading  */}
        <div className="my-5 flex items-start justify-start text-darkgreen flex-col gap-4">
          <h1 className="heading-one text-2xl md:text-4xl font-semibold font-zodiak">
            Book Now - Holiday Packages for this Season.
          </h1>
          <p className="heading-two font-semibold text-mediumgreen">
            Planning a holiday and not sure where to start ? Pick one of our
            recommended holiday&apos;s crafted just for you.
          </p>
        </div>
        {/* Cards */}
        <div className="w-full mx-auto h-full mt-10 flex flex-col md:flex-row gap-10">
          {/* Flex Card 1 full */}
          <div className="w-full lg:w-1/2 h-full">
            <div className="card-one-big bg-white w-full h-full flex flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1584186028062-637e3e77318d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            <div className="para-one w-full flex justify-start mt-5 md:mt-32 text-lg font-semibold text-mediumgreen border-l-4 pl-4 border-lightgreen font-jakarta">
              “Umrah is a beautiful chapter in everyone’s life. May you receive
              full benefits and be filled with serenity, love, and divine
              presenece of Allah.”
            </div>
          </div>

          {/* Flex Card 2 (1-1)  */}
          <div className="w-full h-1/2 flex flex-col md:flex-row gap-10 flex-wrap">
            {/* 1 */}
            <div className="card-one bg-white w-full lg:w-[45%] flex flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            {/* 2 */}
            <div className="card-two bg-white w-full lg:w-[45%] flex flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            {/* 3 */}
            <div className="card-three bg-white hidden lg:flex w-full md:w-2/3 lg:w-[45%] flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
            {/* 4 */}
            <div className="card-four bg-white hidden lg:flex w-full md:w-2/3 lg:w-[45%] flex-col shadow-xl rounded-xl overflow-hidden">
              <div className="w-full">
                <img
                  src={`https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt=""
                  className="object-cover"
                />
              </div>
              {/* Card's Description  */}
              <div className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-xl text-darkgreen">
                  Dessert Wonder Riyadh And Jeddah Advanture
                </h1>
                <p className="font-semibold text-mediumgreen">
                  5 Days, 4 Nights Destinations: Madina , Jeddah
                </p>
                <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
                <p className="font-semibold text-lightgreen">
                  Starting from INR 53,207
                </p>
                <button className="bg-mediumgreen mt-5 w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookNow;
