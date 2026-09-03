import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CustomerReviewsProps {
  language: Language;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsProps> = ({ language }) => {
  const t = TRANSLATIONS[language].reviewsSection;
  const [currentPage, setCurrentPage] = useState(0);

  const reviews = t.reviews;
  const cardsPerPage = 3;
  const maxPage = Math.ceil(reviews.length / cardsPerPage) - 1;

  return (
    <section id="reviews" className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-block relative">
              <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-[#183B2B] pb-2">
                {t.title}
              </h2>
              <div className="h-1 bg-[#183B2B] w-full rounded-full" />
            </div>
            <p className="font-cairo text-sm text-[#6B776E] mt-2">
              تجارب حقيقية لعميلاتنا في مصر بعد استخدام منتجات سعادة الطبيعية
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#183B2B] transition-colors cursor-pointer shadow-2xs"
              aria-label="Previous reviews"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPage))}
              disabled={currentPage === maxPage}
              className="w-10 h-10 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#F3ECE2] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-[#183B2B] transition-colors cursor-pointer shadow-2xs"
              aria-label="Next reviews"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage || reviews.length).map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE4D8] shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#D8B170]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-cairo text-sm sm:text-base text-[#38463D] leading-relaxed mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F2ECE0]">
                <div>
                  <h4 className="font-cairo font-bold text-base text-[#183B2B]">
                    {review.name}
                  </h4>
                  <span className="font-cairo text-xs text-[#7A887E]">
                    {review.city} • مشتري مؤكد
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8D5B36]">
                  <Quote className="w-4 h-4 opacity-50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
