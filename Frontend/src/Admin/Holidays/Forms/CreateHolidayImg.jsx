/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { AuthContext } from '../../context';
import axiosInstance from '../../../lib/axios';

// const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

// Dropzone Component
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

const CreateHolidayImg = () => {
  // Context States
  const { packageData, setPackageData, updatePackageImages } =
    useContext(AuthContext);
  const {
    // register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [packageImages, setPackageImages] = useState([]);
  const [hotelImages, setHotelImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState(() => {
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

  console.log(previewData);

  const formData = new FormData();

  formData.append('packagename', previewData?.packageDetails.packagename);
  formData.append('packagetype', previewData?.packageDetails.packagetype);
  formData.append('arrivalcity', previewData?.packageDetails.arrivalcity);
  formData.append('departurecity', previewData?.packageDetails.departurecity);
  formData.append('country', previewData?.packageDetails.country);
  formData.append('city', previewData?.packageDetails.city);
  formData.append('description', previewData?.packageDetails.packagedesc);
  formData.append('hotelname', previewData?.packageDetails.hotelname);
  //
  formData.append('isactive', previewData?.packageDetails.isactive);
  formData.append('featured', previewData?.packageDetails.isfeatured);
  formData.append('baseprice', previewData?.packageDetails.baseprice);
  formData.append('discount', previewData?.packageDetails.discount);
  formData.append('transportmode', previewData?.packageDetails.transportmode);
  if (Array.isArray(previewData?.packageDetails.groupDates)) {
    previewData.packageDetails.groupDates.forEach((date, index) => {
      formData.append(`groupdates[${index}]`, date);
    });
  }
  formData.append(
    'bookingdeadline',
    previewData?.packageDetails.bookingdeadline
  );
  //
  formData.append('totaldays', previewData?.packageDetails.totaldays);
  formData.append('totalnights', previewData?.packageDetails.totalnights);

  // Append to FormData as JSON strings

  const itenaries = previewData?.packageDetails.itenaries || '[]';

  itenaries.forEach((item, index) => {
    formData.append(`itinerary[${index}]`, JSON.stringify(item));
  });

  const formattedCancelPolicy = previewData?.packageDetails.cancellationpolicy;

  formattedCancelPolicy.forEach((item, index) => {
    formData.append(`cancellationpolicy[${index}]`, item);
  });

  const inclusion = previewData?.packageDetails.inclusion;

  inclusion.forEach((item, i) => {
    formData.append(`inclusion[${i}]`, item);
  });

  const exclusion = previewData?.packageDetails.exclusion;

  exclusion.forEach((item, index) => {
    formData.append(`exclusion[${index}]`, item);
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

  packageImages.forEach((image, index) => {
    formData.append(`packageimage`, image.file);
  });

  hotelImages.forEach((image, index) => {
    formData.append(`hotelimage`, image.file);
  });

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  //  OnSubmit Form
  const onSubmit = async (data) => {
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
      setLoading(true);
      const res = await axiosInstance.post(
        '/packages/create-holiday-package',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(res);
      toast.dismiss(toastId);

      const resMsg = res.data?.data.message || 'Package Created Successfully';
      console.log(resMsg);
      toast.success(resMsg, { autoClose: 5000 });
      navigate('/admin/holidays/createholiday-preview');
    } catch (error) {
      console.error(error);

      const errorMsg =
        error.response?.data.message ||
        'Something went wrong. Please try again.';
      toast.dismiss(toastId);
      toast.error(errorMsg, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-10/12 mx-auto flex flex-col"
    >
      <Dropzone
        images={packageImages}
        setImages={setPackageImages}
        label="Package Images"
        error={errors.packageImages}
        MAX_FILES={3}
      />
      <Dropzone
        images={hotelImages}
        setImages={setHotelImages}
        label=" Hotel Images"
        error={errors.hotelImages}
        MAX_FILES={8}
      />

      <div className="mt-20 w-full md:w-2/3 mx-auto flex gap-2 lg:gap-10  items-center justify-between md:justify-center">
        <NavLink
          to="/admin/umrahpackages/createpackage-form"
          className="bg-darkgreen w-full p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center text-sm md:text-base"
          onClick={() => {
            localStorage.removeItem('packagedetails');
            setPackageData();
          }}
        >
          Back
        </NavLink>
        <button
          type="submit"
          disabled={loading}
          className="bg-darkgreen w-full p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center text-sm md:text-base"
        >
          {loading ? 'Creating Package...' : 'Create Package'}
        </button>
      </div>
    </form>
  );
};

export default CreateHolidayImg;
