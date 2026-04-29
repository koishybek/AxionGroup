import React, { useState } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import type { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { StarRating } from './StarRating';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { openCart } = useUI();
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white border border-[#E5E5E5] transition-all duration-250 hover:border-[#E60012] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
    >
      {/* Image Area */}
      <div className="relative h-[200px] bg-white p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* Heart */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-[#E5E5E5] hover:border-[#E60012] transition-all duration-200"
        >
          <Heart
            size={16}
            className={inWishlist ? 'text-[#E60012] fill-[#E60012]' : 'text-[#8C8C8C]'}
          />
        </button>
        {/* Discount badge */}
        {product.oldPrice && (
          <div className="absolute top-3 left-3 bg-[#E60012] text-white text-[11px] font-bold px-2 py-1">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-3 pt-2">
        <span className="text-[11px] text-[#8C8C8C] uppercase tracking-wide font-medium">{product.brand}</span>
        <h3 className="text-[14px] font-semibold text-[#1A1A1A] mt-1 line-clamp-2 leading-snug min-h-[40px]">
          {product.name}
        </h3>
        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size={12} />
        </div>
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#1A1A1A]">{product.price.toLocaleString('ru-RU')} ₸</span>
            {product.oldPrice && (
              <span className="text-[13px] text-[#8C8C8C] line-through">{product.oldPrice.toLocaleString('ru-RU')} ₸</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            className={`w-9 h-9 flex items-center justify-center transition-all duration-200 ${
              added
                ? 'bg-[#2E7D32] text-white'
                : product.inStock
                ? 'bg-[#E60012] text-white hover:bg-[#C20010]'
                : 'bg-[#E5E5E5] text-[#8C8C8C] cursor-not-allowed'
            }`}
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
        {!product.inStock && (
          <span className="text-[12px] text-[#8C8C8C] mt-1">Нет в наличии</span>
        )}
      </div>
    </Link>
  );
};
