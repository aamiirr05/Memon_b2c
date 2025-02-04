/* eslint-disable react/prop-types */
const MainContent = ({ isMenuOpen }) => {
  return (
    <>
      <section
        className={`relative mb-52 w-full flex lg:mt-0 h-[calc(100vh-112px)] md:h-[calc(100vh-116px)] ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >
        <div className="section-one-heading p-5 md:p-0 flex flex-col gap-5 mt-10 md:w-11/12 mx-auto items-center text-[#386641]">
          <q className="font-bold font-sans">
            إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ
          </q>
          <h1 className="text-5xl text-center font-bold font-zodiak">
            Search, Book and Relax
          </h1>
          <p className="font-jakarta font-semibold max-w-md text-center">
            No hidden fees or gimmicks, just straight forward and hassle-free
            booking for all your travel needs.
          </p>
        </div>
      </section>
    </>
  );
};

export default MainContent;
