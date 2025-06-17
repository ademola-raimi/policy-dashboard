import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Squares2X2Icon,
  DocumentTextIcon,
  BellAlertIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import useAuth from '../hooks/useAuth';
import { getInitials } from '../utils';

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: Squares2X2Icon },
  { name: 'Recommendations', to: '/recommendations', icon: ShieldCheckIcon },
  { name: 'Policies', to: '/policies', icon: DocumentTextIcon },
  { name: 'Events', to: '/events', icon: BellAlertIcon },
  { name: 'Waivers', to: '/waivers', icon: DocumentTextIcon },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  const username = state.user?.username || '';
  const initials = getInitials(username);
  const email = username ? `${username}@aryon.security` : '';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center gap-2">
            <img src="/logo.svg" alt="ARYON" className="h-8 w-8" />
            <span className="font-bold text-lg">ARYON</span>
          </div>
          <nav className="mt-4">
            {navItems.map(({ name, to, icon: Icon }) => (
              <NavLink
                key={name}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2 rounded-lg mb-1 transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`
                }
                end
              >
                <Icon className="h-5 w-5" />
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 flex items-center gap-2">
          <div className="bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {initials}
          </div>
          <div>
            <div className="font-semibold text-xs">{username}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default Layout;