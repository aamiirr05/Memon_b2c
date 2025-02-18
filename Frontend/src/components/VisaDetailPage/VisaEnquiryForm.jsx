/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useVisaEnquiryForm } from '../../store/useVisaEnquiryForm';

const schema = yup.object().shape({
  salutation: yup.string().required('Salutation is required'),
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  contact: yup
    .string()
    .matches(/^[0-9]+$/, 'Contact must be a valid number')
    .required('Contact is required'),
});

const VisaEnquiryForm = ({ onClose, visaCountry, visaType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { submit, isSubmitting } = useVisaEnquiryForm();

  const onSubmit = (data) => {
    const payload = { ...data, visacountry: visaCountry, visatype: visaType };
    submit(payload, onClose);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:gap-6 mb-4 mt-4 h-full py-4 px-1 pr-3"
    >
      {/* Salutation */}
      <div className="relative">
        <select
          {...register('salutation')}
          className="block w-full text-sm h-[50px] px-4 text-darkgreen  rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
        >
          <option value="">Select</option>
          <option value="Mr.">Mr.</option>
          <option value="Ms.">Ms.</option>
          <option value="Mrs.">Mrs.</option>
        </select>
        <label
          htmlFor="salutation"
          className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75 leading-tight"
        >
          Salutation
        </label>
        <p className="text-red-400 text-sm">{errors.salutation?.message}</p>
      </div>

      {/* First Name & Last Name */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            id="firstname"
            type="text"
            {...register('firstname')}
            className="custom-forex-input-fields peer"
            placeholder="First Name"
          />
          <label htmlFor="firstname" className="custom-forex-input-labels ">
            Firstname
          </label>
          <p className="text-red-400 text-sm">{errors.firstname?.message}</p>
        </div>

        <div className="relative">
          <input
            id="lastname"
            type="text"
            {...register('lastname')}
            className="custom-forex-input-fields peer"
            placeholder="Last Name"
          />
          <label htmlFor="lastname" className="custom-forex-input-labels">
            Lastname
          </label>
          <p className="text-red-400 text-sm">{errors.lastname?.message}</p>
        </div>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          id="email"
          type="email"
          {...register('email')}
          className="custom-forex-input-fields peer"
          placeholder="Email"
        />
        <label htmlFor="email" className="custom-forex-input-labels">
          Email
        </label>
        <p className="text-red-400 text-sm">{errors.email?.message}</p>
      </div>

      {/* Contact */}
      <div className="relative">
        <input
          id="contact"
          type="text"
          {...register('contact')}
          className="custom-forex-input-fields peer"
          placeholder="Contact Number"
        />
        <label htmlFor="contact" className="custom-forex-input-labels">
          Contact
        </label>
        <p className="text-red-400 text-sm">{errors.contact?.message}</p>
      </div>

      {/* Visa Country & Visa Type */}
      {/* <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            {...register('visacountry')}
            className="form-input"
            placeholder="Visa Country"
          />
          <p className="text-red-400 text-sm">{errors.visacountry?.message}</p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('visatype')}
            className="form-input"
            placeholder="Visa Type"
          />
          <p className="text-red-400 text-sm">{errors.visatype?.message}</p>
        </div>
      </div> */}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-darkgreen text-peach rounded-md mt-4"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default VisaEnquiryForm;
