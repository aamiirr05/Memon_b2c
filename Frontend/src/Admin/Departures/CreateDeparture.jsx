import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDepartureStore } from '../../store/useDepartureStore';
import {
  Calendar,
  Plane,
  Building,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Helper to format ISO date to YYYY-MM-DD for date inputs
const toInputDate = (dateVal) => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

const CreateDeparture = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // If present, edit mode
  const isEditMode = Boolean(id);

  const {
    adminDepartures,
    createDeparture,
    updateDeparture,
    isSaving,
  } = useDepartureStore();

  // Form State
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [departureCity, setDepartureCity] = useState('Mumbai');
  const [status, setStatus] = useState('upcoming');
  const [isPublished, setIsPublished] = useState(false);

  // Flights State
  const [flights, setFlights] = useState([
    { airline: 'Air India', flight_number: '' },
  ]);

  // Tiers State
  const [tiers, setTiers] = useState([
    {
      tier_name: 'Economy',
      total_seats: 40,
      available_seats: 40,
      makkah_hotel: '',
      madina_hotel: '',
    },
    {
      tier_name: 'Deluxe',
      total_seats: 20,
      available_seats: 20,
      makkah_hotel: '',
      madina_hotel: '',
    },
  ]);

  // Load existing departure data if in Edit Mode
  useEffect(() => {
    if (isEditMode && adminDepartures.length > 0) {
      const existing = adminDepartures.find((d) => d.id === id);
      if (existing) {
        setDepartureDate(toInputDate(existing.departure_date));
        setReturnDate(toInputDate(existing.return_date));
        setDepartureCity(existing.departure_city || 'Mumbai');
        setStatus(existing.status || 'active');
        setIsPublished(Boolean(existing.is_published));

        if (existing.flights && existing.flights.length > 0) {
          setFlights(
            existing.flights.map((f) => ({
              airline: f.airline || '',
              flight_number: f.flight_number || '',
            }))
          );
        }

        if (existing.tiers && existing.tiers.length > 0) {
          setTiers(
            existing.tiers.map((t) => ({
              tier_name: t.tier_name || '',
              total_seats: t.total_seats || 0,
              available_seats: t.available_seats !== undefined ? t.available_seats : t.total_seats || 0,
              makkah_hotel: t.makkah_hotel || '',
              madina_hotel: t.madina_hotel || '',
            }))
          );
        }
      }
    }
  }, [isEditMode, id, adminDepartures]);

  // Flight Handlers
  const handleAddFlight = () => {
    setFlights([...flights, { airline: '', flight_number: '' }]);
  };

  const handleRemoveFlight = (index) => {
    if (flights.length === 1) {
      toast.error('Must have at least one flight row (or leave blank)');
      return;
    }
    setFlights(flights.filter((_, i) => i !== index));
  };

  const handleFlightChange = (index, field, value) => {
    const updated = [...flights];
    updated[index][field] = value;
    setFlights(updated);
  };

  // Tier Handlers
  const handleAddTier = () => {
    setTiers([
      ...tiers,
      {
        tier_name: '',
        total_seats: 30,
        available_seats: 30,
        makkah_hotel: '',
        madina_hotel: '',
      },
    ]);
  };

  const handleRemoveTier = (index) => {
    if (tiers.length === 1) {
      toast.error('Must have at least one package tier');
      return;
    }
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const handleTierChange = (index, field, value) => {
    const updated = [...tiers];
    updated[index][field] = value;
    if (field === 'total_seats' && (updated[index].available_seats === '' || updated[index].available_seats === undefined)) {
      updated[index].available_seats = value;
    }
    setTiers(updated);
  };

  // Submit Handler
  const handleSubmit = async (publishFlag) => {
    if (!departureDate || !returnDate || !departureCity) {
      toast.error('Please fill in departure date, return date, and departure city');
      return;
    }

    if (new Date(returnDate) < new Date(departureDate)) {
      toast.error('Return date must be on or after departure date');
      return;
    }

    // Filter valid flights
    const cleanFlights = flights.filter(
      (f) => f.airline.trim() && f.flight_number.trim()
    );

    // Filter valid tiers
    const cleanTiers = tiers.filter((t) => t.tier_name.trim());
    if (cleanTiers.length === 0) {
      toast.error('Please add at least one named package tier');
      return;
    }

    const payload = {
      departure_date: new Date(departureDate).toISOString(),
      return_date: new Date(returnDate).toISOString(),
      departure_city: departureCity.trim(),
      status,
      is_published: publishFlag !== undefined ? publishFlag : isPublished,
      flights: cleanFlights,
      tiers: cleanTiers,
    };

    let result;
    if (isEditMode) {
      result = await updateDeparture(id, payload);
    } else {
      result = await createDeparture(payload);
    }

    if (result?.success) {
      navigate('/admin/departures/manage');
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-8 pb-16">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/departures/manage')}
          className="inline-flex items-center gap-2 text-xs font-jakarta font-semibold text-stone-600 hover:text-darkgreen transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to All Departures</span>
        </button>

        <h2 className="font-zodiak font-bold text-xl text-darkgreen">
          {isEditMode ? 'Edit Scheduled Departure' : 'Create New Departure'}
        </h2>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* ================================================================= */}
        {/* SECTION 1 — BASIC INFO */}
        {/* ================================================================= */}
        <div className="bg-white/95 rounded-2xl border border-darkgreen/15 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-darkgreen/10">
            <Calendar size={18} className="text-darkgreen" />
            <h3 className="font-zodiak font-bold text-base text-darkgreen">
              Section 1 — Basic Departure Info
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Departure Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold font-jakarta text-stone-700">
                Departure Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-darkgreen/20 rounded-xl text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
              />
            </div>

            {/* Return Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold font-jakarta text-stone-700">
                Return Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-darkgreen/20 rounded-xl text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
              />
            </div>

            {/* Departure City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold font-jakarta text-stone-700">
                Departure City <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai, Delhi, Ahmedabad"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-darkgreen/20 rounded-xl text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
              />
            </div>

            {/* Group Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold font-jakarta text-stone-700">
                Group Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-darkgreen/20 rounded-xl text-xs font-jakarta font-semibold focus:outline-none focus:ring-2 focus:ring-darkgreen/30 bg-white"
              >
                <option value="upcoming">🟢 Booking Open / Upcoming</option>
                <option value="new_group">✨ New Group (Highlighted)</option>
                <option value="full">⛔ Full / Housefull (Closed)</option>
                <option value="departed">✈ Departed / Completed Tour</option>
              </select>
            </div>
          </div>

          <div className="bg-peach/30 border border-darkgreen/10 rounded-xl p-3 text-[11px] font-jakarta text-stone-600 flex items-start gap-2">
            <span className="text-darkgreen font-bold">💡 Tip:</span>
            <span>
              <strong>Past dates & track record:</strong> You can enter past dates and select <em>&apos;Departed / Completed Tour&apos;</em> to showcase your past successful Umrah tours to website visitors.
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 2 — FLIGHTS */}
        {/* ================================================================= */}
        <div className="bg-white/95 rounded-2xl border border-darkgreen/15 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-darkgreen/10">
            <div className="flex items-center gap-2">
              <Plane size={18} className="text-darkgreen" />
              <h3 className="font-zodiak font-bold text-base text-darkgreen">
                Section 2 — Flights Information
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddFlight}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-peach/60 hover:bg-peach text-darkgreen text-xs font-semibold font-jakarta transition-colors"
            >
              <Plus size={14} />
              <span>Add Flight</span>
            </button>
          </div>

          <div className="space-y-3">
            {flights.map((flight, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-peach/20 p-3.5 rounded-xl border border-darkgreen/10"
              >
                <div className="sm:col-span-6 space-y-1">
                  <label className="text-[11px] font-semibold font-jakarta text-stone-600">
                    Airline Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Air India, IndiGo, Saudia"
                    value={flight.airline}
                    onChange={(e) => handleFlightChange(idx, 'airline', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-darkgreen/20 rounded-lg text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
                  />
                </div>

                <div className="sm:col-span-5 space-y-1">
                  <label className="text-[11px] font-semibold font-jakarta text-stone-600">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI-2244, 6E-5121"
                    value={flight.flight_number}
                    onChange={(e) => handleFlightChange(idx, 'flight_number', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-darkgreen/20 rounded-lg text-xs font-jakarta font-mono focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveFlight(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove Flight"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 3 — PACKAGE TIERS */}
        {/* ================================================================= */}
        <div className="bg-white/95 rounded-2xl border border-darkgreen/15 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-darkgreen/10">
            <div className="flex items-center gap-2">
              <Building size={18} className="text-darkgreen" />
              <h3 className="font-zodiak font-bold text-base text-darkgreen">
                Section 3 — Package Tiers & Hotels
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddTier}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-peach/60 hover:bg-peach text-darkgreen text-xs font-semibold font-jakarta transition-colors"
            >
              <Plus size={14} />
              <span>Add Package Tier</span>
            </button>
          </div>

          <div className="space-y-4">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-peach/20 p-4 rounded-xl border border-darkgreen/15 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-zodiak text-darkgreen">
                    Tier #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(idx)}
                    className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                    title="Remove Tier"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold font-jakarta text-stone-600">
                      Tier Name (e.g. Economy, Deluxe, VIP)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Economy"
                      value={tier.tier_name}
                      onChange={(e) => handleTierChange(idx, 'tier_name', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-darkgreen/20 rounded-lg text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold font-jakarta text-stone-600">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={tier.total_seats}
                      onChange={(e) => handleTierChange(idx, 'total_seats', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-darkgreen/20 rounded-lg text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold font-jakarta text-stone-600">
                      Available Seats
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={tier.total_seats}
                      value={tier.available_seats}
                      onChange={(e) => handleTierChange(idx, 'available_seats', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-darkgreen/20 rounded-lg text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold font-jakarta text-stone-600">
                      Makkah Hotel Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Swissotel Makkah, Pullman Zamzam"
                      value={tier.makkah_hotel}
                      onChange={(e) => handleTierChange(idx, 'makkah_hotel', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-darkgreen/20 rounded-lg text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold font-jakarta text-stone-600">
                      Madina Hotel Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anwar Al Madinah, Oberoi"
                      value={tier.madina_hotel}
                      onChange={(e) => handleTierChange(idx, 'madina_hotel', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-darkgreen/20 rounded-lg text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/30"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 4 — PUBLISH CONTROLS */}
        {/* ================================================================= */}
        <div className="bg-white/95 rounded-2xl border border-darkgreen/15 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-jakarta text-stone-600">
            <strong>Draft</strong> departures are only visible in this admin panel.{' '}
            <strong>Published</strong> departures immediately appear live on the website.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSubmit(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold font-jakarta transition-colors disabled:opacity-50"
            >
              Save as Draft
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSubmit(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-darkgreen hover:bg-mediumgreen text-peach text-xs font-semibold font-jakarta shadow-md transition-all disabled:opacity-50"
            >
              <CheckCircle2 size={16} />
              <span>Save & Publish</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDeparture;
