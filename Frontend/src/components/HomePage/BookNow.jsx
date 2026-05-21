/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

const holidayPackages = [
  {
    id: 1,
    title: 'Makkah & Madinah Umrah Special',
    subtitle: '7 Days, 6 Nights · Makkah & Madinah',
    price: 'INR 45,000',
    image:
      'https://images.unsplash.com/photo-1584186028062-637e3e77318d?q=80&w=1935&auto=format&fit=crop',
    link: '/umrah-packages',
  },
  {
    id: 2,
    title: 'Ramadan Umrah Package',
    subtitle: '14 Days, 13 Nights · Makkah, Madinah & Jeddah',
    price: 'INR 75,000',
    image:
      'https://images.unsplash.com/photo-1609599064781-c4cd1ee78f4b?q=80&w=2070&auto=format&fit=crop',
    link: '/umrah-packages',
  },
  {
    id: 3,
    title: 'Ziyarat & Historical Sites Tour',
    subtitle: '10 Days, 9 Nights · Makkah, Madinah & Taif',
    price: 'INR 62,000',
    image:
      'https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=2070&auto=format&fit=crop',
    link: '/ziyarat',
  },
  {
    id: 4,
    title: 'Economy Umrah Package',
    subtitle: '5 Days, 4 Nights · Makkah & Madinah',
    price: 'INR 38,500',
    image:
      'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=1974&auto=format&fit=crop',
    link: '/umrah-packages',
  },
];

const PackageCard = ({ pkg, large }) => (
  <div
    className={`card bg-white flex flex-col shadow-xl rounded-xl overflow-hidden ${large ? 'w-full h-full' : 'w-full lg:w-[45%]'}`}
  >
    <div className={`w-full overflow-hidden ${large ? 'h-64' : 'h-48'}`}>
      <img
        src={pkg.image}
        alt={pkg.title}
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-4 flex flex-col gap-3 flex-1">
      <h2 className="font-bold text-xl text-darkgreen">{pkg.title}</h2>
      <p className="font-semibold text-mediumgreen text-sm">{pkg.subtitle}</p>
      <hr className="w-full border border-mediumgreen border-opacity-50 rounded-full" />
      <p className="font-semibold text-lightgreen">Starting from {pkg.price}</p>
      <NavLink
        to={pkg.link}
        className="bg-mediumgreen mt-auto w-1/2 mx-auto p-2 rounded-xl text-peach font-semibold text-lg shadow-lg text-center hover:bg-darkgreen transition-colors"
      >
        Book Now
      </NavLink>
    </div>
  </div>
);

const BookNow = ({ isMenuOpen }) => {
  return (
    <>
      <section
        className={`section-book-now w-11/12 mx-auto mb-20 ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        {/* Heading */}
        <div className="my-5 flex items-start justify-start text-darkgreen flex-col gap-4">
          <h2 className="heading-one text-2xl md:text-4xl font-semibold font-zodiak">
            Book Now — Handpicked Packages for Every Pilgrim.
          </h2>
          <p className="heading-two font-semibold text-mediumgreen">
            Planning a spiritual journey and not sure where to start? Pick one
            of our packages, crafted for comfort, faith and value.
          </p>
        </div>
        {/* Cards */}
        <div className="w-full mx-auto h-full mt-10 flex flex-col md:flex-row gap-10">
          {/* Big card */}
          <div className="w-full lg:w-1/2 h-full">
            <PackageCard pkg={holidayPackages[0]} large />
            <div className="para-one w-full flex justify-start mt-5 md:mt-10 text-lg font-semibold text-mediumgreen border-l-4 pl-4 border-lightgreen font-jakarta">
              "Umrah is a beautiful chapter in everyone's life. May you receive
              full benefits and be filled with serenity, love, and the divine
              presence of Allah."
            </div>
          </div>

          {/* Small cards grid */}
          <div className="w-full h-1/2 flex flex-col md:flex-row gap-10 flex-wrap">
            {holidayPackages.slice(1).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookNow;
