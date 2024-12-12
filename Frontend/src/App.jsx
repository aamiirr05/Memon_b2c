import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage } from './components';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Otp from './components/Auth/Otp';

import ErrorPage from './components/Error/ErrorPage';
import { Toaster } from 'react-hot-toast';
import AdminLogin from './Admin/AdminLogin';
import AdminSignup from './Admin/AdminSignup';
import AdminLayout, { AdminLoader } from './Admin/AdminLayout';
import Enquiry from './Admin/Enquiry';
import Hotels from './Admin/Hotels';
import UmrahPackages from './Admin/UmrahPackages';
import Holidays from './Admin/Holidays';
import Visa from './Admin/Visa';
import CreatePackagesForm from './Admin/UmrahPackages/CreatePackagesForm';
import CreatePackageImgs from './Admin/UmrahPackages/CreatePackageImgs';
import CreatePreview from './Admin/UmrahPackages/CreatePreview';

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
        },
        {
          path: 'umrahpackages',
          element: <UmrahPackages />,
          children: [
            {
              path: 'createpackage-form',
              element: <CreatePackagesForm />,
            },
            {
              path: 'createpackage-images',
              element: <CreatePackageImgs />,
            },
            {
              path: 'createpackage-preview',
              element: <CreatePreview />,
            },
          ],
        },
        {
          path: 'holidays-ziyarat',
          element: <Holidays />,
        },
        {
          path: 'visa',
          element: <Visa />,
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
      <Toaster />
    </div>
  );
};

export default App;
