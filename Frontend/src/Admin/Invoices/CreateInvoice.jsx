import { useEffect, useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import useInvoiceStore from '../store/useInvoiceStore';
import { useNavigate } from 'react-router-dom';

const emptyItem = { particulars: '', pax_quantity: '', rate_per_pax: '' };

const CreateInvoice = () => {
  const { agents, isLoading, fetchAgents, createInvoice } = useInvoiceStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    agent_id: '',
    hijri_year: '1447-1448/2026-2027',
    items: [{ ...emptyItem }],
  });

  useEffect(() => { fetchAgents(); }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = value;
    setForm({ ...form, items: updated });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { ...emptyItem }] });

  const removeItem = (index) => {
    if (form.items.length === 1) return;
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  const calcTotal = (pax, rate) => {
    const p = parseFloat(pax) || 0;
    const r = parseFloat(rate) || 0;
    return (p * r).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const grandTotal = form.items.reduce((sum, item) => {
    return sum + (parseFloat(item.pax_quantity) || 0) * (parseFloat(item.rate_per_pax) || 0);
  }, 0);

  const handleSubmit = async () => {
    if (!form.agent_id) { alert('Please select an agent'); return; }
    if (!form.hijri_year.trim()) { alert('Please enter Hijri year'); return; }
    const validItems = form.items.filter(i => i.particulars.trim() && i.pax_quantity && i.rate_per_pax);
    if (validItems.length === 0) { alert('Please add at least one item with all details'); return; }

    const success = await createInvoice({ ...form, items: validItems });
    if (success) {
      setForm({ agent_id: '', hijri_year: '1447-1448/2026-2027', items: [{ ...emptyItem }] });
      navigate('/admin/invoices/view');
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-semibold font-zodiak mb-8">Create Invoice</h2>

      <div className="space-y-6">
        {/* Agent + Hijri Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">Agent *</label>
            <select
              value={form.agent_id}
              onChange={(e) => setForm({ ...form, agent_id: e.target.value })}
              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2.5 text-sm font-jakarta focus:outline-none focus:border-darkgreen bg-white"
            >
              <option value="">Select agent...</option>
              {agents.map((a) => (
                <option key={a.agent_id} value={a.agent_id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">Hijri Year *</label>
            <input
              type="text"
              value={form.hijri_year}
              onChange={(e) => setForm({ ...form, hijri_year: e.target.value })}
              className="w-full border border-darkgreen/20 rounded-lg px-3 py-2.5 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              placeholder="1447-1448/2026-2027"
            />
          </div>
        </div>

        {/* Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold font-jakarta text-darkgreen/70">Service Items *</label>
            <button
              onClick={addItem}
              className="flex items-center gap-1 text-xs font-jakarta font-semibold text-darkgreen border border-darkgreen/30 px-3 py-1.5 rounded-lg hover:bg-darkgreen/5 transition-all"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-2 mb-2 text-xs font-semibold font-jakarta text-darkgreen/50 uppercase tracking-wide px-1">
            <div className="col-span-6">Particulars</div>
            <div className="col-span-2">PAX / Qty</div>
            <div className="col-span-2">Rate (₹)</div>
            <div className="col-span-1">Total</div>
            <div className="col-span-1"></div>
          </div>

          <div className="space-y-2">
            {form.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-start bg-white border border-darkgreen/15 rounded-lg p-2">
                <div className="col-span-12 md:col-span-6">
                  <textarea
                    placeholder="e.g. 35ADT JUNE PACKAGE 15DAYS DELUXE&#10;MAKKAH: DURRAT SALAH&#10;MADINA: MARKAZIYA"
                    value={item.particulars}
                    onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                    rows={3}
                    className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen resize-none"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <input
                    type="number"
                    placeholder="PAX"
                    value={item.pax_quantity}
                    onChange={(e) => handleItemChange(index, 'pax_quantity', e.target.value)}
                    className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
                    min="1"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate_per_pax}
                    onChange={(e) => handleItemChange(index, 'rate_per_pax', e.target.value)}
                    className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-3 md:col-span-1 text-sm font-jakarta font-semibold text-darkgreen text-right md:text-left">
                  ₹{calcTotal(item.pax_quantity, item.rate_per_pax)}
                </div>
                <div className="col-span-1 flex justify-end">
                  {form.items.length > 1 && (
                    <button onClick={() => removeItem(index)} className="p-1 text-red-400 hover:text-red-600 transition-all">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div className="flex justify-end mt-3">
            <div className="bg-darkgreen text-peach px-5 py-2.5 rounded-lg">
              <span className="text-xs font-jakarta opacity-70">Grand Total</span>
              <p className="font-zodiak font-semibold text-lg">
                ₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center gap-2 bg-darkgreen text-peach font-jakarta font-semibold px-6 py-3 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all"
        >
          <Check size={18} /> {isLoading ? 'Creating...' : 'Create Invoice'}
        </button>
      </div>
    </div>
  );
};

export default CreateInvoice;
