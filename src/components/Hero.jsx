import React, { useState, useRef } from 'react';
import { ArrowDown, Play, Sparkles, Leaf, RotateCw, Crown, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';

export default function Hero({ onOpenVideo, onExploreClick, onOpenQuiz }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Smooth mouse move 3D parallax tracking
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center justify-between overflow-hidden bg-gradient-to-r from-[#cad0c1] via-[#d7ddd0] to-[#ccd2c3] pt-20 pb-12"
      style={{ perspective: '1200px' }}
    >
      {/* ================= BACKGROUND LAYER ================= */}
      {/* 1. Ambient Royal Lighting & Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#eef3ea]/60 via-[#e0e8db]/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[650px] h-[650px] bg-gradient-to-br from-[#ebdcc3]/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Model & Botanical Visual (The Girl with Flowers & Greenery as background) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[68%] xl:w-[62%] h-full pointer-events-none z-0 flex items-center justify-end overflow-hidden transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * -28}px, ${mousePos.y * -22}px, 0) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 6}deg)`,
        }}
      >
        <div className="relative h-full w-full flex items-center justify-end">
          <img
            src="/images/hero_model_bg_2x.png"
            alt="INNOVEXA Skincare Model with Floral Crown"
            className="h-full max-h-[96vh] w-auto object-cover lg:object-contain object-right"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, black 35%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 12%, black 35%)',
              imageRendering: '-webkit-optimize-contrast',
            }}
          />

          {/* Floating White Blossom Petals */}
          <div className="absolute top-20 right-[42%] w-3.5 h-3.5 rounded-full bg-white/70 blur-[0.5px] animate-pulse pointer-events-none" />
          <div className="absolute top-1/3 right-[15%] w-2.5 h-2.5 rounded-full bg-white/80 blur-[0.5px] animate-bounce pointer-events-none" />
          <div className="absolute bottom-28 right-[35%] w-3 h-3 rounded-full bg-emerald-100/60 blur-[0.5px] pointer-events-none" />
        </div>
      </div>

      {/* 3. Floating 3D Spatial Deck: Royal Medallion & Holographic Feature Cards */}
      <div className="absolute right-4 sm:right-10 lg:right-16 top-0 bottom-0 w-[360px] pointer-events-none z-20 hidden md:flex flex-col justify-center items-end">
        {/* Holographic Card 1 (Top): 100% Cold-Extracted Pure Aloe */}
        <div
          className="pointer-events-auto mb-6 p-3.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_rgba(20,45,30,0.18)] transition-transform duration-300 ease-out flex items-center gap-3 max-w-[260px] group hover:scale-105 cursor-pointer"
          style={{
            transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 22}px, 60px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -6}deg)`,
          }}
          onClick={onExploreClick}
          title="Explore 360° Studio"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/80 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
            <img
              src="/images/real_sureal_jar_only.png"
              alt="Sureal Jar"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <div>
            <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-emerald-800">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Bioactive Aloe</span>
            </div>
            <span className="block text-xs font-serif font-bold text-[#122B20] leading-tight">
              100g Flagship Jar · ₹280
            </span>
            <span className="text-[10px] text-[#557060]">Metallic Gold Screw Lid</span>
          </div>
        </div>

        {/* Central Royal 3D Medallion: "ALOE VERA GEL" */}
        <div
          onClick={onExploreClick}
          className="pointer-events-auto cursor-pointer group transition-transform duration-300 ease-out will-change-transform my-3"
          style={{
            transform: `translate3d(${mousePos.x * 45}px, ${mousePos.y * 38}px, 75px) scale(1)`,
          }}
          title="Click to launch 360° 3D Aloe Vera Studio"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onExploreClick()}
        >
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#1a422f] via-[#122e20] to-[#0a1b13] shadow-[0_22px_50px_rgba(10,30,20,0.65)] border-2 border-[#D4AF37] flex flex-col items-center justify-center text-center p-3 text-white group-hover:scale-110 transition-all duration-300">
            {/* Concentric Gold Filigree Ring */}
            <div className="absolute inset-1.5 rounded-full border border-[#D4AF37]/40 pointer-events-none" />
            <span className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ping opacity-50 pointer-events-none" />

            <Crown className="w-3.5 h-3.5 text-[#D4AF37] mb-0.5" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase leading-tight text-white/90">
              ALOE VERA
            </span>
            <span className="text-[13px] sm:text-[15px] font-serif italic tracking-wider leading-tight text-[#e8f5ec]">
              Gel · 100g
            </span>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center gap-1 text-[8px] tracking-widest uppercase font-bold text-[#f5deaa]">
              <RotateCw className="w-2.5 h-2.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
              <span>360° Studio</span>
            </div>
          </div>
        </div>

        {/* Holographic Card 2 (Bottom): Fresh Farm Harvest */}
        <div
          className="pointer-events-auto mt-6 p-3 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_rgba(20,45,30,0.18)] transition-transform duration-300 ease-out flex items-center gap-3 max-w-[240px] group hover:scale-105 cursor-pointer"
          style={{
            transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -18}px, 50px) rotateY(${mousePos.x * -8}deg)`,
          }}
          onClick={onExploreClick}
          title="Farm to Face Pure Formulation"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="/images/real_sureal_aloe_slices.png"
              alt="Fresh Aloe"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </div>
          <div>
            <span className="block text-[11px] font-bold text-[#122B20] leading-tight">
              Indore Farm Harvest
            </span>
            <span className="text-[9px] text-[#2F6F4E] font-semibold block">0% Water Dilution</span>
          </div>
        </div>
      </div>

      {/* ================= FOREGROUND LAYER ================= */}
      {/* Editorial Content & Call to Actions */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-14 w-full flex flex-col justify-center min-h-[82vh]">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Collaboration Tag with Official INNOVEXA Chess Piece Emblem */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#c1d3c5] shadow-xs mb-5 transition-transform hover:scale-102">
            <div className="w-5 h-5 rounded-full bg-[#0a1610] p-0.5 overflow-hidden flex items-center justify-center shrink-0 border border-emerald-400/50">
              <img src="/images/innovexa_badge_circle.png" alt="INNOVEXA" className="w-full h-full object-contain" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#173829]">
              INNOVEXA Powered by Surreal Treasures
            </span>
            <span className="text-[10px] text-[#557060] font-medium hidden sm:inline">
              · Indore, MP
            </span>
          </div>

          {/* Royal Botanical Quality Seal */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#173829]/10 via-[#26533c]/15 to-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#122b20] text-[11px] font-semibold mb-6 shadow-xs backdrop-blur-sm">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold text-[#173829]">Royal Botanical Reserve</span>
            <span className="text-[#173829]/30">♦</span>
            <span>100% Homegrown Pure Aloe</span>
            <span className="text-[#173829]/30">♦</span>
            <span className="text-[#967137] font-bold">Cold-Extracted Batch #04 Ready</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] font-light text-[#122b20] tracking-tight leading-[1.04] mb-6">
            Nature, Refined <br />
            <span className="italic text-[#224e39]">for Your Ritual.</span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg text-[#2e3e34] font-light leading-relaxed mb-8 max-w-lg">
            INNOVEXA blends nature’s purest cold-extracted Aloe Vera with modern skincare science. Handcrafted in small batches in Indore, India — designed for your everyday glow.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#173829] via-[#214f37] to-[#143324] hover:from-[#1E4833] hover:to-[#2B6346] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-[0_12px_30px_rgba(23,56,41,0.35)] hover:shadow-[0_16px_40px_rgba(23,56,41,0.45)] hover:-translate-y-0.5 flex items-center gap-3 group border border-[#D4AF37]/50 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '8s' }} />
              <span>Explore 360° 3D Studio</span>
              <span className="text-base text-[#D4AF37] transition-transform group-hover:translate-x-1">→</span>
            </button>

            <button
              onClick={onOpenVideo}
              className="px-7 py-4 rounded-full bg-white/80 hover:bg-white text-[#173829] border-2 border-[#173829]/80 hover:border-[#D4AF37] text-xs font-bold uppercase tracking-widest transition-all shadow-xs hover:shadow-md flex items-center gap-2.5 group backdrop-blur-md cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#173829] flex items-center justify-center text-white transition-transform group-hover:scale-110">
                <Play className="w-2.5 h-2.5 fill-white translate-x-0.5" />
              </div>
              <span>Watch 3D Campaign Films</span>
            </button>

            {/* Quick 30-Sec Skincare Ritual Advisor Button */}
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="px-5 py-3.5 rounded-full bg-[#EBF5EE] hover:bg-white text-[#173829] border border-[#BFDFCB] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-2xs hover:shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Find My Ritual Quiz</span>
              </button>
            )}
          </div>

          {/* Royal Trust Highlights */}
          <div className="pt-6 border-t border-[#bdcebf] grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#122b20]">100%</span>
              <span className="block text-xs text-[#4b6353] mt-0.5">Homegrown Aloe</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#122b20]">₹280</span>
              <span className="block text-xs text-[#4b6353] mt-0.5">Flagship 100g Jar</span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#122b20]">Indore</span>
              <span className="block text-xs text-[#4b6353] mt-0.5">Farm to Face</span>
            </div>
          </div>

          {/* Mobile 3D Quick Launcher Card */}
          <div className="md:hidden mt-6 flex items-center justify-between p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center shrink-0">
                <img src="/images/real_sureal_jar_only.png" alt="Sureal Jar" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#122B20]">Sureal Aloe Vera Gel (100g)</span>
                <span className="text-[10px] text-emerald-800 font-semibold">360° 3D Interactive Model</span>
              </div>
            </div>
            <button
              onClick={onExploreClick}
              className="px-3 py-1.5 rounded-full bg-[#173829] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <RotateCw className="w-3 h-3 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
              <span>View 3D</span>
            </button>
          </div>
        </div>

        {/* Bottom Left Scroll Indicator */}
        <button
          onClick={onExploreClick}
          className="absolute bottom-6 left-6 sm:left-10 md:left-14 flex flex-col items-center gap-1.5 text-[#42594a] hover:text-[#173829] transition-colors group cursor-pointer"
        >
          <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#173829] group-hover:translate-y-0.5 transition-transform" />
        </button>

        {/* Bottom Right 3D Motion Cue */}
        <div className="absolute bottom-6 right-6 sm:right-10 md:right-14 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#173829] text-[10px] font-bold tracking-wider uppercase pointer-events-none shadow-xs">
          <RotateCw className="w-3 h-3 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Real-Time 3D Spatial Parallax Active</span>
        </div>
      </div>
    </section>
  );
}
