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
        <title>Memon Haj Umrah Tours & Travels | Hajj & Umrah Packages from Mumbai</title>
        <meta name="description" content="Book Hajj & Umrah packages from Mumbai with Memon Haj Umrah Tours & Travels. IATA certified. Affordable packages, visa assistance, hotels near Haram." />
        <meta property="og:title" content="Memon Haj Umrah Tours & Travels | Mumbai" />
        <meta property="og:description" content="Trusted Hajj & Umrah tour operator from Mumbai. No hidden charges, expert guidance, hotels near Haram." />
        <meta property="og:image" content="https://res.cloudinary.com/memonb2c/image/upload/v1739885803/rmf00msx8vhusevuc2iv.png" />
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
