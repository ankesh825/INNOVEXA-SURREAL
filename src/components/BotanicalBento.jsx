import React, { useState, useRef } from 'react';
import { Sparkles, Droplets, HeartHandshake, ArrowRight, ShieldCheck, Crown, Info } from 'lucide-react';

function BentoCard3D({
  imgSrc,
  alt,
  tag,
  title,
  desc,
  footerLeft,
  footerRight,
  actives,
  onOpenDetail,
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });
  const [showActives, setShowActives] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -8;
    const ry = ((x - rect.width / 2) / rect.width) * 8;
    setTilt({ rx, ry, gx: (x / rect.width) * 100, gy: (y / rect.height) * 100, hovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl bg-white p-6 md:p-7 border border-[#e1ded7] shadow-sm hover:shadow-[0_20px_45px_rgba(20,45,30,0.12)] transition-shadow duration-300 flex flex-col justify-between overflow-hidden"
      style={{
        transform: tilt.hovered
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        transition: tilt.hovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
    >
      {/* Glare sheen */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-20"
        style={{
          opacity: tilt.hovered ? 0.35 : 0,
          background: `radial-gradient(circle 200px at ${tilt.gx}% ${tilt.gy}%, rgba(255, 255, 255, 0.9), transparent 70%)`,
        }}
      />

      {/* Gold Rim Accent */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl border border-[#D4AF37] transition-opacity duration-300 z-10"
        style={{ opacity: tilt.hovered ? 0.5 : 0 }}
      />

      <div>
        <div
          className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#ebf3ee] relative flex items-center justify-center p-2 transition-transform duration-300"
          style={{ transform: tilt.hovered ? 'translateZ(25px)' : 'translateZ(0px)' }}
        >
          <img
            src={imgSrc}
            alt={alt}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 rounded-xl"
          />
          <div className="absolute top-3 left-3 bg-[#122b20]/85 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20">
            {tag}
          </div>

          <button
            onClick={() => setShowActives(!showActives)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-[#173829] hover:bg-white text-[10px] font-semibold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
            title="Inspect Key Actives"
          >
            <Info className="w-3 h-3 text-[#398260]" />
            <span className="hidden sm:inline">Actives</span>
          </button>
        </div>

        <div style={{ transform: tilt.hovered ? 'translateZ(15px)' : 'translateZ(0px)' }}>
          <h3 className="font-serif text-2xl font-light text-[#122b20] mb-2 group-hover:text-[#285e44] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#526359] leading-relaxed mb-4 font-light">
            {desc}
          </p>

          {/* Collapsible Key Actives Pill List */}
          {showActives && (
            <div className="mb-4 p-3 rounded-xl bg-[#F2F8F4] border border-[#CDE5D5] text-[11px] text-[#2F523D] animate-fadeIn space-y-1">
              <span className="font-bold block uppercase tracking-wider text-[9px] text-[#398260]">
                Botanical Bio-Compounds:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {actives.map((act, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-white text-[#173829] border border-[#BEDBC6] text-[10px] font-medium"
                  >
                    ✦ {act}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="pt-4 border-t border-[#f0ece5] flex items-center justify-between text-xs font-semibold text-[#173829] relative z-10"
        style={{ transform: tilt.hovered ? 'translateZ(20px)' : 'translateZ(0px)' }}
      >
        <span>{footerLeft}</span>
        <span className="text-[#398260] bg-[#EEF7F2] px-2 py-0.5 rounded-full border border-[#D5E9DC]">
          {footerRight}
        </span>
      </div>
    </div>
  );
}

export default function BotanicalBento({ onOpenDetail }) {
  return (
    <section className="py-22 bg-[#f4efe6] border-y border-[#e2d8c7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#398260] bg-white/80 px-3.5 py-1.5 rounded-full border border-[#cbd9cf] inline-flex items-center gap-1.5 shadow-2xs">
            <Crown className="w-3 h-3 text-[#D4AF37]" />
            <span>Botanical Inspiration · Indore Harvest</span>
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122b20] mt-4 mb-3 tracking-tight">
            Inspired by the Simplicity of Aloe.
          </h2>
          <p className="text-sm md:text-base text-[#56685e] font-light leading-relaxed">
            We harvest mature aloe leaves directly from our private botanical garden in Indore. Filleted by hand within hours of cutting, our formulations retain their living enzymes and bioactive polysaccharides.
          </p>
        </div>

        {/* 3 Interactive 3D Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {/* Card 1: Aloe Leaves */}
          <BentoCard3D
            imgSrc="/images/real_sureal_aloe_slices.png"
            alt="Fresh Sliced Aloe Vera Leaves with dew drops"
            tag="Raw Harvest"
            title="Aloe Leaves"
            desc="Nature's pure source of freshness. Sourced directly from our own home-grown aloe vera botanical plants in Indore, harvested at peak vitality."
            footerLeft="Cold Extraction"
            footerRight="100% Fresh Juice"
            actives={['Acemannan Polysaccharide', 'Salicylic Acid', 'Anthraquinones', 'Saponins']}
            onOpenDetail={onOpenDetail}
          />

          {/* Card 2: Pure Gel Texture */}
          <BentoCard3D
            imgSrc="/images/real_sureal_jar_only.png"
            alt="Sureal Aloe Vera Gel Jar"
            tag="Zero Stickiness"
            title="Pure Gel Texture"
            desc="Light, clean, and instantly refreshing. Absorbs quickly into pores without any heavy greasiness, infusing skin with moisture and calming redness."
            footerLeft="Fast Absorbing"
            footerRight="Face · Body · Hair"
            actives={['Cold-Pressed Aloe Base', 'Pure Vitamin E', 'Organic Tea Tree Oil', 'Vegetable Glycerin']}
            onOpenDetail={onOpenDetail}
          />

          {/* Card 3: Botanical Balance */}
          <BentoCard3D
            imgSrc="/images/real_sureal_plant_sunlight.png"
            alt="Aloe plant in natural morning sunlight"
            tag="Balanced Science"
            title="Botanical Balance"
            desc="Thoughtfully formulated with Vitamin E and soothing Tea Tree Oil. Calms sun damage, protects barrier integrity, and leaves a radiant dewy glow."
            footerLeft="Skin Barrier Care"
            footerRight="Daily Ritual"
            actives={['Antioxidant Tocopherol', 'Barrier Lipids', 'Phytosterols', 'Zinc & Magnesium']}
            onOpenDetail={onOpenDetail}
          />
        </div>
      </div>
    </section>
  );
}
