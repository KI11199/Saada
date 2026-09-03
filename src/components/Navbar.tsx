import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, Truck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, BUSINESS_CONFIG } from '../data/translations';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'products', label: t.nav.products },
    { id: 'why-saadah', label: t.nav.whySaadah },
    { id: 'routines', label: t.nav.routines },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8E1D5]'
            : 'bg-[#FAF7F2] border-b border-[#ECE5DA]'
        }`}
      >
        {/* Top Announcement Bar matching mockup: 🚚 شحن سريع لجميع المحافظات */}
        <div
          id="top-announcement-bar"
          className="bg-[#183B2B] text-[#FFFFFF] text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4 text-[#D8B170] shrink-0" />
          <span className="font-cairo text-xs sm:text-sm font-semibold">
            {t.hero.freeShippingNote}
          </span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Action Icons (Cart, Account, Search) as shown in mockup */}
            <div className="flex items-center gap-2 sm:gap-4 order-3 rtl:order-1">
              {/* Cart Button */}
              <button
                id="navbar-cart-btn"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full hover:bg-[#EFE9DF] text-[#183B2B] transition-colors cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6 stroke-[1.75]" />
                {cartCount > 0 && (
                  <span
                    id="navbar-cart-badge"
                    className="absolute top-1 right-1 rtl:right-auto rtl:left-1 w-5 h-5 rounded-full bg-[#183B2B] text-[#FFFFFF] text-[11px] font-bold flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User / Account Button */}
              <button
                id="navbar-account-btn"
                onClick={() => onNavigate('reviews')}
                className="p-2.5 rounded-full hover:bg-[#EFE9DF] text-[#183B2B] transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                aria-label="Customer Account"
                title="آراء وتجارب العملاء"
              >
                <User className="w-6 h-6 stroke-[1.75]" />
              </button>

              {/* Search Button */}
              <button
                id="navbar-search-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full hover:bg-[#EFE9DF] text-[#183B2B] transition-colors cursor-pointer"
                aria-label="Search Products"
              >
                <Search className="w-6 h-6 stroke-[1.75]" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                id="navbar-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full hover:bg-[#EFE9DF] text-[#183B2B] md:hidden cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center Desktop Navigation Links */}
            <nav
              id="desktop-nav-links"
              className="hidden md:flex items-center gap-7 lg:gap-9 order-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm lg:text-[15px] font-semibold font-cairo transition-all cursor-pointer py-1 relative ${
                    activeSection === item.id
                      ? 'text-[#183B2B] font-bold'
                      : 'text-[#4A574E] hover:text-[#183B2B]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#183B2B] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right: Saadah Brand Logo & Subtitle matching the mockup */}
            <div className="order-1 rtl:order-3">
              <button
                id="brand-logo-btn"
                onClick={() => onNavigate('hero')}
                className="flex flex-col items-center rtl:items-end ltr:items-start text-right group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-amiri text-3xl sm:text-4xl font-bold tracking-tight text-[#183B2B] leading-none group-hover:opacity-90 transition-opacity">
                    {BUSINESS_CONFIG.brandArabic}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#183B2B] mt-2 inline-block"></span>
                </div>
                <span className="font-cairo text-[11px] sm:text-xs text-[#6B776E] font-medium tracking-wide -mt-0.5">
                  {BUSINESS_CONFIG.brandSubtitle}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Search Drawer */}
          {isSearchOpen && (
            <div className="py-3 px-2 border-t border-[#E8E1D5] flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <Search className="w-5 h-5 text-[#6B776E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigate('products');
                    setIsSearchOpen(false);
                  }
                }}
                placeholder="ابحثي عن منتج (حناء، سدر، مشاط، نواة تمر)..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-cairo text-[#183B2B] placeholder:text-[#8C9890]"
                autoFocus
              />
              <button
                onClick={() => {
                  onNavigate('products');
                  setIsSearchOpen(false);
                }}
                className="text-xs font-bold font-cairo bg-[#183B2B] text-white px-3.5 py-1.5 rounded-lg cursor-pointer hover:bg-[#23533D]"
              >
                بحث
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="md:hidden bg-[#FAF7F2] border-b border-[#E8E1D5] px-6 py-5 shadow-lg animate-in slide-in-from-top duration-300"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-right py-2 text-base font-bold font-cairo text-[#183B2B] hover:text-[#9B5D34] transition-colors border-b border-[#EBE3D7]/60"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 flex items-center justify-between text-xs text-[#6B776E] font-cairo">
                <span>تواصل معنا: 01155789196</span>
                <span className="font-bold text-[#183B2B]">شحن لجميع المحافظات</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to avoid content jumping under fixed header */}
      <div className="h-28 sm:h-29" />
    </>
  );
};
