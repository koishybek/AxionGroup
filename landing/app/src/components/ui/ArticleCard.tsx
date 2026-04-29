import React from 'react';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="group flex flex-col bg-white border border-[#E5E5E5] transition-all duration-300 hover:border-[#E60012] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[13px] text-[#8C8C8C]">{article.date}</span>
        <h3 className="text-[16px] font-semibold text-[#1A1A1A] mt-1 leading-snug line-clamp-2">{article.title}</h3>
        <p className="text-[14px] text-[#4A4A4A] mt-2 line-clamp-2">{article.excerpt}</p>
      </div>
    </div>
  );
};
