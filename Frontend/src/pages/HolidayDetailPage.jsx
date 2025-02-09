import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHolidayStore } from '../store/useHolidayStore';
import Loader from '../components/Loader';
import ErrorPage from './ErrorPage';
import ShareButton from '../components/ShareButton';
import BentoGrid from '../components/PackageDetailPage/BentoGrid';
import TabComponent from '../components/HolidayDetailPage/TabComponent';

const HolidayDetailPage = () => {
  const { holidayId } = useParams();
  const {
    holidays,
    selectedHoliday,
    setSelectedHoliday,
    fetchHolidayById,
    isFetching,
  } = useHolidayStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!selectedHoliday || selectedHoliday.package_id !== holidayId) {
      const holiday = holidays.find((h) => h.package_id === holidayId);
      if (holiday) {
        setSelectedHoliday(holiday);
      } else {
        fetchHolidayById(holidayId);
      }
    }
  }, [holidayId, selectedHoliday, holidays, setSelectedHoliday]);

  if (isFetching)
    return (
      <div className="w-screen h-[calc(100dvh-116px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  if (!isFetching && selectedHoliday === null) return <ErrorPage />;

  const pageUrl = window.location.href;
  const pageTitle = selectedHoliday.package_name;

  return (
    <main className="bg-peach/10">
      <section>
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="flex justify-between items-start lg:items-center py-12">
            <h1 className="text-4xl text-darkgreen font-medium flex-1 font-zodiak">
              {selectedHoliday.package_name}
            </h1>
            <ShareButton url={pageUrl} title={pageTitle} />
          </div>
          <BentoGrid images={selectedHoliday.package_images} />
          <TabComponent holiday={selectedHoliday} />
        </div>
      </section>
    </main>
  );
};

export default HolidayDetailPage;
