import { X } from 'lucide-react';
import { useVisaStore } from '../../store/useVisaStore';

const CancellationTab = () => {
  const { selectedVisa } = useVisaStore();
  return (
    <ul className="mt-4 mb-8">
      {selectedVisa.cancellation_policy?.map((policy, index) => (
        <li key={index} className="flex items-start gap-4 mb-2">
          <div className="bg-darkgreen/40 text-darkgreen rounded-full p-1 mt-1">
            <X size={16} />
          </div>
          <span className="text-base text-neutral-700">{policy}</span>
        </li>
      ))}
    </ul>
  );
};

export default CancellationTab;
