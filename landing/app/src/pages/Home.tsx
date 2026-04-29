import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { categories, products, articles } from '@/data';
import { ShieldCheck, Truck, Clock, Headphones } from 'lucide-react';

export const Home: React.FC = () => {
  const popularProducts = products.slice(0, 4);
  const popularArticles = articles.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto px-4 py-16 flex items-center gap-12">
          <div className="flex-1">
            <h1 className="text-[42px] font-bold text-[#1A1A1A] leading-tight tracking-tight">
              Фильтры<br />премиального качества<br />для вашего автомобиля
            </h1>
            <p className="text-[15px] text-[#4A4A4A] mt-4 max-w-[500px] leading-relaxed">
              Надежная защита двигателя и салона вашего автомобиля с гарантией качества от TAKUMA.
            </p>
            <div className="mt-8">
              <Link to="/catalog">
                <Button variant="primary" size="lg">
                  Перейти в каталог
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/images/hero-filters.png"
              alt="TAKUMA Filters"
              className="max-w-[500px] w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-[1200px] mx-auto px-4 h-[80px] flex items-center justify-between">
          {[
            { icon: ShieldCheck, text: 'Гарантированный подбор' },
            { icon: ShieldCheck, text: 'Надежные поставщики' },
            { icon: Truck, text: 'Быстрая доставка' },
            { icon: Clock, text: 'Продажа 24/7' },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <feature.icon size={16} className="text-[#1A1A1A]" />
              <span className="text-[13px] text-[#1A1A1A]">{feature.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight">Популярные категории</h2>
            <Link to="/catalog" className="text-[14px] text-[#E60012] font-medium hover:underline">
              Смотреть все
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TAKUMA */}
      <section className="py-10 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight mb-8">Почему выбирают TAKUMA?</h2>
          <div className="grid grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Качество',
                desc: 'Фильтры премиум-класса с гарантией производителя.',
              },
              {
                icon: ShieldCheck,
                title: 'Надежность',
                desc: 'Проверенные временем решения для защиты двигателя.',
              },
              {
                icon: Headphones,
                title: 'Поддержка',
                desc: 'Консультации по подбору фильтров для любого авто.',
              },
              {
                icon: Truck,
                title: 'Доставка',
                desc: 'Быстрая доставка по всему Казахстану от 1 дня.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <item.icon size={32} className="text-[#1A1A1A] mb-3" />
                <h4 className="text-[16px] font-semibold text-[#1A1A1A] mb-2">{item.title}</h4>
                <p className="text-[13px] text-[#4A4A4A] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight">Популярные товары</h2>
            <Link to="/catalog" className="text-[14px] text-[#E60012] font-medium hover:underline">
              Смотреть все
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-10 bg-[#F8F8F8]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight">Полезные статьи</h2>
            <Link to="/blog" className="text-[14px] text-[#E60012] font-medium hover:underline">
              Все статьи
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {popularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
