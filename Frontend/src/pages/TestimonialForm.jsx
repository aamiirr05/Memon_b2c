import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

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
    <div className="w-full p-10">
      <h2 className="text-2xl mt-5 font-bold text-darkgreen font-zodiak mb-4">
        Write what you think about us
      </h2>
      <div className=" w-full lg:w-1/3 shadow-lg rounded-lg bg-peach/30 mx-auto p-6 my-10 font-jakarta">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="custom-label">Full Name:</label>
            <input
              {...register('fullname')}
              className="custom-input w-full"
              placeholder="Enter your full name"
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-2">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="custom-label">City:</label>
            <input
              {...register('city')}
              className="custom-input w-full"
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-2">{errors.city.message}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="custom-label text-xs">Country:</label>
            <input
              {...register('country')}
              className="custom-input w-full"
              placeholder="Enter your country"
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-2">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <label className="custom-label">Rating (1 to 5 stars):</label>
            <input
              type="number"
              {...register('stars')}
              max={5}
              min={0}
              className="custom-input w-full"
              placeholder="Enter rating (1-5)"
            />
            {errors.stars && (
              <p className="text-red-500 text-xs mt-2">
                {errors.stars.message}
              </p>
            )}
          </div>

          {/* Review */}
          <div>
            <label className="custom-label">Your Review:</label>
            <textarea
              {...register('review')}
              className="custom-input w-full"
              placeholder="Write your review..."
              rows="4"
            />
            {errors.review && (
              <p className="text-red-500 text-xs mt-2">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center font-jakarta">
            <button
              type="submit"
              className="md:w-1/2 mx-auto bg-darkgreen text-white py-2 px-4 rounded-md hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen transition-colors text-sm"
            >
              Submit Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
