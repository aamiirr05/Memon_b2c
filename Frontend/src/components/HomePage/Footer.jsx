import {
  Instagram,
  Mail,
  MessageCircle,
  MessageCircleMore,
} from 'lucide-react';

/* eslint-disable react/prop-types */
const Footer = ({ isMenuOpen }) => {
  return (
    <section
      className={`w-full bg-darkgreen text flex flex-col gap-5 text-peach py-5 ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
    >
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row lg:justify-between gap-10 border-b border-peach py-10">
        <h2 className="font-zodiak text text-2xl lg:text-3xl text-center">
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
      {/* Footer Links  */}

      <div className="w-full p-0 md:p-5 lg:p-0 flex flex-col my-5 justify-start lg:flex-row lg:w-11/12 mx-auto lg:justify-start xl:gap-32 lg:items-end">
        <div className="p-6">
          <h3 className="text-3xl font-bold font-zodiak skew-heading-peach relative text-darkgreen after:w-[95vw] md:after:w-[55vw] lg:after:w-[40vw] xl:after:w-[28vw] hover:animate-shift-up hover:duration-700 hover:shadow-xl">
            Memon Tours & Travels.
          </h3>
          <div className="inline-flex flex-col font-semibold gap-4 mt-10 font-jakarta">
            <div className="link-hover-peach">Packages</div>
            <div className="link-hover-peach">Feedback</div>
            <div className="link-hover-peach">Terms & Conditions</div>
            <div className="link-hover-peach">Offers</div>
            <div className="link-hover-peach">FAQ&apos;s</div>
          </div>
        </div>
        <div className="p-6 mt-5 lg:mt-0 relative">
          <h3 className="text-2xl font-bold font-zodiak">Business</h3>
          <div className="inline-flex flex-col font-semibold gap-4 mt-5 font-jakarta">
            <span className="link-hover-peach inline-block">About Us</span>
            <span className="link-hover-peach">Careers</span>
            <span className="link-hover-peach">Terms & Conditions</span>
            <span className="link-hover-peach">B2B Login</span>
          </div>
        </div>
        <div className="p-6 mt-5 lg:mt-0">
          <h3 className="text-2xl font-bold font-zodiak">Contact Us</h3>
          <div className="flex flex-col font-semibold gap-4 mt-5 font-jakarta">
            <div className="flex items-center gap-4">
              <Mail />
              <MessageCircle />
              {/* <Facebook /> */}
              <Instagram />
            </div>
            <div className="flex items-center gap-3">
              <MessageCircleMore />
              <div className="">+91 XXXXX XXXXX</div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircleMore />
              <div className="">+91 XXXXX XXXXX</div>
            </div>
            <div className="flex items-center gap-3 opacity-0">
              <MessageCircleMore />
              <div className="">+91 XXXXX XXXXX</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
