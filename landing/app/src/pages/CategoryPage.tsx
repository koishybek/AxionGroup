import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { categories } from '@/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterBlock } from '@/components/ui/FilterBlock';
import { Checkbox } from '@/components/ui/Checkbox';
import { products } from '@/data';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return <Navigate to="/catalog" replace />;

  const categoryProducts = products.filter((p) => p.categorySlug === slug);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs
        items={[
          { label: 'Главная', path: '/' },
          { label: 'Каталог', path: '/catalog' },
          { label: category.name },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight">{category.name}</h1>
        <p className="text-[15px] text-[#4A4A4A] mt-2 max-w-[600px]">
          Высококачественные {category.name.toLowerCase()} для защиты вашего автомобиля. Широкий ассортимент для всех популярных марок.
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="w-[260px] flex-shrink-0">
          <FilterBlock title="Категории">
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <Checkbox
                  key={cat.id}
                  label={cat.name}
                  checked={cat.slug === slug}
                  onChange={() => {}}
                />
              ))}
            </div>
          </FilterBlock>
        </aside>

        <div className="flex-1">
          <div className="mb-4 text-[14px] text-[#8C8C8C]">
            Найдено: {categoryProducts.length} товаров
          </div>
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-[16px] text-[#8C8C8C]">В этой категории пока нет товаров</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
