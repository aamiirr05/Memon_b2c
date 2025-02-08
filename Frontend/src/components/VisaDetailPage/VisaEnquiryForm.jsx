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
      className="w-full flex flex-col gap-6 mb-4 mt-4 max-h-96 overflow-y-scroll modal-scrollbar py-4 px-1 pr-3"
    >
      {/* Salutation */}
      <div className="relative">
        <select {...register('salutation')} className="form-input">
          <option value="">Select Salutation</option>
          <option value="Mr.">Mr.</option>
          <option value="Ms.">Ms.</option>
          <option value="Mrs.">Mrs.</option>
        </select>
        <p className="text-red-400 text-sm">{errors.salutation?.message}</p>
      </div>

      {/* First Name & Last Name */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            {...register('firstname')}
            className="form-input"
            placeholder="First Name"
          />
          <p className="text-red-400 text-sm">{errors.firstname?.message}</p>
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('lastname')}
            className="form-input"
            placeholder="Last Name"
          />
          <p className="text-red-400 text-sm">{errors.lastname?.message}</p>
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

      {/* Contact */}
      <div className="relative">
        <input
          type="text"
          {...register('contact')}
          className="form-input"
          placeholder="Contact Number"
        />
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
        className="w-full py-3 bg-peach text-darkgreen rounded-md mt-4"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default VisaEnquiryForm;
