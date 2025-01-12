import { Eye, EyeOff, Lock, Mail, MoveLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { AuthContext } from '../context';
import { jwtDecode } from 'jwt-decode';

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
  const [isLoading, setIsLoading] = useState(false);
  const {
    setIsAdminLoggedIn,
    isAdminLoggedIn,
    setAccessToken,
    setRefreshToken,
  } = useContext(AuthContext);

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

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setIsAdminLoggedIn(true);
      const res = await axiosInstance.post('/admin/login', {
        email: data.email,
        password: data.password,
      });

      const successmsg = res.data.message;
      handleSuccess(successmsg);
      console.log(res);

      const accesstoken = Cookies.get('accessToken');
      setAccessToken(accesstoken);
      const refreshtoken = Cookies.get('refreshToken');
      setRefreshToken(refreshtoken);

      const decodedToken = jwtDecode(accesstoken);
      console.log(decodedToken);

      setIsAdminLoggedIn(decodedToken.isAdmin);

      navigate('/admin/enquiry');
      localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn || true);

      reset();
    } catch (error) {
      const errmsg = error.response.data.message;
      handleError(errmsg);

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="absolute bg-lightpeach bg-opacity-30 w-full lg:items-center h-full lg:h-screen lg:justify-center lg:p-10 xl:p-0 xl:gap-32 flex flex-col lg:flex-row items-center justify-center">
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

            <button className="my-10 w-1/2 flex items-center justify-center font-jakarta bg-darkgreen text-peach p-3 mx-auto rounded-xl font-semibold">
              {isLoading ? 'Logging In...' : 'Log In'}
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

//   export const loginLoader = () => {
//     const accesstoken = Cookies.get('accessToken');

//     if (accesstoken) {
//       return true;
//     } else {
//       return false;
//     }
//   };
