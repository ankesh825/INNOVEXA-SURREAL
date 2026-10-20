import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCw, Crown, Heart, ShieldCheck, ShoppingBag } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function RitualQuizModal({ isOpen, onClose, onAddToCart }) {
  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('dry');
  const [goal, setGoal] = useState('glow');

  if (!isOpen) return null;

  const recommendations = {
    dry: {
      title: 'Deep Quench & Nourishment Ritual',
      products: [
        { name: 'Sureal Aloe Vera Gel (100g)', price: '₹280', role: 'Pure bio-cellulose hydration' },
        { name: 'Saffron & Almond Body Butter', price: '₹450', role: 'Whipped lipid barrier seal' },
        { name: 'Ojasvat Kumkumadi Facial Oil', price: '₹800', role: 'Golden overnight recovery' },
      ],
      bundlePrice: '₹1,530',
      tag: 'Best for Dry / Sensitive Skin',
    },
    oily: {
      title: 'Pore Clarifying & Botanical Balance Ritual',
      products: [
        { name: 'Activated Charcoal Herbal Soap', price: '₹180', role: 'Micro-pollutant extraction' },
        { name: 'Pure Rose Water Mist', price: '₹200', role: 'Natural astringent toner' },
        { name: 'Sureal Aloe Vera Gel (100g)', price: '₹280', role: 'Non-greasy featherlight hydration' },
      ],
      bundlePrice: '₹660',
      tag: 'Best for Acne-Prone & Oily Skin',
    },
    combination: {
      title: 'Harmonizing Glow & Radiance Ritual',
      products: [
        { name: 'Coffee Cocoa Body Scrub', price: '₹250', role: 'Cellular buffing polish' },
        { name: 'Sureal Aloe Vera Gel (100g)', price: '₹280', role: 'Balancing botanical serum' },
        { name: 'Beetroot Lip Butter', price: '₹150', role: 'Moisture lock & rosy tint' },
      ],
      bundlePrice: '₹680',
      tag: 'Best for Everyday Balancing',
    },
  };

  const rec = recommendations[skinType] || recommendations.combination;

  const handleAddBundleToBag = () => {
    soundEffects.playGoldChime();
    const priceNum = parseInt(rec.bundlePrice.replace(/[^\d]/g, ''), 10);
    const bundleItem = {
      id: `quiz-rec-${skinType}-${Date.now()}`,
      name: rec.title,
      category: 'bundle',
      price: priceNum,
      image: '/images/real_sureal_jar_only.png',
      desc: `${rec.tag} · ${rec.products.map((p) => p.name).join(' + ')}`,
      volume: `${rec.products.length} Products Set`,
      isBundle: true,
    };
    if (onAddToCart) {
      onAddToCart(bundleItem);
    }
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const text = `Hello Surreal Treasures & INNOVEXA! I completed the Skincare Ritual Quiz on your website. My skin type is ${skinType}. I would like to order the recommended "${rec.title}" bundle (${rec.bundlePrice}).`;
    window.open(`https://wa.me/919109119646?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5E6DC] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#173829] via-[#215038] to-[#122e20] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#09121c] p-0.5 border border-cyan-400/50 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-serif text-lg font-normal tracking-wide block leading-none">
                Indore Botanical Ritual Advisor
              </span>
              <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-semibold block mt-1">
                Powered by INNOVEXA Science
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#2B6D4D] block mb-1">
                  Step 1 of 2
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#122B20]">
                  What describes your skin type?
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'dry',
                    title: 'Dry / Flaky / Sensitive',
                    desc: 'Needs rich lipid replenishment & deep soothing aloe hydration.',
                  },
                  {
                    id: 'oily',
                    title: 'Oily / Blemish-Prone',
                    desc: 'Needs pore detox, oil-free hydration & tea tree botanical balance.',
                  },
                  {
                    id: 'combination',
                    title: 'Normal / Combination',
                    desc: 'Needs daily gentle exfoliation & lightweight dewy radiance.',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSkinType(item.id);
                      setStep(2);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                      skinType === item.id
                        ? 'bg-[#EBF5EE] border-[#173829] shadow-sm'
                        : 'bg-white border-[#DFEDE3] hover:border-[#173829] hover:bg-[#F8FAF8]'
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-bold text-[#122B20]">{item.title}</span>
                      <span className="text-xs text-[#526D5E] font-light mt-0.5 block">{item.desc}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#173829] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#2B6D4D] block mb-1">
                    Your Personalized Prescription
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#122B20]">{rec.title}</h3>
                </div>
                <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {rec.tag}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DDECE1] space-y-3 shadow-xs">
                {rec.products.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-none">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#122B20] block">{p.name}</span>
                        <span className="text-[10px] text-[#557060]">{p.role}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#173829]">{p.price}</span>
                  </div>
                ))}

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#122B20]">
                  <span>Total Bundle Price:</span>
                  <span className="text-sm font-serif text-emerald-900">{rec.bundlePrice}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={handleAddBundleToBag}
                    className="w-full flex-1 py-3.5 px-5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E8CF86] to-[#C99D2A] text-[#122B20] text-xs font-bold uppercase tracking-wider hover:scale-102 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#122B20]" />
                    <span>Add Routine to Bag ({rec.bundlePrice})</span>
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>WhatsApp Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-[#557060] hover:text-[#122B20] underline cursor-pointer"
                  >
                    ← Retake Skincare Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
