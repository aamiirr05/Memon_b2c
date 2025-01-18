/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

import { useAuthStore } from '../../store/useAuthStore';

const PrimaryNav = ({ isMenuOpen }) => {
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav
      className={`bg-darkgreen sticky top-0 z-10 w-full text-xs md:text-sm font-jakarta ${
        isMenuOpen ? 'hidden blur-sm' : 'blur-0'
      }`}
    >
      <div className="primary-nav-items text-peach flex items-center md:gap-10 justify-between md:justify-end p-4 lg:p-4 font-semibold">
        <div className="link-hover-peach links">Support</div>
        <div className="link-hover-peach links">Contact</div>
        <div className="flex items-center links justify-center gap-1">
          {authUser ? (
            <div className="link-hover-peach links" onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <>
              <NavLink to="/login" className="link-hover-peach">
                Login
              </NavLink>
              /
              <NavLink to="/signup" className="link-hover-peach">
                Signup
              </NavLink>
            </>
          )}
        </div>
        <div className="link-hover-peach links">B2B Login</div>
      </div>
    </nav>
  );
};

export default PrimaryNav;
