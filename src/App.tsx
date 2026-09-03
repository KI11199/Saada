import React, { useState, useEffect } from 'react';
import { Language, Product, ProductOption, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { BUSINESS_CONFIG } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { WhySaadahSection } from './components/WhySaadahSection';
import { RoutineFinderSection } from './components/RoutineFinderSection';
import { CompleteBoxSection } from './components/CompleteBoxSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { AIConsultantSection } from './components/AIConsultantSection';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

export function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('saadah_cart_eg');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWhatsAppCheckoutOpen, setIsWhatsAppCheckoutOpen] = useState(false);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
  const [aiContextProduct, setAiContextProduct] = useState<Product | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('saadah_cart_eg', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sync document direction and language for Arabic (RTL) vs English (LTR)
  useEffect(() => {
    const isAr = language === 'ar';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size?: ProductOption, quantity = 1) => {
    const chosenSize = size || product.sizes[0];
    const itemId = `${product.id}-${chosenSize.weight}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: chosenSize,
          quantity,
        },
      ];
    });
    setIsCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const bundleProduct = PRODUCTS.find((p) => p.category === 'bundles') || PRODUCTS[PRODUCTS.length - 1];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#183B2B] font-cairo selection:bg-[#183B2B] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAI={() => handleNavigate('ai-advisor')}
      />

      {/* Main Content Sections in the exact sequence requested */}
      <main className="flex-1">
        {/* 1. Hero Section matching mockup */}
        <Hero
          language={language}
          onShopClick={() => handleNavigate('products')}
          onExploreSourcing={() => handleNavigate('why-saadah')}
          onConsultAI={() => handleNavigate('ai-advisor')}
        />

        {/* 2. Saadah Products (Circular cards with subtitles and prices) */}
        <ProductCatalog
          products={PRODUCTS}
          language={language}
          onAddToCart={(p) => handleAddToCart(p)}
          onSelectProduct={(p) => setSelectedProductForDetails(p)}
        />

        {/* 3. Why Saadah? (Dark emerald green container with 4 pillars) */}
        <WhySaadahSection language={language} />

        {/* 4. Hair Routines (4 Arched image cards with interactive recommendation) */}
        <RoutineFinderSection
          language={language}
          products={PRODUCTS}
          onAddToCart={(p) => handleAddToCart(p)}
          onSelectProduct={(p) => setSelectedProductForDetails(p)}
        />

        {/* 5. Complete Saadah Box (Best seller badge, tags, 590 EGP) */}
        <CompleteBoxSection
          language={language}
          bundleProduct={bundleProduct}
          onAddToCart={(p) => handleAddToCart(p)}
          onSelectProduct={(p) => setSelectedProductForDetails(p)}
        />

        {/* 6. Customer Reviews (5-Star testimonials) */}
        <CustomerReviewsSection language={language} />

        {/* 7. Instagram Section (6 Aesthetic photos + handle) */}
        <GallerySection language={language} />

        {/* 8. AI Hair Care Advisor */}
        <AIConsultantSection
          language={language}
          activeContextProduct={aiContextProduct}
          onClearContextProduct={() => setAiContextProduct(null)}
        />

        {/* 9. FAQ & Safety Section */}
        <FAQSection language={language} />
      </main>

      {/* 10. Footer with 01155789196, Instagram, and Customer Service */}
      <Footer language={language} onNavigate={handleNavigate} />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForDetails}
        language={language}
        onClose={() => setSelectedProductForDetails(null)}
        onAddToCart={handleAddToCart}
        onQuickWhatsAppOrder={(p, size) => {
          const text = encodeURIComponent(
            `🌿 *طلب سريع من متجر سعادة - من الطبيعة ليكي* 🌿\n\nأود طلب:\n- ${p.nameAr} (${size.labelAr}) - السعر: ${size.price} ج.م\n\nأرجو تزويدي بتفاصيل التوصيل لعنواني في مصر. شكراً!`
          );
          window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
        }}
        onAskAIAboutProduct={(p) => {
          setAiContextProduct(p);
          handleNavigate('ai-advisor');
        }}
      />

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          setIsWhatsAppCheckoutOpen(true);
        }}
        language={language}
      />

      <WhatsAppCheckoutModal
        isOpen={isWhatsAppCheckoutOpen}
        onClose={() => setIsWhatsAppCheckoutOpen(false)}
        cartItems={cartItems}
        totalPrice={totalCartPrice}
        language={language}
        onOrderCompleted={() => {
          handleClearCart();
        }}
      />

      {/* Floating WhatsApp Quick Contact Button (01155789196) */}
      <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-30">
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            'مرحباً متجر سعادة 🌿 (01155789196)، أود الاستفسار عن منتجات العناية بالشعر والتوصيل في مصر.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#183B2B] text-white shadow-xl hover:shadow-2xl border-2 border-white hover:scale-105 transition-all flex items-center justify-center cursor-pointer group active:scale-95"
          aria-label="Direct WhatsApp Contact"
          title="تواصلي معنا مباشرة عبر واتساب: 01155789196"
        >
          <MessageCircle className="w-7 h-7 text-[#25D366] group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default App;
