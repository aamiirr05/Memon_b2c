import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVisaStore } from '../store/useVisaStore';

import ErrorPage from './ErrorPage';
import TabComponent from '../components/TabComponent';
import Loader from '../components/Loader';

import RequiremensTab from '../components/VisaDetailPage/RequiremensTab';
import VisaDetailsTab from '../components/VisaDetailPage/VisaDetailsTab';
import TnCTab from '../components/VisaDetailPage/TnCTab';
import CancellationTab from '../components/VisaDetailPage/CancellationTab';
import { IdCard } from 'lucide-react';

const VisaDetailPage = () => {
  const { visaId } = useParams();
  const { visas, selectedVisa, setSelectedVisa, fetchVisaById, isFetching } =
    useVisaStore();

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

  if (isFetching)
    return (
      <div className="w-screen h-[calc(100vh-116px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  if (!isFetching && selectedVisa === null) return <ErrorPage />;

  const tabsData = [
    {
      title: 'Visa Details',
      content: <VisaDetailsTab />,
    },
    {
      title: 'Requirements',
      content: <RequiremensTab />,
    },
    {
      title: 'Terms & Conditions',
      content: <TnCTab />,
    },
    {
      title: 'Cancellation Policy',
      content: <CancellationTab />,
    },
  ];

  return (
    <main className="bg-peach/10 font-jakarta">
      <section>
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          {/* Title */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 pt-12">
            {/* Large Image */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-darkgreen mb-4 inline-flex items-center gap-4">
              {selectedVisa.visa_country}
              <IdCard className="size-10 sm:size-16 md:size-20 -mb-1 sm:-mb-2" />
            </h1>
            {/* <img src={selectedImage} alt="visa-image" className="w-96" /> */}
          </div>

          {/* Tabs */}
          <TabComponent tabs={tabsData} />
        </div>
      </section>
    </main>
  );
};

export default VisaDetailPage;
