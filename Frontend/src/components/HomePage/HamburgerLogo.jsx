/* eslint-disable react/prop-types */
const HamburgerLogo = ({ isMenuOpen }) => {
  return (
    <>
      <div
        className={`absolute right-0 pr-3 lg:hidden flex justify-center items-center gap-12 mt-2 transition-all ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        {' '}
        <img
          src={`https://s3-alpha-sig.figma.com/img/4d76/6344/366db0ad089b2f94a11624fe7be964f2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d0~tZj-ihtvSfmlibiBb8DIq4pUiNCzeIzG4jP78Dv~ceHYKarwYDv~w2gNocp45gKUNLWhubvm17w96LPm57iVKlEMdT~6yQUoa6yJx8WB9Mwur7fdB54KdFPcbajVQiuyo6FEnzWhOsxkoD0rXKnlSU~zvFicpt99ZBanMN~4qhhr9tQwHsL1X0ovfDhRNB7Jll64BQOSoONs8OeSfIGpfjPZBdL3Bzx221f52HOVrKEaEirMskBAEG7GT7ghtZVgvxDU~pQEZbaxxNtnJFoGQA2l7STo6J5wZoCRVEYxdcMGiGQ3OyoCZ3Fh9zvj2NaYlYLQwakTVne3BnflCEg__`}
          alt=""
          className="w-40"
        />
        <img
          src={`https://s3-alpha-sig.figma.com/img/c029/3f5e/a0f869bd9b509ab0e5a07d2db64fe0ef?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FyHhVHPWHXYnOudBET4nLxatw3g1VCCrVzxYE~oCZ5amjue5uGPcDyzdZ0MSy3jJ8saw38lvetJY8o9ifBBfUQ0uWPZiJEitv4~kfn086J319C~B3EnUeeiFbhzaGR97-jskZCEherdi57TDwC6MiWrsSnafp6pacCcOh8kBnClmvypRJ43ItaccXSJ-va7KM0zFAidXwKrQtHyYKmCqzNg3-8hx8YlKWCPCRiA9He0V0iLjJTVenIf-X~MSeqhmBDUUsvC7zkv6LOOfQyHrUF7lLuLCc1WJ5QbBgj2nKvTepUF0Vqyb2cT9k2RVv6wvs~7eZBX-ZXx0yFDdEDTZQA__`}
          alt=""
          className="w-12 h-12"
        />
      </div>
    </>
  );
};

export default HamburgerLogo;
