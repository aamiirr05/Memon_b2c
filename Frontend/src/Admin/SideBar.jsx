/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  CableCar,
  ChevronFirst,
  ChevronLast,
  FileBox,
  FileCheck,
  FileUser,
  Hotel,
  LogOut,
} from 'lucide-react';

import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import logo from '../assets/img/logo.png';
import logoname from '../assets/img/logoname.png';

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const sidebarItems = [
    {
      icon: <FileUser />,
      name: 'Enquiry',
      path: '/admin/enquiry',
    },
    {
      icon: <Hotel />,
      name: 'Hotel',
      path: '/admin/hotel',
    },
    {
      icon: <FileBox />,
      name: 'Umrah Packages',
      path: '/admin/umrahpackages',
    },
    {
      icon: <CableCar />,
      name: 'Holidays / Ziyarat',
      path: '/admin/holidays',
    },
    {
      icon: <FileCheck />,
      name: 'Visa',
      path: '/admin/visa',
    },
  ];

  const navigate = useNavigate();
  const handleAdminLogout = async () => {
    try {
      const res = await axiosInstance.post('/admin/logout');
      console.log(res);
      const msg = res.data.data;
      localStorage.clear();
      toast.success(msg);
      navigate('/admin-login');
    } catch (error) {
      console.log(error);
      const msg = error.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <div
      className={`fixed border-r border-darkgreen border-opacity-5 top-0 left-0 h-screen bg-peach bg-opacity-20 shadow-lg p-3 transition-transform duration-500 ease-in-out z-[100] w-[17rem] lg:w-[18rem]
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-[-13rem]'} `}
      // style={{ width: '16.5rem' }} // Sidebar total width
    >
      {/* Logo */}
      <div className="flex items-start justify-start gap-4 lg:w-3/4">
        <div className="w-12 h-12 lg:w-16 lg:h-16">
          <img src={logo} alt="" />
        </div>
        <div className="w-24 xl:w-40">
          <img src={logoname} alt="" />
        </div>
      </div>
      {/* Toggle Button */}
      <div
        className={`cursor-pointer text-darkgreen absolute top-5 right-4 lg:right-6`}
      >
        {isMenuOpen ? (
          <ChevronFirst size={30} onClick={() => setIsMenuOpen(false)} />
        ) : (
          <ChevronLast size={30} onClick={() => setIsMenuOpen(true)} />
        )}
      </div>

      {/* Sidebar Items */}

      <div
        className={`absolute top-1/4 flex flex-col items-start gap-10 text-darkgreen font-jakarta font-semibold justify-center
        ${isMenuOpen ? 'left-5 w-full p-2' : '-right-2 lg:right-0'}`}
      >
        {sidebarItems.map((item, index) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `
                flex cursor-pointer justify-start gap-3 items-center 
                ${isActive ? 'text-peach py-2 px-3 mr-3 bg-darkgreen rounded-lg' : 'text-darkgreen'} 
                ${isMenuOpen ? 'left-5 w-10/12' : 'right-4 '}
              `
            }
            key={index}
          >
            <div className="relative group">
              <div
                className={`absolute hover:hidden text-darkgreen left-16 -top-3 bg-peach p-2 px-4 text-sm rounded-lg ${isMenuOpen ? 'hidden' : 'opacity-0 group-hover:opacity-100 pointer-events-none'}`}
              >
                {item.name}
              </div>

              {item.icon}
            </div>
            <div className={`transition-all ${isMenuOpen ? '' : 'hidden'}`}>
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>

      {/* Logout  */}
      <div
        className={`absolute bottom-5 flex items-center gap-3 text-red-600 font-jakarta font-semibold cursor-pointer
        ${isMenuOpen ? 'left-5' : 'right-6 lg:right-9'}`}
      >
        <div className="relative group" onClick={handleAdminLogout}>
          <div
            className={`absolute hover:hidden text-darkgreen  left-16 -top-2 bg-peach p-2 px-4 text-sm rounded-lg ${isMenuOpen ? 'hidden' : 'hidden group-hover:block'}`}
          >
            Logout
          </div>
          <LogOut />
        </div>
        <div className={` ${isMenuOpen ? 'w-20' : 'hidden'}`}>Logout</div>
      </div>
    </div>
  );
};

export default SideBar;
