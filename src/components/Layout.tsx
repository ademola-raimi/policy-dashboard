import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* Sidebar */}
    <aside className="w-64 bg-white dark:bg-gray-800 border-r">
      {/* ...Sidebar nav here... */}
    </aside>
    {/* Main content */}
    <main className="flex-1 flex flex-col">{children}</main>
  </div>
);

export default Layout;