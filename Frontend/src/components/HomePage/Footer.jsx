import {
  Instagram,
  Mail,
  MessageCircle,
  MessageCircleMore,
} from 'lucide-react';

import img1 from '../../assets/img/IATA_LOGO.png';
import img2 from '../../assets/img/AIHUTOA_LOGO.png';
import logo from '../../assets/img/logo.png';

/* eslint-disable react/prop-types */
const Footer = ({ isMenuOpen }) => {
  return (
    <section
      className={`w-full bg-darkgreen text flex flex-col gap-5 text-peach py-5 ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
    >
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row lg:justify-between gap-10 pt-10 pb-5">
        <h2 className="font-zodiak text text-2xl text-center">
          &quot;Let&apos;s Make Travel Memories Together!&quot;
        </h2>
        <div className="flex items-center justify-center gap-4">
          <button className="border border-peach rounded-full hover:animate-shift-up font-semibold text-peach p-2 px-10">
            LogIn
          </button>
          <button className="bg-peach rounded-full hover:animate-shift-up font-semibold text-darkgreen p-2 px-10">
            Signup
          </button>
        </div>
      </div>
      <div className="mx-auto border-b border-peach pb-10 mb-5 w-11/12 flex gap-3 items-center justify-center lg:justify-start">
        <div className="border border-peach p-2 rounded-full px-4 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
          Whatsapp
        </div>
        <div className="border border-peach p-2 rounded-full px-6 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
          Email
        </div>
        <div className="border border-peach p-2 rounded-full px-4 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
          Instagram
        </div>
      </div>

      {/*  */}
      <div className="w-11/12 mx-auto flex flex-col xl:flex-row items-start gap-32 justify-between font-jakarta font-medium border-b border-peach pb-10">
        <div className="w-full flex  gap-10 lg:gap-0 lg:flex-row items-start justify-between">
          {/* 1 */}
          <div className="flex flex-col gap-5">
            <span className="font-zodiak text-2xl font-bold">About.</span>
            <span className="link-hover-peach">Packages</span>
            <span className="link-hover-peach">Feedback</span>
            <span className="link-hover-peach">Terms & Condition</span>
            <span className="link-hover-peach">Offer</span>
            <span className="link-hover-peach">FAQ&apos;s</span>
          </div>
          {/* 2 */}
          <div className="flex flex-col gap-5">
            <span className="font-zodiak text-2xl font-bold">Business.</span>
            <span className="link-hover-peach">About Us</span>
            <span className="link-hover-peach">Careers</span>
            <span className="link-hover-peach">Terms & Condition</span>
            <span className="link-hover-peach">B2B Login</span>
          </div>
          {/* 3 */}
          <div className="flex flex-col gap-5">
            <span className="font-zodiak text-2xl font-bold">Contact Us.</span>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/918108403376"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                href="https://wa.me/918108403376"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-hover-peach">+91 8108404376</div>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/918108403376"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                href="https://wa.me/919022549162"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-hover-peach">+91 9022549162</div>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/918108403376"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                href="https://wa.me/918268979705"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-hover-peach">+91 8268979705</div>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end md:justify-start gap-3">
          <div className="w-20 h-20 md:w-16 md:h-16 bg-peach rounded-full flex items-center justify-center">
            <img src={img1} alt="" className="w-full" />
          </div>
          <div className="w-20 h-20 md:w-16 md:h-16 bg-peach rounded-full flex items-center justify-center">
            <img src={img2} alt="" className="w-10/12 " />
          </div>
        </div>
      </div>
      {/*   */}

      <div className="w-11/12 mx-auto flex flex-col gap-10  lg:flex-row items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <img src={logo} alt="logo" className="w-16 " />
          <h1 className="text-2xl lg:text-xl font-bold font-jakarta">
            Memon Haj Umrah Tours & Travels.
          </h1>
        </div>
        <div className="w-full flex items-center text-sm lg:text-sm justify-between gap-3 font-jakarta">
          <span className="bg-peach py-2 px-6 lg:py-1 lg:px-4 text-darkgreen rounded-full font-semibold cursor-pointer">
            Home
          </span>
          <span className="cursor-pointer">Umrah</span>
          <span className="cursor-pointer">Holiday</span>
          <span className="cursor-pointer">Hotel</span>
          <span className="cursor-pointer">AboutUs</span>
        </div>
        <div className="w-full">
          <h1 className="w-full flex items-center justify-end md:justify-start">
            &#169; {`${new Date().getFullYear()}`} All Rights Reserved.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Footer;
