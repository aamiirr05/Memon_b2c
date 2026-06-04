import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Check, Users } from 'lucide-react';
import useInvoiceStore from '../store/useInvoiceStore';

const emptyForm = { name: '', email: '', phone: '', address: '', gst_number: '' };

const Agents = () => {
  const { agents, isLoading, fetchAgents, createAgent, updateAgent, deleteAgent } = useInvoiceStore();
  const [showForm, setShowForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { fetchAgents(); }, []);

  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    const success = editingAgent
      ? await updateAgent(editingAgent.agent_id, form)
      : await createAgent(form);
    if (success) { setForm(emptyForm); setShowForm(false); setEditingAgent(null); }
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
    setForm({ name: agent.name || '', email: agent.email || '', phone: agent.phone || '', address: agent.address || '', gst_number: agent.gst_number || '' });
    setShowForm(true);
  };

  const handleDelete = async (agentId) => {
    if (!confirm('Delete this agent? All their invoices will also be deleted.')) return;
    await deleteAgent(agentId);
  };

  const handleCancel = () => { setShowForm(false); setEditingAgent(null); setForm(emptyForm); };

  const fields = [
    { label: 'Agent Name *', key: 'name',       placeholder: 'e.g. Raza Tours',    required: true },
    { label: 'Phone',        key: 'phone',      placeholder: '9XXXXXXXXX' },
    { label: 'Email',        key: 'email',      placeholder: 'agent@email.com' },
    { label: 'GST Number',   key: 'gst_number', placeholder: 'GST number (optional)' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold font-zodiak">Agents</h2>
        {!showForm && (
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-darkgreen text-peach font-jakarta font-semibold px-4 py-2 rounded-lg hover:bg-darkgreen/90 transition-all text-sm">
            <Plus size={16} /> Add Agent
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-darkgreen/20 rounded-xl p-6 mb-8 shadow-sm max-w-2xl">
          <h3 className="font-zodiak font-semibold text-lg mb-5">{editingAgent ? 'Edit Agent' : 'New Agent'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold font-jakarta text-darkgreen/70 mb-1">Address</label>
              <textarea
                placeholder="Full address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="w-full border border-darkgreen/20 rounded-lg px-3 py-2 text-sm font-jakarta focus:outline-none focus:border-darkgreen resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSubmit} disabled={isLoading || !form.name.trim()}
              className="flex items-center gap-2 bg-darkgreen text-peach font-jakarta font-semibold px-5 py-2 rounded-lg hover:bg-darkgreen/90 disabled:opacity-50 transition-all text-sm">
              <Check size={16} /> {editingAgent ? 'Update Agent' : 'Save Agent'}
            </button>
            <button onClick={handleCancel}
              className="flex items-center gap-2 border border-darkgreen/30 text-darkgreen font-jakarta font-semibold px-5 py-2 rounded-lg hover:bg-darkgreen/5 transition-all text-sm">
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Agent Cards */}
      {isLoading && !showForm
        ? <div className="text-center py-10 text-darkgreen/50 font-jakarta">Loading agents...</div>
        : agents.length === 0
          ? (
            <div className="text-center py-16 text-darkgreen/40 font-jakarta">
              <Users size={40} className="mx-auto mb-3 opacity-40" />
              <p>No agents added yet</p>
            </div>
          )
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <div key={agent.agent_id} className="bg-white border border-darkgreen/15 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-zodiak font-semibold text-darkgreen text-lg">{agent.name}</h3>
                      <span className="text-xs font-jakarta text-darkgreen/50 bg-darkgreen/5 px-2 py-0.5 rounded-full">
                        {agent._count?.invoices || 0} invoice{agent._count?.invoices !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(agent)} className="p-1.5 rounded-lg hover:bg-darkgreen/10 text-darkgreen transition-all"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(agent.agent_id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all"><Trash2 size={15} /></button>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm font-jakarta text-darkgreen/60">
                    {agent.phone && <p>📞 {agent.phone}</p>}
                    {agent.email && <p>✉️ {agent.email}</p>}
                    {agent.address && <p>📍 {agent.address}</p>}
                    {agent.gst_number && <p>🏷️ GST: {agent.gst_number}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
    </div>
  );
};

export default Agents;
