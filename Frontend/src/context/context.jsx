/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // States for Signup and Logging Purpose
  const [signupData, setSignupData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isAdminLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // States for tokens
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  // States& functions for saving form data
  const [packageData, setPackageData] = useState({
    details: JSON.parse(localStorage.getItem('packageDetails')) || {},
    images: [],
  });

  const updatePackageData = (data) => {
    setPackageData((prev) => ({ ...prev, data }));
    localStorage.setItem('packagedetails', JSON.stringify(data));
  };

  const updatePackageImages = (images) => {
    setPackageData((prev) => ({ ...prev, images }));
  };

  useEffect(() => {
    const storedAccessToken = Cookies.get('accessToken');
    const storedRefreshToken = Cookies.get('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      if (!isAdminLoggedIn) {
        setIsLoggedIn(true);
        localStorage.removeItem('isAdminLoggedIn');
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
      }
    } else {
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('isLoggedIn');
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        signupData,
        setSignupData,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isLoggedIn,
        setIsLoggedIn,
        setAccessToken,
        setRefreshToken,
        packageData,
        setPackageData,
        updatePackageData,
        updatePackageImages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
