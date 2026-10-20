import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Droplets, RotateCcw, Check, X, ShieldCheck, Crown, Activity } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function TextureSimulator({ onOrderHero }) {
  const canvasRef = useRef(null);
  const [selectedGelType, setSelectedGelType] = useState('sureal'); // 'sureal' | 'commercial'
  const [ripples, setRipples] = useState([]);
  const [interactionCount, setInteractionCount] = useState(0);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const width = (canvas.width = canvas.parentElement.clientWidth || 500);
    const height = (canvas.height = 320);

    const isSureal = selectedGelType === 'sureal';
    const primaryColor = isSureal ? 'rgba(43, 182, 86, ' : 'rgba(215, 65, 65, ';
    const glowColor = isSureal ? '#2bb656' : '#d74141';

    let localRipples = [];

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        localRipples.push({
          x,
          y,
          radius: 6,
          maxRadius: isSureal ? 55 : 30, // Surreal spreads light and fast; commercial is thick and sluggish
          alpha: 0.85,
          speed: isSureal ? 2.4 : 1.1,
        });

        if (localRipples.length % 5 === 0) {
          soundEffects.playWaterDrop();
        }
        setInteractionCount((prev) => prev + 1);
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });

    const render = () => {
      // Background gradient
      ctx.fillStyle = isSureal ? '#0c1f15' : '#1e1010';
      ctx.fillRect(0, 0, width, height);

      // Subtle grid texture
      ctx.strokeStyle = isSureal ? 'rgba(74, 180, 114, 0.08)' : 'rgba(200, 80, 80, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw active ripples
      for (let i = localRipples.length - 1; i >= 0; i--) {
        const r = localRipples[i];
        r.radius += r.speed;
        r.alpha *= isSureal ? 0.94 : 0.96; // Fast natural absorption vs sticky film

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${primaryColor}${r.alpha})`;
        ctx.lineWidth = isSureal ? 2.5 : 4.5;
        ctx.stroke();

        // Glistening droplet core
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(1, 4 - r.radius * 0.05), 0, Math.PI * 2);
        ctx.fillStyle = isSureal ? '#c8f7d5' : '#ffd0d0';
        ctx.fill();

        if (r.alpha < 0.02 || r.radius > r.maxRadius) {
          localRipples.splice(i, 1);
        }
      }

      // Prompt overlay if no ripples
      if (localRipples.length === 0) {
        ctx.fillStyle = isSureal ? 'rgba(212, 245, 222, 0.5)' : 'rgba(255, 210, 210, 0.5)';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          '✦ Drag cursor or finger across canvas to test gel spreadability',
          width / 2,
          height / 2
        );
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
    };
  }, [selectedGelType]);

  const metrics =
    selectedGelType === 'sureal'
      ? {
          viscosity: '420 cP',
          viscosityLabel: 'Light Water-Gel Matrix',
          absorption: '18 Seconds',
          absorptionLabel: 'Rapid Cellular Absorption',
          stickiness: '0.0%',
          stickinessLabel: 'Zero Residue · Clean Matte Feel',
          cooling: '-2.4°C',
          coolingLabel: 'Instant Natural Soothing',
        }
      : {
          viscosity: '1,950 cP',
          viscosityLabel: 'Heavy Synthetic Polymer Base',
          absorption: '4.5 Minutes',
          absorptionLabel: 'Slow / Leaves Film on Skin',
          stickiness: '82%',
          stickinessLabel: 'Gummy Tackiness from CI Dyes',
          cooling: '-0.3°C',
          coolingLabel: 'Minimal Calming Action',
        };

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-[#DFEDE3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#398260] bg-[#EEF7F2] px-3.5 py-1.5 rounded-full border border-[#C1DECB] inline-flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Apothecary Lab · Live Viscosity Simulation</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] mt-3 tracking-tight">
              Feel the Texture Before <span className="italic text-[#2D6148]">It Touches Your Skin.</span>
            </h2>
            <p className="text-sm md:text-base text-[#56685e] font-light max-w-xl mt-2 leading-relaxed">
              Experience the physical difference between freshly filleted Indore Aloe Vera and commercial chemical gels. Interactive tactile bio-simulation.
            </p>
          </div>

          {/* Toggle Gel Formulation */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#D5E6DC] shadow-sm self-start md:self-auto">
            <button
              onClick={() => {
                soundEffects.playGoldChime();
                setSelectedGelType('sureal');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedGelType === 'sureal'
                  ? 'bg-[#173829] text-white shadow-sm'
                  : 'text-[#4A5E52] hover:bg-[#F2F7F4]'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Surreal Handcrafted (Indore)</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playSoftClick();
                setSelectedGelType('commercial');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedGelType === 'commercial'
                  ? 'bg-[#8F2D2D] text-white shadow-sm'
                  : 'text-[#4A5E52] hover:bg-[#F9ECEC]'
              }`}
            >
              <X className="w-3.5 h-3.5" />
              <span>Commercial Mass Gel</span>
            </button>
          </div>
        </div>

        {/* Interactive Lab Stage & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Canvas Interactive Spread Simulator */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#D5E6DC] shadow-xl relative bg-[#0c1f15] flex flex-col justify-between">
            {/* Stage Header */}
            <div className="p-4 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-white text-xs z-10">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                    selectedGelType === 'sureal' ? 'bg-emerald-400' : 'bg-red-400'
                  }`}
                />
                <span className="font-bold tracking-wider uppercase text-[11px]">
                  {selectedGelType === 'sureal'
                    ? 'Pure Homegrown Aloe Barbadensis Juice'
                    : 'Water-Diluted Thickener Matrix (80% Aqua)'}
                </span>
              </div>
              <span className="text-[10px] text-white/70">
                {interactionCount} ripples registered
              </span>
            </div>

            {/* The Interactive Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-[320px] cursor-crosshair active:cursor-grabbing block"
            />

            {/* Stage Footer Overlay */}
            <div className="p-4 bg-white/10 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-white/80 text-[11px] z-10">
              <span>Touch / drag on the canvas to inspect droplet glide rate</span>
              <button
                onClick={() => setInteractionCount(0)}
                className="flex items-center gap-1 text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Surface</span>
              </button>
            </div>
          </div>

          {/* Telemetry Metrics Panel */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 md:p-8 border border-[#DFEDE3] shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#398260] uppercase font-bold tracking-widest mb-1">
                <span>Lab Rheology Report</span>
                <span>Batch #04 Verified</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-[#122B20]">
                {selectedGelType === 'sureal'
                  ? 'Cold-Pressed Botanical Viscosity'
                  : 'Commercial Polymer Viscosity'}
              </h3>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3EDE6]">
                <span className="text-[10px] uppercase font-bold text-[#6D8577] block mb-1">
                  Dynamic Viscosity
                </span>
                <span className="font-serif text-2xl font-semibold text-[#122B20] block">
                  {metrics.viscosity}
                </span>
                <span className="text-[11px] text-[#4A6354] font-light mt-0.5 block">
                  {metrics.viscosityLabel}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3EDE6]">
                <span className="text-[10px] uppercase font-bold text-[#6D8577] block mb-1">
                  Bio-Absorption Speed
                </span>
                <span className="font-serif text-2xl font-semibold text-[#122B20] block">
                  {metrics.absorption}
                </span>
                <span className="text-[11px] text-[#4A6354] font-light mt-0.5 block">
                  {metrics.absorptionLabel}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3EDE6]">
                <span className="text-[10px] uppercase font-bold text-[#6D8577] block mb-1">
                  Stickiness Index
                </span>
                <span
                  className={`font-serif text-2xl font-semibold block ${
                    selectedGelType === 'sureal' ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {metrics.stickiness}
                </span>
                <span className="text-[11px] text-[#4A6354] font-light mt-0.5 block">
                  {metrics.stickinessLabel}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3EDE6]">
                <span className="text-[10px] uppercase font-bold text-[#6D8577] block mb-1">
                  Epidermal Soothing Drop
                </span>
                <span className="font-serif text-2xl font-semibold text-[#173829] block">
                  {metrics.cooling}
                </span>
                <span className="text-[11px] text-[#4A6354] font-light mt-0.5 block">
                  {metrics.coolingLabel}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 border-t border-[#EDF3EF] flex items-center justify-between gap-4">
              <span className="text-xs text-[#526D5C] font-light">
                Indore Botanical Garden harvest · 100g Jar ₹280
              </span>
              <button
                onClick={onOrderHero}
                className="px-5 py-2.5 rounded-full bg-[#173829] hover:bg-[#205138] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-102 shrink-0 cursor-pointer"
              >
                Order Jar Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
