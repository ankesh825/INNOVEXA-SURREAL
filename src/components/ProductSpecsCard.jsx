import React, { useState } from 'react';
import { Package, ShieldCheck, Sparkles, ShoppingBag, MessageSquare, Play, ChevronDown, ChevronUp, Check, ExternalLink, Crown, Award, Truck, MapPin } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function ProductSpecsCard({ product, onOpenVideo, onOpenWaitlist, onOpenDetail, onAddToCart, onOpenCertificate }) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

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
        desc: 'Dispatched directly from Indore botanical garden. Free shipping + Cash on delivery supported.',
      });
    } else {
      setDeliveryResult({
        type: 'express',
        badge: '✈️ Royal Express Air Dispatch',
        time: 'Delivered in 2–3 Days',
        desc: 'Inspected & packaged in insulated carton. Dispatched via Bluedart / Delhivery Express.',
      });
    }
  };

  // WhatsApp order URL with pre-filled message
  const whatsappUrl = `https://wa.me/919109119646?text=${encodeURIComponent(
    `Hello Surreal Treasures & INNOVEXA Team! I would like to order the Sureal Aloe Vera Gel (100g, ₹280) showcased on the 3D marketing dashboard.`
  )}`;

  const handleAdd = () => {
    soundEffects.playGoldChime();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white/95 backdrop-blur-md rounded-3xl p-7 md:p-9 border border-[#dce8e0] shadow-xl relative overflow-hidden">
      {/* Top subtle gold corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/15 to-transparent pointer-events-none rounded-tr-3xl" />

      {/* Kicker & Title matching user dashboard */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#398260] bg-[#eef7f2] px-3.5 py-1 rounded-full border border-[#c1decb] inline-flex items-center gap-1.5">
            <Crown className="w-3 h-3 text-[#D4AF37]" />
            <span>Our Flagship Product</span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>सुरेल · Sureal Treasures</span>
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl font-light text-[#122b20] tracking-tight leading-none mb-2">
          Aloe Vera Gel
        </h2>
        <p className="font-serif italic text-lg text-[#5d7a68] mb-4">
          Fresh care. Naturally inspired.
        </p>

        <p className="text-sm text-[#4a5851] leading-relaxed mb-6 font-light">
          A modern skincare essential, Sureal Aloe Vera Gel is handcrafted with freshly filleted, homegrown aloe vera in Indore. Ultra-hydrating, non-greasy, and housed in our signature apothecary glass jar with metallic gold screw cap.
        </p>

        {/* Spec Grid Table matching dashboard */}
        <div className="grid grid-cols-2 gap-3.5 py-4 border-y border-[#e6efe9] text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f2f7f4] flex items-center justify-center text-[#173829] shrink-0 border border-[#D5E6DC]">
              <Package className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="block text-[#7a8d83] uppercase tracking-wider text-[10px]">Container</span>
              <span className="font-medium text-[#122b20]">Frosted Jar (Gold Cap)</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f2f7f4] flex items-center justify-center text-[#173829] shrink-0 border border-[#D5E6DC]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <span className="block text-[#7a8d83] uppercase tracking-wider text-[10px]">Net Quantity</span>
              <span className="font-medium text-[#122b20]">100 g</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f2f7f4] flex items-center justify-center text-[#173829] shrink-0 border border-[#D5E6DC]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <span className="block text-[#7a8d83] uppercase tracking-wider text-[10px]">Purity Standard</span>
              <span className="font-medium text-[#122b20]">Zero Added Water</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#f2f7f4] flex items-center justify-center text-[#173829] shrink-0 border border-[#D5E6DC]">
              <span className="font-serif font-bold text-sm text-[#173829]">₹</span>
            </div>
            <div>
              <span className="block text-[#7a8d83] uppercase tracking-wider text-[10px]">Price</span>
              <span className="font-bold text-sm text-[#173829]">₹280 (Direct Farm Price)</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 col-span-2 pt-1">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="block text-[#7a8d83] uppercase tracking-wider text-[10px]">Status</span>
                <span className="font-semibold text-emerald-800">● In Stock · Handcrafted Batch #04 Ready</span>
              </div>
              {onOpenCertificate ? (
                <button
                  onClick={onOpenCertificate}
                  className="text-[11px] text-[#2F6F4E] bg-[#EEF7F2] hover:bg-[#D7EFE0] px-2.5 py-1 rounded-full font-bold border border-[#BFDFCB] flex items-center gap-1 cursor-pointer transition-colors"
                  title="Inspect Batch #04 Certificate of Analysis"
                >
                  <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Verify Batch #04</span>
                </button>
              ) : (
                <span className="text-[11px] text-[#398260] bg-[#eef7f2] px-2.5 py-0.5 rounded-full font-medium border border-[#c1decb]">
                  Indore Farm Harvest
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Collapsible Key Ingredients */}
        <div className="mt-4">
          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className="w-full flex items-center justify-between text-xs text-[#2a543d] font-semibold hover:text-[#173829] py-1 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bioactive Actives (Homegrown Aloe, Vitamin E, Tea Tree)</span>
            </span>
            {showIngredients ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showIngredients && (
            <div className="mt-2 p-3.5 bg-[#f4f8f5] rounded-xl text-xs text-[#445b4c] space-y-1.5 animate-fadeIn border border-[#D4E8DC]">
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Pure Homegrown Aloe Juice',
                  'Zero Added Water Base',
                  'Vegetable Glycerin',
                  'Pure Carbopol Gel Matrix',
                  'Vitamin E (Tocopherol)',
                  'Organic Tea Tree Leaf Oil',
                  'Natural Botanical Aroma',
                  'Gentle Preservative (Iscaguard)',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#698877] pt-2 border-t border-[#d8e8dc]">
                100% cruelty-free & parabens-free · Indore Botanical Farm formulation.
              </p>
            </div>
          )}
        </div>

        {/* Royal Express Delivery Pincode Checker */}
        <div className="mt-4 p-3 bg-[#FAF7F2] rounded-2xl border border-[#DCEBE0]">
          <form onSubmit={checkPincode} className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#2D694A] shrink-0" />
            <input
              type="text"
              maxLength={6}
              placeholder="Enter Pincode for express dispatch"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              className="flex-1 bg-transparent text-xs text-[#122B20] placeholder-[#8CA395] focus:outline-hidden"
            />
            <button
              type="submit"
              className="text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-lg bg-[#173829] text-white hover:bg-[#23583E] transition-all cursor-pointer"
            >
              Check
            </button>
          </form>

          {deliveryResult && (
            <div className="mt-2 pt-2 border-t border-[#E5EFE8] text-[11px] animate-fadeIn">
              {deliveryResult.type === 'error' ? (
                <span className="text-red-700 font-medium">{deliveryResult.text}</span>
              ) : (
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[#173829] font-bold">
                    <span>{deliveryResult.badge}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">{deliveryResult.time}</span>
                  </div>
                  <p className="text-[#647C6F] text-[10px]">{deliveryResult.desc}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons matching royal theme */}
      <div className="mt-7 space-y-3">
        {/* Row 1: Add to Royal Bag & 1-Click WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleAdd}
            className="group w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#173829] via-[#215038] to-[#122e20] hover:from-[#1E4833] hover:to-[#2A6548] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:scale-102 border border-[#D4AF37]/50 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>Add to Bag (₹280)</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-102"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Order</span>
          </a>
        </div>

        {/* Secondary Row: 3D Video & Store link */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={onOpenVideo}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#173829] hover:text-[#2E6F4E] transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
            <span>Watch 3D Video</span>
          </button>

          {/* Official Store Link */}
          <a
            href="https://surrealtreasures.in/#shop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#52705e] hover:text-[#173829] font-medium transition-colors underline underline-offset-4 decoration-[#c1d9cb]"
          >
            <span>surrealtreasures.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
