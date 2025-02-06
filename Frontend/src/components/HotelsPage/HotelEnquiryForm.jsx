import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHotelEnquiryFormStore } from '../../store/useHotelEnquiryForm';

const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  contactNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Contact Number must be a valid number')
    .required('Contact Number is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  checkInDate: yup.date().required('Check-in Date is required'),
  checkOutDate: yup.date().required('Check-out Date is required'),
  numberOfNights: yup.string().required('Number of Night is required'),
  numberOfRooms: yup.string().required('Number of Rooms is required'),
  roomType: yup.string().required('Room Type is required'),
  mealPlan: yup.string().required('Meal Plan is required'),
  numberOfAdults: yup.string().required('Number of Adults is required'),
  numberOfChildren: yup.string().min(0, 'Cannot be negative'),
  specialRequests: yup.string(),
});

const HotelEnquiryForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { submit, isSubmitting } = useHotelEnquiryFormStore();

  const onSubmit = (data) => {
    submit(data, onClose);
    // reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 mb-4 mt-4 max-h-96 overflow-y-scroll modal-scrollbar py-4 px-1 pr-3"
    >
      {/* Full Name & Contact Number */}
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
            {...register('contactNumber')}
            className="form-input"
            placeholder="Phone No."
          />
          <p className="text-red-400 text-sm">
            {errors.contactNumber?.message}
          </p>
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

      {/* Check-in & Check-out Dates */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="date"
            {...register('checkInDate')}
            className="form-input"
          />
          <p className="text-red-400 text-sm">{errors.checkInDate?.message}</p>
        </div>

        <div className="relative">
          <input
            type="date"
            {...register('checkOutDate')}
            className="form-input"
          />
          <p className="text-red-400 text-sm">{errors.checkOutDate?.message}</p>
        </div>
      </div>

      {/* Number of Nights & Rooms */}
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
            {...register('numberOfRooms')}
            className="form-input"
            placeholder="Number of Rooms"
          />
          <p className="text-red-400 text-sm">
            {errors.numberOfRooms?.message}
          </p>
        </div>
      </div>

      {/* Room Type & Meal Plan */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <select {...register('roomType')} className="form-input">
            <option value="">Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
            <option value="Quad">Quad</option>
            <option value="Suite">Suite</option>
          </select>
          <p className="text-red-400 text-sm">{errors.roomType?.message}</p>
        </div>

        <div className="relative">
          <select {...register('mealPlan')} className="form-input">
            <option value="">Select Meal Plan</option>
            <option value="Room Only">Room Only</option>
            <option value="Bed & Breakfast">Bed & Breakfast</option>
            <option value="Half Board">Half Board</option>
            <option value="Full Board">Full Board</option>
          </select>
          <p className="text-red-400 text-sm">{errors.mealPlan?.message}</p>
        </div>
      </div>

      {/* Number of Adults & Children */}
      <div className="grid sm:grid-cols-2 gap-4">
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
      </div>

      {/* Special Requests */}
      <div className="relative">
        <textarea
          {...register('specialRequests')}
          className="form-input"
          placeholder="Special Requests"
        />
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

export default HotelEnquiryForm;

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useHotelEnquiryFormStore } from '../../store/useHotelEnquiryForm';

// const schema = yup.object().shape({
//   fullName: yup.string().required('Full Name is required'),
//   contactNumber: yup
//     .string()
//     .matches(/^[0-9]+$/, 'Contact Number must be a valid number')
//     .required('Contact Number is required'),
//   email: yup
//     .string()
//     .email('Enter a valid email')
//     .required('Email is required'),
//   checkInDate: yup.date().required('Check-in Date is required'),
//   checkOutDate: yup.date().required('Check-out Date is required'),
//   numberOfNights: yup.number().positive().integer(),
//   numberOfRooms: yup
//     .number()
//     .positive()
//     .integer()
//     .required('Number of Rooms is required'),
//   roomType: yup.string().required('Room Type is required'),
//   mealPlan: yup.string().required('Meal Plan is required'),
//   numberOfAdults: yup
//     .number()
//     .positive()
//     .integer()
//     .required('Number of Adults is required'),
//   numberOfChildren: yup.number().integer().min(0, 'Cannot be negative'),
//   specialRequests: yup.string(),
// });

// const HotelEnquiryForm = ({ onClose }) => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const { submit, isSubmitting } = useHotelEnquiryFormStore();

//   const checkInDate = watch('checkInDate');
//   const checkOutDate = watch('checkOutDate');

//   const calculateNights = () => {
//     if (checkInDate && checkOutDate) {
//       const diff = new Date(checkOutDate) - new Date(checkInDate);
//       return Math.max(1, diff / (1000 * 60 * 60 * 24));
//     }
//     return '';
//   };

//   const onSubmit = (data) => {
//     const finalData = {
//       ...data,
//       numberOfNights: calculateNights(),
//     };
//     console.log(data);
//     // submit(finalData, onClose);
//     reset();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-xl flex flex-col gap-6 mb-4 mt-4 max-h-96 overflow-y-scroll modal-scrollbar py-4 px-1 pr-3"
//     >
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="relative">
//           <input
//             type="text"
//             {...register('fullName')}
//             className="form-input"
//             placeholder=" "
//           />
//           <label className="forex-input-labels">Full Name</label>
//           <p className="text-red-400 text-sm">{errors.fullName?.message}</p>
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             {...register('contactNumber')}
//             className="form-input"
//             placeholder=" "
//           />
//           <label className="forex-input-labels">Phone No.</label>
//           <p className="text-red-400 text-sm">
//             {errors.contactNumber?.message}
//           </p>
//         </div>
//       </div>

//       <div className="relative">
//         <input
//           type="email"
//           {...register('email')}
//           className="form-input"
//           placeholder=" "
//         />
//         <label className="forex-input-labels">Email</label>
//         <p className="text-red-400 text-sm">{errors.email?.message}</p>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="relative">
//           <input
//             type="date"
//             {...register('checkInDate')}
//             className="form-input"
//           />
//           <label className="forex-input-labels">Check-in Date</label>
//           <p className="text-red-400 text-sm">{errors.checkInDate?.message}</p>
//         </div>

//         <div className="relative">
//           <input
//             type="date"
//             {...register('checkOutDate')}
//             className="form-input"
//           />
//           <label className="forex-input-labels">Check-out Date</label>
//           <p className="text-red-400 text-sm">{errors.checkOutDate?.message}</p>
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="relative">
//           <input
//             type="text"
//             {...register('numberOfNights')}
//             className="form-input"
//             placeholder=" "
//           />
//           <label className="forex-input-labels">Number of Nights</label>
//           <p className="text-red-400 text-sm">
//             {errors.numberOfNights?.message}
//           </p>
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             {...register('numberOfRooms')}
//             className="form-input"
//             placeholder=" "
//           />
//           <label className="forex-input-labels">Number of Rooms</label>
//           <p className="text-red-400 text-sm">
//             {errors.numberOfRooms?.message}
//           </p>
//         </div>
//       </div>

//       <div className="relative">
//         <select {...register('roomType')} className="form-input">
//           <option value="">Select Room Type</option>
//           <option value="Single">Single</option>
//           <option value="Double">Double</option>
//           <option value="Triple">Triple</option>
//           <option value="Quad">Quad</option>
//           <option value="Suite">Suite</option>
//         </select>
//         <label className="forex-input-labels">Room Type</label>
//         <p className="text-red-400 text-sm">{errors.roomType?.message}</p>
//       </div>

//       <div className="relative">
//         <select {...register('mealPlan')} className="form-input">
//           <option value="">Select Meal Plan</option>
//           <option value="Room Only">Room Only</option>
//           <option value="Bed & Breakfast">Bed & Breakfast</option>
//           <option value="Half Board">Half Board</option>
//           <option value="Full Board">Full Board</option>
//         </select>
//         <label className="forex-input-labels">Meal Plan</label>
//         <p className="text-red-400 text-sm">{errors.mealPlan?.message}</p>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="relative">
//           <input
//             type="number"
//             {...register('numberOfAdults')}
//             className="form-input"
//             placeholder=" "
//           />
//           <label className="forex-input-labels">Number of Adults</label>
//           <p className="text-red-400 text-sm">
//             {errors.numberOfAdults?.message}
//           </p>
//         </div>

//         <div className="relative">
//           <input
//             type="number"
//             {...register('numberOfChildren')}
//             className="form-input"
//             placeholder=" "
//           />
//           <label className="forex-input-labels">Number of Children</label>
//           <p className="text-red-400 text-sm">
//             {errors.numberOfChildren?.message}
//           </p>
//         </div>
//       </div>

//       <div className="relative">
//         <textarea
//           {...register('specialRequests')}
//           className="form-input"
//           placeholder=" "
//         />
//         <label className="forex-input-labels">Special Requests</label>
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full py-3 bg-peach text-darkgreen rounded-md"
//       >
//         {isSubmitting ? 'Submitting...' : 'Submit'}
//       </button>
//     </form>
//   );
// };

// export default HotelEnquiryForm;
