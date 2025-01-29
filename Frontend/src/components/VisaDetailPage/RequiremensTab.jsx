import { useVisaStore } from '../../store/useVisaStore';
import { Check, StickyNote } from 'lucide-react';

const RequirementsTab = () => {
  const { selectedVisa } = useVisaStore();
  return (
    <div className="pb-12">
      <div className="flex flex-col md:flex-row gap-2 mt-4">
        {/* Basic Requirements */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-medium font-zodiak text-neutral-700 mb-4">
            Basic Requirements
          </h2>
          <ul>
            {selectedVisa.basic_requirement?.map((req, index) => (
              <li
                key={index}
                className="flex items-start gap-4 font-jakarta mt-2"
              >
                <div className="bg-darkgreen/40 text-darkgreen rounded-full p-0.5 mt-1">
                  <Check size={16} />
                </div>
                <span className="text-md text-neutral-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Document Requirements */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-2xl font-medium font-zodiak text-neutral-700 mb-4">
            Document Requirements
          </h2>
          <ul>
            {selectedVisa.document_requirement?.map((req, index) => (
              <li
                key={index}
                className="flex items-start gap-4 font-jakarta mt-2"
              >
                <div className="bg-darkgreen/40 text-darkgreen rounded-full p-0.5 mt-1">
                  <StickyNote size={16} />
                </div>
                <span className="text-md text-neutral-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequirementsTab;
