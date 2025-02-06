import { NavLink } from 'react-router-dom';
import errorImg from '../assets/img/404image.png';
import { MoveRight } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="w-screen fixed top-0 right-0 z-50 flex items-center flex-col-reverse md:flex-row justify-center gap-20 md:gap-0 h-screen bg-peach">
      <div className="font-zodiak flex items-center w-full md:w-1/2 md:items-start justify-center flex-col gap-10 text-darkgreen text-lg lg:text-3xl">
        <div className="text-center md:text-left md:w-3/4">
          &quot;We Couldn&apos;t Find Your Destination. Try Another Route!&quot;
        </div>
        {/* <div className="text-md font-jakarta">
          Redirecting you to home page in {timer} secs...
        </div> */}
        <NavLink
          to="/"
          className="text-base px-10 font-jakarta flex items-center justify-center gap-3 text-peach bg-darkgreen p-2 rounded-lg shadow-md hover:animate-shift-up"
        >
          Go Back to Home
          <MoveRight />
        </NavLink>
      </div>
      <img src={errorImg} className="w-1/2 md:w-1/3" alt="" />
    </div>
  );
};

export default ErrorPage;
