/* eslint-disable react/prop-types */
const MainContent = ({ isMenuOpen }) => {
  return (
    <>
      <section
        className={`relative mb-52 w-full h-full flex mt-[4.5rem] lg:mt-0 transition-all ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1729931421786-7bbd6c7d78f6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '80vh',
          width: '100%',
        }}
      >
        <div className="section-one-heading p-5 md:p-0 flex flex-col gap-5 mt-10 text-white md:w-11/12 mx-auto">
          <h1 className="text-5xl font-bold font-zodiak">
            Search, Book and Relax
          </h1>
          <p className="font-jakarta font-semibold">
            No hidden fees or gimmicks, just straight forward and hassle-free
            booking for all your travel needs.
          </p>
        </div>
      </section>
    </>
  );
};

export default MainContent;
