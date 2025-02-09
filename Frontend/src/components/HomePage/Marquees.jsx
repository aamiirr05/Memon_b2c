import Marquee from './Marquee';
import { FilmStrip } from '@phosphor-icons/react';

const Marquees = () => {
  var images = [
    [
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085981/WhatsApp_Image_2025-02-08_at_13.23.28_4de7674c_xxrubk.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085978/IMG-20250208-WA0047_rt8bra.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085979/IMG-20250208-WA0048_jmwv07.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085978/IMG-20250208-WA0047_rt8bra.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085980/IMG-20250208-WA0050_ajzt0f.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085978/IMG-20250208-WA0044_f1vaal.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085976/IMG-20250208-WA0042_cems1z.jpg',
      'https://res.cloudinary.com/memonb2c/video/upload/v1739085992/VID-20250208-WA0005_kiphiw.mp4',
      'https://res.cloudinary.com/memonb2c/video/upload/v1739085996/WhatsApp_Video_2025-02-08_at_13.22.33_0540eae5_xkshr0.mp4',
    ],
    [
      'https://res.cloudinary.com/memonb2c/video/upload/v1739085996/WhatsApp_Video_2025-02-08_at_13.22.33_0540eae5_xkshr0.mp4',
      'https://res.cloudinary.com/memonb2c/video/upload/v1739085992/VID-20250208-WA0005_kiphiw.mp4',

      'https://res.cloudinary.com/memonb2c/image/upload/v1739085976/IMG-20250208-WA0042_cems1z.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085978/IMG-20250208-WA0044_f1vaal.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085980/IMG-20250208-WA0050_ajzt0f.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085978/IMG-20250208-WA0047_rt8bra.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085979/IMG-20250208-WA0048_jmwv07.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085978/IMG-20250208-WA0047_rt8bra.jpg',
      'https://res.cloudinary.com/memonb2c/image/upload/v1739085981/WhatsApp_Image_2025-02-08_at_13.23.28_4de7674c_xxrubk.jpg',
    ],
  ];
  return (
    <>
      <div className="p-5 md:p-10 w-[99%] mx-auto mb-20">
        <span className="mt-20 flex items-center gap-2 w-fit border border-darkgreen p-1 px-5 text-md rounded-full text-darkgreen font-medium font-jakarta">
          <span>
            <FilmStrip size={20} />
          </span>
          Photo Gallery
        </span>
        <div className="w-full mt-5 md:mt-8">
          <div className="flex flex-col gap-3 md:gap-0 md:flex-row items-start justify-between">
            {/*  */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
              <div className="md:w-1/2 text-darkgreen font-zodiak leading-snug text-4xl lg:text-4xl">
                Memorable Moments: A Visual Journey
              </div>
              <div className="mb-5 md:w-1/2 text-darkgreen font-jakarta font-medium leading-normal">
                <p className="pb-2">
                  {' '}
                  Take a look at beautiful memories from amazing journeys! This
                  gallery captures special moments, stunning places, and the joy
                  of travel.{' '}
                </p>
                <p>
                  🌍 Explore New Destinations – See breathtaking views.
                </p>{' '}
                <p>🕋 Spiritual Journeys – Feel the peace and connection.</p>{' '}
                <p>
                  🍛 Delicious Food – Enjoy tasty meals from different places.
                </p>{' '}
                <p>🚌 Smooth Travel – Experience comfort and adventure.</p>{' '}
                <p className="pt-2">
                  Every picture tells a story. Let these moments inspire your
                  next journey! ✨
                </p>
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
