import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import Toast from '../../components/Toast.jsx';

const ProfilePage = () => {
  const [form, setForm] = useState({ name: '', phone: '', address: '', password: '' });
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setForm((prev) => ({ ...prev, name: data.name, phone: data.phone || '', address: data.address || '' }));
      } catch (_error) {
        setToast({ message: 'Failed to load profile.', type: 'error' });
      }
    };
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', form);
      setToast({ message: 'Profile updated.', type: 'success' });
      setForm((prev) => ({ ...prev, password: '' }));
    } catch (_error) {
      setToast({ message: 'Failed to update profile.', type: 'error' });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={submit} className="glass rounded-xl p-6">
        <h2 className="mb-4 text-2xl font-semibold">My Profile</h2>
        <Toast message={toast.message} type={toast.type} />
        <input className="input-glass mb-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input-glass mb-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input className="input-glass mb-3" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input className="input-glass mb-4" type="password" placeholder="New password (optional)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
