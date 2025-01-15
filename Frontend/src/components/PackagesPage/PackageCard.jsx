import { Link } from 'react-router-dom';
import { usePackageStore } from '../../store/usePackageStore';

const PackageCard = ({ pkg }) => {
  const { setSelectedPackage } = usePackageStore();
  return (
    <div>
      <div>
        <img
          src={
            'https://b2bzend.s3.ap-south-1.amazonaws.com/img/4539/package/images/ramzan-umrah---early--days_1735719932'
          }
          alt={pkg?.name}
          className="w-28"
        />
      </div>

      <div className="flex gap-4">
        <div>
          <Link
            to={`package-details/${pkg?.id}`}
            onClick={() => setSelectedPackage(pkg)}
          >
            {pkg?.name}
          </Link>
          <p>
            <strong>{pkg?.totalDays}</strong> Days,{' '}
            <strong>{pkg?.totalNights}</strong> Nights
          </p>
          <p>{pkg?.description}</p>
        </div>

        <div>
          <strong>{pkg?.finalPrice}</strong>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
