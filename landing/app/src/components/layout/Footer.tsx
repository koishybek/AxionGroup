import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-6">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="text-[#E60012] font-extrabold text-[18px] tracking-wide uppercase">TAKUMA</span>
            <p className="text-[13px] text-[#8C8C8C] mt-3 leading-relaxed">
              Премиальные фильтры для вашего автомобиля. Надежность, качество и инновации с 2008 года.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4">Каталог</h4>
            <ul className="flex flex-col gap-2">
              {['Воздушные фильтры', 'Масляные фильтры', 'Салонные фильтры', 'Топливные фильтры'].map((item) => (
                <li key={item}>
                  <Link to="/catalog" className="text-[13px] text-[#8C8C8C] hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4">Компания</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'О компании', path: '/about' },
                { label: 'Блог', path: '/blog' },
                { label: 'Контакты', path: '/contacts' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-[13px] text-[#8C8C8C] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4">Контакты</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#8C8C8C]" />
                <span className="text-[13px] text-[#8C8C8C]">+7 701 786 4214</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#8C8C8C]" />
                <span className="text-[13px] text-[#8C8C8C]">info@takuma.kz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#8C8C8C] mt-0.5" />
                <span className="text-[13px] text-[#8C8C8C]">г. Караганда, ул. Рыскулова, д. 25, кв. 22</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#333] flex items-center justify-between">
          <span className="text-[12px] text-[#8C8C8C]">© 2024 ТОО "AXION GLOBAL". Все права защищены.</span>
          <div className="flex items-center gap-4">
            <span className="text-[12px] text-[#8C8C8C]">YT</span>
            <span className="text-[12px] text-[#8C8C8C]">VK</span>
            <span className="text-[12px] text-[#8C8C8C]">TG</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
