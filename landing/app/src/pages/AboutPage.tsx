import React from 'react';
import { ShieldCheck, Zap, Award } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      <Breadcrumbs items={[{ label: 'Главная', path: '/' }, { label: 'О компании' }]} />

      {/* Hero */}
      <div className="flex items-center gap-10 mt-6">
        <div className="flex-1">
          <h1 className="text-[42px] font-bold text-[#1A1A1A] leading-tight tracking-tight">О компании TAKUMA</h1>
          <p className="text-[15px] text-[#4A4A4A] mt-4 leading-relaxed max-w-[600px]">
            TAKUMA — это бренд премиальных автомобильных фильтров, созданный для тех, кто ценит надежность и долговечность.
            Мы производим полный ассортимент фильтров для защиты двигателя, салона и топливной системы вашего автомобиля.
          </p>
          <p className="text-[15px] text-[#4A4A4A] mt-3 leading-relaxed max-w-[600px]">
            С 2008 года мы разрабатываем и производим фильтры, соответствующие самым высоким стандартам качества.
            Наша миссия — обеспечить каждому автовладельцу доступ к премиальным запчастям по справедливой цене.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="/images/about-car.png"
            alt="TAKUMA Quality"
            className="w-full h-[300px] object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mt-16">
        <h2 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight mb-8">Наши ценности</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: 'Качество',
              desc: 'Каждый фильтр проходит многоступенчатый контроль качества перед отправкой клиенту. Мы используем только сертифицированные материалы.',
            },
            {
              icon: Zap,
              title: 'Надежность',
              desc: 'Наши фильтры разработаны для работы в самых сложных условиях. Они сохраняют свои свойства при экстремальных температурах и нагрузках.',
            },
            {
              icon: Award,
              title: 'Инновации',
              desc: 'Мы постоянно инвестируем в исследования и разработки, чтобы наши фильтры соответствовали требованиям современных двигателей.',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <item.icon size={36} className="text-[#E60012] mb-4" />
              <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">{item.title}</h3>
              <p className="text-[14px] text-[#4A4A4A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Standards */}
      <div className="mt-16 bg-[#F8F8F8] p-10 flex items-center gap-10">
        <div className="flex-1">
          <h2 className="text-[32px] font-semibold text-[#1A1A1A] tracking-tight mb-4">Наши стандарты качества</h2>
          <p className="text-[15px] text-[#4A4A4A] leading-relaxed">
            Производство TAKUMA сертифицировано по международным стандартам ISO 9001 и IATF 16949.
            Каждая партия продукции проходит лабораторные испытания на эффективность фильтрации,
            герметичность и прочность конструкции.
          </p>
          <p className="text-[15px] text-[#4A4A4A] leading-relaxed mt-3">
            Мы гарантируем, что каждый фильтр, покидающий наш завод, соответствует или превосходит
            оригинальные спецификации производителей автомобилей.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="/images/blog-3.png"
            alt="Quality Standards"
            className="w-full h-[250px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
