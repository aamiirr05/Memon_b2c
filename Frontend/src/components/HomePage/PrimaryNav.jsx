/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context';
import Cookies from 'js-cookie';
import axiosInstance from '../axios/AxiosInstance';

const PrimaryNav = ({ isMenuOpen }) => {
  const { isLoggedIn, setIsLoggedIn, setAccessToken, setRefreshToken } =
    useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post('/users/logout');
      console.log('Logout successful:', res.data);

      // Clear cookies and update state
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      setAccessToken(null);
      setRefreshToken(null);
    } catch (error) {
      console.error('Logout Error:', error.response?.data || error.message);
    }
  };

  return (
    <nav
      className={`bg-darkgreen w-full text-xs md:text-sm font-jakarta ${
        isMenuOpen ? 'hidden blur-sm' : 'blur-0'
      }`}
    >
      <div className="primary-nav-items text-peach flex items-center md:gap-10 justify-between md:justify-end p-4 lg:p-6 font-semibold">
        <div className="link-hover-peach links">Support</div>
        <div className="link-hover-peach links">Contact</div>
        <div className="flex items-center links justify-center gap-1">
          {isLoggedIn ? (
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
