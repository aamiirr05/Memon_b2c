import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useCustomizedPackageFormStore from '../store/useCustomizedPackageStore';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  contact: yup
    .string()
    .matches(/^\d+$/, 'Contact must be a number')
    .required('Contact is required'),
  booking_type: yup.string().required('Booking type is required'),
  travel_class: yup.string().required('Travel class is required'),
  makkah_hotel_name: yup.string().nullable(),
  medina_hotel_name: yup.string().nullable(),
  room_type: yup.string().nullable(),
  adults: yup
    .number()
    .min(1, 'At least one adult is required')
    .required('Adults is required'),
  kids: yup.number().min(0).default(0),
  additional_info: yup.string().max(300, 'Max 300 characters allowed'),
});

const CustomizedPackageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { submit, isSubmitting } = useCustomizedPackageFormStore();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    submit(data, navigate);
    reset();
  };

  return (
    <div className="overflow-hidden w-8/12 my-8 mx-auto shadow-2xl rounded-xl font-jakarta">
      <div className="h-full w-full bg-darkgreen flex flex-col lg:flex-row pb-6 pl-0 lg:pl-6 rounded-xl">
        <div className="flex-1 flex flex-col gap-12 py-6 px-6 justify-center items-center bg-darkgreen">
          <h1 className="text-3xl font-semibold text-peach font-zodiak tracking-tight mt-4 lg:mt-0">
            CUSTOMIZED PACKAGE ENQUIRY
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-10/12 flex flex-col gap-6"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div id="input" className="relative">
                <input
                  type="text"
                  {...register('first_name')}
                  id="first_name"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label htmlFor="first_name" className="forex-input-labels">
                  First Name
                </label>
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors.first_name?.message}
                </p>
              </div>
              <div id="input" className="relative">
                <input
                  type="text"
                  {...register('last_name')}
                  id="last_name"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label htmlFor="last_name" className="forex-input-labels">
                  Last Name
                </label>
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors.last_name?.message}
                </p>
              </div>
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
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors.email?.message}
                </p>
              </div>
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
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors.contact?.message}
                </p>
              </div>
              <div id="input" className="relative">
                <input
                  type="text"
                  {...register('booking_type')}
                  id="booking_type"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label htmlFor="booking_type" className="forex-input-labels">
                  Booking Type
                </label>
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors.booking_type?.message}
                </p>
              </div>
              <div id="input" className="relative">
                <input
                  type="text"
                  {...register('travel_class')}
                  id="travel_class"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label htmlFor="travel_class" className="forex-input-labels">
                  Travel Class
                </label>
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors.travel_class?.message}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <div id="input" className="relative">
                <input
                  type="text"
                  {...register('makkah_hotel_name')}
                  id="makkah_hotel_name"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label
                  htmlFor="makkah_hotel_name"
                  className="forex-input-labels"
                >
                  Makkah Hotel Name (Optional)
                </label>
              </div>
              <div id="input" className="relative">
                <input
                  type="text"
                  {...register('medina_hotel_name')}
                  id="medina_hotel_name"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label
                  htmlFor="medina_hotel_name"
                  className="forex-input-labels"
                >
                  Medina Hotel Name (Optional)
                </label>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div id="input" className="relative">
                <input
                  type="text"
                  {...register('room_type')}
                  id="room_type"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label htmlFor="room_type" className="forex-input-labels">
                  Room Type (Optional)
                </label>
              </div>
              <div id="input" className="relative">
                <input
                  type="number"
                  {...register('adults')}
                  id="adults"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label htmlFor="adults" className="forex-input-labels">
                  Adults
                </label>
                <p className="text-red-400 text-sm min-h-[1rem]">
                  {errors.adults?.message}
                </p>
              </div>
              <div id="input" className="relative">
                <input
                  type="number"
                  {...register('kids')}
                  id="kids"
                  className="forex-input-fields peer"
                  placeholder=" "
                />
                <label htmlFor="kids" className="forex-input-labels">
                  Kids (Optional)
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea
                {...register('additional_info')}
                id="additional_info"
                className="forex-input-fields peer"
                placeholder=" "
                rows="4"
              />
              <label htmlFor="additional_info" className="forex-input-labels">
                Additional Info (Optional)
              </label>
            </div>

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
    </div>
  );
};

export default CustomizedPackageForm;
