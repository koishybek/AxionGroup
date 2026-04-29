import React, { useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import { useCart } from '@/context/CartContext';
import { products } from '@/data';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const CartDrawer: React.FC = () => {
  const { cartOpen, closeCart } = useUI();
  const { items, updateQuantity, removeItem, totalCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  const totalPrice = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" onClick={closeCart}>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] animate-[fadeIn_300ms_ease]" />
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl animate-[slideInRight_300ms_ease] flex flex-col"
        style={{ animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5]">
          <h2 className="text-[18px] font-semibold text-[#1A1A1A]">Корзина ({totalCount})</h2>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center hover:bg-[#F8F8F8]">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={48} className="text-[#E5E5E5] mb-4" />
              <p className="text-[16px] text-[#1A1A1A] font-medium">Корзина пуста</p>
              <p className="text-[14px] text-[#8C8C8C] mt-1">Добавьте товары из каталога</p>
              <Link
                to="/catalog"
                onClick={closeCart}
                className="mt-4 text-[14px] text-[#E60012] font-medium hover:underline"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <div
                    key={item.productId}
                    className="flex gap-4 pb-4 border-b border-[#E5E5E5]"
                  >
                    <Link to={`/product/${product.id}`} onClick={closeCart}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-contain bg-[#F8F8F8]"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={closeCart}
                        className="text-[14px] text-[#1A1A1A] font-medium hover:text-[#E60012] transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <span className="text-[12px] text-[#8C8C8C] mt-0.5">{product.sku}</span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-[14px]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[14px] font-bold text-[#1A1A1A]">
                            {(product.price * item.quantity).toLocaleString('ru-RU')} ₸
                          </span>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-[#8C8C8C] hover:text-[#E60012] transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E5E5E5] bg-[#F8F8F8]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[16px] text-[#1A1A1A]">Итого</span>
              <span className="text-[18px] font-bold text-[#1A1A1A]">{totalPrice.toLocaleString('ru-RU')} ₸</span>
            </div>
            <Link to="/checkout" onClick={closeCart}>
              <Button variant="primary" fullWidth size="lg">
                Оформить заказ
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
