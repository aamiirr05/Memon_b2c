const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      onClick={(e) => e.target.id === 'modal-overlay' && onClose()}
      className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-80 z-50"
    >
      <div className="bg-darkgreen p-4 pr-1 rounded-lg shadow-lg w-full mx-4 sm:mx-0 sm:w-auto">
        <h2 className="text-xl font-bold mt-4 mb-6 text-center text-peach">
          {title} Enquiry
        </h2>
        <div className="w-full md:w-[600px]">{children}</div>
        <div className="flex justify-end mt-6 px-4 pb-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white border text-sm font-semibold rounded-md transition-colors bg-red-500 hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
