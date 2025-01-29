import { Link } from 'react-router-dom';
import { useVisaStore } from '../../store/useVisaStore';

const VisaCard = ({ visaData }) => {
  const { setSelectedVisa } = useVisaStore();
  const { visa_id, visa_country, visa_type, visa_image, price } = visaData;

  return (
    <div className="max-w-sm rounded overflow-hidden bg-darkgreen/20 m-4">
      <img
        className="w-60 h-36 object-cover"
        src={visa_image[0]?.secure_url}
        alt={visa_country}
      />

      <div className="p-4 rounded-b font-jakarta">
        <div>
          <h2 className="text-xl font-semibold text-darkgreen font-zodiak">
            {visa_type}
          </h2>
          <p className="text-sm text-neutral-600">{visa_country}</p>
        </div>

        <div className="mt-4 text-neutral-700 flex items-center justify-between">
          <p className="font-semibold">
            Price: <span className="text-darkgreen">₹{price}</span>
          </p>

          {/* Button to View Details */}
          <Link
            to={`visa-details/${visa_id}`}
            className=" bg-darkgreen text-peach text-sm px-3 py-2 rounded hover:bg-darkgreen/80 transform transition-all"
            onClick={() => setSelectedVisa(visaData)}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
