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

import { NavLink } from 'react-router-dom';

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
      path: '/admin/holidays-ziyarat',
    },
    {
      icon: <FileCheck />,
      name: 'Visa',
      path: '/admin/visa',
    },
  ];

  return (
    <div
      className={`fixed border-r border-darkgreen border-opacity-5 top-0 left-0 h-screen bg-peach bg-opacity-20 shadow-lg p-3 transition-transform duration-500 ease-in-out z-50 w-[17rem] lg:w-[18rem]
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-[-13rem]'} `}
      // style={{ width: '16.5rem' }} // Sidebar total width
    >
      {/* Logo */}
      <div className="flex items-start justify-start gap-4 lg:w-3/4">
        <div className="w-12 h-12 lg:w-16 lg:h-16">
          <img
            src={`https://s3-alpha-sig.figma.com/img/c029/3f5e/a0f869bd9b509ab0e5a07d2db64fe0ef?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FyHhVHPWHXYnOudBET4nLxatw3g1VCCrVzxYE~oCZ5amjue5uGPcDyzdZ0MSy3jJ8saw38lvetJY8o9ifBBfUQ0uWPZiJEitv4~kfn086J319C~B3EnUeeiFbhzaGR97-jskZCEherdi57TDwC6MiWrsSnafp6pacCcOh8kBnClmvypRJ43ItaccXSJ-va7KM0zFAidXwKrQtHyYKmCqzNg3-8hx8YlKWCPCRiA9He0V0iLjJTVenIf-X~MSeqhmBDUUsvC7zkv6LOOfQyHrUF7lLuLCc1WJ5QbBgj2nKvTepUF0Vqyb2cT9k2RVv6wvs~7eZBX-ZXx0yFDdEDTZQA__`}
            alt=""
          />
        </div>
        <div className="w-24 xl:w-40">
          <img
            src={`https://s3-alpha-sig.figma.com/img/4d76/6344/366db0ad089b2f94a11624fe7be964f2?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d0~tZj-ihtvSfmlibiBb8DIq4pUiNCzeIzG4jP78Dv~ceHYKarwYDv~w2gNocp45gKUNLWhubvm17w96LPm57iVKlEMdT~6yQUoa6yJx8WB9Mwur7fdB54KdFPcbajVQiuyo6FEnzWhOsxkoD0rXKnlSU~zvFicpt99ZBanMN~4qhhr9tQwHsL1X0ovfDhRNB7Jll64BQOSoONs8OeSfIGpfjPZBdL3Bzx221f52HOVrKEaEirMskBAEG7GT7ghtZVgvxDU~pQEZbaxxNtnJFoGQA2l7STo6J5wZoCRVEYxdcMGiGQ3OyoCZ3Fh9zvj2NaYlYLQwakTVne3BnflCEg__`}
            alt=""
          />
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
                className={`absolute hover:hidden text-darkgreen z-10 left-16 -top-3 bg-peach p-2 px-4 text-sm rounded-lg ${isMenuOpen ? 'hidden' : 'opacity-0 group-hover:opacity-100 pointer-events-none'}`}
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
        <div className="relative group">
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
