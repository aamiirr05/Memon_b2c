/* eslint-disable react/prop-types */
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
      className="w-full flex flex-col gap-4 lg:gap-6 mb-4 mt-4 h-full py-4 px-1 pr-3"
    >
      {/* Full Name & Contact Number */}
      <div className=" flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="relative">
          <input
            id="full_name"
            type="text"
            {...register('fullName')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="full_name" className="custom-forex-input-labels">
            Fullname
          </label>
          <p className="text-red-400 text-sm">{errors.fullName?.message}</p>
        </div>

        <div className="relative">
          <input
            id="contact"
            type="text"
            {...register('contactNumber')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="contact" className="custom-forex-input-labels">
            Contact
          </label>
          <p className="text-red-400 text-sm">
            {errors.contactNumber?.message}
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          id="email"
          type="email"
          {...register('email')}
          className="custom-forex-input-fields peer"
          placeholder=""
        />
        <label htmlFor="email" className="custom-forex-input-labels">
          Email
        </label>
        <p className="text-red-400 text-sm">{errors.email?.message}</p>
      </div>

      {/* Check-in & Check-out Dates */}
      <div className="w-full flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="w-full relative">
          <input
            id="checkin_date"
            type="date"
            {...register('checkInDate')}
            className="block w-full text-[0.63rem] sm:text-sm h-[40px] sm:h-[50px] px-4 text-darkgreen  rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
          />
          <label
            htmlFor="checkin_date"
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-xs sm:text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75  leading-tight"
          >
            CheckIn Date
          </label>
          <p className="text-red-400 text-sm">{errors.checkInDate?.message}</p>
        </div>

        <div className="w-full relative">
          <input
            id="checkout_date"
            type="date"
            {...register('checkOutDate')}
            className="block w-full text-[0.63rem] sm:text-sm h-[40px] sm:h-[50px] px-4 text-darkgreen  rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
          />
          <label
            htmlFor="checkout_date"
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-xs sm:text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75  leading-tight"
          >
            CheckOut Date
          </label>
          <p className="text-red-400 text-sm">{errors.checkOutDate?.message}</p>
        </div>
      </div>

      {/* Number of Nights & Rooms */}
      <div className=" flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="relative">
          <input
            id="nights"
            type="text"
            {...register('numberOfNights')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="nights" className="custom-forex-input-labels">
            Total Nights
          </label>
          <p className="text-red-400 text-sm">
            {errors.numberOfNights?.message}
          </p>
        </div>

        <div className="relative">
          <input
            id="rooms"
            type="text"
            {...register('numberOfRooms')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="rooms" className="custom-forex-input-labels">
            Total Rooms
          </label>
          <p className="text-red-400 text-sm">
            {errors.numberOfRooms?.message}
          </p>
        </div>
      </div>

      {/* Room Type & Meal Plan */}
      <div className=" flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="relative w-full">
          <select
            id="select_room_type"
            {...register('roomType')}
            className="block w-full text-sm h-[40px] sm:h-[50px] px-4 text-darkgreen  rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
            <option value="Quad">Quad</option>
            <option value="Suite">Suite</option>
          </select>
          <label
            htmlFor="select_room_type"
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-xs sm:text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75 leading-tight"
          >
            Room Type
          </label>
          <p className="text-red-400 text-sm">{errors.roomType?.message}</p>
        </div>

        <div className="relative w-full">
          <select
            id="meal_plan"
            {...register('mealPlan')}
            className="block w-full text-sm h-[40px] sm:h-[50px] px-4 text-darkgreen rounded-[8px] border border-darkgreen appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-darkgreen focus:ring-0 peer invalid:border-error-500 invalid:focus:border-error-500"
          >
            <option value="">Select</option>
            <option value="Room Only">Room Only</option>
            <option value="Bed & Breakfast">Bed & Breakfast</option>
            <option value="Half Board">Half Board</option>
            <option value="Full Board">Full Board</option>
          </select>
          <label
            htmlFor="meal_plan"
            className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-xs sm:text-md py-1 text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 font-medium left-2 top-1.5 z-10 origin-[0] bg-darkgreen text-peach rounded-full  disabled:bg-gray-50-background- px-4 peer-focus:px-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75 leading-tight"
          >
            Meal Plan
          </label>
          <p className="text-red-400 text-sm">{errors.mealPlan?.message}</p>
        </div>
      </div>

      {/* Number of Adults & Children */}
      <div className=" flex gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <div className="relative">
          <input
            id="adults"
            type="text"
            {...register('numberOfAdults')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="adults" className="custom-forex-input-labels">
            Total Adults
          </label>
          <p className="text-red-400 text-sm">
            {errors.numberOfAdults?.message}
          </p>
        </div>

        <div className="relative">
          <input
            id="children"
            type="text"
            {...register('numberOfChildren')}
            className="custom-forex-input-fields peer"
            placeholder=""
          />
          <label htmlFor="children" className="custom-forex-input-labels">
            Total Children
          </label>
          <p className="text-red-400 text-sm">
            {errors.numberOfChildren?.message}
          </p>
        </div>
      </div>

      {/* Special Requests */}
      <div className="relative">
        <textarea
          id="special_request"
          {...register('specialRequests')}
          className="custom-forex-input-fields peer"
          placeholder=""
        />
        <label htmlFor="special_request" className="custom-forex-input-labels">
          Special Request
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-darkgreen text-peach rounded-md mt-4"
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
