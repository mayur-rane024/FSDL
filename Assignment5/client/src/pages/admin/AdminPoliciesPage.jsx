import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import Sidebar from '../../components/Sidebar.jsx';
import Modal from '../../components/Modal.jsx';

const initialForm = {
  name: '',
  category: 'Life',
  description: '',
  premiumAmount: '',
  coverageAmount: '',
  durationInYears: '',
};

const AdminPoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [form, setForm] = useState(initialForm);

  const load = async () => {
    const { data } = await api.get('/policies');
    setPolicies(data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const payload = {
      ...form,
      premiumAmount: Number(form.premiumAmount),
      coverageAmount: Number(form.coverageAmount),
      durationInYears: Number(form.durationInYears),
    };

    if (editId) await api.put(`/policies/${editId}`, payload);
    else await api.post('/policies', payload);

    setOpen(false);
    setEditId('');
    setForm(initialForm);
    load();
  };

  const edit = (policy) => {
    setEditId(policy._id);
    setForm({
      name: policy.name,
      category: policy.category,
      description: policy.description,
      premiumAmount: policy.premiumAmount,
      coverageAmount: policy.coverageAmount,
      durationInYears: policy.durationInYears,
    });
    setOpen(true);
  };

  const remove = async (id) => {
    await api.delete(`/policies/${id}`);
    load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Manage Policies</h2>
          <button className="rounded bg-cyan-500 px-4 py-2 font-semibold text-slate-950" onClick={() => setOpen(true)}>
            Add Policy
          </button>
        </div>
        <div className="space-y-3">
          {policies.map((policy) => (
            <div key={policy._id} className="glass flex items-center justify-between rounded-xl p-4">
              <div>
                <p className="font-semibold">{policy.name}</p>
                <p className="text-sm text-slate-300">
                  {policy.category} | ${policy.premiumAmount}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded bg-white/20 px-3 py-1 text-sm" onClick={() => edit(policy)}>
                  Edit
                </button>
                <button className="rounded bg-red-500/70 px-3 py-1 text-sm" onClick={() => remove(policy._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          open={open}
          title={editId ? 'Edit Policy' : 'Add Policy'}
          onClose={() => {
            setOpen(false);
            setEditId('');
            setForm(initialForm);
          }}
        >
          <div className="space-y-2">
            <input className="w-full rounded bg-white/10 p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select className="w-full rounded bg-white/10 p-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Life</option>
              <option>Health</option>
              <option>Vehicle</option>
              <option>Home</option>
              <option>Travel</option>
            </select>
            <textarea className="w-full rounded bg-white/10 p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className="w-full rounded bg-white/10 p-2" type="number" placeholder="Premium" value={form.premiumAmount} onChange={(e) => setForm({ ...form, premiumAmount: e.target.value })} />
            <input className="w-full rounded bg-white/10 p-2" type="number" placeholder="Coverage" value={form.coverageAmount} onChange={(e) => setForm({ ...form, coverageAmount: e.target.value })} />
            <input className="w-full rounded bg-white/10 p-2" type="number" placeholder="Duration in years" value={form.durationInYears} onChange={(e) => setForm({ ...form, durationInYears: e.target.value })} />
            <button className="w-full rounded bg-accent px-4 py-2 font-semibold" onClick={save}>
              Save
            </button>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default AdminPoliciesPage;
