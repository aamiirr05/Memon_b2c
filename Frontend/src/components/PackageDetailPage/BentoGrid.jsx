import { useState } from 'react';

const BentoGrid = ({ images }) => {
  // Initialize the main image to be the first in the array
  const [mainImage, setMainImage] = useState(images[0].secure_url);

  // Function to update the large image
  const changeImage = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row items-start space-x-6 sm:p-4 sm:border-2 border-dotted border-darkgreen rounded-md overflow-clip">
      {/* Large image on the left with fixed size */}
      <div className="flex-shrink-0 flex-1 w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden sm:border border-darkgreen rounded-md">
        <img
          src={mainImage}
          alt="Main"
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-md"
        />
      </div>

      {/* Small images on the right stacked vertically, excluding the selected image */}
      <div className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-col gap-4 !ml-0">
        {images
          .filter(({ secure_url }) => secure_url !== mainImage) // Exclude the selected image
          .map(({ secure_url }, index) => (
            <div
              key={index}
              className="cursor-pointer overflow-hidden rounded-lg"
              onClick={() => changeImage(secure_url)}
            >
              <img
                src={secure_url}
                alt={`Small ${index + 1}`}
                className="w-full h-[100px] sm:h-[150px] md:w-[300px] md:h-[192px] lg:w-[340px] lg:h-[240px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BentoGrid;
