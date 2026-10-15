import { useEffect, useState } from 'react';
import {
  Trash2,
  Plus,
  X,
  Download,
  Mail,
  MessageCircle,
  Eye,
  Edit2,
  FileSpreadsheet,
  GripVertical,
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useWalkInStore from '../store/useWalkInStore';
import { InvoiceTemplate } from '../Invoices/ViewInvoices';
import logo from '../../assets/img/logo.png';
import logoName from '../../assets/img/logoname.png';

// ─── Brand Tokens ─────────────────────────────────────────────────────────────
const B = {
  green: '#386641',
  greenDark: '#2d5235',
  greenLight: '#eef4ef',
  greenMid: '#c8deca',
  peach: '#F2E8CF',
  peachDark: '#e0d0a8',
  peachLight: '#FAF6ED',
  maroon: '#BC4749',
  white: '#FFFFFF',
  ink: '#1a1a1a',
  inkMid: '#3d3d3d',
  inkLight: '#6b7280',
};

const fmt = (n) =>
  parseFloat(n || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ─── Preview Modal ────────────────────────────────────────────────────────────
const PreviewModal = ({ invoice, onClose, onDownload, isGenerating }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.65)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '24px',
      overflowY: 'auto',
    }}
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        maxWidth: '920px',
        width: '100%',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        marginBottom: '24px',
      }}
    >
      {/* Modal Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          background: B.green,
          color: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div>
          <div style={{ fontWeight: '800', fontSize: '16px' }}>Walk-in Invoice Preview</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>
            {invoice.invoice_number}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={onDownload}
            disabled={isGenerating}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: B.peach,
              color: B.green,
              border: 'none',
              borderRadius: '8px',
              padding: '9px 18px',
              fontWeight: '800',
              fontSize: '13px',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.6 : 1,
            }}
          >
            <Download size={16} /> {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '8px',
              padding: '9px',
              cursor: 'pointer',
              color: '#fff',
              display: 'flex',
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
      {/* Invoice Preview */}
      <div
        style={{
          overflowY: 'auto',
          overflowX: 'auto',
          padding: '24px',
          background: '#f9f9f9',
          maxHeight: '80vh',
        }}
      >
        <InvoiceTemplate
          invoice={{ ...invoice, agent: invoice.customer }}
          logoUrl={logo}
          logoNameUrl={logoName}
        />
      </div>
    </div>
  </div>
);

