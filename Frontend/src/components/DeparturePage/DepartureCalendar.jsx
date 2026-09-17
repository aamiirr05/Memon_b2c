import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plane, Sparkles } from 'lucide-react';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DepartureCalendar = ({ departures = [], onSelectDate, selectedDate }) => {
  // Determine initial month from earliest departure or today
  const initialDate = useMemo(() => {
    if (departures.length > 0) {
      const first = new Date(departures[0].departure_date);
      if (!isNaN(first.getTime())) return first;
    }
    return new Date();
  }, [departures]);

  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  // Map departure dates for quick lookup: 'YYYY-MM-DD' => array of departures
  const departureMap = useMemo(() => {
    const map = new Map();
    departures.forEach((dep) => {
      const d = new Date(dep.departure_date);
      if (isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(dep);
    });
    return map;
  }, [departures]);

  // Calendar cells computation
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const cells = [];

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        dayNumber: daysInPrevMonth - i,
        isCurrentMonth: false,
        dateKey: null,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const depsOnDate = departureMap.get(dateKey) || [];
      cells.push({
        dayNumber: day,
        isCurrentMonth: true,
        dateKey,
        departures: depsOnDate,
        hasDeparture: depsOnDate.length > 0,
      });
    }

    // Next month padding to fill complete weeks (multiples of 7)
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let day = 1; day <= remaining; day++) {
        cells.push({
          dayNumber: day,
          isCurrentMonth: false,
          dateKey: null,
        });
      }
    }

    return cells;
  }, [currentYear, currentMonth, departureMap]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleDateClick = (cell) => {
    if (!cell.isCurrentMonth || !cell.hasDeparture) return;
    if (onSelectDate) {
      onSelectDate(cell.dateKey, cell.departures);
    }
    // Scroll smoothly to first departure card
    const firstDep = cell.departures[0];
    if (firstDep) {
      const el = document.getElementById(`departure-${firstDep.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Count departures in this month
  const departuresInMonthCount = useMemo(() => {
    return departures.filter((dep) => {
      const d = new Date(dep.departure_date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;
  }, [departures, currentMonth, currentYear]);

  return (
    <div className="bg-white/95 rounded-2xl border border-darkgreen/15 p-6 shadow-md">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-5 border-b border-darkgreen/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl md:text-2xl font-bold font-zodiak text-darkgreen">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
            {departuresInMonthCount > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold font-jakarta">
                <Sparkles size={12} />
                {departuresInMonthCount} {departuresInMonthCount === 1 ? 'Departure' : 'Departures'}
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 font-jakarta mt-0.5">
            Click highlighted dates to jump to departure details
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-1.5 bg-peach/40 p-1 rounded-xl border border-darkgreen/15">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-white text-darkgreen transition-colors"
            title="Previous Month"
            aria-label="Previous Month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-white text-darkgreen transition-colors"
            title="Next Month"
            aria-label="Next Month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mt-4 text-center">
        {DAYS_OF_WEEK.map((day, idx) => (
          <div
            key={day}
            className={`text-xs font-semibold py-2 font-jakarta tracking-wide ${
              idx === 0 || idx === 5 ? 'text-darkgreen font-bold' : 'text-stone-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {calendarCells.map((cell, idx) => {
          const isSelected = selectedDate && cell.dateKey === selectedDate;
          const hasDep = cell.hasDeparture;

          return (
            <div
              key={idx}
              onClick={() => handleDateClick(cell)}
              className={`min-h-[72px] md:min-h-[84px] p-2 rounded-xl border transition-all flex flex-col justify-between select-none ${
                !cell.isCurrentMonth
                  ? 'bg-stone-50/50 border-stone-100 text-stone-300 pointer-events-none'
                  : hasDep
                  ? 'bg-emerald-50/70 border-darkgreen/30 hover:border-darkgreen hover:shadow-md cursor-pointer hover:bg-emerald-100/60'
                  : 'bg-white border-stone-100 text-stone-700'
              } ${isSelected ? 'ring-2 ring-darkgreen border-darkgreen bg-emerald-100' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center font-jakarta ${
                    hasDep
                      ? 'bg-darkgreen text-peach font-bold'
                      : cell.isCurrentMonth
                      ? 'text-stone-700'
                      : 'text-stone-300'
                  }`}
                >
                  {cell.dayNumber}
                </span>

                {hasDep && (
                  <Plane size={13} className="text-darkgreen rotate-45" />
                )}
              </div>

              {/* Departure pills inside the cell */}
              {hasDep && cell.departures && (
                <div className="mt-1 space-y-1">
                  {cell.departures.slice(0, 1).map((dep) => (
                    <div
                      key={dep.id}
                      className="text-[10px] font-jakarta font-semibold truncate px-1.5 py-0.5 rounded bg-darkgreen text-peach"
                    >
                      {dep.flights?.[0]?.airline || 'Departure'}
                    </div>
                  ))}
                  {cell.departures.length > 1 && (
                    <div className="text-[9px] font-semibold text-darkgreen font-jakarta">
                      +{cell.departures.length - 1} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-darkgreen/10 text-xs font-jakarta text-stone-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-darkgreen inline-block" />
          <span>Departure Date (Click to jump)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-50 border border-darkgreen/30 inline-block" />
          <span>Active Booking</span>
        </div>
      </div>
    </div>
  );
};

export default DepartureCalendar;
