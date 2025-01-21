import { useEffect } from 'react';

import { useHotelStore } from '../store/useHotelStore';

const HotelDetailPage = () => {
  const { selectedHotel } = useHotelStore();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(selectedHotel, null, 2)}</pre>
    </div>
  );
};

export default HotelDetailPage;
