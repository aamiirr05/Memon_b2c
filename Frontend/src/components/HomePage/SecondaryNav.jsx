/* eslint-disable react/prop-types */

import { ChevronRight } from 'lucide-react';
import logoname from '../../assets/img/logoname.png';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
const SecondaryNav = ({ setIsMore, setIsHovered, isHovered, isMore }) => {
  return (
    <>
      <nav className="bg-peach bg-opacity-30 lg:flex items-center justify-between py-3 px-1 lg:px-6 w-full hidden">
        <div className="flex items-center gap-4">
          <div className="logo w-14 h-14">
            <img src={logo} alt="" />
          </div>
          <div className="w-24 xl:w-40">
            <img src={logoname} alt="" />
          </div>
        </div>
        <div className="relative text-darkgreen flex items-center lg:gap-4 xl:gap-8 font-semibold font-recia">
          <Link to="/" className="link-hover-green">
            Home
          </Link>
          <Link
            to="/packages"
            className="cursor-pointer link-hover-green"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Packages
          </Link>
          <div
            className={`absolute left-3 top-6 w-0 h-0 border-l-[120px] border-r-[120px] border-b-[120px] border-l-transparent border-r-transparent border-b-darkgreen transition-all duration-700 ${isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-[100%] pointer-events-none'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          ></div>
          <div
            className={`absolute left-20 dropdown w-[25vw] xl:w-[15vw] h-[20vh] p-4 flex flex-col items-start justify-center gap-4 rounded-lg top-10 z-40 bg-darkgreen text-peach shadow-xl transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-[30%] pointer-events-none'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center justify-center flex-row group ">
              <div className="cursor-pointer group-hover:opacity-100">
                Umrah Packages
              </div>
              <ChevronRight
                size={22}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1"
              />
            </div>
            <div className="flex items-center justify-center flex-row group ">
              <div className="cursor-pointer group-hover:opacity-100">
                Ramadan Packages
              </div>
              <ChevronRight
                size={22}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1"
              />
            </div>
            <div className="flex justify-center items-center flex-row group ">
              <div className="cursor-pointer group-hover:opacity-100">
                Customized Packages
              </div>
              <ChevronRight
                size={22}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1"
              />
            </div>
          </div>
          <Link to="/hajj-2025" className="link-hover-green">
            Hajj 2025
          </Link>
          <Link to="/ziyarat" className="link-hover-green">
            Ziyarat
          </Link>
          <Link to="/holidays" className="link-hover-green">
            Holidays
          </Link>
          <Link to="/hotels" className="link-hover-green">
            Hotels
          </Link>
          <Link to="/visa" className="link-hover-green">
            Visa
          </Link>
          <Link to="/forex" className="link-hover-green">
            Forex
          </Link>
          <Link to="/" className="link-hover-green hidden xl:block">
            Our Partners
          </Link>
          <Link to="/" className="link-hover-green hidden xl:block">
            Nusuk
          </Link>
          <Link to="/" className="link-hover-green hidden xl:block">
            Contact Us
          </Link>
          <div
            className="xl:hidden"
            onMouseEnter={() => setIsMore(true)}
            onMouseLeave={() => setIsMore(false)}
          >
            More
          </div>
          <div
            className={`absolute -right-[1.5rem] top-6 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[40px] border-l-transparent border-r-transparent border-b-darkgreen transition-all duration-700 ${isMore ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-[100%] pointer-events-none'}`}
            onMouseEnter={() => setIsMore(true)}
            onMouseLeave={() => setIsMore(false)}
          ></div>
          <div
            className={`absolute -right-5 dropdown w-[25vw] xl:w-[15vw] h-[20vh] p-4 flex flex-col items-start justify-center gap-4 rounded-lg top-10 z-40 bg-darkgreen text-peach shadow-xl transition-all duration-700 ${isMore ? 'opacity-100' : 'opacity-0 translate-y-[30%] pointer-events-none'}`}
            onMouseEnter={() => setIsMore(true)}
            onMouseLeave={() => setIsMore(false)}
          >
            <div className="">Our Partners</div>
            <div className="">Nusuk</div>
            <div className="">Contact Us</div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SecondaryNav;
