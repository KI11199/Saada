import React, { useState } from 'react';
import { X, MessageCircle, ShieldCheck, MapPin, User, Phone, FileText, Copy, Check, Truck } from 'lucide-react';
import { CartItem, Language, CustomerOrderInfo } from '../types';
import { TRANSLATIONS, BUSINESS_CONFIG, EGYPT_GOVERNORATES } from '../data/translations';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  language: Language;
  onOrderCompleted: () => void;
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  language,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const [formData, setFormData] = useState<CustomerOrderInfo>({
    fullName: '',
    phoneNumber: '',
    country: 'مصر',
    city: 'القاهرة',
    districtAddress: '',
    deliveryNotes: '',
    preferredContact: 'whatsapp',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateWhatsAppMessage = () => {
    const lines = [];

    lines.push('🌿 *طلب جديد من متجر سعادة - من الطبيعة ليكي* 🌿');
    lines.push('----------------------------------------');
    lines.push(`👤 *اسم العميل:* ${formData.fullName.trim() || 'عميل سعادة'}`);
    lines.push(`📱 *رقم الموبايل:* ${formData.phoneNumber.trim() || 'غير محدد'}`);
    lines.push(`📍 *المحافظة:* ${formData.city.trim() || 'القاهرة'}`);
    lines.push(`🏠 *العنوان بالتفصيل:* ${formData.districtAddress.trim() || 'للتأكيد عبر المحادثة'}`);
    lines.push('');
    lines.push('📦 *المنتجات المطلوبة:*');
    cartItems.forEach((item, index) => {
      lines.push(
        `${index + 1}. ${item.product.nameAr} (${item.selectedSize.labelAr}) - الكمية: ${item.quantity} = ${item.selectedSize.price * item.quantity} ج.م`
      );
    });
    lines.push('');
    lines.push(`💰 *المجموع الكلي:* ${totalPrice} ج.م`);
    lines.push('🚚 *الشحن:* لجميع محافظات مصر (الدفع عند الاستلام)');
    if (formData.deliveryNotes?.trim()) {
      lines.push(`📝 *ملاحظات العميل:* ${formData.deliveryNotes.trim()}`);
    }
    lines.push('');
    lines.push('✨ أرجو تأكيد الطلب وتحديد موعد الشحن. شكراً لكم!');

    return lines.join('\n');
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderCompleted();
      onClose();
    }, 1000);
  };

  const handleCopySummary = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="whatsapp-checkout-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="whatsapp-checkout-modal-content"
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#ECE4D8] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#ECE4D8] flex items-start justify-between bg-[#FAF6F0]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#183B2B] font-cairo leading-tight">
                {t.checkout.title}
              </h2>
              <p className="text-xs text-[#6B776E] mt-0.5 font-cairo">
                {t.checkout.subtitle}
              </p>
            </div>
          </div>

          <button
            id="close-whatsapp-checkout-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B776E] hover:bg-white hover:text-[#183B2B] border border-transparent hover:border-[#D5CBBF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Items Snapshot */}
        <div className="px-6 py-3.5 bg-[#FAF6F0] border-b border-[#ECE4D8] text-xs font-cairo">
          <div className="flex items-center justify-between font-bold text-[#183B2B]">
            <span>عدد الأصناف بالسلة ({cartItems.length})</span>
            <span className="text-base text-[#183B2B]">{totalPrice} ج.م</span>
          </div>
          <p className="text-[11px] text-[#6B776E] mt-1 line-clamp-1">
            {cartItems.map((i) => `${i.product.nameAr} (×${i.quantity})`).join(', ')}
          </p>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSendWhatsApp} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#183B2B] font-cairo mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#183B2B]" />
              <span>{t.checkout.fullName} *</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder={t.checkout.fullNamePlaceholder}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBBF] bg-[#FAF6F0] text-sm font-cairo text-[#183B2B] placeholder:text-[#8C9890] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
            />
          </div>

          {/* WhatsApp Phone Number */}
          <div>
            <label className="block text-xs font-bold text-[#183B2B] font-cairo mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#183B2B]" />
              <span>{t.checkout.phone} *</span>
            </label>
            <input
              type="tel"
              required
              dir="ltr"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="01155789196"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBBF] bg-[#FAF6F0] text-sm font-cairo text-[#183B2B] placeholder:text-[#8C9890] text-right focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
            />
          </div>

          {/* Governorate (Dropdown for Egypt) */}
          <div>
            <label className="block text-xs font-bold text-[#183B2B] font-cairo mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#183B2B]" />
              <span>{t.checkout.city} (المحافظة) *</span>
            </label>
            <select
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBBF] bg-[#FAF6F0] text-sm font-cairo text-[#183B2B] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B] cursor-pointer"
            >
              {EGYPT_GOVERNORATES.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
          </div>

          {/* Detailed District / Address */}
          <div>
            <label className="block text-xs font-bold text-[#183B2B] font-cairo mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#183B2B]" />
              <span>{t.checkout.address} *</span>
            </label>
            <input
              type="text"
              required
              value={formData.districtAddress}
              onChange={(e) => setFormData({ ...formData, districtAddress: e.target.value })}
              placeholder={t.checkout.addressPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl border border-[#D5CBBF] bg-[#FAF6F0] text-sm font-cairo text-[#183B2B] placeholder:text-[#8C9890] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
            />
          </div>

          {/* Special Notes / Delivery instructions */}
          <div>
            <label className="block text-xs font-bold text-[#183B2B] font-cairo mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#183B2B]" />
              <span>{t.checkout.notes}</span>
            </label>
            <textarea
              rows={2}
              value={formData.deliveryNotes}
              onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
              placeholder={t.checkout.notesPlaceholder}
              className="w-full px-4 py-2 rounded-xl border border-[#D5CBBF] bg-[#FAF6F0] text-xs font-cairo text-[#183B2B] placeholder:text-[#8C9890] focus:outline-none focus:border-[#183B2B] focus:ring-1 focus:ring-[#183B2B]"
            />
          </div>

          {/* Egypt Shipping Notice */}
          <div className="bg-[#FAF6F0] p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-cairo text-[#183B2B] border border-[#ECE4D8]">
            <Truck className="w-4 h-4 text-[#8D5B36] shrink-0" />
            <span>شحن سريع لجميع محافظات مصر • الدفع عند الاستلام عند معاينة الطلب</span>
          </div>

          {/* Security & Direct contact notice */}
          <div className="bg-white p-3 rounded-2xl flex items-center gap-2 text-xs font-cairo text-[#6B776E] border border-[#ECE4D8]">
            <ShieldCheck className="w-4 h-4 text-[#183B2B] shrink-0" />
            <span>يتم التواصل عبر واتساب برقم {BUSINESS_CONFIG.displayPhone} لتأكيد الشحن فوراً.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              id="submit-whatsapp-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full bg-[#183B2B] hover:bg-[#23533D] text-white font-cairo font-bold text-base shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>{t.checkout.sendWhatsappBtn}</span>
            </button>

            {/* Fallback Copy Text Button */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full py-2.5 px-4 rounded-full border border-[#D5CBBF] bg-white hover:bg-[#FAF6F0] text-[#183B2B] text-xs font-cairo font-bold flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#183B2B]" />
                  <span>تم نسخ نص الطلب بنجاح ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#183B2B]" />
                  <span>نسخ نص الطلب يدوياً</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
