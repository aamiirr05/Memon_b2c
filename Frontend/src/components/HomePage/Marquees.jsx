import Marquee from './Marquee';
import { FilmStrip } from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Marquees = () => {
  var images = [
    [
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085981/WhatsApp_Image_2025-02-08_at_13.23.28_4de7674c_xxrubk.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085978/IMG-20250208-WA0047_rt8bra.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085979/IMG-20250208-WA0048_jmwv07.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085978/IMG-20250208-WA0047_rt8bra.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085980/IMG-20250208-WA0050_ajzt0f.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085978/IMG-20250208-WA0044_f1vaal.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085976/IMG-20250208-WA0042_cems1z.webp',
      'https://res.cloudinary.com/memonb2c/video/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085992/VID-20250208-WA0005_kiphiw.mp4',
      'https://res.cloudinary.com/memonb2c/video/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085996/WhatsApp_Video_2025-02-08_at_13.22.33_0540eae5_xkshr0.mp4',
    ],
    [
      'https://res.cloudinary.com/memonb2c/video/upload/v1739085996/WhatsApp_Video_2025-02-08_at_13.22.33_0540eae5_xkshr0.mp4',
      'https://res.cloudinary.com/memonb2c/video/upload/v1739085992/VID-20250208-WA0005_kiphiw.mp4',

      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085976/IMG-20250208-WA0042_cems1z.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085978/IMG-20250208-WA0044_f1vaal.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085980/IMG-20250208-WA0050_ajzt0f.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085978/IMG-20250208-WA0047_rt8bra.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085979/IMG-20250208-WA0048_jmwv07.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085978/IMG-20250208-WA0047_rt8bra.webp',
      'https://res.cloudinary.com/memonb2c/image/upload/w_500,h_300,c_fill,f_auto,q_auto/v1739085981/WhatsApp_Image_2025-02-08_at_13.23.28_4de7674c_xxrubk.webp',
    ],
  ];

  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 'all',
  });
  return (
    <>
      <div className="p-5 md:p-10 w-[99%] mx-auto mb-20">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backInOut' }}
          className="mt-20 flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta"
        >
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'backInOut' }}
          >
            <FilmStrip size={20} />
          </motion.span>
          Photo Gallery
        </motion.span>
        <div className="w-full mt-5 md:mt-8" ref={ref}>
          <div className="flex flex-col gap-3 md:gap-0 md:flex-row items-start justify-between">
            {/*  */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
              <motion.div
                animate={{
                  x: isInView ? 0 : '-20vw',
                  opacity: isInView ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.3, stiffness: 120 }}
                className="md:w-1/2 text-darkgreen font-zodiak leading-snug text-4xl lg:text-4xl"
              >
                Memorable Moments: A Visual Journey
              </motion.div>
              <div className="text-sm sm:text-md mb-5 md:w-1/2 text-darkgreen font-jakarta font-medium leading-normal">
                <motion.p
                  animate={{
                    x: isInView ? 0 : '20vw',
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.3, stiffness: 120 }}
                  className="pb-2"
                >
                  {' '}
                  Take a look at beautiful memories from amazing journeys! This
                  gallery captures special moments, stunning places, and the joy
                  of travel.{' '}
                </motion.p>
                <motion.p
                  animate={{
                    x: isInView ? 0 : '20vw',
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.5, stiffness: 120 }}
                >
                  🌍 Explore New Destinations – See breathtaking views.
                </motion.p>{' '}
                <motion.p
                  animate={{
                    x: isInView ? 0 : '20vw',
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.7, stiffness: 120 }}
                >
                  🕋 Spiritual Journeys – Feel the peace and connection.
                </motion.p>{' '}
                <motion.p
                  animate={{
                    x: isInView ? 0 : '20vw',
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 1, stiffness: 120 }}
                >
                  🍛 Delicious Food – Enjoy tasty meals from different places.
                </motion.p>{' '}
                <motion.p
                  animate={{
                    x: isInView ? 0 : '20vw',
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 1.2, stiffness: 120 }}
                >
                  🚌 Smooth Travel – Experience comfort and adventure.
                </motion.p>{' '}
                <motion.p
                  animate={{
                    x: isInView ? 0 : '20vw',
                    opacity: isInView ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 1.3, stiffness: 120 }}
                  className="pt-2"
                >
                  Every picture tells a story. Let these moments inspire your
                  next journey! ✨
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-20 px-10 w-full relative overflow-hidden">
        {images.map((item, index) => {
          return (
            <Marquee
              key={index}
              imagesurl={item}
              direction={index === 0 ? 'left' : 'right'}
            />
          );
        })}
      </div>
    </>
  );
};

export default Marquees;
