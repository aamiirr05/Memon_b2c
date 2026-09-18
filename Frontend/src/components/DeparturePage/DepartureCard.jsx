import { Plane, Calendar, MapPin, Building, CheckCircle2, AlertTriangle, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { WhatsappLogo } from '@phosphor-icons/react';

// Format date helper: "06 Sep 2026"
export const formatDateStr = (dateVal) => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

// Calculate total days
export const calculateDays = (start, end) => {
  if (!start || !end) return null;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 1;
};

// Seat status styling
export const getStatusBadge = (status) => {
  switch (status) {
    case 'Available':
      return {
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dot: 'bg-emerald-500',
        label: 'Available',
      };
    case 'Limited':
      return {
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        dot: 'bg-amber-500',
        label: 'Limited Seats',
      };
    case 'Few Seats Left':
      return {
        badge: 'bg-rose-100 text-rose-800 border-rose-300',
        dot: 'bg-rose-500 animate-pulse',
        label: 'Few Seats Left',
      };
    case 'Sold Out':
    default:
      return {
        badge: 'bg-stone-200 text-stone-600 border-stone-300',
        dot: 'bg-stone-400',
        label: 'Sold Out',
      };
  }
};

const DepartureCard = ({ departure, isHighlighted = false }) => {
  if (!departure) return null;

  const depDateFormatted = formatDateStr(departure.departure_date);
  const retDateFormatted = formatDateStr(departure.return_date);
  const daysCount = calculateDays(departure.departure_date, departure.return_date);

  const isDeparted = departure.status === 'departed';
  const totalAvailable = (departure.tiers || []).reduce(
    (sum, t) => sum + (Number(t.available_seats) || 0),
    0
  );
  const isFull =
    departure.status === 'full' || (!isDeparted && (departure.tiers || []).length > 0 && totalAvailable === 0);
  const isNewGroup = departure.status === 'new_group';

  // Smart WhatsApp query text & CTA button label
  let waText = `Hi, I'm interested in the ${depDateFormatted} Umrah departure. Please share more details.`;
  let ctaLabel = 'Enquire on WhatsApp';
  let ctaBtnBg = 'bg-darkgreen hover:bg-mediumgreen text-peach';

  if (isDeparted) {
    waText = `Assalamu Alaikum, I saw your past departure for ${depDateFormatted} on your website. Please let me know when your next upcoming Umrah group tour is scheduled.`;
    ctaLabel = 'Enquire for Next Similar Tour';
    ctaBtnBg = 'bg-stone-800 hover:bg-stone-900 text-white';
  } else if (isFull) {
    waText = `Assalamu Alaikum, I saw the ${depDateFormatted} Umrah departure is currently full. Please add me to the priority waitlist if any seat opens up.`;
    ctaLabel = 'Join Waitlist on WhatsApp';
    ctaBtnBg = 'bg-rose-700 hover:bg-rose-800 text-white';
  } else if (isNewGroup) {
    waText = `Hi, I am interested in booking the new Umrah group departure on ${depDateFormatted}. Please share details.`;
    ctaLabel = 'Book New Group on WhatsApp';
    ctaBtnBg = 'bg-darkgreen hover:bg-mediumgreen text-peach';
  }

  const waUrl = `https://wa.me/918268979705?text=${encodeURIComponent(waText)}`;

  return (
    <div
      id={`departure-${departure.id}`}
      className={`relative bg-white/95 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-xl p-6 overflow-hidden ${
        isHighlighted
          ? 'border-darkgreen ring-2 ring-darkgreen/30 bg-emerald-50/30'
          : isDeparted
          ? 'border-stone-200 bg-stone-50/60'
          : isFull
          ? 'border-rose-200 bg-rose-50/20'
          : 'border-darkgreen/15 hover:border-darkgreen/40'
      }`}
    >
      {/* Top Banner Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isDeparted
            ? 'bg-stone-400'
            : isFull
            ? 'bg-rose-500'
            : isNewGroup
            ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-darkgreen'
            : 'bg-gradient-to-r from-darkgreen via-mediumgreen to-lightgreen'
        }`}
      />

      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-darkgreen/10">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Badge */}
            {isDeparted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 font-bold text-xs font-jakarta border border-stone-300">
                ✈ Departed / Completed Tour
              </span>
            ) : isFull ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs font-jakarta border border-rose-300">
                ⛔ Housefull / Booking Closed
              </span>
            ) : isNewGroup ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-xs font-jakarta border border-amber-300 shadow-2xs">
                <Sparkles size={13} className="text-amber-600" />
                <span>✨ New Group Departure</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs font-jakarta border border-emerald-300">
                🟢 Booking Open
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach/70 text-darkgreen font-semibold text-xs font-jakarta tracking-wide">
              <Calendar size={14} className="text-darkgreen" />
              {daysCount ? `${daysCount} Days Spiritual Journey` : 'Umrah Tour'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
              <MapPin size={13} className="text-stone-500" />
              From {departure.departure_city || 'Mumbai'}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold font-zodiak text-darkgreen tracking-tight">
            {depDateFormatted} – {retDateFormatted}
          </h3>
        </div>

        {/* Flights list */}
        {departure.flights && departure.flights.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {departure.flights.map((flight, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-peach/40 border border-darkgreen/15 px-3 py-1.5 rounded-xl text-xs font-jakarta font-medium text-darkgreen"
              >
                <Plane size={14} className="text-darkgreen" />
                <span className="font-semibold">{flight.airline}</span>
                <span className="bg-white/80 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-stone-800 shadow-2xs">
                  {flight.flight_number}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Departed / Full Notice Banner */}
      {isDeparted && (
        <div className="mt-4 bg-stone-100 border border-stone-300 rounded-xl p-3 text-xs font-jakarta text-stone-700 flex items-center justify-between gap-2">
          <span>
            <strong>Past Tour History:</strong> This group tour successfully completed its journey. Check below to view package details, or click WhatsApp to ask for the next upcoming date.
          </span>
        </div>
      )}
      {isFull && !isDeparted && (
        <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs font-jakarta text-rose-800 flex items-center justify-between gap-2">
          <span>
            <strong>Group Full:</strong> All seats have been reserved for this departure. You can join the waiting list on WhatsApp in case of cancellations.
          </span>
        </div>
      )}

      {/* Package Tiers Grid */}
      <div className="mt-5">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-3 font-jakarta">
          Available Package Tiers
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departure.tiers && departure.tiers.length > 0 ? (
            departure.tiers.map((tier) => {
              const status = getStatusBadge(tier.seat_status);
              const isSoldOut = tier.seat_status === 'Sold Out';

              return (
                <div
                  key={tier.id}
                  className={`relative rounded-xl border p-4 transition-all flex flex-col justify-between ${
                    isSoldOut
                      ? 'bg-stone-50 border-stone-200 opacity-70'
                      : 'bg-peach/20 border-darkgreen/15 hover:border-darkgreen/30 hover:bg-peach/30'
                  }`}
                >
                  <div>
                    {/* Tier Name and Seat Status Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-zodiak font-bold text-base text-darkgreen">
                        {tier.tier_name}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${status.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </div>

                    {/* Seats Available */}
                    <div className="text-xs font-jakarta text-stone-600 mb-3 font-medium">
                      {isSoldOut ? (
                        <span className="text-stone-500 font-semibold">No seats remaining</span>
                      ) : (
                        <span className="text-darkgreen font-semibold">
                          {tier.available_seats} {tier.available_seats === 1 ? 'seat' : 'seats'} available
                        </span>
                      )}
                    </div>

                    {/* Hotels info */}
                    <div className="space-y-1.5 text-xs text-stone-700 font-jakarta border-t border-darkgreen/10 pt-2.5">
                      <div className="flex items-start gap-1.5">
                        <Building size={13} className="text-darkgreen flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-800">Makkah: </span>
                          <span className="text-stone-600">{tier.makkah_hotel || 'Hotel Near Haram'}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Building size={13} className="text-mediumgreen flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-800">Madina: </span>
                          <span className="text-stone-600">{tier.madina_hotel || 'Hotel Near Masjid Nabawi'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-4 text-center text-xs text-stone-500 font-jakarta">
              Package details will be announced soon.
            </div>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="mt-6 pt-4 border-t border-darkgreen/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-stone-500 font-jakarta text-center sm:text-left">
          {isDeparted
            ? 'Interested in future dates? Contact our team on WhatsApp.'
            : isFull
            ? 'Group is full. Join waitlist or enquire for next available group.'
            : '* Seats fill fast. Instant enquiry & verification on WhatsApp.'}
        </p>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full font-jakarta font-semibold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 ${ctaBtnBg}`}
        >
          <WhatsappLogo size={20} weight="fill" className={isDeparted ? 'text-emerald-400' : 'text-emerald-400'} />
          <span>{ctaLabel}</span>
        </a>
      </div>
    </div>
  );
};

export default DepartureCard;
