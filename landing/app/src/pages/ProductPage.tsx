import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Heart, Check, ArrowLeftRight } from 'lucide-react';
import { products } from '@/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StarRating } from '@/components/ui/StarRating';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openCart } = useUI();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'compatibility'>('description');
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/catalog" replace />;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs
        items={[
          { label: 'Главная', path: '/' },
          { label: 'Каталог', path: '/catalog' },
          { label: product.category, path: `/category/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* Main Product View */}
      <div className="flex gap-10 mt-6">
        {/* Gallery */}
        <div className="w-1/2">
          <div className="h-[400px] border border-[#E5E5E5] flex items-center justify-center bg-white p-6">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex gap-2 mt-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 border flex items-center justify-center bg-white p-1 transition-colors ${
                  idx === activeImage ? 'border-[#E60012]' : 'border-[#E5E5E5] hover:border-[#8C8C8C]'
                }`}
              >
                <img src={img} alt="" className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="w-1/2">
          <h1 className="text-[24px] font-bold text-[#1A1A1A] leading-tight">{product.name}</h1>
          <div className="mt-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-[24px] font-bold text-[#E60012]">{product.price.toLocaleString('ru-RU')} ₸</span>
            {product.oldPrice && (
              <span className="text-[16px] text-[#8C8C8C] line-through">{product.oldPrice.toLocaleString('ru-RU')} ₸</span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Check size={16} className="text-[#2E7D32]" />
            <span className="text-[14px] text-[#2E7D32] font-medium">В наличии</span>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock || added}
              className={added ? 'bg-[#2E7D32] hover:bg-[#2E7D32]!' : ''}
            >
              {added ? 'Добавлено!' : 'В корзину'}
            </Button>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
                inWishlist
                  ? 'border-[#E60012] text-[#E60012]'
                  : 'border-[#E5E5E5] text-[#4A4A4A] hover:border-[#1A1A1A]'
              }`}
            >
              <Heart size={16} className={inWishlist ? 'fill-[#E60012]' : ''} />
              <span className="text-[14px]">{inWishlist ? 'В избранном' : 'В избранное'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] text-[#4A4A4A] hover:border-[#1A1A1A] transition-colors">
              <ArrowLeftRight size={16} />
              <span className="text-[14px]">Сравнить</span>
            </button>
          </div>

          {/* Specs */}
          <div className="mt-8 border-t border-[#E5E5E5] pt-6">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">Характеристики</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between pb-2 border-b border-[#E5E5E5]">
                  <span className="text-[13px] text-[#8C8C8C]">{key}</span>
                  <span className="text-[14px] text-[#1A1A1A] font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex border-b border-[#E5E5E5]">
          {[
            { key: 'description' as const, label: 'Описание' },
            { key: 'compatibility' as const, label: 'Применимость' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'text-[#1A1A1A] border-[#E60012]'
                  : 'text-[#4A4A4A] border-transparent hover:text-[#1A1A1A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="border border-[#E5E5E5] border-t-0 p-6 min-h-[200px]">
          {activeTab === 'description' ? (
            <div className="animate-[fadeIn_150ms_ease]">
              <p className="text-[15px] text-[#4A4A4A] leading-relaxed">{product.description}</p>
            </div>
          ) : (
            <div className="animate-[fadeIn_150ms_ease]">
              <p className="text-[15px] text-[#4A4A4A] mb-3">Данный фильтр совместим со следующими автомобилями:</p>
              <ul className="flex flex-col gap-2">
                {product.compatibility.map((car, idx) => (
                  <li key={idx} className="text-[14px] text-[#1A1A1A] flex items-center gap-2">
                    <Check size={14} className="text-[#2E7D32]" />
                    {car}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
