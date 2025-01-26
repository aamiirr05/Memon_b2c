/* eslint-disable react/prop-types */
import logoname from '../../assets/img/logoname.png';
import logo from '../../assets/img/logo.png';

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Packages',
    path: '/packages',
    dropdown: [
      { name: 'All Packages', path: '/packages' },
      { name: 'Umrah Packages', path: '/packages/umrah' },
      { name: 'Ramadan Packages', path: '/packages/ramadan' },
      { name: 'Customized Packages', path: '/packages/customized' },
    ],
  },
  { name: 'Hajj 2025', path: '/hajj-2025' },
  { name: 'Ziyarat', path: '/ziyarat' },
  { name: 'Holidays', path: '/holidays' },
  { name: 'Hotels', path: '/hotels' },
  { name: 'Visa', path: '/visa' },
  { name: 'Forex', path: '/forex' },
  { name: 'Our Partners', path: '/partners' },
  { name: 'Nusuk', path: '/nusuk' },
  { name: 'Contact Us', path: '/contact' },
];

const SecondaryNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-peach shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="w-10" />
          <img src={logoname} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <div
                  className="cursor-pointer"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <span className="flex items-center space-x-1">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-md font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600 hover:text-darkgreen'}`
                      }
                    >
                      {link.name}
                    </NavLink>
                    <ChevronDown className="h-4 w-4" />
                  </span>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 bg-darkgreen shadow-md rounded-md py-2 w-48">
                      {link.dropdown.map((dropdownLink) => (
                        <NavLink
                          key={dropdownLink.name}
                          to={dropdownLink.path}
                          className="block px-4 py-2 text-md text-peach hover:bg-peach/50"
                        >
                          {dropdownLink.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-md font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600 hover:text-darkgreen'}`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
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
        <div className="lg:hidden bg-peach shadow-md text-md">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="border-b"
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
                        className="block px-4 py-2 text-md text-neutral-600 hover:bg-darkgreen/40 hover:text-darkgreen rounded-md"
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
                    `block px-4 py-2 text-md font-medium ${isActive ? 'text-darkgreen' : 'text-neutral-600 hover:text-darkgreen'}`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default SecondaryNav;

// import { ChevronRight } from 'lucide-react';
// import logo from '../../assets/img/logo.png';
// import { Link, NavLink } from 'react-router-dom';
// const SecondaryNav = ({ setIsMore, setIsHovered, isHovered, isMore }) => {
//   return (
//     <>
//       <nav className="bg-peach z-10 bg-opacity-90 lg:flex items-center justify-between py-3 px-1 lg:px-6 w-full hidden">
//         <div className="flex items-center gap-4">
//           <div className="logo w-14 h-14">
//             <img src={logo} alt="" />
//           </div>
//           <div className="w-24 xl:w-40">
//             <img src={logoname} alt="" />
//           </div>
//         </div>
//         <div className="relative text-darkgreen flex items-center lg:gap-4 xl:gap-8 font-semibold font-recia">
//           <Link to="/" className="link-hover-green">
//             Home
//           </Link>
//           <Link
//             to="/packages"
//             className="cursor-pointer link-hover-green"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             Packages
//           </Link>
//           <div
//             className={`absolute left-3 top-6 w-0 h-0 border-l-[120px] border-r-[120px] border-b-[120px] border-l-transparent border-r-transparent border-b-darkgreen transition-all duration-700 ${isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-[100%] pointer-events-none'}`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           ></div>
//           <div
//             className={`absolute left-20 dropdown w-[25vw] xl:w-[15vw] h-[20vh] p-4 flex flex-col items-start justify-center gap-4 rounded-lg top-10 z-40 bg-darkgreen text-peach shadow-xl transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-[30%] pointer-events-none'}`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             <div className="flex items-center justify-center flex-row group ">
//               <div className="cursor-pointer group-hover:opacity-100">
//                 Umrah Packages
//               </div>
//               <ChevronRight
//                 size={22}
//                 className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1"
//               />
//             </div>
//             <div className="flex items-center justify-center flex-row group ">
//               <div className="cursor-pointer group-hover:opacity-100">
//                 Ramadan Packages
//               </div>
//               <ChevronRight
//                 size={22}
//                 className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1"
//               />
//             </div>
//             <NavLink
//               to="/customized-package"
//               className="flex justify-center items-center flex-row group "
//             >
//               <div className="cursor-pointer group-hover:opacity-100">
//                 Customized Packages
//               </div>
//               <ChevronRight
//                 size={22}
//                 className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1"
//               />
//             </NavLink>
//           </div>
//           <Link to="/hajj-2025" className="link-hover-green">
//             Hajj 2025
//           </Link>
//           <Link to="/ziyarat" className="link-hover-green">
//             Ziyarat
//           </Link>
//           <Link to="/holidays" className="link-hover-green">
//             Holidays
//           </Link>
//           <Link to="/hotels" className="link-hover-green">
//             Hotels
//           </Link>
//           <Link to="/visa" className="link-hover-green">
//             Visa
//           </Link>
//           <Link to="/forex" className="link-hover-green">
//             Forex
//           </Link>
//           <Link to="/our-partners" className="link-hover-green hidden xl:block">
//             Our Partners
//           </Link>
//           <Link to="/nusuk" className="link-hover-green hidden xl:block">
//             Nusuk
//           </Link>
//           <Link to="/contact" className="link-hover-green hidden xl:block">
//             Contact Us
//           </Link>
//           <div
//             className="xl:hidden"
//             onMouseEnter={() => setIsMore(true)}
//             onMouseLeave={() => setIsMore(false)}
//           >
//             More
//           </div>
//           <div
//             className={`absolute -right-[1.5rem] top-6 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[40px] border-l-transparent border-r-transparent border-b-darkgreen transition-all duration-700 ${isMore ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-[100%] pointer-events-none'}`}
//             onMouseEnter={() => setIsMore(true)}
//             onMouseLeave={() => setIsMore(false)}
//           ></div>
//           <div
//             className={`absolute -right-5 dropdown w-[25vw] xl:w-[15vw] h-[20vh] p-4 flex flex-col items-start justify-center gap-4 rounded-lg top-10 z-40 bg-darkgreen text-peach shadow-xl transition-all duration-700 ${isMore ? 'opacity-100' : 'opacity-0 translate-y-[30%] pointer-events-none'}`}
//             onMouseEnter={() => setIsMore(true)}
//             onMouseLeave={() => setIsMore(false)}
//           >
//             <div className="">Our Partners</div>
//             <div className="">Nusuk</div>
//             <div className="">Contact Us</div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default SecondaryNav;
