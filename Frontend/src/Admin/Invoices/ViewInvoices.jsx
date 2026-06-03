import { useEffect, useState, useRef } from 'react';
import { Trash2, Plus, X, Download, ChevronRight, RefreshCw } from 'lucide-react';
import useInvoiceStore from '../store/useInvoiceStore';
import Loader from '../../components/Loader';

// ---- PDF Print Styles ----
const PDF_STYLES = `
  @media print {
    body * { visibility: hidden; }
    #invoice-print, #invoice-print * { visibility: visible; }
    #invoice-print { position: absolute; left: 0; top: 0; width: 100%; }
    @page { margin: 10mm; size: A4; }
  }
`;

const fmt = (num) =>
  parseFloat(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---- Invoice PDF Template ----
const InvoicePrintView = ({ invoice }) => {
  const totalServices = invoice.totalServices || 0;
  const totalPaid = invoice.totalPaid || 0;
  const balance = invoice.balance || 0;

  return (
    <div id="invoice-print" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#1a1a1a', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #386641', paddingBottom: '14px', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#386641' }}>MEMON HAJ UMRAH TOURS & TRAVELS</div>
          <div style={{ marginTop: '4px', color: '#555', lineHeight: '1.5' }}>
            6/A, ASMITA ASHIRWAD APT, NAYA NAGAR, OPP ASMITA CLUB, MIRA ROAD(E), THANE-401107<br />
            Ph: 8108404376 | 9022549162 | 7977215388 | Email: memonhajumrahtours@gmail.com<br />
            GST: 27ABXFM6264E1ZP
          </div>
        </div>
        <div style={{ textAlign: 'right', minWidth: '180px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>INVOICE: {invoice.invoice_number}</div>
          <div style={{ color: '#555', marginTop: '4px' }}>DATE: {new Date(invoice.invoice_date).toLocaleDateString('en-IN')}</div>
          <div style={{ color: '#555' }}>HIJRI: {invoice.hijri_year}</div>
        </div>
      </div>

      {/* Bill To + Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', gap: '20px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '10px', flex: 1 }}>
          <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#386641' }}>BILL TO</div>
          <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{invoice.agent?.name}</div>
          {invoice.agent?.phone && <div>Ph: {invoice.agent.phone}</div>}
          {invoice.agent?.email && <div>Email: {invoice.agent.email}</div>}
          {invoice.agent?.address && <div>{invoice.agent.address}</div>}
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '10px', minWidth: '220px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#386641' }}>SUMMARY</div>
          {[
            ['Amount Received', `₹${fmt(totalPaid)}`],
            ['Balance Amount', `₹${fmt(balance)}`],
            ['TOTAL AMOUNT', `₹${fmt(totalServices)}`],
          ].map(([label, val], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: i < 2 ? '1px solid #eee' : 'none', padding: '3px 0', fontWeight: i === 2 ? 'bold' : 'normal' }}>
              <span>{label}</span><span>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <table style={{ width: '55%', borderCollapse: 'collapse', marginBottom: '16px', display: 'inline-table', verticalAlign: 'top' }}>
        <thead>
          <tr style={{ background: '#386641', color: 'white' }}>
            {['SR', 'PARTICULARS', 'PAX', 'RATE', 'TOTAL'].map((h) => (
              <th key={h} style={{ padding: '7px 8px', textAlign: h === 'TOTAL' || h === 'RATE' || h === 'PAX' ? 'right' : 'left', fontSize: '11px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.items?.map((item, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#f9fbf9' : 'white' }}>
              <td style={{ padding: '6px 8px' }}>{i + 1}</td>
              <td style={{ padding: '6px 8px' }}>{item.particulars}</td>
              <td style={{ padding: '6px 8px', textAlign: 'right' }}>{item.pax_quantity}</td>
              <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{fmt(item.rate_per_pax)}</td>
              <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 'bold' }}>₹{fmt(item.total_amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payments Table */}
      <table style={{ width: '43%', borderCollapse: 'collapse', marginBottom: '16px', display: 'inline-table', verticalAlign: 'top', marginLeft: '2%' }}>
        <thead>
          <tr style={{ background: '#386641', color: 'white' }}>
            {['DATE', 'AMOUNT', 'RECEIVED BY'].map((h) => (
              <th key={h} style={{ padding: '7px 8px', textAlign: 'left', fontSize: '11px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.payments?.length > 0 ? invoice.payments.map((p, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#f9fbf9' : 'white' }}>
              <td style={{ padding: '6px 8px' }}>{new Date(p.payment_date).toLocaleDateString('en-IN')}</td>
              <td style={{ padding: '6px 8px', fontWeight: 'bold' }}>₹{fmt(p.amount_paid)}</td>
              <td style={{ padding: '6px 8px' }}>{p.received_by}</td>
            </tr>
          )) : (
            <tr><td colSpan={3} style={{ padding: '10px', color: '#999', textAlign: 'center' }}>No payments recorded</td></tr>
          )}
        </tbody>
      </table>

      {/* Bank Details */}
      {invoice.agent?.bank_name && (
        <div style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '10px', marginBottom: '14px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#386641' }}>ACCOUNT DETAILS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '11px' }}>
            {[
              ['A/C NAME', invoice.agent.account_holder || invoice.agent.name],
              ['A/C NUMBER', invoice.agent.account_number],
              ['BANK NAME', invoice.agent.bank_name],
              ['IFSC CODE', invoice.agent.ifsc_code],
            ].filter(([, v]) => v).map(([label, val]) => (
              <div key={label}><strong>{label}:</strong> {val}</div>
            ))}
          </div>
        </div>
      )}

      {/* Terms */}
      <div style={{ background: '#e8f5e9', padding: '10px', borderRadius: '6px', fontSize: '10px', color: '#333' }}>
        <strong>TERMS & CONDITIONS: </strong>
        Any additional cost due to flight cancellations, delays, visa changes, or currency fluctuations will not be borne by our company.
        Agents are responsible for extra expenses from unforeseen situations.
        Package rates subject to change per airline, visa, and Saudi authority updates.
        In case of extended stay due to disruptions, additional expenses are chargeable.
        By confirming, the agent agrees to all above terms.
      </div>
    </div>
  );
};

