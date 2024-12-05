/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PackageCard from './PackageCard';
import Slider from 'react-slick';

const PackageSlider = ({ isMenuOpen, heading }) => {
  const CustomPrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <ChevronLeft className="text-mediumgreen" size={35} />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <ChevronRight className="text-mediumgreen" size={35} />
    </div>
  );
  const settingsOne = {
    className: 'center',
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    dots: false,
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
          slidesToShow: 2,
          centerMode: false,
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
        className={`w-11/12 mx-auto slider-container ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        <h1 className="xl:after:w-[35%] ml-8 md:ml-0 lg:after:w-[30%] md:after:w-[40%] after:w-[57%] skew-heading relative text-2xl font-zodiak text-peach md:text-4xl font-semibold mb-10">
          {heading}
        </h1>
        <Slider
          {...settingsOne}
          className="w-full lg:w-11/12 mx-auto bg-transparent"
        >
          <div className="slides-packed">
            <PackageCard />
          </div>
          <div className="slides-packed">
            <PackageCard />
          </div>
          <div className="slides-packed">
            <PackageCard />
          </div>
          <div className="slides-packed">
            <PackageCard />
          </div>
          <div className="slides-packed">
            <PackageCard />
          </div>
        </Slider>
      </section>
    </>
  );
};

export default PackageSlider;
