import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDepartureStore } from '../../store/useDepartureStore';
import { formatDateStr, calculateDays, getStatusBadge } from '../DeparturePage/DepartureCard';
import { Calendar, Plane, ArrowRight, MapPin, Building } from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';

const UpcomingDepartures = () => {
  const { publicDepartures, isLoading, fetchPublicDepartures } = useDepartureStore();

  useEffect(() => {
    if (!publicDepartures || publicDepartures.length === 0) {
      fetchPublicDepartures();
    }
  }, [fetchPublicDepartures, publicDepartures]);

  // Display only next 4 upcoming published departures
  const nextDepartures = (publicDepartures || []).slice(0, 4);

  if (!isLoading && nextDepartures.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-peach/15 border-y border-darkgreen/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach/70 border border-darkgreen/15 text-darkgreen font-semibold text-xs font-jakarta tracking-wide mb-2">
              <Calendar size={13} className="text-darkgreen" />
              <span>Fixed Group Schedules</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-zodiak text-darkgreen">
              Upcoming Live Departures
            </h2>
            <p className="text-xs sm:text-sm font-jakarta text-stone-600 mt-1">
              Confirmed dates with direct flights, hotels near Haram, and instant WhatsApp booking.
            </p>
          </div>

          <Link
            to="/umrah-departures"
            className="inline-flex items-center gap-2 text-darkgreen hover:text-mediumgreen font-jakarta font-semibold text-sm transition-colors group self-start md:self-auto"
          >
            <span>View All Departures</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Departure Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isLoading && nextDepartures.length === 0 ? (
            [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-darkgreen/10 shadow-sm animate-pulse space-y-4"
              >
                <div className="h-6 w-28 bg-darkgreen/10 rounded" />
                <div className="h-4 w-36 bg-darkgreen/10 rounded" />
                <div className="h-20 bg-darkgreen/5 rounded-xl" />
                <div className="h-9 w-full bg-darkgreen/15 rounded-full" />
              </div>
            ))
          ) : (
            nextDepartures.map((dep) => {
              const depDate = formatDateStr(dep.departure_date);
              const retDate = formatDateStr(dep.return_date);
              const days = calculateDays(dep.departure_date, dep.return_date);
              const firstFlight = dep.flights?.[0];
              const waText = encodeURIComponent(
                `Hi, I'm interested in the ${depDate} Umrah departure. Please share more details.`
              );
              const waUrl = `https://wa.me/918268979705?text=${waText}`;

              return (
                <div
                  key={dep.id}
                  className="bg-white/95 rounded-2xl border border-darkgreen/15 hover:border-darkgreen/40 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Date Pill & Days */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-lg bg-darkgreen text-peach text-xs font-bold font-jakarta">
                        {depDate.split(' ').slice(0, 2).join(' ')}
                      </span>
                      {days && (
                        <span className="text-[11px] font-semibold font-jakarta text-stone-500 bg-peach/40 px-2 py-0.5 rounded-full">
                          {days} Days
                        </span>
                      )}
                    </div>

                    {/* Date Range Full */}
                    <h3 className="font-zodiak font-bold text-base text-darkgreen line-clamp-1">
                      {depDate}
                    </h3>
                    <p className="text-[11px] font-jakarta text-stone-500 mb-3">
                      Return: {retDate}
                    </p>

                    {/* Flight & City */}
                    <div className="space-y-1.5 py-2.5 border-y border-darkgreen/10 text-xs font-jakarta">
                      {firstFlight ? (
                        <div className="flex items-center gap-1.5 text-stone-700">
                          <Plane size={13} className="text-darkgreen" />
                          <span className="font-semibold truncate">{firstFlight.airline}</span>
                          <span className="text-stone-500 font-mono text-[11px]">
                            ({firstFlight.flight_number})
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-stone-500">
                          <Plane size={13} className="text-darkgreen" />
                          <span>Flight details TBA</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-stone-600">
                        <MapPin size={13} className="text-stone-400" />
                        <span>From {dep.departure_city || 'Mumbai'}</span>
                      </div>
                    </div>

                    {/* Tiers Preview */}
                    <div className="mt-3 space-y-1.5">
                      {dep.tiers && dep.tiers.length > 0 ? (
                        dep.tiers.slice(0, 2).map((tier) => {
                          const status = getStatusBadge(tier.seat_status);
                          return (
                            <div
                              key={tier.id}
                              className="flex items-center justify-between text-[11px] font-jakarta bg-peach/25 px-2.5 py-1 rounded-lg"
                            >
                              <span className="font-semibold text-darkgreen truncate mr-1">
                                {tier.tier_name}
                              </span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${status.badge}`}>
                                {tier.seat_status}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-[11px] text-stone-400 font-jakarta">
                          Tiers coming soon
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Quick Action */}
                  <div className="mt-5 pt-3 border-t border-darkgreen/10">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-darkgreen/10 hover:bg-darkgreen text-darkgreen hover:text-peach text-xs font-semibold font-jakarta transition-all"
                    >
                      <WhatsappLogo size={16} weight="fill" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* View All Button on mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/umrah-departures"
            className="inline-flex items-center gap-2 bg-darkgreen text-peach px-6 py-2.5 rounded-full font-jakarta font-semibold text-xs shadow-md"
          >
            <span>View All Scheduled Departures</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDepartures;
