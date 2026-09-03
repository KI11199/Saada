import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  language: Language;
  onShopClick: () => void;
  onExploreSourcing: () => void;
  onConsultAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onShopClick,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-[#FAF7F2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right Column (in RTL): Brand Title, Subtitle, CTA Button, and 3 Feature Badges */}
          <div className="lg:col-span-6 flex flex-col justify-center text-right rtl:text-right ltr:text-left z-10">
            {/* Main Brand & Beauty Heading */}
            <div className="mb-4">
              <h1 className="font-amiri text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#183B2B] leading-none mb-1">
                {t.hero.titlePrefix}
              </h1>
              <h2 className="font-amiri text-4xl sm:text-5xl lg:text-6xl font-bold text-[#8D5B36] leading-tight">
                {t.hero.titleMain}
              </h2>
            </div>

            {/* Subtitle & Value Proposition */}
            <p className="font-cairo text-base sm:text-lg text-[#445348] font-normal leading-relaxed mb-8 max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Shop Now CTA Button matching the mockup: تسوقي الآن < */}
            <div className="flex items-center gap-4 mb-10">
              <button
                id="hero-shop-now-btn"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#183B2B] text-white hover:bg-[#23533D] font-cairo font-bold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.hero.shopNow}</span>
                <ArrowLeft className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>

            {/* 3 Badges as shown in the mockup: بدون مواد كيميائية | آمن على الشعر | مكونات طبيعية */}
            <div
              id="hero-feature-badges"
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-[#EAE2D5]"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EDE3] border border-[#E2D8C9] text-[#183B2B] text-xs sm:text-sm font-cairo font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#183B2B]" />
                <span>{t.hero.features.noChemicals}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EDE3] border border-[#E2D8C9] text-[#183B2B] text-xs sm:text-sm font-cairo font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#183B2B]" />
                <span>{t.hero.features.safeOnHair}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EDE3] border border-[#E2D8C9] text-[#183B2B] text-xs sm:text-sm font-cairo font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#183B2B]" />
                <span>{t.hero.features.naturalIngredients}</span>
              </div>
            </div>
          </div>

          {/* Left Column (in RTL): Hero Visual Showcase of Saadah Pouches & Ingredients */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Product Showcase Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#F5EFEB] to-[#ECE3D8] p-4 sm:p-6 shadow-xl border border-[#E5DCD0]">
                {/* Hero image showing kraft pouches and botanical bowl */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
                    alt="Saadah Natural Hair Care Collection"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute bottom-4 right-4 bg-[#183B2B]/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-cairo font-bold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#D8B170] animate-pulse"></span>
                    <span>سعادة - من الطبيعة ليكي</span>
                  </div>

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#183B2B] px-3.5 py-1.5 rounded-full text-xs font-cairo font-bold shadow-md">
                    منتجات طبيعية ١٠٠٪
                  </div>
                </div>

                {/* 4 Mini Product Preview Pills underneath the main photo */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
                  <div className="bg-white/80 rounded-xl p-2 text-center border border-[#E8DFC0]/60 shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#5C7C45]/20 flex items-center justify-center mb-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#5C7C45]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-cairo font-bold text-[#183B2B] block truncate">
                      حناء طبيعية
                    </span>
                  </div>

                  <div className="bg-white/80 rounded-xl p-2 text-center border border-[#E8DFC0]/60 shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#7A9A60]/20 flex items-center justify-center mb-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#7A9A60]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-cairo font-bold text-[#183B2B] block truncate">
                      سدر سعودي
                    </span>
                  </div>

                  <div className="bg-white/80 rounded-xl p-2 text-center border border-[#E8DFC0]/60 shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#8B5A2B]/20 flex items-center justify-center mb-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#8B5A2B]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-cairo font-bold text-[#183B2B] block truncate">
                      نواة تمر
                    </span>
                  </div>

                  <div className="bg-white/80 rounded-xl p-2 text-center border border-[#E8DFC0]/60 shadow-2xs">
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#A04A2C]/20 flex items-center justify-center mb-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#A04A2C]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-cairo font-bold text-[#183B2B] block truncate">
                      مشاط أحمر
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
