import {
  Eye,
  EyeOff,
  Lock,
  LockKeyhole,
  Mail,
  MoveLeft,
  UserRound,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import toast from 'react-hot-toast';
import axiosInstance from '../../lib/axios';

//  Schema validation
const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^[A-Za-z\s]{2,50}$/, 'Invalid Format.')
      .required('User Name is required.'),

    email: yup
      .string()
      .email('Invalid email format.')
      .required('Email is required.'),
    phone: yup.string().required('Phone number is required.'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters, with one special char, uppercase & lowercase letter, number.'
      )
      .required('Password is required.'),
    confpassword: yup
      .string()
      .required('Confirm Password is required.')
      .oneOf([yup.ref('password'), null], 'Passwords must match.'),
  })
  .required();
const AdminSignup = () => {
  //  UseForm Hook
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const handleSuccess = (val) => {
    toast.success(val, {
      duration: 4000,
    });
  };
  const handleError = (val) => {
    toast.error(val, {
      duration: 4000,
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await axiosInstance.post('/admin/signup', {
        username: data.username,
        password: data.password,
        email: data.email,
        contact: data.phone,
      });

      console.log(res);

      const msg = res.data.message;
      handleSuccess(msg);
      reset();
      navigate('/admin-login');
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      handleError(message);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfPassVisible, setIsConfPassVisible] = useState(false);

  return (
    <>
      <div className="bg-lightpeach bg-opacity-30 w-full h-full lg:h-screen lg:p-5 xl:p-10 flex items-center justify-center">
        {/* Navigating arrow */}
        <div
          className="absolute top-5 left-7 cursor-pointer text-darkgreen text-3xl"
          onClick={() => navigate('/')}
        >
          <MoveLeft />
        </div>

        <div className="w-11/12 rounded-xl lg:w-full xl:w-[40%] bg-peach bg-opacity-60 m-2 text-darkgreen shadow-2xl">
          <form action="" className="p-5" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-zodiak text-4xl font-bold text- my-4">
              Admin Signup.
            </h3>
            <div className="flex flex-col md:flex-row items-start w-full md:gap-5 justify-center">
              {/* First name input */}
              <div className="relative mt-6 md:mt-10 w-full flex flex-col gap-2">
                <label htmlFor="fname" className="font-zodiak font-semibold">
                  UserName
                </label>

                <input
                  type="text"
                  className="outline-none w-full bg-inherit border border-darkgreen rounded-xl p-3 pl-12  font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                  placeholder="User Name"
                  {...register('username')}
                />
                <UserRound className="absolute top-12 left-3" />
                <span className="text-sm text-[#E63946]">
                  {errors?.username?.message}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:gap-5 justify-start">
              {/* Email */}
              <div className="relative w-full mt-6 flex flex-col gap-2">
                <label htmlFor="email" className="font-zodiak font-semibold">
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
              {/* Phone Number */}

              <div className=" w-full mt-6  flex flex-col gap-2">
                <label htmlFor="phone" className="font-zodiak font-semibold">
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Phone number is required',
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={'in'}
                      // enableSearch={true}
                      autoFormat={true}
                      placeholder="12345 67890"
                      inputClass="w-full"
                    />
                  )}
                />
                <span className="text-sm text-[#E63946]">
                  {errors?.phone?.message}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:gap-5 justify-start">
              {/* Password */}
              <div className="relative mt-6 w-full  flex flex-col gap-2">
                <label htmlFor="password" className="font-zodiak font-semibold">
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
              {/* Confirm Password  */}
              <div className="relative mt-6 w-full flex flex-col gap-2">
                <label
                  htmlFor="confpassword"
                  className="font-zodiak font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  type={isConfPassVisible ? 'text' : 'password'}
                  className="outline-none bg-inherit border border-darkgreen rounded-xl pl-12 p-3 font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                  placeholder="Confirm Password"
                  {...register('confpassword')}
                />
                <LockKeyhole className="absolute top-12 left-3" />
                {isConfPassVisible ? (
                  <Eye
                    className="absolute top-12 right-5 cursor-pointer"
                    onClick={() => setIsConfPassVisible(!isConfPassVisible)}
                  />
                ) : (
                  <EyeOff
                    className="absolute top-12 right-5 cursor-pointer"
                    onClick={() => setIsConfPassVisible(!isConfPassVisible)}
                  />
                )}
                <span className="text-sm text-[#E63946]">
                  {errors?.confpassword?.message}
                </span>
              </div>
            </div>

            <button
              // onClick={() => navigate('/verify')}
              className="my-5 w-1/2 flex items-center justify-center font-jakarta bg-darkgreen text-peach p-3 mx-auto rounded-xl font-semibold"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center flex items-center justify-center gap-1 font-jakarta tracking-tight">
              Already have an account?
              <NavLink to="/admin-login" className="underline">
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
