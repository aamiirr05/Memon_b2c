import { useState } from 'react';

const Tab4 = () => {
  const [activeTab, setActiveTab] = useState('makkah');

  return (
    <div className="w-full mt-8 pb-12">
      {/* Tab Headers */}
      <div className="flex gap-4 sm:gap-8 border-b border-darkgreen/10 mb-8">
        <button
          className={`py-2 text-[15px] font-medium ${
            activeTab === 'makkah'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('makkah')}
        >
          🕋 Makkah Hotel
        </button>
        <button
          className={`py-2 text-[15px] font-medium ${
            activeTab === 'medina'
              ? 'border-b-2 border-darkgreen text-darkgreen'
              : 'text-neutral-600'
          }`}
          onClick={() => setActiveTab('medina')}
        >
          🌙 Medina Hotel
        </button>
      </div>
    </div>
  );
};

export default Tab4;
