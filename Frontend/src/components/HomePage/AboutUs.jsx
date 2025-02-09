/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import AboutUsCard from './AboutUsCard';
import { useRef, useState } from 'react';
import { Mosque } from '@phosphor-icons/react';

const AboutUs = ({ isMenuOpen }) => {
  const cards = [
    { title: '01', description: 'Description for Card 1' },
    { title: '02', description: 'Description for Card 2' },
    { title: '03', description: 'Description for Card 3' },
    { title: '04', description: 'Description for Card 4' },
    { title: '05', description: 'Description for Card 5' },
    { title: '06', description: 'Description for Card 6' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNext = () => {
    if (activeIndex < cards.length - 2) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) {
      handleNext();
    } else if (deltaX < -50) {
      handlePrev();
    }
  };

  return (
    <section
      className={`mb-10 md:mb-20 p-5 md:p-10 w-[99%] mx-auto ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
    >
      <span className="flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta">
        <Info size={20} weight="duotone" /> About Us
      </span>
      <div className="w-full mx-auto mt-5 md:mt-8 lg:my-10 flex items-center justify-center">
        <div className="w-full font-zodiak text-darkgreen flex flex-col gap-5">
          <div className="md:w-1/1 lg:w-1/2 leading-snug text-4xl ">
            What&apos;s so special about this ?
          </div>
          <div className="md:w-9/12 lg:w-10/12 mb-10 lg:mb-5  text-mediumgreen font-jakarta font-medium leading-normal">
            At Memon Haj Umrah Tours and Travels, we specialize in providing
            seamless and spiritually enriching journeys for Umrah 🕋, Ziyarat
            🕌, Holidays ✈️, and more. With years of expertise in the travel
            industry, we ensure hassle-free bookings ✅, premium accommodations
            🏨, and top-notch services tailored to your needs. Our commitment to
            transparency and customer satisfaction 😊 makes us a trusted partner
            for travel agents across India. Whether you seek a spiritual
            pilgrimage or a memorable getaway 🌍, we are here to make your
            journey smooth, comfortable, and unforgettable. Travel with trust,
            experience with peace.
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <button className="cursor-pointer flex items-center gap-10 bg-darkgreen p-3 px-7 text-md rounded-full text-white font-medium font-jakarta transition-all duration-200 hover:animate-shift-up focus:animate-shift-down hover:bg-peach hover:text-darkgreen hover:shadow-md group">
          Learn More
          <span className="relative pt-1 flex items-center justify-center text-sm">
            <ChevronRight
              size={18}
              className="absolute -left-4 group-hover:left-0 transition-all duration-700"
            />
            <ChevronRight
              size={16}
              className="absolute -left-6 group-hover:-left-2 transition-all duration-500"
            />
            <ChevronRight
              size={14}
              className="absolute -left-8 group-hover:-left-4 transition-all duration-300"
            />
          </span>
        </button>
      </div>
      <span className="mt-20 flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta">
        <Mosque size={24} weight="duotone" /> Umrah Packages
      </span>
      <div
        className="w-full flex items-center gap-5 mt-5 md:mt-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((i, index) => (
          <AboutUsCard
            key={index}
            title={i.title}
            activeIndex={activeIndex}
            cardRef={cardRef}
            index={index}
            cardWidth={cardWidth}
            setCardWidth={setCardWidth}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-between mt-14">
        <div className="h-1 w-2/3 md:w-1/4 rounded-full bg-darkgreen/20 overflow-hidden">
          <div
            className={`h-full rounded-full bg-darkgreen transition-all ease-in-out duration-700
              ${activeIndex === 0 ? 'w-0' : activeIndex === 1 ? 'w-1/4' : activeIndex === 2 ? 'w-1/2' : activeIndex === 3 ? 'w-3/4' : 'w-full'}`}
          ></div>
        </div>
        <div className="flex items-center justify-end gap-5">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`${activeIndex === 0 ? 'opacity-60 border border-darkgreen text-darkgreen' : 'bg-darkgreen text-white'} p-2 rounded-full`}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === cards.length - 2}
            className={`${activeIndex === cards.length - 2 ? 'opacity-60 border border-darkgreen text-darkgreen' : 'bg-darkgreen text-white'} p-2 rounded-full`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
