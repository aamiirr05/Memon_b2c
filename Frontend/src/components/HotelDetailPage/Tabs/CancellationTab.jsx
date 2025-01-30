import { X } from 'lucide-react';
import { useHotelStore } from '../../../store/useHotelStore';

const CancellationTab = () => {
  const { selectedHotel } = useHotelStore();

  return (
    <ul className="mt-4">
      {selectedHotel.cancellation_policy?.length ? (
        selectedHotel.cancellation_policy.map((policy, index) => (
          <li key={index} className="flex items-start gap-4 mb-2">
            <div className="bg-darkgreen/40 text-darkgreen rounded-full p-1 mt-1">
              <X size={16} />
            </div>
            <span className="text-base text-neutral-700">{policy}</span>
          </li>
        ))
      ) : (
        <li>No cancellation policy available</li>
      )}
    </ul>
  );
};

export default CancellationTab;
