import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="py-4">
      <ol className="flex items-center flex-wrap gap-1 text-[13px]">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <span className="text-[#8C8C8C] mx-2">/</span>}
            {item.path ? (
              <Link to={item.path} className="text-[#8C8C8C] hover:text-[#E60012] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1A1A1A]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
