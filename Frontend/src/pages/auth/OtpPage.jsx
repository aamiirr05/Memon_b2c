import { useContext, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import mailsent from '../../assets/img/letter.svg';
// import { AuthContext } from '../../context';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      otp: Array(6).fill(''),
    },
  });

  const { authUser, verifyOtp, isVerifyingOtp } = useAuthStore();
  console.log(authUser);

  const inputsRef = useRef([]);
  // const { signupData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // console.log(signupData);
  // const userEmail = signupData.email;
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const otpValue = data.otp.join('');

    verifyOtp({ email: authUser?.email, inputOtp: otpValue }, navigate);

    // console.log(otpValue, userEmail);
    // try {
    //   setLoading(true);
    //   // Req for OTP Verification
    //   const res = await axiosInstance.post('/users/verify-otp', {
    //     email: userEmail,
    //     inputOtp: otpValue,
    //   });
    //   const message = res.data.data || 'verified';
    //   handleSuccess(message);
    //   console.log(res);
    //   //  Req for registering the user
    //   const resForRegister = await axiosInstance.post('/users/signup', {
    //     salutation: signupData.salutation,
    //     firstname: signupData.firstname,
    //     lastname: signupData.lastname,
    //     email: signupData.email,
    //     contact: signupData.contact,
    //     password: signupData.password,
    //     confirmpassword: signupData.confirmpassword,
    //   });
    //   const messagetwo = resForRegister.data.message || 'user created';
    //   handleSuccess(messagetwo);
    //   console.log(resForRegister, 'htu6uw6u');
    // } catch (error) {
    //   console.log(error);
    //   const message = error?.response.data.message || 'Something went wrong';
    //   handleError(message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    pasteData.split('').forEach((char, index) => {
      setValue(`otp.${index}`, char);
    });

    const nextIndex = pasteData.length;
    if (nextIndex < 6) {
      inputsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <>
      <div className="bg-peach/10 flex-col gap-5 xl:gap-16 flex items-center justify-center h-screen w-full">
        <h3 className="font-zodiak text-4xl text-darkgreen">Otp Sent!</h3>
        <div className="w-11/12 md:w-2/3 shadow-2xl lg:w-1/2 xl:w-1/3 rounded-3xl p-10 flex flex-col items-center justify-center gap-5 bg-peach">
          <div className="w-full flex items-center justify-center">
            <img
              src={mailsent}
              className="w-1/5"
              alt="Mail sent illustration"
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center justify-center"
          >
            <h3 className="font-jakarta text-center">
              Enter The Verification Code Sent To{' '}
              <span className="text-darkgreen cursor-pointer font-zodiak">
                {authUser?.email}
              </span>
            </h3>
            <div
              className="flex gap-2 md:gap-5 mt-5 items-center justify-center"
              onPaste={handlePaste}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Controller
                  key={index}
                  name={`otp.${index}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength="1"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!/^\d?$/.test(value)) return;

                        field.onChange(value);

                        // Move focus to the next input
                        if (value && index < 5) {
                          inputsRef.current[index + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === 'Backspace' &&
                          !field.value &&
                          index > 0
                        ) {
                          inputsRef.current[index - 1]?.focus();
                        }
                      }}
                      ref={(el) => (inputsRef.current[index] = el)}
                      className="w-10 h-10 md:w-12 md:h-12 outline-none text-center bg-inherit text-xl text-darkgreen font-bold border border-darkgreen rounded-md focus:border-2"
                    />
                  )}
                />
              ))}
            </div>
            <button
              type="submit"
              className="mt-10 mb-5 px-6 py-2 bg-darkgreen text-peach hover:text-darkgreen hover:bg-peach transition-colors animate-shift-up hover:border hover:border-darkgreen rounded-md font-jakarta font-semibold"
            >
              {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpPage;
