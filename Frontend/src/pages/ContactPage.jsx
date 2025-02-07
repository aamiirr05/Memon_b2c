import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContactForm } from '../store/useContactForm';

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
  message: yup.string().required('Message is required'),
});

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { submit, isSubmitting } = useContactForm();

  const onSubmit = (data) => {
    submit(data);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full md:h-screen bg-peach/50">
      {/* Left Side (Form) */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center p-4">
        <h2 className="text-5xl font-bold mb-6 text-darkgreen">Get in Touch</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-darkgreen/30 shadow-lg rounded-lg p-6 space-y-4"
        >
          {/* Salutation */}
          <div>
            <select
              {...register('salutation')}
              className="form-input focus:ring-darkgreen/50"
            >
              <option value="">Select Salutation</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
            <p className="text-red-400 text-sm">{errors.salutation?.message}</p>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                {...register('firstname')}
                className="form-input focus:ring-darkgreen/50"
                placeholder="First Name"
              />
              <p className="text-red-400 text-sm">
                {errors.firstname?.message}
              </p>
            </div>
            <div>
              <input
                type="text"
                {...register('lastname')}
                className="form-input focus:ring-darkgreen/50"
                placeholder="Last Name"
              />
              <p className="text-red-400 text-sm">{errors.lastname?.message}</p>
            </div>
          </div>

          {/* Email & Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="email"
                {...register('email')}
                className="form-input focus:ring-darkgreen/50"
                placeholder="Email"
              />
              <p className="text-red-400 text-sm">{errors.email?.message}</p>
            </div>
            <div>
              <input
                type="text"
                {...register('contact')}
                className="form-input focus:ring-darkgreen/50"
                placeholder="Contact Number"
              />
              <p className="text-red-400 text-sm">{errors.contact?.message}</p>
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              {...register('message')}
              className="form-input focus:ring-darkgreen/50 h-32"
              placeholder="Your Message"
            />
            <p className="text-red-400 text-sm">{errors.message?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-darkgreen text-white rounded-md mt-4"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-6 text-darkgreen text-center">
          <p>
            <strong>PHONE:</strong> 03 5432 1234
          </p>
          <p>
            <strong>FAX:</strong> 03 5432 1234
          </p>
          <p>
            <strong>EMAIL:</strong> info@marc.com.au
          </p>
        </div>
      </div>

      {/* Right Side (Map) */}
      <div className="w-full lg:w-1/3 h-96 lg:h-full relative border-dashed border-2 border-darkgreen">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.9747598538665!2d72.8610838!3d19.2834638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b119ab9768ab%3A0x28e07076397e4fff!2sMemon%20Haj%20Umrah%20Tours%20And%20Travels!5e0!3m2!1sen!2sin!4v1737455011092!5m2!1sen!2sin"
          width="100%"
          height="100%"
          className="rounded-r-lg h-full"
          allowFullScreen=""
          loading="lazy"
          title="Map"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
