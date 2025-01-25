import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first image
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1); // Loop back to the last image
    }
  };

  return (
    <div className="relative w-full">
      {/* Image Container */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <img
          src={images[currentIndex].secure_url}
          alt={`Hotel Image ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-3 sm:left-5 transform -translate-y-1/2 bg-darkgreen text-peach p-2 rounded-full hover:scale-110 transition-all"
      >
        <ChevronLeft className="size-5 md:size-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute top-1/2 right-3 sm:right-5 transform -translate-y-1/2 bg-darkgreen text-peach p-2 rounded-full hover:scale-110 transition-all"
      >
        <ChevronRight className="size-5 md:size-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-all ${
              index === currentIndex ? 'bg-darkgreen' : 'bg-darkgreen/30'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
