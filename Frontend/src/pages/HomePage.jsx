import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AboutUs from '../components/HomePage/AboutUs';
import MainContent from '../components/HomePage/MainContent';
import ScrollToTopButton from '../components/ScrollToTopButton';
import FloatingButtons from '../components/FoatingButtons';
import UmrahPackages from '../components/HomePage/UmrahPackages';
import HolidayGrid from '../components/HomePage/HoildayGrid';
import Testimonials from '../components/HomePage/Testimonials';

const Homepage = () => {
  const [isMenuOpen] = useState(false);

  return (
    <div className="relative overflow-x-hidden">
      <FloatingButtons />
      <ScrollToTopButton />

      {/* Main content  */}
      <MainContent isMenuOpen={isMenuOpen} />
      {/* About Us Section */}

      <AboutUs isMenuOpen={isMenuOpen} />

      {/* Package Slider  */}

      <section className="h-full w-full bg-peach bg-opacity-20 shadow-sm">
        <HolidayGrid />
      </section>

      {/* A section to be added  */}
      <section className="h-full py-10 my-20 w-full">
        <UmrahPackages />
      </section>

      {/* Package Slider  */}

      <section className="h-full py-10 my-20 w-full bg-peach bg-opacity-20 shadow-sm">
        {/* <PackageSlider
          isMenuOpen={isMenuOpen}
          heading={'Recommended Packages'}
        /> */}
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
