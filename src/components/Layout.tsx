import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaThLarge, FaFileAlt, FaBell, FaShieldAlt, FaBars } from 'react-icons/fa';
import Logo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';
import { getInitials } from '../utils';
import LogoutButton from './LogoutButton';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: FaThLarge },
  { name: 'Recommendations', to: '/recommendations', icon: FaShieldAlt, match: (pathname: string) => pathname.startsWith('/recommendations') },
  { name: 'Policies', to: '/policies', icon: FaFileAlt },
  { name: 'Events', to: '/events', icon: FaBell },
  { name: 'Waivers', to: '/waivers', icon: FaFileAlt },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useAuth();
  const username = state.user?.username || '';
  const initials = getInitials(username);
  const email = username ? `${username}@aryon.security` : '';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 flex items-center gap-2">
            <img src={Logo} alt="ARYON" />
          </div>
          <nav className="mt-4">
            {navItems.map(({ name, to, icon: Icon, match }) => {
              const active = match ? match(location.pathname) : location.pathname === to;
              return (
                <NavLink
                  key={name}
                  to={to}
                  className={`flex items-center gap-3 px-6 py-2 rounded-lg mb-1 transition-colors ${
                    active
                      ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  end
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {name}
                </NavLink>
              );
            })}
            <div className="px-6 py-2 mb-1">
              <LogoutButton />
            </div>
          </nav>
        </div>
        <div className="p-4 flex flex-col gap-2 items-center">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <div className="bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              {initials}
            </div>
            <div>
              <div className="font-semibold text-xs">{username}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{email}</div>
            </div>
          </div>
        </div>
      </aside>
      <div className="md:hidden fixed top-0 left-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 py-3 shadow-sm">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Open menu">
          <FaBars className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setSidebarOpen(false)}>
          <div className="absolute top-0 left-0 w-64 bg-white dark:bg-gray-800 h-full shadow-lg flex flex-col">
            <div className="p-10 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
              <img src={Logo} alt="ARYON" />
            </div>
            <nav className="mt-4 flex-1">
              {navItems.map(({ name, to, icon: Icon, match }) => {
                const active = match ? match(location.pathname) : location.pathname === to;
                return (
                  <NavLink
                    key={name}
                    to={to}
                    className={`flex items-center gap-3 px-6 py-2 rounded-lg mb-1 transition-colors ${
                      active
                        ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    end
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                  </NavLink>
                );
              })}
            </nav>
            <div className="p-4 flex flex-col gap-2 items-center border-t border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <div className="bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-xs">{username}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 flex flex-col md:ml-0 mt-12 md:mt-0 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;