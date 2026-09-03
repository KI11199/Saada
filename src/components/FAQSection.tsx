import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldAlert, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { FAQS } from '../data/faqs';
import { TRANSLATIONS, BUSINESS_CONFIG } from '../data/translations';

interface FAQSectionProps {
  language: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-allergy-patch-test', 'faq-colored-hair']);
  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: t.faqSection.filterAll },
    { id: 'safety', label: t.faqSection.filterSafety },
    { id: 'usage', label: t.faqSection.filterUsage },
    { id: 'sourcing', label: t.faqSection.filterSourcing },
    { id: 'ordering', label: t.faqSection.filterOrdering },
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  const handleOpenWhatsAppConsult = () => {
    const text = encodeURIComponent(
      language === 'ar'
        ? 'مرحباً سعادة للمنتجات الطبيعية، أود الاستفسار عن طريقة استخدام المنتجات لشعري.'
        : 'Hello Saadah Care, I would like guidance on product usage for my hair.'
    );
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF7F2] relative border-b border-[#E2D9CC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#FFFFFF] border border-[#1E3F2D]/20 text-[#1E3F2D] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faqSection.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142C1F] font-amiri tracking-tight">
            {t.faqSection.title}
          </h2>

          <p className="text-sm sm:text-base text-[#556359] mt-3 leading-relaxed">
            {t.faqSection.subtitle}
          </p>
        </div>

        {/* Highlighted Safety Box (Patch Testing Mandate) */}
        <div className="mb-10 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2D9CC] shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#A84A29] text-[#FAF7F2] flex items-center justify-center shrink-0 mt-0.5 border border-[#A84A29]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#142C1F] font-amiri">
                {language === 'ar' ? 'بروتوكول اختبار الحساسية لسلامتكِ أولاً (Patch Test)' : 'Our Golden Allergy Safety Protocol (Patch Test)'}
              </h3>
              <p className="text-xs sm:text-sm text-[#556359] mt-1.5 leading-relaxed">
                {language === 'ar'
                  ? 'رغم أن مساحيقنا نقية ١٠٠٪ وخالية تماماً من الكيماويات، إلا أن الحساسية الفردية من النباتات واردة. نوصي دائماً بخلط نصف ملعقة صغيرة من البودرة بالماء وتطبيقها خلف الأذن لمدة ٢٠ دقيقة والانتظار ٢٤ ساعة قبل الاستخدام الكامل.'
                  : 'While our botanicals are 100% natural and pesticide-free, natural allergies can still occur. Always mix 1/2 tsp of powder with warm water, apply behind your ear, and wait 24 hours before first-time full application.'}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters - Geometric Balance */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs ${
                selectedCategory === c.id
                  ? 'bg-[#1E3F2D] text-[#FAF7F2] border border-[#1E3F2D]'
                  : 'bg-[#FFFFFF] text-[#556359] border border-[#D5C9B8] hover:bg-[#F2ECE0]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqIds.includes(faq.id);
            const question = language === 'ar' ? faq.questionAr : faq.questionEn;
            const answer = language === 'ar' ? faq.answerAr : faq.answerEn;

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E2D9CC] shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#142C1F] hover:text-[#1E3F2D] transition-colors cursor-pointer"
                >
                  <span className="font-amiri leading-snug">{question}</span>
                  <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#E2D9CC] flex items-center justify-center text-[#1E3F2D] shrink-0 shadow-2xs">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#556359] leading-relaxed border-t border-[#EBE3D7] animate-fadeIn">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Concierge CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-[#142C1F] text-[#FAF7F2] border border-[#2D553E] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right shadow-sm">
          <div>
            <h4 className="font-bold text-base font-amiri text-[#C4924A]">
              {t.faqSection.stillHaveQuestions}
            </h4>
            <p className="text-xs text-[#E8D7C3] mt-0.5">
              {language === 'ar' ? 'فريق خدمة عملاء سعادة جاهز للرد على استفساراتك فوراً عبر واتساب.' : 'Our concierge team is available right now to assist you directly.'}
            </p>
          </div>

          <button
            id="faq-whatsapp-concierge-btn"
            onClick={handleOpenWhatsAppConsult}
            className="px-5 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#142C1F] font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-xs shrink-0 active:scale-98 border border-[#C4924A]/40"
          >
            <MessageCircle className="w-4 h-4 text-[#1E3F2D]" />
            <span>{t.faqSection.contactWhatsapp}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
