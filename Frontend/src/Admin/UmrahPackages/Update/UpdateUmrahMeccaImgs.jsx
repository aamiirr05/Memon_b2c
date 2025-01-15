/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import axiosInstance from '../../../lib/axios';
import { useForm } from 'react-hook-form';

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
const UpdateUmrahMeccaImgs = () => {
  const { umrahPackage, refreshPackages } = useOutletContext();
  const [packageImages, setPackageImages] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateid } = useParams();
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    if (umrahPackage?.mak_hotel_images) {
      const UpdateprevImages = umrahPackage.mak_hotel_images.map((image) => {
        return image.secure_url;
      });
      setPrevImages(UpdateprevImages);
    }
  }, [umrahPackage]);

  console.log(prevImages);

  if (!umrahPackage) {
    return <Loader />;
  }

  const onFormSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      packageImages.forEach((image) => {
        if (image.file) {
          formData.append('packageimage', image.file);
        }
      });

      const res = await axiosInstance.put(
        `/admin/packages/update-umrah-makhotel-image/${updateid}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(res);
      refreshPackages();
      toast.success('Package updated successfully!');
    } catch (error) {
      console.error(error);
      const errMsg = error?.response?.data.message || 'An error occurred.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <h1 className=" mb-10 font-zodiak text-lg text-darkgreen">
        Previous Images
      </h1>
      <div className="w-full mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-10 mb-10">
        {prevImages.map((images, i) => {
          return (
            <img
              src={images}
              className="w-2/3 md:w-1/4 lg:w-1/5 rounded-lg shadow-lg"
              alt=""
              key={i}
            />
          );
        })}
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <Dropzone
            images={packageImages}
            setImages={setPackageImages}
            label="Package Images (5)"
            MAX_FILES={5}
            loading={loading}
          />
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full lg:w-1/2 xl:w-1/3 p-2 rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center text-sm md:text-base ${
              loading
                ? 'text-darkgreen border bg-peach border-darkgreen cursor-not-allowed'
                : 'bg-darkgreen text-peach'
            }`}
          >
            {loading ? 'Updating Image...' : 'Update Image'}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateUmrahMeccaImgs;
