import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const linkClasses = ({ isActive }) =>
    `rounded-lg px-3 py-1.5 transition ${
      isActive ? 'bg-white/20 text-cyan-100' : 'text-slate-100/90 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header className="glass sticky top-0 z-20 border-b border-white/20">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="group flex items-center gap-2">
          <span className="rounded-full border border-cyan-200/50 bg-cyan-300/20 px-2 py-1 text-xs font-bold tracking-[0.22em] text-cyan-100">
            SL
          </span>
          <span className="text-lg font-bold tracking-wide text-cyan-100 transition group-hover:text-cyan-200 md:text-xl">
            SafeLife Portal
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <NavLink to="/" className={linkClasses}>
            Policies
          </NavLink>
          {user && user.role === 'user' && (
            <>
              <NavLink to="/my-applications" className={linkClasses}>
                My Applications
              </NavLink>
              <NavLink to="/my-claims" className={linkClasses}>
                Claims
              </NavLink>
            </>
          )}
          {user && user.role === 'admin' && (
            <NavLink to="/admin" className={linkClasses}>
              Admin
            </NavLink>
          )}
          {user ? (
            <>
              <NavLink to="/profile" className={linkClasses}>
                Profile
              </NavLink>
              <button onClick={logout} className="btn-accent px-3 py-1.5 text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary px-3 py-1.5 text-sm">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
