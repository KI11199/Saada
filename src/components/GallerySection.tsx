import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { GALLERY_ITEMS } from '../data/products';
import { TRANSLATIONS, BUSINESS_CONFIG } from '../data/translations';

interface GalleryProps {
  language: Language;
}

export const GallerySection: React.FC<GalleryProps> = ({ language }) => {
  const isAr = language === 'ar';
  const t = TRANSLATIONS[language].instagramSection;

  return (
    <section id="gallery" className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching mockup */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-[#183B2B]">
              {t.title}
            </h2>
            <p className="font-cairo text-sm text-[#6B776E] mt-1">
              شاركينا تجاربك وتابعي يومياتنا ووصفات العناية بالشعر على {BUSINESS_CONFIG.instagram}
            </p>
          </div>

          <a
            href={`https://instagram.com/${BUSINESS_CONFIG.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] text-[#183B2B] text-sm font-cairo font-bold transition-colors shadow-2xs group cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-[#8D5B36]" />
            <span>{t.button}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:group-hover:-translate-x-0.5" />
          </a>
        </div>

        {/* 6 Photos Grid matching mockup */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`https://instagram.com/${BUSINESS_CONFIG.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden aspect-square bg-[#E8DFC0] block shadow-2xs hover:shadow-md transition-shadow"
            >
              <img
                src={item.imageUrl}
                alt={isAr ? item.titleAr : item.titleEn}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#183B2B]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <Instagram className="w-5 h-5 text-white mb-1" />
                <span className="text-[11px] font-cairo font-bold line-clamp-1">
                  {isAr ? item.titleAr : item.titleEn}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
