import { useState } from 'react';

const TabComponent = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex font-jakarta  gap-10 border-b border-darkgreen/10 overflow-x-scroll md:overflow-auto p-2 md:p-0 mt-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 text-md tracking-tight text-nowrap ${
              activeTab === index
                ? 'border-b-2 border-darkgreen text-darkgreen font-bold'
                : 'text-neutral-500 hover:text-darkgreen'
            } transition-colors duration-300`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="py-4 font-jakarta">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabComponent;
