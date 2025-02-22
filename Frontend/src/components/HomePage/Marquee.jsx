/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import captions from '../../utils/captions.vtt';
import posterImg from '../../assets/img/hero-bg.webp';

const Marquee = ({ imagesurl, direction }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex w-full">
      <motion.div
        className="flex flex-shrink-0 gap-20 lg:py-10 pr-20"
        initial={{ x: direction === 'left' ? '0' : '-100%' }}
        animate={{ x: direction === 'left' ? '-100%' : '0' }}
        transition={{ ease: 'linear', duration: '60', repeat: Infinity }}
      >
        {imagesurl.map((url, index) => (
          <div
            onClick={() => setSelectedImage(url)}
            key={index}
            className="w-[200px] h-[100px] md:w-[250px] md:h-[150px]"
          >
            {url.includes('.mp4') ? (
              <video
                className="w-full h-full cursor-pointer flex-shrink-0 rounded-xl object-cover"
                key={index}
                poster={posterImg}
                autoPlay
                loop
                muted
              >
                <source src={url} type="video/mp4"></source>
                <track
                  src={captions}
                  kind="captions"
                  srcLang="en"
                  label="English"
                ></track>
              </video>
            ) : (
              <img
                src={url}
                loading="lazy"
                alt="photo grid images"
                className="w-full h-full cursor-pointer flex-shrink-0 rounded-xl"
                key={index}
              />
            )}
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex flex-shrink-0 gap-20 lg:py-10 pr-20 mb-20"
        initial={{ x: direction === 'right' ? '-100%' : '0' }}
        animate={{ x: direction === 'right' ? '0' : '-100%' }}
        transition={{ ease: 'linear', duration: '60', repeat: Infinity }}
      >
        {imagesurl.map((url, index) => (
          <div
            onClick={() => setSelectedImage(url)}
            key={index}
            className="w-[200px] h-[100px] md:w-[250px] md:h-[150px]"
          >
            {url.includes('.mp4') ? (
              <video
                className="w-full h-full cursor-pointer flex-shrink-0 rounded-xl object-cover"
                key={index}
                poster={posterImg}
                autoPlay
                loop
                playsInline
                muted
              >
                <source src={url} type="video/mp4"></source>
                <track
                  src={captions}
                  kind="captions"
                  srcLang="en"
                  label="English"
                ></track>
              </video>
            ) : (
              <img
                src={url}
                alt="Grid Images"
                loading="lazy"
                className="w-full cursor-pointer h-full -20 flex-shrink-0 rounded-xl"
                key={index}
              />
            )}
          </div>
        ))}
      </motion.div>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 "
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative bg-lightpeach rounded-lg w-9/12 md:w-auto md:max-w-lg">
            <button
              aria-label="Close"
              onClick={() => setSelectedImage(null)}
              className="absolute z-40 cursor-pointer top-2 right-2 text-xl font-bold text-darkgreen bg-white rounded-full"
            >
              <CircleX size={32} />
            </button>
            {selectedImage.includes('.mp4') ? (
              <video
                className="w-[500px] h-[300px] object-cover rounded-lg"
                poster={posterImg}
                autoPlay
                controls
                loop
                muted
                playsInline
              >
                <source src={selectedImage} type="video/mp4"></source>
                <track
                  src={captions}
                  kind="captions"
                  srcLang="en"
                  label="English"
                  default
                ></track>
              </video>
            ) : (
              <img
                src={selectedImage}
                alt="Selected Image"
                loading="lazy"
                className="w-full rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marquee;
