import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDepartureStore } from '../store/useDepartureStore';
import DepartureCalendar from '../components/DeparturePage/DepartureCalendar';
import DepartureCard from '../components/DeparturePage/DepartureCard';
import DepartureSkeleton from '../components/DeparturePage/DepartureSkeleton';
import { Calendar as CalendarIcon, RefreshCw, AlertCircle, Plane, LayoutGrid, List } from 'lucide-react';
import ScrollToTopButton from '../components/ScrollToTopButton';

const DeparturePage = () => {
  const { publicDepartures, isLoading, error, fetchPublicDepartures } = useDepartureStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState('all');
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'cards' on mobile

  useEffect(() => {
    fetchPublicDepartures();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchPublicDepartures]);

  // Distinct cities for filtering
  const departureCities = Array.from(
    new Set(publicDepartures.map((d) => d.departure_city).filter(Boolean))
  );

  // Filtered departures
  const filteredDepartures = publicDepartures.filter((dep) => {
    if (selectedCity === 'all') return true;
    return dep.departure_city?.toLowerCase() === selectedCity.toLowerCase();
  });

  const handleSelectCalendarDate = (dateKey) => {
    setSelectedDate(dateKey);
  };

  return (
    <>
      <Helmet>
        <title>Live Umrah Departure Calendar | Memon Haj Umrah Tours & Travels</title>
        <meta
          name="description"
          content="Live Umrah group departure calendar with real-time seat availability, confirmed flights, and hotel tiers. Book via WhatsApp."
        />
        <meta property="og:title" content="Live Umrah Departure Calendar - Memon Tours" />
        <meta
          property="og:description"
          content="Check live seat availability, direct flights, and package options for upcoming Umrah groups."
        />
      </Helmet>

      <div className="min-h-screen bg-peach/20 pt-24 md:pt-28 pb-20 px-3 sm:px-6 lg:px-8">
        <ScrollToTopButton />

        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach/70 border border-darkgreen/20 text-darkgreen font-jakarta font-semibold text-xs mb-3 shadow-2xs">
              <CalendarIcon size={14} className="text-darkgreen" />
              <span>Live Seat Availability Calendar</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-zodiak text-darkgreen tracking-tight">
              Upcoming Umrah Departures
            </h1>

            <p className="mt-2.5 text-xs sm:text-base font-jakarta text-stone-600 leading-relaxed max-w-2xl mx-auto">
              Direct flights, confirmed dates, and real-time seat status. Check seats left directly on the calendar below.
            </p>

            {/* City Filter Pills */}
            {departureCities.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => setSelectedCity('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-jakarta font-semibold transition-all ${
                    selectedCity === 'all'
                      ? 'bg-darkgreen text-peach shadow-sm'
                      : 'bg-white/80 text-darkgreen border border-darkgreen/20 hover:bg-peach/50'
                  }`}
                >
                  All Cities ({publicDepartures.length})
                </button>
                {departureCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-jakarta font-semibold transition-all ${
                      selectedCity.toLowerCase() === city.toLowerCase()
                        ? 'bg-darkgreen text-peach shadow-sm'
                        : 'bg-white/80 text-darkgreen border border-darkgreen/20 hover:bg-peach/50'
                    }`}
                  >
                    From {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && <DepartureSkeleton />}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
              <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
              <h3 className="font-zodiak font-bold text-lg text-red-800">
                Failed to Load Departures
              </h3>
              <p className="text-xs font-jakarta text-red-600 mt-1 mb-4">
                {error}
              </p>
              <button
                onClick={() => fetchPublicDepartures()}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-darkgreen text-peach text-xs font-jakarta font-semibold hover:bg-mediumgreen transition-colors"
              >
                <RefreshCw size={14} />
                Try Again
              </button>
            </div>
          )}

          {/* Content State */}
          {!isLoading && !error && (
            <>
              {filteredDepartures.length === 0 ? (
                <div className="bg-white/90 rounded-2xl border border-darkgreen/15 p-12 text-center max-w-lg mx-auto shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-peach/60 flex items-center justify-center mx-auto mb-4 text-darkgreen">
                    <Plane size={28} />
                  </div>
                  <h3 className="text-xl font-bold font-zodiak text-darkgreen">
                    No Departures Scheduled
                  </h3>
                  <p className="text-xs font-jakarta text-stone-600 mt-2 mb-6">
                    New group departure dates will be announced shortly. You can also reach out to us for custom dates and private packages.
                  </p>
                  <a
                    href="https://wa.me/918268979705?text=Assalamu%20Alaikum%2C%20I%20am%20interested%20in%20custom%20Umrah%20departure%20dates."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-darkgreen text-peach text-xs font-jakarta font-semibold hover:bg-mediumgreen transition-all shadow-md"
                  >
                    Enquire for Custom Dates
                  </a>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Mobile View Toggle Switch (Shown only on small screens) */}
                  <div className="flex sm:hidden items-center justify-center gap-2 bg-peach/40 p-1 rounded-xl border border-darkgreen/15 max-w-xs mx-auto">
                    <button
                      onClick={() => setViewMode('calendar')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-jakarta font-semibold transition-all ${
                        viewMode === 'calendar'
                          ? 'bg-darkgreen text-peach shadow-xs'
                          : 'text-darkgreen hover:bg-white/50'
                      }`}
                    >
                      <LayoutGrid size={14} />
                      <span>Calendar View</span>
                    </button>
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-jakarta font-semibold transition-all ${
                        viewMode === 'cards'
                          ? 'bg-darkgreen text-peach shadow-xs'
                          : 'text-darkgreen hover:bg-white/50'
                      }`}
                    >
                      <List size={14} />
                      <span>Cards View</span>
                    </button>
                  </div>

                  {/* Calendar View (Always on desktop; on mobile shown when viewMode is 'calendar') */}
                  <div className={viewMode === 'cards' ? 'hidden sm:block' : 'block'}>
                    <DepartureCalendar
                      departures={filteredDepartures}
                      onSelectDate={handleSelectCalendarDate}
                      selectedDate={selectedDate}
                    />
                  </div>

                  {/* Section Title for Cards */}
                  <div className="flex items-center justify-between pt-4 border-t border-darkgreen/10">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-zodiak text-darkgreen">
                        Departure Details & Booking
                      </h2>
                      <p className="text-xs text-stone-500 font-jakarta mt-0.5">
                        Showing {filteredDepartures.length} scheduled {filteredDepartures.length === 1 ? 'tour' : 'tours'} with flight and hotel tiers
                      </p>
                    </div>

                    {selectedDate && (
                      <button
                        onClick={() => setSelectedDate(null)}
                        className="text-xs font-semibold text-darkgreen underline hover:text-mediumgreen font-jakarta"
                      >
                        Show all dates
                      </button>
                    )}
                  </div>

                  {/* Departure Cards List */}
                  <div className="space-y-6">
                    {filteredDepartures.map((departure) => {
                      const d = new Date(departure.departure_date);
                      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                      const isHighlighted = selectedDate === key;

                      return (
                        <DepartureCard
                          key={departure.id}
                          departure={departure}
                          isHighlighted={isHighlighted}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DeparturePage;
