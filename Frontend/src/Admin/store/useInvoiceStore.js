import { create } from 'zustand';
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

const useInvoiceStore = create((set, get) => ({
  agents: [],
  invoices: [],
  selectedAgent: null,
  selectedInvoice: null,
  isLoading: false,
  pendingBalances: null,

  // ---- AGENTS ----
  fetchAgents: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/admin/invoices/agents');
      set({ agents: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch agents');
    } finally {
      set({ isLoading: false });
    }
  },

  createAgent: async (agentData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/admin/invoices/agents', agentData);
      set((state) => ({ agents: [...state.agents, res.data.data] }));
      toast.success('Agent created successfully');
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create agent');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  updateAgent: async (agentId, agentData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/admin/invoices/agents/${agentId}`, agentData);
      set((state) => ({
        agents: state.agents.map((a) => (a.agent_id === agentId ? res.data.data : a)),
      }));
      toast.success('Agent updated successfully');
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update agent');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAgent: async (agentId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/invoices/agents/${agentId}`);
      set((state) => ({
        agents: state.agents.filter((a) => a.agent_id !== agentId),
        selectedAgent: state.selectedAgent?.agent_id === agentId ? null : state.selectedAgent,
        invoices: state.selectedAgent?.agent_id === agentId ? [] : state.invoices,
      }));
      toast.success('Agent deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete agent');
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedAgent: (agent) => set({ selectedAgent: agent }),

  // ---- INVOICES ----
  fetchAgentInvoices: async (agentId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/admin/invoices/agents/${agentId}/invoices`);
      set({ invoices: res.data.data.invoices });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch invoices');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchInvoiceById: async (invoiceId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/admin/invoices/${invoiceId}`);
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
      await axiosInstance.post('/admin/invoices', invoiceData);
      toast.success('Invoice created successfully');
      await get().fetchAgentInvoices(invoiceData.agent_id);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create invoice');
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteInvoice: async (invoiceId, agentId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/admin/invoices/${invoiceId}`);
      set((state) => ({
        invoices: state.invoices.filter((inv) => inv.invoice_id !== invoiceId),
        selectedInvoice: state.selectedInvoice?.invoice_id === invoiceId ? null : state.selectedInvoice,
      }));
      toast.success('Invoice deleted successfully');
      if (agentId) await get().fetchAgentInvoices(agentId);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete invoice');
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedInvoice: (invoice) => set({ selectedInvoice: invoice }),

  // ---- PAYMENTS ----
  addPayment: async (invoiceId, paymentData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/admin/invoices/${invoiceId}/payments`, paymentData);
      toast.success('Payment recorded successfully');
      await get().fetchInvoiceById(invoiceId);
      const { selectedAgent } = get();
      if (selectedAgent) await get().fetchAgentInvoices(selectedAgent.agent_id);
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
      await axiosInstance.delete(`/admin/invoices/payments/${paymentId}`);
      toast.success('Payment deleted');
      await get().fetchInvoiceById(invoiceId);
      const { selectedAgent } = get();
      if (selectedAgent) await get().fetchAgentInvoices(selectedAgent.agent_id);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete payment');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPendingBalances: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/admin/invoices/pending-balances');
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
      await axiosInstance.post(`/admin/invoices/${invoiceId}/items`, itemData);
      toast.success('Service added');
      await get().fetchInvoiceById(invoiceId);
      const { selectedAgent } = get();
      if (selectedAgent) await get().fetchAgentInvoices(selectedAgent.agent_id);
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
      await axiosInstance.put(`/admin/invoices/items/${itemId}`, itemData);
      toast.success('Service updated');
      await get().fetchInvoiceById(invoiceId);
      const { selectedAgent } = get();
      if (selectedAgent) await get().fetchAgentInvoices(selectedAgent.agent_id);
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
      await axiosInstance.delete(`/admin/invoices/items/${itemId}`);
      toast.success('Service deleted');
      await get().fetchInvoiceById(invoiceId);
      const { selectedAgent } = get();
      if (selectedAgent) await get().fetchAgentInvoices(selectedAgent.agent_id);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete service');
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useInvoiceStore;
