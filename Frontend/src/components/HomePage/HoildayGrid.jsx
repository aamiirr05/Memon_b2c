/* eslint-disable react/prop-types */
import { MoveRight, TicketsPlane, TreePalm } from 'lucide-react';
import img from '../../assets/img/lp-1.avif';
import { SuitcaseRolling } from '@phosphor-icons/react';
import useFetchPackages from '../../Admin/hooks/UseFetchPackages';
import { NavLink } from 'react-router-dom';

const HolidayGrid = ({ isMenuOpen }) => {
  const getPackages = useFetchPackages('users/fetch-all-holiday-packages');

  const filterCards = getPackages?.data?.data.filter((_, i) => i < 2) || [];

  const cards = [...filterCards];
  console.log(cards[0]);
  return (
    <>
      <section
        className={`mb-10 md:mb-20 p-5 md:p-10 w-[99%] mx-auto ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        <span className="flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta">
          <span>
            <SuitcaseRolling size={20} weight="duotone" />
          </span>
          Holiday Packages
        </span>

        {/* Grid  */}
        <div className="w-11/12 h-[60vh] lg:w-3/4 mt-40 mb-20 md:mb-0 md:mt-16 mx-auto flex-col md:flex-row flex items-start justify-center gap-3">
          {/* Grid 1  */}
          <div className="w-full flex flex-col gap-3">
            {/* 1 */}
            <div className="w-full flex gap-3 h-[30vw] md:h-[25vh] lg:h-[13vw]">
              <NavLink
                to={`holidays/holiday-details/${cards[0]?.package_id}`}
                className="w-3/4 rounded-lg overflow-hidden shadow-md cursor-pointer"
              >
                <img
                  src={cards[0]?.package_images[0]?.secure_url}
                  alt=""
                  className="w-full h-full hover:opacity-60"
                />
              </NavLink>
              <div className="w-full shadow-md bg-darkgreen text-peach rounded-lg flex gap-3 flex-col items-end justify-center p-2 md:p-5">
                <h1 className="font-zodiak font-semibold text-lg italic">
                  <TreePalm size={60} />
                </h1>
                <h3 className="font-jakarta italic text-xs lg:text-sm font-semibold">
                  “Curated for Comfort & Elegance”
                </h3>{' '}
              </div>
            </div>
            {/* 2 */}
            <div className="w-full flex flex-row-reverse gap-3 h-[30vw] md:h-[24vh] lg:h-[12vw]">
              <NavLink
                to={`holidays/holiday-details/${cards[1]?.package_id}`}
                className="w-3/4 rounded-lg overflow-hidden shadow-md cursor-pointer"
              >
                <img
                  src={cards[1]?.package_images[0]?.secure_url}
                  alt=""
                  className="w-full h-full hover:opacity-60"
                />
              </NavLink>
              <div className="w-full shadow-md bg-peach text-darkgreen rounded-lg flex gap-3 flex-col items-start justify-center p-2 md:p-5">
                <h1 className="font-zodiak font-semibold italic">
                  <TicketsPlane size={60} />
                </h1>
                <h3 className="font-jakarta italic text-xs lg:text-sm font-semibold">
                  “Seamless Travel Experiences”
                </h3>{' '}
              </div>
            </div>

            {/* 3 */}
            <div className="w-full h-[7.3vh] shadow-md rounded-lg bg-peach/70 flex items-center justify-center font-jakarta font-semibold text-xs lg:text-sm text-darkgreen p-2">
              “Book now and enjoy up to 30% off select holiday packages!”
            </div>
          </div>
          {/* Grid 2 */}
          <div className="w-full md:w-1/2 shadow-md flex flex-col items-start justify-center cursor-pointer bg-peach hover:bg-darkgreen transition-colors duration-500 rounded-lg h-full group p-5 gap-14">
            <h1 className="font-zodiak text-darkgreen text-xl md:text-lg lg:text-xl group-hover:text-peach transition-colors duration-500">
              “Experience the perfect blend of luxury, culture, and adventure.”
            </h1>
            <button className="flex items-center gap-3 text-sm xl:text-md font-semibold bg-darkgreen text-peach p-2 px-6 lg:px-10 rounded-full group-hover:bg-peach group-hover:text-darkgreen transition-colors duration-500">
              Explore All <MoveRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HolidayGrid;
