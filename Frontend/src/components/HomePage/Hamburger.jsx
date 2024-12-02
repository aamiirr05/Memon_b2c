/* eslint-disable react/prop-types */
const Hamburger = ({ isHovered, setIsHovered, setIsMenuOpen, isMenuOpen }) => {
  return (
    <>
      <div
        className={` z-10 w-[90%] md:w-[50%] h-screen bg-peach lg:hidden ease-in-out ${isMenuOpen ? 'fixed translate-x-0 duration-1000' : 'absolute translate-x-[-100%] duration-1000'}`}
      >
        <div
          className={`absolute top-6 z-20 flex flex-col items-start justify-start gap-1 duration-700 ease-in-out ${isMenuOpen ? 'right-3' : 'right-[-3rem]'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`w-6 h-[3.5px] bg-darkgreen flex transition-all ${isMenuOpen ? 'rotate-45 translate-y-[.5rem]' : 'rotate-0 '}`}
          ></span>
          <span
            className={`w-6 h-[2.5px] bg-darkgreen  transition-all ${isMenuOpen ? 'hidden opacity-0' : 'flex'}`}
          ></span>
          <span
            className={`w-6 h-[3.5px] bg-darkgreen flex transition-all ${isMenuOpen ? '-rotate-45 translate-x-[.01rem] translate-y-[.04rem]' : 'rotate-0'}`}
          ></span>
        </div>

        <div className="text-darkgreen flex flex-col justify-center mt-10 p-10 md:px-14 items-start gap-8 font-semibold font-recia">
          <div
            className="cursor-pointer"
            onClick={() => setIsHovered(!isHovered)}
          >
            Umrah Packages
          </div>
          <ul
            className={`flex-col gap-4 transition-all text-mediumgreen ${isHovered ? 'flex' : 'hidden'}`}
          >
            <li className="">Umrah Packages</li>
            <li className="">Ramadan Packages</li>
            <li className="">Customized Umrah</li>
          </ul>
          <div className="cursor-pointer">Haj 2025</div>
          <div className="cursor-pointer">Ziyarat</div>
          <div className="cursor-pointer">Holidays</div>
          <div className="cursor-pointer">Hotels</div>
          <div className="cursor-pointer">Visa</div>
          <div className="cursor-pointer">Forex</div>
          <div className="cursor-pointer hidden xl:block">Our Partners</div>
          <div className="cursor-pointer hidden xl:block">Nusuk</div>
          <div className="cursor-pointer hidden xl:block">Contact Us</div>
        </div>
      </div>
    </>
  );
};

export default Hamburger;
