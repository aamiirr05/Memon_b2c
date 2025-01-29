import { Link } from 'react-router-dom';
import { useVisaStore } from '../../store/useVisaStore';
import {
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  IndianRupee,
  BadgeIndianRupee,
} from 'lucide-react';

const VisaCard = ({ visaData }) => {
  const { setSelectedVisa } = useVisaStore();
  const {
    visa_id,
    visa_country,
    visa_type,
    visa_image,
    price,
    processing_time,
    validity,
    stay_period,
  } = visaData;

  return (
    <div className="w-80 bg-darkgreen/20 rounded-2xl shadow-lg overflow-hidden m-4 transform transition-all hover:ring-1 ring-darkgreen hover:shadow-xl">
      <img
        className="w-full h-40 object-cover"
        src={visa_image[0]?.secure_url}
        alt={visa_country}
      />

      <div className="p-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-darkgreen">{visa_type}</h2>
          <p className="text-sm text-neutral-600 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-darkgreen" /> {visa_country}
          </p>
        </div>

        <div className="space-y-1 text-sm text-neutral-700">
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-darkgreen" />{' '}
            <span className="font-medium">Processing Time:</span>{' '}
            {processing_time}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-darkgreen" />{' '}
            <span className="font-medium">Validity:</span> {validity}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-darkgreen" />{' '}
            <span className="font-medium">Stay Period:</span> {stay_period}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-semibold text-neutral-700 flex items-center gap-1">
            <BadgeIndianRupee className="w-4 h-4 text-darkgreen" />
            <span className="text-darkgreen">₹{price}</span>
          </p>

          <Link
            to={`visa-details/${visa_id}`}
            className="bg-darkgreen text-peach text-sm px-4 py-2 rounded-lg hover:bg-darkgreen/80 transition"
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
