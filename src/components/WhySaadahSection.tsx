import React from 'react';
import { Leaf, Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WhySaadahProps {
  language: Language;
}

export const WhySaadahSection: React.FC<WhySaadahProps> = ({ language }) => {
  const t = TRANSLATIONS[language].whySaadah;

  const features = [
    {
      icon: Leaf,
      title: t.p1Title,
      description: t.p1Desc,
    },
    {
      icon: Sparkles,
      title: t.p2Title,
      description: t.p2Desc,
    },
    {
      icon: HeartHandshake,
      title: t.p3Title,
      description: t.p3Desc,
    },
    {
      icon: CheckCircle,
      title: t.p4Title,
      description: t.p4Desc,
    },
  ];

  return (
    <section id="why-saadah" className="py-8 sm:py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Deep Green Card matching mockup */}
        <div className="relative rounded-3xl bg-[#183B2B] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-xl">
          {/* Subtle botanical background motif */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#D8B170]/10 blur-2xl pointer-events-none" />

          {/* Section Heading */}
          <div className="text-center mb-10 sm:mb-12 relative z-10">
            <h2 className="font-amiri text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide">
              {t.title}
            </h2>
            <div className="w-16 h-0.5 bg-[#D8B170] mx-auto mt-3 rounded-full" />
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative z-10">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-[#D8B170] shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-cairo text-lg font-bold mb-2 text-[#FFFFFF]">
                    {feature.title}
                  </h3>
                  <p className="font-cairo text-sm text-[#D1DDD6] font-normal leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
