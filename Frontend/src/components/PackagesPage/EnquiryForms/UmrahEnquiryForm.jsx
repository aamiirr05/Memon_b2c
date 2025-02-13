/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useUmrahEnquiryFormStore } from '../../../store/useUmrahEnquiryFormStore';

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
  traveller_date: yup.date().required('Traveller date is required'),
  total_adults: yup.string().required('Total adults is required'),
  total_children: yup.string().required('Total children is required'),
  total_infants: yup.string().required('Total infants is required'),
});

const UmrahEnquiryForm = ({ packageName, packageType, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { submit, isSubmitting } = useUmrahEnquiryFormStore();

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      package_name: packageName,
      package_type: packageType,
    };

    submit(finalData, onClose);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:gap-6 mb-4 mt-4 h-full py-4 px-1 pr-3"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div id="input" className="relative">
          <select
            {...register('salutation')}
            id="salutation"
            className="block w-full text-sm h-[40px] sm:h-[50px] px-4 text-darkgreen  rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
          >
            <option value="" className="text-darkgreen/60">
              Select Salutation
            </option>
            <option value="Mr " className="text-darkgreen">
              Mr
            </option>
            <option value="Mrs" className="text-darkgreen">
              Mrs
            </option>
            <option value="Ms" className="text-darkgreen">
              Ms
            </option>
          </select>
          <label
            htmlFor="salutation"
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-xs sm:text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75 leading-tight"
          >
            Salutation
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.salutation ? 'visible' : 'invisible'}`}
          >
            {errors.salutation?.message}
          </p>
        </div>
      </div>

      <div className=" flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        {/* First Name */}
        <div id="input" className="relative">
          <input
            type="text"
            {...register('firstname')}
            id="firstname"
            className="custom-forex-input-fields peer "
            placeholder=" "
          />
          <label htmlFor="firstname" className="custom-forex-input-labels ">
            Firstname
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.firstname ? 'visible' : 'invisible'}`}
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
            className="custom-forex-input-fields peer"
            placeholder=" "
          />
          <label htmlFor="lastname" className="custom-forex-input-labels">
            Lastname
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.lastname ? 'visible' : 'invisible'}`}
          >
            {errors.lastname?.message}
          </p>
        </div>
      </div>

      {/* Email and Contact */}
      <div className=" flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        {/* Email */}
        <div id="input" className="relative">
          <input
            type="email"
            {...register('email')}
            id="email"
            className="custom-forex-input-fields peer"
            placeholder=" "
          />
          <label htmlFor="email" className="custom-forex-input-labels">
            Email
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.email ? 'visible' : 'invisible'}`}
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
            className="custom-forex-input-fields peer"
            placeholder=" "
          />
          <label htmlFor="contact" className="custom-forex-input-labels">
            Contact
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.contact ? 'visible' : 'invisible'}`}
          >
            {errors.contact?.message}
          </p>
        </div>
      </div>

      {/* Traveller Date and Counts */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Traveller Date */}
        <div id="input" className="relative">
          <input
            type="date"
            {...register('traveller_date')}
            id="traveller_date"
            className="block w-full text-sm h-[40px] sm:h-[50px] px-4 text-darkgreen  rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
            placeholder=" "
          />
          <label
            htmlFor="traveller_date"
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-xs sm:text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75  leading-tight"
          >
            Traveller Date
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 overflow-hidden ${errors.traveller_date ? 'visible' : 'invisible'}`}
          >
            Date is required
            {/* {errors.traveller_date?.message} */}
          </p>
        </div>

        {/* Total Adults */}
        <div id="input" className="relative">
          <input
            type="text"
            {...register('total_adults')}
            id="total_adults"
            className="custom-forex-input-fields peer"
            placeholder=" "
          />
          <label htmlFor="total_adults" className="custom-forex-input-labels">
            Total Adults
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.total_adults ? 'visible' : 'invisible'}`}
          >
            {errors.total_adults?.message}
          </p>
        </div>
      </div>

      <div className=" flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        {/* Total Children */}
        <div id="input" className="relative">
          <input
            type="text"
            {...register('total_children')}
            id="total_children"
            className="custom-forex-input-fields peer"
            placeholder=" "
          />
          <label htmlFor="total_children" className="custom-forex-input-labels">
            Total Children
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.total_children ? 'visible' : 'invisible'}`}
          >
            {errors.total_children?.message}
          </p>
        </div>

        {/* Total Infants */}
        <div id="input" className="relative">
          <input
            type="text"
            {...register('total_infants')}
            id="total_infants"
            className="custom-forex-input-fields peer"
            placeholder=" "
          />
          <label htmlFor="total_infants" className="custom-forex-input-labels">
            Total Infants
          </label>
          <p
            className={`text-red-400 text-sm mt-0.5 mb-1 ${errors.total_infants ? 'visible' : 'invisible'}`}
          >
            {errors.total_infants?.message}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-8 bg-darkgreen text-peach text-sm font-medium rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-darkgreen focus:ring-offset-2"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default UmrahEnquiryForm;
