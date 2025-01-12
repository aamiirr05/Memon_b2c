/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { AuthContext } from '../context';
import axiosInstance from '../../lib/axios';

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

const CreatePackageImgs = () => {
  // Context States
  const { packageData, setPackageData, updatePackageImages } =
    useContext(AuthContext);
  const {
    // register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [id, setId] = useState('');
  console.log(id);
  const [packageImages, setPackageImages] = useState([]);
  const [meccaHotelImages, setMeccaHotelImages] = useState([]);
  const [medinaHotelImages, setMedinaHotelImages] = useState([]);
  const [loading, setLoading] = useState(false);
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

  formData.append('packagename', previewData?.packageDetails.packagename);
  formData.append('packagetype', previewData?.packageDetails.packagetype);
  formData.append('arrivalcity', previewData?.packageDetails.arrivalcity);
  formData.append('departurecity', previewData?.packageDetails.departurecity);
  formData.append('description', previewData?.packageDetails.packagedesc);
  //
  formData.append('isactive', previewData?.packageDetails.isactive);
  formData.append('featured', previewData?.packageDetails.isfeatured);
  formData.append('baseprice', previewData?.packageDetails.baseprice);
  formData.append('discount', previewData?.packageDetails.discount);
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
  //
  formData.append('makhotelname', previewData?.packageDetails.meccahotelname);
  formData.append('medhotelname', previewData?.packageDetails.madinahotelname);
  //
  formData.append('quintprice', previewData?.packageDetails.quintprice);
  formData.append('quadprice', previewData?.packageDetails.quadprice);
  formData.append('tripleprice', previewData?.packageDetails.tripleprice);
  formData.append('doubleprice', previewData?.packageDetails.doubleprice);
  formData.append(
    'childwithoutbedprice',
    previewData?.packageDetails.childwithoutbedprice
  );
  formData.append('infantprice', previewData?.packageDetails.infantprice);
  //

  // Append to FormData as JSON strings

  const meccaitenaries = previewData?.packageDetails.meccaitenaries || '[]';

  meccaitenaries.forEach((item, index) => {
    formData.append(`makkahitinerary[${index}]`, JSON.stringify(item));
  });

  const madinaitenaries = previewData?.packageDetails.madinaitenaries;

  madinaitenaries.forEach((item, index) => {
    formData.append(`medinaitinerary[${index}]`, JSON.stringify(item));
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

  meccaHotelImages.forEach((image, index) => {
    formData.append(`makkahhotelimage`, image.file);
  });

  medinaHotelImages.forEach((image, index) => {
    formData.append(`medinahotelimage`, image.file);
  });

  const onSubmit = async (data) => {
    const packageData = {
      ...data,
      packageImages: packageImages.map((item) => ({
        name: item.file.name,
        data: item.preview,
      })),
      meccaHotelImages: meccaHotelImages.map((item) => ({
        name: item.file.name,
        data: item.preview,
      })),
      medinaHotelImages: medinaHotelImages.map((item) => ({
        name: item.file.name,
        data: item.preview,
      })),
    };

    localStorage.setItem('packageimages', JSON.stringify(packageData));
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
        '/packages/create-umrah-package',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(res);

      const extractedId = res.data.data[0].package_id;
      console.log(extractedId);

      setId(extractedId);

      toast.dismiss(toastId);

      const resMsg = res.data?.message || 'Package Created Successfully';
      console.log(resMsg);
      toast.success(resMsg, { autoClose: 5000 });
      navigate(`/admin/umrahpackages/createpackage-preview/${extractedId}`);
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
      className={`w-10/12 mx-auto flex flex-col ${loading ? 'blur-sm' : 'blur-0'}`}
    >
      <Dropzone
        images={packageImages}
        setImages={setPackageImages}
        label="Package Images (3)"
        error={errors.packageImages}
        MAX_FILES={3}
        loading={loading}
      />
      <Dropzone
        images={meccaHotelImages}
        setImages={setMeccaHotelImages}
        label="Mecca Hotel Images (8)"
        error={errors.meccaHotelImages}
        MAX_FILES={8}
        loading={loading}
      />
      <Dropzone
        images={medinaHotelImages}
        setImages={setMedinaHotelImages}
        label="Medina Hotel Images (8)"
        error={errors.medinaHotelImages}
        MAX_FILES={8}
        loading={loading}
      />

      <div className="mt-20 w-full md:w-2/3 mx-auto flex gap-2 lg:gap-10  items-center justify-between md:justify-center">
        <NavLink
          to="/admin/umrahpackages/createpackage-form"
          aria-disabled={loading}
          className="bg-darkgreen w-full p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center text-sm md:text-base"
        >
          Back
        </NavLink>
        <button
          type="submit"
          disabled={loading}
          className={` w-full p-2  rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center text-sm md:text-base ${loading ? 'hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen' : 'bg-darkgreen text-peach'}`}
        >
          {loading ? 'Creating Package...' : 'Create Package'}
        </button>
      </div>
    </form>
  );
};

export default CreatePackageImgs;
