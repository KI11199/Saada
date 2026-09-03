import React from 'react';
import { Leaf, ShieldCheck, PackageCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { SOURCING_PILLARS, SOURCING_STATS } from '../data/sourcing';
import { TRANSLATIONS } from '../data/translations';

interface SourcingSectionProps {
  language: Language;
}

export const SourcingSection: React.FC<SourcingSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-[#1E3F2D]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#1E3F2D]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5 text-[#1E3F2D]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-5 h-5 text-[#1E3F2D]" />;
    }
  };

  return (
    <section id="sourcing" className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#FFFFFF] border border-[#1E3F2D]/20 text-[#1E3F2D] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Leaf className="w-3.5 h-3.5" />
            <span>{t.sourcingSection.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142C1F] font-amiri tracking-tight">
            {t.sourcingSection.title}
          </h2>

          <p className="text-sm sm:text-base text-[#556359] mt-3 leading-relaxed">
            {t.sourcingSection.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid - Geometric Balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {SOURCING_PILLARS.map((pillar, idx) => {
            const title = language === 'ar' ? pillar.titleAr : pillar.titleEn;
            const desc = language === 'ar' ? pillar.descriptionAr : pillar.descriptionEn;
            const detail = language === 'ar' ? pillar.detailAr : pillar.detailEn;

            return (
              <div
                key={idx}
                id={`sourcing-pillar-${idx}`}
                className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2D9CC] shadow-2xs hover:shadow-md hover:border-[#1E3F2D]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E2D9CC] flex items-center justify-center mb-4 shadow-2xs">
                    {getIcon(pillar.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-[#142C1F] font-amiri leading-snug mb-2">
                    {title}
                  </h3>
                  <p className="text-xs font-bold text-[#1E3F2D] mb-3">
                    {desc}
                  </p>
                  <p className="text-xs text-[#556359] leading-relaxed">
                    {detail}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EBE3D7] flex items-center gap-1.5 text-[11px] font-bold text-[#A84A29]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F2D]" />
                  <span>{language === 'ar' ? 'معيار استدامة موثق' : 'Certified Standard'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Row - Obsidian Forest with Crisp Dividers */}
        <div className="bg-[#142C1F] rounded-2xl p-8 text-[#FAF7F2] shadow-sm border border-[#2D553E]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-[#244231]">
            {SOURCING_STATS.map((stat, idx) => (
              <div key={idx} className={`${idx > 0 ? 'pt-4 md:pt-0' : ''}`}>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#C4924A] font-amiri">
                  {language === 'ar' ? stat.valueAr : stat.valueEn}
                </span>
                <span className="block text-xs sm:text-sm text-[#E8D7C3] font-medium mt-1">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Eco Packaging Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2D9CC] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left rtl:md:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A84A29] text-[#FAF7F2] flex items-center justify-center shrink-0 border border-[#A84A29]">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#142C1F]">
                {language === 'ar' ? 'عهد سعادة مع كوكب الأرض' : 'Our Circular Sustainability Pledge'}
              </h4>
              <p className="text-xs text-[#556359] mt-0.5">
                {language === 'ar'
                  ? 'جميع أكياس منتجاتنا من ورق الكرافت الطبيعي القابل للتحلل بنسبة ١٠٠٪ مع سحاب قابل لإعادة الإغلاق لحفظ الزيوت العشبية الطيارة.'
                  : 'All Saadah pouches are made from 100% biodegradable natural kraft paper with airtight ziplocks to preserve volatile essences.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#1E3F2D] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#D5C9B8] shrink-0">
            {language === 'ar' ? 'صفر نفايات بلاستيكية' : 'Zero Plastic Waste'}
          </span>
        </div>

      </div>
    </section>
  );
};
