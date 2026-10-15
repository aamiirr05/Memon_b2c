import { useEffect, useState } from 'react';
import { Plus, X, Check, User, Phone, CreditCard, Sparkles } from 'lucide-react';
import useWalkInStore from '../store/useWalkInStore';
import { useNavigate } from 'react-router-dom';

const emptyItem = { particulars: '', pax_quantity: '1', rate_per_pax: '' };

const CreateWalkInInvoice = () => {
  const { customers, isLoading, fetchCustomers, createInvoice } = useWalkInStore();
  const navigate = useNavigate();

  // Mode: 'new' or 'existing'
  const [customerMode, setCustomerMode] = useState('new');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  // Customer fields
  const [customerForm, setCustomerForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  // Invoice fields
  const [hijriYear, setHijriYear] = useState('1447-1448/2026-2027');
  const [items, setItems] = useState([{ ...emptyItem }]);

  // Payment fields (default ON for quick counter collection)
  const [recordPayment, setRecordPayment] = useState(true);
  const [paymentForm, setPaymentForm] = useState({
    amount_paid: '',
    payment_date: new Date().toISOString().split('T')[0],
    received_by: 'UPI',
    bracket: '',
    notes: '',
  });

  const BRACKET_OPTIONS = ['CASH IN SAR', 'UPI', 'OTHER', 'BANK TRANSFER'];

  useEffect(() => {
    fetchCustomers();
  }, []);

  // When existing customer is selected from dropdown
  const handleSelectExistingCustomer = (id) => {
    setSelectedCustomerId(id);
    const found = customers.find((c) => c.id === id);
    if (found) {
      setCustomerForm({
        name: found.name || '',
        phone: found.phone || '',
        email: found.email || '',
        address: found.address || '',
      });
    }
  };

  // Item helpers
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { ...emptyItem }]);

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const calcLineTotal = (pax, rate) => {
    const p = parseFloat(pax) || 0;
    const r = parseFloat(rate) || 0;
    return (p * r).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const grandTotal = items.reduce((sum, item) => {
    return sum + (parseFloat(item.pax_quantity) || 0) * (parseFloat(item.rate_per_pax) || 0);
  }, 0);

  const amountPaidNumber = parseFloat(paymentForm.amount_paid) || 0;
  const balanceDue = Math.max(0, grandTotal - amountPaidNumber);

  // Quick preset payment buttons
  const setQuickAmount = (amt) => {
    setPaymentForm((prev) => ({ ...prev, amount_paid: String(amt) }));
  };

  const handleSubmit = async () => {
    // Validation
    if (customerMode === 'existing' && !selectedCustomerId) {
      alert('Please select an existing customer');
      return;
    }
    if (customerMode === 'new') {
      if (!customerForm.name.trim()) {
        alert('Please enter customer name');
        return;
      }
      if (!customerForm.phone.trim()) {
        alert('Please enter customer phone number');
        return;
      }
    }

    if (!hijriYear.trim()) {
      alert('Please enter Hijri year');
      return;
    }

    const validItems = items.filter(
      (i) => i.particulars.trim() && i.pax_quantity && i.rate_per_pax
    );
    if (validItems.length === 0) {
      alert('Please add at least one service item with particulars, pax, and rate');
      return;
    }

    // Build payload
    let receivedByFinal = paymentForm.received_by;
    if (paymentForm.bracket?.trim() && BRACKET_OPTIONS.includes(paymentForm.received_by)) {
      receivedByFinal = `${paymentForm.received_by} (${paymentForm.bracket.trim()})`;
    }

    const payload = {
      ...(customerMode === 'existing'
        ? { customer_id: selectedCustomerId }
        : {
            customer_name: customerForm.name.trim(),
            customer_phone: customerForm.phone.trim(),
            customer_email: customerForm.email.trim() || null,
            customer_address: customerForm.address.trim() || null,
          }),
      hijri_year: hijriYear.trim(),
      items: validItems,
      ...(recordPayment && amountPaidNumber > 0
        ? {
            payment: {
              amount_paid: amountPaidNumber,
              payment_date: paymentForm.payment_date,
              received_by: receivedByFinal,
              notes: paymentForm.notes.trim() || null,
            },
          }
        : {}),
    };

    const created = await createInvoice(payload);
    if (created) {
      // Navigate straight to Invoices view where the new invoice is automatically loaded
      navigate('/admin/walkin-invoices/view');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-zodiak text-darkgreen flex items-center gap-2">
            <Sparkles className="text-amber-600" size={24} /> Walk-in Quick Billing
          </h2>
          <p className="text-xs text-darkgreen/60 font-jakarta mt-1">
            Customer, Services, and Payment — all in one single screen for instant counter billing
          </p>
        </div>
      </div>

      {/* ── CARD 1: CUSTOMER DETAILS ── */}
      <div className="bg-white border border-darkgreen/15 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-darkgreen/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-darkgreen/10 flex items-center justify-center text-darkgreen">
              <User size={18} />
            </div>
            <h3 className="font-zodiak font-bold text-darkgreen text-lg">1. Customer Information</h3>
          </div>

          {/* Toggle New / Existing */}
          <div className="flex bg-darkgreen/5 p-1 rounded-lg border border-darkgreen/10 text-xs font-jakarta">
            <button
              type="button"
              onClick={() => {
                setCustomerMode('new');
                setSelectedCustomerId('');
              }}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                customerMode === 'new'
                  ? 'bg-darkgreen text-peach shadow-xs'
                  : 'text-darkgreen/60 hover:text-darkgreen'
              }`}
            >
              + New Customer
            </button>
            <button
              type="button"
              onClick={() => setCustomerMode('existing')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                customerMode === 'existing'
                  ? 'bg-darkgreen text-peach shadow-xs'
                  : 'text-darkgreen/60 hover:text-darkgreen'
              }`}
            >
              Select Existing ({customers.length})
            </button>
          </div>
        </div>

        {customerMode === 'existing' ? (
          <div className="mb-4">
            <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
              Search / Select Existing Walk-in Customer *
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => handleSelectExistingCustomer(e.target.value)}
              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2.5 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
            >
              <option value="">Choose customer...</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.phone ? `(${c.phone})` : ''}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Mohammed Ismail"
              value={customerForm.name}
              onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              disabled={customerMode === 'existing'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
              Phone Number * (for WhatsApp Invoice)
            </label>
            <input
              type="text"
              placeholder="e.g. 9876543210"
              value={customerForm.phone}
              onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              disabled={customerMode === 'existing'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              placeholder="customer@email.com"
              value={customerForm.email}
              onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              disabled={customerMode === 'existing'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
              Address / City (Optional)
            </label>
            <input
              type="text"
              placeholder="City, Area"
              value={customerForm.address}
              onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              disabled={customerMode === 'existing'}
            />
          </div>
        </div>
      </div>

      {/* ── CARD 2: SERVICES & PACKAGE DETAILS ── */}
      <div className="bg-white border border-darkgreen/15 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-darkgreen/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-darkgreen/10 flex items-center justify-center text-darkgreen">
              <Phone size={18} />
            </div>
            <h3 className="font-zodiak font-bold text-darkgreen text-lg">2. Invoice & Services</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold font-jakarta text-darkgreen/60">Hijri Year:</span>
            <input
              type="text"
              value={hijriYear}
              onChange={(e) => setHijriYear(e.target.value)}
              className="border border-darkgreen/20 rounded-lg px-2.5 py-1 text-xs font-jakarta focus:outline-none focus:border-darkgreen w-48 text-center"
            />
          </div>
        </div>

        {/* Service rows */}
        <div className="space-y-3">
          <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-bold font-jakarta text-darkgreen/50 uppercase tracking-wide px-1">
            <div className="col-span-6">Service Particulars / Hotels Description</div>
            <div className="col-span-2">PAX / Qty</div>
            <div className="col-span-2">Rate (₹)</div>
            <div className="col-span-1 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 items-start bg-peach/10 border border-darkgreen/15 rounded-lg p-2.5"
            >
              <div className="col-span-12 md:col-span-6">
                <textarea
                  placeholder="e.g. 02 ADT UMRAH DELUXE 15 DAYS&#10;MAKKAH: SWISSOTEL AL MAQAM (4N)&#10;MADINA: ANWAR AL MADINAH (5N)"
                  value={item.particulars}
                  onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                  rows={2}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen resize-y bg-white"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <input
                  type="number"
                  placeholder="PAX"
                  value={item.pax_quantity}
                  onChange={(e) => handleItemChange(index, 'pax_quantity', e.target.value)}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                  min="1"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <input
                  type="number"
                  placeholder="Rate per Pax"
                  value={item.rate_per_pax}
                  onChange={(e) => handleItemChange(index, 'rate_per_pax', e.target.value)}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="col-span-3 md:col-span-1 text-sm font-jakarta font-bold text-darkgreen text-right pt-2">
                ₹{calcLineTotal(item.pax_quantity, item.rate_per_pax)}
              </div>
              <div className="col-span-1 flex justify-end pt-2">
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="p-1 text-red-400 hover:text-red-600 transition-all"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addItem}
            className="flex items-center gap-1.5 text-xs font-jakarta font-bold text-darkgreen border border-darkgreen/30 px-3 py-2 rounded-lg hover:bg-peach/30 transition-all mt-2"
          >
            <Plus size={14} /> Add Another Service Item
          </button>
        </div>

        {/* Grand Total Bar */}
        <div className="mt-5 flex justify-end">
          <div className="bg-peach/30 border border-darkgreen/20 rounded-xl px-5 py-3 text-right">
            <span className="text-xs font-bold font-jakarta text-darkgreen/60 uppercase tracking-wide">
              Total Package / Services Bill
            </span>
            <p className="font-zodiak font-bold text-2xl text-darkgreen mt-0.5">
              ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* ── CARD 3: PAYMENT DETAILS (COUNTER COLLECTION) ── */}
      <div className="bg-white border border-darkgreen/15 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-darkgreen/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-darkgreen/10 flex items-center justify-center text-darkgreen">
              <CreditCard size={18} />
            </div>
            <h3 className="font-zodiak font-bold text-darkgreen text-lg">
              3. Payment Collected at Counter
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-jakarta font-bold text-darkgreen">
            <input
              type="checkbox"
              checked={recordPayment}
              onChange={(e) => setRecordPayment(e.target.checked)}
              className="w-4 h-4 text-darkgreen rounded border-darkgreen/30 focus:ring-0"
            />
            Record Payment Now
          </label>
        </div>

        {recordPayment ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                  Amount Paid (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={paymentForm.amount_paid}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount_paid: e.target.value })}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen font-bold text-darkgreen"
                  min="0"
                  step="0.01"
                />
                {/* Quick set amount pills */}
                {grandTotal > 0 && (
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setQuickAmount(grandTotal)}
                      className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-bold hover:bg-green-100"
                    >
                      Full Paid (₹{grandTotal})
                    </button>
                    {grandTotal >= 50000 && (
                      <button
                        type="button"
                        onClick={() => setQuickAmount(50000)}
                        className="text-[10px] bg-darkgreen/5 text-darkgreen border border-darkgreen/10 px-2 py-0.5 rounded-full font-bold hover:bg-darkgreen/10"
                      >
                        ₹50,000
                      </button>
                    )}
                    {grandTotal >= 25000 && (
                      <button
                        type="button"
                        onClick={() => setQuickAmount(25000)}
                        className="text-[10px] bg-darkgreen/5 text-darkgreen border border-darkgreen/10 px-2 py-0.5 rounded-full font-bold hover:bg-darkgreen/10"
                      >
                        ₹25,000
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  value={paymentForm.payment_date}
                  onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentForm.received_by}
                  onChange={(e) => setPaymentForm({ ...paymentForm, received_by: e.target.value })}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white font-semibold"
                >
                  <option value="UPI">UPI</option>
                  <option value="CASH">CASH</option>
                  <option value="CASH IN SAR">CASH IN SAR</option>
                  <option value="BANK TRANSFER">BANK TRANSFER</option>
                  <option value="MEMON">MEMON</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                  {paymentForm.received_by === 'CASH IN SAR'
                    ? 'SAR Rate / Bracket'
                    : 'Detail / Received By'}
                </label>
                <input
                  type="text"
                  placeholder={
                    paymentForm.received_by === 'CASH IN SAR'
                      ? 'e.g. 2600*26'
                      : paymentForm.received_by === 'UPI'
                      ? 'e.g. WAHID or GPay'
                      : 'Reference / Notes'
                  }
                  value={paymentForm.bracket}
                  onChange={(e) => setPaymentForm({ ...paymentForm, bracket: e.target.value })}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
                />
              </div>
            </div>

            {/* Live Calculation Summary Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-darkgreen/10">
              <div className="bg-darkgreen/5 rounded-lg p-3 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-darkgreen/60">
                  Total Bill
                </span>
                <p className="font-zodiak font-bold text-lg text-darkgreen">
                  ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-green-700">
                  Received Now
                </span>
                <p className="font-zodiak font-bold text-lg text-green-700">
                  ₹{amountPaidNumber.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div
                className={`rounded-lg p-3 text-center border ${
                  balanceDue > 0
                    ? 'bg-red-50 border-red-100 text-maroon'
                    : 'bg-green-50 border-green-100 text-green-700'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Balance Remaining
                </span>
                <p className="font-zodiak font-bold text-lg">
                  ₹{balanceDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs font-jakarta text-darkgreen/50 italic">
            No payment will be recorded initially. Full bill will be marked as Balance Due.
          </p>
        )}
      </div>

      {/* ── CARD 4: ONE-CLICK GENERATE & VIEW ── */}
      <div className="flex items-center justify-between bg-darkgreen text-peach p-5 rounded-xl shadow-md">
        <div>
          <p className="font-zodiak font-bold text-lg text-peach">Ready to Generate Invoice?</p>
          <p className="text-xs font-jakarta opacity-80 mt-0.5">
            Will automatically create customer, generate sequential invoice number (INV-WI-XXXX),
            and credit payment.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 bg-peach text-darkgreen font-jakarta font-bold px-6 py-3 rounded-lg hover:bg-peach/90 disabled:opacity-50 transition-all text-sm shadow-sm"
        >
          <Check size={18} />
          {isLoading ? 'Creating Invoice...' : 'Generate & Open Invoice'}
        </button>
      </div>
    </div>
  );
};

export default CreateWalkInInvoice;
