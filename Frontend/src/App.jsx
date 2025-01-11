import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage } from './components';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Otp from './components/Auth/Otp';

import ErrorPage from './components/Error/ErrorPage';
import { Toaster } from 'react-hot-toast';

import AdminLayout, { AdminLoader } from './Admin/AdminLayout';
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

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
    // Login & Signup Routes
    {
      path: 'login',
      element: <Login />,
      // loader: loginLoader,
    },
    {
      path: 'signup',
      element: <Signup />,
    },
    {
      path: 'verify',
      element: <Otp />,
    },

    {
      path: 'admin-login',
      element: <AdminLogin />,
    },
    {
      path: 'admin-signup',
      element: <AdminSignup />,
    },

    //  Admin Routes
    {
      path: 'admin',
      element: <AdminLayout />,
      loader: AdminLoader,
      children: [
        {
          path: 'enquiry',
          element: <Enquiry />,
        },
        {
          path: 'hotel',
          element: <Hotels />,
          children: [
            {
              path: 'createhotel-form',
              element: <CreateHotelForm />,
            },
            {
              path: 'createhotel-package',
              element: <CreateHotelImg />,
            },
            {
              path: 'createhotel-preview',
              element: <CreateHotelPreview />,
            },
          ],
        },
        {
          path: 'umrahpackages',
          element: <UmrahPackages />,
          children: [
            {
              path: 'update/:updateid',
              element: <UpdateUmrahPackage />,
              children: [
                {
                  path: 'details',
                  element: <UpdateUmrahDetails />,
                },
                {
                  path: 'packageimages',
                  element: <UpdateUmrahPackImgs />,
                },
                {
                  path: 'meccaimages',
                  element: <UpdateUmrahMeccaImgs />,
                },
                {
                  path: 'madinaimages',
                  element: <UpdateUmrahMadinaImgs />,
                },
              ],
            },
            {
              path: 'createpackage-form',
              element: <CreatePackagesForm />,
            },
            {
              path: 'createpackage-images',
              element: <CreatePackageImgs />,
            },
            {
              path: 'createpackage-preview/:id',
              element: <CreatePreview />,
            },
          ],
        },
        {
          path: 'holidays',
          element: <HolidayPackages />,
          children: [
            {
              path: 'createholiday-form',
              element: <CreateHolidayForm />,
            },
            {
              path: 'createholiday-package',
              element: <CreateHolidayImg />,
            },
            {
              path: 'createholiday-preview',
              element: <CreateHolidayPreview />,
            },
          ],
        },
        {
          path: 'visa',
          element: <Visa />,
          children: [
            {
              path: 'createvisa-form',
              element: <CreateVisaForm />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="w-full h-full bg-lightpeach bg-opacity-20">
      <RouterProvider
        router={router}
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
        }}
      />
      <Toaster
        toastOptions={{
          className: '',
          style: {
            background: '#faf7f0',
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
