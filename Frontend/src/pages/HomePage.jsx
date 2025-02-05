import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AboutUs from '../components/HomePage/AboutUs';
import MainContent from '../components/HomePage/MainContent';
import PackageSlider from '../components/HomePage/PackageSlider';
import TestimonialWrapper from '../components/HomePage/TestimonialWrapper';
import ScrollToTopButton from '../components/ScrollToTopButton';
import FloatingButtons from '../components/FoatingButtons';

const Homepage = () => {
  const [isMenuOpen] = useState(false);

  return (
    <div className="relative overflow-x-hidden">
      <FloatingButtons />
      <ScrollToTopButton />
      {/* Primary Navbar */}
      {/* <PrimaryNav isMenuOpen={isMenuOpen} /> */}
      {/* Secondary Navbar */}
      {/* <SecondaryNav
        setIsMore={setIsMore}
        setIsHovered={setIsHovered}
        isHovered={isHovered}
        isMore={isMore}
      /> */}
      {/* Logo Section (Hamburger) */}

      {/* <HamburgerLogo isMenuOpen={isMenuOpen} /> */}

      {/* Hamburger */}
      {/* <Hamburger
        setIsHovered={setIsHovered}
        isHovered={isHovered}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      /> */}

      {/* Main content  */}
      <MainContent isMenuOpen={isMenuOpen} />
      {/* About Us Section */}

      <AboutUs isMenuOpen={isMenuOpen} />

      {/* Package Slider  */}

      <section className="h-full py-10 my-20 w-full bg-peach bg-opacity-30 shadow-sm">
        <PackageSlider isMenuOpen={isMenuOpen} heading={'Our Umrah Packages'} />
      </section>

      {/* A section to be added  */}
      <section className="h-full py-10 my-20 w-full">
        <PackageSlider
          isMenuOpen={isMenuOpen}
          heading={'Our Holiday Packages'}
        />
      </section>

      {/* Package Slider  */}

      <section className="h-full py-10 my-20 w-full bg-peach bg-opacity-30 shadow-sm">
        <PackageSlider
          isMenuOpen={isMenuOpen}
          heading={'Recommended Packages'}
        />
      </section>

      {/* Book Now Section  */}
      {/* <BookNow isMenuOpen={isMenuOpen} /> */}
      {/* Testimonials */}
      <TestimonialWrapper isMenuOpen={isMenuOpen} />
      {/* Footer  */}

      {/* <Footer isMenuOpen={isMenuOpen} /> */}
    </div>
  );
};

export default Homepage;
