import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    function PageOneAnimation() {
      const tl = gsap.timeline();

      tl.from('.section-one-heading h1', {
        duration: 0.9,
        opacity: 0,
        y: 200,
        // stagger: 0.15,
      });

      tl.from('.section-one-heading p', {
        duration: 0.9,
        opacity: 0,
        y: 200,
        // stagger: 0.15,
      });
    }

    PageOneAnimation();

    function PageTwoAnimation() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-two',
          scroller: 'body',
          // markers: true,
          start: 'top 45%',
          end: 'top 5%',
          scrub: 3,
        },
      });

      tl.from(
        '.section-two .heading-wel',
        {
          opacity: 0,
          duration: 0.5,
          x: -200,
        },
        'one'
      );

      tl.from(
        '.section-two .heading-com-one',
        {
          opacity: 0,
          duration: 0.5,
          x: -200,
          delay: 0.2,
        },
        'one'
      );

      tl.from(
        '.section-two .heading-com-two',
        {
          opacity: 0,
          duration: 0.5,
          x: -200,
          delay: 0.4,
        },
        'one'
      );

      tl.from(
        '.section-two .help-box',
        {
          opacity: 0,
          duration: 0.5,
          x: 200,
        },
        'one'
      );

      tl.from('.section-two .para-one', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from('.section-two .heading-who', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from('.section-two .para-two', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });
    }

    PageTwoAnimation();

    // Book Now Section Anim...
    function PageThreeAnimation() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-book-now',
          scroller: 'body',
          // markers: true,
          start: 'top 50%',
          end: 'top 10%',
          scrub: 3,
        },
      });

      tl.from('.section-book-now .heading-one', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from('.section-book-now .heading-two', {
        opacity: 0,
        duration: 0.5,
        x: -200,
      });

      tl.from(
        '.section-book-now .card-one-big',
        {
          opacity: 0,
          duration: 1,
          x: -300,
        },
        'one'
      );

      tl.from(
        '.section-book-now .card-two',
        {
          opacity: 0,
          duration: 1,
          x: 300,
        },
        'one'
      );

      tl.from(
        '.section-book-now .card-one',
        {
          opacity: 0,
          duration: 1,
          y: 300,
        },
        'one'
      );

      tl.from('.section-book-now .card-three , .section-book-now .card-four', {
        opacity: 0,
        duration: 1,
        x: 300,
      });

      tl.from('.section-book-now .para-one', {
        opacity: 0,
        duration: 0.5,
        x: -300,
        delay: 0.6,
      });
    }

    PageThreeAnimation();
  });

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
