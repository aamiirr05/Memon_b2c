import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Sidebar = ({ images = [] }) => {
  // Replace these image URLs with your actual image URLs

  return (
    <div className="sticky top-24  h-[calc(100dvh-64px)] w-80 hidden  md:flex flex-col items-center  shadow-lg overflow-y-scroll no-scrollbar rounde-xl ">
      {/* Full-Height and Full-Width Image Slider */}
      <div className="w-full h-full rounded-xl overflow-hidden  ">
        <Swiper
          direction={'horizontal'}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="h-full w-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default Sidebar;
