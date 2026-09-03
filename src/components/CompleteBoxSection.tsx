import React from 'react';
import { ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CompleteBoxProps {
  language: Language;
  bundleProduct?: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const CompleteBoxSection: React.FC<CompleteBoxProps> = ({
  language,
  bundleProduct,
  onAddToCart,
  onSelectProduct,
}) => {
  const t = TRANSLATIONS[language].completeBox;

  const handleOrderBox = () => {
    if (bundleProduct) {
      onAddToCart(bundleProduct);
    }
  };

  return (
    <section id="complete-box" className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft Cream / Warm Peach Card matching mockup */}
        <div className="relative rounded-3xl bg-[#FAF5EE] border border-[#E8DFC0] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Top Left Badge: الأفضل مبيعاً */}
          <div className="absolute top-6 left-6 rtl:left-6 rtl:right-auto z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#183B2B] text-white text-xs sm:text-sm font-cairo font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B170]" />
              {t.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Box Image Showcase */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div
                onClick={() => bundleProduct && onSelectProduct(bundleProduct)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#ECE4D8] shadow-sm group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                  alt="بوكس سعادة المتكامل"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#183B2B]/5 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* Box Details & CTA */}
            <div className="lg:col-span-6 order-1 lg:order-2 text-right rtl:text-right ltr:text-left">
              <h2 className="font-cairo text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183B2B] mb-3">
                {t.title}
              </h2>
              <p className="font-cairo text-base sm:text-lg text-[#556358] mb-6">
                {t.subtitle}
              </p>

              {/* 4 Product Badges included in the box */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {t.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D5CBBF] text-[#183B2B] text-xs sm:text-sm font-cairo font-semibold shadow-2xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#8D5B36]" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-4 mb-8">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-cairo text-4xl font-bold text-[#183B2B]">
                    590
                  </span>
                  <span className="font-cairo text-lg font-bold text-[#183B2B]">
                    ج.م
                  </span>
                </div>
                <span className="font-cairo text-base text-[#8C9890] line-through">
                  690 ج.م
                </span>
                <span className="px-3 py-1 rounded-full bg-[#8D5B36]/10 text-[#8D5B36] font-cairo text-xs font-bold">
                  {t.saveText}
                </span>
              </div>

              {/* Order Box CTA Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="order-complete-box-btn"
                  onClick={handleOrderBox}
                  className="px-8 py-4 rounded-full bg-[#183B2B] text-white hover:bg-[#23533D] font-cairo font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{t.orderBtn}</span>
                  <ShoppingBag className="w-5 h-5" />
                </button>

                <span className="text-xs font-cairo text-[#6B776E] text-center sm:text-right">
                  يشمل ملعقة خشبية يدوية + قبعة للشعر + شحن لجميع المحافظات
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
