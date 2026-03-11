import { useEffect, useState } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import api from '../../api/api.js';
import Sidebar from '../../components/Sidebar.jsx';
import StatsCard from '../../components/StatsCard.jsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/admin/stats');
      setStats(data);
    };
    load();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  const registrationLabels = stats.monthlyRegistrations.map((m) => `Month ${m._id}`);
  const registrationData = stats.monthlyRegistrations.map((m) => m.count);

  const policiesData = {
    labels: stats.policiesByCategory.map((p) => p._id),
    datasets: [
      {
        data: stats.policiesByCategory.map((p) => p.count),
        backgroundColor: ['#00c2ff', '#ff7a18', '#80ed99', '#f8f32b', '#ff4d6d'],
      },
    ],
  };

  const claimsData = {
    labels: stats.claimsByStatus.map((c) => c._id),
    datasets: [{ label: 'Claims', data: stats.claimsByStatus.map((c) => c.count), backgroundColor: '#00c2ff' }],
  };
  const commonOptions = {
    plugins: {
      legend: {
        labels: { color: '#eaf7ff' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#d0e6ff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#d0e6ff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <section className="space-y-5">
        <div className="glass rounded-2xl p-5 md:p-6">
          <h2 className="section-title">Admin Analytics</h2>
          <p className="section-subtitle mt-1">Live business metrics, registrations, policy mix, and claims trends.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatsCard title="Users" value={stats.totalUsers} />
          <StatsCard title="Policies" value={stats.totalPolicies} />
          <StatsCard title="Applications" value={stats.totalApplications} />
          <StatsCard title="Claims" value={stats.totalClaims} />
          <StatsCard title="Revenue" value={`$${stats.totalRevenue}`} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-xl p-4">
            <h3 className="mb-3 font-semibold">Monthly Registrations</h3>
            <Bar
              data={{ labels: registrationLabels, datasets: [{ label: 'Users', data: registrationData, backgroundColor: '#ff7a18' }] }}
              options={commonOptions}
            />
          </div>
          <div className="glass rounded-xl p-4">
            <h3 className="mb-3 font-semibold">Policies by Category</h3>
            <Doughnut data={policiesData} options={{ plugins: { legend: { labels: { color: '#eaf7ff' } } } }} />
          </div>
          <div className="glass rounded-xl p-4 lg:col-span-2">
            <h3 className="mb-3 font-semibold">Claims by Status</h3>
            <Bar data={claimsData} options={commonOptions} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
