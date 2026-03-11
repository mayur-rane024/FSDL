import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import Sidebar from '../../components/Sidebar.jsx';

const AdminApplicationsPage = () => {
  const [apps, setApps] = useState([]);

  const load = async () => {
    const { data } = await api.get('/applications');
    setApps(data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/applications/${id}/status`, { status });
    load();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Manage Applications</h2>
        <div className="space-y-3">
          {apps.map((app) => (
            <div key={app._id} className="glass rounded-xl p-4">
              <p className="font-semibold">
                {app.userId?.name} - {app.policyId?.name}
              </p>
              <p className="text-sm text-slate-300">
                Status: {app.status} | Payment: {app.paymentStatus}
              </p>
              <div className="mt-2 flex gap-2">
                <button className="rounded bg-emerald-500/70 px-3 py-1 text-sm" onClick={() => updateStatus(app._id, 'Approved')}>
                  Approve
                </button>
                <button className="rounded bg-red-500/70 px-3 py-1 text-sm" onClick={() => updateStatus(app._id, 'Rejected')}>
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

export default AdminApplicationsPage;
