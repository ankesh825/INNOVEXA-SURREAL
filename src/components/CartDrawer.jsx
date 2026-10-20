import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Crown,
  Sparkles,
  Gift,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreProducts,
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent
  const [promoError, setPromoError] = useState('');
  const [includeGiftBox, setIncludeGiftBox] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Computations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const giftBoxFee = includeGiftBox ? 150 : 0;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const discountedSubtotal = subtotal - discountAmount;

  // Free shipping threshold: ₹1,500
  const freeShippingThreshold = 1500;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : subtotal >= 1000 ? 60 : 100;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const finalTotal = discountedSubtotal + giftBoxFee + shippingFee;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'INNOVEXA10' || clean === 'ROYAL10') {
      setAppliedDiscount(10);
      soundEffects.playGoldChime();
    } else if (clean === 'SUREAL15') {
      setAppliedDiscount(15);
      soundEffects.playGoldChime();
    } else {
      setPromoError('Invalid code. Try INNOVEXA10 for 10% off.');
    }
  };

  const handleCheckoutWhatsApp = () => {
    soundEffects.playGoldChime();
    const itemsList = cartItems
      .map(
        (item) =>
          `• ${item.product.name} (x${item.quantity}) - ₹${item.product.price * item.quantity}`
      )
      .join('\n');

    let msg = `👑 *NEW ROYAL ORDER — INNOVEXA × SURREAL TREASURES*\n\n`;
    msg += `*Order Items (${cartItems.reduce((a, b) => a + b.quantity, 0)} items):*\n${itemsList}\n\n`;
    msg += `*Subtotal:* ₹${subtotal}\n`;
    if (appliedDiscount > 0) {
      msg += `*VIP Discount (${appliedDiscount}%):* -₹${discountAmount}\n`;
    }
    if (includeGiftBox) {
      msg += `*Luxury Wooden Gift Box & Satin Ribbon:* +₹150\n`;
      if (giftNote.trim()) {
        msg += `*Gift Note:* "${giftNote.trim()}"\n`;
      }
    }
    msg += `*Shipping from Indore:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}\n`;
    msg += `*Estimated Grand Total:* ₹${finalTotal}\n\n`;
    msg += `Please send me the instant UPI QR code and dispatch confirmation from Indore!`;

    const url = `https://wa.me/919109119646?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#D5E6DC] z-10 animate-slideInRight">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#173829] via-[#1E4D37] to-[#122B20] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-normal tracking-wide">
                  Your Royal Bag
                </span>
                <span className="text-[10px] bg-[#D4AF37] text-[#122B20] px-2 py-0.5 rounded-full font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <span className="text-[10px] text-[#BED2C5] tracking-wider uppercase block">
                Handcrafted Batch #04 · Indore, MP
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3.5 bg-[#EEF7F2] border-b border-[#D5EADB] text-xs">
          <div className="flex items-center justify-between text-[#173829] font-medium mb-1.5">
            <span className="flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {amountNeededForFreeShipping === 0 ? (
                <strong className="text-emerald-800">🎉 Free Nationwide Express Shipping Unlocked!</strong>
              ) : (
                <span>
                  Add <strong className="text-emerald-800">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                </span>
              )}
            </span>
            <span className="text-[10px] text-[#4A6B56] font-bold">{freeShippingProgress}%</span>
          </div>

          <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-[#173829] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#5A7062] space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EBF3ED] flex items-center justify-center text-[#173829] mb-1">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-serif text-xl text-[#122B20]">Your Bag is Empty</h4>
              <p className="text-xs max-w-xs font-light text-[#637C6D]">
                Explore our 100% homegrown Indore Aloe Vera Gel, handcrafted scrubs, and bespoke gift hampers.
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onExploreProducts) onExploreProducts();
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#173829] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#23543D] transition-all shadow-xs cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl bg-white border border-[#DFECE2] shadow-xs flex items-center justify-between gap-3 group"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-[#F6FAF7] border border-[#E0EBE3] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={item.product.image || '/images/real_sureal_jar_only.png'}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#698877] font-bold block">
                    {item.product.type}
                  </span>
                  <h5 className="font-serif text-sm text-[#122B20] font-normal truncate">
                    {item.product.name}
                  </h5>
                  <span className="font-serif text-sm font-semibold text-[#173829]">
                    ₹{item.product.price}
                  </span>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center border border-[#CCDED3] rounded-lg overflow-hidden bg-[#FAFDFB]">
                      <button
                        onClick={() => {
                          soundEffects.playSoftClick();
                          onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1));
                        }}
                        className="p-1 hover:bg-[#EBF5EE] text-[#173829] transition-colors cursor-pointer"
                        title="Decrease Quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#122B20]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          soundEffects.playSoftClick();
                          onUpdateQuantity(item.product.id, item.quantity + 1);
                        }}
                        className="p-1 hover:bg-[#EBF5EE] text-[#173829] transition-colors cursor-pointer"
                        title="Increase Quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        soundEffects.playSoftClick();
                        onRemoveItem(item.product.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove from Bag"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right shrink-0">
                  <span className="font-serif text-base font-semibold text-[#122B20]">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* Gifting Box Option */}
          {cartItems.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-white border border-[#DFECE2] space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="text-xs font-bold text-[#122B20] block">
                      Handcrafted Royal Gift Box
                    </span>
                    <span className="text-[10px] text-[#698877]">
                      Pine wood chest, satin ribbon & botanical decor
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#173829]">+₹150</span>
                  <input
                    type="checkbox"
                    checked={includeGiftBox}
                    onChange={(e) => {
                      soundEffects.playSoftClick();
                      setIncludeGiftBox(e.target.checked);
                    }}
                    className="rounded text-[#173829] focus:ring-[#173829] w-4 h-4 cursor-pointer"
                  />
                </div>
              </label>

              {includeGiftBox && (
                <input
                  type="text"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Enter handwritten gift note message..."
                  className="w-full text-xs p-2 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-[#122B20] focus:outline-none focus:border-[#173829] animate-fadeIn"
                />
              )}
            </div>
          )}

          {/* Promo Code Box */}
          {cartItems.length > 0 && (
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. INNOVEXA10)"
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#D5E6DC] text-xs text-[#122B20] uppercase font-semibold placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-[#173829]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#173829] hover:bg-[#23543D] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount > 0 && (
                <span className="text-[10px] text-emerald-700 font-semibold block px-1">
                  ✓ {appliedDiscount}% Royal VIP Discount applied!
                </span>
              )}
              {promoError && (
                <span className="text-[10px] text-red-600 font-medium block px-1">
                  {promoError}
                </span>
              )}
            </form>
          )}
        </div>

        {/* Drawer Footer with Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#DFECE2] space-y-3">
            {/* Calculation rows */}
            <div className="space-y-1.5 text-xs text-[#526659]">
              <div className="flex items-center justify-between">
                <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="font-serif font-semibold text-[#122B20]">₹{subtotal}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span>VIP Discount ({appliedDiscount}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              {includeGiftBox && (
                <div className="flex items-center justify-between text-[#B3853B]">
                  <span>Royal Gifting Box</span>
                  <span>+₹150</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery from Indore</span>
                <span className="font-medium text-[#122B20]">
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700 font-bold">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-[#EAEFEA] flex items-baseline justify-between text-sm text-[#122B20] font-bold">
                <span>Total Estimated</span>
                <span className="font-serif text-2xl font-light text-[#173829]">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            {/* Direct 1-Click WhatsApp Checkout */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#25D366] via-[#1EAA52] to-[#128C43] hover:from-[#20ba5a] hover:to-[#177839] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Crown className="w-4 h-4 text-[#F5DEAA]" />
              <span>Checkout via WhatsApp (₹{finalTotal})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between pt-1 text-[10px] text-[#71897B]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>UPI QR / COD Support</span>
              </span>
              <button
                onClick={() => {
                  soundEffects.playSoftClick();
                  onClearCart();
                }}
                className="hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
