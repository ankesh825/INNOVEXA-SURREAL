import React from 'react';
import { Sparkles, Heart, Sprout, Award, MapPin, CheckCircle2 } from 'lucide-react';

export default function BrandStory() {
  const uspPoints = [
    {
      num: '01',
      title: 'Homegrown Aloe Vera',
      desc: 'We cultivate fresh aloe vera directly in our own botanical gardens in Indore, hand-filleting each leaf to preserve live nutrients without chemical degradation.',
    },
    {
      num: '02',
      title: '100% Handmade Skincare',
      desc: 'Cold-process soaps, whipped butters, and restorative face serums crafted with artisanal care, zero harsh preservatives, and no toxic parabens.',
    },
    {
      num: '03',
      title: 'Personalized Gifting Hampers',
      desc: 'Bespoke gift boxes tailored to weddings, festivals, corporate milestones, and birthdays, blending luxury personal care with heartfelt presentation.',
    },
    {
      num: '04',
      title: 'Skincare Meets Gifting',
      desc: 'A unique synthesis: premium personal care products curated into bespoke gifting solutions under one cohesive homegrown Indian brand.',
    },
    {
      num: '05',
      title: 'Indore Heritage & Craft',
      desc: 'Proudly rooted in Indore, Madhya Pradesh, combining traditional Ayurvedic wisdom with contemporary minimalist skincare aesthetics.',
    },
  ];

  return (
    <section id="our-story" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#EAE3D5]">
      {/* Subtle background ambient blur */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Two-Column Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF7F2] border border-[#C1DECB] text-[#398260] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Brand Story · INNOVEXA × Surreal Treasures</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#122B20] tracking-tight leading-[1.1]">
              Thoughtfully Designed. <br />
              <span className="italic text-[#2D6148]">Naturally Inspired.</span>
            </h2>

            <p className="text-base text-[#4E5C54] font-light leading-relaxed">
              <strong>Surreal Treasures</strong> is an artisanal farm-to-face skincare brand rooted in Indore, Madhya Pradesh. Founded on the belief that everyday self-care should be personal, honest, and pure, every formulation is handcrafted with love from homegrown botanicals.
            </p>

            <p className="text-base text-[#4E5C54] font-light leading-relaxed">
              <strong>INNOVEXA</strong> is the innovative creative force driving this vision forward — transforming authentic Indian craftsmanship into cinematic 3D digital experiences, luxury editorial campaigns, and a modern lifestyle movement.
            </p>

            {/* Location Badge */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#285E44] font-medium">
              <div className="w-8 h-8 rounded-full bg-[#E8F3EC] flex items-center justify-center text-[#173829]">
                <MapPin className="w-4 h-4" />
              </div>
              <span>Handcrafted in Indore, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Right Column: Visual Frame with Real Model & Product */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#F5EFE6] to-[#E3EFE7] aspect-[4/3]">
              <img
                src="/images/sureal_story_model.png"
                alt="Model holding the Sureal Aloe Vera Gel jar with gold cap"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/story_model_holding_jar.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122B20]/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/70">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#398260] block mb-0.5">
                  Farm-to-Face Skincare
                </span>
                <p className="font-serif text-lg text-[#122B20] italic">
                  “We strive to make self-care and gifting feel personal, thoughtful, and memorable.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* USP / Competitive Edge Matrix from Bizznovate Slide */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#DFEDE3] shadow-lg">
          <div className="max-w-2xl mb-10">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#398260] bg-[#EEF7F2] px-3 py-1 rounded-full border border-[#C1DECB]">
              Our Competitive Edge
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#122B20] mt-3 tracking-tight">
              Why Surreal Treasures <span className="italic text-[#2D6148]">Stands Apart</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6E62] font-light mt-1">
              Key differentiators from our Bizznovate strategic presentation and brand roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uspPoints.map((usp) => (
              <div
                key={usp.num}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E9E4DC] hover:border-[#B7D8C4] hover:bg-[#F4FAF6] transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif text-2xl font-light text-[#C5A880] group-hover:text-[#173829] transition-colors">
                    {usp.num}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#398260] opacity-80" />
                </div>
                <h4 className="font-serif text-xl font-normal text-[#122B20] mb-2 group-hover:text-[#285E44] transition-colors">
                  {usp.title}
                </h4>
                <p className="text-xs text-[#526359] leading-relaxed font-light">
                  {usp.desc}
                </p>
              </div>
            ))}

            {/* Sixth Callout Card: INNOVEXA Vision */}
            <div className="p-6 rounded-2xl bg-[#173829] text-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block mb-1">
                  The INNOVEXA Promise
                </span>
                <h4 className="font-serif text-xl font-light mb-2 text-white">
                  Next-Level Brand Growth
                </h4>
                <p className="text-xs text-[#A3B8AD] leading-relaxed font-light">
                  Elevating local Indian artisans with cutting-edge 3D interactive technology, global aesthetics, and transparent storytelling.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-[#D4AF37]">
                <span>Indore to the World</span>
                <span>Bizznovate 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Team INNOVEXA Spotlight */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-[#0c1813] via-[#142820] to-[#0c1a24] text-white p-8 md:p-14 border border-emerald-400/30 shadow-2xl relative overflow-hidden">
          {/* Subtle Cyber-Botanical Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left: Team Emblem & Logo */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.25)] border-2 border-cyan-400/40 p-2 bg-[#09111b] mb-4 group hover:scale-105 transition-transform">
                <img
                  src="/images/innovexa_team_logo_upright.png"
                  alt="INNOVEXA Official Team Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="font-serif text-2xl font-light text-white tracking-widest leading-none">
                INNOVEXA
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-cyan-400 font-bold mt-1">
                Strategic Marketing & Innovation
              </span>
              <span className="text-xs text-[#a1b8ad] mt-2 font-light">
                Powering the Surreal Treasures Brand Movement
              </span>
            </div>

            {/* Right: Vision, Strategy & Startup Philosophy */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Tier Startup Vision</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
                Where Strategic Precision <br />
                <span className="italic text-cyan-300">Meets Artisanal Nature.</span>
              </h3>

              <p className="text-sm sm:text-base text-[#c3d5cb] font-light leading-relaxed">
                <strong>INNOVEXA</strong> is our ambitious startup team spearheading product marketing, creative direction, and digital engineering for Surreal Treasures. Just like the chess king on our emblem, we believe in strategic foresight, calculated moves, and relentless excellence.
              </p>

              <p className="text-sm sm:text-base text-[#c3d5cb] font-light leading-relaxed">
                By uniting Surreal Treasures’ authentic, Indore-harvested botanical formulations with world-class 3D WebGL interactives and luxury editorial aesthetics, we are propelling a local artisanal treasure into a nationally recognized luxury skincare phenomenon.
              </p>

              {/* Startup Pillars */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-serif text-xl text-cyan-300">3D WebGL</span>
                  <span className="text-[10px] text-[#9db5a6] uppercase tracking-wider">Interactive Tech</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-serif text-xl text-emerald-300">100% Pure</span>
                  <span className="text-[10px] text-[#9db5a6] uppercase tracking-wider">Farm to Face</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-serif text-xl text-[#f3d99e]">₹280</span>
                  <span className="text-[10px] text-[#9db5a6] uppercase tracking-wider">Accessible Luxe</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-serif text-xl text-white">Indore, MP</span>
                  <span className="text-[10px] text-[#9db5a6] uppercase tracking-wider">Global Ambition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
