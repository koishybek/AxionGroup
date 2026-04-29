import React from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { articles } from '@/data';

export const BlogPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs items={[{ label: 'Главная', path: '/' }, { label: 'Блог' }]} />

      <h1 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight mb-6">Полезные статьи</h1>

      <div className="grid grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