// ─── Sortable Service Row ─────────────────────────────────────────────────────
const SortableServiceItem = ({
  item,
  editingItem,
  setEditingItem,
  handleUpdateService,
  handleDeleteService,
  isLoading,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-lg p-3 border transition-all ${
        editingItem?.id === item.id
          ? 'bg-peach/30 border-darkgreen'
          : 'bg-white border-darkgreen/10 hover:border-darkgreen/30'
      }`}
    >
      {editingItem?.id === item.id ? (
        <div className="space-y-2">
          <textarea
            value={editingItem.particulars}
            onChange={(e) => setEditingItem({ ...editingItem, particulars: e.target.value })}
            rows={3}
            className="w-full border border-darkgreen/20 rounded-lg px-3 py-1.5 text-xs font-jakarta focus:outline-none focus:border-darkgreen resize-y"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="PAX"
              value={editingItem.pax_quantity}
              onChange={(e) => setEditingItem({ ...editingItem, pax_quantity: e.target.value })}
              className="border border-darkgreen/20 rounded-lg px-2 py-1 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
              min="1"
            />
            <input
              type="number"
              placeholder="Rate"
              value={editingItem.rate_per_pax}
              onChange={(e) => setEditingItem({ ...editingItem, rate_per_pax: e.target.value })}
              className="border border-darkgreen/20 rounded-lg px-2 py-1 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
              min="0"
              step="0.01"
            />
            <div className="flex gap-1 justify-end items-center">
              <button
                onClick={handleUpdateService}
                disabled={isLoading}
                className="bg-darkgreen text-peach text-xs font-jakarta font-bold px-3 py-1 rounded-lg hover:bg-darkgreen/90"
              >
                Save
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="border border-darkgreen/20 text-darkgreen text-xs font-jakarta px-2 py-1 rounded-lg hover:bg-peach/30"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <button
              {...attributes}
              {...listeners}
              type="button"
              style={{ touchAction: 'none' }}
              className="cursor-grab active:cursor-grabbing text-darkgreen/30 hover:text-darkgreen p-0.5 mt-0.5"
            >
              <GripVertical size={14} />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-jakarta font-bold text-darkgreen whitespace-pre-line leading-relaxed">
                {item.particulars}
              </p>
              <div className="flex gap-3 mt-1.5 text-[11px] font-jakarta text-darkgreen/60">
                <span>PAX: <b>{item.pax_quantity}</b></span>
                <span>Rate: <b>₹{fmt(item.rate_per_pax)}</b></span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-zodiak font-bold text-sm text-darkgreen">
              ₹{fmt(item.total_amount)}
            </span>
            <button
              onClick={() => setEditingItem({ ...item })}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-darkgreen/60 hover:text-darkgreen hover:bg-peach/30 rounded-lg transition-all"
            >
              <Edit2 size={12} />
            </button>
            <button
              onClick={() => handleDeleteService(item.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ViewWalkInInvoices = () => {
  const {
    customers,
    invoices,
    selectedCustomer,
    selectedInvoice,
    isLoading,
    fetchCustomers,
    fetchCustomerInvoices,
    fetchInvoiceById,
    setSelectedCustomer,
    setSelectedInvoice,
    deleteInvoice,
    addPayment,
    deletePayment,
    addInvoiceItem,
    updateInvoiceItem,
    deleteInvoiceItem,
    reorderInvoiceItems,
  } = useWalkInStore();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const items = selectedInvoice.items;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(items, oldIndex, newIndex);
    setSelectedInvoice({ ...selectedInvoice, items: reordered });
    await reorderInvoiceItems(selectedInvoice.id, reordered.map((i) => i.id));
  };

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentRows, setPaymentRows] = useState([
    { payment_date: '', amount_paid: '', received_by: 'MEMON', bracket: '', notes: '' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Which methods show bracket detail input
  const BRACKET_OPTIONS = ['CASH IN SAR', 'UPI', 'OTHER', 'BANK TRANSFER'];

  // Services state
  const [showAddService, setShowAddService] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newService, setNewService] = useState({
    particulars: '',
    pax_quantity: '',
    rate_per_pax: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSelectCustomer = async (customer) => {
    setSelectedCustomer(customer);
    await fetchCustomerInvoices(customer.id);
  };

  const handleSelectInvoice = async (inv) => {
    await fetchInvoiceById(inv.id);
  };

  const addPaymentRow = () =>
    setPaymentRows([
      ...paymentRows,
      { payment_date: '', amount_paid: '', received_by: 'MEMON', bracket: '', notes: '' },
    ]);

  const removePaymentRow = (i) => {
    if (paymentRows.length > 1) setPaymentRows(paymentRows.filter((_, idx) => idx !== i));
  };

  const updatePaymentRow = (i, field, value) => {
    const updated = [...paymentRows];
    updated[i][field] = value;
    if (field === 'received_by' && !BRACKET_OPTIONS.includes(value)) {
      updated[i].bracket = '';
    }
    setPaymentRows(updated);
  };

  const buildReceivedBy = (row) => {
    if (row.bracket?.trim() && BRACKET_OPTIONS.includes(row.received_by)) {
      return `${row.received_by} (${row.bracket.trim()})`;
    }
    return row.received_by;
  };

  const handleAddPayments = async () => {
    const valid = paymentRows.filter((r) => r.payment_date && r.amount_paid);
    if (valid.length === 0) {
      alert('Please fill payment date and amount for at least one row');
      return;
    }
    for (const r of valid) {
      const received_by = buildReceivedBy(r);
      await addPayment(selectedInvoice.id, {
        payment_date: r.payment_date,
        amount_paid: r.amount_paid,
        received_by,
        notes: r.notes || null,
      });
    }
    setPaymentRows([
      { payment_date: '', amount_paid: '', received_by: 'MEMON', bracket: '', notes: '' },
    ]);
    setShowPaymentForm(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this walk-in invoice?')) return;
    await deleteInvoice(selectedInvoice.id, selectedCustomer?.id);
  };

  const handleAddService = async () => {
    if (!newService.particulars.trim() || !newService.pax_quantity || !newService.rate_per_pax) {
      alert('Please fill all service fields');
      return;
    }
    const ok = await addInvoiceItem(selectedInvoice.id, newService);
    if (ok) {
      setNewService({ particulars: '', pax_quantity: '', rate_per_pax: '' });
      setShowAddService(false);
    }
  };

  const handleUpdateService = async () => {
    if (
      !editingItem.particulars.trim() ||
      !editingItem.pax_quantity ||
      !editingItem.rate_per_pax
    ) {
      alert('Please fill all fields');
      return;
    }
    const ok = await updateInvoiceItem(editingItem.id, selectedInvoice.id, editingItem);
    if (ok) setEditingItem(null);
  };

  const handleDeleteService = async (itemId) => {
    if (selectedInvoice.items.length === 1) {
      alert('Invoice must have at least one service');
      return;
    }
    if (!confirm('Delete this service?')) return;
    await deleteInvoiceItem(itemId, selectedInvoice.id);
  };

  // ── PDF Generation ──
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');
      const el = document.getElementById('walkin-invoice-template');
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      const margin = 5;
      const iw = pw - margin * 2;
      const ih = (canvas.height * iw) / canvas.width;
      const pageContentHeightMM = ph - margin * 2;

      if (ih <= pageContentHeightMM) {
        const img = canvas.toDataURL('image/jpeg', 0.97);
        pdf.addImage(img, 'JPEG', margin, margin, iw, ih);
      } else {
        const pageContentHeightPX = (pageContentHeightMM * canvas.width) / iw;
        let renderedHeightPX = 0;
        let page = 0;

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
            const candidates = rowBottoms.filter(
              (y) => y > renderedHeightPX && y <= maxSliceEnd
            );
            sliceEnd =
              candidates.length > 0
                ? candidates[candidates.length - 1]
                : maxSliceEnd;
          }

          const sliceHeightPX = sliceEnd - renderedHeightPX;
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeightPX;

          const ctx = pageCanvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0,
            renderedHeightPX,
            canvas.width,
            sliceHeightPX,
            0,
            0,
            canvas.width,
            sliceHeightPX
          );

          const sliceImg = pageCanvas.toDataURL('image/jpeg', 0.97);
          const sliceHeightMM = (sliceHeightPX * iw) / canvas.width;

          if (page > 0) pdf.addPage();
          pdf.addImage(sliceImg, 'JPEG', margin, margin, iw, sliceHeightMM);

          renderedHeightPX = sliceEnd;
          page++;
        }
      }

      pdf.save(`${selectedInvoice.invoice_number}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      alert('Could not generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Excel Export ──
  const handleExportExcel = async () => {
    const ExcelJS = await import('exceljs');
    const wb = new ExcelJS.Workbook();
    wb.creator = 'Memon Haj Umrah Tours & Travels';
    const ws = wb.addWorksheet('Invoice');

    const GREEN = '1B5E3B';
    const PEACH = 'F2E8CF';
    const LGRAY = 'F0F7F2';
    const WHITE = 'FFFFFF';

    ws.columns = [
      { width: 5 },
      { width: 42 },
      { width: 10 },
      { width: 16 },
      { width: 16 },
      { width: 4 },
      { width: 16 },
      { width: 16 },
      { width: 22 },
    ];

    const header = (cell, val, bg = GREEN, fg = WHITE, size = 11, bold = true) => {
      ws.getCell(cell).value = val;
      ws.getCell(cell).font = { bold, size, color: { argb: fg }, name: 'Arial' };
      ws.getCell(cell).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      ws.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      ws.getCell(cell).border = {
        top: { style: 'thin', color: { argb: GREEN } },
        bottom: { style: 'thin', color: { argb: GREEN } },
        left: { style: 'thin', color: { argb: GREEN } },
        right: { style: 'thin', color: { argb: GREEN } },
      };
    };

    const cell = (ref, val, bg = WHITE, bold = false, align = 'left', size = 10, fg = '000000') => {
      ws.getCell(ref).value = val;
      ws.getCell(ref).font = { bold, size, color: { argb: fg }, name: 'Arial' };
      ws.getCell(ref).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      ws.getCell(ref).alignment = { vertical: 'middle', horizontal: align, wrapText: true };
      ws.getCell(ref).border = {
        top: { style: 'thin', color: { argb: 'D0E4D5' } },
        bottom: { style: 'thin', color: { argb: 'D0E4D5' } },
        left: { style: 'thin', color: { argb: 'D0E4D5' } },
        right: { style: 'thin', color: { argb: 'D0E4D5' } },
      };
    };

    // Header banner
    ws.mergeCells('A1:I1');
    header('A1', 'MEMON HAJ UMRAH TOURS & TRAVELS', GREEN, PEACH, 15);
    ws.getRow(1).height = 32;

    ws.mergeCells('A2:I2');
    ws.getCell('A2').value =
      '6/A, Asmita Ashirwad Apt, Naya Nagar, Mira Road(E), Thane - 401107 | Ph: +91 81084 04376 | memonhajumrahtours@gmail.com';
    ws.getCell('A2').font = { size: 9, italic: true, name: 'Arial', color: { argb: '555555' } };
    ws.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(2).height = 18;

    ws.addRow([]);

    // Invoice meta
    const dateStr = new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    ws.mergeCells('A4:D4');
    cell('A4', `CUSTOMER: ${selectedInvoice.customer?.name?.toUpperCase()}`, LGRAY, true, 'left', 11, GREEN);
    ws.mergeCells('E4:I4');
    cell(
      'E4',
      `INVOICE: ${selectedInvoice.invoice_number} | DATE: ${dateStr} | HIJRI: ${selectedInvoice.hijri_year}`,
      LGRAY,
      true,
      'right',
      10,
      GREEN
    );
    ws.getRow(4).height = 22;

    ws.addRow([]);

    // Table Headers
    const hRow = 6;
    header(`A${hRow}`, 'SR', GREEN, WHITE, 10);
    header(`B${hRow}`, 'PARTICULARS', GREEN, WHITE, 10);
    header(`C${hRow}`, 'PAX', GREEN, WHITE, 10);
    header(`D${hRow}`, 'RATE (Rs.)', GREEN, WHITE, 10);
    header(`E${hRow}`, 'TOTAL (Rs.)', GREEN, WHITE, 10);
    header(`G${hRow}`, 'DATE', GREEN, WHITE, 10);
    header(`H${hRow}`, 'PAID (Rs.)', GREEN, WHITE, 10);
    header(`I${hRow}`, 'RECEIVED BY', GREEN, WHITE, 10);
    ws.getRow(hRow).height = 20;

    // Data rows
    const items = selectedInvoice.items || [];
    const payments = selectedInvoice.payments || [];
    const maxRows = Math.max(items.length, payments.length, 1);

    for (let i = 0; i < maxRows; i++) {
      const r = hRow + 1 + i;
      const it = items[i];
      const py = payments[i];
      const bg = i % 2 === 0 ? WHITE : LGRAY;

      if (it) {
        cell(`A${r}`, i + 1, bg, false, 'center');
        cell(`B${r}`, it.particulars, bg, false, 'left');
        cell(`C${r}`, it.pax_quantity, bg, false, 'center');
        cell(`D${r}`, `Rs. ${fmt(it.rate_per_pax)}`, bg, false, 'right');
        cell(`E${r}`, `Rs. ${fmt(it.total_amount)}`, bg, true, 'right');
      } else {
        ['A', 'B', 'C', 'D', 'E'].forEach((c) => cell(`${c}${r}`, '', bg));
      }

      cell(`F${r}`, '', WHITE);

      if (py) {
        const pDate = new Date(py.payment_date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
        cell(`G${r}`, pDate, bg, false, 'center');
        cell(`H${r}`, `Rs. ${fmt(py.amount_paid)}`, bg, true, 'right', 10, '15803D');
        cell(`I${r}`, py.received_by, bg, false, 'left');
      } else {
        ['G', 'H', 'I'].forEach((c) => cell(`${c}${r}`, '', bg));
      }
      ws.getRow(r).height = 20;
    }

    // Totals row
    const totRow = hRow + 1 + maxRows;
    ws.mergeCells(`A${totRow}:D${totRow}`);
    cell(`A${totRow}`, 'TOTAL SERVICES', GREEN, true, 'right', 10, WHITE);
    cell(`E${totRow}`, `Rs. ${fmt(selectedInvoice.totalServices)}`, GREEN, true, 'right', 11, PEACH);

    cell(`F${totRow}`, '', WHITE);
    cell(`G${totRow}`, 'TOTAL PAID', GREEN, true, 'center', 10, WHITE);
    cell(`H${totRow}`, `Rs. ${fmt(selectedInvoice.totalPaid)}`, GREEN, true, 'right', 11, PEACH);
    cell(`I${totRow}`, '', GREEN);
    ws.getRow(totRow).height = 22;

    // Buffer & download
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedInvoice.invoice_number}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── WhatsApp Share ──
  const handleWhatsApp = () => {
    let phone = selectedInvoice.customer?.phone || '';
    phone = phone.replace(/[^0-9]/g, '');
    if (phone.length === 10) phone = `91${phone}`;

    const dateStr = new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const msg = encodeURIComponent(
      `*MEMON HAJ UMRAH TOURS & TRAVELS*\n\n` +
        `Invoice: *${selectedInvoice.invoice_number}*\n` +
        `Date: ${dateStr}\n\n` +
        `Dear *${selectedInvoice.customer?.name}*,\n\n` +
        `💰 Total Amount: *₹${fmt(selectedInvoice.totalServices)}*\n` +
        `✅ Amount Received: ₹${fmt(selectedInvoice.totalPaid)}\n` +
        `⚠️ Balance Due: *₹${fmt(selectedInvoice.balance)}*\n\n` +
        `Bank Details:\n` +
        `1️⃣ Bank of Baroda | A/C: 45810200000462 | IFSC: BARB0MIRBHA\n` +
        `2️⃣ Bombay Mercantile Bank | A/C: 010110100090937 | IFSC: BMCB0000010\n\n` +
        `Thank you.\n` +
        `_Memon Haj Umrah Tours & Travels_\n` +
        `📞 8108404376 | 9022549162 | 7977215388`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  // ── Gmail Share ──
  const handleGmail = () => {
    const to = selectedInvoice.customer?.email || '';
    const subject = encodeURIComponent(
      `Invoice ${selectedInvoice.invoice_number} — Memon Haj Umrah Tours & Travels`
    );
    const body = encodeURIComponent(
      `Dear ${selectedInvoice.customer?.name},\n\n` +
        `Please find your walk-in invoice details below:\n\n` +
        `Invoice No     : ${selectedInvoice.invoice_number}\n` +
        `Date           : ${new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN')}\n` +
        `Hijri Year     : ${selectedInvoice.hijri_year}\n\n` +
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
        `Thank you,\n` +
        `Memon Haj Umrah Tours & Travels\n` +
        `Mira Road(E), Thane\n` +
        `Ph: +91 81084 04376 | +91 90225 49162 | +91 79772 15388`
    );
    window.open(`https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6">
        {/* ── Column 1: Customers List ── */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-darkgreen/10 bg-peach/20">
              <p className="text-sm font-bold font-jakarta text-darkgreen">Walk-in Customers</p>
              <p className="text-xs font-jakarta text-darkgreen/50">{customers.length} customers</p>
            </div>
            <div className="divide-y divide-darkgreen/10 max-h-[65vh] overflow-y-auto">
              {isLoading && customers.length === 0 ? (
                <div className="py-8 text-center text-sm text-darkgreen/40 font-jakarta">
                  Loading...
                </div>
              ) : customers.length === 0 ? (
                <div className="py-10 text-center text-sm text-darkgreen/40 font-jakarta">
                  No customers yet
                </div>
              ) : (
                customers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCustomer(c)}
                    className={`w-full text-left px-4 py-3 transition-all hover:bg-peach/20 ${
                      selectedCustomer?.id === c.id ? 'bg-peach/40 border-l-4 border-darkgreen' : ''
                    }`}
                  >
                    <p className="text-sm font-jakarta font-bold text-darkgreen">{c.name}</p>
                    {c.phone && (
                      <p className="text-xs text-darkgreen/50 font-jakarta mt-0.5">📞 {c.phone}</p>
                    )}
                    <span className="inline-block mt-1 text-[11px] font-jakarta text-darkgreen/50 bg-darkgreen/5 px-2 py-0.5 rounded-full">
                      {c._count?.invoices || 0} invoice{c._count?.invoices !== 1 ? 's' : ''}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── Column 2: Customer's Invoices List ── */}
        <div className="col-span-12 md:col-span-3">
          {selectedCustomer ? (
            <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-darkgreen/10 bg-peach/20">
                <p className="text-sm font-bold font-jakarta text-darkgreen">
                  {selectedCustomer.name}
                </p>
                <p className="text-xs font-jakarta text-darkgreen/50">{invoices.length} invoices</p>
              </div>
              <div className="divide-y divide-darkgreen/10 max-h-[65vh] overflow-y-auto">
                {isLoading ? (
                  <div className="py-8 text-center text-sm text-darkgreen/40 font-jakarta">
                    Loading...
                  </div>
                ) : invoices.length === 0 ? (
                  <div className="py-10 text-center text-sm text-darkgreen/40 font-jakarta">
                    No invoices yet
                  </div>
                ) : (
                  invoices.map((inv) => (
                    <button
                      key={inv.id}
                      onClick={() => handleSelectInvoice(inv)}
                      className={`w-full text-left px-4 py-3 transition-all hover:bg-peach/20 ${
                        selectedInvoice?.id === inv.id
                          ? 'bg-peach/40 border-l-4 border-darkgreen'
                          : ''
                      }`}
                    >
                      <p className="text-sm font-jakarta font-bold text-darkgreen">
                        {inv.invoice_number}
                      </p>
                      <p className="text-xs text-darkgreen/40 font-jakarta mt-0.5">
                        {new Date(inv.invoice_date).toLocaleDateString('en-IN')}
                      </p>
                      <div
                        className={`inline-block mt-1.5 text-xs font-bold font-jakarta px-2 py-0.5 rounded-full ${
                          parseFloat(inv.balance) > 0
                            ? 'bg-red-50 text-red-600'
                            : 'bg-green-50 text-green-700'
                        }`}
                      >
                        ₹{fmt(inv.balance)} {parseFloat(inv.balance) > 0 ? 'due' : 'cleared'}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-darkgreen/15 rounded-xl p-10 text-center text-sm text-darkgreen/40 font-jakarta shadow-sm">
              ← Select a walk-in customer
            </div>
          )}
        </div>

        {/* ── Column 3: Invoice Detail ── */}
        <div className="col-span-12 md:col-span-6">
          {selectedInvoice ? (
            <div className="bg-white border border-darkgreen/15 rounded-xl overflow-hidden shadow-sm">
              {/* Action Bar */}
              <div className="px-5 py-4 border-b border-darkgreen/10 bg-peach/10">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-zodiak font-bold text-darkgreen text-lg">
                      {selectedInvoice.invoice_number}
                    </p>
                    <p className="text-xs font-jakarta text-darkgreen/50 mt-0.5">
                      {new Date(selectedInvoice.invoice_date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                      &nbsp;·&nbsp; {selectedInvoice.hijri_year}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setShowPreview(true)}
                      className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-darkgreen text-peach px-3 py-2 rounded-lg hover:bg-darkgreen/90 transition-all"
                    >
                      <Eye size={14} /> Preview & Download
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#1ebe5d] transition-all"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </button>
                    <button
                      onClick={handleGmail}
                      className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-[#EA4335] text-white px-3 py-2 rounded-lg hover:bg-[#d33426] transition-all"
                    >
                      <Mail size={14} /> Gmail
                    </button>
                    <button
                      onClick={handleExportExcel}
                      className="flex items-center gap-1.5 text-xs font-jakarta font-bold bg-emerald-700 text-white px-3 py-2 rounded-lg hover:bg-emerald-800 transition-all"
                    >
                      <FileSpreadsheet size={14} /> Excel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-1.5 text-xs font-jakarta font-bold border border-red-200 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 border-b border-darkgreen/10">
                {[
                  {
                    label: 'Total Amount',
                    value: `₹${fmt(selectedInvoice.totalServices)}`,
                    color: 'text-darkgreen',
                  },
                  {
                    label: 'Amount Paid',
                    value: `₹${fmt(selectedInvoice.totalPaid)}`,
                    color: 'text-green-700',
                  },
                  {
                    label: 'Balance Due',
                    value: `₹${fmt(selectedInvoice.balance)}`,
                    color: parseFloat(selectedInvoice.balance) > 0 ? 'text-maroon' : 'text-green-700',
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="px-3 py-3 text-center border-r last:border-r-0 border-darkgreen/10"
                  >
                    <p className="text-xs font-jakarta text-darkgreen/50 uppercase tracking-wide mb-1">
                      {c.label}
                    </p>
                    <p className={`font-jakarta font-bold text-xs leading-tight ${c.color}`}>
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Collection Summary */}
              {selectedInvoice.payments?.length > 0 &&
                (() => {
                  const methodMap = {};
                  selectedInvoice.payments.forEach((p) => {
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
                        <p className="text-xs font-bold font-jakarta text-darkgreen uppercase tracking-widest">
                          Collection Summary
                        </p>
                      </div>
                      <div className="divide-y divide-darkgreen/10">
                        {Object.entries(methodMap).map(([method, data]) => {
                          const labels = Object.entries(data.labels);
                          const hasSubGroups = labels.length > 1 || labels[0]?.[0] !== method;
                          return (
                            <div key={method} className="px-4 py-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-jakarta font-bold text-darkgreen">{method}</p>
                                <p className="font-zodiak font-bold text-sm text-darkgreen">
                                  ₹{fmt(data.total)}
                                </p>
                              </div>
                              {hasSubGroups &&
                                labels.map(
                                  ([label, total]) =>
                                    label !== method && (
                                      <div
                                        key={label}
                                        className="flex justify-between items-center mt-1 pl-3 border-l-2 border-darkgreen/20"
                                      >
                                        <p className="text-xs font-jakarta text-darkgreen/60">
                                          {label}
                                        </p>
                                        <p className="text-xs font-jakarta font-semibold text-darkgreen/70">
                                          ₹{fmt(total)}
                                        </p>
                                      </div>
                                    )
                                )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

              {/* Services Section */}
              <div className="px-5 py-4 border-b border-darkgreen/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-widest">
                    Services
                  </p>
                  <button
                    onClick={() => {
                      setShowAddService(!showAddService);
                      setEditingItem(null);
                    }}
                    className="flex items-center gap-1 text-xs font-jakarta font-bold text-darkgreen border border-darkgreen/30 px-3 py-1.5 rounded-lg hover:bg-peach/30 transition-all"
                  >
                    {showAddService ? (
                      <>
                        <X size={12} /> Cancel
                      </>
                    ) : (
                      <>
                        <Plus size={12} /> Add Service
                      </>
                    )}
                  </button>
                </div>

                {/* Add Service Form */}
                {showAddService && (
                  <div className="bg-peach/20 rounded-xl p-3 mb-3 border border-darkgreen/15 space-y-2">
                    <textarea
                      placeholder={
                        '02 PAX UMRAH PACKAGE 15 DAYS\nMAKKAH: SWISSOTEL\nMADINA: ANWAR AL MADINAH'
                      }
                      value={newService.particulars}
                      onChange={(e) =>
                        setNewService({ ...newService, particulars: e.target.value })
                      }
                      rows={3}
                      className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen resize-y"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="PAX / Qty"
                        value={newService.pax_quantity}
                        onChange={(e) =>
                          setNewService({ ...newService, pax_quantity: e.target.value })
                        }
                        className="border border-darkgreen/20 rounded-lg px-2 py-1 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
                        min="1"
                      />
                      <input
                        type="number"
                        placeholder="Rate (₹)"
                        value={newService.rate_per_pax}
                        onChange={(e) =>
                          setNewService({ ...newService, rate_per_pax: e.target.value })
                        }
                        className="border border-darkgreen/20 rounded-lg px-2 py-1 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
                        min="0"
                        step="0.01"
                      />
                      <button
                        onClick={handleAddService}
                        disabled={isLoading}
                        className="bg-darkgreen text-peach text-xs font-jakarta font-bold py-1 rounded-lg hover:bg-darkgreen/90"
                      >
                        Add Service
                      </button>
                    </div>
                  </div>
                )}

                {/* Sortable Services List */}
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={selectedInvoice.items?.map((i) => i.id) || []}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {selectedInvoice.items?.map((item) => (
                        <SortableServiceItem
                          key={item.id}
                          item={item}
                          editingItem={editingItem}
                          setEditingItem={setEditingItem}
                          handleUpdateService={handleUpdateService}
                          handleDeleteService={handleDeleteService}
                          isLoading={isLoading}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

              {/* Payments Section */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-widest">
                    Payments
                  </p>
                  <button
                    onClick={() => setShowPaymentForm(!showPaymentForm)}
                    className="flex items-center gap-1 text-xs font-jakarta font-bold text-darkgreen border border-darkgreen/30 px-3 py-1.5 rounded-lg hover:bg-peach/30 transition-all"
                  >
                    {showPaymentForm ? (
                      <>
                        <X size={12} /> Cancel
                      </>
                    ) : (
                      <>
                        <Plus size={12} /> Add Payment
                      </>
                    )}
                  </button>
                </div>

                {/* Payment Entry Form */}
                {showPaymentForm && (
                  <div className="bg-peach/20 rounded-xl p-3 mb-4 border border-darkgreen/15 space-y-2">
                    <div className="space-y-2">
                      {paymentRows.map((row, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-12 gap-1.5 items-center bg-white p-2 rounded-lg border border-darkgreen/10"
                        >
                          <div className="col-span-12 md:col-span-3">
                            <input
                              type="date"
                              value={row.payment_date}
                              onChange={(e) => updatePaymentRow(i, 'payment_date', e.target.value)}
                              className="w-full border border-darkgreen/20 rounded-lg px-2 py-1.5 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
                            />
                          </div>
                          <div className="col-span-12 md:col-span-2">
                            <input
                              type="number"
                              placeholder="Amount (₹)"
                              value={row.amount_paid}
                              onChange={(e) => updatePaymentRow(i, 'amount_paid', e.target.value)}
                              className="w-full border border-darkgreen/20 rounded-lg px-2 py-1.5 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <select
                              value={row.received_by}
                              onChange={(e) => updatePaymentRow(i, 'received_by', e.target.value)}
                              className="w-full border border-darkgreen/20 rounded-lg px-2 py-1.5 text-xs font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                            >
                              <option value="MEMON">MEMON</option>
                              <option value="UPI">UPI</option>
                              <option value="CASH IN SAR">CASH IN SAR</option>
                              <option value="BANK TRANSFER">BANK TRANSFER</option>
                              <option value="CASH">CASH</option>
                              <option value="OTHER">OTHER</option>
                            </select>
                          </div>
                          <div className="col-span-6 md:col-span-2">
                            {BRACKET_OPTIONS.includes(row.received_by) ? (
                              <input
                                type="text"
                                placeholder={
                                  row.received_by === 'CASH IN SAR'
                                    ? 'e.g. 2600*26'
                                    : 'e.g. WAHID'
                                }
                                value={row.bracket}
                                onChange={(e) => updatePaymentRow(i, 'bracket', e.target.value)}
                                className="w-full border border-darkgreen/20 rounded-lg px-2 py-1.5 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
                              />
                            ) : (
                              <input
                                type="text"
                                placeholder="Notes"
                                value={row.notes}
                                onChange={(e) => updatePaymentRow(i, 'notes', e.target.value)}
                                className="w-full border border-darkgreen/20 rounded-lg px-2 py-1.5 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
                              />
                            )}
                          </div>
                          <div className="col-span-11 md:col-span-1">
                            {BRACKET_OPTIONS.includes(row.received_by) && (
                              <input
                                type="text"
                                placeholder="Notes"
                                value={row.notes}
                                onChange={(e) => updatePaymentRow(i, 'notes', e.target.value)}
                                className="w-full border border-darkgreen/20 rounded-lg px-2 py-1 text-xs font-jakarta focus:outline-none focus:border-darkgreen"
                              />
                            )}
                          </div>
                          <div className="col-span-1 flex justify-end">
                            {paymentRows.length > 1 && (
                              <button
                                onClick={() => removePaymentRow(i)}
                                className="text-red-400 hover:text-red-600 p-1 transition-all"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={addPaymentRow}
                        className="flex items-center gap-1.5 text-xs font-jakarta font-bold text-darkgreen border border-darkgreen/30 px-3 py-2 rounded-lg hover:bg-peach/30 transition-all"
                      >
                        <Plus size={13} /> Add Row
                      </button>
                      <button
                        onClick={handleAddPayments}
                        disabled={isLoading}
                        className="flex-1 bg-darkgreen text-peach font-jakarta font-bold py-2 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all text-sm"
                      >
                        {isLoading
                          ? 'Recording...'
                          : `Save ${
                              paymentRows.filter((r) => r.payment_date && r.amount_paid).length
                            } Payment${
                              paymentRows.filter((r) => r.payment_date && r.amount_paid).length !== 1
                                ? 's'
                                : ''
                            }`}
                      </button>
                    </div>
                  </div>
                )}

                {/* Payments List */}
                {selectedInvoice.payments?.length === 0 ? (
                  <p className="text-center py-5 text-sm text-darkgreen/40 font-jakarta italic">
                    No payments recorded yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedInvoice.payments?.map((p, i) => (
                      <div
                        key={p.id || i}
                        className="flex items-center justify-between bg-green-50/60 rounded-lg px-4 py-2.5 border border-green-100"
                      >
                        <div>
                          <p className="text-sm font-jakarta font-bold text-darkgreen">
                            {new Date(p.payment_date).toLocaleDateString('en-IN')}
                          </p>
                          <p className="text-xs text-darkgreen/50 font-jakarta mt-0.5">
                            {p.received_by}
                            {p.notes ? ` · ${p.notes}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-zodiak font-bold text-sm text-green-700">
                            ₹{fmt(p.amount_paid)}
                          </p>
                          <button
                            onClick={() => deletePayment(p.id, selectedInvoice.id)}
                            className="text-red-400 hover:text-red-600 transition-all p-1"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-darkgreen/15 rounded-xl p-16 text-center text-sm text-darkgreen/40 font-jakarta shadow-sm">
              ← Select a walk-in invoice to view details
            </div>
          )}
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

      {/* Hidden template for PDF canvas capture */}
      {selectedInvoice && (
        <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }} aria-hidden="true">
          <div id="walkin-invoice-template">
            <InvoiceTemplate
              invoice={{ ...selectedInvoice, agent: selectedInvoice.customer }}
              logoUrl={logo}
              logoNameUrl={logoName}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWalkInInvoices;
