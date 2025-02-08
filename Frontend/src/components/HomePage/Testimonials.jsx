import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Signature } from '@phosphor-icons/react';

const Testimonials = ({ isMenuOpen }) => {
  const testimonials = [
    {
      id: 1,
      name: 'Zaid Achhwa',
      star: 5,
      city: 'Mumbai',
      country: 'India',
      review: 'Zaid provided an exceptional experience!',
    },
    {
      id: 2,
      name: 'Taufiq Khan',
      star: 5,
      city: 'Mumbai',
      country: 'India',
      review: 'Highly recommend! Great service and friendly staff.',
    },
    {
      id: 3,
      name: 'Aamir Bhathara',
      star: 5,
      city: 'Mumbai',
      country: 'India',
      review: 'The best travel experience I have ever had!',
    },
    {
      id: 4,
      name: 'Aqeeb Khan',
      star: 5,
      city: 'Mumbai',
      country: 'India',
      review: 'Wonderful packages and excellent customer care!',
    },
    {
      id: 5,
      name: 'Rehan Khan',
      star: 5,
      city: 'Mumbai',
      country: 'India',
      review: 'Affordable and high-quality tours!',
    },
    {
      id: 6,
      name: 'Rehan Achhwa',
      star: 5,
      city: 'Mumbai',
      country: 'India',
      review: 'Amazing support and unforgettable trips!',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [testimonials.length]);

  // Calculate indices for left, middle, and right cards
  const prevIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (currentIndex + 1) % testimonials.length;

  return (
    <section
      className={`mb-10 flex flex-col items-center justify-center md:mb-20 p-5 md:p-10 w-[99%] mx-auto ${
        isMenuOpen ? 'blur-sm' : 'blur-0'
      }`}
    >
      <span className="flex items-center justify-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta mb-10">
        {/* <Signature size={20} /> */}
        <Signature size={22} weight="duotone" />
        Testimonials
      </span>

      {/* Grid */}
      <div className="w-11/12 font-jakarta md:mt-16 mx-auto flex flex-col gap-10 items-center justify-center">
        {/* Testimonial Wrapper with Fixed Height */}
        <div className="relative w-5/6 md:w-3/4 h-[150px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute text-darkgreen font-semibold text-xl md:text-3xl text-center w-full px-5"
            >
              {testimonials[currentIndex].review}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Cards */}
        <div className="w-full gap-5 flex items-center justify-center">
          {/* Left Card (Previous Review) */}
          <motion.div
            key={prevIndex}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.5, scale: 0.9 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex w-1/2 lg:w-1/4 p-5 border border-darkgreen rounded-xl items-center justify-center flex-col gap-1"
          >
            <h1 className="font-zodiak text-md lg:text-xl">
              {testimonials[prevIndex].name}
            </h1>
            <h1 className="text-sm text-mediumgreen">{`${testimonials[prevIndex].city}, ${testimonials[prevIndex].country}`}</h1>
            <span className="flex items-center justify-center gap-1 mt-5">
              {Array.from({ length: testimonials[prevIndex].star }).map(
                (_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" />
                )
              )}
            </span>
          </motion.div>

          {/* Middle Card (Current Review - Scaled Up) */}
          <motion.div
            key={currentIndex}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-5/6 md:w-1/2 lg:w-1/4 p-5 border border-darkgreen rounded-xl flex items-center justify-center flex-col gap-1 shadow-lg"
          >
            <h1 className="font-zodiak text-md lg:text-xl text-darkgreen">
              {testimonials[currentIndex].name}
            </h1>
            <h1 className="text-xs text-mediumgreen">{`${testimonials[currentIndex].city}, ${testimonials[currentIndex].country}`}</h1>
            <span className="flex items-center justify-center gap-1 mt-5">
              {Array.from({ length: testimonials[currentIndex].star }).map(
                (_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className="text-yellow-400 fill-yellow-400"
                  />
                )
              )}
            </span>
          </motion.div>

          {/* Right Card (Next Review) */}
          <motion.div
            key={nextIndex}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.5, scale: 0.9 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex w-1/2 lg:w-1/4 p-5 border border-darkgreen rounded-xl items-center justify-center flex-col gap-1"
          >
            <h1 className="font-zodiak text-md lg:text-xl">
              {testimonials[nextIndex].name}
            </h1>
            <h1 className="text-xs text-mediumgreen">{`${testimonials[nextIndex].city}, ${testimonials[nextIndex].country}`}</h1>
            <span className="flex items-center justify-center gap-1 mt-5">
              {Array.from({ length: testimonials[nextIndex].star }).map(
                (_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" />
                )
              )}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