// ---- Main View Invoices Component ----
const ViewInvoices = () => {
  const {
    agents, invoices, selectedAgent, selectedInvoice, isLoading,
    fetchAgents, fetchAgentInvoices, fetchInvoiceById,
    setSelectedAgent, deleteInvoice, addPayment, deletePayment,
  } = useInvoiceStore();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ payment_date: '', amount_paid: '', received_by: 'MEMON', notes: '' });
  const printRef = useRef();

  useEffect(() => { fetchAgents(); }, []);

  const handleSelectAgent = async (agent) => {
    setSelectedAgent(agent);
    await fetchAgentInvoices(agent.agent_id);
  };

  const handleSelectInvoice = async (invoice) => {
    await fetchInvoiceById(invoice.invoice_id);
  };

  const handleAddPayment = async () => {
    if (!paymentForm.payment_date || !paymentForm.amount_paid || !paymentForm.received_by) {
      alert('Please fill all payment fields'); return;
    }
    const success = await addPayment(selectedInvoice.invoice_id, paymentForm);
    if (success) {
      setPaymentForm({ payment_date: '', amount_paid: '', received_by: 'MEMON', notes: '' });
      setShowPaymentForm(false);
    }
  };

  const handlePrint = () => {
    const style = document.createElement('style');
    style.innerHTML = PDF_STYLES;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const handleDeleteInvoice = async () => {
    if (!confirm('Delete this invoice?')) return;
    await deleteInvoice(selectedInvoice.invoice_id, selectedAgent?.agent_id);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold font-zodiak mb-6">View Invoices</h2>
      <div className="grid grid-cols-12 gap-5">

        {/* Agents Column */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-darkgreen/10 flex items-center justify-between">
              <span className="text-sm font-semibold font-jakarta">Agents</span>
              <button onClick={fetchAgents} className="text-darkgreen/50 hover:text-darkgreen transition-all">
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="divide-y divide-darkgreen/10">
              {agents.length === 0 ? (
                <p className="text-center py-6 text-sm text-darkgreen/40 font-jakarta">No agents</p>
              ) : agents.map((agent) => (
                <button
                  key={agent.agent_id}
                  onClick={() => handleSelectAgent(agent)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all hover:bg-darkgreen/5 ${selectedAgent?.agent_id === agent.agent_id ? 'bg-darkgreen/10 font-semibold' : ''}`}
                >
                  <div>
                    <p className="text-sm font-jakarta font-semibold text-darkgreen">{agent.name}</p>
                    <p className="text-xs text-darkgreen/40 font-jakarta">{agent._count?.invoices || 0} invoices</p>
                  </div>
                  <ChevronRight size={14} className="text-darkgreen/30" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Invoices List Column */}
        <div className="col-span-12 md:col-span-3">
          {selectedAgent ? (
            <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-darkgreen/10">
                <span className="text-sm font-semibold font-jakarta">{selectedAgent.name}'s Invoices</span>
              </div>
              <div className="divide-y divide-darkgreen/10 max-h-[70vh] overflow-y-auto">
                {isLoading ? (
                  <div className="py-6 text-center text-sm text-darkgreen/40 font-jakarta">Loading...</div>
                ) : invoices.length === 0 ? (
                  <div className="py-8 text-center text-sm text-darkgreen/40 font-jakarta">No invoices yet</div>
                ) : invoices.map((inv) => (
                  <button
                    key={inv.invoice_id}
                    onClick={() => handleSelectInvoice(inv)}
                    className={`w-full text-left px-4 py-3 transition-all hover:bg-darkgreen/5 ${selectedInvoice?.invoice_id === inv.invoice_id ? 'bg-darkgreen/10' : ''}`}
                  >
                    <p className="text-sm font-jakarta font-semibold text-darkgreen">{inv.invoice_number}</p>
                    <p className="text-xs text-darkgreen/40 font-jakarta">{new Date(inv.invoice_date).toLocaleDateString('en-IN')}</p>
                    <div className={`text-xs font-jakarta mt-1 font-semibold ${inv.balance > 0 ? 'text-red-500' : 'text-green-600'}`}>
                      Balance: ₹{fmt(inv.balance)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-darkgreen/15 rounded-xl p-8 text-center text-sm text-darkgreen/40 font-jakarta">
              Select an agent to view invoices
            </div>
          )}
        </div>

        {/* Invoice Detail Column */}
        <div className="col-span-12 md:col-span-6">
          {selectedInvoice ? (
            <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden">
              {/* Action Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-darkgreen/10">
                <div>
                  <p className="font-zodiak font-semibold text-darkgreen">{selectedInvoice.invoice_number}</p>
                  <p className="text-xs font-jakarta text-darkgreen/50">{new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={handlePrint} className="flex items-center gap-1.5 text-xs font-jakarta font-semibold bg-darkgreen text-peach px-3 py-2 rounded-lg hover:bg-darkgreen/90 transition-all">
                    <Download size={14} /> PDF
                  </button>
                  <button onClick={handleDeleteInvoice} className="flex items-center gap-1.5 text-xs font-jakarta font-semibold border border-red-200 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 border-b border-darkgreen/10">
                {[
                  { label: 'Total Amount', value: `₹${fmt(selectedInvoice.totalServices)}`, color: 'text-darkgreen' },
                  { label: 'Amount Paid', value: `₹${fmt(selectedInvoice.totalPaid)}`, color: 'text-green-600' },
                  { label: 'Balance Due', value: `₹${fmt(selectedInvoice.balance)}`, color: selectedInvoice.balance > 0 ? 'text-red-500' : 'text-green-600' },
                ].map((card) => (
                  <div key={card.label} className="px-4 py-3 text-center border-r last:border-r-0 border-darkgreen/10">
                    <p className="text-xs font-jakarta text-darkgreen/50">{card.label}</p>
                    <p className={`font-zodiak font-semibold text-sm ${card.color}`}>{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div className="px-5 py-4 border-b border-darkgreen/10">
                <p className="text-xs font-semibold font-jakarta text-darkgreen/50 uppercase tracking-wide mb-3">Services</p>
                <div className="space-y-2">
                  {selectedInvoice.items?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-darkgreen/5 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-sm font-jakarta font-semibold text-darkgreen">{item.particulars}</p>
                        <p className="text-xs text-darkgreen/50 font-jakarta">{item.pax_quantity} PAX × ₹{fmt(item.rate_per_pax)}</p>
                      </div>
                      <p className="font-zodiak font-semibold text-sm text-darkgreen">₹{fmt(item.total_amount)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payments */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold font-jakarta text-darkgreen/50 uppercase tracking-wide">Payments</p>
                  <button
                    onClick={() => setShowPaymentForm(!showPaymentForm)}
                    className="flex items-center gap-1 text-xs font-jakarta font-semibold text-darkgreen border border-darkgreen/30 px-2.5 py-1.5 rounded-lg hover:bg-darkgreen/5 transition-all"
                  >
                    {showPaymentForm ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Add Payment</>}
                  </button>
                </div>

                {/* Add Payment Form */}
                {showPaymentForm && (
                  <div className="bg-darkgreen/5 rounded-xl p-4 mb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-jakarta text-darkgreen/60 mb-1 block">Date *</label>
                        <input
                          type="date"
                          value={paymentForm.payment_date}
                          onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
                          className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-jakarta text-darkgreen/60 mb-1 block">Amount (₹) *</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={paymentForm.amount_paid}
                          onChange={(e) => setPaymentForm({ ...paymentForm, amount_paid: e.target.value })}
                          className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-jakarta text-darkgreen/60 mb-1 block">Received By *</label>
                      <select
                        value={paymentForm.received_by}
                        onChange={(e) => setPaymentForm({ ...paymentForm, received_by: e.target.value })}
                        className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                      >
                        <option>MEMON</option>
                        <option>CASH IN INR (MEMON OFFICE)</option>
                        <option>BANK TRANSFER</option>
                        <option>UPI</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Notes (optional)"
                      value={paymentForm.notes}
                      onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                      className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                    />
                    <button
                      onClick={handleAddPayment}
                      disabled={isLoading}
                      className="w-full bg-darkgreen text-peach font-jakarta font-semibold py-2.5 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all text-sm"
                    >
                      {isLoading ? 'Recording...' : 'Record Payment'}
                    </button>
                  </div>
                )}

                {/* Payments List */}
                {selectedInvoice.payments?.length === 0 ? (
                  <p className="text-center py-4 text-sm text-darkgreen/40 font-jakarta">No payments recorded</p>
                ) : (
                  <div className="space-y-2">
                    {selectedInvoice.payments?.map((payment, i) => (
                      <div key={i} className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2">
                        <div>
                          <p className="text-sm font-jakarta font-semibold text-darkgreen">{new Date(payment.payment_date).toLocaleDateString('en-IN')}</p>
                          <p className="text-xs text-darkgreen/50 font-jakarta">{payment.received_by}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-zodiak font-semibold text-sm text-green-700">₹{fmt(payment.amount_paid)}</p>
                          <button
                            onClick={() => deletePayment(payment.payment_id, selectedInvoice.invoice_id)}
                            className="text-red-400 hover:text-red-600 transition-all"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-darkgreen/15 rounded-xl p-12 text-center text-sm text-darkgreen/40 font-jakarta">
              Select an invoice to view details
            </div>
          )}
        </div>
      </div>

      {/* Hidden print view */}
      {selectedInvoice && (
        <div className="hidden print:block">
          <InvoicePrintView invoice={selectedInvoice} />
        </div>
      )}
    </div>
  );
};

export default ViewInvoices;
