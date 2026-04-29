import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', value, onChange, error }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[13px] text-[#4A4A4A] mb-1 font-medium">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-12 px-4 border text-[14px] outline-none transition-colors duration-200 ${
          error
            ? 'border-[#E60012] focus:border-[#E60012]'
            : 'border-[#E5E5E5] focus:border-[#E60012] focus:shadow-[0_0_0_3px_rgba(230,0,18,0.1)]'
        }`}
      />
      {error && <span className="text-[12px] text-[#E60012] mt-1 block">{error}</span>}
    </div>
  );
};
