/* eslint-disable no-unused-vars */
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
import UpdateHotel from './Admin/Hotels/Update/UpdateHotel';
import UpdateHotelDetails from './Admin/Hotels/Update/UpdateHotelDetails';
import UpdateHotelImages from './Admin/Hotels/Update/UpdateHotelImages';
import VisasPage from './pages/VisasPage';
import VisaDetailPage from './pages/VisaDetailPage';
import EnquiryForex from './Admin/Enquiry/EnquiryForex';
import EnquiryContact from './Admin/Enquiry/EnquiryContact';
import EnquiryUmrah from './Admin/Enquiry/EnquiryUmrah';
import EnquiryVisa from './Admin/Enquiry/EnquiryVisa';
import EnquiryHoliday from './Admin/Enquiry/EnquiryHoliday';
import EnquiryCustom from './Admin/Enquiry/EnquiryCustom';
import EnquiryHotel from './Admin/Enquiry/EnquiryHotel';
import HolidaysPage from './pages/HolidaysPage';
import HolidayDetailPage from './pages/HolidayDetailPage';
import { motion } from 'framer-motion';
import { ReactLenis } from './utils/lenis';
// import logo from './assets/img/logo.png';
import useFetchPackages from './Admin/hooks/UseFetchPackages';
import Enquiries from './pages/Enquiries';
import TestimonialForm from './pages/TestimonialForm';
import FloatingButtons from './components/FoatingButtons';
import { HelmetProvider } from 'react-helmet-async';
import backgroundImg from './assets/img/hero-bg.webp';
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
      Go back online to use Memon Haj Umrah Tours & Travels
    </h3>
  </div>
);

const PreLoader = () => (
  <div className="fixed p-5 inset-0 w-full bg-peach h-screen text-darkgreen flex flex-col gap-3 mx-auto items-center justify-center">
    <div className="relative w-48 h-1 bg-darkgreen/30 overflow-hidden rounded-full">
      <div className="absolute h-full w-1/3 bg-darkgreen rounded-full animate-loader"></div>
    </div>

    <div className="flex mt-3 items-center w-full gap-5 justify-center">
      <img
        src="https://res.cloudinary.com/memonb2c/image/upload/f_auto,q_auto/v1739885803/rmf00msx8vhusevuc2iv.png"
        alt="logo"
        className="w-10 h-10 lg:w-14 lg:h-14"
        loading="lazy"
      />
      <p className="text-left font-jakarta text-lg md:text-xl font-semibold lg:text-3xl">
        Memon Haj Umrah Tours & Travels.
      </p>
    </div>
    <p className="mt-3 font-jakarta font-medium text-sm md:text-md">
      Loading, please wait...
    </p>
  </div>
);

