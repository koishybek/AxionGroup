import React from 'react';
import type { Category } from '@/types';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group flex flex-col items-center bg-white border border-[#E5E5E5] transition-all duration-300 hover:border-[#E60012] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-5"
    >
      <div className="w-full aspect-square flex items-center justify-center p-4">
        <img
          src={category.image}
          alt={category.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="text-[14px] text-[#1A1A1A] font-medium mt-2 text-center">{category.name}</span>
      <span className="text-[12px] text-[#8C8C8C] mt-1">{category.productCount} товаров</span>
    </Link>
  );
};
