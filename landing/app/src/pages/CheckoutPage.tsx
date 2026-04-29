import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { products } from '@/data';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState('courier');
  const [payment, setPayment] = useState('card');
  const [submitted, setSubmitted] = useState(false);

  const cartProducts = items.map((item) => ({
    item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartProducts.reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);
  const shipping = delivery === 'courier' ? 1500 : delivery === 'pickup' ? 1000 : 1750;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: 'Главная', path: '/' }, { label: 'Оформление заказа' }]} />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-[18px] text-[#1A1A1A] font-medium">Ваша корзина пуста</p>
          <Link to="/catalog" className="mt-4">
            <Button variant="primary">Перейти в каталог</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-[#2E7D32] text-white flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[24px] font-bold text-[#1A1A1A]">Заказ оформлен!</h2>
          <p className="text-[15px] text-[#4A4A4A] mt-2">Спасибо за покупку. Мы свяжемся с вами в ближайшее время.</p>
          <p className="text-[13px] text-[#8C8C8C] mt-4">Перенаправление на главную...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs items={[{ label: 'Главная', path: '/' }, { label: 'Оформление заказа' }]} />
      <h1 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight mb-6">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="flex gap-8">
        {/* Left Column - Forms */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Contact Data */}
          <div className="border border-[#E5E5E5] p-6">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Контактные данные</h2>
            <div className="flex flex-col gap-4">
              <Input label="Имя" placeholder="Введите ваше имя" value={name} onChange={setName} />
              <Input label="Телефон" placeholder="+7 (___) ___-__-__" type="tel" value={phone} onChange={setPhone} />
              <Input label="Email" placeholder="example@mail.ru" type="email" value={email} onChange={setEmail} />
            </div>
          </div>

          {/* Delivery */}
          <div className="border border-[#E5E5E5] p-6">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Доставка</h2>
            <RadioGroup
              options={[
                { label: 'Курьер (+1500 ₸)', value: 'courier' },
                { label: 'Пункт выдачи (+1000 ₸)', value: 'pickup' },
                { label: 'Казпочта (+1750 ₸)', value: 'post' },
              ]}
              value={delivery}
              onChange={setDelivery}
            />
            {delivery !== 'post' && (
              <div className="mt-4">
                <Input label="Адрес" placeholder="Город, улица, дом, квартира" value={address} onChange={setAddress} />
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="border border-[#E5E5E5] p-6">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Оплата</h2>
            <RadioGroup
              options={[
                { label: 'Картой онлайн', value: 'card' },
                { label: 'При получении', value: 'cash' },
              ]}
              value={payment}
              onChange={setPayment}
            />
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="w-[380px] flex-shrink-0">
          <div className="sticky top-[120px] border border-[#E5E5E5] p-6">
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Ваш заказ</h3>
            <div className="flex flex-col gap-3 mb-4">
              {cartProducts.map(({ item, product }) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <img src={product.image} alt="" className="w-12 h-12 object-contain bg-[#F8F8F8]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#1A1A1A] font-medium truncate">{product.name}</p>
                    <p className="text-[12px] text-[#8C8C8C]">{item.quantity} шт.</p>
                  </div>
                  <span className="text-[14px] font-medium text-[#1A1A1A]">
                    {(product.price * item.quantity).toLocaleString('ru-RU')} ₸
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E5E5E5] pt-3 flex flex-col gap-2">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#4A4A4A]">Товары</span>
                <span className="text-[#1A1A1A] font-medium">{subtotal.toLocaleString('ru-RU')} ₸</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#4A4A4A]">Доставка</span>
                <span className="text-[#1A1A1A] font-medium">{shipping.toLocaleString('ru-RU')} ₸</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5E5E5]">
                <span className="text-[16px] font-semibold text-[#1A1A1A]">Итого</span>
                <span className="text-[20px] font-bold text-[#E60012]">{total.toLocaleString('ru-RU')} ₸</span>
              </div>
            </div>
            <Button type="submit" variant="primary" fullWidth size="lg" className="mt-6">
              Оформить заказ
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
