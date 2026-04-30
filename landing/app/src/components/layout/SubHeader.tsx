import React from 'react';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SubHeader: React.FC = () => {
  return (
    <div className="bg-[#F8F8F8] border-b border-[#E5E5E5] mt-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 h-[40px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#E60012]" />
            <span className="text-[13px] text-[#1A1A1A] font-medium">+7 701 786 4214</span>
          </div>
          <div className="h-4 w-px bg-[#E5E5E5]" />
          <Link to="/catalog" className="text-[13px] text-[#4A4A4A] hover:text-[#E60012] transition-colors">
            Акции и скидки
          </Link>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-[#4A4A4A]">
          <span>Доставка по всему Казахстану</span>
        </div>
      </div>
    </div>
  );
};
