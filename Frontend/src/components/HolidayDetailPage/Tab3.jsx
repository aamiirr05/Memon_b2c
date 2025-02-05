import { useHolidayStore } from '../../store/useHolidayStore';

const Tab3 = () => {
  const { selectedHoliday } = useHolidayStore();

  const renderItineraryContent = (itineraryData) => {
    console.log(selectedHoliday);
    return (
      <ul className="space-y-4">
        {itineraryData.map((item, index) => (
          <li key={index} className="border-neutral-200 flex gap-4">
            <div className="bg-darkgreen/40 px-8 pt-5 pb-4 rounded-lg flex justify-center items-center flex-col border border-peach">
              <h3 className="text-lg font-semibold text-darkgreen leading-snug font-zodiak">
                Day
              </h3>
              <p className="text-center leading-tight text-lg text-darkgreen font-semibold font-zodiak">
                {index + 1}
              </p>
            </div>
            <div className="bg-peach/60 w-full rounded-lg flex items-center px-4 border border-dashed border-darkgreen">
              <p className="text-darkgreen text-lg sm:text-base font-jakarta">
                {item.itenary}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full mt-8 pb-12">
      <div>{renderItineraryContent(selectedHoliday.itinerary)}</div>
    </div>
  );
};

export default Tab3;
