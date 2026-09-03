import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onAddToCart,
  onSelectProduct,
}) => {
  const isAr = language === 'ar';
  const name = isAr ? product.nameAr : product.nameEn;
  const subTitle = isAr ? product.subTitleAr : product.subTitleEn;
  const t = TRANSLATIONS[language];

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col items-center bg-[#FAF6F0] rounded-3xl p-6 border border-[#ECE4D8] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
    >
      {/* Circular Product Image matching the mockup */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden mb-5 bg-[#EAE2D5] border-4 border-white shadow-md cursor-pointer group-hover:scale-105 transition-transform duration-300"
      >
        <img
          src={product.imageUrl}
          alt={name}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-[#183B2B]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Product Title */}
      <h3
        onClick={() => onSelectProduct(product)}
        className="font-cairo text-xl sm:text-2xl font-bold text-[#183B2B] hover:text-[#9B5D34] transition-colors cursor-pointer mb-2"
      >
        {name}
      </h3>

      {/* Product Subtitle / Description */}
      <p className="font-cairo text-sm text-[#5B6B60] font-normal line-clamp-2 min-h-[40px] mb-4 max-w-[220px]">
        {subTitle}
      </p>

      {/* Price in ج.م */}
      <div className="flex items-baseline justify-center gap-1.5 mb-5">
        <span className="font-cairo text-2xl font-bold text-[#183B2B]">
          {product.price}
        </span>
        <span className="font-cairo text-sm font-semibold text-[#66756C]">
          {t.productCard.currency}
        </span>
      </div>

      {/* Add To Cart Button matching mockup: أضيفي للسلة 🛍 */}
      <button
        id={`add-to-cart-btn-${product.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="w-full py-3 px-6 rounded-full bg-[#183B2B] text-white hover:bg-[#23533D] font-cairo font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
      >
        <span>{t.productCard.addToCart}</span>
        <ShoppingBag className="w-4 h-4" />
      </button>
    </div>
  );
};
