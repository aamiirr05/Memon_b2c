import { MessageCircleMore } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

/* eslint-disable react/prop-types */
const Footer = ({ isMenuOpen }) => {
  const { authUser, logout, loading, setLoading } = useAuthStore();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`w-full bg-darkgreen text flex flex-col gap-5 text-peach py-5 ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
    >
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row lg:justify-between gap-10 pt-10 pb-5">
        <h2 className="font-zodiak text text-2xl text-center">
          &quot;Let&apos;s Make Travel Memories Together!&quot;
        </h2>
        <div className="flex items-center justify-center gap-4">
          {authUser ? (
            <div
              className="border cursor-pointer border-peach rounded-full hover:animate-shift-up font-semibold text-peach p-2 px-10"
              onClick={handleLogout}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="border border-peach cursor-pointer rounded-full hover:animate-shift-up font-semibold text-peach p-2 px-10"
              >
                LogIn
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-peach rounded-full cursor-pointer hover:animate-shift-up font-semibold text-darkgreen p-2 px-10"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className="mx-auto border-b border-peach pb-10 mb-5 w-11/12 flex gap-3 items-center justify-center lg:justify-start">
        <a
          href="https://wa.me/918108404376?text=Hello%2C%20I%20am%20interested%20in%20your%20Haj%20and%20Umrah%20tours."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <div className="border text-sm border-peach p-2 rounded-full px-4 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
            WhatsApp
          </div>
        </a>

        <a
          aria-label="Send Email"
          href="mailto:memonhajumrah@gmail.com?subject=Inquiry%20about%20Haj%20and%20Umrah%20Tours&body=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        >
          <div className="border text-sm border-peach p-2 rounded-full px-6 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
            Email
          </div>
        </a>
        <a
          aria-label="Connect on Instagram"
          href="https://www.instagram.com/memonhajumrahtours"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="border text-sm border-peach p-2 rounded-full px-4 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
            Instagram
          </div>
        </a>
      </div>

      <div className="w-11/12 mx-auto flex flex-col xl:flex-row items-start gap-32 justify-between font-jakarta font-medium border-b border-peach pb-10">
        <div className="w-full flex flex-col gap-10 lg:gap-0 md:flex-row items-start justify-between">
          {/* About */}
          <div className="flex flex-col gap-5">
            <span className="font-zodiak text-2xl font-bold">About.</span>
            <NavLink to="/umrah-packages" className="link-hover-peach">Packages</NavLink>
            <NavLink to="/testimonials" className="link-hover-peach">Feedback</NavLink>
            <NavLink to="/contact" className="link-hover-peach">Terms & Conditions</NavLink>
            <NavLink to="/umrah-packages" className="link-hover-peach">Offers</NavLink>
            <NavLink to="/contact" className="link-hover-peach">FAQ&apos;s</NavLink>
          </div>
          {/* Business */}
          <div className="flex flex-col gap-5">
            <span className="font-zodiak text-2xl font-bold">Business.</span>
            <NavLink to="/contact" className="link-hover-peach">About Us</NavLink>
            <span className="link-hover-peach cursor-default opacity-60">Careers</span>
            <NavLink to="/contact" className="link-hover-peach">Terms & Conditions</NavLink>
            <span className="link-hover-peach cursor-default opacity-60">B2B Login</span>
          </div>
          {/* Contact */}
          <div className="flex flex-col gap-5">
            <span className="font-zodiak text-2xl font-bold">Contact Us.</span>
            <div className="flex items-center gap-2">
              <a
                aria-label="Chat on WhatsApp"
                href="https://wa.me/918108404376?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                aria-label="Call +91 8108404376"
                href="tel:+918108404376"
              >
                <div className="link-hover-peach">+91 8108404376</div>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                aria-label="Chat on WhatsApp"
                href="https://wa.me/919022549162?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                aria-label="Call +91 9022549162"
                href="tel:+919022549162"
              >
                <div className="link-hover-peach">+91 9022549162</div>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                aria-label="Chat on WhatsApp"
                href="https://wa.me/918268979705?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                aria-label="Call +91 8268979705"
                href="tel:+918268979705"
              >
                <div className="link-hover-peach">+91 8268979705</div>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center md:justify-start xl:justify-end lg:justify-start gap-5">
          <div className="md:w-20 md:h-20 w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/memonb2c/image/upload/v1740042932/iata_emyxgm.webp"
              alt="IATA certified travel agent"
              className="flex items-center justify-center"
            />
          </div>
          <div className="bg-white rounded-xl flex items-center justify-center px-3 py-2">
            <img
              src="/nusuk-logo.svg"
              alt="Nusuk Masar accredited Umrah agent"
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <img
            src="https://res.cloudinary.com/memonb2c/image/upload/w_200,h_100,f_auto,q_auto/v1739885803/rmf00msx8vhusevuc2iv.png"
            alt="Memon Haj Umrah Tours logo"
            className="w-16 h-16"
          />
          <h1 className="text-2xl lg:text-xl font-bold font-jakarta">
            Memon Haj Umrah Tours & Travels.
          </h1>
        </div>
        <div className="w-full hidden sm:flex flex-col sm:flex-row gap-5 items-center text-sm justify-between sm:gap-3 font-jakarta">
          <NavLink
            to="/"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className={({ isActive }) =>
              `rounded-full cursor-pointer
              ${isActive ? 'bg-peach text-darkgreen py-2 px-6 lg:py-1 lg:px-4 font-semibold' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/umrah-packages"
            className={({ isActive }) =>
              `rounded-full cursor-pointer
              ${isActive ? 'bg-peach text-darkgreen py-2 px-6 lg:py-1 lg:px-4 font-semibold' : ''}`
            }
          >
            Umrah
          </NavLink>
          <NavLink
            to="/holidays"
            className={({ isActive }) =>
              `rounded-full cursor-pointer
              ${isActive ? 'bg-peach text-darkgreen py-2 px-6 lg:py-1 lg:px-4 font-semibold' : ''}`
            }
          >
            Holidays
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `rounded-full cursor-pointer
              ${isActive ? 'bg-peach text-darkgreen py-2 px-6 lg:py-1 lg:px-4 font-semibold' : ''}`
            }
          >
            About Us
          </NavLink>
        </div>
        <div className="w-full">
          <h1 className="w-full flex items-center md:justify-start lg:justify-end">
            &#169; {`${new Date().getFullYear()}`} Memon Haj Umrah Tours & Travels. All Rights Reserved.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Footer;
