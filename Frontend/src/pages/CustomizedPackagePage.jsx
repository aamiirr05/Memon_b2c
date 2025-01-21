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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const { submit, isSubmitting } = useCustomizedPackageStore();

  const onSubmit = (data) => {
    submit(data, navigate);
    reset();
  };

  return (
    <div>
      <div className="flex-1 flex flex-col gap-12 py-6 px-6 justify-center items-center bg-darkgreen">
        <h1 className="text-3xl font-semibold text-peach tracking-tight mt-6 ">
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
                {...register('firstname')}
                id="firstname"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="firstname" className="forex-input-labels">
                First Name
              </label>
              <p className="text-red-400 text-sm min-h-[1rem]">
                {errors.firstname?.message}
              </p>
            </div>
            <div id="input" className="relative">
              <input
                type="text"
                {...register('lastname')}
                id="lastname"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="lastname" className="forex-input-labels">
                Last Name
              </label>
              <p className="text-red-400 text-sm min-h-[1rem]">
                {errors.lastname?.message}
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
                {...register('bookingtype')}
                id="bookingtype"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="bookingtype" className="forex-input-labels">
                Booking Type
              </label>
              <p className="text-red-400 text-sm min-h-[1rem]">
                {errors.bookingtype?.message}
              </p>
            </div>
            <div id="input" className="relative">
              <input
                type="text"
                {...register('travelclass')}
                id="travelclass"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="travelclass" className="forex-input-labels">
                Travel Class
              </label>
              <p className="text-red-400 text-sm min-h-[1rem]">
                {errors.travelclass?.message}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div id="input" className="relative">
              <input
                type="text"
                {...register('makkahhotelname')}
                id="makkahhotelname"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="makkahhotelname" className="forex-input-labels">
                Makkah Hotel Name (Optional)
              </label>
            </div>
            <div id="input" className="relative">
              <input
                type="text"
                {...register('medinahotelname')}
                id="medinahotelname"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="medinahotelname" className="forex-input-labels">
                Medina Hotel Name (Optional)
              </label>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div id="input" className="relative">
              <input
                type="text"
                {...register('roomtype')}
                id="roomtype"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="roomtype" className="forex-input-labels">
                Room Type (Optional)
              </label>
            </div>
            <div id="input" className="relative">
              <input
                type="text"
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
                type="text"
                {...register('kids')}
                id="kids"
                className="forex-input-fields peer"
                placeholder=" "
              />
              <label htmlFor="kids" className="forex-input-labels">
                Kids
              </label>
            </div>
          </div>

          <div className="relative">
            <textarea
              {...register('additionalinfo')}
              id="additionalinfo"
              className="forex-input-fields peer"
              placeholder=" "
              rows="4"
            />
            <label htmlFor="additionalinfo" className="forex-input-labels">
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
  );
};

export default CustomizedPackagePage;
