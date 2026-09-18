import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useDepartureStore = create((set, get) => ({
  publicDepartures: [],
  adminDepartures: [],
  selectedDeparture: null,
  isLoading: false,
  isSaving: false,
  error: null,

  // =========================================================================
  // PUBLIC ACTIONS
  // =========================================================================

  fetchPublicDepartures: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/departures/public');
      set({ publicDepartures: res.data?.data || [] });
    } catch (err) {
      console.error('Error fetching public departures:', err);
      const msg = err.response?.data?.message || 'Failed to fetch departures';
      set({ error: msg });
      toast.error(msg);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPublicDepartureById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/departures/public/${id}`);
      set({ selectedDeparture: res.data?.data || null });
      return res.data?.data;
    } catch (err) {
      console.error('Error fetching departure by id:', err);
      const msg = err.response?.data?.message || 'Failed to fetch departure details';
      set({ error: msg });
      toast.error(msg);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // =========================================================================
  // ADMIN ACTIONS
  // =========================================================================

  fetchAdminDepartures: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get('/admin/departures');
      set({ adminDepartures: res.data?.data || [] });
    } catch (err) {
      console.error('Error fetching admin departures:', err);
      const msg = err.response?.data?.message || 'Failed to load departures';
      set({ error: msg });
      toast.error(msg);
    } finally {
      set({ isLoading: false });
    }
  },

  createDeparture: async (departureData) => {
    set({ isSaving: true });
    try {
      const res = await axiosInstance.post('/admin/departures', departureData);
      const newDep = res.data?.data;
      set((state) => ({
        adminDepartures: [...state.adminDepartures, newDep].sort(
          (a, b) => new Date(a.departure_date) - new Date(b.departure_date)
        ),
      }));
      toast.success(res.data?.message || 'Departure created successfully');
      return { success: true, data: newDep };
    } catch (err) {
      console.error('Error creating departure:', err);
      const msg = err.response?.data?.message || 'Failed to create departure';
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      set({ isSaving: false });
    }
  },

  updateDeparture: async (id, departureData) => {
    set({ isSaving: true });
    try {
      const res = await axiosInstance.put(`/admin/departures/${id}`, departureData);
      const updated = res.data?.data;
      set((state) => ({
        adminDepartures: state.adminDepartures.map((d) =>
          d.id === id ? updated : d
        ),
      }));
      toast.success(res.data?.message || 'Departure updated successfully');
      return { success: true, data: updated };
    } catch (err) {
      console.error('Error updating departure:', err);
      const msg = err.response?.data?.message || 'Failed to update departure';
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      set({ isSaving: false });
    }
  },

  deleteDeparture: async (id) => {
    try {
      await axiosInstance.delete(`/admin/departures/${id}`);
      set((state) => ({
        adminDepartures: state.adminDepartures.filter((d) => d.id !== id),
      }));
      toast.success('Departure deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting departure:', err);
      const msg = err.response?.data?.message || 'Failed to delete departure';
      toast.error(msg);
      return false;
    }
  },

  togglePublish: async (id, currentState) => {
    try {
      const res = await axiosInstance.patch(`/admin/departures/${id}/publish`, {
        is_published: !currentState,
      });
      const updated = res.data?.data;
      set((state) => ({
        adminDepartures: state.adminDepartures.map((d) =>
          d.id === id ? { ...d, is_published: updated.is_published } : d
        ),
      }));
      toast.success(
        updated.is_published
          ? 'Departure published live'
          : 'Departure reverted to draft'
      );
      return true;
    } catch (err) {
      console.error('Error toggling publish state:', err);
      const msg = err.response?.data?.message || 'Failed to update status';
      toast.error(msg);
      return false;
    }
  },

  updateDepartureStatus: async (id, status) => {
    try {
      const res = await axiosInstance.patch(`/admin/departures/${id}/status`, {
        status,
      });
      const updated = res.data?.data;
      set((state) => ({
        adminDepartures: state.adminDepartures.map((d) =>
          d.id === id ? { ...d, status: updated?.status || status } : d
        ),
      }));
      const label =
        status === 'new_group'
          ? 'New Group'
          : status === 'full'
          ? 'Full / Closed'
          : status === 'departed'
          ? 'Departed'
          : 'Booking Open';
      toast.success(`Status set to ${label}`);
      return true;
    } catch (err) {
      console.error('Error updating status:', err);
      const msg = err.response?.data?.message || 'Failed to update status';
      toast.error(msg);
      return false;
    }
  },

  updateTierSeats: async (tierId, { available_seats, total_seats }) => {
    try {
      const res = await axiosInstance.put(`/admin/departures/tiers/${tierId}`, {
        available_seats: Number(available_seats),
        total_seats: total_seats !== undefined ? Number(total_seats) : undefined,
      });
      const updatedTier = res.data?.data;

      // Update in admin departures state
      set((state) => ({
        adminDepartures: state.adminDepartures.map((dep) => ({
          ...dep,
          tiers: (dep.tiers || []).map((t) =>
            t.id === tierId ? { ...t, ...updatedTier } : t
          ),
        })),
      }));
      toast.success('Seat count updated');
      return true;
    } catch (err) {
      console.error('Error updating tier seats:', err);
      const msg = err.response?.data?.message || 'Failed to update seats';
      toast.error(msg);
      return false;
    }
  },
}));

export default useDepartureStore;
