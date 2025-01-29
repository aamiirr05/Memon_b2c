import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVisaStore } from '../store/useVisaStore';

import ErrorPage from './ErrorPage';
import ShareButton from '../components/ShareButton';
import TabComponent from '../components/TabComponent';
import Loader from '../components/Loader';

const VisaDetailPage = () => {
  const { visaId } = useParams();
  const { visas, selectedVisa, setSelectedVisa, fetchVisaById, isFetching } =
    useVisaStore();

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  useEffect(() => {
    if (!selectedVisa || selectedVisa.visa_id !== visaId) {
      const visa = visas.find((v) => v.visa_id === visaId);

      if (visa) {
        setSelectedVisa(visa);
      } else {
        fetchVisaById(visaId);
      }
    }
  }, [visaId, selectedVisa, visas, setSelectedVisa]);

  useEffect(() => {
    if (selectedVisa) {
      setSelectedImage(selectedVisa.visa_image[0]?.secure_url);
    }
  }, [selectedVisa]);

  if (isFetching)
    return (
      <div className="w-screen h-[calc(100vh-116px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  if (!isFetching && selectedVisa === null) return <ErrorPage />;

  const pageUrl = window.location.href;
  const pageTitle = selectedVisa.visa_country + ' - ' + selectedVisa.visa_type;

  const tabsData = [
    {
      title: 'Visa Details',
      content: (
        <div className="space-y-4 text-gray-800">
          <div>
            <span className="font-semibold text-darkgreen">Country: </span>
            <span>{selectedVisa.visa_country}</span>
          </div>
          <div>
            <span className="font-semibold text-darkgreen">Visa Type: </span>
            <span>{selectedVisa.visa_type}</span>
          </div>
          <div>
            <span className="font-semibold text-darkgreen">
              Processing Time:{' '}
            </span>
            <span>{selectedVisa.processing_time}</span>
          </div>
          <div>
            <span className="font-semibold text-darkgreen">Validity: </span>
            <span>{selectedVisa.validity}</span>
          </div>
          <div>
            <span className="font-semibold text-darkgreen">Stay Period: </span>
            <span>{selectedVisa.stay_period} days</span>
          </div>
          <div>
            <span className="font-semibold text-darkgreen">Entry Type: </span>
            <span>
              {selectedVisa.entry === '1' ? 'Single Entry' : 'Multiple Entry'}
            </span>
          </div>
          <div>
            <span className="font-semibold text-darkgreen">Price: </span>
            <span className="text-lg font-bold">₹{selectedVisa.price}</span>
          </div>
          <div>
            <span className="font-semibold text-darkgreen">Description: </span>
            <p className="text-sm">
              {selectedVisa.description || 'No description available'}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Requirements',
      content: (
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-darkgreen">
            Basic Requirements:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            {selectedVisa.basic_requirement?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg text-darkgreen mt-4">
            Document Requirements:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            {selectedVisa.document_requirement?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: 'Terms & Conditions',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          {selectedVisa.term_condition?.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Cancellation Policy',
      content: (
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          {selectedVisa.cancellation_policy?.map((policy, index) => (
            <li key={index}>{policy}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <main className="bg-peach/40">
      <section>
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          {/* Title & Share Button */}
          <div className="grid grid-cols-[70%,auto] py-12">
            <h1 className="text-4xl text-darkgreen font-medium flex-1 font-zodiak">
              {selectedVisa.visa_country} - {selectedVisa.visa_type}
            </h1>
            <ShareButton url={pageUrl} title={pageTitle} />
          </div>

          {/* Image Gallery */}
          <div className="my-6 flex flex-col md:flex-row gap-4">
            {/* Large Image */}
            <div className="flex-1 transition-all">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Visa"
                  className="w-full h-[250px] sm:h-[300px] md:h-[500px] object-cover rounded-md shadow-md ring-2 ring-darkgreen"
                />
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex flex-row md:flex-col gap-2 p-1 md:py-0.5 md:px-1.5 overflow-y-auto md:custom-scrollbar max-h-[500px]">
              {selectedVisa.visa_image.map((img) => (
                <img
                  key={img.secure_url}
                  src={img.secure_url}
                  alt="Visa thumbnail"
                  className={`w-48 h-32 object-cover cursor-pointer rounded-md transition-all ${
                    selectedImage === img.secure_url
                      ? 'ring-2 ring-darkgreen'
                      : ''
                  }`}
                  onClick={() => setSelectedImage(img.secure_url)}
                />
              ))}
            </div>
          </div>

          {/* Tabs */}
          <TabComponent tabs={tabsData} />
        </div>
      </section>
    </main>
  );
};

export default VisaDetailPage;
