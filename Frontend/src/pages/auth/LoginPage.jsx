import {
  BadgePercent,
  BookHeart,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MoveLeft,
  SquareChartGantt,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

import logo from '../../assets/img/logo.png';
import { useAuthStore } from '../../store/useAuthStore';
import { Helmet } from 'react-helmet-async';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Invalid Password'
      )
      .required('Password is required'),
  })
  .required();

const LoginPage = () => {
  const navigate = useNavigate();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { isLoggingIn, login } = useAuthStore();

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await login(data, navigate);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Login </title>
        <meta name="description" content={`description`} />
        <meta property="og:title" content={`title`} />
        <meta property="og:description" content={`description`} />
        <meta property="og:image" content={`image`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="relative bg-peach/10 w-full lg:items-center h-full lg:h-screen lg:justify-center lg:p-10 xl:p-0 xl:gap-32 flex flex-col lg:flex-row items-center justify-start">
        <div
          className="absolute top-7 left-7 cursor-pointer text-darkgreen text-3xl"
          onClick={() => navigate('/')}
        >
          <MoveLeft />
        </div>
        <div className="my-10 lg:my-0 p-5">
          <div className="flex items-center justify-start gap-2">
            <img src={logo} alt="" className="w-12 h-12" />
            <h2 className="text-3xl font-semibold text-darkgreen font-zodiak">
              Welcome Back, Traveler!
            </h2>
          </div>
          <h4 className="mt-5 lg:text-lg font-medium font-jakarta tracking-tight text-mediumgreen">
            Log in to explore your bookings, check offers, and plan your next
            adventure!
          </h4>
          <div className="my-6 mt-16">
            <SquareChartGantt size={35} className="text-darkgreen" />
            <h4 className="text-sm lg:text-lg font-semibold text-mediumgreen mt-3 font-jakarta">
              Manage your bookings effortlessly.
            </h4>
          </div>
          <div className="my-6 lg:mt-10">
            <BookHeart size={35} className="text-darkgreen" />
            <h4 className="text-sm lg:text-lg font-semibold text-mediumgreen mt-3 font-jakarta">
              Personalized travel recommendations.
            </h4>
          </div>
          <div className="my-6  lg:mt-10">
            <BadgePercent size={35} className="text-darkgreen" />
            <h4 className="text-sm lg:text-lg font-semibold text-mediumgreen mt-3 font-jakarta">
              Exclusive discounts for members.
            </h4>
          </div>
        </div>
        <div className="w-11/12 rounded-xl lg:w-1/2 xl:w-1/3 bg-peach bg-opacity-60 m-2 text-darkgreen shadow-2xl">
          <form action="" className="p-5" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-zodiak text-4xl font-bold text- my-4">
              Login.
            </h3>
            <div className="relative mt-10 flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-zodiak font-semibold text-lg"
              >
                Email
              </label>

              <input
                type="email"
                className="outline-none bg-inherit border border-darkgreen rounded-xl p-3 pl-12  font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                placeholder="Enter your email"
                {...register('email')}
              />
              <Mail className="absolute top-12 left-3" />
              <span className="text-sm text-[#E63946]">
                {errors?.email?.message}
              </span>
            </div>
            <div className="relative mt-10 flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-zodiak font-semibold text-lg"
              >
                Password
              </label>
              <input
                type={isPassVisible ? 'text' : 'password'}
                className="outline-none bg-inherit border border-darkgreen rounded-xl pl-12 p-3 font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                placeholder="Enter your password"
                {...register('password')}
              />
              <Lock className="absolute top-12 left-3" />
              {isPassVisible ? (
                <Eye
                  className="absolute top-12 right-5 cursor-pointer"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                />
              ) : (
                <EyeOff
                  className="absolute top-12 right-5 cursor-pointer"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                />
              )}
              <span className="text-sm text-[#E63946]">
                {errors?.password?.message}
              </span>
            </div>

            <button className="my-10 w-1/2 flex items-center justify-center font-jakarta bg-darkgreen text-peach p-3 mx-auto rounded-xl font-semibold">
              {isLoggingIn ? 'Logging In...' : 'Log In'}
            </button>

            <div className="text-center flex items-center justify-center gap-1 font-jakarta tracking-tight">
              Don&apos;t have an account?
              <NavLink to="/signup" className="underline">
                Signup
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
