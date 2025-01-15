/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  return (
    <AuthContext.Provider
      value={{
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
