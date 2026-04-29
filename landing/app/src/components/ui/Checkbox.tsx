import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, count }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        className={`w-[18px] h-[18px] border flex items-center justify-center transition-colors duration-200 ${
          checked
            ? 'bg-[#E60012] border-[#E60012]'
            : 'bg-white border-[#8C8C8C] group-hover:border-[#4A4A4A]'
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span className="text-[14px] text-[#1A1A1A]">{label}</span>
      {count !== undefined && <span className="text-[13px] text-[#8C8C8C]">({count})</span>}
    </label>
  );
};
