import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Toast from '../components/Toast.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-7">
        <h2 className="mb-4 text-2xl font-semibold">Register</h2>
        <Toast message={error} type="error" />
        <input className="input-glass mb-3" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="input-glass mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input-glass mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading} className="btn-accent w-full">
          {loading ? 'Please wait...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
