/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isAdminLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  console.log(isLoggedIn);
  console.log(isAdminLoggedIn);

  // useEffect(() => {
  //   if (!isAdminLoggedIn) {
  //     localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  //   } else {
  //     localStorage.removeItem('isLoggedIn');
  //   }
  // }, [isLoggedIn, isAdminLoggedIn]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
