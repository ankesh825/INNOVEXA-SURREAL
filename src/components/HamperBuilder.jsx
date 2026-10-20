import React, { useState, useRef } from 'react';
import { Gift, Check, MessageSquare, Sparkles, HeartHandshake, PackageCheck, Crown, Plus, RotateCw, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { soundEffects } from '../utils/soundEffects';

const HAMPER_TIERS = [
  { id: 'classic', name: 'Classic Gift Box', maxItems: 3, basePrice: 200, desc: 'Ideal for thoughtful personal tokens and birthdays.' },
  { id: 'luxury', name: 'Luxury Keepsake Hamper', maxItems: 5, basePrice: 350, desc: 'Our most popular tier with satin ribbon & botanical decor.' },
  { id: 'grand', name: 'Royal Botanical Crate', maxItems: 8, basePrice: 500, desc: 'Grand wooden crate for weddings & VIP corporate events.' },
];

const OCCASIONS = [
  'Wedding & Trousseau',
  'Festive Celebration (Diwali / Rakhi)',
  'Birthday & Milestone',
  'Corporate Gifting',
  'Self-Care Pampering',
];

// Interactive 3D Virtual Gift Box Stage
function Hamper3DBoxVisualizer({ selectedProducts, selectedTier, selectedOccasion }) {
  const boxRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hovered: false });

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -12;
    const ry = ((x - rect.width / 2) / rect.width) * 12;
    setTilt({ rx, ry, hovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, hovered: false });
  };

  const slots = Array.from({ length: selectedTier.maxItems });

  return (
    <div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl bg-gradient-to-br from-[#0c1e16] via-[#142e22] to-[#0a1811] p-4 border border-[#D4AF37]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300"
      style={{
        transform: tilt.hovered
          ? `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gold Corner Filigree Ornaments */}
      <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/70 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/70 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/70 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/70 rounded-br-sm pointer-events-none" />

      {/* Gold Ribbon Overlay Band */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent pointer-events-none" />

      {/* Top Header of the 3D Box */}
      <div className="flex items-center justify-between mb-3 text-[10px] tracking-wider uppercase text-[#E6C98F] border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <Crown className="w-3 h-3 text-[#D4AF37]" />
          <span className="font-bold">Virtual 3D Hamper Box</span>
        </div>
        <span className="text-white/60">{selectedProducts.length}/{selectedTier.maxItems} Items</span>
      </div>

      {/* Virtual Box Grid Slots */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 mb-2">
        {slots.map((_, idx) => {
          const item = selectedProducts[idx];
          return (
            <div
              key={idx}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1 relative transition-all duration-300 ${
                item
                  ? 'bg-white/10 border border-[#D4AF37]/70 shadow-xs'
                  : 'bg-black/25 border border-dashed border-white/20'
              }`}
              style={{
                transform: tilt.hovered && item ? 'translateZ(20px)' : 'translateZ(0px)',
              }}
            >
              {item ? (
                <>
                  <img
                    src={item.image || '/images/real_sureal_jar_only.png'}
                    alt={item.name}
                    className="w-full h-full object-contain p-0.5 filter drop-shadow-md"
                  />
                  <div className="absolute bottom-0.5 right-0.5 bg-[#173829] text-[#D4AF37] text-[8px] font-bold px-1 rounded-sm border border-[#D4AF37]/50">
                    ₹{item.price}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-white/30 text-[9px]">
                  <Plus className="w-3.5 h-3.5 mb-0.5 opacity-60" />
                  <span className="text-[8px]">Slot {idx + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center text-[9px] text-[#A3B8AD] italic">
        Hover to tilt box · Products packed with natural wood shavings & satin ribbon
      </div>
    </div>
  );
}

export default function HamperBuilder({ onAddToCart }) {
  const [selectedTier, setSelectedTier] = useState(HAMPER_TIERS[1]); // Luxury
  const [selectedOccasion, setSelectedOccasion] = useState(OCCASIONS[0]);
  const [selectedProductIds, setSelectedProductIds] = useState([1, 6, 12]); // Default: Aloe Gel, Almond Soap, Sandal Perfume
  const [justAddedToBag, setJustAddedToBag] = useState(false);

  // Available individual products for hamper
  const availableProducts = products.filter((p) => p.type !== 'hamper');

  const toggleProduct = (productId) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
    } else {
      if (selectedProductIds.length >= selectedTier.maxItems) {
        alert(`You can select up to ${selectedTier.maxItems} items for the ${selectedTier.name}. Please remove an item first or upgrade your hamper tier.`);
        return;
      }
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  // Calculate total price
  const selectedProducts = availableProducts.filter((p) => selectedProductIds.includes(p.id));
  const productsTotal = selectedProducts.reduce((sum, item) => sum + item.price, 0);
  const totalHamperPrice = productsTotal + selectedTier.basePrice;

  // Add custom hamper to royal cart
  const handleAddHamperToBag = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product for your hamper before adding to bag.');
      return;
    }
    soundEffects.playGoldChime();
    const hamperItem = {
      id: `custom-hamper-${Date.now()}`,
      name: `${selectedTier.name} (${selectedOccasion})`,
      category: 'hamper',
      price: totalHamperPrice,
      image: selectedProducts[0]?.image || '/images/real_sureal_jar_only.png',
      desc: `${selectedProducts.length} items: ${selectedProducts.map((p) => p.name).join(', ')}`,
      volume: `${selectedProducts.length} Handcrafted Items`,
      isCustomHamper: true,
    };
    if (onAddToCart) {
      onAddToCart(hamperItem);
    }
    setJustAddedToBag(true);
    setTimeout(() => setJustAddedToBag(false), 2500);
  };

  // Format WhatsApp Message
  const getWhatsAppHamperUrl = () => {
    const itemsList = selectedProducts.map((p) => `- ${p.name} (₹${p.price})`).join('\n');
    const msg = `Hello Surreal Treasures & INNOVEXA Team!\n\nI want to order a Custom Personalized Gift Hamper:\n\n*Hamper Tier:* ${selectedTier.name}\n*Occasion:* ${selectedOccasion}\n*Selected Items (${selectedProducts.length}/${selectedTier.maxItems}):*\n${itemsList}\n\n*Packaging Fee:* ₹${selectedTier.basePrice}\n*Estimated Total:* ₹${totalHamperPrice}\n\nPlease let me know custom packaging details and shipping from Indore!`;
    return `https://wa.me/919109119646?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="custom-hampers" className="py-24 bg-[#F5EFE6] border-y border-[#E2D8C7] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D5C9B5] text-[#8C6B3A] text-xs font-semibold tracking-widest uppercase mb-3 shadow-xs">
            <Gift className="w-3.5 h-3.5" />
            <span>Interactive Hamper Studio</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] tracking-tight">
            Build Your Custom <span className="italic text-[#8C6B3A]">Gift Hamper.</span>
          </h2>
          <p className="text-sm md:text-base text-[#5C675E] font-light mt-2 leading-relaxed">
            Personalized gifting is Surreal Treasures’ signature craft. Choose your box size, occasion, and handpicked handcrafted products for weddings, festivals, or self-care.
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Hamper Box Tier */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#DFD8CC] shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C6B3A] block mb-2">
                Step 1: Choose Box Size
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {HAMPER_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier);
                      // If current selected items exceed new tier, clamp
                      if (selectedProductIds.length > tier.maxItems) {
                        setSelectedProductIds(selectedProductIds.slice(0, tier.maxItems));
                      }
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedTier.id === tier.id
                        ? 'border-[#173829] bg-[#F2F7F4] shadow-md ring-2 ring-[#173829]/10'
                        : 'border-[#E5DFD4] bg-white hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-lg font-medium text-[#122B20]">
                        {tier.name}
                      </span>
                      {selectedTier.id === tier.id && (
                        <div className="w-5 h-5 rounded-full bg-[#173829] flex items-center justify-center text-white">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#398260] block mb-1">
                      Up to {tier.maxItems} Handcrafted Items
                    </span>
                    <p className="text-[11px] text-[#697A70] leading-snug">
                      {tier.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Occasion */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#DFD8CC] shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C6B3A] block mb-2">
                Step 2: Choose Occasion
              </span>
              <div className="flex flex-wrap gap-2.5">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      selectedOccasion === occ
                        ? 'bg-[#173829] text-white shadow-sm'
                        : 'bg-[#F7F4EE] text-[#4F5D54] hover:bg-[#ECE7DC] border border-[#DDD5C7]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pick Products */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#DFD8CC] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C6B3A] block mb-1">
                    Step 3: Select Products to Pack
                  </span>
                  <span className="text-xs text-[#526359]">
                    Selected: <strong>{selectedProducts.length}</strong> / {selectedTier.maxItems} items
                  </span>
                </div>
                {selectedProducts.length >= selectedTier.maxItems && (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Box Capacity Reached
                  </span>
                )}
              </div>

              {/* Products Checkbox Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                {availableProducts.map((p) => {
                  const isSelected = selectedProductIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProduct(p.id)}
                      className={`relative p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#173829] bg-[#EEF7F2] shadow-sm scale-102'
                          : 'border-[#E7E2D8] bg-[#FAF8F5] hover:bg-white hover:border-[#173829]/40'
                      }`}
                    >
                      {/* Check badge */}
                      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                        isSelected ? 'bg-[#173829] text-white' : 'bg-white/80 text-transparent border border-[#CCC4B4]'
                      }`}>
                        ✓
                      </div>

                      <div className="w-full aspect-square rounded-xl bg-white mb-2 overflow-hidden flex items-center justify-center p-1.5">
                        <img
                          src={p.image || '/images/real_sureal_jar_only.png'}
                          alt={p.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <h5 className="font-serif text-xs font-normal text-[#122B20] line-clamp-1 mb-0.5">
                          {p.name}
                        </h5>
                        <span className="font-semibold text-xs text-[#173829]">₹{p.price}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Hamper Summary Card with 3D Visual Box */}
          <div className="lg:col-span-5 sticky top-28 bg-[#122B20] text-white rounded-3xl p-7 border border-[#D4AF37]/30 shadow-2xl space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-[#C5A880] uppercase tracking-widest font-bold mb-1">
                <span>Hamper Summary</span>
                <span>{selectedOccasion}</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white">
                {selectedTier.name}
              </h3>
            </div>

            {/* Virtual 3D Box Display */}
            <Hamper3DBoxVisualizer
              selectedProducts={selectedProducts}
              selectedTier={selectedTier}
              selectedOccasion={selectedOccasion}
            />

            {/* List of items inside */}
            <div className="space-y-1.5 py-3 border-y border-white/10 text-xs max-h-48 overflow-y-auto">
              <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">
                Packed Items ({selectedProducts.length}):
              </span>
              {selectedProducts.length === 0 ? (
                <p className="text-white/40 italic py-1">No items selected yet. Tap products on the left to pack your hamper.</p>
              ) : (
                selectedProducts.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-[#D0DFD6]">
                    <span className="truncate pr-2">• {item.name}</span>
                    <span className="font-semibold text-white">₹{item.price}</span>
                  </div>
                ))
              )}

              <div className="flex items-center justify-between pt-2 text-[#C5A880] font-medium border-t border-white/10">
                <span>Custom Box & Botanical Packaging</span>
                <span>₹{selectedTier.basePrice}</span>
              </div>
            </div>

            {/* Live Total Calculation */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs uppercase tracking-wider text-white/70">Estimated Total</span>
                <span className="font-serif text-3xl font-light text-[#F5DEAA]">₹{totalHamperPrice}</span>
              </div>
              <p className="text-[11px] text-[#A3B8AD]">
                🚚 Handcrafted in Indore · Free shipping across India on orders above ₹1,500.
              </p>
            </div>

            {/* Order & Add to Bag Actions */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={handleAddHamperToBag}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E8CF86] to-[#C99D2A] hover:scale-102 text-[#122B20] text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#122B20]" />
                <span>{justAddedToBag ? '✓ Added to Royal Bag!' : `Add Custom Hamper to Bag (₹${totalHamperPrice})`}</span>
              </button>

              <a
                href={getWhatsAppHamperUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#1EAA52] hover:from-[#20ba5a] hover:to-[#178f44] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-102"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Hamper Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
