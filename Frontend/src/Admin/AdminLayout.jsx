import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import SideBar from './SideBar';
import { useState } from 'react';
import { CalendarRange } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    currentDate
  );

  return (
    <>
      <div
        className={`overflow-x-hidden relative w-full h-screen
        
        `}
      >
        <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div
          className={`flex items-center justify-between shadow-lg transition-all duration-500 ${
            isMenuOpen
              ? 'blur-sm lg:blur-none ml-[17rem] lg:ml-[18rem]'
              : 'ml-[4rem] lg:ml-[5rem] blur-none'
          } p-3 px-5 bg-peach bg-opacity-20 text-darkgreen`}
        >
          <h1 className="font-zodiak text-xl">Hello Aamir Bhathara !</h1>
          <div className="font-zodiak flex items-center gap-3 justify-center">
            <div className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-peach bg-opacity-70 shadow-md">
              <CalendarRange />
            </div>
            <div className=""> {formattedDate}</div>
          </div>
        </div>

        {/* Outlet Section */}

        <div
          className={`flex p-5 lg:p-10 items-center justify-between transition-all duration-500 ${
            isMenuOpen
              ? 'ml-[17rem] lg:ml-[18rem] blur-sm lg:blur-none'
              : 'blur-none ml-[4rem] lg:ml-[5rem]'
          } text-darkgreen `}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

export const AdminLoader = () => {
  const atoken = Cookies.get('accessToken');
  const rtoken = Cookies.get('refreshToken');

  if (!atoken || !rtoken) {
    // Redirect if either token is missing
    window.location.href = '/';
    return null;
  }

  try {
    const decodedToken = jwtDecode(atoken);

    // Check if the user has admin privileges
    if (!decodedToken.isAdmin) {
      window.location.href = '/';
      return null;
    }
  } catch (error) {
    console.error('Invalid or expired token:', error);
    // Redirect on error (e.g., invalid or expired token)
    window.location.href = '/';
    return null;
  }

  // If everything checks out, allow access
  return true;
};
