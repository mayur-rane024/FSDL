import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import Toast from '../../components/Toast.jsx';

const UserApplicationsPage = () => {
  const [apps, setApps] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const load = async () => {
    try {
      const { data } = await api.get('/applications/my');
      setApps(data);
    } catch (_error) {
      setToast({ message: 'Failed to fetch applications.', type: 'error' });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const pay = async (id) => {
    try {
      const { data } = await api.post(`/applications/${id}/pay`);
      setToast({ message: data.message, type: 'success' });
      load();
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Payment failed.', type: 'error' });
    }
  };

  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">My Applications</h2>
      <Toast message={toast.message} type={toast.type} />
      <div className="space-y-3">
        {apps.map((app) => (
          <div key={app._id} className="glass rounded-xl p-4 transition hover:border-cyan-200/35">
            <p className="font-semibold">{app.policyId?.name}</p>
            <p className="text-sm text-slate-300">
              Status: {app.status} | Payment: {app.paymentStatus}
            </p>
            {app.documentPath && (
              <a className="text-xs text-cyan-200 underline" href={`http://localhost:5000${app.documentPath}`} target="_blank" rel="noreferrer">
                View Document
              </a>
            )}
            {app.paymentStatus === 'Pending' && (
              <button onClick={() => pay(app._id)} className="btn-accent mt-3">
                Pay ${app.policyId?.premiumAmount}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserApplicationsPage;
