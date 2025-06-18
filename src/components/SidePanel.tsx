import React from 'react';
import { MdClose } from 'react-icons/md';

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 flex transition-all ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ width: 'min(100vw, 700px)' }}
    >
      <aside
        className={`relative h-full w-full max-w-3xl bg-white shadow-lg transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <MdClose className="h-6 w-6" />
        </button>
        <div className="h-full overflow-y-auto">{children}</div>
      </aside>
    </div>
  );
};

export default SidePanel;