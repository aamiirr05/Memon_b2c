/* eslint-disable react/prop-types */
import logoname from '../../assets/img/logoname.png';
import logo from '../../assets/img/logo.png';

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PhoneOutgoing,
} from 'lucide-react';
import {
  Airplane,
  BuildingApartment,
  GlobeHemisphereEast,
  House,
  Island,
  Money,
  MoonStars,
  Mosque,
} from '@phosphor-icons/react';

const navLinks = [
  { name: 'Home', path: '/', icon: <House size={20} /> },
  {
    name: 'Packages',
    icon: <Airplane size={20} />,
    path: '/umrah-packages',
    dropdown: [
      { name: 'Umrah Packages', path: '/umrah-packages' },
      { name: 'Customize Package', path: '/customized-package' },
    ],
  },
  {
    name: 'Ramadan 2025',
    path: '/ramadan-2025',
    icon: <MoonStars size={20} />,
  },
  { name: 'Hajj 2025', path: '/hajj-2025', icon: <Mosque size={20} /> },
  { name: 'Ziyarat', path: '/ziyarat', icon: <Mosque size={20} /> },
];

const navLinkTwo = [
  { name: 'Holidays', path: '/holidays', icon: <Island size={20} /> },
  { name: 'Hotels', path: '/hotels', icon: <BuildingApartment size={20} /> },
  { name: 'Visa', path: '/visas', icon: <GlobeHemisphereEast size={20} /> },
  { name: 'Forex', path: '/forex', icon: <Money size={20} /> },
  { name: 'Contact Us', path: '/contact', icon: <PhoneOutgoing size={18} /> },
];

const SecondaryNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-[93.8%] backdrop-blur-sm font-jakarta mx-auto shadow-md bg-peach/70 rounded-xl sticky top-5 z-50 transform transition">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="w-10" />
          <img src={logoname} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <div
                  className="cursor-pointer"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <span className="flex items-center space-x-1 group">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-sm font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600'}`
                      }
                    >
                      {link.name}
                    </NavLink>

                    <ChevronDown className="h-4 w-4 mt-[3px]  group-hover:rotate-180 ease-in-out group-hover:text-darkgreen" />
                  </span>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 bg-darkgreen shadow-md rounded-md py-2 w-52">
                      {link.dropdown.map((dropdownLink) => (
                        <NavLink
                          key={dropdownLink.name}
                          to={dropdownLink.path}
                          className="flex items-center justify-between px-4 py-2 text-sm text-peach group hover:bg-peach/10"
                        >
                          <div className="flex items-center w-full ">
                            <span>{dropdownLink.name}</span>
                            <ChevronRight
                              className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity duration-100 ease-in-out pt-1 hover:text-darkgreen"
                              size={22}
                            />
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600 hover:text-darkgreen'}`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
          {navLinkTwo.map((link) => (
            <div key={link.name} className="relative">
              {
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600 hover:text-darkgreen'}`
                  }
                >
                  {link.name}
                </NavLink>
              }
            </div>
          ))}
        </div>

        {/*  */}
        <div className="hidden xl:flex items-center text-sm justify-center gap-5 font-medium ">
          <div className="text-peach p-2 px-6 rounded-lg cursor-pointer bg-darkgreen">
            Login
          </div>
          <div className="cursor-pointer text-neutral-600 hover:text-darkgreen">
            Signup
          </div>
          <div className="cursor-pointer text-neutral-600 hover:text-darkgreen">
            B2B Login
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="h-6 w-6 text-darkgreen transition-all" />
            ) : (
              <Menu className="h-6 w-6 text-darkgreen transition-all" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="xl:hidden rounded-b-xl flex flex-col md:flex-row items-start justify-center gap-6 bg-lightpeach/70 shadow-md text-sm transform transition-all p-5">
          <div className="w-full flex items-start justify-between">
            <div className="w-full flex flex-col gap-5">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className=""
                  onClick={() => {
                    !link.dropdown && setMenuOpen(!menuOpen);
                  }}
                >
                  {link.dropdown ? (
                    <details>
                      <summary className="px-4 py-2 cursor-pointer flex justify-between items-center text-neutral-600 font-medium">
                        <div className="flex gap-4">
                          {link.icon} {link.name}
                        </div>

                        <ChevronDown className="h-4 w-4" />
                      </summary>
                      <div className="py-2 pl-14">
                        {link.dropdown.map((dropdownLink) => (
                          <NavLink
                            onClick={() => setMenuOpen(!menuOpen)}
                            key={dropdownLink.name}
                            to={dropdownLink.path}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:bg-darkgreen/40 hover:text-darkgreen rounded-md"
                          >
                            {dropdownLink.name}
                          </NavLink>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex gap-4 px-4 py-2 text-sm font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600 hover:text-darkgreen'}`
                      }
                    >
                      <div className="">{link.icon}</div>
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-5">
              {navLinkTwo.map((link) => (
                <div
                  key={link.name}
                  className=""
                  onClick={() => {
                    !link.dropdown && setMenuOpen(!menuOpen);
                  }}
                >
                  {link.dropdown ? (
                    <details>
                      <summary className="px-4 py-2 cursor-pointer flex justify-between items-center text-neutral-600 font-medium">
                        {link.name}
                        <ChevronDown className="h-4 w-4" />
                      </summary>
                      <div className="px-4 pb-2">
                        {link.dropdown.map((dropdownLink) => (
                          <NavLink
                            onClick={() => setMenuOpen(!menuOpen)}
                            key={dropdownLink.name}
                            to={dropdownLink.path}
                            className="block px-4 py-2 text-sm text-neutral-600 hover:bg-darkgreen/40 hover:text-darkgreen rounded-md"
                          >
                            {dropdownLink.name}
                          </NavLink>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex gap-4 px-4 py-2 text-sm font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600 hover:text-darkgreen'}`
                      }
                    >
                      <div className="">{link.icon}</div>
                      {link.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex md:flex-col-reverse items-center md:w-1/3 text-sm justify-center w-full md:justify-start gap-5 font-medium ">
            <div className="text-peach p-2 px-6 rounded-lg cursor-pointer bg-darkgreen">
              Login
            </div>
            <div className="cursor-pointer text-neutral-600 hover:text-darkgreen">
              Signup
            </div>
            <div className="cursor-pointer text-neutral-600 hover:text-darkgreen">
              B2B Login
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SecondaryNav;
