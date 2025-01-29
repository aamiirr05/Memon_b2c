import { Handshake } from 'lucide-react';
import { useVisaStore } from '../../store/useVisaStore';

const TnCTab = () => {
  const { selectedVisa } = useVisaStore();
  return (
    <ul className="mt-4 mb-8">
      {selectedVisa.term_condition?.map((term, index) => (
        <li key={index} className="flex items-start gap-4 mb-2">
          <div className="bg-darkgreen/40 text-darkgreen rounded-full p-1 mt-1">
            <Handshake size={16} />
          </div>
          <span className="text-base text-neutral-700">{term}</span>
        </li>
      ))}
    </ul>
  );
};

export default TnCTab;
