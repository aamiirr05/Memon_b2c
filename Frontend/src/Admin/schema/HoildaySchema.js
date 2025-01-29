import * as yup from 'yup';

const HolidaySchema = yup.object().shape({
  packagename: yup.string().required('Package Name is required'),
  packagetype: yup.string().required('Package Type is required'),
  description: yup.string().required('Package Description is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  transportmode: yup.string().required('Transport Mode is required'),
  arrivalcity: yup.string().required('Arrival City is required'),
  hotelname: yup.string().required('Hotel Name is required'),
  departurecity: yup.string().required('Departure City is required'),
  bookingdeadline: yup.string().required('Booking Deadline is required.'),
  hotelstar: yup
    .number()
    .typeError('Hotel Star must be a number')
    .required('Hotel Star is required')
    .min(1, 'Hotel Star must be atleast 1')
    .max(5, 'Hotel Star must be atmost 5'),
  totaldays: yup
    .number()
    .typeError('Total Days must be a number')
    .required('Total Days is required')
    .min(1, 'Total Days must be at least 1'),
  baseprice: yup
    .number()
    .typeError('Base Price must be a number')
    .required('Base Price is required')
    .min(1, 'Base Price must be at least 1'),
  discount: yup
    .number()
    .typeError('Discount must be a number')
    .required('Discount is required')
    .min(0, 'Discount should not be less than zero.')
    .max(100, 'Discount should be atmost 100.'),
  totalnights: yup
    .number()
    .typeError('Total Nights must be a number')
    .required('Total Nights is required')
    .min(1, 'Total Nights must be at least 1'),
});

export default HolidaySchema;
