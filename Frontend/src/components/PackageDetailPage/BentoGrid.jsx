import React, { useState } from 'react';

const BentoGrid = ({ images }) => {
  // Initialize the main image to be the first in the array
  const [mainImage, setMainImage] = useState(images[0].secure_url);

  // Function to update the large image
  const changeImage = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div className="flex flex-col gap-6  md:flex-row items-start space-x-6 border-2 border-dotted border-darkgreen p-4 md:p-6  rounded-md">
      {/* Large image on the left with fixed size */}
      <div className="flex-shrink-0 flex-1 h-[300px] md:h-[500px] ">
        <img
          src={mainImage}
          alt="Main"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Small images on the right stacked vertically, filling the large image's height */}
      <div className="grid grid-cols-3  md:flex md:flex-col gap-4 h-24 sm:h-32 md:h-[500px] !ml-0">
        {images.map(({ _, secure_url }, index) => (
          <div
            key={index}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => changeImage(secure_url)}
          >
            <img
              src={secure_url}
              alt={`Small ${index + 1}`}
              className="w-full h-full md:w-[290px] md:h-auto object-cover rounded-lg "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BentoGrid;
