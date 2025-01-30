import { Handshake } from 'lucide-react';
import { useHotelStore } from '../../../store/useHotelStore';

const TermsTab = () => {
  const { selectedHotel } = useHotelStore();

  return (
    <ul>
      {selectedHotel.term_condition?.length ? (
        selectedHotel.term_condition.map((term, index) => (
          <li key={index} className="flex items-start gap-4 mb-2">
            <div className="bg-darkgreen/40 text-darkgreen rounded-full p-1 mt-1">
              <Handshake size={16} />
            </div>
            <span className="text-base text-neutral-700">{term}</span>
          </li>
        ))
      ) : (
        <li>No terms available</li>
      )}
    </ul>
  );
};

export default TermsTab;
