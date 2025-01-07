/* eslint-disable react/prop-types */

import logoname from '../../assets/img/logoname.png';
import logo from '../../assets/img/logo.png';
const HamburgerLogo = ({ isMenuOpen }) => {
  return (
    <>
      <div
        className={`absolute right-0 pr-3 lg:hidden flex justify-center items-center gap-12 mt-2 transition-all ${isMenuOpen ? 'blur-sm' : 'blur-0'}`}
      >
        {' '}
        <img src={logoname} alt="" className="w-40" />
        <img src={logo} alt="" className="w-12 h-12" />
      </div>
    </>
  );
};

export default HamburgerLogo;
