import { useHotelStore } from '../../../store/useHotelStore';

const TermsTab = () => {
  const { selectedHotel } = useHotelStore();

  if (!selectedHotel) return <p>Loading...</p>;

  return (
    <ul>
      {selectedHotel.term_condition?.length ? (
        selectedHotel.term_condition.map((term, index) => (
          <li key={index}>{term}</li>
        ))
      ) : (
        <li>No terms available</li>
      )}
    </ul>
  );
};

export default TermsTab;
