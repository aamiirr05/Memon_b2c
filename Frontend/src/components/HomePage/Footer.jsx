import { MessageCircleMore } from 'lucide-react';

import img1 from '../../assets/img/IATA_LOGO.png';
import img2 from '../../assets/img/AIHUTOA_LOGO.png';
import logo from '../../assets/img/logo.png';
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
        <div className="border text-sm border-peach p-2 rounded-full px-4 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
          Whatsapp
        </div>
        <div className="border text-sm border-peach p-2 rounded-full px-6 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
          Email
        </div>
        <div className="border text-sm border-peach p-2 rounded-full px-4 hover:bg-peach hover:text-darkgreen font-semibold transition-colors cursor-pointer">
          Instagram
        </div>
      </div>

      {/*  */}
      <div className="w-11/12 mx-auto flex flex-col xl:flex-row items-start gap-32 justify-between font-jakarta font-medium border-b border-peach pb-10">
        <div className="w-full flex flex-col  gap-10 lg:gap-0 md:flex-row items-start justify-between">
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
                href="https://wa.me/918108404376?text=Assalamu Alaikum,%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                href="https://wa.me/918108404376?text=Assalamu Alaikum,%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-hover-peach">+91 8108404376</div>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/918108404376?text=Assalamu Alaikum,%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                href="https://wa.me/919022549162?text=Assalamu Alaikum,%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-hover-peach">+91 9022549162</div>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/918108404376?text=Assalamu Alaikum,%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
              <a
                href="https://wa.me/918268979705?text=Assalamu Alaikum,%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-hover-peach">+91 8268979705</div>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center md:justify-start xl:justify-end lg:justify-start gap-3">
          <div className="md:w-20 md:h-20 w-16 h-16 bg-peach rounded-full flex items-center justify-center">
            <img src={img1} alt="" className="w-full" />
          </div>
          <div className="md:w-20 md:h-20 w-16 h-16 bg-peach rounded-full flex items-center justify-center">
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
        <div className="w-full hidden sm:flex flex-col sm:flex-row gap-5 items-center text-sm justify-between sm:gap-3 font-jakarta">
          <NavLink
            to="/"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="bg-peach py-2 px-6 lg:py-1 lg:px-4 text-darkgreen rounded-full font-semibold cursor-pointer"
          >
            Home
          </NavLink>
          <NavLink to="/umrah-packages" className="cursor-pointer">
            Umrah
          </NavLink>
          <NavLink to="/holidays" className="cursor-pointer">
            Holiday
          </NavLink>
          <NavLink to="/hotels" className="cursor-pointer">
            Hotel
          </NavLink>
          <NavLink to="/" className="cursor-pointer">
            AboutUs
          </NavLink>
        </div>
        <div className="w-full">
          <h1 className="w-full flex items-center md:justify-start lg:justify-end">
            &#169; {`${new Date().getFullYear()}`} All Rights Reserved.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Footer;
