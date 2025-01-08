/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ChevronDown, Plus, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';
import useFormData from '../../../custom hooks/customhooks';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import axiosInstance from '../../../components/axios/AxiosInstance';

const schema = yup.object().shape({
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

const MAX_FILE_SIZE_MB = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};
const Dropzone = ({ images, setImages, label, error, MAX_FILES }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleFileDrop(acceptedFiles),
    accept: ACCEPTED_FILE_TYPES,
    multiple: true,
  });

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length + images.length > MAX_FILES) {
      toast.error(`You can upload upto ${MAX_FILES} files.`);
      return;
    }

    const validFiles = acceptedFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE_MB) {
        toast.error('File size should not exceed 10MB');
        return false;
      }
      if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
        toast.error(`${file.name} is not a supported file type.`);
        return false;
      }
      return true;
    });

    const previews = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previews]);
    validFiles.forEach((file) =>
      toast.success(`${file.name} added successfully`)
    );
  };

  const handleRemoveFile = (index) => {
    const updatedImages = [...images];
    const [removed] = updatedImages.splice(index, 1);
    URL.revokeObjectURL(removed.preview);
    setImages(updatedImages);
    toast.success('Image removed successfully');
  };

  return (
    <div className="w-full h-full">
      <label className="ml-5 mt-20 font-zodiak text-lg">{label}</label>
      <div
        {...getRootProps({
          className:
            'drag-and-drop-container border-darkgreen w-full lg:w-2/3 mx-auto p-5 border-2 border-dashed rounded-md text-center cursor-pointer mt-10 mb-20',
        })}
      >
        <input {...getInputProps()} />
        <p className="my-3 font-jakarta">
          Drag and drop files here, or click to select files
        </p>
        {images.length > 0 && (
          <div className="flex flex-wrap mt-10 gap-4">
            {images.map(({ preview }, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-md overflow-hidden"
              >
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm ml-5">Please upload valid images.</p>
      )}
    </div>
  );
};

const CreateVisaForm = () => {
  const [image, setImage] = useState([]);
  const [docReq, setdocReq] = useState(['']);
  const [basicReq, setBasicReq] = useState(['']);
  const [bookingterms, setBookingTerms] = useState(['']);
  const [cancelpolicy, setCancelPolicy] = useState(['']);
  const [termcondition, setTermCondition] = useState(['']);
  const [isloading, setIsLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // Context States
  const { packageData, updatePackageData } = useContext(AuthContext);

  // useForm

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      documentrequirements: docReq,
      basicrequirement: basicReq,
      cancellationpolicy: cancelpolicy,
      bookingterms: bookingterms,
      termcondition: termcondition,
    },
  });

  // Functions for handling inclusions and exclusions

  const addDocReq = () => {
    setdocReq([...docReq, '']);
  };

  const handleDocReq = (val, index) => {
    const updatedDocReq = [...docReq];
    updatedDocReq[index] = val;
    setdocReq(updatedDocReq);
  };

  const removeDocReq = (index) => {
    const updatedDocReq = docReq.filter((_, i) => i !== index);
    setdocReq(updatedDocReq);
  };
  const addBasicReq = () => {
    setBasicReq([...basicReq, '']);
  };

  const handleBasicReq = (val, index) => {
    const updatedBasicReq = [...basicReq];
    updatedBasicReq[index] = val;
    setBasicReq(updatedBasicReq);
  };

  const removeBasicReq = (index) => {
    const updatedBasicReq = basicReq.filter((_, i) => i !== index);
    setBasicReq(updatedBasicReq);
  };

  //  Functions for booking terms

  const addBookingTerms = () => {
    setBookingTerms([...bookingterms, '']);
  };

  const handleBookingTerms = (val, index) => {
    const updatedTerms = [...bookingterms];
    updatedTerms[index] = val;
    setBookingTerms(updatedTerms);
  };

  const removeBookingTerms = (index) => {
    const updatedTerms = bookingterms.filter((_, i) => i !== index);
    setBookingTerms(updatedTerms);
  };

  // Functions for termcondition and cancellation policy

  const addTermsCondition = () => {
    setTermCondition([...termcondition, '']);
  };
  const addPolicy = () => {
    setCancelPolicy([...cancelpolicy, '']);
  };

  const handleTermsCondition = (val, index) => {
    const updatedTerms = [...termcondition];
    updatedTerms[index] = val;
    setTermCondition(updatedTerms);
  };

  const handlePolicy = (val, index) => {
    const updatedPolicy = [...cancelpolicy];
    updatedPolicy[index] = val;
    setCancelPolicy(updatedPolicy);
  };

  const removeTerms = (index) => {
    const updatedTerms = termcondition.filter((_, i) => i !== index);
    setTermCondition(updatedTerms);
  };

  const removePolicy = (index) => {
    const updatedPolicy = cancelpolicy.filter((_, i) => i !== index);
    setCancelPolicy(updatedPolicy);
  };

  //
  // Functions for form submission
  const onFormSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append('visacountry', data.visacountry);
    formData.append('visatype', data.visatype);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stayperiod', data.stayperiod);
    formData.append('validity', data.validity);
    formData.append('processingtime', data.processingtime);
    formData.append('entry', data.entry);
    docReq.forEach((item, index) => {
      formData.append(`documentrequirement[${index}]`, item);
    }),
      basicReq.forEach((item, index) => {
        formData.append(`basicrequirement[${index}]`, item);
      });

    termcondition.forEach((item, index) => {
      formData.append(`termcondition[${index}]`, item);
    });

    bookingterms.forEach((item, index) => {
      formData.append(`bookingterms[${index}]`, item);
    });

    cancelpolicy.forEach((item, index) => {
      formData.append(`cancellationpolicy[${index}]`, item);
    });

    image.forEach((item) => {
      formData.append('visaimage', item.file);
    });

    const toastId = toast.loading(
      'Creating package. This may take some time...',
      {
        icon: (
          <div className="relative w-10 h-10">
            <div className="absolute w-5 h-5 border-4 top-0 animate-spin mx-4 border-peach border-l-darkgreen rounded-full"></div>
          </div>
        ),
        className: 'text-center flex item-center',
      }
    );

    try {
      setIsLoading(true);
      const res = await axiosInstance.post('/visa/create-visa', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(res);
      toast.dismiss(toastId);
      const resMsg = res.data?.message;
      console.log(resMsg);
      toast.success(resMsg, { autoClose: 5000 });
    } catch (error) {
      console.log(error);
      const errorMsg =
        error.response?.data.message ||
        'Something went wrong. Please try again.';
      toast.dismiss(toastId);
      toast.error(errorMsg, { autoClose: 5000 });
    } finally {
      setIsLoading(false);
    }

    navigate('/admin/visa');
    reset();
  };

  return (
    <>
      <form
        action=""
        className="w-full h-full"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <h1 className="text-3xl font-zodiak mb-5 pl-2">Create Visa Form</h1>

        <div className="w-full bg-peach bg-opacity-20 mb-10 shadow-md rounded-xl p-5 md:p-10">
          <Dropzone
            images={image}
            setImages={setImage}
            label="Visa Image"
            error={errors.image}
            MAX_FILES={1}
          />
        </div>
        {/* Section One */}
        <div className="w-full bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row items-center w-full">
            {/* Visa Country */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="visacountry" className="custom-label">
                Visa Country
              </label>
              <input
                type="text"
                name="visacountry"
                id="visacountry"
                className="custom-input"
                placeholder="Enter Visa Country"
                {...register('visacountry')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.visacountry?.message}
              </span>
            </div>
            {/* Visa Type */}
            <div className="flex gap-3 w-full flex-col">
              <label htmlFor="visatype" className="custom-label">
                Visa Type
              </label>
              <input
                type="text"
                name="visatype"
                id="visatype"
                className="custom-input"
                placeholder="Enter Visa Type"
                {...register('visatype')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.visatype?.message}
              </span>
            </div>
          </div>
          {/* Textbox for desc */}

          <div className="flex mt-5 gap-3 w-full flex-col">
            <label htmlFor="packagetype" className="custom-label">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="40"
              rows="5"
              className="w-full custom-input"
              placeholder="Enter Description"
              {...register('description')}
            ></textarea>
            <span className="text-sm text-red-600 my-2">
              {errors?.description?.message}
            </span>
          </div>

          {/*  Price and Validity */}
          <div className="flex mt-5 flex-col gap-5 lg:flex-row items-center w-full">
            {/*  Price */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="price" className="custom-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                min={0}
                className="custom-input"
                placeholder="Enter Price"
                {...register('price')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.price?.message}
              </span>
            </div>
            {/* Stay Period */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="stayperiod" className="custom-label">
                Stay Period
              </label>
              <input
                type="number"
                name="stayperiod"
                id="stayperiod"
                min={0}
                className="custom-input"
                placeholder="Enter Stay Period"
                {...register('stayperiod')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.stayperiod?.message}
              </span>
            </div>
            {/* Validity */}
            <div className="flex gap-3 w-full flex-col">
              <label htmlFor="validity" className="custom-label">
                Validity
              </label>
              <input
                type="text"
                name="validity"
                id="validity"
                min="0"
                className="custom-input"
                placeholder="Enter Visa Validity"
                {...register('validity')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.validity?.message}
              </span>
            </div>
          </div>

          {/* Processing Time and Entry */}

          <div className="flex flex-col gap-5 md:flex-row items-center w-full">
            {/* Processing Time */}
            <div className="flex gap-3  w-full flex-col">
              <label htmlFor="visacountry" className="custom-label">
                Processing Time
              </label>
              <input
                type="text"
                name="processingtime"
                id="processingtime"
                className="custom-input"
                placeholder="Enter Processing Time"
                {...register('processingtime')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.processingtime?.message}
              </span>
            </div>
            {/* Entry */}
            <div className="flex gap-3 w-full flex-col">
              <label htmlFor="entry" className="custom-label">
                Entry
              </label>
              <input
                type="text"
                name="entry"
                id="entry"
                className="custom-input"
                placeholder="Enter Entry"
                {...register('entry')}
              />
              <span className="text-sm text-red-600 my-2">
                {errors?.entry?.message}
              </span>
            </div>
          </div>
        </div>

        {/* document req  & basic req  , terms , policy , conditions...... */}

        <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <label htmlFor="documentrequirement" className="custom-label">
            Document Requirements
          </label>
          <div className="flex flex-wrap mt-10 md:mt-5 justify-start w-full">
            {docReq.map((val, index) => {
              return (
                <div className="w-full relative" key={index}>
                  <input
                    type="text"
                    name=""
                    value={val}
                    onChange={(e) => handleDocReq(e.target.value, index)}
                    id="documentrequirement"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Document Requirement ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removeDocReq(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="absolute top-0 md:top-3 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
            onClick={addDocReq}
          >
            <Plus />
            Add Document Req
          </div>
        </div>

        {/* Basic Req */}
        <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <label htmlFor="basicrequirement" className="custom-label">
            Basic Requirements
          </label>
          <div className="flex flex-wrap mt-5 justify-start w-full">
            {basicReq.map((val, index) => {
              return (
                <div className="w-full relative" key={index}>
                  <input
                    type="text"
                    name="basicrequirement"
                    value={val}
                    onChange={(e) => handleBasicReq(e.target.value, index)}
                    id="basicrequirement"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Basic Requirement ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removeBasicReq(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="absolute top-0 md:top-3 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
            onClick={addBasicReq}
          >
            <Plus />
            Add Basic Req
          </div>
        </div>

        {/* Booking Terms  */}
        <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <label htmlFor="bookingterms" className="custom-label">
            Booking Terms
          </label>
          <div className="flex flex-wrap mt-16 md:mt-5 justify-start w-full">
            {bookingterms.map((val, index) => {
              return (
                <div className="w-full relative" key={index}>
                  <input
                    type="text"
                    name="bookingterms"
                    value={val}
                    onChange={(e) => handleBookingTerms(e.target.value, index)}
                    id="bookingterms"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Booking Term ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removeBookingTerms(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="absolute top-8 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
            onClick={addBookingTerms}
          >
            <Plus />
            Add Booking Terms
          </div>
        </div>

        {/* Terms & Condition  */}
        <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <label htmlFor="termcondition" className="custom-label">
            Terms & Condition
          </label>
          <div className="flex flex-wrap mt-16 md:mt-5 justify-start w-full">
            {termcondition.map((val, index) => {
              return (
                <div className="w-full relative" key={index}>
                  <input
                    type="text"
                    name="termcondition"
                    value={val}
                    onChange={(e) =>
                      handleTermsCondition(e.target.value, index)
                    }
                    id="termcondition"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Term & Condition ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removeTerms(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="absolute top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
            onClick={addTermsCondition}
          >
            <Plus />
            Add Terms & Condition
          </div>
        </div>

        {/* Cancellation Policy  */}
        <div className="relative w-full my-10 bg-peach bg-opacity-20 shadow-md rounded-xl p-5 md:p-10">
          <label htmlFor="cancellationpolicy" className="custom-label">
            Cancellation Policy
          </label>
          <div className="flex flex-wrap mt-16 md:mt-5 justify-start w-full">
            {cancelpolicy.map((val, index) => {
              return (
                <div className="w-full relative" key={index}>
                  <input
                    type="text"
                    name="cancellationpolicy"
                    value={val}
                    onChange={(e) => handlePolicy(e.target.value, index)}
                    id="bookingterms"
                    className="w-10/12 mb-5 custom-input"
                    placeholder={`Cancellation Policy ${index + 1}`}
                    required={index > 0}
                  />
                  {index === 0 ? null : (
                    <X
                      className="absolute top-[10px] right-0 md:right-10 lg:right-20 xl:right-36 cursor-pointer"
                      onClick={() => removePolicy(index)}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="absolute top-10 md:top-4 right-8 flex items-center justify-center gap-2 mt-5 cursor-pointer"
            onClick={addPolicy}
          >
            <Plus />
            Add Cancellation Policy
          </div>
        </div>

        {/*  */}

        {/* Form Buttons  */}

        <div className="mt-10 w-full lg:w-2/3 mx-auto flex gap-5 lg:gap-60 items-center justify-center">
          <NavLink
            to="/admin/holidays"
            className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          >
            Back
          </NavLink>
          <button
            type="submit"
            className=" bg-darkgreen w-full lg:w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          >
            Create Visa
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateVisaForm;
