import React from 'react';

interface RadioGroupProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
          <div
            className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-colors duration-200 ${
              value === opt.value
                ? 'border-[#E60012]'
                : 'border-[#8C8C8C] group-hover:border-[#4A4A4A]'
            }`}
          >
            {value === opt.value && (
              <div className="w-[10px] h-[10px] rounded-full bg-[#E60012]" />
            )}
          </div>
          <input
            type="radio"
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="hidden"
          />
          <span className="text-[14px] text-[#1A1A1A]">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};
