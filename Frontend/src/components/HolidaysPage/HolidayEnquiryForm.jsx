import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHolidayEnquiryForm } from '../../store/useHolidayEnquiryForm';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  contact: yup
    .string()
    .matches(/^[0-9]+$/, 'Contact must be a valid number')
    .required('Contact is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  nationality: yup.string().required('Nationality is required'),
  preferredDate: yup.date().required('Preferred Date is required'),
  numberOfNights: yup.string().required('Number of Nights is required'),
  numberOfAdults: yup.string().required('Number of Adults is required'),
  numberOfChildren: yup.string().min(0, 'Cannot be negative'),
  preferredDepartureCity: yup
    .string()
    .required('Preferred Departure City is required'),
});

const HolidayEnquiryForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { submit, isSubmitting } = useHolidayEnquiryForm();

  const onSubmit = (data) => {
    submit(data, onClose);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 mb-4 mt-4 max-h-96 overflow-y-scroll modal-scrollbar py-4 px-1 pr-3"
    >
      {/* Full Name & Contact */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            {...register('fullName')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="full_name" className="custom-forex-input-labels">
            Full Name
          </label>
          <p className="text-red-400 text-sm">{errors.fullName?.message}</p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('contact')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="contact" className="custom-forex-input-labels">
            Contact
          </label>
          <p className="text-red-400 text-sm">{errors.contact?.message}</p>
        </div>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          {...register('email')}
          className="custom-forex-input-fields peer"
          placeholder=""
        />
        <label htmlFor="email" className="custom-forex-input-labels">
          Email
        </label>
        <p className="text-red-400 text-sm">{errors.email?.message}</p>
      </div>

      {/* Nationality & Preferred Date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            {...register('nationality')}
            className="custom-forex-input-fields peer"
            placeholder="Nationality"
          />
          <label htmlFor="nationality" className="custom-forex-input-labels">
            Nationality
          </label>
          <p className="text-red-400 text-sm">{errors.nationality?.message}</p>
        </div>

        <div className="relative">
          <input
            type="date"
            {...register('preferredDate')}
            className="block w-full text-sm h-[50px] px-4 text-darkgreen  rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
          />
          <label
            htmlFor="traveller_date"
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75  leading-tight"
          >
            Traveller Date
          </label>
          <p className="text-red-400 text-sm">
            {errors.preferredDate?.message}
          </p>
        </div>
      </div>

      {/* Number of Nights & Adults */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            {...register('numberOfNights')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="nights" className="custom-forex-input-labels">
            Total Nights
          </label>
          <p className="text-red-400 text-sm">
            {errors.numberOfNights?.message}
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('numberOfAdults')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="adults" className="custom-forex-input-labels">
            Total Adults
          </label>
          <p className="text-red-400 text-sm">
            {errors.numberOfAdults?.message}
          </p>
        </div>
      </div>

      {/* Number of Children & Preferred Departure City */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            {...register('numberOfChildren')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="children" className="custom-forex-input-labels">
            Total Children
          </label>
          <p className="text-red-400 text-sm">
            {errors.numberOfChildren?.message}
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('preferredDepartureCity')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="city" className="custom-forex-input-labels">
            Preferred Departure City
          </label>
          <p className="text-red-400 text-sm">
            {errors.preferredDepartureCity?.message}
          </p>
        </div>
      </div>

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

export default HolidayEnquiryForm;
