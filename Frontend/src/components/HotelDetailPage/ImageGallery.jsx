import { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.secure_url);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left: Large Image */}
      <div className="flex-1 transition-all">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected Hotel"
            className="w-full h-[250px] sm:h-[300px] md:h-[500px] object-cover rounded-md shadow-md "
          />
        )}
      </div>

      {/* Right: Smaller Images */}
      <div className="flex flex-row md:flex-col gap-2 md:gap-4 lg:gap-6 p-1 md:py-0.5 md:px-1.5 overflow-y-auto md:custom-scrollbar max-h-[500px]">
        {images.map((img) => (
          <img
            src={img.secure_url}
            key={img.secure_url}
            alt="Hotel thumbnail"
            className={`w-48 h-32 md:w-72 md:h-44 lg:w-96 lg:h-52 object-cover cursor-pointer rounded-md transition-all ${
              selectedImage === img.secure_url ? 'ring-2 ring-darkgreen' : ''
            }`}
            onClick={() => setSelectedImage(img.secure_url)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
