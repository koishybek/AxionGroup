import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { products } from '@/data';
import { Link } from 'react-router-dom';

export const SearchOverlay: React.FC = () => {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (searchOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [searchOpen, closeSearch]);

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-[rgba(0,0,0,0.6)] animate-[fadeIn_300ms_ease]"
      onClick={closeSearch}
    >
      <div
        className="absolute top-0 left-0 right-0 bg-white shadow-lg animate-[slideDown_300ms_ease] origin-top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Search size={20} className="text-[#8C8C8C]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по каталогу..."
              className="flex-1 h-12 text-[18px] text-[#1A1A1A] outline-none bg-transparent"
            />
            <button onClick={closeSearch} className="w-10 h-10 flex items-center justify-center hover:bg-[#F8F8F8]">
              <X size={20} />
            </button>
          </div>

          {results.length > 0 && (
            <div className="mt-4 border-t border-[#E5E5E5] pt-4">
              <div className="grid grid-cols-3 gap-4">
                {results.slice(0, 6).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 p-2 hover:bg-[#F8F8F8] transition-colors"
                  >
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-contain" />
                    <div>
                      <p className="text-[14px] text-[#1A1A1A] font-medium">{product.name}</p>
                      <p className="text-[13px] text-[#E60012] font-semibold">{product.price.toLocaleString('ru-RU')} ₸</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <p className="mt-4 text-[14px] text-[#8C8C8C]">Ничего не найдено</p>
          )}
        </div>
      </div>
    </div>
  );
};
