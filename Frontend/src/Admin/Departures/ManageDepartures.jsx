import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDepartureStore } from '../../store/useDepartureStore';
import {
  Plus,
  Edit2,
  Trash2,
  Plane,
  Building,
  CheckCircle,
  XCircle,
  Eye,
  Sliders,
  Calendar,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { formatDateStr, calculateDays } from '../../components/DeparturePage/DepartureCard';

const ManageDepartures = () => {
  const navigate = useNavigate();
  const {
    adminDepartures,
    isLoading,
    fetchAdminDepartures,
    deleteDeparture,
    togglePublish,
    updateDepartureStatus,
    updateTierSeats,
  } = useDepartureStore();

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editingSeatsTier, setEditingSeatsTier] = useState(null); // { tierId, tierName, availableSeats, totalSeats }
  const [newAvailableSeats, setNewAvailableSeats] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAdminDepartures();
  }, [fetchAdminDepartures]);

  const handleDelete = async (id) => {
    await deleteDeparture(id);
    setDeleteConfirmId(null);
  };

  const handleSaveSeats = async () => {
    if (!editingSeatsTier) return;
    await updateTierSeats(editingSeatsTier.tierId, {
      available_seats: Number(newAvailableSeats),
    });
    setEditingSeatsTier(null);
  };

  const counts = {
    all: adminDepartures.length,
    upcoming: adminDepartures.filter(
      (d) => !d.status || d.status === 'upcoming' || d.status === 'active'
    ).length,
    new_group: adminDepartures.filter((d) => d.status === 'new_group').length,
    full: adminDepartures.filter((d) => d.status === 'full').length,
    departed: adminDepartures.filter((d) => d.status === 'departed').length,
  };

  const filteredDepartures = adminDepartures.filter((dep) => {
    if (statusFilter === 'all') return true;
    const st = dep.status || 'upcoming';
    if (statusFilter === 'upcoming') return st === 'upcoming' || st === 'active';
    return st === statusFilter;
  });

  return (
    <div className="w-full space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-zodiak text-darkgreen">
            All Scheduled Departures ({adminDepartures.length})
          </h2>
          <p className="text-xs font-jakarta text-stone-500">
            Publish live, quick-switch status, manage flights, and manually adjust seat counts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchAdminDepartures()}
            className="p-2 rounded-xl border border-darkgreen/20 hover:bg-peach/50 text-darkgreen transition-colors"
            title="Refresh Departures"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => navigate('/admin/departures/create')}
            className="flex items-center gap-2 bg-darkgreen hover:bg-mediumgreen text-peach px-4 py-2 rounded-xl text-xs font-semibold font-jakarta shadow-md transition-all"
          >
            <Plus size={16} />
            <span>Add New Departure</span>
          </button>
        </div>
      </div>

      {/* Admin Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-darkgreen/10 pb-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-jakarta transition-colors ${
            statusFilter === 'all'
              ? 'bg-darkgreen text-peach shadow-sm'
              : 'bg-white border border-darkgreen/20 text-stone-600 hover:bg-peach/40'
          }`}
        >
          All ({counts.all})
        </button>
        <button
          onClick={() => setStatusFilter('upcoming')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-jakarta transition-colors ${
            statusFilter === 'upcoming'
              ? 'bg-darkgreen text-peach shadow-sm'
              : 'bg-white border border-darkgreen/20 text-stone-600 hover:bg-peach/40'
          }`}
        >
          🟢 Booking Open ({counts.upcoming})
        </button>
        <button
          onClick={() => setStatusFilter('new_group')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-jakarta transition-colors ${
            statusFilter === 'new_group'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-50'
          }`}
        >
          ✨ New Groups ({counts.new_group})
        </button>
        <button
          onClick={() => setStatusFilter('full')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-jakarta transition-colors ${
            statusFilter === 'full'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white border border-rose-300 text-rose-800 hover:bg-rose-50'
          }`}
        >
          ⛔ Full / Closed ({counts.full})
        </button>
        <button
          onClick={() => setStatusFilter('departed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-jakarta transition-colors ${
            statusFilter === 'departed'
              ? 'bg-stone-700 text-white shadow-sm'
              : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
          }`}
        >
          ✈ Departed ({counts.departed})
        </button>
      </div>

      {/* Loading state */}
      {isLoading && adminDepartures.length === 0 && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white/90 border border-darkgreen/15 rounded-2xl p-6 shadow-sm animate-pulse space-y-3"
            >
              <div className="h-6 w-1/3 bg-darkgreen/10 rounded" />
              <div className="h-4 w-1/4 bg-darkgreen/5 rounded" />
              <div className="h-10 w-full bg-darkgreen/5 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredDepartures.length === 0 && (
        <div className="bg-white/90 border border-darkgreen/15 rounded-2xl p-12 text-center">
          <Calendar size={40} className="text-darkgreen/40 mx-auto mb-3" />
          <h3 className="text-base font-bold font-zodiak text-darkgreen">
            No Departures Found
          </h3>
          <p className="text-xs font-jakarta text-stone-500 mt-1 mb-5">
            {statusFilter === 'all'
              ? "You haven't added any departures yet. Create your first group departure now."
              : `No departures with status '${statusFilter}'.`}
          </p>
          <button
            onClick={() => navigate('/admin/departures/create')}
            className="inline-flex items-center gap-2 bg-darkgreen text-peach px-5 py-2 rounded-xl text-xs font-semibold font-jakarta hover:bg-mediumgreen transition-colors shadow-md"
          >
            <Plus size={16} />
            Create Departure
          </button>
        </div>
      )}

      {/* Departures List */}
      <div className="space-y-4">
        {filteredDepartures.map((dep) => {
          const depFormatted = formatDateStr(dep.departure_date);
          const retFormatted = formatDateStr(dep.return_date);
          const days = calculateDays(dep.departure_date, dep.return_date);

          return (
            <div
              key={dep.id}
              className={`bg-white/95 rounded-2xl border transition-all p-5 shadow-sm hover:shadow-md ${
                dep.is_published
                  ? 'border-darkgreen/30'
                  : 'border-dashed border-stone-300 bg-stone-50/50'
              }`}
            >
              {/* Top Row: Date range & Status Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-darkgreen/10">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-zodiak font-bold text-lg text-darkgreen">
                      {depFormatted} – {retFormatted}
                    </h3>
                    {days && (
                      <span className="text-xs font-jakarta font-semibold px-2.5 py-0.5 rounded-full bg-peach/70 text-darkgreen">
                        {days} Days
                      </span>
                    )}

                    {/* Prominent Status Pill */}
                    {dep.status === 'new_group' && (
                      <span className="text-[11px] font-jakarta font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                        ✨ New Group
                      </span>
                    )}
                    {dep.status === 'full' && (
                      <span className="text-[11px] font-jakarta font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                        ⛔ Full
                      </span>
                    )}
                    {dep.status === 'departed' && (
                      <span className="text-[11px] font-jakarta font-bold px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700 border border-stone-400 flex items-center gap-1">
                        ✈ Departed
                      </span>
                    )}
                    {(!dep.status || dep.status === 'upcoming' || dep.status === 'active') && (
                      <span className="text-[11px] font-jakarta font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
                        🟢 Booking Open
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-jakarta text-stone-600 flex items-center gap-3">
                    <span className="font-semibold text-stone-800">
                      City: {dep.departure_city || 'Mumbai'}
                    </span>
                  </div>
                </div>

                {/* Status Quick-Change, Publish Toggle & Action buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* 1-Click Status Dropdown Selector */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-jakarta font-semibold text-stone-500 hidden sm:inline">
                      Status:
                    </span>
                    <select
                      value={dep.status || 'upcoming'}
                      onChange={(e) => updateDepartureStatus(dep.id, e.target.value)}
                      className={`text-xs font-jakarta font-semibold px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer focus:outline-none ${
                        dep.status === 'new_group'
                          ? 'bg-amber-50 text-amber-950 border-amber-300 font-bold'
                          : dep.status === 'full'
                          ? 'bg-rose-50 text-rose-900 border-rose-300 font-bold'
                          : dep.status === 'departed'
                          ? 'bg-stone-100 text-stone-800 border-stone-300 font-medium'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                      }`}
                      title="Change Group Status"
                    >
                      <option value="upcoming">🟢 Booking Open</option>
                      <option value="new_group">✨ New Group</option>
                      <option value="full">⛔ Full / Closed</option>
                      <option value="departed">✈ Departed</option>
                    </select>
                  </div>

                  {/* Publish/Draft Toggle Button */}
                  <button
                    onClick={() => togglePublish(dep.id, dep.is_published)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-jakarta transition-colors border ${
                      dep.is_published
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                        : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
                    }`}
                    title={dep.is_published ? 'Click to Unpublish' : 'Click to Publish'}
                  >
                    {dep.is_published ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-400" />
                        <span>Draft</span>
                      </>
                    )}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/admin/departures/edit/${dep.id}`)}
                    className="flex items-center gap-1 text-xs font-semibold font-jakarta px-3 py-1.5 rounded-xl border border-darkgreen/20 hover:bg-darkgreen hover:text-peach text-darkgreen transition-colors"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setDeleteConfirmId(dep.id)}
                    className="flex items-center gap-1 text-xs font-semibold font-jakarta px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-500 hover:text-white text-rose-600 transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Flights Section */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 font-jakarta flex items-center gap-1 mr-1">
                  <Plane size={13} className="text-darkgreen" />
                  Flights:
                </span>
                {dep.flights && dep.flights.length > 0 ? (
                  dep.flights.map((flight) => (
                    <span
                      key={flight.id}
                      className="inline-flex items-center gap-1.5 bg-peach/40 px-2.5 py-1 rounded-lg text-xs font-jakarta font-medium text-darkgreen border border-darkgreen/15"
                    >
                      <span className="font-semibold">{flight.airline}</span>
                      <span className="font-mono bg-white/70 px-1.5 py-0.2 rounded text-[11px]">
                        {flight.flight_number}
                      </span>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-400 font-jakarta italic">
                    No flights assigned
                  </span>
                )}
              </div>

              {/* Tiers & Seats Section */}
              <div className="mt-4 pt-3 border-t border-darkgreen/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-jakarta">
                    Package Tiers & Seat Allocation
                  </span>
                  <span className="text-[11px] text-stone-500 font-jakarta">
                    (Click a tier to quick-adjust available seats)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {dep.tiers && dep.tiers.length > 0 ? (
                    dep.tiers.map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => {
                          setEditingSeatsTier({
                            tierId: tier.id,
                            tierName: tier.tier_name,
                            availableSeats: tier.available_seats,
                            totalSeats: tier.total_seats,
                          });
                          setNewAvailableSeats(tier.available_seats);
                        }}
                        className="cursor-pointer group relative bg-peach/25 hover:bg-peach/50 border border-darkgreen/15 hover:border-darkgreen/40 p-3 rounded-xl transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-zodiak font-bold text-xs text-darkgreen">
                            {tier.tier_name}
                          </span>
                          <Sliders size={12} className="text-darkgreen/50 group-hover:text-darkgreen" />
                        </div>
                        <div className="mt-1 text-xs font-jakarta font-semibold text-stone-700">
                          {tier.available_seats} / {tier.total_seats} seats
                        </div>
                        <div className="text-[10px] text-stone-500 font-jakarta truncate mt-1">
                          Mak: {tier.makkah_hotel || '—'}
                        </div>
                        <div className="text-[10px] text-stone-500 font-jakarta truncate">
                          Mad: {tier.madina_hotel || '—'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-stone-400 font-jakarta italic">
                      No tiers added
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Seats Adjust Modal */}
      {editingSeatsTier && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-darkgreen/20 space-y-4">
            <h3 className="font-zodiak font-bold text-lg text-darkgreen">
              Adjust Available Seats
            </h3>
            <p className="text-xs font-jakarta text-stone-600">
              Update live available seats for <strong>{editingSeatsTier.tierName}</strong> (Total Seats: {editingSeatsTier.totalSeats}).
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold font-jakarta text-stone-700">
                Available Seats:
              </label>
              <input
                type="number"
                min="0"
                max={editingSeatsTier.totalSeats}
                value={newAvailableSeats}
                onChange={(e) => setNewAvailableSeats(Number(e.target.value))}
                className="w-full px-3 py-2 border border-darkgreen/30 rounded-xl text-sm font-jakarta focus:outline-none focus:ring-2 focus:ring-darkgreen/40"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingSeatsTier(null)}
                className="px-4 py-2 rounded-xl text-xs font-jakarta font-semibold border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSeats}
                className="px-4 py-2 rounded-xl text-xs font-jakarta font-semibold bg-darkgreen text-peach hover:bg-mediumgreen transition-colors shadow-md"
              >
                Save Seats
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle size={24} />
              <h3 className="font-zodiak font-bold text-lg text-stone-800">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-xs font-jakarta text-stone-600 leading-relaxed">
              Are you sure you want to delete this departure? This will also permanently delete all associated flight records and package tier configurations. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-jakarta font-semibold border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-jakarta font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDepartures;
