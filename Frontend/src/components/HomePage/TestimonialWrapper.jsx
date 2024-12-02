/* eslint-disable react/prop-types */

import Slider from 'react-slick';
import Testimonials from './Testimonials';

const TestimonialWrapper = ({ isMenuOpen }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    padding: 60,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section
        className={`w-11/12 mx-auto my-40 slider-container ${isMenuOpen ? 'blur-sm' : 'blur-0'} `}
      >
        <h1 className="skew-heading text-3xl font-zodiak text-peach md:text-4xl font-semibold mb-10 md:mb-20 xl:after:w-1/4 after:ml-8 md:after:ml-0 ml-8 md:ml-0 lg:after:w-[38%] md:after:w-[50%] after:w-[74%]">
          Our Testimonials
        </h1>
        <Slider {...settings} className="w-full bg-transparent">
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
          <div className="slides p-3">
            <Testimonials />
          </div>
        </Slider>
      </section>
    </>
  );
};

export default TestimonialWrapper;
