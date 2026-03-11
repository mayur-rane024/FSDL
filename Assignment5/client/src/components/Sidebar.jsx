import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/policies', label: 'Policies' },
    { to: '/admin/applications', label: 'Applications' },
    { to: '/admin/claims', label: 'Claims' },
    { to: '/admin/users', label: 'Users' },
  ];

  return (
    <aside className="glass h-fit rounded-xl p-4 md:sticky md:top-24">
      <h3 className="mb-4 text-lg font-semibold tracking-wide text-cyan-100">Admin Panel</h3>
      <div className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? 'border border-cyan-200/40 bg-cyan-300/20 font-semibold text-white'
                  : 'border border-transparent text-slate-200 hover:bg-white/10'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
