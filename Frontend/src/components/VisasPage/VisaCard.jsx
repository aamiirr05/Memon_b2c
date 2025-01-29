const VisaCard = ({ visaData }) => {
  const { visa_country, visa_type, visa_image, price } = visaData;

  return (
    <div className="max-w-sm rounded overflow-hidden bg-darkgreen/20 m-4">
      <img
        className="w-60 h-36 object-cover"
        src={visa_image[0]?.secure_url}
        alt={visa_country}
      />

      <div className="p-4 border-l border-r border-b border-darkgreen rounded-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{visa_type}</h2>
          <p className="text-sm text-neutral-600">{visa_country}</p>
        </div>

        <div className="mt-4 text-neutral-800 flex items-center justify-between">
          <p className="font-semibold">
            Price: <span className="text-darkgreen">₹{price}</span>
          </p>

          {/* Button to View Details */}
          <button
            className=" bg-darkgreen text-peach text-sm px-3 py-2 rounded hover:bg-darkgreen/90 transform transition-all"
            onClick={() =>
              alert('View details functionality will be implemented later!')
            }
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
