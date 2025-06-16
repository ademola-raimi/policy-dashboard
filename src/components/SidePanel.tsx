import React from 'react';

const SidePanel: React.FC = () => {
  return (
    <aside className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-50">
      {/* Details content goes here */}
      <div className="p-6 text-gray-500">Details panel (coming soon)</div>
    </aside>
  );
};

export default SidePanel;