// import {
//   Compass,
//   Landmark,
//   Plane,
//   BadgeCheck,
//   Mail,
//   Phone,
// } from 'lucide-react';

// const Sidebar = () => {
//   return (
//     <div className="sticky top-16 bg-darkgreen/10 h-[calc(100dvh-64px)] w-72 hidden rounded-2xl md:flex flex-col items-center p-4 text-neutral-700 shadow-lg overflow-y-scroll no-scrollbar">
//       <h2 className="text-2xl font-semibold flex items-center gap-2 my-4">
//         <Compass className="text-green-600" /> Explore
//       </h2>

//       <div className="mt-4 space-y-4 w-full">
//         {/* Featured Hajj/Umrah Package */}
//         <div className="bg-white/50 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
//           <Landmark className="text-yellow-500 mb-2" size={28} />
//           <h3 className="font-medium text-lg">Hajj & Umrah</h3>
//           <p className="text-sm text-neutral-500">Best packages for 2025</p>
//         </div>

//         {/* Holiday & Hotel Packages */}
//         <div className="bg-white/50 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
//           <Plane className="text-blue-500 mb-2" size={28} />
//           <h3 className="font-medium text-lg">Holiday Packages</h3>
//           <p className="text-sm text-neutral-500">Find the perfect getaway</p>
//         </div>

//         {/* Visa Assistance */}
//         <div className="bg-white/50 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
//           <BadgeCheck className="text-green-500 mb-2" size={28} />
//           <h3 className="font-medium text-lg">Visa Services</h3>
//           <p className="text-sm text-neutral-500">
//             Hassle-free visa processing
//           </p>
//         </div>

//         {/* Contact Us */}
//         <div className="bg-white/50 p-2 rounded-xl shadow-md flex flex-col  text-center border-t pt-4">
//           <h3 className="font-medium text-lg flex justify-center items-center gap-2">
//             <Mail className="text-red-500" size={20} /> Contact Us
//           </h3>
//           <p className="text-sm text-neutral-600 flex items-center gap-2 mt-2 font-mono">
//             <Phone size={16} className="text-blue-500" /> +123 456 7890
//           </p>
//           <p className="text-xs lg:text-sm text-wrap text-neutral-600 flex items-center gap-2 font-mono">
//             <Mail size={16} className="text-blue-500 shrink-0" />{' '}
//             info@yourcompany.com
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Sidebar = () => {
  // Replace these image URLs with your actual image URLs
  const images = [
    'https://i.pinimg.com/736x/9c/55/ad/9c55ad55055af7c0d7e221b7a55b1464.jpg',
    'https://i.pinimg.com/736x/e9/d9/e5/e9d9e548df23b1f0dbc8a1e917393a8e.jpg',
    'https://i.pinimg.com/736x/59/52/1a/59521a32d39ba43ac18a6b90704c28bd.jpg',
    'https://i.pinimg.com/736x/41/96/e3/4196e38a9f5bc91eb89856f601a7fdb9.jpg',
  ];

  return (
    <div className="sticky top-24 bg-darkgreen/10 h-[calc(100dvh-64px)] w-72 hidden  md:flex flex-col items-center text-neutral-700 shadow-lg overflow-y-scroll no-scrollbar ">
      {/* Full-Height and Full-Width Image Slider */}
      <div className="w-full h-full rounded-xl overflow-hidden ">
        <Swiper
          direction={'horizontal'} // Horizontal sliding
          rewind={true}
          autoplay={{
            delay: 2000, // Slide every 3 seconds
            disableOnInteraction: false, // Continue autoplay after user interaction
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

export default Sidebar;
