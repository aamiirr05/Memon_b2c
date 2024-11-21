import { useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage } from './components';
import LocomotiveScroll from 'locomotive-scroll';

const App = () => {
  const scrollRef = useRef(null); // Reference to the scroll container
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
  ]);

  // useEffect(() => {
  //   if (!scrollRef.current) return;

  //   // Initialize Locomotive Scroll
  //   const scroll = new LocomotiveScroll({
  //     el: scrollRef.current, // Use the ref to target the container
  //     smooth: true,
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     if (scroll) scroll.destroy();
  //   };
  // }, []);

  return (
    <div
      className="w-full h-full bg-lightpeach bg-opacity-30"
      data-scroll-container
      ref={scrollRef} // Attach the ref here
    >
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
    </div>
  );
};

export default App;
