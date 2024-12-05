import { NavLink } from 'react-router-dom';

/* eslint-disable react/prop-types */
const PrimaryNav = ({ isMenuOpen }) => {
  return (
    <>
      <nav
        className={`bg-darkgreen w-full text-xs md:text-sm font-jakarta ${isMenuOpen ? 'hidden blur-sm' : 'blur-0'}`}
      >
        <div className="primary-nav-items text-peach flex items-center md:gap-10 justify-between md:justify-end p-4 lg:p-6 font-semibold">
          <div className="link-hover-peach links">Support</div>
          <div className="link-hover-peach links">Contact</div>
          <div className="flex items-center links justify-center gap-1">
            <NavLink to="/login" className="link-hover-peach">
              Login
            </NavLink>{' '}
            /{' '}
            <NavLink to="signup" className="link-hover-peach">
              Signup
            </NavLink>
          </div>
          <div className="link-hover-peach links">B2B Login</div>
        </div>
      </nav>
    </>
  );
};

export default PrimaryNav;
