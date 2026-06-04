import { useEffect, useState } from 'react';
import { Trash2, Plus, X, Download, ChevronRight, RefreshCw, Mail, MessageCircle } from 'lucide-react';
import useInvoiceStore from '../store/useInvoiceStore';
import logo from '../../assets/img/logo.png';
import logoName from '../../assets/img/logoname.png';

const GREEN = '#1B5E3B';
const GREEN_DARK = '#0F3D25';
const GREEN_LIGHT = '#E8F5EE';
const GREEN_MID = '#C8E6D4';

const MEMON_BANK_DETAILS = [
  {
    bank_name: 'BANK OF BARODA',
    account_holder: 'MEMON HAJ UMRAH TOURS AND TRAVELS',
    account_number: '45810200000462',
    branch: 'MIRA BHAYANDAR',
    ifsc_code: 'BARB0MIRBHA',
  },
  {
    bank_name: 'BOMBAY MERCANTILE BANK',
    account_holder: 'MEMON HAJ UMRAH TOURS AND TRAVELS',
    account_number: '010110100090937',
    branch: 'MAULANA AZAD ROAD, MUMBAI',
    ifsc_code: 'BMCB0000010',
  },
];

const TERMS = [
  'Any additional cost due to flight cancellations, delays, visa changes, currency fluctuations, or government policies will not be borne by our company.',
  'Agents will be responsible for extra expenses arising from unforeseen international or operational situations.',
  'Package and service rates are subject to change as per airline, visa, and Saudi authority updates.',
  'In case of extended stay due to disruptions or rescheduled flights, all additional expenses shall be chargeable accordingly.',
  'By confirming the booking, the agent agrees and accepts all above terms, conditions, and operational policies.',
];

