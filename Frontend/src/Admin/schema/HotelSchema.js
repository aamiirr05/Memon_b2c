import * as yup from 'yup';
const HotelSchema = yup.object().shape({
  hotelname: yup.string().required('Hotel Name is required'),
  hotelcity: yup.string().required('Hotel City is required'),
  hotelcountry: yup.string().required('Hotel Country is required'),
  hoteldescription: yup.string().required('Hotel Description is required'),
  hoteldistance: yup.string().required('Hotel Distance is required'),
  star: yup.string().required('Star is required'),

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
});

export default HotelSchema;
