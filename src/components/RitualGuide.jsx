import React, { useState } from 'react';
import { Sun, Moon, Clock, Sparkles, Check, ArrowRight, Droplets, Heart, ShoppingBag } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function RitualGuide({ onSelectProduct, onAddToCart }) {
  const [activeRoutine, setActiveRoutine] = useState('morning'); // 'morning' | 'evening' | 'weekend'
  const [addedItemName, setAddedItemName] = useState('');

  const routines = {
    morning: {
      title: 'Morning Dew Ritual',
      subtitle: 'Awaken, hydrate and shield your natural skin barrier for the day.',
      duration: '3 Minutes',
      steps: [
        {
          num: '01',
          name: 'Purifying Cleanse',
          product: 'Artisanal Neem & Tea Tree Soap',
          price: '₹180',
          desc: 'Wash away overnight impurities with cold-pressed botanical oils without stripping natural hydration.',
          tag: 'Cleanse',
        },
        {
          num: '02',
          name: 'Botanical Toning',
          product: 'Pure Rose Water Floral Mist',
          price: '₹200',
          desc: 'Steam-distilled pure rose water tightens pores and balances skin pH, preparing it for moisture absorption.',
          tag: 'Tone',
        },
        {
          num: '03',
          name: 'Core Hydration Lock',
          product: 'Flagship Sureal Aloe Vera Gel (100g)',
          price: '₹280',
          desc: 'Apply a generous coin-sized layer of freshly filleted Indore Aloe Vera Gel. Non-greasy, soothing dewy glow.',
          tag: 'Hydrate · Star Product',
          isHero: true,
        },
        {
          num: '04',
          name: 'Lip Nourishment',
          product: 'Beetroot & Shea Lip Butter',
          price: '₹150',
          desc: 'Swipe on natural beetroot extract to lock in moisture and impart a subtle, healthy rosy tint.',
          tag: 'Protect',
        },
      ],
    },
    evening: {
      title: 'Evening Detox & Repair',
      subtitle: 'Wash off pollution and stress; activate cellular skin renewal while you sleep.',
      duration: '5 Minutes',
      steps: [
        {
          num: '01',
          name: 'Deep Pore Detox',
          product: 'Activated Charcoal Herbal Soap',
          price: '₹180',
          desc: 'Draw out micro-dust and city pollution accumulated throughout the day in Indore.',
          tag: 'Detox',
        },
        {
          num: '02',
          name: 'Calming Aloe Compress',
          product: 'Sureal Aloe Vera Gel (Chilled)',
          price: '₹280',
          desc: 'Keep your jar in the fridge for 10 mins. Apply as a cooling mask to eliminate redness and UV fatigue.',
          tag: 'Soothe · Star Product',
          isHero: true,
        },
        {
          num: '03',
          name: 'Ayurvedic Golden Elixir',
          product: 'Ojasvat Kumkumadi Facial Oil',
          price: '₹800',
          desc: 'Gently press 3–4 drops of authentic saffron-infused Kumkumadi oil into face and neck for overnight radiance.',
          tag: 'Rejuvenate',
        },
      ],
    },
    weekend: {
      title: 'Weekend Spa Exfoliation',
      subtitle: 'Complete head-to-toe polish and botanical restoration ritual.',
      duration: '15 Minutes',
      steps: [
        {
          num: '01',
          name: 'Invigorating Body Buff',
          product: 'Coffee Cocoa Body Scrub',
          price: '₹250',
          desc: 'Massage freshly ground Arabica coffee and rich cocoa butter in circular motions to banish dead skin.',
          tag: 'Exfoliate',
        },
        {
          num: '02',
          name: 'Post-Scrub Soothing Layer',
          product: 'Sureal Aloe Vera Gel (Full Body)',
          price: '₹280',
          desc: 'Smooth cold aloe vera over freshly exfoliated arms and legs to instantly hydrate and prevent ingrowns.',
          tag: 'Repair · Star Product',
          isHero: true,
        },
        {
          num: '03',
          name: 'Whipped Velvet Moisture',
          product: 'Saffron & Almond Body Butter',
          price: '₹450',
          desc: 'Seal in deep nourishment with rich whipped shea and sweet almond butter for 24-hour silkiness.',
          tag: 'Deep Seal',
        },
      ],
    },
  };

  const current = routines[activeRoutine] || routines.morning;

  const handleAddStepToBag = (step) => {
    soundEffects.playGoldChime();
    const priceNum = parseInt(step.price.replace(/[^\d]/g, ''), 10) || 280;
    const item = {
      id: `ritual-step-${step.product.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: step.product,
      category: 'skincare',
      price: priceNum,
      image: '/images/real_sureal_jar_only.png',
      desc: `${step.name} · ${step.tag} (${current.title})`,
      volume: step.price,
    };
    if (onAddToCart) {
      onAddToCart(item);
    }
    setAddedItemName(step.product);
    setTimeout(() => setAddedItemName(''), 2000);
  };

  const setPricing = {
    morning: { price: 750, original: 810 },
    evening: { price: 1150, original: 1260 },
    weekend: { price: 899, original: 980 },
  };

  const handleAddFullRoutineToBag = () => {
    soundEffects.playGoldChime();
    const pricing = setPricing[activeRoutine] || { price: 899, original: 980 };
    const bundleItem = {
      id: `bundle-${activeRoutine}-${Date.now()}`,
      name: `Complete ${current.title} Set`,
      category: 'bundle',
      price: pricing.price,
      image: '/images/real_sureal_jar_only.png',
      desc: `${current.steps.length} Full Steps: ${current.steps.map((s) => s.product).join(' + ')}`,
      volume: `${current.steps.length} Full Size Items`,
      isBundle: true,
    };
    if (onAddToCart) {
      onAddToCart(bundleItem);
    }
    setAddedItemName(`Complete ${current.title} Set`);
    setTimeout(() => setAddedItemName(''), 2500);
  };

  return (
    <section id="ritual-guide" className="py-24 bg-gradient-to-b from-[#FAF7F2] to-[#EEF5F0] relative overflow-hidden border-t border-[#DFEDE3]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C1DECB] text-[#2C6D4E] text-xs font-semibold tracking-widest uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ayurvedic & Modern Rituals</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] tracking-tight leading-tight">
              Craft Your Daily <br />
              <span className="italic text-[#23583E]">Botanical Ritual.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4C6153] font-light mt-3 leading-relaxed">
              Curated by the INNOVEXA skincare science team using 100% homegrown Surreal Treasures formulations. Simple, honest, and transformative steps.
            </p>
          </div>

          {/* Routine Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#CDE0D4] shadow-sm self-start lg:self-end">
            <button
              onClick={() => setActiveRoutine('morning')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeRoutine === 'morning'
                  ? 'bg-[#173829] text-white shadow-sm'
                  : 'text-[#566B5E] hover:text-[#173829]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Morning Dew</span>
            </button>

            <button
              onClick={() => setActiveRoutine('evening')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeRoutine === 'evening'
                  ? 'bg-[#173829] text-white shadow-sm'
                  : 'text-[#566B5E] hover:text-[#173829]'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night Repair</span>
            </button>

            <button
              onClick={() => setActiveRoutine('weekend')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeRoutine === 'weekend'
                  ? 'bg-[#173829] text-white shadow-sm'
                  : 'text-[#566B5E] hover:text-[#173829]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Weekend Spa</span>
            </button>
          </div>
        </div>

        {/* Routine Banner Info */}
        <div className="mb-8 p-5 rounded-2xl bg-white/80 border border-[#D5E6DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#2B6D4D]">
              {current.title}
            </span>
            <p className="text-sm text-[#3E5245] font-light mt-0.5">{current.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#173829] bg-[#E8F3EC] px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Estimated Ritual Time: {current.duration}</span>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {current.steps.map((step) => (
            <div
              key={step.num}
              className={`relative p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                step.isHero
                  ? 'bg-gradient-to-b from-[#173829] to-[#0F261B] text-white shadow-xl ring-2 ring-emerald-400/40 hover:-translate-y-1'
                  : 'bg-white border border-[#D9EADB] shadow-sm hover:shadow-md hover:border-[#BEDCC6]'
              }`}
            >
              {/* Top tag & step number */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-serif text-3xl font-light ${
                      step.isHero ? 'text-[#D4AF37]' : 'text-[#8BAF99]'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                      step.isHero
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-[#EEF7F2] text-[#2C6D4E]'
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>

                <h3
                  className={`font-serif text-xl font-medium mb-1 ${
                    step.isHero ? 'text-white' : 'text-[#122B20]'
                  }`}
                >
                  {step.name}
                </h3>
                <span
                  className={`block text-xs font-bold mb-3 ${
                    step.isHero ? 'text-emerald-300' : 'text-[#2D694A]'
                  }`}
                >
                  {step.product} · {step.price}
                </span>

                <p
                  className={`text-xs font-light leading-relaxed ${
                    step.isHero ? 'text-[#C5D8CD]' : 'text-[#56695D]'
                  }`}
                >
                  {step.desc}
                </p>
              </div>

              {/* Bottom Quick Order CTA */}
              <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/10 space-y-2">
                <button
                  onClick={() => handleAddStepToBag(step)}
                  className={`w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    step.isHero
                      ? 'bg-[#D4AF37] text-[#122B20] hover:bg-[#E5C76B] shadow-md'
                      : 'bg-[#173829] text-white hover:bg-[#23543D]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {addedItemName === step.product ? '✓ Added' : `Add to Bag (${step.price})`}
                  </span>
                </button>

                <a
                  href={`https://wa.me/919109119646?text=Hello%20Surreal%20Treasures%20%26%20INNOVEXA!%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(
                    step.product
                  )}%20from%20the%20${encodeURIComponent(current.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full text-[11px] font-semibold text-center flex items-center justify-center gap-1 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>Order via WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Ritual Bundle Checkout Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#173829] via-[#1F4B37] to-[#122B20] text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-400/20">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#E7CF9D]">
              Complete Care Set · Save ₹{(setPricing[activeRoutine]?.original || 0) - (setPricing[activeRoutine]?.price || 0)}
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-light">
              Get the Complete {current.title} Set
            </h4>
            <p className="text-xs text-[#BED2C5] max-w-lg font-light leading-relaxed">
              Experience the full synergy of cold-extracted Indore Aloe Vera paired with artisan herbal botanicals. Includes a complimentary handcrafted gift sleeve.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleAddFullRoutineToBag}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E8CF86] to-[#C99D2A] text-[#122B20] text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#122B20]" />
              <span>
                Add Complete Set (₹{setPricing[activeRoutine]?.price || 899})
              </span>
            </button>

            <a
              href={`https://wa.me/919109119646?text=Hello%20Surreal%20Treasures%20%26%20INNOVEXA!%20I%20want%20to%20order%20the%20complete%20${encodeURIComponent(
                current.title
              )}%20set%20for%20₹${setPricing[activeRoutine]?.price || 899}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <span>WhatsApp Enquire</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
