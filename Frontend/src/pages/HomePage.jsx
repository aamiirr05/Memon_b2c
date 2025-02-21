import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AboutUs from '../components/HomePage/UmrahPackages';
import MainContent from '../components/HomePage/MainContent';
import ScrollToTopButton from '../components/ScrollToTopButton';
import HolidayGrid from '../components/HomePage/HoildayGrid';
import Testimonials from '../components/HomePage/Testimonials';
import Marquees from '../components/HomePage/Marquees';
import RecommendedPackages from '../components/HomePage/RecommendedPackages';
import { Helmet } from 'react-helmet-async';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Memon Haj Umrah Tours & Travel </title>
        <meta name="description" content={`description`} />
        <meta property="og:title" content={`title`} />
        <meta property="og:description" content={`description`} />
        <meta property="og:image" content={`image`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="overflow-x-hidden w-full h-full">
        <ScrollToTopButton />

        {/* Main content  */}
        <MainContent />
        {/* About Us Section */}

        <AboutUs />

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

        <Testimonials />
        {/* Footer  */}
      </div>
    </>
  );
};

export default Homepage;
