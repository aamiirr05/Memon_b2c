import { useEffect, useState } from 'react';
import { Trash2, Plus, X, Download, ChevronRight, RefreshCw, Mail, MessageCircle, Eye, Edit2, FileSpreadsheet } from 'lucide-react';
import useInvoiceStore from '../store/useInvoiceStore';
import logo from '../../assets/img/logo.png';
import logoName from '../../assets/img/logoname.png';

// ─── Brand Tokens (matching website exactly) ──────────────────────────────────
const B = {
  green:      '#386641',
  greenDark:  '#2d5235',
  greenLight: '#eef4ef',
  greenMid:   '#c8deca',
  peach:      '#F2E8CF',
  peachDark:  '#e0d0a8',
  peachLight: '#FAF6ED',
  maroon:     '#BC4749',
  white:      '#FFFFFF',
  ink:        '#1a1a1a',
  inkMid:     '#3d3d3d',
  inkLight:   '#6b7280',
};

const MEMON_BANK = [
  {
    name: 'BANK OF BARODA',
    holder: 'MEMON HAJ UMRAH TOURS AND TRAVELS',
    account: '45810200000462',
    branch: 'MIRA BHAYANDAR',
    ifsc: 'BARB0MIRBHA',
  },
  {
    name: 'BOMBAY MERCANTILE BANK',
    holder: 'MEMON HAJ UMRAH TOURS AND TRAVELS',
    account: '010110100090937',
    branch: 'MAULANA AZAD ROAD, MUMBAI',
    ifsc: 'BMCB0000010',
  },
];

const TERMS = [
  'Any additional cost due to flight cancellations, delays, visa changes, currency fluctuations, or government policies will not be borne by our company.',
  'Agents will be responsible for extra expenses arising from unforeseen international or operational situations.',
  'Package and service rates are subject to change as per airline, visa, and Saudi authority updates.',
  'In case of extended stay due to disruptions or rescheduled flights, all additional expenses shall be chargeable accordingly.',
  'By confirming the booking, the agent agrees and accepts all above terms, conditions, and operational policies.',
];

