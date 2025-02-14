/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useRef, useState } from 'react';
import { Mosque } from '@phosphor-icons/react';
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import useFetchPackages from '../../Admin/hooks/UseFetchPackages';
import { NavLink } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const AboutUsCard = ({
  description,
  price,
  image,
  cardRef,
  index,
  activeIndex,
  cardWidth,
  setCardWidth,
  id,
}) => {
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [cardRef, setCardWidth]);
  return (
    <NavLink
      to={`/umrah-packages/package-details/${id}`}
      className="hover:bg-darkgreen/10 w-full md:w-[48%] flex flex-col flex-shrink-0 gap-5 border-[1.5px] border-opacity-40 shadow-sm border-darkgreen p-3 rounded-xl transition-all ease-in-out duration-700"
      ref={index === 0 ? cardRef : null}
      style={{
        transform: `translateX(-${activeIndex * (cardWidth + 20)}px)`,
        transition: 'transform 0.5s ease-in-out',
      }}
    >
      <div className="w-full flex items-start justify-between">
        <div className="h-[150px] w-2/3 lg:w-[40%] rounded-lg overflow-hidden">
          <img src={image} alt="" className="w-full h-full" />
        </div>
        <span className="text-xl md:text-2xl font-jakarta text-darkgreen font-semibold">
          ₹ {price}
        </span>
      </div>
      <div className="w-full md:text-sm font-jakarta p-1 text-mediumgreen font-medium">
        {description.split(' ').slice(0, 25).join(' ')}
        {description.split(' ').length > 25 && '...'}
      </div>
    </NavLink>
  );
};

const UmrahPackages = ({ isMenuOpen }) => {
  const getPackages = useFetchPackages('users/fetch-all-umrah-packages');

  const filterCards = getPackages?.data?.data.filter((_, i) => i < 6) || [];

  const cards = [...filterCards];

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

  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 'all',
  });
  return (
    <section
      className={`mb-10 md:mb-20 p-5 md:p-10 w-[99%] mx-auto ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
    >
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backInOut' }}
        className="flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'backInOut' }}
        >
          <Info size={20} weight="duotone" />
        </motion.span>{' '}
        About Us
      </motion.span>
      <div
        ref={ref}
        className="w-full mx-auto mt-5 md:mt-8 lg:my-10 flex items-center justify-center"
      >
        <div className="w-full font-zodiak text-darkgreen flex flex-col gap-5">
          <motion.div
            animate={{ x: isInView ? 0 : '-20vw', opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3, stiffness: 120 }}
            className="md:w-1/1 lg:w-1/2 leading-snug text-4xl "
          >
            What&apos;s so special about this ?
          </motion.div>
          <motion.div
            animate={{ x: isInView ? 0 : '-35vw', opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.3, stiffness: 120 }}
            className="md:w-9/12 lg:w-10/12 mb-10 lg:mb-5 text-mediumgreen font-jakarta font-medium leading-normal"
          >
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
          </motion.div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <motion.button
          animate={{ z: isInView ? 0 : 200, opacity: isInView ? 1 : 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            type: 'spring',
            stiffness: 120,
            ease: 'easeInOut',
          }}
          className="cursor-pointer flex items-center gap-10 bg-darkgreen p-3 px-7 text-md rounded-full text-white font-medium font-jakarta transition-all duration-200 hover:animate-shift-up focus:animate-shift-down hover:bg-peach hover:text-darkgreen hover:shadow-md group"
        >
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
        </motion.button>
      </div>
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backInOut' }}
        className="mt-20 flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'backInOut' }}
        >
          <Mosque size={24} weight="duotone" />
        </motion.span>
        Umrah Packages
      </motion.span>
      <div
        className={`w-full flex items-center gap-5 mt-5 md:mt-10 ${!getPackages?.data ? 'justify-center' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {getPackages?.data ? (
          cards.map((i, index) => (
            <AboutUsCard
              key={index}
              description={i?.description}
              image={i?.package_image[0].secure_url}
              price={i?.prices[0].quint_price}
              activeIndex={activeIndex}
              cardRef={cardRef}
              index={index}
              cardWidth={cardWidth}
              setCardWidth={setCardWidth}
              id={i?.package_id}
            />
          ))
        ) : (
          <div className="flex items-center font-jakarta text-darkgreen justify-center text-xl font-semibold text-center">
            Loading Please Wait...
          </div>
        )}
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

export default UmrahPackages;
