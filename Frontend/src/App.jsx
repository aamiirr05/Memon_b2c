import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Homepage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import Signup from './pages/auth/SignupPage';
import OtpPage from './pages/auth/OtpPage';

import ErrorPage from './pages/ErrorPage';
import { Toaster } from 'react-hot-toast';
import offlineImg from './assets/img/offline.svg';
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
import { useEffect, useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import ForexPage from './pages/ForexPage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import PrimaryNav from './components/HomePage/PrimaryNav';
import SecondaryNav from './components/HomePage/SecondaryNav';
import Footer from './components/HomePage/Footer';
import useAdminAuthStore from './Admin/store/useAdminAuthStore';
import UpdateHoliday from './Admin/Holidays/Update/UpdateHoliday';
import UpdateHolidayDetails from './Admin/Holidays/Update/UpdateHolidayDetails';
import UpdateHolidayPackImgs from './Admin/Holidays/Update/UpdateHolidayPackImgs';
import UpdateHolidayHotelImgs from './Admin/Holidays/Update/UpdateHolidayHotelImgs';
import CustomizedPackagePage from './pages/CustomizedPackagePage';
import ContactPage from './pages/ContactPage';
import HotelsPage from './pages/HotelsPage';
import OurPartnersPage from './pages/OurPartnersPage';
import NusukPage from './pages/NusukPage';
import HotelDetailPage from './pages/HotelDetailPage';
import UpdateVisa from './Admin/Visa/Update/UpdateVisa';
import UpdateVisaDetails from './Admin/Visa/Update/UpdateVisaDetails';
import UpdateVisaImage from './Admin/Visa/Update/UpdateVisaImage';

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return isOnline;
};

// Offline notice component
const OfflineNotice = () => (
  <div className="w-full bg-peach h-screen text-darkgreen flex flex-col gap-3 mx-auto items-center justify-center">
    <img src={offlineImg} alt="" className="w-1/3 lg:w-1/6 mb-10" />
    <h1 className="font-zodiak text-4xl font-bold">You are offline</h1>
    <h3 className="font-jakarta font-medium text-sm">
      Go back online to use Memon Tours & Travels
    </h3>
  </div>
);

const App = () => {
  const { checkAuth } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { checkAdminAuth } = useAdminAuthStore();
  useEffect(() => {
    checkAuth();
    checkAdminAuth();
  }, []);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname.startsWith('/login');
  const isSignupPage = location.pathname.startsWith('/signup');

  const [isMore, setIsMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (location.pathname.endsWith('/') && location.pathname !== '/') {
      navigate(location.pathname.slice(0, -1), { replace: true });
    }
  }, [location, navigate]);

  if (!isOnline) {
    return <OfflineNotice />;
  }

  return (
    <div className="w-full h-full bg-lightpeach bg-opacity-20">
      {!isAdminRoute && !isLoginPage && !isSignupPage && (
        <>
          <PrimaryNav />
          <SecondaryNav
            setIsMore={setIsMore}
            setIsHovered={setIsHovered}
            isHovered={isHovered}
            isMore={isMore}
          />
        </>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<OtpPage />} />
        <Route path="forex" element={<ForexPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Not Protected Route */}
        <Route path="/packages" element={<PackagesPage />} />
        <Route
          path="packages/customized-package"
          element={<CustomizedPackagePage />}
        />
        <Route
          path="/packages/package-details/:packageId"
          element={<PackageDetailPage />}
        />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route
          path="/hotels/hotel-details/:hotelId"
          element={<HotelDetailPage />}
        />
        <Route path="/partners" element={<OurPartnersPage />} />
        <Route path="/nusuk" element={<NusukPage />} />

        {/* Admin Routes */}
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-signup" element={<AdminSignup />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="hotel" element={<Hotels />}>
            <Route path="update/:updateid">
              <Route path="update/details" />
              <Route path="update/hotelimages" />
            </Route>
            <Route path="createhotel-form" element={<CreateHotelForm />} />
            <Route path="createhotel-package" element={<CreateHotelImg />} />
            <Route
              path="createhotel-preview/:id"
              element={<CreateHotelPreview />}
            />
          </Route>
          {/* Umrah Packages */}
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
          {/* Holiday Packages */}
          <Route path="holidays" element={<HolidayPackages />}>
            <Route path="update/:updateid" element={<UpdateHoliday />}>
              <Route path="details" element={<UpdateHolidayDetails />} />
              <Route path="packageimages" element={<UpdateHolidayPackImgs />} />
              <Route path="hotelimages" element={<UpdateHolidayHotelImgs />} />
            </Route>
            <Route path="createholiday-form" element={<CreateHolidayForm />} />
            <Route
              path="createholiday-package"
              element={<CreateHolidayImg />}
            />
            <Route
              path="createholiday-preview/:id"
              element={<CreateHolidayPreview />}
            />
          </Route>
          {/* Visa Routes */}
          <Route path="visa" element={<Visa />}>
            <Route path="update/:updateid" element={<UpdateVisa />}>
              <Route path="details" element={<UpdateVisaDetails />} />
              <Route path="visaimage" element={<UpdateVisaImage />} />
            </Route>
            <Route path="createvisa-form" element={<CreateVisaForm />} />
          </Route>
        </Route>

        {/* Catch all error route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {!isAdminRoute && !isLoginPage && !isSignupPage && <Footer />}

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
