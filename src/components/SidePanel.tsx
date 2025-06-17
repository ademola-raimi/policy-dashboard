import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-800 shadow-lg transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxWidth: 480 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="p-6 pt-12 h-full overflow-y-auto">{children}</div>
      </aside>
    </div>
  );
};

export default SidePanel;