import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plane, Sparkles, Share2 } from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import toast from 'react-hot-toast';

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

  // Auto-sync calendar month and year when departures finish loading from API
  useEffect(() => {
    if (departures && departures.length > 0) {
      const validDep = departures.find((d) => !isNaN(new Date(d.departure_date).getTime())) || departures[0];
      if (validDep) {
        const d = new Date(validDep.departure_date);
        if (!isNaN(d.getTime())) {
          setCurrentMonth(d.getMonth());
          setCurrentYear(d.getFullYear());
        }
      }
    }
  }, [departures]);

  // If a specific date is selected, navigate calendar to that month/year
  useEffect(() => {
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length >= 2) {
        const y = Number(parts[0]);
        const m = Number(parts[1]) - 1;
        if (!isNaN(y) && !isNaN(m)) {
          setCurrentYear(y);
          setCurrentMonth(m);
        }
      }
    }
  }, [selectedDate]);

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

  // Quick Share Link function
  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.origin + '/umrah-departures';
      navigator.clipboard.writeText(url);
      toast.success('Calendar link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white/95 rounded-2xl border border-darkgreen/15 p-4 sm:p-6 shadow-md">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-darkgreen/10 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl md:text-2xl font-bold font-zodiak text-darkgreen">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
            {departuresInMonthCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold font-jakarta">
                <Sparkles size={12} />
                {departuresInMonthCount} {departuresInMonthCount === 1 ? 'Tour' : 'Tours'}
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 font-jakarta mt-0.5">
            Confirmed flight dates with live seats pending. Click date for details.
          </p>
        </div>

        {/* Month Navigation & Share */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* WhatsApp Share Button */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Check upcoming Umrah Departure Dates and live seat availability on Memon Haj Umrah Tours: ${
                typeof window !== 'undefined' ? window.location.origin + '/umrah-departures' : ''
              }`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold font-jakarta shadow-2xs transition-colors"
            title="Share Calendar on WhatsApp"
          >
            <WhatsappLogo size={16} weight="fill" />
            <span className="hidden sm:inline">Share Calendar</span>
          </a>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyShareLink}
            className="p-2 rounded-xl border border-darkgreen/20 hover:bg-peach/40 text-darkgreen transition-colors"
            title="Copy Calendar Link"
            aria-label="Copy Calendar Link"
          >
            <Share2 size={16} />
          </button>

          {/* Month Arrows */}
          <div className="flex items-center gap-1 bg-peach/40 p-1 rounded-xl border border-darkgreen/15">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-white text-darkgreen transition-colors"
              title="Previous Month"
              aria-label="Previous Month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-white text-darkgreen transition-colors"
              title="Next Month"
              aria-label="Next Month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-3 text-center">
        {DAYS_OF_WEEK.map((day, idx) => (
          <div
            key={day}
            className={`text-[11px] sm:text-xs font-semibold py-1.5 font-jakarta tracking-wide ${
              idx === 0 || idx === 5 ? 'text-darkgreen font-bold' : 'text-stone-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-1">
        {calendarCells.map((cell, idx) => {
          const isSelected = selectedDate && cell.dateKey === selectedDate;
          const hasDep = cell.hasDeparture;

          return (
            <div
              key={idx}
              onClick={() => handleDateClick(cell)}
              className={`min-h-[82px] sm:min-h-[100px] md:min-h-[110px] p-1.5 sm:p-2 rounded-xl border transition-all flex flex-col justify-between select-none ${
                !cell.isCurrentMonth
                  ? 'bg-stone-50/50 border-stone-100 text-stone-300 pointer-events-none'
                  : hasDep
                  ? cell.departures?.[0]?.status === 'departed'
                    ? 'bg-stone-100/80 border-stone-300 hover:border-stone-500 cursor-pointer hover:bg-stone-200/70 hover:scale-[1.01]'
                    : cell.departures?.[0]?.status === 'full'
                    ? 'bg-rose-50/80 border-rose-200 hover:border-rose-400 cursor-pointer hover:bg-rose-100/70 hover:scale-[1.01]'
                    : cell.departures?.[0]?.status === 'new_group'
                    ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-300 hover:border-amber-500 cursor-pointer hover:bg-amber-100/70 hover:scale-[1.01]'
                    : 'bg-emerald-50/60 border-darkgreen/30 hover:border-darkgreen hover:shadow-md cursor-pointer hover:bg-emerald-100/50 hover:scale-[1.01]'
                  : 'bg-white border-stone-100 text-stone-700'
              } ${isSelected ? 'ring-2 ring-darkgreen border-darkgreen bg-emerald-100 shadow-sm' : ''}`}
            >
              {/* Top row in cell: Date Number + Status Icon */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] sm:text-xs font-semibold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-jakarta ${
                    hasDep
                      ? cell.departures?.[0]?.status === 'departed'
                        ? 'bg-stone-600 text-white font-bold'
                        : cell.departures?.[0]?.status === 'full'
                        ? 'bg-rose-600 text-white font-bold'
                        : cell.departures?.[0]?.status === 'new_group'
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-darkgreen text-peach font-bold'
                      : cell.isCurrentMonth
                      ? 'text-stone-700'
                      : 'text-stone-300'
                  }`}
                >
                  {cell.dayNumber}
                </span>

                {hasDep && (
                  <Plane
                    size={13}
                    className={`rotate-45 flex-shrink-0 ${
                      cell.departures?.[0]?.status === 'departed'
                        ? 'text-stone-500'
                        : cell.departures?.[0]?.status === 'full'
                        ? 'text-rose-500'
                        : cell.departures?.[0]?.status === 'new_group'
                        ? 'text-amber-600'
                        : 'text-darkgreen'
                    }`}
                  />
                )}
              </div>

              {/* Middle & Bottom: Airline Name + SEATS / STATUS BADGE */}
              {hasDep && cell.departures && (
                <div className="mt-1 flex flex-col gap-1 w-full">
                  {cell.departures.slice(0, 1).map((dep) => {
                    const totalAvailable = (dep.tiers || []).reduce(
                      (sum, t) => sum + (Number(t.available_seats) || 0),
                      0
                    );
                    const isDeparted = dep.status === 'departed';
                    const isFull = dep.status === 'full' || (!isDeparted && totalAvailable === 0);
                    const isNewGroup = dep.status === 'new_group';
                    const isUrgent = totalAvailable > 0 && totalAvailable <= 5;
                    const isLimited = totalAvailable > 5 && totalAvailable <= 15;
                    const airlineName = dep.flights?.[0]?.airline || 'Tour';

                    return (
                      <div key={dep.id} className="flex flex-col gap-0.5">
                        {/* New Group highlight tag */}
                        {isNewGroup && (
                          <div className="text-[7px] sm:text-[8px] font-jakarta font-bold px-1 py-0.2 rounded bg-amber-200 text-amber-900 text-center uppercase tracking-wider flex items-center justify-center gap-0.5 shadow-2xs">
                            <Sparkles size={8} className="text-amber-700" />
                            <span>New</span>
                          </div>
                        )}

                        {/* Airline Pill */}
                        <div
                          className={`text-[9px] sm:text-[10px] md:text-xs font-jakarta font-semibold truncate px-1.5 py-0.5 rounded text-center shadow-2xs ${
                            isDeparted
                              ? 'bg-stone-500 text-white'
                              : isFull
                              ? 'bg-rose-700 text-white'
                              : isNewGroup
                              ? 'bg-darkgreen text-peach'
                              : 'bg-darkgreen text-peach'
                          }`}
                        >
                          {airlineName}
                        </div>

                        {/* Status / Seats Left Badge */}
                        {isDeparted ? (
                          <div className="text-[8px] sm:text-[9px] font-jakarta font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 text-center bg-stone-200 text-stone-700 border border-stone-300 shadow-2xs">
                            <span>✈ Departed</span>
                          </div>
                        ) : isFull ? (
                          <div className="text-[8px] sm:text-[9px] font-jakarta font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 text-center bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs">
                            <span>⛔ Full</span>
                          </div>
                        ) : (
                          <div
                            className={`text-[8px] sm:text-[9px] md:text-[10px] font-jakarta font-bold px-1 py-0.5 rounded flex items-center justify-center gap-1 text-center shadow-2xs ${
                              isUrgent
                                ? 'bg-rose-500 text-white animate-pulse'
                                : isLimited
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 hidden sm:inline-block" />
                            <span className="truncate">
                              {totalAvailable} {totalAvailable === 1 ? 'Seat' : 'Seats'} Left
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {cell.departures.length > 1 && (
                    <div className="text-[8px] sm:text-[9px] font-bold text-darkgreen font-jakarta text-center">
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
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-darkgreen/10 text-[11px] sm:text-xs font-jakarta text-stone-600">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-900 font-bold text-[10px]">
              ✨ New
            </span>
            <span>New Group</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Seats Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-rose-100 border border-rose-300 text-rose-800 font-bold text-[10px]">
              ⛔ Full
            </span>
            <span>Full / Closed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-stone-200 border border-stone-300 text-stone-700 font-bold text-[10px]">
              ✈ Departed
            </span>
            <span>Completed Tour</span>
          </div>
        </div>

        <span className="text-[11px] text-stone-400 font-medium">
          Click any date to view hotels & package info
        </span>
      </div>
    </div>
  );
};

export default DepartureCalendar;
