/* eslint-disable react/prop-types */
const SecondaryNav = ({ setIsMore, setIsHovered, isHovered, isMore }) => {
  return (
    <>
      <nav className="bg-peach bg-opacity-30 lg:flex items-center justify-between py-3 px-1 lg:px-6 w-full hidden">
        <div className="flex items-center gap-2">
          <div className="logo w-14 h-14">
            <img
              src={`https://s3-alpha-sig.figma.com/img/c029/3f5e/a0f869bd9b509ab0e5a07d2db64fe0ef?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FyHhVHPWHXYnOudBET4nLxatw3g1VCCrVzxYE~oCZ5amjue5uGPcDyzdZ0MSy3jJ8saw38lvetJY8o9ifBBfUQ0uWPZiJEitv4~kfn086J319C~B3EnUeeiFbhzaGR97-jskZCEherdi57TDwC6MiWrsSnafp6pacCcOh8kBnClmvypRJ43ItaccXSJ-va7KM0zFAidXwKrQtHyYKmCqzNg3-8hx8YlKWCPCRiA9He0V0iLjJTVenIf-X~MSeqhmBDUUsvC7zkv6LOOfQyHrUF7lLuLCc1WJ5QbBgj2nKvTepUF0Vqyb2cT9k2RVv6wvs~7eZBX-ZXx0yFDdEDTZQA__`}
              alt=""
            />
          </div>
          <div className="w-24 xl:w-40">
            <img
              src={`https://s3-alpha-sig.figma.com/img/4d76/6344/366db0ad089b2f94a11624fe7be964f2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d0~tZj-ihtvSfmlibiBb8DIq4pUiNCzeIzG4jP78Dv~ceHYKarwYDv~w2gNocp45gKUNLWhubvm17w96LPm57iVKlEMdT~6yQUoa6yJx8WB9Mwur7fdB54KdFPcbajVQiuyo6FEnzWhOsxkoD0rXKnlSU~zvFicpt99ZBanMN~4qhhr9tQwHsL1X0ovfDhRNB7Jll64BQOSoONs8OeSfIGpfjPZBdL3Bzx221f52HOVrKEaEirMskBAEG7GT7ghtZVgvxDU~pQEZbaxxNtnJFoGQA2l7STo6J5wZoCRVEYxdcMGiGQ3OyoCZ3Fh9zvj2NaYlYLQwakTVne3BnflCEg__`}
              alt=""
            />
          </div>
        </div>
        <div className="relative text-darkgreen flex items-center lg:gap-4 xl:gap-8 font-semibold font-recia">
          <div className="link-hover-green">Home</div>
          <div
            className=""
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Umrah Packages
          </div>
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
            <div className="link-hover-peach">Umrah Packages</div>
            <div className="link-hover-peach">Ramadan Packages</div>
            <div className="link-hover-peach">Customized Umrah</div>
          </div>
          <div className="link-hover-green">Haj 2025</div>
          <div className="link-hover-green">Ziyarat</div>
          <div className="link-hover-green">Holidays</div>
          <div className="link-hover-green">Hotels</div>
          <div className="link-hover-green">Visa</div>
          <div className="link-hover-green">Forex</div>
          <div className="link-hover-green hidden xl:block">Our Partners</div>
          <div className="link-hover-green hidden xl:block">Nusuk</div>
          <div className="link-hover-green hidden xl:block">Contact Us</div>
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
