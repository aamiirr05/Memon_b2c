import { useState } from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import Tab5 from './Tab5';
import Tab6 from './Tab6';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabNames = [
    'Overview',
    'Inclusion-Exclusion',
    'Itinerary',
    'Hotel Details',
    'Policies',
    'FAQs',
  ];

  return (
    <div className="w-full max-w-7xl mx-auto mt-6">
      {/* Tab Titles */}
      <div className="flex font-jakarta justify-between gap-10 border-b border-darkgreen/10 overflow-x-scroll md:overflow-auto p-2 md:p-0">
        {tabNames.map((tabName, index) => (
          <button
            key={index}
            className={` py-2 text-md tracking-tight text-nowrap ${
              activeTab === index + 1
                ? 'border-b-2 border-darkgreen text-darkgreen font-bold'
                : 'text-neutral-500 hover:text-darkgreen'
            } transition-colors duration-300`}
            onClick={() => handleTabClick(index + 1)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        <div className="transition-all duration-500 ease-in-out">
          {activeTab === 1 && <Tab1 />}
          {activeTab === 2 && <Tab2 />}
          {activeTab === 3 && <Tab3 />}
          {activeTab === 4 && <Tab4 />}
          {activeTab === 5 && <Tab5 />}
          {activeTab === 6 && <Tab6 />}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
