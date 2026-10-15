import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Check, Users } from 'lucide-react';
import useWalkInStore from '../store/useWalkInStore';

const emptyForm = { name: '', phone: '', email: '', address: '' };

const WalkInCustomers = () => {
  const { customers, isLoading, fetchCustomers, createCustomer, updateCustomer, deleteCustomer } =
    useWalkInStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    const success = editingCustomer
      ? await updateCustomer(editingCustomer.id, form)
      : await createCustomer(form);
    if (success) {
      setForm(emptyForm);
      setShowForm(false);
      setEditingCustomer(null);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setForm({
      name: customer.name || '',
      phone: customer.phone || '',
      email: customer.email || '',
      address: customer.address || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (customerId) => {
    if (!confirm('Delete this customer? All their walk-in invoices will also be deleted.')) return;
    await deleteCustomer(customerId);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
    setForm(emptyForm);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold font-zodiak">Walk-in Customers</h2>
          <p className="text-xs text-darkgreen/60 font-jakarta mt-1">
            Manage individual walk-in customers and their contact details
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-darkgreen text-peach font-jakarta font-semibold px-4 py-2 rounded-lg hover:bg-darkgreen/90 transition-all text-sm"
          >
            <Plus size={16} /> Add Customer
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-darkgreen/20 rounded-xl p-6 mb-8 shadow-sm max-w-2xl">
          <h3 className="font-zodiak font-semibold text-lg mb-5">
            {editingCustomer ? 'Edit Walk-in Customer' : 'New Walk-in Customer'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Mohammed Ismail"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                placeholder="e.g. +91 9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="customer@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">
                Address (Optional)
              </label>
              <textarea
                placeholder="Full residential / postal address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !form.name.trim() || !form.phone.trim()}
              className="flex items-center gap-2 bg-darkgreen text-peach font-jakarta font-semibold px-5 py-2 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all text-sm"
            >
              <Check size={16} /> {editingCustomer ? 'Update Customer' : 'Save Customer'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 border border-darkgreen/30 text-darkgreen font-jakarta font-semibold px-5 py-2 rounded-lg hover:bg-darkgreen/5 transition-all text-sm"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Customer Cards */}
      {isLoading && !showForm ? (
        <div className="text-center py-10 text-darkgreen/50 font-jakarta">Loading customers...</div>
      ) : customers.length === 0 ? (
        <div className="text-center py-16 text-darkgreen/40 font-jakarta">
          <Users size={40} className="mx-auto mb-3 opacity-40" />
          <p>No walk-in customers added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white border border-darkgreen/15 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-zodiak font-semibold text-darkgreen text-lg">{customer.name}</h3>
                  <span className="text-xs font-jakarta text-darkgreen/50 bg-darkgreen/5 px-2 py-0.5 rounded-full">
                    {customer._count?.invoices || 0} invoice{customer._count?.invoices !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(customer)}
                    title="Edit Customer"
                    className="p-1.5 rounded-lg hover:bg-darkgreen/10 text-darkgreen transition-all"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    title="Delete Customer"
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-sm font-jakarta text-darkgreen/70">
                {customer.phone && <p>📞 {customer.phone}</p>}
                {customer.email && <p>✉️ {customer.email}</p>}
                {customer.address && <p>📍 {customer.address}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalkInCustomers;
