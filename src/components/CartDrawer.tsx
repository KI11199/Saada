import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Gift } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  language: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  language,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );

  const freeGiftThreshold = 500;
  const remainingForGift = Math.max(0, freeGiftThreshold - subtotal);
  const giftProgressPercent = Math.min(100, (subtotal / freeGiftThreshold) * 100);

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-white border-l rtl:border-l-0 rtl:border-r border-[#ECE4D8] shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#ECE4D8] bg-[#FAF6F0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#183B2B]" />
              <h2 className="text-xl font-bold text-[#183B2B] font-cairo">
                {t.cart.title}
              </h2>
              <span className="text-xs bg-[#183B2B] text-white font-bold px-2.5 py-0.5 rounded-full">
                {cartItems.reduce((total, i) => total + i.quantity, 0)}
              </span>
            </div>

            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-[#6B776E] hover:bg-white hover:text-[#183B2B] border border-transparent hover:border-[#D5CBBF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Gift Bar */}
          <div className="bg-[#FAF6F0] px-6 py-3 border-b border-[#ECE4D8]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8D5B36] mb-1.5 font-cairo">
              <Gift className="w-4 h-4 text-[#8D5B36] shrink-0" />
              <span>
                {remainingForGift === 0
                  ? '🎉 مبروك! طلبكِ يشمل ملعقة خشبية يدوية وعينة مشاط أحمر هدية'
                  : `أضيفي ${remainingForGift} ج.م إضافية للحصول على هدية سعادة المجانية 🎁`}
              </span>
            </div>
            <div className="w-full bg-[#E5DCD0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#183B2B] h-full rounded-full transition-all duration-500"
                style={{ width: `${giftProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#EBE3D7]">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4 font-cairo">
                <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#ECE4D8] text-[#8C9890] flex items-center justify-center mx-auto shadow-2xs">
                  <ShoppingBag className="w-8 h-8 text-[#A8B2AA]" />
                </div>
                <h3 className="text-lg font-bold text-[#183B2B]">
                  {t.cart.emptyTitle}
                </h3>
                <p className="text-xs text-[#6B776E] max-w-xs mx-auto">
                  {t.cart.emptySubtitle}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#183B2B] text-white text-xs font-bold font-cairo hover:bg-[#23533D] transition-colors cursor-pointer shadow-xs"
                >
                  {t.cart.startShopping}
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs bg-[#FAF6F0]">
                    <img
                      src={item.product.imageUrl}
                      alt={language === 'ar' ? item.product.nameAr : item.product.nameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0 font-cairo">
                    <h4 className="text-sm font-bold text-[#183B2B] truncate">
                      {language === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </h4>
                    <p className="text-xs text-[#6B776E]">
                      {language === 'ar' ? item.selectedSize.labelAr : item.selectedSize.labelEn}
                    </p>
                    <span className="text-xs font-bold text-[#183B2B] block mt-1">
                      {item.selectedSize.price * item.quantity} {t.productCard.currency}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-[#FAF6F0] rounded-full p-1 border border-[#D5CBBF]">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#183B2B] hover:bg-[#FAF6F0] cursor-pointer shadow-2xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#183B2B]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#183B2B] hover:bg-[#FAF6F0] cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-[#8C9890] hover:text-[#A84A29] transition-colors cursor-pointer"
                    title="حذف المنتج"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#ECE4D8] bg-[#FAF6F0] space-y-4 font-cairo">
              <div className="space-y-1.5 text-xs text-[#5B6B60]">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-bold text-[#183B2B] text-sm">
                    {subtotal} {t.productCard.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.cart.deliveryEstimate}</span>
                  <span className="font-medium text-[#183B2B]">
                    شحن لجميع المحافظات (الدفع عند الاستلام)
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#ECE4D8] text-base font-bold text-[#183B2B]">
                  <span>{t.cart.total}</span>
                  <span className="text-lg">
                    {subtotal} {t.productCard.currency}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  id="cart-proceed-checkout-btn"
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-6 rounded-full bg-[#183B2B] hover:bg-[#23533D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>{t.cart.proceedToWhatsapp}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full py-2 text-xs text-[#8C9890] hover:text-[#A84A29] font-medium transition-colors cursor-pointer"
                >
                  {t.cart.clearCart}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
