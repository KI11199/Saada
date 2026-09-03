import React, { useState, useEffect } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AIConsultantSectionProps {
  language: Language;
  activeContextProduct: Product | null;
  onClearContextProduct: () => void;
}

export const AIConsultantSection: React.FC<AIConsultantSectionProps> = ({
  language,
  activeContextProduct,
  onClearContextProduct,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const t = TRANSLATIONS[language];

  const suggestedQuestionsAr = [
    'ما هو أفضل روتين لإنبات الفراغات وتكثيف الشعر بنواة التمر والسدر؟',
    'كيف أعجن الحناء الطبيعية للحصول على ترطيب عميق ولمعان بدون أي جفاف؟',
    'هل السدر والمشاط آمنان للشعر المصبوغ وكيف أستخدمهما؟',
    'جدول عناية نباتي أسبوعي متكامل لترميم الشعر التالف والمتساقط.',
  ];

  const suggestedQuestionsEn = [
    'What is the ideal routine to boost hair density using Sidr & Date Seed powder?',
    'How should I blend pure Henna with yogurt & oils for intense silkiness?',
    'Are Sidr and Red Mshat safe on bleached or color-treated hair?',
    'Create a 4-week holistic herbal regimen for hair shedding and dandruff.',
  ];

  const suggestedQuestions = language === 'ar' ? suggestedQuestionsAr : suggestedQuestionsEn;

  // If a context product was passed from product modal, pre-fill and trigger question
  useEffect(() => {
    if (activeContextProduct) {
      const initialQuestion = language === 'ar'
        ? `أرغب في معرفة أفضل طريقة لاستخدام (${activeContextProduct.nameAr}) ونسب الخلط المثالية لنوع شعري.`
        : `What is the optimal preparation ratio and hair routine using (${activeContextProduct.nameEn})?`;
      
      setQuery(initialQuestion);
    }
  }, [activeContextProduct, language]);

  const handleAsk = async (textToSubmit?: string) => {
    const text = (textToSubmit || query).trim();
    if (!text || loading) return;

    setConversation((prev) => [...prev, { sender: 'user', text }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          language,
          contextProduct: activeContextProduct
            ? {
                name: language === 'ar' ? activeContextProduct.nameAr : activeContextProduct.nameEn,
                category: activeContextProduct.category,
                ingredients: language === 'ar' ? activeContextProduct.ingredientsAr : activeContextProduct.ingredientsEn,
              }
            : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach AI service');
      }

      const data = await response.json();
      setConversation((prev) => [...prev, { sender: 'ai', text: data.advice || '' }]);
    } catch (err: unknown) {
      console.error('AI consultation error:', err);
      // Helpful fallback response
      const fallbackAdvice = language === 'ar'
        ? 'سعادة للمنتجات الطبيعية توصي دائماً باختبار الحساسية قبل البدء. للحصول على أقصى كثافة، امزجي السدر بماء فاتر كمنظف للفروة، واستخدمي مسحوق نواة التمر المحمصة المنقوعة بزيت الزيتون كحمام زيت أسبوعي. للطلب الفوري أو استشارة خبيراتنا مباشرة تواصلي معنا عبر واتساب!'
        : 'Saadah Botanical Care recommends always conducting a 24-hr patch test. For optimal thickness, use Sidr as a gentle scalp shampoo, and infuse roasted Date Seed powder into olive oil for weekly hot-oil treatments. Feel free to contact our specialists directly on WhatsApp for bespoke assistance!';

      setConversation((prev) => [...prev, { sender: 'ai', text: fallbackAdvice }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-advisor" className="py-16 sm:py-24 bg-[#FAF7F2] relative border-b border-[#E2D9CC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-[#FFFFFF] border border-[#A84A29]/30 text-[#A84A29] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.aiSection.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142C1F] font-amiri tracking-tight">
            {t.aiSection.title}
          </h2>

          <p className="text-sm sm:text-base text-[#556359] mt-3 leading-relaxed">
            {t.aiSection.subtitle}
          </p>
        </div>

        {/* Active Product Context Badge if any */}
        {activeContextProduct && (
          <div className="mb-6 p-3 bg-[#FFFFFF] border border-[#E2D9CC] rounded-xl flex items-center justify-between text-xs text-[#A84A29] shadow-2xs">
            <div className="flex items-center gap-2 font-bold">
              <Sparkles className="w-4 h-4 text-[#A84A29]" />
              <span>
                {language === 'ar'
                  ? `جاري الاستشارة حول المنتج: ${activeContextProduct.nameAr}`
                  : `Currently consulting on: ${activeContextProduct.nameEn}`}
              </span>
            </div>
            <button
              onClick={onClearContextProduct}
              className="text-[#142C1F] font-bold hover:underline cursor-pointer"
            >
              {language === 'ar' ? 'إلغاء التحديد' : 'Clear Focus'}
            </button>
          </div>
        )}

        {/* Conversation Box - Geometric Balance */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2D9CC] shadow-sm overflow-hidden flex flex-col">
          
          {/* Messages Container */}
          <div className="p-6 space-y-4 min-h-[220px] max-h-[480px] overflow-y-auto bg-[#FAF7F2]/50">
            {conversation.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1E3F2D] text-[#E8D7C3] flex items-center justify-center mx-auto shadow-2xs border border-[#C4924A]/40">
                  <Bot className="w-7 h-7 text-[#C4924A]" />
                </div>
                <h3 className="font-bold text-base text-[#142C1F] font-amiri">
                  {language === 'ar'
                    ? 'أهلاً بكِ في مستشار سعادة للأعشاب الطبيعية 🌿'
                    : 'Welcome to Saadah Botanical Hair Advisor 🌿'}
                </h3>
                <p className="text-xs text-[#717E75] max-w-md mx-auto leading-relaxed">
                  {language === 'ar'
                    ? 'اكتبي سؤالكِ عن نوع شعركِ ومشاكل التساقط أو القشرة أو الجفاف، وسيقوم الذكاء الاصطناعي بتحليل المكونات وتقديم جدول ووصفات دقيقة تناسبكِ.'
                    : 'Share your hair type, scalp concerns, or styling history to receive an in-depth botanical routine with exact ratios and safety advice.'}
                </p>

                {/* Suggested Questions */}
                <div className="pt-2 text-left rtl:text-right">
                  <span className="text-[11px] font-bold text-[#142C1F] block mb-2">
                    {t.aiSection.suggestedQuestionsTitle}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAsk(q)}
                        className="text-xs text-left rtl:text-right px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F2ECE0] border border-[#D5C9B8] text-[#1F2923] font-medium transition-colors cursor-pointer shadow-2xs"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-[#1E3F2D] text-[#FAF7F2] flex items-center justify-center shrink-0 mt-1 shadow-2xs border border-[#C4924A]/40">
                      <Bot className="w-4 h-4 text-[#C4924A]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-4 rounded-xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#1E3F2D] text-[#FAF7F2] border border-[#1E3F2D]'
                        : 'bg-[#FFFFFF] text-[#1F2923] border border-[#E2D9CC] whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-[#A84A29] text-[#FAF7F2] flex items-center justify-center shrink-0 mt-1 shadow-2xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Thinking Loading State */}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#1E3F2D] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-2xs border border-[#C4924A]/40">
                  <Bot className="w-4 h-4 text-[#C4924A] animate-spin" />
                </div>
                <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2D9CC] text-xs text-[#717E75] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1E3F2D] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#1E3F2D] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#1E3F2D] animate-bounce [animation-delay:0.4s]" />
                  <span className="font-bold text-[#1E3F2D] mr-2 rtl:mr-0 rtl:ml-2">
                    {t.aiSection.thinking}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-[#E2D9CC] bg-[#FFFFFF]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.aiSection.placeholder}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl border border-[#D5C9B8] bg-[#FAF7F2] text-xs sm:text-sm text-[#142C1F] placeholder:text-[#8C9890] focus:outline-none focus:border-[#1E3F2D] focus:ring-1 focus:ring-[#1E3F2D]"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-5 py-3 rounded-xl bg-[#1E3F2D] hover:bg-[#142C1F] disabled:opacity-50 text-[#FAF7F2] font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-98 border border-[#C4924A]/40"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span className="hidden sm:inline">{t.aiSection.askBtn}</span>
              </button>
            </form>

            <p className="text-[10px] text-[#8C9890] text-center mt-2.5">
              {t.aiSection.disclaimer}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
