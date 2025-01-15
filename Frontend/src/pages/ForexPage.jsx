import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeft } from 'lucide-react';

import { useForexFormStore } from '../store/useForexFormStore';
import { Link, useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
  salutation: yup.string().required('Salutation is required'),
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  contact: yup
    .string()
    .matches(/^\d+$/, 'Contact must be a number')
    .required('Contact is required'),
  amountrequired: yup
    .string()
    .typeError('Amount required must be a number')
    .required('Amount required is required'),
  country: yup.string().required('Country is required'),
  address: yup.string().required('Address is required'),
});

const ForexInquiryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { submit, isSubmitting } = useForexFormStore();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    submit(data, navigate);
    reset();
  };

  return (
    <div className="h-full w-full lg:h-screen lg:w-screen bg-darkgreen flex flex-col lg:flex-row">
      <div className="relative flex-1 bg-peach m-4 rounded-xl flex flex-col items-center justify-center">
        <Link
          to="/"
          className="absolute top-8 left-8 text-sm font-medium text-darkgreen bg-darkgreen/20 hover:bg-darkgreen/80 transition-colors hover:text-peach rounded-full flex justify-center items-center gap-1 px-2 py-1"
        >
          <ArrowLeft size={18} />
          <span className="mt-[-2px] mr-1">Back to home</span>
        </Link>

        <div className="flex justify-center items-center flex-col">
          <img
            src="/forex.png"
            alt="forex"
            className="w-36 h-36 lg:w-48 lg:h-48 mt-24 lg:mt-0 mb-8 lg:mb-12"
          />
          <div className="text-darkgreen px-4">
            <h3 className="font-bold text-center text-xl">
            Holidays Made Easy: Best Forex Deals for Your Travel
            </h3>
            <p className="max-w-md text-center tracking-tight leading-tight mt-2 mb-4">
              Effortlessly exchange currencies for your holiday journey.
              Complete the form <span className="lg:hidden">below</span>
              <span className="hidden lg:inline">on the right</span> to get the
              best forex rates and a seamless payment experience.
            </p>
          </div>
        </div>
      </div>

      {/* form */}
      <div className="flex-1 flex flex-col gap-12 justify-center items-center bg-darkgreen">
        <h1 className="text-3xl font-semibold text-peach font-jakarta tracking-tight mt-4 lg:mt-0">
          FOREX ENQUIRY
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-fit px-4 sm:px-0 flex flex-col gap-2 mb-4"
        >
          <div className="grid sm:grid-cols-2 gap-4 ">
            <div id="input" className="relative">
              <select
                {...register('salutation')}
                id="salutation"
                className="block w-full text-sm h-[50px] px-4 text-peach bg-darkgreen rounded-[8px] border border-peach appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-peach focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
              >
                <option value="" className="text-peach/60">
                  Select Salutation
                </option>
                <option value="Mr " className="text-peach">
                  Mr
                </option>
                <option value="Mrs" className="text-peach">
                  Mrs
                </option>
                <option value="Ms" className="text-peach">
                  Ms
                </option>
              </select>
              <label
                htmlFor="salutation"
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-md py-0.5
                 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-peach text-darkgreen rounded-full  disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] leading-tight"
              >
                Salutation
              </label>
              <p
                className={`text-red-400 text-sm  min-h-[1rem] mt-1 ${
                  errors.salutation ? 'visible' : 'invisible'
                } `}
              >
                {errors.salutation?.message}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('firstname')}
                id="firstname"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="firstname" className="forex-input-labels">
                Firstname
              </label>
              <p
                className={`text-red-400 text-sm min-h-[1rem] mt-1 ${
                  errors.firstname ? 'visible' : 'invisible'
                } min-h-[1rem]`}
              >
                {errors.firstname?.message}
              </p>
            </div>

            {/* Last Name */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('lastname')}
                id="lastname"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="lastname" className="forex-input-labels">
                Lastname
              </label>
              <p
                className={`text-red-400 text-sm min-h-[1rem] mt-1 ${
                  errors.lastname ? 'visible' : 'invisible'
                } min-h-[1rem]`}
              >
                {errors.lastname?.message}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Email */}
            <div id="input" className="relative">
              <input
                type="email"
                {...register('email')}
                id="email"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="email" className="forex-input-labels">
                Email
              </label>
              <p
                className={`text-red-400 text-sm min-h-[1rem] mt-1 ${
                  errors.email ? 'visible' : 'invisible'
                } min-h-[1rem]`}
              >
                {errors.email?.message}
              </p>
            </div>

            {/* Contact */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('contact')}
                id="contact"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="contact" className="forex-input-labels">
                Contact
              </label>
              <p
                className={`text-red-400 text-sm min-h-[1rem] mt-1 ${
                  errors.contact ? 'visible' : 'invisible'
                } min-h-[1rem]`}
              >
                {errors.contact?.message}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Amount Required */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('amountrequired')}
                id="amountrequired"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="amountrequired" className="forex-input-labels">
                Amount Required
              </label>
              <p
                className={`text-red-400 text-sm min-h-[1rem] mt-1 ${
                  errors.amountrequired ? 'visible' : 'invisible'
                } min-h-[1rem]`}
              >
                {errors.amountrequired?.message}
              </p>
            </div>

            {/* Country */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('country')}
                id="country"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="country" className="forex-input-labels">
                Country
              </label>
              <p
                className={`text-red-400 text-sm min-h-[1rem] mt-1 ${
                  errors.country ? 'visible' : 'invisible'
                } min-h-[1rem]`}
              >
                {errors.country?.message}
              </p>
            </div>
          </div>

          <div className="">
            {/* Address */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('address')}
                id="address"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="country" className="forex-input-labels">
                Address
              </label>
              <p
                className={`text-red-400 text-sm min-h-[1rem] mt-1 ${
                  errors.address ? 'visible' : 'invisible'
                } min-h-[1rem]`}
              >
                {errors.address?.message}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-8 bg-peach text-darkgreen text-sm font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-darkgreen focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForexInquiryForm;
