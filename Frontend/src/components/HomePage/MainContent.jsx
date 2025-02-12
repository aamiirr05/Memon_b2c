/* eslint-disable react/prop-types */
const MainContent = () => {
  return (
    <>
      <section
        className={`opacity-0 w-full  mb-20 h-[calc(100vh-112px)] md:h-[calc(100vh-116px)]`}
      >
        {/* <SecondaryNav /> */}
        <div className="section-one-heading p-5 md:p-0 flex flex-col gap-5 mt-10 md:w-11/12 mx-auto items-center text-[#386641]">
          <q className="font-bold font-sans">
            إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا
            وَهُدًى لِلْعَالَمِينَ(Surah Aal-e-Imran 3:96) Indeed, the first
            House [of worship] established for mankind was at Bakkah 🕋 –
            blessed and a guidance for the worlds.
          </q>
          <h1 className="text-5xl text-center font-bold font-zodiak">
            Your Trusted Partner for Umrah, Ziyarat, Holidays & Beyond
          </h1>
          <p className="font-jakarta font-semibold max-w-md text-center">
            Seamless, transparent, and reliable—book with confidence and embark
            on your spiritual journey with ease. No hidden charges, just a
            commitment to exceptional service.
          </p>
        </div>
      </section>
    </>
  );
};

export default MainContent;
