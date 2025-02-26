import {
  BookmarkCheck,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  LockKeyhole,
  Mail,
  MoveLeft,
  NotepadTextDashed,
  Ticket,
  UserRound,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../../assets/img/logo.png';
import { useAuthStore } from '../../store/useAuthStore';
import { Helmet } from 'react-helmet-async';

//  Schema validation
const schema = yup
  .object({
    fname: yup
      .string()
      .matches(/^[A-Za-z\s]{2,50}$/, 'Invalid Format.')
      .required('First Name is required.'),
    lname: yup
      .string()
      .matches(/^[A-Za-z\s]{2,50}$/, 'Invalid Format.')
      .required('Last Name is required.'),
    salutation: yup.string().required('Salutation is required.'),
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

const Signup = () => {
  const navigate = useNavigate();
  const salutationOps = ['Mr', 'Ms', 'Mrs'];
  const [salOption, setSalOption] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfPassVisible, setIsConfPassVisible] = useState(false);

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

  const { signup, isSigningUp } = useAuthStore();

  const onSubmit = async (data) => {
    await signup(data, navigate);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta name="description" content={`description`} />
        <meta property="og:title" content={`title`} />
        <meta property="og:description" content={`description`} />
        <meta property="og:image" content={`image`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="bg-peach/10 w-full lg:pt-28 xl:pt-12 h-full lg:h-screen lg:justify-center lg:items-center lg:p-5 xl:p-10 flex flex-col lg:flex-row items-center justify-start">
        {/* Navigating arrow */}
        <div
          className="absolute top-5 left-7 cursor-pointer text-darkgreen text-3xl"
          onClick={() => navigate('/')}
        >
          <MoveLeft />
        </div>
        <div className="my-10 lg:my-0 p-5 lg:w-1/2">
          <div className="flex items-center justify-start gap-2">
            <img src={logo} alt="" className="w-12 h-12" />
            <h2 className="text-3xl font-semibold text-darkgreen font-zodiak">
              Join the World of Wanderers!
            </h2>
          </div>
          <h4 className="mt-5 lg:text-lg font-medium font-jakarta tracking-tight text-mediumgreen">
            Create an account to book amazing trips, unlock deals, and explore
            the world your way!
          </h4>
          <div className="my-6 mt-16">
            <Ticket size={35} className="text-darkgreen" />
            <h4 className="text-sm lg:text-lg font-semibold text-mediumgreen mt-3 font-jakarta">
              Book hassle-free tours in minutes.
            </h4>
          </div>
          <div className="my-6   lg:mt-10">
            <NotepadTextDashed size={35} className="text-darkgreen" />
            <h4 className="text-sm lg:text-lg font-semibold text-mediumgreen mt-3 font-jakarta">
              Access personalized itineraries.
            </h4>
          </div>
          <div className="my-6 lg:mt-10">
            <BookmarkCheck size={35} className="text-darkgreen" />
            <h4 className="text-sm lg:text-lg font-semibold text-mediumgreen mt-3 font-jakarta">
              Save and revisit your travel plans anytime.
            </h4>
          </div>
        </div>
        <div className="w-11/12 rounded-xl lg:w-full xl:w-[40%] bg-peach bg-opacity-60 m-2 text-darkgreen shadow-2xl">
          <form action="" className="p-5" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-zodiak text-4xl font-bold text- my-4">
              Signup.
            </h3>
            <div className="flex flex-col md:flex-row items-start w-full md:gap-5 justify-center">
              {/* Salutation */}
              <div className="w-full lg:w-auto relative mt-10 flex flex-col gap-2">
                <label
                  htmlFor="salutation"
                  className="font-zodiak font-semibold"
                >
                  Salutation
                </label>

                <Controller
                  name="salutation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <div
                        className="border w-full font-jakarta cursor-pointer border-darkgreen rounded-xl p-3 gap-1 flex items-center justify-between"
                        onClick={() => setSalOption(!salOption)}
                      >
                        <div>{field.value || 'Select'}</div>
                        <ChevronDown />
                      </div>
                      <div
                        className={`absolute top-24 bg-peach z-30 w-full border border-darkgreen rounded-lg ${
                          salOption ? 'block' : 'hidden'
                        }`}
                      >
                        <ul className="p-2 font-jakarta">
                          {salutationOps.map((sal, index) => (
                            <li
                              key={index}
                              className="mt-2 p-2 hover:cursor-pointer rounded-lg hover:bg-darkgreen hover:text-peach"
                              onClick={() => {
                                field.onChange(sal);
                                setSalOption(false);
                              }}
                            >
                              {sal}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {errors.salutation && (
                        <span className="text-sm text-[#E63946]">
                          {errors.salutation.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              {/* First name input */}
              <div className="relative mt-6 md:mt-10 w-full flex flex-col gap-2">
                <label htmlFor="fname" className="font-zodiak font-semibold">
                  First Name
                </label>

                <input
                  type="text"
                  className="outline-none w-full bg-inherit border border-darkgreen rounded-xl p-3 pl-12  font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                  placeholder="First Name"
                  {...register('fname')}
                />
                <UserRound className="absolute top-12 left-3" />
                <span className="text-sm text-[#E63946]">
                  {errors?.fname?.message}
                </span>
              </div>
              {/* Last Name input  */}
              <div className="relative mt-6 md:mt-10  w-full flex flex-col gap-2">
                <label htmlFor="lname" className="font-zodiak font-semibold">
                  Last Name
                </label>

                <input
                  type="text"
                  className="outline-none w-full bg-inherit border border-darkgreen rounded-xl p-3 pl-12  font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                  placeholder="Last Name"
                  {...register('lname')}
                />
                <UserRound className="absolute top-12 left-3" />
                <span className="text-sm text-[#E63946]">
                  {errors?.lname?.message}
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
              {isSigningUp ? 'Signing up...' : 'Sign up'}
            </button>

            <div className="text-center flex items-center justify-center gap-1 font-jakarta tracking-tight">
              Already have an account?
              <NavLink to="/login" className="underline">
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
