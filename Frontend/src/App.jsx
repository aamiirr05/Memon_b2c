import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import Signup from './pages/auth/SignupPage';
import OtpPage from './pages/auth/OtpPage';

import ErrorPage from './pages/ErrorPage';
import { Toaster } from 'react-hot-toast';

import AdminLayout from './Admin/AdminLayout';
import Enquiry from './Admin/Enquiry/Enquiry';
import Hotels from './Admin/Hotels/Hotels';
import UmrahPackages from './Admin/UmrahPackages/UmrahPackages';
import Visa from './Admin/Visa/Visa';
import CreatePackagesForm from './Admin/UmrahPackages/CreatePackagesForm';
import CreatePackageImgs from './Admin/UmrahPackages/CreatePackageImgs';
import CreatePreview from './Admin/UmrahPackages/CreatePreview';
import { CircleCheck, CircleX } from 'lucide-react';
import AdminSignup from './Admin/Admin Auth/AdminSignup';
import AdminLogin from './Admin/Admin Auth/AdminLogin';
import HolidayPackages from './Admin/Holidays/HolidayPackages';
import CreateHolidayForm from './Admin/Holidays/Forms/CreateHolidayForm';
import CreateHolidayImg from './Admin/Holidays/Forms/CreateHolidayImg';
import CreateHolidayPreview from './Admin/Holidays/Forms/CreateHolidayPreview';
import CreateVisaForm from './Admin/Visa/Form/CreateVisaForm';
import CreateHotelForm from './Admin/Hotels/Form/CreateHotelForm';
import CreateHotelImg from './Admin/Hotels/Form/CreateHotelImg';
import CreateHotelPreview from './Admin/Hotels/Form/CreateHotelPreview';
import UpdateUmrahPackage from './Admin/UmrahPackages/UpdateUmrahPackage';
import UpdateUmrahDetails from './Admin/UmrahPackages/Update/UpdateUmrahDetails';
import UpdateUmrahPackImgs from './Admin/UmrahPackages/Update/UpdateUmrahPackImgs';
import UpdateUmrahMeccaImgs from './Admin/UmrahPackages/Update/UpdateUmrahMeccaImgs';
import UpdateUmrahMadinaImgs from './Admin/UmrahPackages/Update/UpdateUmrahMadinaImgs';
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import ForexPage from './pages/ForexPage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import PrimaryNav from './components/HomePage/PrimaryNav';
import SecondaryNav from './components/HomePage/SecondaryNav';
import Footer from './components/HomePage/Footer';
import useAdminAuthStore from './Admin/store/useAdminAuthStore';

const App = () => {
  const { checkAuth } = useAuthStore();
  const { checkAdminAuth } = useAdminAuthStore();
  useEffect(() => {
    checkAuth();
    checkAdminAuth();
  }, []);

  return (
    <div className="w-full h-full bg-lightpeach bg-opacity-20">
      <PrimaryNav />
      <SecondaryNav />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<OtpPage />} />
        <Route path="/forex" element={<ForexPage />} />

        {/* Protected Route */}
        <Route path="/packages" element={<PackagesPage />} />
        <Route
          path="/packages/package-details/:packageId"
          element={<PackageDetailPage />}
        />

        {/* Admin Routes */}
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-signup" element={<AdminSignup />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="hotel" element={<Hotels />}>
            <Route path="createhotel-form" element={<CreateHotelForm />} />
            <Route path="createhotel-package" element={<CreateHotelImg />} />
            <Route
              path="createhotel-preview"
              element={<CreateHotelPreview />}
            />
          </Route>
          <Route path="umrahpackages" element={<UmrahPackages />}>
            <Route path="update/:updateid" element={<UpdateUmrahPackage />}>
              <Route path="details" element={<UpdateUmrahDetails />} />
              <Route path="packageimages" element={<UpdateUmrahPackImgs />} />
              <Route path="meccaimages" element={<UpdateUmrahMeccaImgs />} />
              <Route path="madinaimages" element={<UpdateUmrahMadinaImgs />} />
            </Route>
            <Route path="createpackage-form" element={<CreatePackagesForm />} />
            <Route
              path="createpackage-images"
              element={<CreatePackageImgs />}
            />
            <Route
              path="createpackage-preview/:id"
              element={<CreatePreview />}
            />
          </Route>
          <Route path="holidays" element={<HolidayPackages />}>
            <Route path="createholiday-form" element={<CreateHolidayForm />} />
            <Route
              path="createholiday-package"
              element={<CreateHolidayImg />}
            />
            <Route
              path="createholiday-preview"
              element={<CreateHolidayPreview />}
            />
          </Route>
          <Route path="visa" element={<Visa />}>
            <Route path="createvisa-form" element={<CreateVisaForm />} />
          </Route>
        </Route>

        {/* Catch all error route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <Toaster
        toastOptions={{
          className: 'text-center',
          style: {
            background: '#faf7f0',
            textAlign: 'center',
          },
          success: {
            icon: <CircleCheck className="text-darkgreen" />,
          },
          error: {
            icon: <CircleX className="text-red-600" />,
          },
        }}
      />
    </div>
  );
};

export default App;