const fmt = (num) =>
  parseFloat(num || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── Invoice PDF Template ─────────────────────────────────────────────────────
const InvoiceTemplate = ({ invoice, logoUrl, logoNameUrl }) => {
  const totalServices = invoice.totalServices || 0;
  const totalPaid     = invoice.totalPaid     || 0;
  const balance       = invoice.balance       || 0;

  // Invoice creation date — never changes
  const invoiceDate = new Date(invoice.invoice_date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const TH = (extra = {}) => ({
    padding: '9px 11px',
    background: GREEN_DARK,
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: '11px',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    border: `1px solid ${GREEN_DARK}`,
    ...extra,
  });

  const TD = (extra = {}) => ({
    padding: '8px 11px',
    border: `1px solid ${GREEN_MID}`,
    fontSize: '12px',
    fontWeight: '700',
    color: '#0a0a0a',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    ...extra,
  });

  const EVEN = { background: GREEN_LIGHT };
  const ODD  = { background: '#FFFFFF' };

  return (
    <div
      id="invoice-template"
      style={{ fontFamily: '"Arial Black", Arial, sans-serif', color: '#0a0a0a', padding: '28px 32px', width: '900px', background: '#fff' }}
    >
      {/* ── HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN_DARK}`, paddingBottom: '18px', marginBottom: '22px' }}>
        
        {/* Logo + Company Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Circle Logo */}
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Memon Logo"
              style={{ height: '72px', width: '72px', objectFit: 'contain', flexShrink: 0 }}
              crossOrigin="anonymous"
            />
          )}
          {/* Name Logo + Details */}
          <div>
            {logoNameUrl && (
              <img
                src={logoNameUrl}
                alt="Memon Haj Umrah Tours"
                style={{ height: '42px', objectFit: 'contain', display: 'block', marginBottom: '6px' }}
                crossOrigin="anonymous"
              />
            )}
            <div style={{ fontSize: '10.5px', color: '#2a2a2a', lineHeight: '1.7', fontWeight: '700', fontFamily: 'Arial, sans-serif' }}>
              <span>6/A, ASMITA ASHIRWAD APT, NAYA NAGAR, OPP ASMITA CLUB, MIRA ROAD(E), THANE-401107</span><br />
              <span><strong>PH:</strong> 8108404376 &nbsp;|&nbsp; 9022549162 &nbsp;|&nbsp; 7977215388 &nbsp;|&nbsp; <strong>EMAIL:</strong> memonhajumrahtours@gmail.com</span><br />
              <span><strong>GST NO:</strong> 27ABXFM6264E1ZP</span>
            </div>
          </div>
        </div>

        {/* Invoice Meta Box */}
        <div style={{ background: GREEN_DARK, color: '#fff', padding: '12px 18px', borderRadius: '10px', textAlign: 'right', minWidth: '220px', flexShrink: 0 }}>
          <div style={{ fontWeight: '900', fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            INVOICE: {invoice.invoice_number}
          </div>
          <div style={{ marginTop: '6px', fontSize: '11px', fontWeight: '700', opacity: 0.9 }}>
            DATE: {invoiceDate}
          </div>
          <div style={{ fontSize: '11px', fontWeight: '700', opacity: 0.9 }}>
            HIJRI: {invoice.hijri_year}
          </div>
        </div>
      </div>

      {/* ── BILL TO + SUMMARY ── */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '22px' }}>
        {/* Bill To */}
        <div style={{ flex: 1, border: `2px solid ${GREEN_DARK}`, borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: GREEN_DARK, color: '#fff', padding: '7px 12px', fontWeight: '900', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            BILL TO
          </div>
          <div style={{ padding: '12px 14px' }}>
            <div style={{ fontWeight: '900', fontSize: '16px', color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{invoice.agent?.name}</div>
            {invoice.agent?.phone   && <div style={{ fontSize: '12px', color: '#1a1a1a', fontWeight: '700' }}>PH: {invoice.agent.phone}</div>}
            {invoice.agent?.email   && <div style={{ fontSize: '12px', color: '#1a1a1a', fontWeight: '700' }}>EMAIL: {invoice.agent.email}</div>}
            {invoice.agent?.address && <div style={{ fontSize: '12px', color: '#1a1a1a', fontWeight: '700' }}>{invoice.agent.address.toUpperCase()}</div>}
          </div>
        </div>

        {/* Summary */}
        <div style={{ minWidth: '260px', border: `2px solid ${GREEN_DARK}`, borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: GREEN_DARK, color: '#fff', padding: '7px 12px', fontWeight: '900', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            SUMMARY
          </div>
          <div style={{ padding: '12px 14px', background: GREEN_LIGHT }}>
            {[
              ['AMOUNT RECEIVED', `₹${fmt(totalPaid)}`],
              ['BALANCE AMOUNT',  `₹${fmt(balance)}`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${GREEN_MID}` }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</span>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#0a0a0a' }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0 0', marginTop: '2px' }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: GREEN_DARK, textTransform: 'uppercase', letterSpacing: '0.5px' }}>TOTAL AMOUNT</span>
              <span style={{ fontSize: '14px', fontWeight: '900', color: GREEN_DARK }}>₹{fmt(totalServices)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLES ── */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '22px', alignItems: 'flex-start' }}>

        {/* Services */}
        <div style={{ flex: '0 0 54%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${GREEN_DARK}` }}>
            <thead>
              <tr>
                <th style={TH({ textAlign: 'center', width: '6%' })}>SR</th>
                <th style={TH({ textAlign: 'left' })}>PARTICULARS</th>
                <th style={TH({ textAlign: 'center', width: '10%' })}>PAX</th>
                <th style={TH({ textAlign: 'right', width: '14%' })}>RATE</th>
                <th style={TH({ textAlign: 'right', width: '16%' })}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item, i) => (
                <tr key={i} style={i % 2 === 0 ? EVEN : ODD}>
                  <td style={TD({ textAlign: 'center' })}>{i + 1}</td>
                  <td style={TD({ fontWeight: '800' })}>{item.particulars?.toUpperCase()}</td>
                  <td style={TD({ textAlign: 'center', fontWeight: '800' })}>{item.pax_quantity}</td>
                  <td style={TD({ textAlign: 'right' })}>₹{fmt(item.rate_per_pax)}</td>
                  <td style={TD({ textAlign: 'right', fontWeight: '900', color: GREEN_DARK, background: i % 2 === 0 ? '#d4eddf' : '#e8f5ee' })}>₹{fmt(item.total_amount)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} style={{ padding: '9px 11px', fontWeight: '900', fontSize: '12px', color: '#fff', textAlign: 'right', background: GREEN_DARK, textTransform: 'uppercase', letterSpacing: '0.5px' }}>GRAND TOTAL</td>
                <td style={{ padding: '9px 11px', fontWeight: '900', fontSize: '14px', color: '#fff', textAlign: 'right', background: GREEN_DARK }}>₹{fmt(totalServices)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payments */}
        <div style={{ flex: '0 0 44%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${GREEN_DARK}` }}>
            <thead>
              <tr>
                <th style={TH({ textAlign: 'left' })}>DATE</th>
                <th style={TH({ textAlign: 'right' })}>AMOUNT</th>
                <th style={TH({ textAlign: 'left' })}>RECEIVED BY</th>
              </tr>
            </thead>
            <tbody>
              {invoice.payments?.length > 0
                ? invoice.payments.map((p, i) => (
                    <tr key={i} style={i % 2 === 0 ? EVEN : ODD}>
                      <td style={TD()}>{new Date(p.payment_date).toLocaleDateString('en-IN')}</td>
                      <td style={TD({ textAlign: 'right', fontWeight: '900', color: '#0a5c2e' })}>₹{fmt(p.amount_paid)}</td>
                      <td style={TD({ fontWeight: '800' })}>{p.received_by?.toUpperCase()}</td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td colSpan={3} style={{ padding: '14px', color: '#888', textAlign: 'center', border: `1px solid ${GREEN_MID}`, fontStyle: 'italic', fontSize: '11px' }}>NO PAYMENTS RECORDED</td>
                  </tr>
                )}
              <tr>
                <td style={{ padding: '9px 11px', fontWeight: '900', fontSize: '12px', color: '#fff', textAlign: 'right', background: GREEN_DARK, textTransform: 'uppercase', letterSpacing: '0.5px' }}>TOTAL PAID</td>
                <td style={{ padding: '9px 11px', fontWeight: '900', fontSize: '14px', color: '#fff', textAlign: 'right', background: GREEN_DARK }}>₹{fmt(totalPaid)}</td>
                <td style={{ background: GREEN_DARK, border: `1px solid ${GREEN_DARK}` }}></td>
              </tr>
            </tbody>
          </table>

          {/* Balance chip */}
          <div style={{
            marginTop: '10px', padding: '10px 14px', borderRadius: '8px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: parseFloat(balance) > 0 ? '#FFF0F0' : '#F0FDF4',
            border: `2px solid ${parseFloat(balance) > 0 ? '#dc2626' : '#16a34a'}`,
          }}>
            <span style={{ fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: parseFloat(balance) > 0 ? '#b91c1c' : '#15803d' }}>BALANCE DUE</span>
            <span style={{ fontWeight: '900', fontSize: '16px', color: parseFloat(balance) > 0 ? '#b91c1c' : '#15803d' }}>₹{fmt(balance)}</span>
          </div>
        </div>
      </div>

      {/* ── BANK DETAILS ── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: '900', fontSize: '11px', letterSpacing: '1px', color: GREEN_DARK, textTransform: 'uppercase', marginBottom: '8px' }}>ACCOUNT DETAILS — PAY TO</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {MEMON_BANK_DETAILS.map((bank, i) => (
            <div key={i} style={{ flex: 1, border: `2px solid ${GREEN_DARK}`, borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ background: GREEN_DARK, color: '#fff', padding: '7px 12px', fontWeight: '900', fontSize: '11px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{bank.bank_name}</div>
              <div style={{ padding: '10px 12px', background: GREEN_LIGHT }}>
                {[
                  ['A/C NAME',   bank.account_holder],
                  ['A/C NUMBER', bank.account_number],
                  ['BRANCH',     bank.branch],
                  ['IFSC CODE',  bank.ifsc_code],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#444', fontWeight: '800', fontSize: '11px', minWidth: '85px', textTransform: 'uppercase' }}>{label}:</span>
                    <span style={{ fontWeight: '900', color: '#0a0a0a', fontSize: '11px', textTransform: 'uppercase' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TERMS ── */}
      <div style={{ border: `2px solid ${GREEN_DARK}`, borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: GREEN_DARK, color: '#fff', padding: '7px 12px', fontWeight: '900', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          TERMS & CONDITIONS
        </div>
        <div style={{ padding: '12px 16px', background: GREEN_LIGHT }}>
          <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc' }}>
            {TERMS.map((term, i) => (
              <li key={i} style={{ fontSize: '10.5px', color: '#0a0a0a', fontWeight: '700', lineHeight: '1.7', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.2px' }}>{term}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: '12px', textAlign: 'right', fontSize: '9.5px', color: '#888', fontFamily: 'Arial, sans-serif' }}>
        Generated on {new Date().toLocaleString('en-IN')} &nbsp;|&nbsp; MEMON HAJ UMRAH TOURS & TRAVELS
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ViewInvoices = () => {
  const {
    agents, invoices, selectedAgent, selectedInvoice, isLoading,
    fetchAgents, fetchAgentInvoices, fetchInvoiceById,
    setSelectedAgent, deleteInvoice, addPayment, deletePayment,
  } = useInvoiceStore();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ payment_date: '', amount_paid: '', received_by: 'MEMON', notes: '' });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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

  // ── Direct PDF Download ──
  const handleDownloadPDF = async () => {
    if (!selectedInvoice || isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    try {
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 600));
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF }       = await import('jspdf');
      const element = document.getElementById('invoice-template');
      const canvas  = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 5000,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.97);
      const pdf     = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pw      = pdf.internal.pageSize.getWidth();
      const ph      = pdf.internal.pageSize.getHeight();
      const iw      = pw - 10;
      const ih      = Math.min((canvas.height * iw) / canvas.width, ph - 10);
      pdf.addImage(imgData, 'JPEG', 5, 5, iw, ih);
      pdf.save(`${selectedInvoice.invoice_number}.pdf`);
    } catch (err) {
      alert('PDF generation failed: ' + err.message);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // ── WhatsApp ──
  const handleWhatsApp = () => {
    if (!selectedInvoice) return;
    const phone = selectedInvoice.agent?.phone?.replace(/\D/g, '');
    const msg   = encodeURIComponent(
      `*MEMON HAJ UMRAH TOURS & TRAVELS*\n\nInvoice: *${selectedInvoice.invoice_number}*\nDate: ${new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')}\n\nDear *${selectedInvoice.agent?.name}*,\n\n💰 Total Amount: *₹${fmt(selectedInvoice.totalServices)}*\n✅ Amount Received: ₹${fmt(selectedInvoice.totalPaid)}\n⚠️ Balance Due: *₹${fmt(selectedInvoice.balance)}*\n\nBank Details:\n1️⃣ Bank of Baroda | A/C: 45810200000462 | IFSC: BARB0MIRBHA\n2️⃣ Bombay Mercantile Bank | A/C: 010110100090937 | IFSC: BMCB0000010\n\nThank you.`
    );
    window.open(phone ? `https://wa.me/91${phone}?text=${msg}` : `https://wa.me/?text=${msg}`, '_blank');
  };

  // ── Email ──
  const handleEmail = () => {
    if (!selectedInvoice) return;
    const subject = encodeURIComponent(`Invoice ${selectedInvoice.invoice_number} — Memon Haj Umrah Tours`);
    const body    = encodeURIComponent(
      `Dear ${selectedInvoice.agent?.name},\n\nInvoice No : ${selectedInvoice.invoice_number}\nDate       : ${new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')}\n\nTotal Amount   : ₹${fmt(selectedInvoice.totalServices)}\nAmount Received: ₹${fmt(selectedInvoice.totalPaid)}\nBalance Due    : ₹${fmt(selectedInvoice.balance)}\n\nBank Details:\n1. Bank of Baroda | A/C: 45810200000462 | IFSC: BARB0MIRBHA\n2. Bombay Mercantile Bank | A/C: 010110100090937 | IFSC: BMCB0000010\n\nRegards,\nMemon Haj Umrah Tours & Travels\n8108404376 | 9022549162 | 7977215388`
    );
    window.location.href = `mailto:${selectedInvoice.agent?.email || ''}?subject=${subject}&body=${body}`;
  };

  const handleDeleteInvoice = async () => {
    if (!confirm('Delete this invoice? This cannot be undone.')) return;
    await deleteInvoice(selectedInvoice.invoice_id, selectedAgent?.agent_id);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold font-zodiak mb-6">View Invoices</h2>
      <div className="grid grid-cols-12 gap-5">

        {/* Agents */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-darkgreen/10 flex items-center justify-between">
              <span className="text-sm font-semibold font-jakarta">Agents</span>
              <button onClick={fetchAgents} className="text-darkgreen/50 hover:text-darkgreen transition-all"><RefreshCw size={14} /></button>
            </div>
            <div className="divide-y divide-darkgreen/10">
              {agents.length === 0
                ? <p className="text-center py-6 text-sm text-darkgreen/40 font-jakarta">No agents</p>
                : agents.map((agent) => (
                    <button key={agent.agent_id} onClick={() => handleSelectAgent(agent)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all hover:bg-darkgreen/5 ${selectedAgent?.agent_id === agent.agent_id ? 'bg-darkgreen/10' : ''}`}>
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

        {/* Invoices List */}
        <div className="col-span-12 md:col-span-3">
          {selectedAgent ? (
            <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-darkgreen/10">
                <span className="text-sm font-semibold font-jakarta">{selectedAgent.name}</span>
              </div>
              <div className="divide-y divide-darkgreen/10 max-h-[70vh] overflow-y-auto">
                {isLoading
                  ? <div className="py-6 text-center text-sm text-darkgreen/40 font-jakarta">Loading...</div>
                  : invoices.length === 0
                    ? <div className="py-8 text-center text-sm text-darkgreen/40 font-jakarta">No invoices yet</div>
                    : invoices.map((inv) => (
                        <button key={inv.invoice_id} onClick={() => handleSelectInvoice(inv)}
                          className={`w-full text-left px-4 py-3 transition-all hover:bg-darkgreen/5 ${selectedInvoice?.invoice_id === inv.invoice_id ? 'bg-darkgreen/10' : ''}`}>
                          <p className="text-sm font-jakarta font-semibold text-darkgreen">{inv.invoice_number}</p>
                          <p className="text-xs text-darkgreen/40 font-jakarta">{new Date(inv.invoice_date).toLocaleDateString('en-IN')}</p>
                          <div className={`text-xs font-jakarta mt-1 font-semibold ${parseFloat(inv.balance) > 0 ? 'text-red-500' : 'text-green-600'}`}>
                            Bal: ₹{fmt(inv.balance)}
                          </div>
                        </button>
                      ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-darkgreen/15 rounded-xl p-8 text-center text-sm text-darkgreen/40 font-jakarta">Select an agent</div>
          )}
        </div>

        {/* Invoice Detail */}
        <div className="col-span-12 md:col-span-6">
          {selectedInvoice ? (
            <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden">
              {/* Action Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-darkgreen/10 flex-wrap gap-2">
                <div>
                  <p className="font-zodiak font-semibold text-darkgreen">{selectedInvoice.invoice_number}</p>
                  <p className="text-xs font-jakarta text-darkgreen/50">{new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={handleDownloadPDF} disabled={isGeneratingPDF}
                    className="flex items-center gap-1.5 text-xs font-jakarta font-semibold bg-darkgreen text-peach px-3 py-2 rounded-lg hover:bg-darkgreen/90 disabled:opacity-60 transition-all">
                    <Download size={14} /> {isGeneratingPDF ? 'Generating...' : 'PDF'}
                  </button>
                  <button onClick={handleWhatsApp}
                    className="flex items-center gap-1.5 text-xs font-jakarta font-semibold bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#1ebe5d] transition-all">
                    <MessageCircle size={14} /> WhatsApp
                  </button>
                  <button onClick={handleEmail}
                    className="flex items-center gap-1.5 text-xs font-jakarta font-semibold bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all">
                    <Mail size={14} /> Email
                  </button>
                  <button onClick={handleDeleteInvoice}
                    className="flex items-center gap-1.5 text-xs font-jakarta font-semibold border border-red-200 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 border-b border-darkgreen/10">
                {[
                  { label: 'Total Amount', value: `₹${fmt(selectedInvoice.totalServices)}`, color: 'text-darkgreen' },
                  { label: 'Amount Paid',  value: `₹${fmt(selectedInvoice.totalPaid)}`,     color: 'text-green-700' },
                  { label: 'Balance Due',  value: `₹${fmt(selectedInvoice.balance)}`,        color: parseFloat(selectedInvoice.balance) > 0 ? 'text-red-600' : 'text-green-700' },
                ].map((card) => (
                  <div key={card.label} className="px-4 py-3 text-center border-r last:border-r-0 border-darkgreen/10">
                    <p className="text-xs font-jakarta text-darkgreen/50">{card.label}</p>
                    <p className={`font-zodiak font-bold text-sm ${card.color}`}>{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div className="px-5 py-4 border-b border-darkgreen/10">
                <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide mb-3">Services</p>
                <div className="space-y-2">
                  {selectedInvoice.items?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-darkgreen/5 rounded-lg px-3 py-2 border border-darkgreen/10">
                      <div>
                        <p className="text-sm font-jakarta font-bold text-darkgreen">{item.particulars}</p>
                        <p className="text-xs text-darkgreen/50 font-jakarta">{item.pax_quantity} PAX × ₹{fmt(item.rate_per_pax)}</p>
                      </div>
                      <p className="font-zodiak font-bold text-sm text-darkgreen">₹{fmt(item.total_amount)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payments */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Payments</p>
                  <button onClick={() => setShowPaymentForm(!showPaymentForm)}
                    className="flex items-center gap-1 text-xs font-jakarta font-semibold text-darkgreen border border-darkgreen/30 px-2.5 py-1.5 rounded-lg hover:bg-darkgreen/5 transition-all">
                    {showPaymentForm ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Add Payment</>}
                  </button>
                </div>

                {showPaymentForm && (
                  <div className="bg-darkgreen/5 rounded-xl p-4 mb-4 space-y-3 border border-darkgreen/10">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-jakarta font-semibold text-darkgreen/60 mb-1 block">Date *</label>
                        <input type="date" value={paymentForm.payment_date}
                          onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
                          className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white" />
                      </div>
                      <div>
                        <label className="text-xs font-jakarta font-semibold text-darkgreen/60 mb-1 block">Amount (₹) *</label>
                        <input type="number" placeholder="0" value={paymentForm.amount_paid}
                          onChange={(e) => setPaymentForm({ ...paymentForm, amount_paid: e.target.value })}
                          className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                          min="0" step="0.01" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-jakarta font-semibold text-darkgreen/60 mb-1 block">Received By *</label>
                      <select value={paymentForm.received_by}
                        onChange={(e) => setPaymentForm({ ...paymentForm, received_by: e.target.value })}
                        className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white">
                        <option>MEMON</option>
                        <option>CASH IN INR (MEMON OFFICE)</option>
                        <option>BANK TRANSFER</option>
                        <option>UPI</option>
                      </select>
                    </div>
                    <input type="text" placeholder="Notes (optional)" value={paymentForm.notes}
                      onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                      className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white" />
                    <button onClick={handleAddPayment} disabled={isLoading}
                      className="w-full bg-darkgreen text-peach font-jakarta font-bold py-2.5 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all text-sm">
                      {isLoading ? 'Recording...' : 'Record Payment'}
                    </button>
                  </div>
                )}

                {selectedInvoice.payments?.length === 0
                  ? <p className="text-center py-4 text-sm text-darkgreen/40 font-jakarta italic">No payments recorded</p>
                  : (
                    <div className="space-y-2">
                      {selectedInvoice.payments?.map((payment, i) => (
                        <div key={i} className="flex items-center justify-between bg-green-50 rounded-lg px-3 py-2 border border-green-100">
                          <div>
                            <p className="text-sm font-jakarta font-bold text-darkgreen">{new Date(payment.payment_date).toLocaleDateString('en-IN')}</p>
                            <p className="text-xs text-darkgreen/50 font-jakarta">{payment.received_by}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-zodiak font-bold text-sm text-green-700">₹{fmt(payment.amount_paid)}</p>
                            <button onClick={() => deletePayment(payment.payment_id, selectedInvoice.invoice_id)}
                              className="text-red-400 hover:text-red-600 transition-all">
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

      {/* Hidden template for PDF — preloaded so html2canvas captures correctly */}
      {selectedInvoice && (
        <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }} aria-hidden="true">
          <InvoiceTemplate invoice={selectedInvoice} logoUrl={logo} logoNameUrl={logoName} />
        </div>
      )}
    </div>
  );
};

export default ViewInvoices;
