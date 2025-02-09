import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AboutUs from '../components/HomePage/UmrahPackages';
import MainContent from '../components/HomePage/MainContent';
import ScrollToTopButton from '../components/ScrollToTopButton';
import FloatingButtons from '../components/FoatingButtons';
import HolidayGrid from '../components/HomePage/HoildayGrid';
import Testimonials from '../components/HomePage/Testimonials';
import Marquees from '../components/HomePage/Marquees';
import RecommendedPackages from '../components/HomePage/RecommendedPackages';

const Homepage = () => {
  const [isMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden w-full h-full">
      <FloatingButtons />
      <ScrollToTopButton />

      {/* Main content  */}
      <MainContent isMenuOpen={isMenuOpen} />
      {/* About Us Section */}

      <AboutUs isMenuOpen={isMenuOpen} />

      {/* Package Slider  */}

      <section className="h-full w-full bg-peach bg-opacity-20 shadow-md">
        <HolidayGrid />
      </section>

      {/* A section to be added  */}
      <section className="h-full py-10 mt-20 w-full shadow-md">
        <RecommendedPackages />
      </section>

      {/* Package Slider  */}

      <section className="h-full w-full bg-peach bg-opacity-20 shadow-md">
        <Marquees />
      </section>

      {/* Book Now Section  */}
      {/* <BookNow isMenuOpen={isMenuOpen} /> */}
      {/* Testimonials */}
      <Testimonials isMenuOpen={isMenuOpen} />
      {/* Footer  */}

      {/* <Footer isMenuOpen={isMenuOpen} /> */}
    </div>
  );
};

export default Homepage;
