import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage } from './components';
import Login, { loginLoader } from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Otp from './components/Auth/Otp';
import { AuthProvider } from './context/context';
import ErrorPage from './components/Error/ErrorPage';
import { Toaster } from 'react-hot-toast';

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
      loader: loginLoader,
    },
    {
      path: 'signup',
      element: <Signup />,
    },
    {
      path: 'verify',
      element: <Otp />,
    },
  ]);

  return (
    <div className="w-full h-full bg-lightpeach bg-opacity-20">
      <AuthProvider>
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
      </AuthProvider>
    </div>
  );
};

export default App;
