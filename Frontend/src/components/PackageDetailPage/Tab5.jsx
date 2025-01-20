import { useState } from 'react';
import { usePackageStore } from '../../store/usePackageStore';
import { Check, Handshake, X } from 'lucide-react';

const Tab5 = () => {
  const [activeTab, setActiveTab] = useState('term_condition'); // Default tab
  const { selectedPackage } = usePackageStore();

  const renderContent = () => {
    const content = selectedPackage[activeTab] || [];
    return (
      <ul className="text-neutral-700">
        {content.map((item, index) => (
          <li key={index} className="flex items-start gap-4 mb-2">
            <div className="bg-darkgreen/40 text-darkgreen rounded-full p-1 mt-1">
              {activeTab === 'term_condition' && <Handshake size={16} />}
              {activeTab === 'booking_terms' && <Check size={16} />}
              {activeTab === 'cancellation_policy' && <X size={16} />}
            </div>
            <span className="text-lg text-neutral-700 tracking-tight">
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full mt-8 pb-12">
      {/* Tab Headers */}
      <div className="flex gap-4 sm:gap-8 border-b border-darkgreen/10 mb-4">
        <button
          className={`py-2 text-sm font-medium ${
            activeTab === 'term_condition'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('term_condition')}
        >
          Terms & Conditions
        </button>
        <button
          className={`py-2 text-sm font-medium ${
            activeTab === 'booking_terms'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('booking_terms')}
        >
          Booking Terms
        </button>
        <button
          className={`py-2 text-sm font-medium ${
            activeTab === 'cancellation_policy'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('cancellation_policy')}
        >
          Cancellation Policy
        </button>
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default Tab5;
