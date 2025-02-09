/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight, MoveRight, ThumbsUp } from 'lucide-react';
import { useRef, useState } from 'react';
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import useFetchPackages from '../../Admin/hooks/UseFetchPackages';

const UmrahCards = ({
  description,
  image,
  cardRef,
  index,
  activeIndex,
  cardWidth,
  setCardWidth,
  title,
  days,
  nights,
  price,
}) => {
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [cardRef, setCardWidth]);
  return (
    <div
      className="w-full md:w-1/2 xl:w-[30%] flex flex-col flex-shrink-0 shadow-lg overflow-hidden rounded-xl gap-2 transition-all ease-in-out duration-700"
      ref={index === 0 ? cardRef : null}
      style={{
        transform: `translateX(-${activeIndex * (cardWidth + 40)}px)`,
        transition: 'transform 0.5s ease-in-out',
      }}
    >
      <div className="w-full flex items-center justify-center">
        <div className="h-[280px] md:h-[200px] lg:h-[280px] w-11/12 overflow-hidden">
          <img
            src={image || ''}
            alt=""
            className="w-full  rounded-xl mx-auto h-full"
          />
        </div>
      </div>
      <div className="w-full mx-auto flex md:flex-col items-start justify-between pt-4 px-5">
        <span className="font-zodiak  text-md text-darkgreen">
          {title.split(' ').slice(0, 5).join(' ')}
          {title.split(' ').length > 5 && '...'}
        </span>
        <span className="font-jakarta text-xs text-mediumgreen">
          {days} Days / {nights} nights
        </span>
      </div>
      <div className="p-3 w-full text-left text-sm mx-auto font-jakarta text-darkgreen font-medium">
        {description.split(' ').slice(0, 20).join(' ')}
        {description.split(' ').length > 20 && '...'}
      </div>

      <div className="w-full text-sm font-jakarta p-3 flex items-center justify-between">
        <div className="border text-darkgreen border-darkgreen/60 p-2 px-4 rounded-full">
          From ₹ {price}
        </div>
        <div className="bg-mediumgreen text-white p-2 px-4 rounded-full">
          Book Now
        </div>
      </div>
    </div>
  );
};

const RecommendedPackages = ({ isMenuOpen }) => {
  const getPackages = useFetchPackages('users/fetch-all-umrah-packages');

  const filterCards = getPackages?.data?.data.filter((_, i) => i < 6) || [];

  const cards = [
    ...filterCards,

    { title: 'Explore All', description: 'Description for Card 6' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef(null);

  const handleNext = () => {
    if (activeIndex < cards.length - 3) {
      if (window.outerWidth <= 425) {
        setActiveIndex((prev) => prev + 1);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <section
        className={`mb-10 md:mb-20 p-5 md:p-10 w-[99%] mx-auto ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        <span className="flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta">
          <span>
            <ThumbsUp size={20} weight="duotone" />
          </span>
          Recommended Packages
        </span>
        <div className="w-full mt-5 md:mt-8">
          <div className="flex flex-col gap-3 md:gap-0 md:flex-row items-start justify-between">
            <div className="md:w-1/2 lg:w-1/2 mt-4 text-darkgreen font-zodiak leading-snug text-4xl lg:text-4xl md:text-3xl">
              Your next favourite place awaits
            </div>
            {/*  */}
            <div className="flex flex-col gap-5 md:w-1/2 lg:w-1/3">
              <div className="mb-10 lg:mb-5 text-darkgreen font-jakarta font-medium leading-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                accusantium natus eius illo enim nostrum adipisci assumenda aut
                voluptatem impedit?
              </div>
              <button className="cursor-pointer flex items-center gap-10 bg-mediumgreen p-3 px-10 text-md rounded-full text-white font-medium font-jakarta transition-all duration-200 hover:animate-shift-up focus:animate-shift-down hover:bg-peach hover:text-mediumgreen w-fit hover:shadow-md group">
                See All
                <span className="relative w-fit pt-1 flex items-center justify-center text-sm">
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
          </div>
        </div>

        {/* buttons and progress bar  */}
        <div className="w-full flex items-center justify-between mt-14">
          <div className="h-1 w-2/3 md:w-1/4 rounded-full bg-darkgreen/20 overflow-hidden">
            <div
              className={`
               h-full rounded-full bg-mediumgreen w-0 transition-all ease-in-out duration-700
              ${activeIndex == 0 ? 'w-0' : activeIndex == 1 ? 'w-1/4' : activeIndex == 2 ? 'w-1/2' : activeIndex == 3 ? 'w-3/4' : 'w-full'}
              
              
              `}
            ></div>
          </div>
          <div className="flex items-center justify-end gap-5 ">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={` ${activeIndex === 0 ? 'opacity-60 border border-mediumgreen text-mediumgreen' : 'bg-mediumgreen text-white'} p-2  rounded-full`}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === cards.length - 1}
              className={` ${activeIndex === cards.length - 2 ? 'opacity-60 border border-mediumgreen text-mediumgreen' : 'bg-mediumgreen text-white'} p-2  rounded-full`}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="w-full flex relative items-center gap-10 mt-5 md:mt-10">
          {/* Card */}
          {cards.map((i, index) => (
            <>
              {i.title == 'Explore All' ? (
                <div
                  className={`text-xl  hidden xl:flex absolute top-1/3 items-center justify-center gap-4 cursor-pointer ease-in-out transition-all duration-1000 right-32 bg-peach text-darkgreen shadow-md hover:animate-shift-up overflow-hidden font-jakarta p-2 px-6 rounded-xl ${activeIndex == cards.length - 3 ? 'translate-x-0 z-0' : 'translate-x-96 -z-10'}
                   before:absolute before:inset-0 before:w-0 before:bg-darkgreen before:z-[-1] before:transition-all before:duration-400 hover:before:w-full hover:text-peach before:rounded-xl before:ease-in-out
                  
                  `}
                >
                  {i.title} <MoveRight />
                </div>
              ) : (
                <UmrahCards
                  description={i?.description}
                  title={i?.package_name}
                  days={i?.total_days}
                  nights={i?.total_nights}
                  price={i?.prices[0].quint_price}
                  image={i?.package_image[0].secure_url}
                  activeIndex={activeIndex}
                  cardRef={cardRef}
                  index={index}
                  key={index}
                  cardWidth={cardWidth}
                  setCardWidth={setCardWidth}
                />
              )}
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default RecommendedPackages;
