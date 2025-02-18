import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useCustomizedPackageStore from '../store/useCustomizedPackageStore';

const schema = yup.object().shape({
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
  bookingtype: yup.string().required('Booking type is required'),
  travelclass: yup.string().required('Travel class is required'),
  makkahhotelname: yup.string().nullable(),
  medinahotelname: yup.string().nullable(),
  roomtype: yup.string().nullable(),
  adults: yup
    .string()
    .min(1, 'At least one adult is required')
    .required('Adults is required'),
  kids: yup.string().min(0).default(0),
  additionalinfo: yup.string().max(300, 'Max 300 characters allowed'),
});

const CustomizedPackagePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const { submit, isSubmitting } = useCustomizedPackageStore();

  const onSubmit = (data) => {
    submit(data, navigate);
    reset();
  };

  return (
    <div className="bg-peach/10 py-12 font-jakarta px-4 sm:px-8">
      <div className="flex flex-col gap-12 pt-6 pb-20 rounded-lg px-6 sm:px-12 lg:px-16 justify-center items-center bg-darkgreen max-w-5xl mx-auto">
        <h1 className="text-2xl tracking-normal sm:text-3xl font-semibold text-peach mt-6 font-zodiak text-center">
          CUSTOMIZE YOUR PACKAGE
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'firstname', label: 'First Name', type: 'text' },
              { id: 'lastname', label: 'Last Name', type: 'text' },
              { id: 'email', label: 'Email', type: 'email' },
              { id: 'contact', label: 'Contact', type: 'text' },
              { id: 'bookingtype', label: 'Booking Type', type: 'text' },
              { id: 'travelclass', label: 'Travel Class', type: 'text' },
            ].map(({ id, label, type }) => (
              <div key={id} className="relative">
                <input
                  type={type}
                  {...register(id)}
                  id={id}
                  className="forex-input-fields peer w-full"
                  placeholder=" "
                />
                <label htmlFor={id} className="forex-input-labels">
                  {label}
                </label>
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors[id]?.message}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { id: 'makkahhotelname', label: 'Makkah Hotel Name (Optional)' },
              { id: 'medinahotelname', label: 'Medina Hotel Name (Optional)' },
            ].map(({ id, label }) => (
              <div key={id} className="relative">
                <input
                  type="text"
                  {...register(id)}
                  id={id}
                  className="forex-input-fields peer w-full"
                  placeholder=" "
                />
                <label htmlFor={id} className="forex-input-labels">
                  {label}
                </label>
              </div>
            ))}
          </div>

          <div className="grid  sm:grid-cols-2 gap-6">
            {[
              { id: 'roomtype', label: 'Room Type (Optional)' },
              { id: 'adults', label: 'Adults', required: true },
              { id: 'kids', label: 'Kids (Optional)' },
            ].map(({ id, label }) => (
              <div key={id} className="relative">
                <input
                  type="text"
                  {...register(id)}
                  id={id}
                  className="forex-input-fields peer w-full"
                  placeholder=" "
                />
                <label htmlFor={id} className="forex-input-labels">
                  {label}
                </label>
                {errors[id] && (
                  <p className="text-red-400 text-sm min-h-[1rem]">
                    {errors[id]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="relative">
            <textarea
              {...register('additionalinfo')}
              id="additionalinfo"
              className="forex-input-fields peer w-full"
              placeholder=" "
              rows="4"
            />
            <label htmlFor="additionalinfo" className="forex-input-labels">
              Additional Info (Optional)
            </label>
          </div>

          <button
            type="submit"
            className="w-full sm:w-3/5 mx-auto py-3 px-8 mt-12 bg-peach text-darkgreen text-lg font-medium rounded-md hover:bg-peach/80 focus:outline-none focus:ring-2 focus:ring-darkgreen focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomizedPackagePage;