const App = () => {
  const { checkAuth } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAvailable, setIsAvailable } = useAuthStore();

  const getPackages = useFetchPackages('users/fetch-all-umrah-packages');

  useEffect(() => {
    if (getPackages?.data) {
      setIsAvailable(false);
    }
  }, [getPackages?.data, setIsAvailable]);

  // Fallback: hide preloader after 5s even if backend is slow (Render cold start)
  useEffect(() => {
    const timeout = setTimeout(() => setIsAvailable(false), 5000);
    return () => clearTimeout(timeout);
  }, [setIsAvailable]);

  const { checkAdminAuth, AuthAdmin } = useAdminAuthStore();
  useEffect(() => {
    checkAuth();
    checkAdminAuth();
  }, [checkAdminAuth, checkAuth]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname.startsWith('/login');
  const isSignupPage = location.pathname.startsWith('/signup');
  const isOtpPage = location.pathname.startsWith('/verify');
  const isErrorPage = location.pathname == '/error' || location.pathname == '*';

  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (location.pathname.endsWith('/') && location.pathname !== '/') {
      navigate(location.pathname.slice(0, -1), { replace: true });
    }
  }, [location, navigate]);

  if (!isOnline) {
    return <OfflineNotice />;
  }

  if (isAvailable) {
    return <PreLoader />;
  }

  return (
    <ReactLenis root>
      <div
        className={`w-full h-full ${!location.pathname.includes('/admin') ? 'bg-peach/20' : ''}`}
      >
        <div
          className={`w-full text-center -translate-x-[50%] left-1/2 mx-auto absolute top-0 h-[100vh] ${location.pathname !== '/' ? 'hidden' : ''}`}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            // width: '100%',
          }}
        >
          <div className="mt-20 xl:mt-28 md:mt-24 p-5 md:p-0 flex flex-col gap-1 md:w-11/12 mx-auto items-center text-[#386641]">
            <motion.div
              layoutId="hero-title"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
              <q className="font-bold font-sans lg:text-md text-sm">
                (Surah Aal-e-Imran 3:96) إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ
                لَلَّذِي بِبَكَّةَ مُبَارَكًا وَهُدًى لِلْعَالَمِينَ
              </q>
              <q className="lg:text-xs text-[8px] font-jakarta">
                Indeed, the first House [of worship] established for mankind was
                at Bakkah (Mecca) 🕋 – blessed and a guidance for the worlds.
              </q>
            </motion.div>
            <motion.h1
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.1 }}
              className="mt-3 md:mt-6 text-xl lg:text-2xl text-center font-bold font-zodiak"
            >
              Your Trusted Partner for Umrah, Ziyarat, Holidays & Beyond
            </motion.h1>
            <motion.p
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.1 }}
              className="font-jakarta text-xs md:text-[10px] font-semibold xl:text-md w-4/5 xl:mt-2  text-center"
            >
              Seamless, transparent, and reliable—book with confidence and
              embark on your spiritual journey with ease. No hidden charges,
              just a commitment to exceptional service.
            </motion.p>
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center gap-3 mt-5"
            >
              <a
                href="/umrah-packages"
                className="bg-darkgreen text-peach font-jakarta font-semibold px-6 py-3 rounded-full text-sm hover:bg-mediumgreen transition-colors shadow-lg"
              >
                View Packages
              </a>
              <a
                href="https://wa.me/+918108404376?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-darkgreen text-darkgreen font-jakarta font-semibold px-6 py-3 rounded-full text-sm hover:bg-darkgreen hover:text-peach transition-colors bg-peach/60 backdrop-blur-sm"
              >
                Enquire on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
        {!isAdminRoute &&
          !isLoginPage &&
          !isSignupPage &&
          !isOtpPage &&
          !isErrorPage && (
            <>
              <SecondaryNav />
              <FloatingButtons />
            </>
          )}

        <ReactLenis root>
          <HelmetProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<Signup />} />
              <Route path="verify" element={<OtpPage />} />
              <Route path="forex" element={<ForexPage />} />
              <Route path="contact" element={<ContactPage />} />

              {/* User Route */}
              <Route path="/enquiries" element={<Enquiries />} />

              {/* Not Protected Route */}
              <Route path="/testimonials" element={<TestimonialForm />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route
                path="customized-package"
                element={<CustomizedPackagePage />}
              />

              {/* hotel page*/}
              <Route path="/hotels" element={<HotelsPage />} />
              <Route
                path="/hotels/hotel-details/:hotelId"
                element={<HotelDetailPage />}
              />

              {/* packages page by category*/}
              <Route path="/ramadan-2025" element={<PackagesPage />} />
              <Route
                path="/ramadan-2025/package-details/:packageId"
                element={<PackageDetailPage />}
              />

              <Route path="/umrah-packages" element={<PackagesPage />} />
              <Route
                path="/umrah-packages/package-details/:packageId"
                element={<PackageDetailPage />}
              />

              <Route path="/hajj-2025" element={<PackagesPage />} />
              <Route
                path="/hajj-2025/package-details/:packageId"
                element={<PackageDetailPage />}
              />

              {/* holiday page */}
              <Route path="/holidays" element={<HolidaysPage />} />
              <Route
                path="/holidays/holiday-details/:holidayId"
                element={<HolidayDetailPage />}
              />

              <Route path="/ziyarat" element={<HolidaysPage />} />
              <Route
                path="/ziyarat/holiday-details/:holidayId"
                element={<HolidayDetailPage />}
              />

              <Route path="/visas" element={<VisasPage />} />
              <Route
                path="/visas/visa-details/:visaId"
                element={<VisaDetailPage />}
              />
              <Route path="/partners" element={<OurPartnersPage />} />
              <Route path="/nusuk" element={<NusukPage />} />

              {/* Admin Routes */}

              <Route path="admin-login" element={<AdminLogin />} />
              {/* <Route path="admin-signup" element={<AdminSignup />} /> */}

              {AuthAdmin && (
                <Route path="admin" element={<AdminLayout />}>
                  <Route path="enquiry" element={<Enquiry />}>
                    <Route path="forex" element={<EnquiryForex />} />
                    <Route path="contact" element={<EnquiryContact />} />
                    <Route path="umrah" element={<EnquiryUmrah />} />
                    <Route path="visa" element={<EnquiryVisa />} />
                    <Route path="holiday" element={<EnquiryHoliday />} />
                    <Route path="custom-package" element={<EnquiryCustom />} />
                    <Route path="hotel" element={<EnquiryHotel />} />
                  </Route>

                  {/* Hotel */}
                  <Route path="hotel" element={<Hotels />}>
                    <Route path="update/:updateid" element={<UpdateHotel />}>
                      <Route path="details" element={<UpdateHotelDetails />} />
                      <Route
                        path="hotelimages"
                        element={<UpdateHotelImages />}
                      />
                    </Route>
                    <Route
                      path="createhotel-form"
                      element={<CreateHotelForm />}
                    />
                    <Route
                      path="createhotel-package"
                      element={<CreateHotelImg />}
                    />
                    <Route
                      path="createhotel-preview/:id"
                      element={<CreateHotelPreview />}
                    />
                  </Route>
                  {/* Umrah Packages */}
                  <Route path="umrahpackages" element={<UmrahPackages />}>
                    <Route
                      path="update/:updateid"
                      element={<UpdateUmrahPackage />}
                    >
                      <Route path="details" element={<UpdateUmrahDetails />} />
                      <Route
                        path="packageimages"
                        element={<UpdateUmrahPackImgs />}
                      />
                      <Route
                        path="meccaimages"
                        element={<UpdateUmrahMeccaImgs />}
                      />
                      <Route
                        path="madinaimages"
                        element={<UpdateUmrahMadinaImgs />}
                      />
                    </Route>
                    <Route
                      path="createpackage-form"
                      element={<CreatePackagesForm />}
                    />
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
                      <Route
                        path="details"
                        element={<UpdateHolidayDetails />}
                      />
                      <Route
                        path="packageimages"
                        element={<UpdateHolidayPackImgs />}
                      />
                      <Route
                        path="hotelimages"
                        element={<UpdateHolidayHotelImgs />}
                      />
                    </Route>
                    <Route
                      path="createholiday-form"
                      element={<CreateHolidayForm />}
                    />
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
                    <Route
                      path="createvisa-form"
                      element={<CreateVisaForm />}
                    />
                  </Route>
                </Route>
              )}

              {/* Catch all error route */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </HelmetProvider>
        </ReactLenis>

        {!isAdminRoute && !isLoginPage && !isSignupPage && !isOtpPage && (
          <Footer />
        )}

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
    </ReactLenis>
  );
};

export default App;
