import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Play,
  MessageSquare,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  RotateCw,
  Gift,
  Leaf,
  Star,
  HelpCircle,
  ShieldCheck,
  Crown,
  Heart,
  Droplets,
  ArrowRight,
  ShoppingBag,
  Award
} from 'lucide-react';

export default function Navbar({ onOpenVideo, onExplore3D, cartCount = 0, onOpenCart, onOpenCertificate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'collection' | '3d' | 'house' | null
  const [mobileExpanded, setMobileExpanded] = useState({ collection: false, exp3d: false, house: false });

  // Web Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Toggle ambient peaceful spa audio
  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(164.81, ctx.currentTime); // E3
        osc2.frequency.setValueAtTime(246.94, ctx.currentTime); // B3

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.5, ctx.currentTime);
        osc1.connect(oscGain);
        osc2.connect(oscGain);
        oscGain.connect(masterGain);

        osc1.start();
        osc2.start();

        setAudioCtx(ctx);
        setGainNode(masterGain);
        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('Audio blocked:', err);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
        setGainNode(null);
      }
      setIsAudioPlaying(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Royal Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0b1b13] via-[#143022] to-[#0b1b13] text-white py-1.5 px-4 text-center text-[11px] font-medium tracking-wide flex items-center justify-between border-b border-[#D4AF37]/20 shadow-xs">
        <div className="hidden sm:flex items-center gap-2 text-[#d1dfd6] text-[10px]">
          <Crown className="w-3 h-3 text-[#D4AF37]" />
          <span className="uppercase tracking-widest font-semibold text-[#E6C98F]">
            Royal Indore Heritage
          </span>
          <span className="text-white/30">·</span>
          <span>100% Homegrown Pure Aloe Vera</span>
        </div>

        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
          <span className="text-[#f1f6f3]">
            INNOVEXA × Surreal Treasures · Artisanal Farm-to-Face Skincare
          </span>
          <span className="hidden md:inline text-[#D4AF37]/50">♦</span>
          {onOpenCertificate ? (
            <button
              onClick={onOpenCertificate}
              className="hidden md:inline-flex items-center gap-1 text-[#ecd5a5] hover:text-white font-semibold cursor-pointer underline underline-offset-2 decoration-[#D4AF37]/60"
              title="Inspect Official Batch #04 Botanical Certificate"
            >
              <span>Batch #04 Ready · Verify Certificate</span>
              <Award className="w-3 h-3 text-[#D4AF37]" />
            </button>
          ) : (
            <span className="hidden md:inline text-[#ecd5a5] font-semibold">
              Limited Cold-Pressed Batch #04 Ready
            </span>
          )}
        </div>

        {/* Spa Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] tracking-wider uppercase text-[#c3dac9] transition-all cursor-pointer border border-white/10"
          title="Toggle peaceful spa ambient sound"
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Spa Audio: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 text-white/60" />
              <span>Spa Audio: Off</span>
            </>
          )}
        </button>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav
        className={`transition-all duration-300 px-6 md:px-12 lg:px-16 py-3 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(18,43,32,0.08)] py-2.5 border-b border-[#E0D4BA]/60'
            : 'bg-[#FAF7F2]/90 backdrop-blur-md'
        }`}
      >
        {/* Brand Lockup with Official INNOVEXA Chess Piece Emblem */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0c1813] to-[#163626] p-1 border-2 border-[#D4AF37]/40 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-[#D4AF37] transition-all duration-300">
            <img
              src="/images/innovexa_badge_circle.png"
              alt="INNOVEXA Official Team Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl sm:text-[26px] font-normal text-[#122B20] tracking-wider leading-none">
                INNOVEXA
              </span>
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#2c6d4e] font-bold mt-0.5">
              Powered by Surreal Treasures
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links — EXACTLY 3 ROYAL CATEGORIES WITH MEGA-DROPDOWNS */}
        <div className="hidden lg:flex items-center gap-2">
          {/* ================= CATEGORY 1: THE COLLECTION ================= */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('collection')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => {
                const el = document.getElementById('collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeDropdown === 'collection'
                  ? 'bg-[#173829] text-white shadow-sm'
                  : 'text-[#2a4537] hover:text-[#173829] hover:bg-[#E8F2EC]/60'
              }`}
            >
              <span>The Collection</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'collection' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu 1 */}
            {activeDropdown === 'collection' && (
              <div className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-[#DFEDE3] p-3 animate-fadeIn z-50">
                <div className="p-2 border-b border-[#F0F5F2] mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                    Farm-to-Face Skincare
                  </span>
                  <span className="text-xs font-serif text-[#122B20] font-medium">
                    19 Handcrafted Botanical Formulations
                  </span>
                </div>

                <div className="space-y-1">
                  <a
                    href="#interactive-3d"
                    onClick={() => {
                      setActiveDropdown(null);
                      onExplore3D();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Sureal Aloe Vera Gel (100g)
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Flagship cold-pressed jar · ₹280</span>
                    </div>
                  </a>

                  <a
                    href="#collection"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Body Polishes & Scrubs
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Coffee Cocoa Scrub, Saffron Butter</span>
                    </div>
                  </a>

                  <a
                    href="#collection"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-800 shrink-0">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Ayurvedic Facial Elixirs
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Ojasvat Kumkumadi, Pure Rose Water</span>
                    </div>
                  </a>

                  <a
                    href="#custom-hampers"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-800 shrink-0">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Custom Hamper Studio
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Personalized luxury gifting boxes</span>
                    </div>
                  </a>
                </div>

                <div className="mt-2 pt-2 border-t border-[#F0F5F2]">
                  <a
                    href="#collection"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-[#173829] hover:bg-[#E8F2EC] transition-colors"
                  >
                    <span>Browse All 19 Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ================= CATEGORY 2: 3D EXPERIENCE ================= */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('3d')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={onExplore3D}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeDropdown === '3d'
                  ? 'bg-[#173829] text-white shadow-sm'
                  : 'text-[#2a4537] hover:text-[#173829] hover:bg-[#E8F2EC]/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>3D Experience</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === '3d' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu 2 */}
            {activeDropdown === '3d' && (
              <div className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-[#DFEDE3] p-3 animate-fadeIn z-50">
                <div className="p-2 border-b border-[#F0F5F2] mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                    Interactive WebGL & Film
                  </span>
                  <span className="text-xs font-serif text-[#122B20] font-medium">
                    Real-Time 3D Spatial Technology
                  </span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onExplore3D();
                    }}
                    className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <RotateCw className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        360° Interactive 3D Jar
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Rotate, zoom & unscrew the gold lid</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onOpenVideo();
                    }}
                    className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#173829] flex items-center justify-center text-white shrink-0">
                      <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        3D Campaign Films
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Aloe Vera Gel & Coffee Scrub videos</span>
                    </div>
                  </button>

                  <a
                    href="#interactive-3d"
                    onClick={() => {
                      setActiveDropdown(null);
                      onExplore3D();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Studio Lighting Presets
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Natural daylight, golden hour & emerald</span>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ================= CATEGORY 3: THE HOUSE ================= */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('house')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => {
                const el = document.getElementById('our-story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeDropdown === 'house'
                  ? 'bg-[#173829] text-white shadow-sm'
                  : 'text-[#2a4537] hover:text-[#173829] hover:bg-[#E8F2EC]/60'
              }`}
            >
              <span>The House</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'house' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu 3 */}
            {activeDropdown === 'house' && (
              <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-[#DFEDE3] p-3 animate-fadeIn z-50">
                <div className="p-2 border-b border-[#F0F5F2] mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                    Heritage & Brand Vision
                  </span>
                  <span className="text-xs font-serif text-[#122B20] font-medium">
                    INNOVEXA × Surreal Treasures
                  </span>
                </div>

                <div className="space-y-1">
                  <a
                    href="#our-story"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#09111b] flex items-center justify-center text-cyan-400 shrink-0 border border-cyan-400/40">
                      <Crown className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Team INNOVEXA Spotlight
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Strategic marketing & innovation team</span>
                    </div>
                  </a>

                  <a
                    href="#ritual-guide"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Daily Skincare Ritual Guide
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Morning, night & weekend routines</span>
                    </div>
                  </a>

                  <a
                    href="#reviews"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Verified Customer Reviews
                      </span>
                      <span className="text-[11px] text-[#5A7365]">4.9 / 5 rating from 420+ buyers</span>
                    </div>
                  </a>

                  <a
                    href="#faq"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F2F8F4] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#122B20] group-hover:text-emerald-800">
                        Frequently Asked Questions
                      </span>
                      <span className="text-[11px] text-[#5A7365]">Delivery, purity & storage</span>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Action: Royal Bag + WhatsApp Order Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Royal Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white hover:bg-[#EEF7F2] border border-[#BFDFCB] text-[#173829] text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer group"
            title="View Royal Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-800 group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline">Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#173829] text-[#D4AF37] text-[10px] font-bold flex items-center justify-center border border-[#D4AF37]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Royal WhatsApp Order Button */}
          <a
            href="https://wa.me/919109119646?text=Hello%20INNOVEXA%20%26%20Surreal%20Treasures!%20I%20would%20like%20to%20place%20an%20order%20for%20Aloe%20Vera%20Gel%20and%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#173829] via-[#215038] to-[#122E20] hover:from-[#1E4833] hover:to-[#2B6848] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:scale-103 border border-[#D4AF37]/50"
          >
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Order on WhatsApp</span>
          </a>
        </div>

        {/* Mobile Action Cluster */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-white border border-[#BFDFCB] text-[#173829] cursor-pointer"
            title="Open Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#173829] text-[#D4AF37] text-[9px] font-bold flex items-center justify-center border border-[#D4AF37]">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#173829] hover:bg-black/5 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Accordion Style for the 3 Categories) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-[#DDE8E1] px-6 py-6 shadow-2xl space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
          {/* Spa Audio in Mobile */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#173829]">
              Ambient Spa Audio
            </span>
            <button
              onClick={toggleAudio}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800"
            >
              {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{isAudioPlaying ? 'Playing' : 'Muted'}</span>
            </button>
          </div>

          {/* Mobile Accordion 1: The Collection */}
          <div className="border-b border-gray-100 pb-2">
            <button
              onClick={() =>
                setMobileExpanded({ ...mobileExpanded, collection: !mobileExpanded.collection })
              }
              className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-wider text-[#173829]"
            >
              <span>1. The Collection</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileExpanded.collection ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileExpanded.collection && (
              <div className="pl-4 py-2 space-y-2 text-xs text-[#3E5547] flex flex-col">
                <a
                  href="#interactive-3d"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onExplore3D();
                  }}
                  className="py-1"
                >
                  🌿 Sureal Aloe Vera Gel (₹280)
                </a>
                <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  ☕ Body Care & Scrubs
                </a>
                <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  ✨ Ayurvedic Elixirs
                </a>
                <a href="#custom-hampers" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  🎁 Custom Hamper Studio
                </a>
                <a
                  href="#collection"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 font-bold text-[#173829]"
                >
                  Browse All 19 Products →
                </a>
              </div>
            )}
          </div>

          {/* Mobile Accordion 2: 3D Experience */}
          <div className="border-b border-gray-100 pb-2">
            <button
              onClick={() =>
                setMobileExpanded({ ...mobileExpanded, exp3d: !mobileExpanded.exp3d })
              }
              className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-wider text-[#173829]"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>2. 3D Experience</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileExpanded.exp3d ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileExpanded.exp3d && (
              <div className="pl-4 py-2 space-y-2 text-xs text-[#3E5547] flex flex-col">
                <button
                  onClick={() => {
                    onExplore3D();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1"
                >
                  🔄 360° Interactive 3D Jar Studio
                </button>
                <button
                  onClick={() => {
                    onOpenVideo();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-1 flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 fill-emerald-800" />
                  <span>3D Campaign Films (Aloe & Scrub)</span>
                </button>
                <a
                  href="#interactive-3d"
                  onClick={() => {
                    onExplore3D();
                    setMobileMenuOpen(false);
                  }}
                  className="py-1"
                >
                  ☀️ Studio Lighting Controls
                </a>
              </div>
            )}
          </div>

          {/* Mobile Accordion 3: The House */}
          <div className="border-b border-gray-100 pb-2">
            <button
              onClick={() =>
                setMobileExpanded({ ...mobileExpanded, house: !mobileExpanded.house })
              }
              className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-wider text-[#173829]"
            >
              <span>3. The House</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileExpanded.house ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileExpanded.house && (
              <div className="pl-4 py-2 space-y-2 text-xs text-[#3E5547] flex flex-col">
                <a href="#our-story" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  👑 Team INNOVEXA Spotlight
                </a>
                <a href="#ritual-guide" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  🧖‍♀️ Daily Skincare Ritual Guide
                </a>
                <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  ⭐ Verified Customer Reviews (4.9/5)
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1">
                  ❓ Common Questions & Concierge
                </a>
              </div>
            )}
          </div>

          {/* Mobile CTA */}
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="https://wa.me/919109119646"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#173829] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm border border-[#D4AF37]/50"
            >
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Order on WhatsApp (+91 9109119646)</span>
            </a>
            <a
              href="https://surrealtreasures.in/#shop"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-full bg-white text-[#173829] border border-[#CADED1] text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <span>Visit Official Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