const fmt = (n) =>
  parseFloat(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── Invoice Template ─────────────────────────────────────────────────────────
export const InvoiceTemplate = ({ invoice, logoUrl, logoNameUrl }) => {
  const total   = invoice.totalServices || 0;
  const paid    = invoice.totalPaid     || 0;
  const balance = invoice.balance       || 0;
  const date    = new Date(invoice.invoice_date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const s = {
    wrap: {
      fontFamily: '"Plus Jakarta Sans", "Segoe UI", Arial, sans-serif',
      color: B.ink,
      background: B.white,
      width: '860px',
      padding: '32px 36px',
    },
    // Header
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '20px',
      marginBottom: '24px',
      borderBottom: `3px solid ${B.green}`,
    },
    logoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    },
    companyInfo: {
      fontSize: '11px',
      color: B.inkMid,
      lineHeight: '1.8',
      fontWeight: '500',
    },
    invoiceBox: {
      background: B.green,
      color: B.white,
      borderRadius: '10px',
      padding: '14px 20px',
      textAlign: 'right',
      minWidth: '210px',
    },
    // Sections
    sectionLabel: {
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: B.green,
      borderBottom: `2px solid ${B.green}`,
      paddingBottom: '5px',
      marginBottom: '10px',
    },
    // Table
    th: {
      padding: '10px 12px',
      background: B.green,
      color: B.white,
      fontWeight: '700',
      fontSize: '10.5px',
      letterSpacing: '0.8px',
      textTransform: 'uppercase',
      textAlign: 'center',
      border: `1px solid ${B.greenDark}`,
    },
    td: (i, align = 'center') => ({
      padding: '9px 12px',
      fontSize: '12px',
      fontWeight: '600',
      color: B.ink,
      textAlign: align,
      border: `1px solid ${B.greenMid}`,
      background: i % 2 === 0 ? B.peachLight : B.white,
      textTransform: 'uppercase',
    }),
  };

  return (
    <div id="invoice-template" style={s.wrap}>

      {/* ── HEADER ── */}
      <div style={s.header}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Both logos on the same line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {logoUrl && (
              <img src={logoUrl} alt="" crossOrigin="anonymous"
                style={{ height: '64px', width: '64px', objectFit: 'contain', flexShrink: 0 }} />
            )}
            {logoNameUrl && (
              <img src={logoNameUrl} alt="Memon Haj Umrah Tours" crossOrigin="anonymous"
                style={{ height: '52px', objectFit: 'contain', flexShrink: 0 }} />
            )}
          </div>
          {/* Company info below both logos */}
          <div style={s.companyInfo}>
            <div>6/A, Asmita Ashirwad Apt, Naya Nagar, Opp Asmita Club, Mira Road(E), Thane - 401107</div>
            <div><b>Ph:</b> +91 81084 04376 &nbsp;|&nbsp; +91 90225 49162 &nbsp;|&nbsp; +91 79772 15388</div>
            <div><b>Email:</b> memonhajumrahtours@gmail.com &nbsp;|&nbsp; <b>Web:</b> memonhajumrahtours.com</div>
            <div><b>GST No:</b> 27ABXFM6264E1ZP</div>
          </div>
        </div>

        <div style={s.invoiceBox}>
          <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.8, letterSpacing: '0.5px' }}>TAX INVOICE</div>
          <div style={{ fontSize: '15px', fontWeight: '800', marginTop: '4px', letterSpacing: '0.3px' }}>
            {invoice.invoice_number}
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.25)', margin: '8px 0' }} />
          <div style={{ fontSize: '11px', fontWeight: '600' }}>DATE: {date}</div>
          <div style={{ fontSize: '11px', fontWeight: '600', marginTop: '2px' }}>HIJRI: {invoice.hijri_year}</div>
        </div>
      </div>

      {/* ── BILL TO + SUMMARY ── */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>

        {/* Bill To */}
        <div style={{ flex: 1, border: `2px solid ${B.greenMid}`, borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ background: B.green, padding: '8px 14px' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: B.peach }}>
              Bill To
            </div>
          </div>
          <div style={{ padding: '14px 16px', background: B.peachLight }}>
            <div style={{ fontSize: '16px', fontWeight: '800', color: B.ink, textTransform: 'uppercase', marginBottom: '6px' }}>
              {invoice.agent?.name}
            </div>
            {invoice.agent?.phone && (
              <div style={{ fontSize: '12px', color: B.inkMid, fontWeight: '600', marginBottom: '2px' }}>
                📞 {invoice.agent.phone}
              </div>
            )}
            {invoice.agent?.email && (
              <div style={{ fontSize: '12px', color: B.inkMid, fontWeight: '600', marginBottom: '2px' }}>
                ✉️ {invoice.agent.email}
              </div>
            )}
            {invoice.agent?.address && (
              <div style={{ fontSize: '12px', color: B.inkMid, fontWeight: '600' }}>
                📍 {invoice.agent.address}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div style={{ minWidth: '260px', border: `2px solid ${B.greenMid}`, borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ background: B.green, padding: '8px 14px' }}>
            <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: B.peach }}>
              Payment Summary
            </div>
          </div>
          <div style={{ padding: '14px 16px', background: B.peachLight }}>
            {[
              ['Amount Received', `₹${fmt(paid)}`, B.green],
              ['Balance Amount', `₹${fmt(balance)}`, balance > 0 ? B.maroon : B.green],
            ].map(([label, val, color]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: `1px solid ${B.peachDark}` }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: B.inkMid }}>{label}</span>
                <span style={{ fontSize: '12px', fontWeight: '800', color }}>{val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0 2px', borderTop: `2px solid ${B.green}`, marginTop: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: B.green, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Amount</span>
              <span style={{ fontSize: '16px', fontWeight: '900', color: B.green }}>₹{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLES ── */}
      {/* ── TABLES — side-by-side if few payments, stacked if many ── */}
      {invoice.payments?.length <= 5 ? (
        /* Side by side layout */
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>
          {/* Services */}
          <div style={{ flex: '0 0 55%' }}>
            <div style={s.sectionLabel}>Services Provided</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${B.green}` }}>
              <thead>
                <tr>
                  {['SR', 'Particulars', 'PAX', 'Rate', 'Amount'].map((h) => (
                    <th key={h} style={{ ...s.th, textAlign: h === 'Particulars' ? 'left' : 'center', width: h === 'SR' ? '6%' : h === 'Particulars' ? '42%' : '17%' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoice.items?.map((item, i) => (
                  <tr key={i}>
                    <td style={s.td(i)}>{i + 1}</td>
                    <td style={{ ...s.td(i, 'left'), fontWeight: '700' }}>{item.particulars?.toUpperCase()}</td>
                    <td style={s.td(i)}>{item.pax_quantity}</td>
                    <td style={s.td(i)}>₹{fmt(item.rate_per_pax)}</td>
                    <td style={{ ...s.td(i), fontWeight: '800', color: B.green }}>₹{fmt(item.total_amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Payments */}
          <div style={{ flex: '0 0 43%' }}>
            <div style={s.sectionLabel}>Payments Received</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${B.green}` }}>
              <thead>
                <tr>
                  {['Date', 'Amount', 'Received By'].map((h) => (
                    <th key={h} style={{ ...s.th, textAlign: 'center' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoice.payments?.length > 0
                  ? invoice.payments.map((p, i) => (
                      <tr key={i}>
                        <td style={s.td(i)}>{new Date(p.payment_date).toLocaleDateString('en-IN')}</td>
                        <td style={{ ...s.td(i), fontWeight: '800', color: B.green }}>₹{fmt(p.amount_paid)}</td>
                        <td style={s.td(i)}>{p.received_by?.toUpperCase()}</td>
                      </tr>
                    ))
                  : <tr><td colSpan={3} style={{ padding: '16px', textAlign: 'center', color: B.inkLight, fontSize: '12px', fontStyle: 'italic', background: B.peachLight, border: `1px solid ${B.greenMid}` }}>No payments recorded</td></tr>}
              </tbody>
            </table>
            <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: balance > 0 ? '#fff5f5' : '#f0fdf4', border: `2px solid ${balance > 0 ? B.maroon : B.green}` }}>
              <span style={{ fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', color: balance > 0 ? B.maroon : B.green }}>Balance Due</span>
              <span style={{ fontWeight: '900', fontSize: '17px', color: balance > 0 ? B.maroon : B.green }}>₹{fmt(balance)}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Stacked layout for many payments */
        <div style={{ marginBottom: '24px' }}>
          {/* Services full width */}
          <div style={{ marginBottom: '20px' }}>
            <div style={s.sectionLabel}>Services Provided</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${B.green}` }}>
              <thead>
                <tr>
                  {['SR', 'Particulars', 'PAX', 'Rate', 'Amount'].map((h) => (
                    <th key={h} style={{ ...s.th, textAlign: h === 'Particulars' ? 'left' : 'center', width: h === 'SR' ? '5%' : h === 'Particulars' ? '50%' : '15%' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoice.items?.map((item, i) => (
                  <tr key={i}>
                    <td style={s.td(i)}>{i + 1}</td>
                    <td style={{ ...s.td(i, 'left'), fontWeight: '700' }}>{item.particulars?.toUpperCase()}</td>
                    <td style={s.td(i)}>{item.pax_quantity}</td>
                    <td style={s.td(i)}>₹{fmt(item.rate_per_pax)}</td>
                    <td style={{ ...s.td(i), fontWeight: '800', color: B.green }}>₹{fmt(item.total_amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Payments full width */}
          <div style={{ marginBottom: '14px' }}>
            <div style={s.sectionLabel}>Payments Received</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${B.green}` }}>
              <thead>
                <tr>
                  {['Date', 'Amount', 'Received By'].map((h) => (
                    <th key={h} style={{ ...s.th, textAlign: 'center' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map((p, i) => (
                  <tr key={i}>
                    <td style={s.td(i)}>{new Date(p.payment_date).toLocaleDateString('en-IN')}</td>
                    <td style={{ ...s.td(i), fontWeight: '800', color: B.green }}>₹{fmt(p.amount_paid)}</td>
                    <td style={s.td(i)}>{p.received_by?.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Balance Due full width */}
          <div style={{ padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: balance > 0 ? '#fff5f5' : '#f0fdf4', border: `2px solid ${balance > 0 ? B.maroon : B.green}` }}>
            <span style={{ fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', color: balance > 0 ? B.maroon : B.green }}>Balance Due</span>
            <span style={{ fontWeight: '900', fontSize: '20px', color: balance > 0 ? B.maroon : B.green }}>₹{fmt(balance)}</span>
          </div>
        </div>
      )}

      {/* ── BANK DETAILS ── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={s.sectionLabel}>Account Details — Pay To</div>
        <div style={{ display: 'flex', gap: '14px' }}>
          {MEMON_BANK.map((bank, i) => (
            <div key={i} style={{ flex: 1, border: `2px solid ${B.greenMid}`, borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ background: B.green, padding: '8px 14px' }}>
                <div style={{ fontWeight: '800', fontSize: '11px', letterSpacing: '0.8px', color: B.peach }}>{bank.name}</div>
              </div>
              <div style={{ padding: '12px 14px', background: B.peachLight }}>
                {[
                  ['A/C Name',   bank.holder],
                  ['A/C No.',    bank.account],
                  ['Branch',     bank.branch],
                  ['IFSC Code',  bank.ifsc],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', gap: '8px', marginBottom: '5px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '11px', color: B.inkLight, fontWeight: '600', minWidth: '72px', flexShrink: 0 }}>{label}:</span>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: B.ink }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TERMS ── */}
      <div style={{ border: `2px solid ${B.greenMid}`, borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ background: B.green, padding: '8px 14px' }}>
          <div style={{ fontWeight: '800', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: B.peach }}>Terms & Conditions</div>
        </div>
        <div style={{ padding: '14px 18px', background: B.peachLight }}>
          <ol style={{ margin: 0, paddingLeft: '18px' }}>
            {TERMS.map((term, i) => (
              <li key={i} style={{ fontSize: '10.5px', color: B.inkMid, fontWeight: '600', lineHeight: '1.7', marginBottom: '3px' }}>{term}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: `1px solid ${B.greenMid}` }}>
        <div style={{ fontSize: '10px', color: B.inkLight }}>Generated on {new Date().toLocaleString('en-IN')}</div>
        <div style={{ fontSize: '10px', color: B.inkLight, fontWeight: '600' }}>MEMON HAJ UMRAH TOURS & TRAVELS · memonhajumrahtours.com</div>
      </div>
    </div>
  );
};

// ─── Preview Modal ────────────────────────────────────────────────────────────
const PreviewModal = ({ invoice, onClose, onDownload, isGenerating }) => (
  <div
    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px', overflowY: 'auto' }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', maxWidth: '920px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', marginBottom: '24px' }}>
      {/* Modal Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: B.green, color: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <div style={{ fontWeight: '800', fontSize: '16px' }}>Invoice Preview</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>{invoice.invoice_number}</div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={onDownload}
            disabled={isGenerating}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: B.peach, color: B.green, border: 'none', borderRadius: '8px', padding: '9px 18px', fontWeight: '800', fontSize: '13px', cursor: isGenerating ? 'not-allowed' : 'pointer', opacity: isGenerating ? 0.6 : 1 }}
          >
            <Download size={16} /> {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', padding: '9px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
      </div>
      {/* Invoice Preview — scrollable */}
      <div style={{ overflowY: 'auto', overflowX: 'auto', padding: '24px', background: '#f9f9f9', maxHeight: '80vh' }}>
        <InvoiceTemplate invoice={invoice} logoUrl={logo} logoNameUrl={logoName} />
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ViewInvoices = () => {
  const {
    agents, invoices, selectedAgent, selectedInvoice, isLoading,
    fetchAgents, fetchAgentInvoices, fetchInvoiceById,
    setSelectedAgent, deleteInvoice, addPayment, deletePayment,
    addInvoiceItem, updateInvoiceItem, deleteInvoiceItem,
  } = useInvoiceStore();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentRows, setPaymentRows] = useState([
    { payment_date: '', amount_paid: '', received_by: 'MEMON', bracket: '', notes: '' }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Which methods show the bracket detail input
  const BRACKET_OPTIONS = ['CASH IN SAR', 'UPI', 'OTHER', 'BANK TRANSFER'];

  // Services state
  const [showAddService, setShowAddService] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // { item_id, particulars, pax_quantity, rate_per_pax }
  const [newService, setNewService] = useState({ particulars: '', pax_quantity: '', rate_per_pax: '' });

  useEffect(() => { fetchAgents(); }, []);

  const handleSelectAgent = async (agent) => {
    setSelectedAgent(agent);
    await fetchAgentInvoices(agent.agent_id);
  };

  const handleSelectInvoice = async (inv) => {
    await fetchInvoiceById(inv.invoice_id);
  };

  const addPaymentRow    = () => setPaymentRows([...paymentRows, { payment_date: '', amount_paid: '', received_by: 'MEMON', bracket: '', notes: '' }]);
  const removePaymentRow = (i) => { if (paymentRows.length > 1) setPaymentRows(paymentRows.filter((_, idx) => idx !== i)); };
  const updatePaymentRow = (i, field, value) => {
    const updated = [...paymentRows];
    updated[i][field] = value;
    // Clear bracket when switching to a method that doesn't use it
    if (field === 'received_by' && !BRACKET_OPTIONS.includes(value)) {
      updated[i].bracket = '';
    }
    setPaymentRows(updated);
  };

  // Build final received_by string: "UPI (WAHID)" or "CASH IN SAR (2600*26)"
  const buildReceivedBy = (row) => {
    if (row.bracket?.trim() && BRACKET_OPTIONS.includes(row.received_by)) {
      return `${row.received_by} (${row.bracket.trim()})`;
    }
    return row.received_by;
  };

  const handleAddPayments = async () => {
    const valid = paymentRows.filter(r => r.payment_date && r.amount_paid && r.received_by);
    if (valid.length === 0) { alert('Please fill at least one complete payment row'); return; }
    let allOk = true;
    for (const row of valid) {
      const ok = await addPayment(selectedInvoice.invoice_id, {
        ...row,
        received_by: buildReceivedBy(row),
      });
      if (!ok) { allOk = false; break; }
    }
    if (allOk) {
      setPaymentRows([{ payment_date: '', amount_paid: '', received_by: 'MEMON', bracket: '', notes: '' }]);
      setShowPaymentForm(false);
    }
  };


  // Service Handlers
  const handleAddService = async () => {
    if (!newService.particulars.trim() || !newService.pax_quantity || !newService.rate_per_pax) {
      alert("Please fill all service fields"); return;
    }
    const ok = await addInvoiceItem(selectedInvoice.invoice_id, newService);
    if (ok) {
      setNewService({ particulars: "", pax_quantity: "", rate_per_pax: "" });
      setShowAddService(false);
    }
  };

  const handleUpdateService = async () => {
    if (!editingItem.particulars.trim() || !editingItem.pax_quantity || !editingItem.rate_per_pax) {
      alert("Please fill all fields"); return;
    }
    const ok = await updateInvoiceItem(editingItem.item_id, selectedInvoice.invoice_id, editingItem);
    if (ok) setEditingItem(null);
  };

  const handleDeleteService = async (itemId) => {
    if (selectedInvoice.items.length === 1) { alert("Invoice must have at least one service"); return; }
    if (!confirm("Delete this service?")) return;
    await deleteInvoiceItem(itemId, selectedInvoice.invoice_id);
  };

  // ── PDF Generation ──
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF }       = await import('jspdf');
      const el     = document.getElementById('invoice-template');
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false });

      const pdf    = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pw     = pdf.internal.pageSize.getWidth();
      const ph     = pdf.internal.pageSize.getHeight();
      const margin = 5;
      const iw     = pw - margin * 2;
      const ih     = (canvas.height * iw) / canvas.width; // full image height in mm
      const pageContentHeightMM = ph - margin * 2;

      if (ih <= pageContentHeightMM) {
        // Fits in one page
        const img = canvas.toDataURL('image/jpeg', 0.97);
        pdf.addImage(img, 'JPEG', margin, margin, iw, ih);
      } else {
        // Multi-page: slice the canvas into page-sized chunks (no overlap)
        const pageContentHeightPX = (pageContentHeightMM * canvas.width) / iw; // px per page slice
        let renderedHeightPX = 0;
        let page = 0;

        // Collect bottom edges (in canvas px) of every table row, so page
        // breaks can snap to these and never cut a row in half
        const scale = canvas.width / el.offsetWidth;
        const rowBottoms = Array.from(el.querySelectorAll('tr, li'))
          .map((node) => {
            const rect = node.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            return (rect.bottom - elRect.top) * scale;
          })
          .filter((y) => y > 0 && y <= canvas.height)
          .sort((a, b) => a - b);

        while (renderedHeightPX < canvas.height) {
          const maxSliceEnd = renderedHeightPX + pageContentHeightPX;
          let sliceEnd;

          if (maxSliceEnd >= canvas.height) {
            sliceEnd = canvas.height;
          } else {
            // Find the largest row-boundary that fits within this page
            const candidates = rowBottoms.filter(
              (y) => y > renderedHeightPX && y <= maxSliceEnd
            );
            sliceEnd = candidates.length > 0
              ? candidates[candidates.length - 1]
              : maxSliceEnd; // fallback: no row boundary found, hard cut
          }

          const sliceHeightPX = sliceEnd - renderedHeightPX;

          const pageCanvas = document.createElement('canvas');
          pageCanvas.width  = canvas.width;
          pageCanvas.height = sliceHeightPX;

          const ctx = pageCanvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0, renderedHeightPX, canvas.width, sliceHeightPX, // source rect
            0, 0, canvas.width, sliceHeightPX                  // dest rect
          );

          const sliceImg = pageCanvas.toDataURL('image/jpeg', 0.97);
          const sliceHeightMM = (sliceHeightPX * iw) / canvas.width;

          if (page > 0) pdf.addPage();
          pdf.addImage(sliceImg, 'JPEG', margin, margin, iw, sliceHeightMM);

          renderedHeightPX += sliceHeightPX;
          page++;
        }
      }

      pdf.save(`${selectedInvoice.invoice_number}.pdf`);
      setShowPreview(false);
    } catch (err) {
      alert('PDF failed: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Export to Excel ──
  const handleExportExcel = async () => {
    if (!selectedInvoice) return;
    const { utils, writeFile } = await import('xlsx');

    const wb = utils.book_new();

    // Sheet 1 — Services
    const serviceRows = [
      ['SR NO.', 'PARTICULARS', 'PAX / QTY', 'RATE PER PAX (₹)', 'TOTAL (₹)'],
      ...selectedInvoice.items.map((item, i) => [
        i + 1,
        item.particulars,
        item.pax_quantity,
        parseFloat(item.rate_per_pax),
        parseFloat(item.total_amount),
      ]),
      [],
      ['', '', '', 'TOTAL AMOUNT', selectedInvoice.totalServices],
    ];
    const ws1 = utils.aoa_to_sheet(serviceRows);
    ws1['!cols'] = [{ wch: 6 }, { wch: 45 }, { wch: 12 }, { wch: 18 }, { wch: 15 }];
    utils.book_append_sheet(wb, ws1, 'Services');

    // Sheet 2 — Payments
    const paymentRows = [
      ['DATE', 'AMOUNT (₹)', 'RECEIVED BY'],
      ...selectedInvoice.payments.map(p => [
        new Date(p.payment_date).toLocaleDateString('en-IN'),
        parseFloat(p.amount_paid),
        p.received_by,
      ]),
      [],
      ['', 'TOTAL PAID', selectedInvoice.totalPaid],
      ['', 'BALANCE DUE', selectedInvoice.balance],
    ];
    const ws2 = utils.aoa_to_sheet(paymentRows);
    ws2['!cols'] = [{ wch: 14 }, { wch: 16 }, { wch: 30 }];
    utils.book_append_sheet(wb, ws2, 'Payments');

    // Sheet 3 — Summary
    const summaryRows = [
      ['INVOICE NO.', selectedInvoice.invoice_number],
      ['DATE', new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')],
      ['HIJRI YEAR', selectedInvoice.hijri_year],
      ['AGENT', selectedInvoice.agent?.name],
      [],
      ['TOTAL AMOUNT', selectedInvoice.totalServices],
      ['AMOUNT PAID', selectedInvoice.totalPaid],
      ['BALANCE DUE', selectedInvoice.balance],
    ];
    const ws3 = utils.aoa_to_sheet(summaryRows);
    ws3['!cols'] = [{ wch: 18 }, { wch: 30 }];
    utils.book_append_sheet(wb, ws3, 'Summary');

    writeFile(wb, `${selectedInvoice.invoice_number}.xlsx`);
  };

  // ── WhatsApp ──
  // Note: WhatsApp Web does not support direct file attachments via URL.
  // We open WhatsApp with invoice details as text. User can manually attach the downloaded PDF.
  const handleWhatsApp = () => {
    const phone = '918268979705';
    const msg = encodeURIComponent(
      `*MEMON HAJ UMRAH TOURS & TRAVELS*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `📄 Invoice: *${selectedInvoice.invoice_number}*\n` +
      `📅 Date: ${new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')}\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Agent: *${selectedInvoice.agent?.name}*\n\n` +
      `💰 Total Amount:    *₹${fmt(selectedInvoice.totalServices)}*\n` +
      `✅ Amount Received: ₹${fmt(selectedInvoice.totalPaid)}\n` +
      `⚠️ Balance Due:     *₹${fmt(selectedInvoice.balance)}*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `🏦 *Bank Details for Payment:*\n` +
      `1️⃣ Bank of Baroda\n` +
      `   A/C: 45810200000462 | IFSC: BARB0MIRBHA\n\n` +
      `2️⃣ Bombay Mercantile Bank\n` +
      `   A/C: 010110100090937 | IFSC: BMCB0000010\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Memon Haj Umrah Tours & Travels_\n` +
      `📞 8108404376 | 9022549162 | 7977215388`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // ── Gmail ──
  const handleGmail = () => {
    const to      = selectedInvoice.agent?.email || '';
    const subject = encodeURIComponent(`Invoice ${selectedInvoice.invoice_number} — Memon Haj Umrah Tours & Travels`);
    const body    = encodeURIComponent(
      `Dear ${selectedInvoice.agent?.name},\n\n` +
      `Please find your invoice details below:\n\n` +
      `Invoice No  : ${selectedInvoice.invoice_number}\n` +
      `Date        : ${new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')}\n` +
      `Hijri Year  : ${selectedInvoice.hijri_year}\n\n` +
      `Total Amount   : ₹${fmt(selectedInvoice.totalServices)}\n` +
      `Amount Received: ₹${fmt(selectedInvoice.totalPaid)}\n` +
      `Balance Due    : ₹${fmt(selectedInvoice.balance)}\n\n` +
      `─────────────────────────────\n` +
      `PAYMENT BANK DETAILS:\n\n` +
      `1. Bank of Baroda\n` +
      `   A/C Name  : MEMON HAJ UMRAH TOURS AND TRAVELS\n` +
      `   A/C No.   : 45810200000462\n` +
      `   Branch    : MIRA BHAYANDAR\n` +
      `   IFSC Code : BARB0MIRBHA\n\n` +
      `2. Bombay Mercantile Bank\n` +
      `   A/C Name  : MEMON HAJ UMRAH TOURS AND TRAVELS\n` +
      `   A/C No.   : 010110100090937\n` +
      `   Branch    : MAULANA AZAD ROAD, MUMBAI\n` +
      `   IFSC Code : BMCB0000010\n\n` +
      `─────────────────────────────\n` +
      `Regards,\n` +
      `Memon Haj Umrah Tours & Travels\n` +
      `Ph: +91 8108404376 | +91 9022549162 | +91 7977215388\n` +
      `Email: memonhajumrahtours@gmail.com\n` +
      `Web: memonhajumrahtours.com`
    );
    // Opens Gmail compose (works when Gmail is default mail client or via Gmail web)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleDelete = async () => {
    if (!confirm('Delete this invoice? This cannot be undone.')) return;
    await deleteInvoice(selectedInvoice.invoice_id, selectedAgent?.agent_id);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold font-zodiak mb-6">View Invoices</h2>

      <div className="grid grid-cols-12 gap-5">

        {/* ── Agents ── */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-darkgreen/10 flex items-center justify-between">
              <span className="text-sm font-bold font-jakarta text-darkgreen">Agents</span>
              <button onClick={fetchAgents} className="text-darkgreen/40 hover:text-darkgreen transition-all"><RefreshCw size={14} /></button>
            </div>
            <div className="divide-y divide-darkgreen/10">
              {agents.length === 0
                ? <p className="text-center py-8 text-sm text-darkgreen/40 font-jakarta">No agents yet</p>
                : agents.map((a) => (
                    <button key={a.agent_id} onClick={() => handleSelectAgent(a)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all hover:bg-peach/30 ${selectedAgent?.agent_id === a.agent_id ? 'bg-peach/50 border-l-4 border-darkgreen' : ''}`}>
                      <div>
                        <p className="text-sm font-jakarta font-bold text-darkgreen">{a.name}</p>
                        <p className="text-xs text-darkgreen/40 font-jakarta mt-0.5">{a._count?.invoices || 0} invoice{a._count?.invoices !== 1 ? 's' : ''}</p>
                      </div>
                      <ChevronRight size={14} className="text-darkgreen/30" />
                    </button>
                  ))}
            </div>
          </div>
        </div>

        {/* ── Invoices List ── */}
        <div className="col-span-12 md:col-span-3">
          {selectedAgent
            ? (
              <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden shadow-sm">
                <div className="px-4 py-3 border-b border-darkgreen/10 bg-peach/20">
                  <p className="text-sm font-bold font-jakarta text-darkgreen">{selectedAgent.name}</p>
                  <p className="text-xs font-jakarta text-darkgreen/50">{invoices.length} invoices</p>
                </div>
                <div className="divide-y divide-darkgreen/10 max-h-[65vh] overflow-y-auto">
                  {isLoading
                    ? <div className="py-8 text-center text-sm text-darkgreen/40 font-jakarta">Loading...</div>
                    : invoices.length === 0
                      ? <div className="py-10 text-center text-sm text-darkgreen/40 font-jakarta">No invoices yet</div>
                      : invoices.map((inv) => (
                          <button key={inv.invoice_id} onClick={() => handleSelectInvoice(inv)}
                            className={`w-full text-left px-4 py-3 transition-all hover:bg-peach/20 ${selectedInvoice?.invoice_id === inv.invoice_id ? 'bg-peach/40 border-l-4 border-darkgreen' : ''}`}>
                            <p className="text-sm font-jakarta font-bold text-darkgreen">{inv.invoice_number}</p>
                            <p className="text-xs text-darkgreen/40 font-jakarta mt-0.5">{new Date(inv.invoice_date).toLocaleDateString('en-IN')}</p>
                            <div className={`inline-block mt-1.5 text-xs font-bold font-jakarta px-2 py-0.5 rounded-full ${parseFloat(inv.balance) > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                              ₹{fmt(inv.balance)} {parseFloat(inv.balance) > 0 ? 'due' : 'cleared'}
                            </div>
                          </button>
                        ))}
                </div>
              </div>
            )
            : <div className="bg-white border border-darkgreen/15 rounded-xl p-10 text-center text-sm text-darkgreen/40 font-jakarta shadow-sm">← Select an agent</div>}
        </div>

        {/* ── Invoice Detail ── */}
        <div className="col-span-12 md:col-span-6">
          {selectedInvoice
            ? (
              <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden shadow-sm">

                {/* Action Bar */}
                <div className="px-5 py-4 border-b border-darkgreen/10 bg-peach/10">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-zodiak font-bold text-darkgreen text-lg">{selectedInvoice.invoice_number}</p>
                      <p className="text-xs font-jakarta text-darkgreen/50 mt-0.5">
                        {new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        &nbsp;·&nbsp; {selectedInvoice.hijri_year}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => setShowPreview(true)}
                        className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-darkgreen text-peach px-3 py-2 rounded-lg hover:bg-darkgreen/90 transition-all">
                        <Eye size={14} /> Preview & Download
                      </button>
                      <button onClick={handleWhatsApp}
                        className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#1ebe5d] transition-all">
                        <MessageCircle size={14} /> WhatsApp
                      </button>
                      <button onClick={handleGmail}
                        className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-[#EA4335] text-white px-3 py-2 rounded-lg hover:bg-[#d33426] transition-all">
                        <Mail size={14} /> Gmail
                      </button>
                      <button onClick={handleExportExcel}
                        className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-emerald-700 text-white px-3 py-2 rounded-lg hover:bg-emerald-800 transition-all">
                        <FileSpreadsheet size={14} /> Excel
                      </button>
                      <button onClick={handleDelete}
                        className="flex items-center gap-1.5 text-xs font-jakarta font-bold border border-red-200 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 border-b border-darkgreen/10">
                  {[
                    { label: 'Total Amount', value: `₹${fmt(selectedInvoice.totalServices)}`, color: 'text-darkgreen' },
                    { label: 'Amount Paid',  value: `₹${fmt(selectedInvoice.totalPaid)}`,     color: 'text-green-700' },
                    { label: 'Balance Due',  value: `₹${fmt(selectedInvoice.balance)}`,        color: parseFloat(selectedInvoice.balance) > 0 ? 'text-maroon' : 'text-green-700' },
                  ].map((c) => (
                    <div key={c.label} className="px-3 py-3 text-center border-r last:border-r-0 border-darkgreen/10">
                      <p className="text-xs font-jakarta text-darkgreen/50 uppercase tracking-wide mb-1">{c.label}</p>
                      <p className={`font-jakarta font-bold text-xs leading-tight ${c.color}`}>{c.value}</p>
                    </div>
                  ))}
                </div>

                {/* Collection Summary — right after cards, for quick reference */}
                {selectedInvoice.payments?.length > 0 && (() => {
                  const methodMap = {};
                  selectedInvoice.payments.forEach(p => {
                    const method = p.received_by.includes('(')
                      ? p.received_by.split('(')[0].trim()
                      : p.received_by;
                    const label = p.received_by;
                    const amt = parseFloat(p.amount_paid);
                    if (!methodMap[method]) methodMap[method] = { total: 0, labels: {} };
                    methodMap[method].total += amt;
                    if (!methodMap[method].labels[label]) methodMap[method].labels[label] = 0;
                    methodMap[method].labels[label] += amt;
                  });
                  return (
                    <div className="mx-4 my-3 bg-darkgreen/5 rounded-xl border border-darkgreen/15 overflow-hidden">
                      <div className="px-4 py-2 bg-darkgreen/10 border-b border-darkgreen/10">
                        <p className="text-xs font-bold font-jakarta text-darkgreen uppercase tracking-widest">Collection Summary</p>
                      </div>
                      <div className="divide-y divide-darkgreen/10">
                        {Object.entries(methodMap).map(([method, data]) => {
                          const labels = Object.entries(data.labels);
                          const hasSubGroups = labels.length > 1 || labels[0]?.[0] !== method;
                          return (
                            <div key={method} className="px-4 py-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-jakarta font-bold text-darkgreen">{method}</p>
                                <p className="font-zodiak font-bold text-sm text-darkgreen">₹{fmt(data.total)}</p>
                              </div>
                              {hasSubGroups && labels.map(([label, total]) => (
                                label !== method && (
                                  <div key={label} className="flex justify-between items-center mt-1 pl-3 border-l-2 border-darkgreen/20">
                                    <p className="text-xs font-jakarta text-darkgreen/60">{label}</p>
                                    <p className="text-xs font-jakarta font-semibold text-darkgreen/70">₹{fmt(total)}</p>
                                  </div>
                                )
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Services */}
                <div className="px-5 py-4 border-b border-darkgreen/10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-widest">Services</p>
                    <button onClick={() => { setShowAddService(!showAddService); setEditingItem(null); }}
                      className="flex items-center gap-1 text-xs font-jakarta font-bold text-darkgreen border border-darkgreen/30 px-3 py-1.5 rounded-lg hover:bg-peach/30 transition-all">
                      {showAddService ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Add Service</>}
                    </button>
                  </div>

                  {/* Add Service Form */}
                  {showAddService && (
                    <div className="bg-peach/20 rounded-xl p-3 mb-3 border border-darkgreen/15 space-y-2">
                      <textarea placeholder="Particulars (e.g. 35ADT JUNE PACKAGE 15DAYS DELUXE)"
                        value={newService.particulars}
                        onChange={(e) => setNewService({ ...newService, particulars: e.target.value })}
                        rows={2}
                        className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen resize-none" />
                      <div className="grid grid-cols-3 gap-2">
                        <input type="number" placeholder="PAX / Qty" value={newService.pax_quantity}
                          onChange={(e) => setNewService({ ...newService, pax_quantity: e.target.value })}
                          className="border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen" min="1" />
                        <input type="number" placeholder="Rate per PAX" value={newService.rate_per_pax}
                          onChange={(e) => setNewService({ ...newService, rate_per_pax: e.target.value })}
                          className="border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen" min="0" step="0.01" />
                        <div className="flex items-center justify-center bg-darkgreen/5 rounded-lg px-3 py-2 text-sm font-bold text-darkgreen font-jakarta">
                          ₹{((parseFloat(newService.pax_quantity) || 0) * (parseFloat(newService.rate_per_pax) || 0)).toLocaleString('en-IN')}
                        </div>
                      </div>
                      <button onClick={handleAddService} disabled={isLoading}
                        className="w-full bg-darkgreen text-peach font-jakarta font-bold py-2 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all text-sm">
                        {isLoading ? 'Adding...' : 'Add Service'}
                      </button>
                    </div>
                  )}

                  {/* Services List */}
                  <div className="space-y-2">
                    {selectedInvoice.items?.map((item, i) => (
                      <div key={item.item_id || i}>
                        {/* Edit Mode */}
                        {editingItem?.item_id === item.item_id ? (
                          <div className="bg-peach/30 rounded-xl p-3 border border-darkgreen/20 space-y-2">
                            <textarea value={editingItem.particulars}
                              onChange={(e) => setEditingItem({ ...editingItem, particulars: e.target.value })}
                              rows={2}
                              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen resize-none" />
                            <div className="grid grid-cols-3 gap-2">
                              <input type="number" value={editingItem.pax_quantity}
                                onChange={(e) => setEditingItem({ ...editingItem, pax_quantity: e.target.value })}
                                className="border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen" min="1" />
                              <input type="number" value={editingItem.rate_per_pax}
                                onChange={(e) => setEditingItem({ ...editingItem, rate_per_pax: e.target.value })}
                                className="border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen" min="0" step="0.01" />
                              <div className="flex items-center justify-center bg-darkgreen/5 rounded-lg px-2 text-sm font-bold text-darkgreen font-jakarta">
                                ₹{((parseFloat(editingItem.pax_quantity) || 0) * (parseFloat(editingItem.rate_per_pax) || 0)).toLocaleString('en-IN')}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={handleUpdateService} disabled={isLoading}
                                className="flex-1 bg-darkgreen text-peach font-jakarta font-bold py-2 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 text-sm transition-all">
                                {isLoading ? 'Saving...' : 'Save'}
                              </button>
                              <button onClick={() => setEditingItem(null)}
                                className="px-4 border border-darkgreen/30 text-darkgreen font-jakarta font-bold py-2 rounded-lg hover:bg-peach/20 text-sm transition-all">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* View Mode */
                          <div className="flex justify-between items-center bg-peach/20 rounded-lg px-4 py-2.5 border border-darkgreen/10 group">
                            <div className="flex-1 min-w-0 mr-3">
                              <p className="text-sm font-jakarta font-bold text-darkgreen truncate">{item.particulars}</p>
                              <p className="text-xs text-darkgreen/50 font-jakarta mt-0.5">{item.pax_quantity} PAX × ₹{fmt(item.rate_per_pax)}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <p className="font-zodiak font-bold text-sm text-darkgreen">₹{fmt(item.total_amount)}</p>
                              <button
                                onClick={() => setEditingItem({ item_id: item.item_id, particulars: item.particulars, pax_quantity: item.pax_quantity, rate_per_pax: parseFloat(item.rate_per_pax) })}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-darkgreen hover:bg-darkgreen/10 rounded-lg transition-all">
                                <Edit2 size={12} />
                              </button>
                              <button onClick={() => handleDeleteService(item.item_id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payments */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-widest">Payments</p>
                    <button onClick={() => setShowPaymentForm(!showPaymentForm)}
                      className="flex items-center gap-1 text-xs font-jakarta font-bold text-darkgreen border border-darkgreen/30 px-3 py-1.5 rounded-lg hover:bg-peach/30 transition-all">
                      {showPaymentForm ? <><X size={12} /> Cancel</> : <><Plus size={12} /> Add Payment</>}
                    </button>
                  </div>

                  {showPaymentForm && (
                    <div className="bg-peach/20 rounded-xl p-4 mb-4 border border-darkgreen/15">
                      {/* Column Headers */}
                      <div className="hidden md:grid grid-cols-12 gap-2 mb-2 px-1">
                        <div className="col-span-3 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Date *</div>
                        <div className="col-span-3 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Amount (₹) *</div>
                        <div className="col-span-4 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Received By *</div>
                        <div className="col-span-2 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide">Notes</div>
                      </div>

                      {/* Payment Rows */}
                      <div className="space-y-2 mb-3">
                        {paymentRows.map((row, i) => (
                          <div key={i} className="grid grid-cols-12 gap-2 items-center bg-white rounded-lg p-2 border border-darkgreen/10">
                            <div className="col-span-12 md:col-span-3">
                              <input type="date" value={row.payment_date}
                                onChange={(e) => updatePaymentRow(i, 'payment_date', e.target.value)}
                                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen" />
                            </div>
                            <div className="col-span-12 md:col-span-3">
                              <input type="number" placeholder="Amount" value={row.amount_paid}
                                onChange={(e) => updatePaymentRow(i, 'amount_paid', e.target.value)}
                                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
                                min="0" step="0.01" />
                            </div>
                            <div className="col-span-12 md:col-span-4">
                              <select value={row.received_by}
                                onChange={(e) => updatePaymentRow(i, 'received_by', e.target.value)}
                                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white">
                                <option>MEMON</option>
                                <option>CASH IN INR (MEMON OFFICE)</option>
                                <option>CASH IN SAR</option>
                                <option>BANK TRANSFER</option>
                                <option>UPI</option>
                                <option>OTHER</option>
                              </select>
                              {/* Bracket detail input — shows for SAR, UPI, OTHER, BANK TRANSFER */}
                              {BRACKET_OPTIONS.includes(row.received_by) && (
                                <input
                                  type="text"
                                  placeholder={
                                    row.received_by === 'CASH IN SAR' ? 'e.g. 2600*26' :
                                    row.received_by === 'UPI' ? 'e.g. WAHID' :
                                    row.received_by === 'BANK TRANSFER' ? 'e.g. HDFC / REF NO' :
                                    'Details...'
                                  }
                                  value={row.bracket}
                                  onChange={(e) => updatePaymentRow(i, 'bracket', e.target.value)}
                                  className="w-full mt-1 border border-darkgreen/20 rounded-lg px-3 py-1.5 text-xs font-jakarta focus:outline-none focus:border-darkgreen bg-peach/20"
                                />
                              )}
                            </div>
                            <div className="col-span-11 md:col-span-1">
                              <input type="text" placeholder="Notes" value={row.notes}
                                onChange={(e) => updatePaymentRow(i, 'notes', e.target.value)}
                                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen" />
                            </div>
                            <div className="col-span-1 flex justify-end">
                              {paymentRows.length > 1 && (
                                <button onClick={() => removePaymentRow(i)} className="text-red-400 hover:text-red-600 p-1 transition-all">
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Row + Submit */}
                      <div className="flex gap-2">
                        <button onClick={addPaymentRow}
                          className="flex items-center gap-1.5 text-xs font-jakarta font-bold text-darkgreen border border-darkgreen/30 px-3 py-2 rounded-lg hover:bg-peach/30 transition-all">
                          <Plus size={13} /> Add Row
                        </button>
                        <button onClick={handleAddPayments} disabled={isLoading}
                          className="flex-1 bg-darkgreen text-peach font-jakarta font-bold py-2 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all text-sm">
                          {isLoading ? 'Recording...' : `Save ${paymentRows.filter(r => r.payment_date && r.amount_paid).length} Payment${paymentRows.filter(r => r.payment_date && r.amount_paid).length !== 1 ? 's' : ''}`}
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedInvoice.payments?.length === 0
                    ? <p className="text-center py-5 text-sm text-darkgreen/40 font-jakarta italic">No payments recorded yet</p>
                    : (
                      <div className="space-y-2">
                        {selectedInvoice.payments?.map((p, i) => (
                          <div key={i} className="flex items-center justify-between bg-green-50/60 rounded-lg px-4 py-2.5 border border-green-100">
                            <div>
                              <p className="text-sm font-jakarta font-bold text-darkgreen">{new Date(p.payment_date).toLocaleDateString('en-IN')}</p>
                              <p className="text-xs text-darkgreen/50 font-jakarta mt-0.5">{p.received_by}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="font-zodiak font-bold text-sm text-green-700">₹{fmt(p.amount_paid)}</p>
                              <button onClick={() => deletePayment(p.payment_id, selectedInvoice.invoice_id)}
                                className="text-red-400 hover:text-red-600 transition-all p-1">
                                <X size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            )
            : <div className="bg-white border border-darkgreen/15 rounded-xl p-16 text-center text-sm text-darkgreen/40 font-jakarta shadow-sm">← Select an invoice to view details</div>}
        </div>
      </div>

      {/* ── Preview Modal ── */}
      {showPreview && selectedInvoice && (
        <PreviewModal
          invoice={selectedInvoice}
          onClose={() => setShowPreview(false)}
          onDownload={generatePDF}
          isGenerating={isGenerating}
        />
      )}

      {/* Hidden template for PDF capture */}
      {selectedInvoice && (
        <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }} aria-hidden="true">
          <InvoiceTemplate invoice={selectedInvoice} logoUrl={logo} logoNameUrl={logoName} />
        </div>
      )}
    </div>
  );
};

export default ViewInvoices;
