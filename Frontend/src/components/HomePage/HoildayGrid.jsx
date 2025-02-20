/* eslint-disable react/prop-types */
import { MoveRight, TicketsPlane, TreePalm } from 'lucide-react';
import {
  AirplaneLanding,
  AirplaneTakeoff,
  SuitcaseRolling,
} from '@phosphor-icons/react';
import useFetchPackages from '../../Admin/hooks/UseFetchPackages';
import { NavLink } from 'react-router-dom';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';

const HolidayGrid = ({ isMenuOpen }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 'all',
    once: true,
  });

  const getPackages = useFetchPackages('users/fetch-all-holiday-packages');

  const filterCards = getPackages?.data?.data.filter((_, i) => i < 2) || [];

  const cards = [...filterCards];

  return (
    <>
      <section
        className={`mb-10 md:mb-20 p-5 md:p-10 w-[99%] mx-auto ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backInOut' }}
          className="flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta"
        >
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'backInOut' }}
          >
            <SuitcaseRolling size={20} weight="duotone" />
          </motion.span>
          Holiday Packages
        </motion.span>
        {/* Grid  */}

        <div className="w-11/12 sm:h-[500px] lg:w-3/4 mt-10 mb-10 md:mt-16 mx-auto flex-col md:flex-row flex items-start justify-center gap-3">
          {/* Grid 1  */}
          <div className="w-full flex flex-col gap-3 " ref={ref}>
            {/* 1 */}
            <motion.div
              animate={{ x: isInView ? 0 : '10vw', opacity: isInView ? 1 : 0 }}
              transition={{ duration: 2, type: 'spring', delay: 0.1 }}
              className="w-full flex gap-3 h-[200px]"
            >
              <div className="w-full group relative rounded-lg overflow-hidden shadow-md cursor-pointer">
                <div className="absolute flex flex-col gap-5 transition-all duration-500 group-hover:rounded-t-lg group-hover:backdrop-blur-sm h-10 group-hover: bottom-0 group-hover:h-full bg-peach/90 group-hover:bg-peach/70 w-full p-3 font-jakarta text-darkgreen font-semibold">
                  <div className="flex items-center justify-between">
                    <div className="text-xs">{cards[0]?.country}</div>
                    <div className="text-xs sm:text-sm flex items-center">
                      <span className="hidden lg:flex">Starting from :</span> ₹
                      {cards[0]?.final_price}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm">{`${cards[0]?.total_days} Days / ${cards[0]?.total_nights} Nights `}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs sm:text-smflex items-center gap-2">
                      <AirplaneTakeoff size={20} /> {cards[0]?.departure_city}
                    </div>
                    <div className="text-xs sm:text-sm flex items-center gap-2 md:mr-20">
                      <AirplaneLanding size={20} /> {cards[0]?.arrival_city}
                    </div>
                  </div>
                  <NavLink
                    to={`holidays/holiday-details/${cards[0]?.package_id}`}
                    className="w-fit px-3 sm:px-6 bg-darkgreen rounded-md p-2 text-xs sm:text-sm font-zodiak text-peach"
                  >
                    View Details
                  </NavLink>
                </div>
                <img
                  src={cards[0]?.package_images[0]?.secure_url}
                  alt="holiday image"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-3/4 hidden shadow-md bg-darkgreen text-peach rounded-lg md:flex gap-3 flex-col items-end justify-center p-2 md:p-5">
                <h1 className="font-zodiak font-semibold text-lg italic">
                  <TreePalm size={60} />
                </h1>
                <h2 className="font-jakarta italic text-xs lg:text-sm font-semibold">
                  “Curated for Comfort & Elegance”
                </h2>{' '}
              </div>
            </motion.div>
            {/* 2 */}
            <motion.div
              animate={{ x: isInView ? 0 : '-10vw', opacity: isInView ? 1 : 0 }}
              transition={{ duration: 2, type: 'spring', delay: 0.1 }}
              className="w-full flex flex-row-reverse gap-3 h-[200px]"
            >
              <div className="w-full relative group rounded-lg overflow-hidden shadow-md cursor-pointer">
                <div className="absolute flex flex-col gap-5 transition-all duration-500 group-hover:rounded-t-lg group-hover:backdrop-blur-sm h-10 group-hover: bottom-0 group-hover:h-full bg-darkgreen/90 group-hover:bg-darkgreen/70 w-full p-3 font-jakarta text-peach font-semibold">
                  <div className="flex items-center justify-between">
                    <div className="text-xs">{cards[1]?.country}</div>
                    <div className="text-xs sm:text-sm flex items-center">
                      <span className="hidden lg:flex">Starting from :</span> ₹
                      {cards[1]?.final_price}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm">{`${cards[0]?.total_days} Days / ${cards[0]?.total_nights} Nights `}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs sm:text-sm flex items-center gap-2">
                      <AirplaneTakeoff size={20} /> {cards[1]?.departure_city}
                    </div>
                    <div className="text-xs sm:text-sm flex items-center gap-2 mr-20">
                      <AirplaneLanding size={20} /> {cards[1]?.arrival_city}
                    </div>
                  </div>
                  <NavLink
                    to={`holidays/holiday-details/${cards[1]?.package_id}`}
                    className="w-fit px-3 sm:px-6 bg-peach/80 rounded-md p-2 text-xs sm:text-sm font-zodiak text-darkgreen"
                  >
                    View Details
                  </NavLink>
                </div>
                <img
                  src={cards[1]?.package_images[0]?.secure_url}
                  alt="holiday image"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-3/4 hidden md:flex shadow-md bg-peach text-darkgreen rounded-lg  gap-3 flex-col items-start justify-center p-2 md:p-5">
                <h1 className="font-zodiak font-semibold italic">
                  <TicketsPlane size={60} />
                </h1>
                <h2 className="font-jakarta italic text-xs lg:text-sm font-semibold">
                  “Seamless Travel Experiences”
                </h2>{' '}
              </div>
            </motion.div>

            {/* 3 */}
            <motion.div
              animate={{ y: isInView ? 0 : '10vw', opacity: isInView ? 1 : 0 }}
              transition={{ duration: 2, type: 'spring', delay: 0.1 }}
              className="w-full h-[76px] shadow-md rounded-lg bg-peach/70 flex items-center justify-center font-jakarta font-semibold text-xs lg:text-sm text-darkgreen p-2"
            >
              “Book now and enjoy up to 30% off select holiday packages!”
            </motion.div>
          </div>
          {/* Grid 2 */}
          <motion.div
            animate={{ x: isInView ? 0 : '10vw', opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1, type: 'spring', delay: 0.1 }}
            className="w-full md:w-1/2 shadow-md flex flex-col items-start justify-center cursor-pointer bg-peach hover:bg-darkgreen transition-colors duration-500 rounded-lg h-full group p-5 gap-14"
          >
            <h1 className="font-zodiak text-darkgreen text-xl md:text-lg lg:text-xl group-hover:text-peach transition-colors duration-500">
              “Experience the perfect blend of luxury, culture, and adventure.”
            </h1>
            <button
              aria-label="Explore All"
              className="flex items-center gap-3 text-sm xl:text-md font-semibold bg-darkgreen text-peach p-2 px-6 lg:px-10 rounded-full group-hover:bg-peach group-hover:text-darkgreen transition-colors duration-500"
            >
              Explore All <MoveRight />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HolidayGrid;
