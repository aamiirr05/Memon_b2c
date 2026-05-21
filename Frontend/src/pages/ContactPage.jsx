import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContactForm } from '../store/useContactForm';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us | Memon Haj Umrah Tours & Travels</title>
        <meta
          name="description"
          content="Get in touch with Memon Haj Umrah Tours & Travels. Call +91 8108404376 or WhatsApp us to enquire about Hajj and Umrah packages from Mumbai."
        />
        <meta property="og:title" content="Contact Memon Haj Umrah Tours & Travels" />
        <meta
          property="og:description"
          content="Reach out to us for Hajj & Umrah package enquiries. Based in Mumbai. IATA certified."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/memonb2c/image/upload/v1739885803/rmf00msx8vhusevuc2iv.png"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col lg:flex-row w-full h-full bg-peach/10 font-jakarta">
        {/* Left Side (Form) */}
        <div className="w-full lg:w-2/3 flex flex-col justify-center items-center p-4 lg:p-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-darkgreen">
            Get in Touch
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg p-6 space-y-4 text-darkgreen"
          >
            {/* Salutation */}
            <div>
              <select
                {...register('salutation')}
                className="form-input text-sm focus:ring-darkgreen/50 text-darkgreen bg-transparent border-darkgreen w-full"
              >
                <option value="">Select Salutation</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
              <p className="text-red-400 text-sm">
                {errors.salutation?.message}
              </p>
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <input
                  type="text"
                  {...register('firstname')}
                  className="form-input focus:ring-darkgreen/50 placeholder:text-darkgreen bg-transparent border-darkgreen w-full"
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
                  className="form-input focus:ring-darkgreen/50 placeholder:text-darkgreen bg-transparent border-darkgreen w-full"
                  placeholder="Last Name"
                />
                <p className="text-red-400 text-sm">
                  {errors.lastname?.message}
                </p>
              </div>
            </div>

            {/* Email & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <input
                  type="email"
                  {...register('email')}
                  className="form-input focus:ring-darkgreen/50 placeholder:text-darkgreen bg-transparent border-darkgreen w-full"
                  placeholder="Email"
                />
                <p className="text-red-400 text-sm">{errors.email?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register('contact')}
                  className="form-input focus:ring-darkgreen/50 placeholder:text-darkgreen bg-transparent border-darkgreen w-full"
                  placeholder="Contact Number"
                />
                <p className="text-red-400 text-sm">
                  {errors.contact?.message}
                </p>
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                {...register('message')}
                className="form-input focus:ring-darkgreen/50 placeholder:text-darkgreen bg-transparent border-darkgreen w-full h-32 text-sm"
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
          <div>
            <div className="my-6 text-darkgreen w-full">
              <div className="flex item-start justify-between sm:flex-row pb-4">
                <p className="pr-1 lg:pr-2 mb-2 sm:mb-0 text-md lg:text-lg">
                  <strong>Contact:</strong>
                </p>
                <div className="flex md:flex-row flex-col text-sm lg:text-md item-center justify-center gap-[0.4rem] lg:gap-4">
                  <a
                    href="https://wa.me/918108404376?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 sm:mb-0 hover:underline"
                  >
                    +91 8108404376
                  </a>
                  <a
                    href="https://wa.me/919022549162?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 sm:mb-0 hover:underline"
                  >
                    +91 9022549162
                  </a>
                  <a
                    href="https://wa.me/918268979705?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20your%20Umrah%20and%20Haj%20Packages."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 sm:mb-0 hover:underline"
                  >
                    +91 8268979705
                  </a>
                </div>
              </div>

              <div className="flex item-start justify-center">
                <p className="pr-2 text-md lg:text-lg">
                  <strong>Email:</strong>
                </p>
                <a
                  href="mailto:memonhajumrah@gmail.com"
                  className="text-md lg:text-lg items-center hover:underline"
                >
                  memonhajumrah@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Map) */}
        <div className="w-full lg:w-1/3 relative border-dotted border-2 border-darkgreen h-64 lg:h-[800px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.9747598538665!2d72.8610838!3d19.2834638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b119ab9768ab%3A0x28e07076397e4fff!2sMemon%20Haj%20Umrah%20Tours%20And%20Travels!5e0!3m2!1sen!2sin!4v1737455011092!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="rounded-r-lg h-full"
            allowFullScreen=""
            loading="lazy"
            title="Memon Haj Umrah Tours & Travels - Mumbai Office Location"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
