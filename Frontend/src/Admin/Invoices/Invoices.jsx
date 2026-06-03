import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Invoices = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/admin/invoices') {
      navigate('/admin/invoices/view');
    }
  }, [location.pathname, navigate]);

  const tabs = [
    { label: 'Invoices', route: '/admin/invoices/view' },
    { label: 'Create Invoice', route: '/admin/invoices/create' },
    { label: 'Agents', route: '/admin/invoices/agents' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold font-zodiak">Invoice Management</h1>
      </div>

      <div className="w-full border-b border-darkgreen border-opacity-50 flex items-center gap-8 mb-8">
        {tabs.map((tab) => (
          <NavLink
            key={tab.route}
            to={tab.route}
            className={({ isActive }) =>
              `pb-3 text-sm font-jakarta font-semibold transition-all ${
                isActive
                  ? 'border-b-4 border-darkgreen text-darkgreen'
                  : 'text-darkgreen/50 hover:text-darkgreen'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default Invoices;
