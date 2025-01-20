import { usePackageStore } from '../../store/usePackageStore';
import { Check, X } from 'lucide-react';

const Tab2 = () => {
  const { selectedPackage } = usePackageStore();
  return (
    <div className="pb-12">
      <h2 className="text-2xl font-medium text-neutral-700 mb-4">
        Inclusion / Exclusion
      </h2>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl text-darkgreen font-semibold mb-4">
            Exclusions
          </h2>
          <ul>
            {selectedPackage.inclusion.map((inc, index) => (
              <li key={index} className="flex items-center gap-4 mb-1">
                <div className="bg-darkgreen/40 text-darkgreen rounded-full p-0.5">
                  <Check size={16} />
                </div>
                <span className="text-lg text-neutral-700">{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* exclusion */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-2xl text-darkgreen font-semibold mb-4">
            Exclusions
          </h2>
          <ul>
            {selectedPackage.exclusion.map((inc, index) => (
              <li key={index} className="flex items-center gap-4 mb-1">
                <div className="bg-darkgreen/40 text-darkgreen rounded-full p-0.5">
                  <X size={16} />
                </div>
                <span className="text-lg text-neutral-700">{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tab2;
