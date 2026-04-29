import React, { useState } from 'react';
import { Phone, Mail, MapPin, Youtube, Send, Check } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const ContactsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs items={[{ label: 'Главная', path: '/' }, { label: 'Контакты' }]} />

      <h1 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight mb-6">Контакты</h1>

      <div className="flex gap-10">
        {/* Contact Info */}
        <div className="w-[340px] flex-shrink-0">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F8F8F8] flex-shrink-0">
                <Phone size={18} className="text-[#E60012]" />
              </div>
              <div>
                <span className="text-[13px] text-[#8C8C8C] block">Телефон</span>
                <span className="text-[16px] text-[#1A1A1A] font-medium">+7 701 786 4214</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F8F8F8] flex-shrink-0">
                <Mail size={18} className="text-[#E60012]" />
              </div>
              <div>
                <span className="text-[13px] text-[#8C8C8C] block">Email</span>
                <span className="text-[16px] text-[#1A1A1A] font-medium">info@takuma.kz</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F8F8F8] flex-shrink-0">
                <MapPin size={18} className="text-[#E60012]" />
              </div>
              <div>
                <span className="text-[13px] text-[#8C8C8C] block">Адрес</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium block">ТОО "AXION GLOBAL"</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium block mt-1">100025, Карагандинская область, г. Караганда, район имени Казыбек Би, ул. Рыскулова, д. 25, кв. 22</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[13px] text-[#8C8C8C] block mb-2">Социальные сети</span>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 flex items-center justify-center bg-[#F8F8F8] hover:bg-[#E5E5E5] transition-colors">
                  <Youtube size={18} className="text-[#1A1A1A]" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-[#F8F8F8] hover:bg-[#E5E5E5] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#1A1A1A]">
                    <path d="M12.785 16.241s.288-.032.436-.19c.136-.145.132-.42.132-.42s-.02-1.284.58-1.473c.593.184 1.32 1.284 2.144 1.846.604.41 1.063.32 1.063.32l2.137-.03s1.118-.07.588-.986c-.043-.074-.307-.656-1.578-1.856-1.332-1.254-1.153-1.052.45-3.22.976-1.332 1.366-2.145 1.243-2.494-.116-.328-.835-.242-.835-.242l-2.403.015s-.178-.025-.31.056c-.13.08-.213.26-.213.26s-.382 1.03-.89 1.906c-1.07 1.85-1.498 1.948-1.673 1.83-.41-.27-.308-1.084-.308-1.66 0-1.807.267-2.56-.518-2.756-.26-.065-.45-.107-1.112-.115-.85-.01-1.57.003-1.978.206-.27.136-.48.437-.353.454.158.022.515.098.704.357.244.335.236 1.086.236 1.086s.14 2.035-.327 2.288c-.32.18-.758-.187-1.697-1.87-.482-.86-.847-1.81-.847-1.81s-.07-.174-.196-.268c-.152-.114-.365-.15-.365-.15l-2.29.015s-.344.01-.47.163c-.113.137-.008.42-.008.42s1.797 4.23 3.833 6.36c1.866 1.95 3.986 1.823 3.986 1.823h.96z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-[#F8F8F8] hover:bg-[#E5E5E5] transition-colors">
                  <Send size={18} className="text-[#1A1A1A]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map + Form */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Map Placeholder */}
          <div className="w-full h-[300px] relative overflow-hidden border border-[#E5E5E5]">
            <iframe src="https://yandex.ru/map-widget/v1/?mode=search&text=Караганда%20ул.%20Рыскулова%2025&z=15" width="100%" height="300" frameBorder={0} allowFullScreen={true}></iframe>
          </div>

          {/* Contact Form */}
          <div className="border border-[#E5E5E5] p-6">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Напишите нам</h2>
            {sent ? (
              <div className="flex items-center gap-3 py-4">
                <div className="w-8 h-8 bg-[#2E7D32] text-white flex items-center justify-center">
                  <Check size={18} />
                </div>
                <span className="text-[15px] text-[#1A1A1A]">Сообщение отправлено! Мы ответим вам в ближайшее время.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Имя" placeholder="Ваше имя" value={name} onChange={setName} />
                  <Input label="Email" placeholder="example@mail.ru" type="email" value={email} onChange={setEmail} />
                </div>
                <div>
                  <label className="block text-[13px] text-[#4A4A4A] mb-1 font-medium">Сообщение</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ваше сообщение..."
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E5E5E5] text-[14px] outline-none focus:border-[#E60012] focus:shadow-[0_0_0_3px_rgba(230,0,18,0.1)] resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" variant="primary" size="md">
                    Отправить
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
