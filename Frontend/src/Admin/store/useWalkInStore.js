import { create } from 'zustand';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

const useWalkInStore = create((set, get) => ({
  customers: [],
  invoices: [],
  selectedCustomer: null,
  selectedInvoice: null,
  isLoading: false,
  pendingBalances: null,

  // ---- CUSTOMERS ----
  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/admin/walkin/customers');
      set({ customers: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch customers');
    } finally {
      set({ isLoading: false });
    }
  },

  createCustomer: async (customerData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/admin/walkin/customers', customerData);
      set((state) => ({ customers: [...state.customers, res.data.data] }));
      toast.success('Customer created successfully');
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create customer');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCustomer: async (customerId, customerData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/admin/walkin/customers/${customerId}`, customerData);
      set((state) => ({
        customers: state.customers.map((c) => (c.id === customerId ? res.data.data : c)),
        selectedCustomer: state.selectedCustomer?.id === customerId ? res.data.data : state.selectedCustomer,
      }));
      toast.success('Customer updated successfully');
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update customer');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCustomer: async (customerId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/walkin/customers/${customerId}`);
      set((state) => ({
        customers: state.customers.filter((c) => c.id !== customerId),
        selectedCustomer: state.selectedCustomer?.id === customerId ? null : state.selectedCustomer,
        invoices: state.selectedCustomer?.id === customerId ? [] : state.invoices,
        selectedInvoice: state.selectedCustomer?.id === customerId ? null : state.selectedInvoice,
      }));
      toast.success('Customer deleted successfully');
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete customer');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedCustomer: (customer) => set({ selectedCustomer: customer, selectedInvoice: null }),

  // ---- INVOICES ----
  fetchCustomerInvoices: async (customerId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/admin/walkin/customers/${customerId}/invoices`);
      const fetchedInvoices = res.data.data.invoices || [];
      set({ invoices: fetchedInvoices });
      if (fetchedInvoices.length > 0) {
        await get().fetchInvoiceById(fetchedInvoices[0].id);
      } else {
        set({ selectedInvoice: null });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch invoices');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchInvoiceById: async (invoiceId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/admin/walkin/invoices/${invoiceId}`);
      set({ selectedInvoice: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch invoice');
    } finally {
      set({ isLoading: false });
    }
  },

  createInvoice: async (invoiceData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post('/admin/walkin/invoices', invoiceData);
      toast.success('Invoice created successfully');
      await get().fetchCustomerInvoices(invoiceData.customer_id);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create invoice');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteInvoice: async (invoiceId, customerId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/walkin/invoices/${invoiceId}`);
      set((state) => ({
        invoices: state.invoices.filter((inv) => inv.id !== invoiceId),
        selectedInvoice: state.selectedInvoice?.id === invoiceId ? null : state.selectedInvoice,
      }));
      toast.success('Invoice deleted successfully');
      if (customerId) await get().fetchCustomerInvoices(customerId);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete invoice');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedInvoice: (invoice) => set({ selectedInvoice: invoice }),

  // ---- PAYMENTS ----
  addPayment: async (invoiceId, paymentData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/admin/walkin/invoices/${invoiceId}/payments`, paymentData);
      toast.success('Payment recorded successfully');
      await get().fetchInvoiceById(invoiceId);
      const { selectedCustomer } = get();
      if (selectedCustomer) await get().fetchCustomerInvoices(selectedCustomer.id);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to record payment');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deletePayment: async (paymentId, invoiceId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/walkin/payments/${paymentId}`);
      toast.success('Payment deleted');
      await get().fetchInvoiceById(invoiceId);
      const { selectedCustomer } = get();
      if (selectedCustomer) await get().fetchCustomerInvoices(selectedCustomer.id);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete payment');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPendingBalances: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/admin/walkin/pending-balances');
      set({ pendingBalances: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch pending balances');
    } finally {
      set({ isLoading: false });
    }
  },

  // ---- INVOICE ITEMS ----
  addInvoiceItem: async (invoiceId, itemData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/admin/walkin/invoices/${invoiceId}/items`, itemData);
      toast.success('Service added');
      await get().fetchInvoiceById(invoiceId);
      const { selectedCustomer } = get();
      if (selectedCustomer) await get().fetchCustomerInvoices(selectedCustomer.id);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add service');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateInvoiceItem: async (itemId, invoiceId, itemData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.put(`/admin/walkin/items/${itemId}`, itemData);
      toast.success('Service updated');
      await get().fetchInvoiceById(invoiceId);
      const { selectedCustomer } = get();
      if (selectedCustomer) await get().fetchCustomerInvoices(selectedCustomer.id);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update service');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteInvoiceItem: async (itemId, invoiceId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/walkin/items/${itemId}`);
      toast.success('Service deleted');
      await get().fetchInvoiceById(invoiceId);
      const { selectedCustomer } = get();
      if (selectedCustomer) await get().fetchCustomerInvoices(selectedCustomer.id);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete service');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  reorderInvoiceItems: async (invoiceId, itemIds) => {
    try {
      await axiosInstance.patch(`/admin/walkin/invoices/${invoiceId}/items/reorder`, { itemIds });
      await get().fetchInvoiceById(invoiceId);
    } catch (error) {
      toast.error('Failed to reorder items');
    }
  },
}));

export default useWalkInStore;
