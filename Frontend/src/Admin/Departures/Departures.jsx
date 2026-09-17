import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Calendar, PlusCircle, ListOrdered } from 'lucide-react';

const Departures = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/admin/departures' || location.pathname === '/admin/departures/') {
      navigate('/admin/departures/manage', { replace: true });
    }
  }, [location.pathname, navigate]);

  const tabs = [
    {
      label: 'All Departures',
      route: '/admin/departures/manage',
      icon: <ListOrdered size={16} />,
    },
    {
      label: 'Create Departure',
      route: '/admin/departures/create',
      icon: <PlusCircle size={16} />,
    },
  ];

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-darkgreen">
            <Calendar size={24} />
            <h1 className="text-2xl font-semibold font-zodiak">
              Live Departure Calendar
            </h1>
          </div>
          <p className="text-xs font-jakarta text-stone-500 mt-1">
            Manage public departure dates, airline flights, package tiers, and seat allocations
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full border-b border-darkgreen border-opacity-30 flex items-center gap-8 mb-8">
        {tabs.map((tab) => (
          <NavLink
            key={tab.route}
            to={tab.route}
            className={({ isActive }) =>
              `flex items-center gap-2 pb-3 text-sm font-jakarta font-semibold transition-all ${
                isActive
                  ? 'border-b-4 border-darkgreen text-darkgreen'
                  : 'text-darkgreen/50 hover:text-darkgreen'
              }`
            }
          >
            {tab.icon}
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Child Routes */}
      <Outlet />
    </div>
  );
};

export default Departures;
