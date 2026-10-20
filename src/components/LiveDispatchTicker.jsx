import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, CheckCircle, ShieldCheck, X } from 'lucide-react';

export default function LiveDispatchTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  const activities = [
    {
      name: 'Radhika S.',
      city: 'Indore, MP',
      action: 'ordered 2x Sureal Aloe Vera Gel (100g)',
      time: '3 mins ago',
      batch: 'Batch #04',
      badge: 'Farm Harvest',
    },
    {
      name: 'Vikram & Sneha',
      city: 'Mumbai, MH',
      action: 'ordered Custom Wedding Hampers (25 boxes)',
      time: '12 mins ago',
      batch: 'Luxury Chest',
      badge: 'Bespoke Hamper',
    },
    {
      name: 'Ananya D.',
      city: 'Bangalore, KA',
      action: 'ordered Coffee Cocoa Scrub + Rose Mist',
      time: '18 mins ago',
      batch: 'Artisanal Care',
      badge: 'Verified Buyer',
    },
    {
      name: 'Kavita M.',
      city: 'Bhopal, MP',
      action: 'ordered Ojasvat Kumkumadi Facial Oil',
      time: '24 mins ago',
      batch: 'Ayurvedic Reserve',
      badge: 'Pure Saffron',
    },
  ];

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500);
    }, 8500);

    return () => clearInterval(interval);
  }, [isDismissed, activities.length]);

  if (isDismissed) return null;

  const current = activities[currentIndex];

  return (
    <div
      className={`fixed bottom-6 left-6 z-30 transition-all duration-500 max-w-[320px] sm:max-w-[360px] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#D5E6DC] shadow-[0_12px_30px_rgba(20,40,30,0.15)] flex items-center justify-between gap-3 group">
        <div className="flex items-center gap-3">
          {/* Glowing Green Activity Dot / Icon */}
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#122B20]">{current.name}</span>
              <span className="text-[10px] text-[#698877]">({current.city})</span>
            </div>
            <p className="text-[11px] text-[#334D3E] font-medium leading-tight mt-0.5 line-clamp-1">
              {current.action}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {current.badge}
              </span>
              <span className="text-[10px] text-[#8DA094]">{current.time}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full shrink-0"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
