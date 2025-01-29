import { useState } from 'react';

const TabComponent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b gap-12 mt-6 font-jakarta">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 ${
              activeTab === index
                ? 'border-b-2 border-darkgreen text-darkgreen'
                : 'text-neutral-600'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="py-4 ">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabComponent;
