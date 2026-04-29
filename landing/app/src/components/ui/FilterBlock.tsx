import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterBlockProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const FilterBlock: React.FC<FilterBlockProps> = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#E5E5E5]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-[14px] font-semibold text-[#1A1A1A]">{title}</span>
        <ChevronDown
          size={16}
          className={`text-[#8C8C8C] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
};
