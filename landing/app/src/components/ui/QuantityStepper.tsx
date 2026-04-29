import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({ value, onChange, min = 1, max = 99 }) => {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };
  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center h-8">
      <button
        onClick={decrease}
        className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors"
      >
        <Minus size={14} />
      </button>
      <input
        type="text"
        value={value}
        readOnly
        className="w-10 h-8 text-center border-t border-b border-[#E5E5E5] text-[14px] outline-none"
      />
      <button
        onClick={increase}
        className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
