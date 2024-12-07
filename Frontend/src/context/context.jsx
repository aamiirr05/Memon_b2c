/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  console.log(accessToken, refreshToken);

  useEffect(() => {
    if (!isLoggedIn) {
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
    }

    if (!!accessToken && !!refreshToken) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signupData,
        setSignupData,
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
