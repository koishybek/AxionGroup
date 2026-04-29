import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { totalCount } = useCart();
  const { openSearch, openCart } = useUI();

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'О компании', path: '/about' },
    { label: 'Блог', path: '/blog' },
    { label: 'Контакты', path: '/contacts' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1200px] mx-auto px-4 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-[#E60012] font-extrabold text-[18px] tracking-wide uppercase">TAKUMA</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-[14px] font-medium transition-colors duration-200 pb-1 border-b-2 ${
                isActive(item.path)
                  ? 'text-[#1A1A1A] border-[#E60012]'
                  : 'text-[#4A4A4A] border-transparent hover:text-[#1A1A1A]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Utility Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={openSearch}
            className="w-9 h-9 flex items-center justify-center text-[#1A1A1A] hover:text-[#E60012] transition-colors"
          >
            <Search size={20} />
          </button>
          <Link
            to="/catalog"
            className="w-9 h-9 flex items-center justify-center text-[#1A1A1A] hover:text-[#E60012] transition-colors"
          >
            <Heart size={20} />
          </Link>
          <button
            onClick={openCart}
            className="relative w-9 h-9 flex items-center justify-center text-[#1A1A1A] hover:text-[#E60012] transition-colors"
          >
            <ShoppingCart size={20} />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E60012] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
