/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signupData, setSignupData] = useState({});
  console.log(signupData);

  return (
    <AuthContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </AuthContext.Provider>
  );
};
