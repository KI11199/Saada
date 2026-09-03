import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Check, Plus } from 'lucide-react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface RoutineFinderProps {
  language: Language;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const RoutineFinderSection: React.FC<RoutineFinderProps> = ({
  language,
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  const t = TRANSLATIONS[language].routines;
  const [activeRoutine, setActiveRoutine] = useState<string>('strengthening');

  const routines = [
    {
      id: 'strengthening',
      title: t.strengthening,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
      description: 'روتين مصمم خصيصاً لتغذية جذور الشعر الضعيف ومنع التكسر وتقوية الشعرة.',
      productIds: ['saadah-red-mshat', 'saadah-pure-henna'],
      tips: 'اخلطي ملعقة من المشاط الأحمر مع الحناء الطبيعية مرة كل أسبوعين للحصول على قوة مضاعفة ولمعان استثنائي.',
    },
    {
      id: 'hydration',
      title: t.hydration,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      description: 'ترطيب عميق للشعر الجاف والمجهد لإعادة النعومة والحيوية للأطراف.',
      productIds: ['saadah-pure-henna', 'saadah-date-seed-powder'],
      tips: 'اعجني الحناء بزبادي أو حليب جوز الهند وأضيفي ملعقة من مسحوق نواة التمر لمنع أي جفاف وترطيب فائق.',
    },
    {
      id: 'volume',
      title: t.volume,
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
      description: 'تحفيز البصيلات الخاملة وإنبات البيبي هير وتكثيف الشعر الخفيف.',
      productIds: ['saadah-date-seed-powder', 'saadah-saudi-sidr'],
      tips: 'استخدمي تونيك نواة التمر يومياً على الفراغات، واغسلي الفروة أسبوعياً برغوة السدر الطبيعية لإنبات سريع.',
    },
    {
      id: 'scalp-care',
      title: t.scalpCare,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      description: 'تنظيف وتطهير فروة الرأس من القشرة والدهون المتراكمة وإعادة التوازن الطبيعي.',
      productIds: ['saadah-saudi-sidr', 'saadah-red-mshat'],
      tips: 'غسول السدر الجبلي يزيل القشرة والدهون بدون سلفات كيميائية، مع لمسة مشاط لتهدئة الفروة وتعطيرها.',
    },
  ];

  const currentRoutineData = routines.find((r) => r.id === activeRoutine) || routines[0];
  const recommendedProducts = products.filter((p) =>
    currentRoutineData.productIds.includes(p.id)
  );

  const handleAddFullRoutine = () => {
    recommendedProducts.forEach((p) => onAddToCart(p));
  };

  return (
    <section id="routines" className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching mockup */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-[#183B2B]">
              {t.title}
            </h2>
            <p className="font-cairo text-sm text-[#6B776E] mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const currentIndex = routines.findIndex((r) => r.id === activeRoutine);
                const prevIndex = (currentIndex - 1 + routines.length) % routines.length;
                setActiveRoutine(routines[prevIndex].id);
              }}
              className="w-10 h-10 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] flex items-center justify-center text-[#183B2B] transition-colors cursor-pointer shadow-2xs"
              aria-label="Previous routine"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
            </button>
            <button
              onClick={() => {
                const currentIndex = routines.findIndex((r) => r.id === activeRoutine);
                const nextIndex = (currentIndex + 1) % routines.length;
                setActiveRoutine(routines[nextIndex].id);
              }}
              className="w-10 h-10 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] flex items-center justify-center text-[#183B2B] transition-colors cursor-pointer shadow-2xs"
              aria-label="Next routine"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
            </button>
          </div>
        </div>

        {/* 4 Arched / Rounded Category Cards matching the mockup */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {routines.map((routine) => {
            const isSelected = activeRoutine === routine.id;
            return (
              <button
                key={routine.id}
                onClick={() => setActiveRoutine(routine.id)}
                className={`group relative rounded-3xl overflow-hidden aspect-[3/4] transition-all duration-300 text-right cursor-pointer flex flex-col justify-end p-4 sm:p-6 border-2 ${
                  isSelected
                    ? 'border-[#183B2B] ring-4 ring-[#183B2B]/10 shadow-lg scale-[1.02]'
                    : 'border-transparent hover:border-[#D5CBBF] shadow-sm'
                }`}
              >
                {/* Background Image */}
                <img
                  src={routine.image}
                  alt={routine.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183B2B]/90 via-[#183B2B]/30 to-transparent" />

                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-[#183B2B] text-white flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                {/* Title overlay */}
                <div className="relative z-10">
                  <h3 className="font-cairo text-lg sm:text-xl font-bold text-white mb-1">
                    {routine.title}
                  </h3>
                  <span className="inline-block text-xs text-[#E8D7C3] font-cairo">
                    اضغطي لاكتشاف المنتجات
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommended Routine Drawer / Card */}
        <div className="bg-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#E8DFC0] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E1D5]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#8D5B36]" />
                <span className="text-xs font-bold font-cairo uppercase tracking-wider text-[#8D5B36]">
                  الروتين الموصى به: {currentRoutineData.title}
                </span>
              </div>
              <p className="text-sm font-cairo text-[#4A574E] max-w-2xl">
                {currentRoutineData.description}
              </p>
              <div className="mt-3 p-3 bg-white/70 rounded-xl border border-[#E8DFC0]/80 text-xs sm:text-sm font-cairo text-[#183B2B] flex items-start gap-2">
                <span className="font-bold text-[#8D5B36] shrink-0">نصيحة سعادة:</span>
                <span>{currentRoutineData.tips}</span>
              </div>
            </div>

            <button
              onClick={handleAddFullRoutine}
              className="self-start md:self-center px-6 py-3 rounded-full bg-[#183B2B] text-white hover:bg-[#23533D] font-cairo font-bold text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addRoutineToCart}</span>
            </button>
          </div>

          {/* Recommended Products in this Routine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {recommendedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="flex items-center justify-between bg-white rounded-2xl p-4 border border-[#ECE4D8] hover:border-[#183B2B] transition-colors cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#FAF6F0]">
                    <img
                      src={p.imageUrl}
                      alt={p.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-cairo font-bold text-base text-[#183B2B]">
                      {p.nameAr}
                    </h4>
                    <p className="font-cairo text-xs text-[#6B776E] line-clamp-1">
                      {p.subTitleAr}
                    </p>
                    <span className="font-cairo text-sm font-bold text-[#183B2B] mt-1 block">
                      {p.price} ج.م
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(p);
                  }}
                  className="p-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#183B2B] text-[#183B2B] hover:text-white transition-colors cursor-pointer"
                  title="أضيفي للسلة"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
