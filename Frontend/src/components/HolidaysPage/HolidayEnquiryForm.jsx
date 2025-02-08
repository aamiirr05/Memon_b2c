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
            className="form-input"
            placeholder="Full Name"
          />
          <p className="text-red-400 text-sm">{errors.fullName?.message}</p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('contact')}
            className="form-input"
            placeholder="Contact"
          />
          <p className="text-red-400 text-sm">{errors.contact?.message}</p>
        </div>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          {...register('email')}
          className="form-input"
          placeholder="Email"
        />
        <p className="text-red-400 text-sm">{errors.email?.message}</p>
      </div>

      {/* Nationality & Preferred Date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            {...register('nationality')}
            className="form-input"
            placeholder="Nationality"
          />
          <p className="text-red-400 text-sm">{errors.nationality?.message}</p>
        </div>

        <div className="relative">
          <input
            type="date"
            {...register('preferredDate')}
            className="form-input"
          />
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
            className="form-input"
            placeholder="Number of Nights"
          />
          <p className="text-red-400 text-sm">
            {errors.numberOfNights?.message}
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('numberOfAdults')}
            className="form-input"
            placeholder="Number of Adults"
          />
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
            className="form-input"
            placeholder="Number of Children"
          />
          <p className="text-red-400 text-sm">
            {errors.numberOfChildren?.message}
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('preferredDepartureCity')}
            className="form-input"
            placeholder="Preferred Departure City"
          />
          <p className="text-red-400 text-sm">
            {errors.preferredDepartureCity?.message}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-peach text-darkgreen rounded-md mt-4"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default HolidayEnquiryForm;
