import React from 'react';
import { Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, BUSINESS_CONFIG } from '../data/translations';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = TRANSLATIONS[language].footer;

  return (
    <footer id="contact" className="bg-[#F8F4EE] border-t border-[#E8E1D5] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-[#E8E1D5]">
          {/* Column 1: Brand Logo & Description */}
          <div className="flex flex-col items-start rtl:items-start text-right rtl:text-right">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-amiri text-3xl font-bold text-[#183B2B] leading-none">
                {BUSINESS_CONFIG.brandArabic}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#183B2B] mt-2 inline-block"></span>
            </div>
            <span className="font-cairo text-xs text-[#6B776E] font-medium tracking-wide mb-4">
              {BUSINESS_CONFIG.brandSubtitle}
            </span>
            <p className="font-cairo text-sm text-[#526056] leading-relaxed max-w-sm mb-4">
              {t.aboutText}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183B2B]/10 text-[#183B2B] text-xs font-cairo font-bold">
              {t.ecoBadge}
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className="font-cairo text-base font-bold text-[#183B2B] mb-4">
              {t.customerService}
            </h3>
            <ul className="flex flex-col gap-2.5 font-cairo text-sm text-[#526056]">
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#183B2B] hover:underline transition-colors text-right cursor-pointer"
                >
                  {t.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#183B2B] hover:underline transition-colors text-right cursor-pointer"
                >
                  {t.returnPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#183B2B] hover:underline transition-colors text-right cursor-pointer"
                >
                  {t.shippingPolicy}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="font-cairo text-base font-bold text-[#183B2B] mb-4">
              {t.information}
            </h3>
            <ul className="flex flex-col gap-2.5 font-cairo text-sm text-[#526056]">
              <li>
                <button
                  onClick={() => onNavigate('why-saadah')}
                  className="hover:text-[#183B2B] hover:underline transition-colors text-right cursor-pointer"
                >
                  {t.aboutSaadah}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('routines')}
                  className="hover:text-[#183B2B] hover:underline transition-colors text-right cursor-pointer"
                >
                  {t.blog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#183B2B] hover:underline transition-colors text-right cursor-pointer"
                >
                  {t.contactUs}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us with 01155789196 */}
          <div>
            <h3 className="font-cairo text-base font-bold text-[#183B2B] mb-4">
              {t.contactUs}
            </h3>
            <ul className="flex flex-col gap-3 font-cairo text-sm text-[#526056]">
              {/* Phone and WhatsApp: 01155789196 */}
              <li>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#183B2B] font-bold hover:text-[#25D366] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#183B2B]/10 flex items-center justify-center text-[#183B2B] group-hover:bg-[#25D366]/20 group-hover:text-[#25D366] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span dir="ltr">{BUSINESS_CONFIG.displayPhone}</span>
                  <span className="text-[11px] font-normal text-[#6B776E]">(واتساب ومكالمات)</span>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a
                  href={`https://instagram.com/${BUSINESS_CONFIG.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#183B2B] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#183B2B]/10 flex items-center justify-center text-[#183B2B] group-hover:bg-[#E4405F]/20 group-hover:text-[#E4405F] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span dir="ltr">{BUSINESS_CONFIG.instagram}</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-[#183B2B] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#183B2B]/10 flex items-center justify-center text-[#183B2B] group-hover:bg-[#183B2B]/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{BUSINESS_CONFIG.email}</span>
                </a>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-white rounded-xl border border-[#ECE4D8] text-xs font-cairo text-[#6B776E]">
              {t.workingHours}
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-cairo text-[#7A887E]">
          <p>{t.rights}</p>
          <p className="flex items-center gap-2">
            <span>صُنع بحب في مصر 🇪🇬</span>
            <span>•</span>
            <span>منتجات طبيعية ١٠٠٪</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
