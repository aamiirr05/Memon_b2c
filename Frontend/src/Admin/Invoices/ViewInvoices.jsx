import { useEffect, useState } from 'react';
import { Trash2, Plus, X, Download, ChevronRight, RefreshCw, Mail, MessageCircle, Eye } from 'lucide-react';
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
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>

        {/* Services */}
        <div style={{ flex: '0 0 55%' }}>
          <div style={s.sectionLabel}>Services Provided</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${B.green}`, borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr>
                {['SR', 'Particulars', 'PAX', 'Rate', 'Amount'].map((h, i) => (
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
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${B.green}`, borderRadius: '8px', overflow: 'hidden' }}>
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
                : (
                  <tr>
                    <td colSpan={3} style={{ padding: '16px', textAlign: 'center', color: B.inkLight, fontSize: '12px', fontStyle: 'italic', background: B.peachLight, border: `1px solid ${B.greenMid}` }}>
                      No payments recorded
                    </td>
                  </tr>
                )}
            </tbody>
          </table>

          {/* Balance Due */}
          <div style={{
            marginTop: '12px',
            padding: '12px 16px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: balance > 0 ? '#fff5f5' : '#f0fdf4',
            border: `2px solid ${balance > 0 ? B.maroon : B.green}`,
          }}>
            <span style={{ fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: balance > 0 ? B.maroon : B.green }}>
              Balance Due
            </span>
            <span style={{ fontWeight: '900', fontSize: '17px', color: balance > 0 ? B.maroon : B.green }}>
              ₹{fmt(balance)}
            </span>
          </div>
        </div>
      </div>

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
  } = useInvoiceStore();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentRows, setPaymentRows] = useState([
    { payment_date: '', amount_paid: '', received_by: 'MEMON', notes: '' }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => { fetchAgents(); }, []);

  const handleSelectAgent = async (agent) => {
    setSelectedAgent(agent);
    await fetchAgentInvoices(agent.agent_id);
  };

  const handleSelectInvoice = async (inv) => {
    await fetchInvoiceById(inv.invoice_id);
  };

  const addPaymentRow    = () => setPaymentRows([...paymentRows, { payment_date: '', amount_paid: '', received_by: 'MEMON', notes: '' }]);
  const removePaymentRow = (i) => { if (paymentRows.length > 1) setPaymentRows(paymentRows.filter((_, idx) => idx !== i)); };
  const updatePaymentRow = (i, field, value) => {
    const updated = [...paymentRows];
    updated[i][field] = value;
    setPaymentRows(updated);
  };

  const handleAddPayments = async () => {
    const valid = paymentRows.filter(r => r.payment_date && r.amount_paid && r.received_by);
    if (valid.length === 0) { alert('Please fill at least one complete payment row'); return; }
    let allOk = true;
    for (const row of valid) {
      const ok = await addPayment(selectedInvoice.invoice_id, row);
      if (!ok) { allOk = false; break; }
    }
    if (allOk) {
      setPaymentRows([{ payment_date: '', amount_paid: '', received_by: 'MEMON', notes: '' }]);
      setShowPaymentForm(false);
    }
  };

  // ── PDF Generation ──
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      await new Promise(r => setTimeout(r, 500)); // let images load
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF }       = await import('jspdf');
      const el     = document.getElementById('invoice-template');
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', logging: false });
      const img    = canvas.toDataURL('image/jpeg', 0.97);
      const pdf    = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pw     = pdf.internal.pageSize.getWidth();
      const ph     = pdf.internal.pageSize.getHeight();
      const iw     = pw - 10;
      const ih     = Math.min((canvas.height * iw) / canvas.width, ph - 10);
      pdf.addImage(img, 'JPEG', 5, 5, iw, ih);
      pdf.save(`${selectedInvoice.invoice_number}.pdf`);
      setShowPreview(false);
    } catch (err) {
      alert('PDF failed: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
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
                    { label: 'Total',   value: `₹${fmt(selectedInvoice.totalServices)}`, color: 'text-darkgreen' },
                    { label: 'Paid',    value: `₹${fmt(selectedInvoice.totalPaid)}`,     color: 'text-green-700' },
                    { label: 'Balance', value: `₹${fmt(selectedInvoice.balance)}`,       color: parseFloat(selectedInvoice.balance) > 0 ? 'text-maroon' : 'text-green-700' },
                  ].map((c) => (
                    <div key={c.label} className="px-4 py-3 text-center border-r last:border-r-0 border-darkgreen/10">
                      <p className="text-xs font-jakarta text-darkgreen/50 uppercase tracking-wide">{c.label}</p>
                      <p className={`font-zodiak font-bold text-sm mt-0.5 ${c.color}`}>{c.value}</p>
                    </div>
                  ))}
                </div>

                {/* Services */}
                <div className="px-5 py-4 border-b border-darkgreen/10">
                  <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-widest mb-3">Services</p>
                  <div className="space-y-2">
                    {selectedInvoice.items?.map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-peach/20 rounded-lg px-4 py-2.5 border border-darkgreen/10">
                        <div>
                          <p className="text-sm font-jakarta font-bold text-darkgreen">{item.particulars}</p>
                          <p className="text-xs text-darkgreen/50 font-jakarta mt-0.5">{item.pax_quantity} PAX × ₹{fmt(item.rate_per_pax)}</p>
                        </div>
                        <p className="font-zodiak font-bold text-sm text-darkgreen">₹{fmt(item.total_amount)}</p>
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
                                <option>BANK TRANSFER</option>
                                <option>UPI</option>
                              </select>
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
