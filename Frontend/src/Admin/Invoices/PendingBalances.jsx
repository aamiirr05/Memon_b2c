import { useEffect } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';
import useInvoiceStore from '../store/useInvoiceStore';

const fmt = (n) =>
  parseFloat(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const PendingBalances = () => {
  const { pendingBalances, isLoading, fetchPendingBalances } = useInvoiceStore();

  useEffect(() => { fetchPendingBalances(); }, []);

  if (isLoading && !pendingBalances) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-darkgreen border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-darkgreen/50 font-jakarta">Loading pending balances...</p>
        </div>
      </div>
    );
  }

  const { agents = [], grandTotal = 0, totalAgents = 0, totalInvoices = 0 } = pendingBalances || {};

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold font-zodiak">Pending Balances</h2>
        <button
          onClick={fetchPendingBalances}
          disabled={isLoading}
          className="flex items-center gap-2 text-sm font-jakarta font-semibold text-darkgreen border border-darkgreen/30 px-4 py-2 rounded-lg hover:bg-peach/30 transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-darkgreen/15 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-maroon/10 rounded-lg flex items-center justify-center">
              <TrendingDown size={18} className="text-maroon" />
            </div>
            <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Total Pending</p>
          </div>
          <p className="font-zodiak font-bold text-2xl text-maroon">₹{fmt(grandTotal)}</p>
        </div>

        <div className="bg-white border border-darkgreen/15 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
              <AlertCircle size={18} className="text-orange-500" />
            </div>
            <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Agents with Due</p>
          </div>
          <p className="font-zodiak font-bold text-2xl text-darkgreen">{totalAgents}</p>
        </div>

        <div className="bg-white border border-darkgreen/15 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-darkgreen/10 rounded-lg flex items-center justify-center">
              <CheckCircle size={18} className="text-darkgreen" />
            </div>
            <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Pending Invoices</p>
          </div>
          <p className="font-zodiak font-bold text-2xl text-darkgreen">{totalInvoices}</p>
        </div>
      </div>

      {/* No Pending */}
      {agents.length === 0 ? (
        <div className="bg-white border border-darkgreen/15 rounded-xl p-16 text-center shadow-sm">
          <CheckCircle size={48} className="mx-auto mb-4 text-green-500 opacity-60" />
          <p className="font-zodiak font-semibold text-darkgreen text-lg">All Clear!</p>
          <p className="text-sm font-jakarta text-darkgreen/50 mt-1">No pending balances at this time.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {agents.map((agentGroup) => (
            <div key={agentGroup.agent.agent_id} className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden shadow-sm">

              {/* Agent Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-peach/20 border-b border-darkgreen/10">
                <div>
                  <p className="font-zodiak font-bold text-darkgreen text-lg">{agentGroup.agent.name}</p>
                  <div className="flex items-center gap-4 mt-0.5">
                    {agentGroup.agent.phone && (
                      <span className="text-xs font-jakarta text-darkgreen/50">📞 {agentGroup.agent.phone}</span>
                    )}
                    {agentGroup.agent.email && (
                      <span className="text-xs font-jakarta text-darkgreen/50">✉️ {agentGroup.agent.email}</span>
                    )}
                    <span className="text-xs font-jakarta text-darkgreen/50">
                      {agentGroup.invoices.length} pending invoice{agentGroup.invoices.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-jakarta font-semibold text-darkgreen/50 uppercase tracking-wide">Total Pending</p>
                  <p className="font-zodiak font-bold text-xl text-maroon">₹{fmt(agentGroup.totalPending)}</p>
                </div>
              </div>

              {/* Invoices Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-darkgreen/10 bg-darkgreen/5">
                      <th className="text-left px-6 py-3 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Invoice No.</th>
                      <th className="text-left px-4 py-3 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Date</th>
                      <th className="text-right px-4 py-3 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Total Amount</th>
                      <th className="text-right px-4 py-3 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Amount Paid</th>
                      <th className="text-right px-6 py-3 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Balance Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-darkgreen/5">
                    {agentGroup.invoices.map((inv, i) => (
                      <tr key={inv.invoice_id} className={i % 2 === 0 ? 'bg-white' : 'bg-peach/10'}>
                        <td className="px-6 py-3.5">
                          <p className="font-jakarta font-bold text-darkgreen text-sm">{inv.invoice_number}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-jakarta text-sm text-darkgreen/70">
                            {new Date(inv.invoice_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </p>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <p className="font-jakarta font-semibold text-sm text-darkgreen">₹{fmt(inv.totalServices)}</p>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <p className="font-jakarta font-semibold text-sm text-green-700">₹{fmt(inv.totalPaid)}</p>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <span className="inline-block bg-red-50 text-maroon font-jakarta font-bold text-sm px-3 py-1 rounded-lg border border-red-100">
                            ₹{fmt(inv.balance)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Agent subtotal */}
                  <tfoot>
                    <tr className="border-t-2 border-darkgreen/20 bg-peach/30">
                      <td colSpan={4} className="px-6 py-3 text-right font-bold font-jakarta text-darkgreen text-sm uppercase tracking-wide">
                        Total Pending from {agentGroup.agent.name}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="font-zodiak font-bold text-maroon text-base">₹{fmt(agentGroup.totalPending)}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ))}

          {/* Grand Total Footer */}
          <div className="bg-darkgreen rounded-xl px-6 py-4 flex items-center justify-between">
            <p className="font-zodiak font-bold text-peach text-lg">Grand Total Pending</p>
            <p className="font-zodiak font-bold text-peach text-2xl">₹{fmt(grandTotal)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingBalances;
