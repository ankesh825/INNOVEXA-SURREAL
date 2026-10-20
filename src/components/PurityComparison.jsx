import React from 'react';
import { Check, X, ShieldAlert, Sparkles, Droplets, Leaf, Crown } from 'lucide-react';

export default function PurityComparison({ onExplore3D }) {
  const points = [
    {
      feature: 'Aloe Extraction Source',
      commercial: 'Reconstituted dry powder or imported pulp',
      sureal: '100% Hand-filleted fresh leaves grown in Indore botanical farm',
      winner: true,
    },
    {
      feature: 'Water & Dilution',
      commercial: 'Up to 80% added water (Aqua base)',
      sureal: 'Zero added water · Pure Aloe Barbadensis juice base',
      winner: true,
    },
    {
      feature: 'Artificial Color & Dyes',
      commercial: 'Bright synthetic green dye (CI 19140 / CI 42090)',
      sureal: 'Crystal clear translucency with natural pale jade tint',
      winner: true,
    },
    {
      feature: 'Skin Absorption & Texture',
      commercial: 'Sticky residue, chemical film left on skin',
      sureal: 'Fast bio-absorption, zero stickiness, natural matte glow',
      winner: true,
    },
    {
      feature: 'Preservative Formulation',
      commercial: 'Harsh parabens, synthetic formaldehyde releasers',
      sureal: 'Gentle paraben-free preservative system with Vitamin E',
      winner: true,
    },
    {
      feature: 'Packaging & Craft',
      commercial: 'Thin plastic squeeze tubes',
      sureal: 'Frosted luxury glass jar with metallic gold screw cap (100g)',
      winner: true,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F4F9F5] to-[#FAF7F2] relative overflow-hidden border-t border-[#DFEDE3]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C1DECB] text-[#2C6D4E] text-xs font-semibold tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Gold Standard of Purity</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] tracking-tight leading-tight">
            Why Surreal Treasures <br />
            <span className="italic text-[#23583E]">Redefines Aloe Vera.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#4C6153] font-light mt-3 leading-relaxed">
            Not all aloe gels are created equal. Compare the chemical dilution of mass commercial products with the artisanal farm-to-face perfection of Surreal Treasures.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#DFEDE3] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#FAF8F5] border-b border-[#E3EDE6] p-4 sm:p-6 text-xs uppercase tracking-wider font-bold">
            <div className="col-span-4 sm:col-span-4 text-[#597162]">Ingredient Standard</div>
            <div className="col-span-4 sm:col-span-4 text-[#9A6262] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span>Commercial Gels</span>
            </div>
            <div className="col-span-4 sm:col-span-4 text-[#173829] flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-serif text-sm normal-case font-bold text-[#122B20]">
                Surreal Treasures
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#F0F5F2]">
            {points.map((pt, i) => (
              <div
                key={i}
                className="grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm items-center hover:bg-[#F9FCFA] transition-colors"
              >
                <div className="col-span-4 sm:col-span-4 font-bold text-[#122B20] pr-2">
                  {pt.feature}
                </div>
                <div className="col-span-4 sm:col-span-4 text-[#66736B] flex items-start gap-2 pr-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-xs">{pt.commercial}</span>
                </div>
                <div className="col-span-4 sm:col-span-4 text-[#173829] font-medium flex items-start gap-2 bg-[#EEF7F2]/60 p-2 sm:p-3 rounded-xl border border-emerald-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm">{pt.sureal}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Bottom Action Banner */}
          <div className="p-6 bg-gradient-to-r from-[#173829] via-[#1E4D37] to-[#122B20] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-lg font-light leading-none">
                  Pure Indore Aloe Vera Gel (100g) · ₹280
                </span>
                <span className="text-[11px] text-[#BED2C5] font-light mt-0.5 block">
                  Cold-pressed in small batches. Free delivery across India on orders above ₹1,500.
                </span>
              </div>
            </div>

            <button
              onClick={onExplore3D}
              className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C76B] text-[#122B20] text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
            >
              Inspect 3D Jar Model →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
