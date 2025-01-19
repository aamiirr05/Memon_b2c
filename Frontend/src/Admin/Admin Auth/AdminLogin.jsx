import { Eye, EyeOff, Lock, Mail, MoveLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

import useAdminAuthStore from '../store/useAdminAuthStore';

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
const AdminLogin = () => {
  const navigate = useNavigate();
  const [isPassVisible, setIsPassVisible] = useState(false);

  const { login, isAdminLoggingIn, AuthAdmin } = useAdminAuthStore();
  console.log(AuthAdmin);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await login(data, navigate);
  };

  return (
    <>
      <div className="absolute z-50 bg-lightpeach bg-opacity-30 w-full lg:items-center h-full lg:h-screen lg:justify-center lg:p-10 xl:p-0 xl:gap-32 flex flex-col lg:flex-row items-center justify-center">
        <div
          className="absolute top-7 left-7 cursor-pointer text-darkgreen text-3xl"
          onClick={() => navigate('/')}
        >
          <MoveLeft />
        </div>

        <div className="w-11/12 md:w-2/3 rounded-xl lg:w-1/2 xl:w-1/3 bg-peach bg-opacity-60 m-2 text-darkgreen shadow-2xl">
          <form action="" className="p-5" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-zodiak text-3xl md:text-4xl font-bold text- my-4">
              Admin Login.
            </h3>
            <div className="relative mt-10 flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-zodiak font-semibold lg:text-lg"
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
                className="font-zodiak font-semibold lg:text-lg"
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

            <button
              className={`my-10 w-1/2 flex items-center transition-colors justify-center font-jakarta  p-3 mx-auto rounded-xl font-semibold hover:animate-shift-up focus:animate-shift-down hover:bg-peach hover:border hover:border-darkgreen hover:text-darkgreen ${isAdminLoggingIn ? 'bg-peach text-darkgreen border border-darkgreen' : 'bg-darkgreen text-peach'}`}
            >
              {isAdminLoggingIn ? 'Logging In...' : 'Log In'}
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

export default AdminLogin;
