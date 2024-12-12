import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CircleX } from 'lucide-react';

const DragAndDrop = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleSuccess = (val) => {
    toast.success(val, {
      duration: 4000,
      style: { textAlign: 'center' },
    });
  };
  const handleError = (val) => {
    toast.error(val, {
      duration: 4000,
    });
  };

  const MAX_FILES = 5;
  const MAX_FILE_SIZE_MB = 10485760;
  const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFileProcessing(droppedFiles);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    handleFileProcessing(selectedFiles);
  };

  const handleFileProcessing = (selectedFiles) => {
    const validFiles = selectedFiles.filter((file) =>
      file.size > MAX_FILE_SIZE_MB
        ? handleError('File size should not exceed upto 10MB')
        : ACCEPTED_FILE_TYPES.includes(file.type) &&
          file.size <= MAX_FILE_SIZE_MB
    );

    if (files.length + validFiles.length > MAX_FILES) {
      handleError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);

    const newPreviews = validFiles.map((file) => {
      handleSuccess(`${file.name} Added Successfully`);
      return URL.createObjectURL(file);
    });

    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    handleSuccess('Image Removed Successfully.');
  };

  const preventDefault = (event) => event.preventDefault();

  useEffect(() => {
    return () => {
      // Revoke object URLs to avoid memory leaks
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      className="drag-and-drop-container border-darkgreen w-full lg:w-2/3"
      style={{
        border: '2px dashed',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        // width: '100%',
        // maxWidth: '500px',
        margin: 'auto',
      }}
    >
      <p className="my-3 font-jakarta">
        Drag and drop files here, or click to select files
      </p>
      <input
        type="file"
        multiple
        onChange={handleFileSelect}
        accept=".jpeg,.jpg,.png"
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="text-[#001A6E] font-zodiak hover:underline"
        style={{ cursor: 'pointer' }}
      >
        Browse Files
      </label>

      {files.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {/* <h4>Selected Files:</h4> */}
          <ul>
            {files.map((file, index) => (
              <li
                key={index}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                {/* {file.name} */}
                {/* <button
                  onClick={() => handleRemoveFile(index)}
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none',
                  }}
                >
                  Remove
                </button> */}
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {previews.map((preview, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '100px',
                }}
              >
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  className="opacity-80"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="bg-red-600 text-white"
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',

                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircleX />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
