import { Eye, EyeOff, Lock, Mail, MoveLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

import useAdminAuthStore from '../store/useAdminAuthStore';

const credentialsSchema = yup
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

const otpSchema = yup
  .object({
    otp: yup
      .string()
      .matches(/^\d{6}$/, 'OTP must be 6 digits')
      .required('OTP is required'),
  })
  .required();

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const { login, verifyLoginOtp, isAdminLoggingIn } = useAdminAuthStore();

  const {
    register: registerCreds,
    handleSubmit: handleSubmitCreds,
    formState: { errors: credErrors },
  } = useForm({ resolver: yupResolver(credentialsSchema) });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
    reset: resetOtp,
  } = useForm({ resolver: yupResolver(otpSchema) });

  const onSubmitCredentials = async (data) => {
    const success = await login(data);
    if (success) {
      setVerifiedEmail(data.email);
      setStep('otp');
    }
  };

  const onSubmitOtp = async (data) => {
    await verifyLoginOtp({ email: verifiedEmail, otp: data.otp }, navigate);
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
    resetOtp();
  };

  return (
    <>
      <div className="absolute z-50 bg-lightpeach bg-opacity-30 w-full lg:items-center h-full lg:justify-center lg:p-10 xl:p-0 xl:gap-32 flex flex-col lg:flex-row items-center justify-center">
        <div
          className="absolute top-7 left-7 cursor-pointer text-darkgreen text-3xl"
          onClick={() => navigate('/')}
        >
          <MoveLeft />
        </div>

        <div className="w-11/12 md:w-2/3 rounded-xl lg:w-1/2 xl:w-1/3 bg-peach bg-opacity-60 m-2 text-darkgreen shadow-2xl">

          {step === 'credentials' ? (
            <form className="p-5" onSubmit={handleSubmitCreds(onSubmitCredentials)}>
              <h3 className="font-zodiak text-3xl md:text-4xl font-bold my-4">
                Admin Login.
              </h3>

              <div className="relative mt-10 flex flex-col gap-2">
                <label htmlFor="email" className="font-zodiak font-semibold lg:text-lg">
                  Email
                </label>
                <input
                  type="email"
                  className="outline-none bg-inherit border border-darkgreen rounded-xl p-3 pl-12 font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                  placeholder="Enter your email"
                  {...registerCreds('email')}
                />
                <Mail className="absolute top-12 left-3" />
                <span className="text-sm text-[#E63946]">{credErrors?.email?.message}</span>
              </div>

              <div className="relative mt-10 flex flex-col gap-2">
                <label htmlFor="password" className="font-zodiak font-semibold lg:text-lg">
                  Password
                </label>
                <input
                  type={isPassVisible ? 'text' : 'password'}
                  className="outline-none bg-inherit border border-darkgreen rounded-xl pl-12 p-3 font-jakarta placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                  placeholder="Enter your password"
                  {...registerCreds('password')}
                />
                <Lock className="absolute top-12 left-3" />
                {isPassVisible ? (
                  <Eye className="absolute top-12 right-5 cursor-pointer" onClick={() => setIsPassVisible(!isPassVisible)} />
                ) : (
                  <EyeOff className="absolute top-12 right-5 cursor-pointer" onClick={() => setIsPassVisible(!isPassVisible)} />
                )}
                <span className="text-sm text-[#E63946]">{credErrors?.password?.message}</span>
              </div>

              <button
                className={`my-10 w-1/2 flex items-center transition-colors justify-center font-jakarta p-3 mx-auto rounded-xl font-semibold hover:animate-shift-up focus:animate-shift-down hover:bg-peach hover:border hover:border-darkgreen hover:text-darkgreen ${isAdminLoggingIn ? 'bg-peach text-darkgreen border border-darkgreen' : 'bg-darkgreen text-peach'}`}
              >
                {isAdminLoggingIn ? 'Sending OTP...' : 'Continue'}
              </button>
            </form>
          ) : (
            <form className="p-5" onSubmit={handleSubmitOtp(onSubmitOtp)}>
              <h3 className="font-zodiak text-3xl md:text-4xl font-bold my-4">
                Verify OTP
              </h3>
              <p className="font-jakarta text-sm opacity-80 mb-2">
                A 6-digit OTP has been sent to <span className="font-semibold">{verifiedEmail}</span>
              </p>

              <div className="relative mt-8 flex flex-col gap-2">
                <label htmlFor="otp" className="font-zodiak font-semibold lg:text-lg">
                  OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  className="outline-none bg-inherit border border-darkgreen rounded-xl p-3 pl-12 font-jakarta tracking-widest text-lg placeholder:text-darkgreen placeholder:font-jakarta placeholder:opacity-80"
                  placeholder="••••••"
                  {...registerOtp('otp')}
                />
                <ShieldCheck className="absolute top-12 left-3" />
                <span className="text-sm text-[#E63946]">{otpErrors?.otp?.message}</span>
              </div>

              <button
                className={`my-8 w-1/2 flex items-center transition-colors justify-center font-jakarta p-3 mx-auto rounded-xl font-semibold hover:animate-shift-up focus:animate-shift-down hover:bg-peach hover:border hover:border-darkgreen hover:text-darkgreen ${isAdminLoggingIn ? 'bg-peach text-darkgreen border border-darkgreen' : 'bg-darkgreen text-peach'}`}
              >
                {isAdminLoggingIn ? 'Verifying...' : 'Verify & Login'}
              </button>

              <div className="text-center font-jakarta tracking-tight">
                <button
                  type="button"
                  onClick={handleBackToCredentials}
                  className="underline opacity-80 hover:opacity-100"
                >
                  ← Back to login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
