import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const testimonialSchema = yup.object().shape({
  fullname: yup
    .string()
    .required('Full name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  stars: yup
    .string()
    .typeError('Stars must be a number')
    .min(1, 'Minimum rating is 1')
    .max(5, 'Maximum rating is 5')
    .required('Rating is required'),
  review: yup
    .string()
    .required('Review is required')
    .max(300, 'Review cannot exceed 300 characters'),
});

const TestimonialForm = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(testimonialSchema),
  });

  const onSubmit = async (data) => {
    console.log('Submitted Data:', data);
    try {
      const res = await axiosInstance.post('/users/enquiry/testimonial', data);

      const msg = res?.data?.message;
      toast.success(msg);

      console.log(res);
    } catch (error) {
      const msg = error?.message;
      toast.error(msg);
    }
  };

  return (
    <>
      <Helmet>
        <title>Testmonial Form</title>
        <meta name="description" content={`description`} />
        <meta property="og:title" content={`title`} />
        <meta property="og:description" content={`description`} />
        <meta property="og:image" content={`image`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full md:p-10 p-8">
        <h2 className="lg:text-3xl sm:text-2xl text-xl  mt-10 font-bold text-darkgreen font-jakarta">
          Write What you Think About Us.
        </h2>
        <div className=" w-full lg:w-8/12 shadow-lg rounded-lg mx-auto p-6 my-10 font-jakarta">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className=" md:flex xl-flex-col items-center justify-center">
              <label className="custom-label w-1/2">Full Name</label>
              <input
                {...register('fullname')}
                className="custom-input border-darkgreen focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 placeholder-transparent caret-darkgreen w-full"
                placeholder="Enter your full name"
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* City */}
            <div className=" md:flex xl-flex-col items-center justify-center">
              <label className="custom-label w-1/2">City</label>
              <input
                {...register('city')}
                className="custom-input border-darkgreen focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 placeholder-transparent caret-darkgreen w w-full"
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div className=" md:flex xl-flex-col items-center justify-center">
              <label className="custom-label w-1/2">Country</label>
              <input
                {...register('country')}
                className="custom-input border-darkgreen focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 placeholder-transparent caret-darkgreen w-full"
                placeholder="Enter your country"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Star Rating */}
            <div className=" md:flex xl-flex-col items-center justify-center">
              <label className="custom-label w-1/2">
                Rating (1 to 5 stars)
              </label>
              <input
                type="number"
                {...register('stars')}
                max={5}
                min={0}
                className="custom-input border-darkgreen focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 placeholder-transparent caret-darkgreen w-full"
                placeholder="Enter rating (1-5)"
              />
              {errors.stars && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.stars.message}
                </p>
              )}
            </div>

            {/* Review */}
            <div className=" md:flex xl-flex-col  items-center justify-center">
              <label className="custom-label w-1/2">Your Review</label>
              <textarea
                {...register('review')}
                className="custom-input border-darkgreen focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 placeholder-transparent caret-darkgreen w-full"
                placeholder="Write your review..."
                rows="4"
              />
              {errors.review && (
                <p className="text-red-500 text-xs mt-2 ">
                  {errors.review.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center font-jakarta">
              <button
                type="submit"
                className="md:w-1/3 mx-auto my-8 bg-darkgreen text-white py-2 px-4 rounded-md hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen transition-colors md:text-md text-sm"
              >
                Submit Testimonial
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TestimonialForm;
