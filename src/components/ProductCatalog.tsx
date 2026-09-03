import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Language } from '../types';
import { ProductCard } from './ProductCard';
import { TRANSLATIONS } from '../data/translations';

interface ProductCatalogProps {
  products: Product[];
  language: Language;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  language,
  onAddToCart,
  onSelectProduct,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Filter the core 4 individual products for the main catalog row
  const individualProducts = products.filter((p) => p.category !== 'bundles');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="products" className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching mockup */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-[#183B2B]">
              منتجات سعادة
            </h2>
            <p className="font-cairo text-sm text-[#6B776E] mt-1">
              مختارة بعناية ومطحونة طازجة بدون أي مواد حافظة أو ملونات
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View All Products button as in mockup */}
            <button
              id="view-all-products-btn"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className="px-5 py-2.5 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] text-[#183B2B] text-sm font-cairo font-bold transition-colors cursor-pointer shadow-2xs"
            >
              {t.categories.all}
            </button>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] flex items-center justify-center text-[#183B2B] transition-colors cursor-pointer shadow-2xs"
                aria-label="Scroll left"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] flex items-center justify-center text-[#183B2B] transition-colors cursor-pointer shadow-2xs"
                aria-label="Scroll right"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Product Cards Grid matching mockup */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 scroll-smooth"
        >
          {individualProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
