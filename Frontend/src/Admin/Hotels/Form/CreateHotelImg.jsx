/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import axiosInstance from '../../../lib/axios';
import useHotelStore from '../../store/Hotels/useHotelStore';

// const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

// Dropzone Component
const Dropzone = ({ images, setImages, label, error, MAX_FILES, loading }) => {
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
    <div
      className={`w-full h-full ${loading ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
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

const CreateHotelImg = () => {
  const {
    // register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [hotelImages, setHotelImages] = useState([]);
  const { refreshPackages } = useOutletContext();
  const { isCreating, setIsCreating } = useHotelStore();
  const navigate = useNavigate();
  const [previewData] = useState(() => {
    const safeParseJSON = (item) => {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item; // If it's already an object or null
      }
    };

    const packageImage =
      safeParseJSON(localStorage.getItem('packageimages')) || {};
    const packageDetails =
      safeParseJSON(localStorage.getItem('packagedetails')) || {};

    return { packageImage, packageDetails };
  });

  // Appending all the data to form Data

  const formData = new FormData();

  formData.append('hotelname', previewData?.packageDetails.hotelname);
  formData.append('hotelcity', previewData?.packageDetails.hotelcity);
  formData.append('hotelcountry', previewData?.packageDetails.hotelcountry);
  formData.append('hotelcategory', previewData?.packageDetails.hotelcategory);
  formData.append('hotellocation', previewData?.packageDetails.hotellocation);
  formData.append('mealbasis', previewData?.packageDetails.mealbasis);
  formData.append(
    'hoteldescription',
    previewData?.packageDetails.hoteldescription
  );
  //
  formData.append('isactive', previewData?.packageDetails.isactive);
  formData.append('featured', previewData?.packageDetails.isfeatured);
  //
  formData.append('star', previewData?.packageDetails.star);
  formData.append('hoteldistance', previewData?.packageDetails.hoteldistance);
  //
  formData.append('quintprice', previewData?.packageDetails.quintprice);
  formData.append('quadprice', previewData?.packageDetails.quadprice);
  formData.append('tripleprice', previewData?.packageDetails.tripleprice);
  formData.append('doubleprice', previewData?.packageDetails.doubleprice);

  const amenities = previewData?.packageDetails.amenities;

  amenities.forEach((item, index) => {
    formData.append(`amenities[${index}]`, item);
  });

  const formattedCancelPolicy = previewData?.packageDetails.cancellationpolicy;

  formattedCancelPolicy.forEach((item, index) => {
    formData.append(`cancellationpolicy[${index}]`, item);
  });

  const termcondition = previewData?.packageDetails.termcondition;

  termcondition.forEach((item, index) => {
    formData.append(`termcondition[${index}]`, item);
  });

  const bookingterms = previewData?.packageDetails.bookingterms;

  bookingterms.forEach((item, index) => {
    formData.append(`bookingterms[${index}]`, item);
  });

  // Package Images

  hotelImages.forEach((image, index) => {
    formData.append(`hotelimage`, image.file);
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading(
      'Creating Hotel. This may take some time...',
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
      setIsCreating(true);
      const res = await axiosInstance.post(
        'admin/hotel/create-hotel',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(res);
      toast.dismiss(toastId);

      const resMsg = res.data?.message || 'Hotel Added Successfully';
      console.log(resMsg);
      const extractedId = res.data?.data[0].hotel_id;
      console.log(extractedId);
      toast.success(resMsg, { autoClose: 5000 });
      refreshPackages();
      navigate(`/admin/hotel/createhotel-preview/${extractedId}`);
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data.message ||
        'Something went wrong. Please try again.';
      toast.dismiss(toastId);
      toast.error(errorMsg, { autoClose: 5000 });
    } finally {
      setIsCreating(false);
      refreshPackages();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-10/12 mx-auto flex flex-col ${isCreating ? 'blur-sm' : 'blur-0'}`}
    >
      <Dropzone
        images={hotelImages}
        setImages={setHotelImages}
        label="Hotel Images (5)"
        error={errors.hotelImages}
        MAX_FILES={5}
        loading={isCreating}
      />

      <div className="mt-20 w-full md:w-2/3 mx-auto flex gap-2 lg:gap-10  items-center justify-between md:justify-center">
        <NavLink
          to="/admin/umrahpackages/createpackage-form"
          aria-disabled={isCreating}
          className="bg-darkgreen w-full p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center text-sm md:text-base"
        >
          Back
        </NavLink>
        <button
          type="submit"
          disabled={isCreating}
          className={` w-full p-2  rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center text-sm md:text-base ${isCreating ? 'hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen' : 'bg-darkgreen text-peach'}`}
        >
          {isCreating ? 'Creating Hotel...' : 'Create Hotel'}
        </button>
      </div>
    </form>
  );
};

export default CreateHotelImg;
