import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterBlock } from '@/components/ui/FilterBlock';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { products, categories, carMakes } from '@/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Catalog: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const perPage = 9;

  const brands = ['TAKUMA', 'Bosch', 'Mann'];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categorySlug));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Price filter
    if (priceMin) {
      result = result.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax) {
      result = result.filter((p) => p.price <= Number(priceMax));
    }

    // Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategories, selectedBrands, sort, priceMin, priceMax]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setPage(1);
  };

  const selectedMakeObj = carMakes.find((m) => m.name === carMake);
  const selectedModelObj = selectedMakeObj?.models.find((m) => m.name === carModel);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs items={[{ label: 'Главная', path: '/' }, { label: 'Каталог фильтров' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight">Каталог фильтров</h1>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#8C8C8C]">Сортировка:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 px-3 border border-[#E5E5E5] text-[14px] text-[#1A1A1A] outline-none focus:border-[#E60012]"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="popular">По популярности</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-[260px] flex-shrink-0">
          {/* Car Selection */}
          <div className="bg-[#E60012] p-4 mb-4">
            <h3 className="text-white text-[14px] font-semibold mb-3">Подбор по автомобилю</h3>
            <div className="flex flex-col gap-2">
              <select
                value={carMake}
                onChange={(e) => { setCarMake(e.target.value); setCarModel(''); setCarYear(''); }}
                className="h-10 px-3 text-[14px] border-none outline-none bg-white"
              >
                <option value="">Марка</option>
                {carMakes.map((m) => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
              <select
                value={carModel}
                onChange={(e) => { setCarModel(e.target.value); setCarYear(''); }}
                disabled={!carMake}
                className="h-10 px-3 text-[14px] border-none outline-none bg-white disabled:opacity-50"
              >
                <option value="">Модель</option>
                {selectedMakeObj?.models.map((m) => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
              <select
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                disabled={!carModel}
                className="h-10 px-3 text-[14px] border-none outline-none bg-white disabled:opacity-50"
              >
                <option value="">Год</option>
                {selectedModelObj?.years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <Button variant="secondary" size="sm" fullWidth>
                Подобрать
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <FilterBlock title="Категории">
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <Checkbox
                  key={cat.id}
                  label={cat.name}
                  checked={selectedCategories.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                  count={cat.productCount}
                />
              ))}
            </div>
          </FilterBlock>

          {/* Brand Filter */}
          <FilterBlock title="Бренд">
            <div className="flex flex-col gap-2">
              {brands.map((brand) => (
                <Checkbox
                  key={brand}
                  label={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
              ))}
            </div>
          </FilterBlock>

          {/* Price Filter */}
          <FilterBlock title="Цена">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="От"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full h-10 px-3 border border-[#E5E5E5] text-[14px] outline-none focus:border-[#E60012]"
              />
              <span className="text-[#8C8C8C]">-</span>
              <input
                type="number"
                placeholder="До"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full h-10 px-3 border border-[#E5E5E5] text-[14px] outline-none focus:border-[#E60012]"
              />
            </div>
          </FilterBlock>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 text-[14px] text-[#8C8C8C]">
            Найдено: {filteredProducts.length} товаров
          </div>
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-[16px] text-[#8C8C8C]">По вашему запросу ничего не найдено</p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setPriceMin('');
                  setPriceMax('');
                  setSort('default');
                }}
                className="mt-4 text-[14px] text-[#E60012] font-medium hover:underline"
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center border border-[#E5E5E5] text-[#4A4A4A] hover:border-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center text-[14px] font-medium transition-colors ${
                    p === page
                      ? 'border border-[#E60012] text-[#E60012]'
                      : 'border border-[#E5E5E5] text-[#4A4A4A] hover:border-[#1A1A1A]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-[#E5E5E5] text-[#4A4A4A] hover:border-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
