import { useEffect, useState } from 'react';
import api from '../api/api.js';
import PolicyCard from '../components/PolicyCard.jsx';
import Modal from '../components/Modal.jsx';
import Loader from '../components/Loader.jsx';
import Toast from '../components/Toast.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const HomePage = () => {
  const { user } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [document, setDocument] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/policies');
        setPolicies(data);
      } catch (_error) {
        setToast({ message: 'Failed to fetch policies.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const applyPolicy = async () => {
    if (!user) return setToast({ message: 'Please login to apply.', type: 'error' });

    try {
      const formData = new FormData();
      formData.append('policyId', selectedPolicy._id);
      if (document) formData.append('document', document);
      await api.post('/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setToast({ message: 'Application submitted successfully.', type: 'success' });
      setSelectedPolicy(null);
      setDocument(null);
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Application failed.', type: 'error' });
    }
  };

  if (loading) return <Loader />;

  return (
    <section>
      <div className="glass mb-6 rounded-2xl p-6 md:p-8">
        <p className="mb-2 inline-block rounded-full border border-cyan-200/40 bg-cyan-200/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cyan-100">
          SafeLife Insurance Portal
        </p>
        <h1 className="section-title">Protect What Matters Most</h1>
        <p className="section-subtitle mt-2 max-w-3xl">
          Explore modern insurance plans for life, health, travel, home, and vehicle needs with streamlined applications and claim support.
        </p>
      </div>
      <Toast message={toast.message} type={toast.type} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {policies.map((policy) => (
          <PolicyCard key={policy._id} policy={policy} onApply={user?.role === 'user' ? setSelectedPolicy : null} />
        ))}
      </div>
      <Modal open={Boolean(selectedPolicy)} title="Apply Policy" onClose={() => setSelectedPolicy(null)}>
        {selectedPolicy && (
          <div className="space-y-3">
            <p>
              Apply for <span className="font-semibold text-cyan-200">{selectedPolicy.name}</span>
            </p>
            <input type="file" className="input-glass" onChange={(e) => setDocument(e.target.files[0])} />
            <button className="btn-accent w-full" onClick={applyPolicy}>
              Submit Application
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default HomePage;
