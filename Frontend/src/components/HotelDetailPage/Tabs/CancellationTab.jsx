import { useHotelStore } from '../../../store/useHotelStore';

const CancellationTab = () => {
  const { selectedHotel } = useHotelStore();

  if (!selectedHotel) return <p>Loading...</p>;

  return (
    <ul>
      {selectedHotel.cancellation_policy?.length ? (
        selectedHotel.cancellation_policy.map((policy, index) => (
          <li key={index}>{policy}</li>
        ))
      ) : (
        <li>No cancellation policy available</li>
      )}
    </ul>
  );
};

export default CancellationTab;
