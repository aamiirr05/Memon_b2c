import { useState } from 'react';

const Tab6 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-8 pb-12">
      <h2 className="text-2xl font-bold text-darkgreen mb-6 font-zodiak">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 font-jakarta">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-dashed border-darkgreen p-4 rounded-lg shadow-sm bg-peach/60 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between gap-2">
              <h3 className="font-semibold md:text-lg text-darkgreen">
                {faq.question}
              </h3>
              <span className="text-xl text-darkgreen mt-[-3px] font-medium">
                {openIndex === index ? '−' : '+'}
              </span>
            </div>
            <p
              className={`text-neutral-800 tracking-tight  pr-4 transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? 'max-h-screen opacity-100 mt-2'
                  : 'max-h-0 opacity-0'
              }`}
              style={{
                overflow: 'hidden',
                maxHeight: openIndex === index ? '500px' : '0',
              }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const faqs = [
  {
    question: 'What amenities are available at the Makkah Hotel?',
    answer:
      'The Makkah Hotel offers luxurious rooms, free Wi-Fi, 24/7 room service, and close proximity to the Haram.',
  },
  {
    question: 'Is parking available at the Medina Hotel?',
    answer:
      'Yes, free parking is available for all guests staying at the Medina Hotel.',
  },
  {
    question: 'Are meals included in the hotel packages?',
    answer:
      'Some packages include meals. Please check your booking details for more information.',
  },
  {
    question: 'What is the check-in and check-out time?',
    answer: 'Check-in starts at 3 PM, and check-out is at 12 PM.',
  },
];

export default Tab6;
