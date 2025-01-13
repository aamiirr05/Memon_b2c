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
    .number()
    .typeError('Amount required must be a number')
    .positive('Amount required must be positive')
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
    <div className="h-screen w-screen bg-darkgreen flex flex-row">
      <div className="relative flex-1 bg-peach m-4 rounded-xl flex flex-col items-center justify-center">
        <Link
          to="/"
          className="absolute top-8 left-8 text-sm font-medium text-darkgreen bg-darkgreen/20 hover:bg-darkgreen/80 transition-colors hover:text-peach rounded-full flex justify-center items-center gap-1 px-2 py-1"
        >
          <ArrowLeft size={18} />
          <span className="mt-[-2px] mr-1">Back to home</span>
        </Link>
        <div className="flex justify-center items-center flex-col">
          <img src="/forex.png" alt="forex" className="w-48 h-48 mb-12" />
          <h3 className="font-bold text-xl text-darkgreen">
            Simlify Your Hajj & Umrah Payments
          </h3>
          <p className="max-w-md text-center text-darkgreen tracking-tight leading-tight mt-2">
            Exchange currencies effortlessly for your Hajj or Umrah journey.
            Complete the form on the right to get the best forex rates and a
            seamless payment experience.
          </p>
        </div>
      </div>

      {/* form */}
      <div className="flex-1 flex flex-col gap-12 justify-center items-center">
        <h1 className="text-3xl font-semibold text-peach font-jakarta tracking-tight">
          FOREX FORM
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div id="input" className="relative">
              <select
                {...register('salutation')}
                id="salutation"
                className="block w-full text-sm h-[50px] px-4 text-peach bg-darkgreen rounded-[8px] border border-peach appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-peach focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
              >
                <option value="">Select Salutation</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>
              <label
                htmlFor="salutation"
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-2 z-10 origin-[0] bg-peach text-darkgreen rounded-full  disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem]"
              >
                Salutation
              </label>
              <p className="text-red-600 text-sm mt-1">
                {errors.salutation?.message}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* First Name */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('firstname')}
                id="firstname"
                className="forex-input-fields peer"
                placeholder="Firstname"
              />
              <label htmlFor="firstname" className="forex-input-labels">
                Firstname
              </label>
              <p className="text-red-600 text-sm mt-1">
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
                placeholder="Lastname"
              />
              <label htmlFor="lastname" className="forex-input-labels">
                Lastname
              </label>
              <p className="text-red-600 text-sm mt-1">
                {errors.lastname?.message}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Email */}
            <div id="input" className="relative">
              <input
                type="email"
                {...register('email')}
                id="email"
                className="forex-input-fields peer"
                placeholder="Email"
              />
              <label htmlFor="email" className="forex-input-labels">
                Email
              </label>
              <p className="text-red-600 text-sm mt-1">
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
                placeholder="Contact"
              />
              <label htmlFor="contact" className="forex-input-labels">
                Contact
              </label>
              <p className="text-red-600 text-sm mt-1">
                {errors.contact?.message}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Amount Required */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('amountrequired')}
                id="amountrequired"
                className="forex-input-fields peer"
                placeholder="Amount Required"
              />
              <label htmlFor="amountrequired" className="forex-input-labels">
                Amount Required
              </label>
              <p className="text-red-600 text-sm mt-1">
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
                placeholder="Country"
              />
              <label htmlFor="country" className="forex-input-labels">
                Country
              </label>
              <p className="text-red-600 text-sm mt-1">
                {errors.country?.message}
              </p>
            </div>
          </div>

          <div className="">
            {/* Country */}
            <div id="input" className="relative">
              <input
                type="text"
                {...register('address')}
                id="address"
                className="forex-input-fields peer"
                placeholder="Address"
              />
              <label htmlFor="country" className="forex-input-labels">
                Address
              </label>
              <p className="text-red-600 text-sm mt-1">
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
