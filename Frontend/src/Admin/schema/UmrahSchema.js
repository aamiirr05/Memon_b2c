import * as yup from 'yup';

const umrahSchema = yup.object().shape({
  packagename: yup.string().required('Package Name is required'),
  packagetype: yup.string().required('Package Type is required'),
  packagedesc: yup.string().required('Package Description is required'),
  arrivalcity: yup.string().required('Arrival City is required'),
  departurecity: yup.string().required('Departure City is required'),
  meccahotelname: yup.string().required('Makkah Hotel Name is required'),
  madinahotelname: yup.string().required('Madina Hotel Name is required'),
  bookingdeadline: yup.string().required('Booking Deadline is required.'),
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

  doubleprice: yup
    .number()
    .typeError('Double Price must be a number')
    .required('Double Price is required')
    .min(0, 'Double Price must be at least 0'),
  tripleprice: yup
    .number()
    .typeError('Triple Price must be a number')
    .required('Triple Price is required')
    .min(0, 'Triple Price must be at least 0'),
  quintprice: yup
    .number()
    .typeError('Quint Price must be a number')
    .required('Quint Price is required')
    .min(0, 'Quint Price must be at least 0'),
  quadprice: yup
    .number()
    .typeError('Quad Price must be a number')
    .required('Quad Price is required')
    .min(0, 'Quad Price must be at least 0'),
  childwithoutbedprice: yup
    .number()
    .typeError('Child Without Bed must be a number')
    .required('Child Without Bed is required')
    .min(0, 'Child Without Bed must be at least 0'),
  infantprice: yup
    .number()
    .typeError('Infant Price must be a number')
    .required('Infant Price is required')
    .min(0, 'Infant Price must be at least 0'),
});

export default umrahSchema;
