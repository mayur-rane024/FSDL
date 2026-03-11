import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/user/ProfilePage.jsx';
import UserApplicationsPage from './pages/user/UserApplicationsPage.jsx';
import ClaimsPage from './pages/user/ClaimsPage.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import AdminPoliciesPage from './pages/admin/AdminPoliciesPage.jsx';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage.jsx';
import AdminClaimsPage from './pages/admin/AdminClaimsPage.jsx';
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AdminRoute from './routes/AdminRoute.jsx';

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="ambient-grid" />
      <div className="orbit orbit-1" />
      <div className="orbit orbit-2" />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 md:py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-applications" element={<UserApplicationsPage />} />
            <Route path="/my-claims" element={<ClaimsPage />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/policies" element={<AdminPoliciesPage />} />
            <Route path="/admin/applications" element={<AdminApplicationsPage />} />
            <Route path="/admin/claims" element={<AdminClaimsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
