import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Footer from './HomePage/Footer';
import PrimaryNav from './HomePage/PrimaryNav';
import SecondaryNav from './HomePage/SecondaryNav';
import AboutUs from './HomePage/AboutUs';
import MainContent from './HomePage/MainContent';
import Hamburger from './HomePage/Hamburger';
import HamburgerLogo from './HomePage/HamburgerLogo';
import PackageSlider from './HomePage/PackageSlider';
import TestimonialWrapper from './HomePage/TestimonialWrapper';

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative overflow-x-hidden">
      {/* Primary Navbar */}
      <PrimaryNav isMenuOpen={isMenuOpen} />
      {/* Secondary Navbar */}
      <SecondaryNav
        setIsMore={setIsMore}
        setIsHovered={setIsHovered}
        isHovered={isHovered}
        isMore={isMore}
      />
      {/* Logo Section (Hamburger) */}

      <HamburgerLogo isMenuOpen={isMenuOpen} />

      {/* Hamburger */}
      <Hamburger
        setIsHovered={setIsHovered}
        isHovered={isHovered}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

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

      <Footer isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default Homepage;
