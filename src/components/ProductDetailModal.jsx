import React, { useState } from 'react';
import { X, Check, MessageSquare, ExternalLink, Sparkles, ShieldCheck, Heart, ShoppingBag, Crown, Truck } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function ProductDetailModal({ product, onClose, onExplore3D, onAddToCart }) {
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  if (!product) return null;

  const checkPincode = (e) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (clean.length !== 6 || !/^\d+$/.test(clean)) {
      setDeliveryResult({
        type: 'error',
        text: 'Please enter a valid 6-digit Indian PIN code',
      });
      return;
    }
    soundEffects.playWaterDrop();
    if (clean.startsWith('452')) {
      setDeliveryResult({
        type: 'local',
        badge: '⚡ Same-Day Indore Farm Dispatch',
        time: 'Delivered in 12–24 Hours',
        desc: 'Direct hand dispatch from Indore nursery. Cash on delivery available.',
      });
    } else {
      setDeliveryResult({
        type: 'express',
        badge: '✈️ Royal Express Air Dispatch',
        time: 'Delivered in 2–3 Days',
        desc: 'Packed in thermal protected casing. Dispatched via Bluedart / Delhivery.',
      });
    }
  };

  const whatsappUrl = `https://wa.me/919109119646?text=${encodeURIComponent(
    `Hello Surreal Treasures & INNOVEXA! I would like to order "${product.name}" (₹${product.price}) showcased on the INNOVEXA website. Please assist me with delivery.`
  )}`;

  const handleAdd = () => {
    soundEffects.playGoldChime();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#DCE5DF] z-10 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 md:px-8 border-b border-[#EAEFEA] flex items-center justify-between bg-[#F8FAF8]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#398260] bg-[#EEF7F2] px-2.5 py-1 rounded-full border border-[#C1DECB]">
              {product.type}
            </span>
            {product.tag && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {product.tag}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#D5DDD7] flex items-center justify-center text-[#4A5E52] hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Image Preview */}
            <div className="sm:col-span-5 aspect-square rounded-2xl bg-[#F6FAF7] border border-[#E3EDE6] overflow-hidden flex items-center justify-center p-4">
              <img
                src={product.image || '/images/real_sureal_jar_only.png'}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title & Price */}
            <div className="sm:col-span-7 space-y-2">
              <h3 className="font-serif text-3xl font-light text-[#122B20] leading-tight">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-[#173829]">
                  ₹{product.price}
                </span>
                {product.netWeight && (
                  <span className="text-xs text-[#6A8777] font-medium">
                    · {product.netWeight}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#526359] leading-relaxed pt-1">
                {product.desc || product.overview}
              </p>
            </div>
          </div>

          {/* Overview Section */}
          {product.overview && (
            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3EDE6] text-xs text-[#445B4C] leading-relaxed">
              <span className="font-semibold text-[#122B20] block mb-1">Product Overview:</span>
              {product.overview}
            </div>
          )}

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs border-y border-[#EAEFEA] py-3.5">
            <div>
              <span className="text-[10px] uppercase text-[#7A8E82] block">Shelf Life</span>
              <span className="font-medium text-[#122B20]">{product.shelfLife || '12 Months'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7A8E82] block">Suitable For</span>
              <span className="font-medium text-[#122B20]">{product.suitableFor || 'All Skin Types'}</span>
            </div>
          </div>

          {/* How to Use */}
          {product.howToUse && (
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173829]">How to Use:</h4>
              <p className="text-xs text-[#526359] leading-relaxed font-light">{product.howToUse}</p>
            </div>
          )}

          {/* Ingredients list */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#173829]">
                Handcrafted Ingredients:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#4A5E52]">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Royal Express Delivery Pincode Checker */}
          <div className="p-3.5 bg-[#F6FAF7] rounded-2xl border border-[#D5E6DC]">
            <form onSubmit={checkPincode} className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#2D694A] shrink-0" />
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit Pincode to check delivery speed"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-transparent text-xs text-[#122B20] placeholder-[#8CA395] focus:outline-hidden"
              />
              <button
                type="submit"
                className="text-[11px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-lg bg-[#173829] text-white hover:bg-[#23583E] transition-all cursor-pointer"
              >
                Check
              </button>
            </form>

            {deliveryResult && (
              <div className="mt-2.5 pt-2 border-t border-[#DDECE1] text-[11px] animate-fadeIn">
                {deliveryResult.type === 'error' ? (
                  <span className="text-red-700 font-medium">{deliveryResult.text}</span>
                ) : (
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between text-[#173829] font-bold">
                      <span>{deliveryResult.badge}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                        {deliveryResult.time}
                      </span>
                    </div>
                    <p className="text-[#647C6F] text-[10px]">{deliveryResult.desc}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 md:px-8 border-t border-[#EAEFEA] bg-[#F8FAF8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {product.id === 1 && (
              <button
                onClick={() => {
                  onClose();
                  onExplore3D();
                }}
                className="px-4 py-2.5 rounded-full bg-[#EEF7F2] hover:bg-[#D6EBD9] text-[#173829] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#C1DECB] flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>3D Studio</span>
              </button>
            )}

            <button
              onClick={handleAdd}
              className="px-5 py-2.5 rounded-full bg-[#173829] hover:bg-[#205138] text-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:scale-102 flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-102"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Order on WhatsApp (₹{product.price})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
