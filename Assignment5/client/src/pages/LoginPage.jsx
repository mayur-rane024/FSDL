import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Toast from '../components/Toast.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-7">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <Toast message={error} type="error" />
        <input className="input-glass mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-glass mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading} className="btn-primary w-full">
          {loading ? 'Please wait...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
