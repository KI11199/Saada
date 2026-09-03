import React, { useState } from 'react';
import { X, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Product, Language, ProductOption } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductOption, quantity: number) => void;
  onQuickWhatsAppOrder: (product: Product, size: ProductOption) => void;
  onAskAIAboutProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
  onAskAIAboutProduct,
}) => {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howToUse' | 'ingredients'>('benefits');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const t = TRANSLATIONS[language];
  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];

  const name = language === 'ar' ? product.nameAr : product.nameEn;
  const subtitle = language === 'ar' ? product.subTitleAr : product.subTitleEn;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const benefits = language === 'ar' ? product.benefitsAr : product.benefitsEn;
  const ingredients = language === 'ar' ? product.ingredientsAr : product.ingredientsEn;
  const howToUse = language === 'ar' ? product.howToUseAr : product.howToUseEn;
  const expertTips = language === 'ar' ? product.expertTipsAr : product.expertTipsEn;
  const suitableFor = language === 'ar' ? product.suitableForAr : product.suitableForEn;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl);

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-content"
        className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-2xl border border-[#E2D9CC] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-6 pb-4 border-b border-[#E2D9CC] flex items-start justify-between bg-[#FAF7F2]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[11px] font-bold px-3 py-0.5 rounded-lg uppercase shadow-2xs border border-black/5"
                style={{
                  backgroundColor: product.colorPalette.badgeBg,
                  color: product.colorPalette.badgeText,
                }}
              >
                {language === 'ar' ? product.badgeAr || 'عضوي' : product.badgeEn || 'Organic'}
              </span>
              <span className="text-xs text-[#717E75] font-semibold">
                {product.weight} • 100% Pure
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#142C1F] font-amiri leading-tight">
              {name}
            </h2>
            <p className="text-xs sm:text-sm text-[#717E75] mt-1 font-medium">
              {subtitle}
            </p>
          </div>

          <button
            id="close-product-detail-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-[#717E75] hover:bg-[#FAF7F2] hover:text-[#142C1F] border border-transparent hover:border-[#D5C9B8] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto bg-[#FAF7F2]/40">
          
          {/* Product Image & Gallery Display */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E2D9CC] shadow-2xs">
              <img
                src={selectedImage || product.imageUrl}
                alt={name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248597359-00762a4a7541?auto=format&fit=crop&w=900&q=80';
                }}
              />
            </div>

            {product.secondaryImageUrl && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedImage(product.imageUrl)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    (selectedImage || product.imageUrl) === product.imageUrl
                      ? 'border-[#1E3F2D] shadow-xs'
                      : 'border-[#E2D9CC] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.imageUrl}
                    alt="Main"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setSelectedImage(product.secondaryImageUrl!)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === product.secondaryImageUrl
                      ? 'border-[#1E3F2D] shadow-xs'
                      : 'border-[#E2D9CC] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.secondaryImageUrl}
                    alt="Secondary"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            )}
          </div>

          {/* Main Description */}
          <p className="text-sm text-[#556359] leading-relaxed">
            {description}
          </p>

          {/* Suitable For & Purity Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FFFFFF] p-4 rounded-xl border border-[#E2D9CC] shadow-2xs">
            <div>
              <span className="text-xs font-bold text-[#1E3F2D] block mb-1">
                {t.detailsModal.suitableForTitle}
              </span>
              <p className="text-xs text-[#556359] leading-relaxed">
                {suitableFor}
              </p>
            </div>
            <div className="sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-[#E2D9CC] sm:pl-4 rtl:sm:pl-0 rtl:sm:pr-4">
              <span className="text-xs font-bold text-[#1E3F2D] block mb-1">
                {language === 'ar' ? 'ضمان النقاء والاستدامة:' : 'Purity & Eco Pledge:'}
              </span>
              <p className="text-xs text-[#556359]">
                {language === 'ar' ? '٠٪ إضافات كيميائية • تغليف كرافت قابل لإعادة التدوير' : '0% Chemical Additives • 100% Recyclable Kraft'}
              </p>
            </div>
          </div>

          {/* Tabs for In-depth Details */}
          <div>
            <div className="flex border-b border-[#E2D9CC] gap-4 mb-4">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'border-[#1E3F2D] text-[#1E3F2D]'
                    : 'border-transparent text-[#717E75] hover:text-[#142C1F]'
                }`}
              >
                {t.detailsModal.benefitsTitle}
              </button>

              <button
                onClick={() => setActiveTab('howToUse')}
                className={`pb-2.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === 'howToUse'
                    ? 'border-[#1E3F2D] text-[#1E3F2D]'
                    : 'border-transparent text-[#717E75] hover:text-[#142C1F]'
                }`}
              >
                {t.detailsModal.howToUseTitle}
              </button>

              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2.5 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'border-[#1E3F2D] text-[#1E3F2D]'
                    : 'border-transparent text-[#717E75] hover:text-[#142C1F]'
                }`}
              >
                {t.detailsModal.ingredientsTitle}
              </button>
            </div>

            {/* Tab 1: Benefits */}
            {activeTab === 'benefits' && (
              <div className="space-y-2 animate-fadeIn">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F2923]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E3F2D] mt-2 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: How to Use */}
            {activeTab === 'howToUse' && (
              <div className="space-y-3 animate-fadeIn">
                {howToUse.map((item, idx) => (
                  <div key={idx} className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E2D9CC] shadow-2xs">
                    <span className="text-xs font-bold text-[#1E3F2D] block mb-1">
                      {idx + 1}. {item.step}
                    </span>
                    <p className="text-xs text-[#556359] leading-relaxed">
                      {item.instruction}
                    </p>
                  </div>
                ))}

                {/* Saadah Master Tip Callout */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E2D9CC] mt-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#A84A29] mb-1">
                    <Sparkles className="w-4 h-4 text-[#A84A29]" />
                    <span>{t.detailsModal.expertTipTitle}</span>
                  </div>
                  <p className="text-xs text-[#556359] leading-relaxed">
                    {expertTips}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Ingredients */}
            {activeTab === 'ingredients' && (
              <div className="space-y-2 animate-fadeIn bg-[#FFFFFF] p-4 rounded-xl border border-[#E2D9CC] shadow-2xs">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#1F2923]">
                    <Check className="w-4 h-4 text-[#1E3F2D] shrink-0" />
                    <span className="font-bold">{ing}</span>
                  </div>
                ))}
                <p className="text-[11px] text-[#717E75] pt-2 border-t border-[#E2D9CC] mt-3">
                  {language === 'ar'
                    ? 'نقية ١٠٠٪ بدون أملاح معدنية مضافة أو كبريتات أو بارابين أو عطور اصطناعية.'
                    : '100% pure without added metallic salts, sulfates, parabens, or artificial fragrance.'}
                </p>
              </div>
            )}
          </div>

          {/* Ask AI Advisor Shortcut */}
          <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#E2D9CC] shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#A84A29] shrink-0" />
              <span className="text-xs font-bold text-[#142C1F]">
                {language === 'ar'
                  ? 'ترغبين بخلطة مخصصة لشعرك مع هذا المنتج؟'
                  : 'Want a custom recipe tailored to your hair with this product?'}
              </span>
            </div>
            <button
              id={`ask-ai-about-${product.id}`}
              onClick={() => {
                onClose();
                onAskAIAboutProduct(product);
              }}
              className="text-xs font-bold text-[#A84A29] hover:underline shrink-0 cursor-pointer"
            >
              {language === 'ar' ? 'استشيري الذكاء الاصطناعي' : 'Ask AI Advisor'}
            </button>
          </div>

        </div>

        {/* Modal Footer: Size Selection, Qty, Add to Bag */}
        <div className="p-6 border-t border-[#E2D9CC] bg-[#FAF7F2] space-y-4">
          
          {/* Size Pills */}
          <div>
            <label className="block text-xs font-bold text-[#142C1F] mb-2">
              {t.detailsModal.selectSize}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.sizes.map((sizeOption, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer shadow-2xs ${
                    selectedSizeIndex === idx
                      ? 'bg-[#1E3F2D] text-[#FAF7F2] border-[#1E3F2D]'
                      : 'bg-[#FFFFFF] text-[#556359] border-[#D5C9B8] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <span className="block text-xs font-bold">
                    {language === 'ar' ? sizeOption.labelAr : sizeOption.labelEn}
                  </span>
                  <span className="block text-xs font-semibold opacity-90 mt-0.5">
                    {sizeOption.price} {t.productCard.currency}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#142C1F]">
                {t.detailsModal.quantity}
              </span>
              <div className="flex items-center border border-[#D5C9B8] bg-[#FFFFFF] rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-[#142C1F] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-[#142C1F] min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-[#142C1F] hover:bg-[#FAF7F2] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-right rtl:text-left">
              <span className="text-xs text-[#717E75] block">
                {language === 'ar' ? 'الإجمالي:' : 'Total:'}
              </span>
              <span className="text-2xl font-bold text-[#142C1F]">
                {selectedSize.price * quantity} {t.productCard.currency}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 border border-[#C4924A]/40 ${
                isAddedRecently
                  ? 'bg-[#142C1F] text-[#FAF7F2]'
                  : 'bg-[#1E3F2D] hover:bg-[#142C1F] text-[#FAF7F2]'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-4 h-4 text-[#C4924A]" />
                  <span>{language === 'ar' ? 'تمت الإضافة للسلة ✓' : 'Added to Bag!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.productCard.addToCart}</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
