import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDepartureStore } from '../../store/useDepartureStore';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plane,
  Building,
  ArrowRight,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { formatDateStr, calculateDays } from '../DeparturePage/DepartureCard';

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const HomeDepartureWidget = () => {
  const { publicDepartures, isLoading, fetchPublicDepartures } = useDepartureStore();

  useEffect(() => {
    if (!publicDepartures || publicDepartures.length === 0) {
      fetchPublicDepartures();
    }
  }, [fetchPublicDepartures, publicDepartures]);

  // Initial month based on earliest departure or today
  const initialDate = useMemo(() => {
    if (publicDepartures && publicDepartures.length > 0) {
      const first = new Date(publicDepartures[0].departure_date);
      if (!isNaN(first.getTime())) return first;
    }
    return new Date();
  }, [publicDepartures]);

  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [selectedDepId, setSelectedDepId] = useState(null);

  // Sync month when departures load
  useEffect(() => {
    if (publicDepartures && publicDepartures.length > 0) {
      const first = new Date(publicDepartures[0].departure_date);
      if (!isNaN(first.getTime())) {
        setCurrentMonth(first.getMonth());
        setCurrentYear(first.getFullYear());
        setSelectedDepId(publicDepartures[0].id);
      }
    }
  }, [publicDepartures]);

  // Departure date map: YYYY-MM-DD -> array of departures
  const departureMap = useMemo(() => {
    const map = new Map();
    (publicDepartures || []).forEach((dep) => {
      const d = new Date(dep.departure_date);
      if (isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(dep);
    });
    return map;
  }, [publicDepartures]);

  // Calendar cells calculation
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
      const deps = departureMap.get(dateKey) || [];
      cells.push({
        dayNumber: day,
        isCurrentMonth: true,
        dateKey,
        departures: deps,
        hasDeparture: deps.length > 0,
      });
    }

    // Next month padding
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

  // Currently selected departure
  const activeDeparture = useMemo(() => {
    if (!publicDepartures || publicDepartures.length === 0) return null;
    if (selectedDepId) {
      const found = publicDepartures.find((d) => d.id === selectedDepId);
      if (found) return found;
    }
    return publicDepartures[0];
  }, [publicDepartures, selectedDepId]);

  if (!isLoading && (!publicDepartures || publicDepartures.length === 0)) {
    return null;
  }

  const activeDateFormatted = activeDeparture ? formatDateStr(activeDeparture.departure_date) : '';
  const activeReturnFormatted = activeDeparture ? formatDateStr(activeDeparture.return_date) : '';
  const activeDays = activeDeparture ? calculateDays(activeDeparture.departure_date, activeDeparture.return_date) : null;
  const activeFlight = activeDeparture?.flights?.[0];
  const activeWaText = encodeURIComponent(
    `Hi, I saw the ${activeDateFormatted} Umrah departure on your homepage calendar. Please share package details and seat booking.`
  );
  const activeWaUrl = `https://wa.me/918268979705?text=${activeWaText}`;

  return (
    <section className="relative z-20 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-6 md:-mt-10 mb-12">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-darkgreen/20 shadow-2xl p-5 sm:p-8 overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-darkgreen/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach/70 border border-darkgreen/15 text-darkgreen font-semibold text-xs font-jakarta tracking-wide mb-2">
              <Sparkles size={13} className="text-darkgreen" />
              <span>Live Departure Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-zodiak text-darkgreen tracking-tight">
              Upcoming Flight Schedules & Available Seats
            </h2>
            <p className="text-xs sm:text-sm font-jakarta text-stone-600 mt-1">
              Select any highlighted date below to view hotel packages and enquire instantly on WhatsApp.
            </p>
          </div>

          <Link
            to="/umrah-departures"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-jakarta font-semibold text-darkgreen hover:text-mediumgreen transition-colors group self-start md:self-auto"
          >
            <span>View Full Month Calendar</span>
            <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main Content: Mini Calendar (Left) + Selected Departure Detail (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
          {/* ============================================================= */}
          {/* LEFT: MINI INTERACTIVE CALENDAR (7 cols on desktop) */}
          {/* ============================================================= */}
          <div className="lg:col-span-7 bg-peach/20 rounded-2xl border border-darkgreen/15 p-3.5 sm:p-5">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-darkgreen/10">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-darkgreen" />
                <span className="font-zodiak font-bold text-base sm:text-lg text-darkgreen">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-darkgreen/15 shadow-2xs">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg hover:bg-peach/50 text-darkgreen transition-colors"
                  title="Previous Month"
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg hover:bg-peach/50 text-darkgreen transition-colors"
                  title="Next Month"
                  aria-label="Next Month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mt-2.5 text-center">
              {DAYS_OF_WEEK.map((d, i) => (
                <div
                  key={d}
                  className={`text-[10px] sm:text-xs font-semibold py-1 font-jakarta ${
                    i === 0 || i === 5 ? 'text-darkgreen font-bold' : 'text-stone-500'
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Grid Days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mt-1">
              {calendarCells.map((cell, idx) => {
                const hasDep = cell.hasDeparture;
                const isSelected =
                  hasDep && cell.departures.some((d) => d.id === selectedDepId);

                // Total seats calculation
                const totalSeatsLeft = hasDep
                  ? cell.departures[0]?.tiers?.reduce(
                      (sum, t) => sum + (Number(t.available_seats) || 0),
                      0
                    )
                  : 0;

                const isUrgent = totalSeatsLeft > 0 && totalSeatsLeft <= 5;
                const isSoldOut = hasDep && totalSeatsLeft === 0;
                const airlineName = cell.departures?.[0]?.flights?.[0]?.airline || 'Flight';

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (hasDep && cell.departures[0]) {
                        setSelectedDepId(cell.departures[0].id);
                      }
                    }}
                    className={`min-h-[64px] sm:min-h-[74px] p-1 rounded-xl border transition-all flex flex-col justify-between select-none ${
                      !cell.isCurrentMonth
                        ? 'bg-stone-50/40 border-stone-100 text-stone-300 pointer-events-none'
                        : hasDep
                        ? 'bg-white border-darkgreen/30 hover:border-darkgreen hover:shadow-md cursor-pointer hover:scale-[1.02]'
                        : 'bg-white/60 border-stone-100 text-stone-600'
                    } ${
                      isSelected
                        ? 'ring-2 ring-darkgreen border-darkgreen bg-emerald-50 shadow-sm'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] sm:text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center font-jakarta ${
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
                        <Plane size={11} className="text-darkgreen rotate-45 flex-shrink-0" />
                      )}
                    </div>

                    {/* Seats & Airline on the cell */}
                    {hasDep && (
                      <div className="mt-1 flex flex-col gap-0.5">
                        <span className="text-[8px] sm:text-[9px] font-jakarta font-semibold truncate bg-darkgreen/15 text-darkgreen px-1 rounded text-center">
                          {airlineName}
                        </span>
                        <span
                          className={`text-[7px] sm:text-[8px] font-jakarta font-bold px-0.5 rounded text-center truncate ${
                            isSoldOut
                              ? 'bg-stone-200 text-stone-600'
                              : isUrgent
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {isSoldOut ? 'Sold Out' : `${totalSeatsLeft} Left`}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================= */}
          {/* RIGHT: SELECTED DEPARTURE SHOWCASE CARD (5 cols on desktop) */}
          {/* ============================================================= */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-darkgreen/20 p-5 shadow-md flex flex-col justify-between">
            {activeDeparture ? (
              <div className="space-y-4">
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-peach text-darkgreen text-[11px] font-bold font-jakarta">
                      {activeDays ? `${activeDays} Days Group Tour` : 'Umrah Tour'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-jakarta text-stone-500">
                      <MapPin size={12} className="text-stone-400" />
                      From {activeDeparture.departure_city || 'Mumbai'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-zodiak text-darkgreen leading-tight">
                    {activeDateFormatted}
                  </h3>
                  <p className="text-xs text-stone-500 font-jakarta mt-0.5">
                    Return: {activeReturnFormatted}
                  </p>
                </div>

                {/* Flight info banner */}
                <div className="flex items-center justify-between bg-peach/30 border border-darkgreen/15 px-3.5 py-2 rounded-xl text-xs font-jakarta">
                  <div className="flex items-center gap-2 text-darkgreen">
                    <Plane size={15} />
                    <span className="font-bold">{activeFlight?.airline || 'Direct Flight'}</span>
                  </div>
                  {activeFlight?.flight_number && (
                    <span className="bg-white px-2 py-0.5 rounded font-mono font-bold text-[11px] text-stone-700 shadow-2xs">
                      {activeFlight.flight_number}
                    </span>
                  )}
                </div>

                {/* Available Tiers with Hotels */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-jakarta mb-2">
                    Available Packages & Hotels
                  </h4>
                  <div className="space-y-2">
                    {activeDeparture.tiers && activeDeparture.tiers.length > 0 ? (
                      activeDeparture.tiers.slice(0, 2).map((tier) => (
                        <div
                          key={tier.id}
                          className="bg-stone-50 border border-darkgreen/10 rounded-xl p-2.5 text-xs font-jakarta flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold font-zodiak text-darkgreen text-sm">
                              {tier.tier_name}
                            </div>
                            <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                              <Building size={11} className="text-darkgreen" />
                              <span className="truncate">{tier.makkah_hotel || 'Hotel Near Haram'}</span>
                            </div>
                          </div>
                          <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[11px]">
                            {tier.available_seats} {tier.available_seats === 1 ? 'seat' : 'seats'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-stone-400 italic">Hotel packages announced soon.</div>
                    )}
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-2">
                  <a
                    href={activeWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-darkgreen hover:bg-mediumgreen text-peach py-2.5 rounded-xl font-jakarta font-semibold text-xs shadow-md transition-all active:scale-98"
                  >
                    <WhatsappLogo size={18} weight="fill" className="text-emerald-400" />
                    <span>Enquire for {activeDateFormatted} on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-stone-500 font-jakarta">
                Select a departure date from the calendar.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDepartureWidget;
