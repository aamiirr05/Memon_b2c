/* eslint-disable react/prop-types */
import { CircleX } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      onClick={(e) => e.target.id === 'modal-overlay' && onClose()}
      className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-80 z-50"
    >
      <div className="relative bg-gray-100 p-4 pr-1 rounded-lg shadow-lg w-full mx-4 sm:mx-0 sm:w-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-4 py-2 text-red  text-sm font-semibold rounded-md transition-colors text-darkgreen"
        >
          <CircleX size={32} />
        </button>
        <h2 className="text-md sm:text-xl font-bold mt-10 mb-6  text-center text-darkgreen">
          {title}
        </h2>

        <div className="w-full md:w-[600px]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
