import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import Sidebar from '../../components/Sidebar.jsx';

const AdminClaimsPage = () => {
  const [claims, setClaims] = useState([]);

  const load = async () => {
    const { data } = await api.get('/claims');
    setClaims(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/claims/${id}/status`, { status });
    load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Manage Claims</h2>
        <div className="space-y-3">
          {claims.map((claim) => (
            <div key={claim._id} className="glass rounded-xl p-4">
              <p className="font-semibold">
                {claim.userId?.name} - {claim.applicationId?.policyId?.name}
              </p>
              <p className="text-sm">Amount: ${claim.amount}</p>
              <p className="text-sm text-slate-300">Reason: {claim.reason}</p>
              <p className="text-sm text-slate-300">Status: {claim.status}</p>
              <div className="mt-2 flex gap-2">
                <button className="rounded bg-emerald-500/70 px-3 py-1 text-sm" onClick={() => updateStatus(claim._id, 'Approved')}>
                  Approve
                </button>
                <button className="rounded bg-red-500/70 px-3 py-1 text-sm" onClick={() => updateStatus(claim._id, 'Rejected')}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminClaimsPage;
