import { useEffect, useState } from 'react';
import api from '../../api/api.js';
import Sidebar from '../../components/Sidebar.jsx';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/admin/users');
      setUsers(data);
    };
    load();
  }, []);

  const exportReport = async () => {
    const response = await api.get('/admin/report/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'safelife-report.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Users</h2>
          <button className="rounded bg-cyan-500 px-4 py-2 font-semibold text-slate-950" onClick={exportReport}>
            Export Report
          </button>
        </div>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user._id} className="glass rounded-xl p-4">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-slate-300">
                {user.email} | {user.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminUsersPage;
