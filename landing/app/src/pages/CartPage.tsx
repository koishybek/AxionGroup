import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { products } from '@/data';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCart();

  const cartProducts = items.map((item) => ({
    item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartProducts.reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 1500 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs items={[{ label: 'Главная', path: '/' }, { label: 'Корзина' }]} />

      <h1 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight mb-6">Корзина</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingCart size={64} className="text-[#E5E5E5] mb-4" />
          <p className="text-[18px] text-[#1A1A1A] font-medium">Ваша корзина пуста</p>
          <p className="text-[14px] text-[#8C8C8C] mt-1">Добавьте товары из каталога</p>
          <Link to="/catalog" className="mt-6">
            <Button variant="primary">Перейти в каталог</Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex flex-col">
              {cartProducts.map(({ item, product }) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-6 py-4 border-b border-[#E5E5E5]"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain bg-[#F8F8F8]"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-[14px] text-[#1A1A1A] font-medium hover:text-[#E60012] transition-colors"
                    >
                      {product.name}
                    </Link>
                    <span className="text-[12px] text-[#8C8C8C] block mt-0.5">{product.sku}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-[14px]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="w-[120px] text-right">
                    <span className="text-[16px] font-bold text-[#1A1A1A]">
                      {(product.price * item.quantity).toLocaleString('ru-RU')} ₸
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-[#8C8C8C] hover:text-[#E60012] transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={clearCart}
                className="text-[13px] text-[#8C8C8C] hover:text-[#E60012] transition-colors underline"
              >
                Очистить корзину
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="w-[340px] flex-shrink-0">
            <div className="sticky top-[120px] border border-[#E5E5E5] p-6">
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Итого</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#4A4A4A]">Товары, {totalItems} шт.</span>
                  <span className="text-[#1A1A1A] font-medium">{subtotal.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#4A4A4A]">Доставка</span>
                  <span className="text-[#1A1A1A] font-medium">{shipping.toLocaleString('ru-RU')} ₸</span>
                </div>
                <div className="border-t border-[#E5E5E5] pt-3 flex justify-between">
                  <span className="text-[16px] font-semibold text-[#1A1A1A]">Итого</span>
                  <span className="text-[18px] font-bold text-[#1A1A1A]">{total.toLocaleString('ru-RU')} ₸</span>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/checkout">
                  <Button variant="primary" fullWidth size="lg">
                    Оформить заказ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
