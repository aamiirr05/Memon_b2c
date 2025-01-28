import * as yup from 'yup';

const VisaSchema = yup.object().shape({
  visacountry: yup.string().required('Visa Country is required'),
  visatype: yup.string().required('Visa Type is required'),
  description: yup.string().required('Description is required'),
  validity: yup.string().required('Validity is required'),
  processingtime: yup.string().required('Processing Time is required'),
  entry: yup.string().required('Entry is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .required('Price is required')
    .min(1, 'Price must be at least 1'),
  stayperiod: yup
    .number()
    .typeError('Price must be a number')
    .required('Stay Period is required')
    .min(1, 'Price must be at least 1'),
});

export default VisaSchema;
