import React, { useState, useRef } from 'react';
import { Sparkles, ArrowLeftRight, Check, Droplets, Sun, Moon, ShieldCheck, Crown } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function SkinHydrationSlider({ onOrderHero }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const offsetX = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, Math.round((offsetX / rect.width) * 100)));
    setSliderPos(pos);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#EEF6F1] via-[#FAF7F2] to-[#FAF7F2] border-t border-[#DFEDE3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C1DECB] text-[#2C6D4E] text-xs font-semibold tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Visible Cellular Transformation</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] tracking-tight leading-tight">
            7 Days of Indore Aloe. <br />
            <span className="italic text-[#23583E]">One Restored Skin Barrier.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#4C6153] font-light mt-3 leading-relaxed">
            Drag the interactive slider below to witness how bioactive Indore Aloe Vera juice and Vitamin E rehydrate, soothe, and revitalize exhausted skin cells.
          </p>
        </div>

        {/* Interactive Comparison Split Stage */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#D5E6DC] bg-white">
          <div
            ref={containerRef}
            onMouseDown={handlePointerDown}
            onMouseUp={handlePointerUp}
            onMouseMove={handlePointerMove}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
            onTouchMove={handlePointerMove}
            className="relative w-full h-[380px] sm:h-[460px] select-none cursor-ew-resize overflow-hidden"
          >
            {/* Background Layer: Day 7 (Radiant, Restored Dewy Skin) */}
            <div className="absolute inset-0 bg-[#E8F4EC] flex items-center justify-center overflow-hidden">
              <img
                src="/images/design_reference_2.png"
                alt="Day 7 Radiant Skin"
                className="w-full h-full object-cover filter brightness-105"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122B20]/75 via-transparent to-transparent pointer-events-none" />

              {/* Day 7 Label Pill */}
              <div className="absolute top-6 right-6 bg-[#173829]/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-[#D4AF37]/50 shadow-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Day 7: Restored Dewy Barrier</span>
              </div>

              {/* Day 7 Features Callout */}
              <div className="absolute bottom-6 right-6 text-right text-white max-w-xs space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                  Bioactive Hydration Lock
                </span>
                <p className="text-xs font-light text-[#E0EFE6]">
                  Skin redness calmed, moisture levels increased by 94%, zero greasy residue.
                </p>
              </div>
            </div>

            {/* Foreground Layer with Clip-Path: Day 0 (Dehydrated Skin) */}
            <div
              className="absolute inset-0 bg-[#EFE9DD] flex items-center justify-center overflow-hidden transition-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
            >
              <img
                src="/images/design_reference_2.png"
                alt="Day 0 Dehydrated Skin"
                className="w-full h-full object-cover filter sepia-[0.35] brightness-90 saturate-[0.7]"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E2015]/80 via-transparent to-transparent pointer-events-none" />

              {/* Day 0 Label Pill */}
              <div className="absolute top-6 left-6 bg-[#2B1F16]/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 shadow-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Day 0: Sun Fatigue & Dehydration</span>
              </div>

              {/* Day 0 Features Callout */}
              <div className="absolute bottom-6 left-6 text-left text-white max-w-xs space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                  Stressed Barrier
                </span>
                <p className="text-xs font-light text-[#EADFC7]">
                  Flakiness, micro-redness, and moisture loss caused by city pollution and dry heat.
                </p>
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-[#173829] border-2 border-white text-white flex items-center justify-center shadow-2xl pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
                <ArrowLeftRight className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* Under-Slider Verified Clinical Numbers */}
          <div className="p-6 sm:p-8 bg-white border-t border-[#EAEFEA] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <span className="font-serif text-3xl font-light text-[#173829]">+94%</span>
              <span className="text-xs text-[#526659] block mt-0.5">
                Immediate Moisture Surge
              </span>
              <span className="text-[10px] text-[#81998B] font-light">Tested over 48 hours</span>
            </div>

            <div>
              <span className="font-serif text-3xl font-light text-[#173829]">0.0%</span>
              <span className="text-xs text-[#526659] block mt-0.5">
                Pore-Clogging Residue
              </span>
              <span className="text-[10px] text-[#81998B] font-light">Completely Non-Comedogenic</span>
            </div>

            <div>
              <span className="font-serif text-3xl font-light text-[#173829]">100%</span>
              <span className="text-xs text-[#526659] block mt-0.5">
                Homegrown Aloe Barbadensis
              </span>
              <span className="text-[10px] text-[#81998B] font-light">Harvested in Indore, MP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
