import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  items: { label: string; to?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="text-xs text-gray-400 mb-2 flex items-center gap-1" aria-label="Breadcrumb">
    {items.map((item, idx) => (
      <span key={item.label} className="flex items-center gap-1">
        {item.to ? (
          <Link to={item.to} className="hover:underline text-gray-500">{item.label}</Link>
        ) : (
          <span className="text-gray-400">{item.label}</span>
        )}
        {idx < items.length - 1 && <span className="mx-1">&gt;</span>}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
