import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import Toast from '../../components/Toast.jsx';

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [apps, setApps] = useState([]);
  const [form, setForm] = useState({ applicationId: '', reason: '', amount: '' });
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const load = async () => {
    try {
      const [claimsRes, appsRes] = await Promise.all([api.get('/claims/my'), api.get('/applications/my')]);
      setClaims(claimsRes.data);
      setApps(appsRes.data.filter((a) => a.paymentStatus === 'Paid'));
    } catch (_error) {
      setToast({ message: 'Failed to load claim data.', type: 'error' });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/claims', { ...form, amount: Number(form.amount) });
      setToast({ message: 'Claim submitted.', type: 'success' });
      setForm({ applicationId: '', reason: '', amount: '' });
      load();
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Failed to submit claim.', type: 'error' });
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="glass rounded-xl p-5">
        <h3 className="mb-3 text-xl font-semibold">Submit Claim</h3>
        <Toast message={toast.message} type={toast.type} />
        <select className="input-glass mb-3" value={form.applicationId} onChange={(e) => setForm({ ...form, applicationId: e.target.value })} required>
          <option value="">Select paid application</option>
          {apps.map((app) => (
            <option key={app._id} value={app._id}>
              {app.policyId?.name}
            </option>
          ))}
        </select>
        <textarea className="input-glass mb-3 min-h-24" placeholder="Claim reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} required />
        <input className="input-glass mb-4" placeholder="Amount" type="number" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <button className="btn-primary">Submit</button>
      </form>

      <div className="glass rounded-xl p-5">
        <h3 className="mb-3 text-xl font-semibold">My Claims</h3>
        <div className="space-y-3">
          {claims.map((claim) => (
            <div key={claim._id} className="rounded bg-white/10 p-3 text-sm">
              <p className="font-medium">{claim.applicationId?.policyId?.name}</p>
              <p>Amount: ${claim.amount}</p>
              <p>Status: {claim.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClaimsPage;
