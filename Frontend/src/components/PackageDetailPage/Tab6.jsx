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
  { question: 'What is included in the Umrah package?', answer: 'Our Umrah packages typically include flight tickets, visa assistance, accommodation, airport transfers, and a guided tour of the holy sites in Makkah and Madinah. Meals and other services may vary depending on the package.' },
  { question: 'How long does it take to process an Umrah visa?', answer: 'It usually takes 1-2 working days to process the Umrah visa after all required documents are submitted. However, processing time can vary depending on the embassy.' },
  { question: 'What documents are required to apply for an Umrah visa?', answer: 'You will need a valid passport (with at least 6 months validity), a recent passport-sized photograph, a copy of your national ID (for Saudi nationals), and a confirmed flight booking. Additional documents may be required depending on the package.' },
  { question: 'Is the Umrah visa refundable?', answer: 'Once the Umrah visa is applied, the fee is non-refundable. If your visa application is rejected, the visa fee will not be refunded.' },
  { question: 'Do I need to be vaccinated to perform Umrah?', answer: 'Yes, vaccination requirements may vary depending on the Saudi government\'s health regulations. Typically, a valid vaccination certificate for Meningitis and COVID-19 is required.' },
  { question: 'Can I change my travel dates after booking?', answer: 'Changes to your travel dates may be possible depending on the package and availability. Please contact us at least 15 days before your travel date to discuss any changes.' },
  { question: 'Can I travel with children on the Umrah package?', answer: 'Yes, children are allowed on the Umrah package. However, different airlines and hotels may have specific policies for minors, so please check with us for further details.' },
  { question: 'What are the payment terms for the Umrah package?', answer: 'A 100% advance payment per person is required to confirm your booking. Please note that all payments must be made before the visa application is processed.' },
  { question: 'Is it possible to book a group Umrah package?', answer: 'Yes, we offer group Umrah packages. You can book for a group of family members, friends, or organizations. Special discounts may apply for large groups.' },
  { question: 'What if my Umrah visa is rejected?', answer: 'In case your Umrah visa is rejected, the visa fees are non-refundable. We advise checking all documents and eligibility requirements before applying.' }
];



export default Tab6;
