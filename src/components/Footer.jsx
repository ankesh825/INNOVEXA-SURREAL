import React from 'react';
import { MessageSquare, ExternalLink, MapPin, Heart, Sparkles, Phone } from 'lucide-react';

export default function Footer({ onExplore3D, onOpenVideo }) {
  return (
    <footer className="bg-[#0E2419] text-white pt-20 pb-12 border-t border-[#1C3E2D]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Lockup Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* INNOVEXA Chess Piece Emblem */}
              <div className="w-11 h-11 rounded-xl bg-[#09121c] p-1 border border-cyan-400/40 flex items-center justify-center text-white shadow-md">
                <img src="/images/innovexa_badge_circle.png" alt="INNOVEXA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif text-2xl font-light tracking-wider block leading-none">
                  INNOVEXA
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-cyan-400 font-bold block mt-0.5">
                  Strategic Marketing & Innovation · Powered by Surreal Treasures
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A3B8AD] max-w-sm font-light leading-relaxed">
              Handcrafted farm-to-face skincare made with love from homegrown Aloe Vera in Indore, India. Pure botanical ingredients for pure, healthy skin.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#C5A880] pt-1">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Indore, Madhya Pradesh, India</span>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.instagram.com/surreal_treasures/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-pink-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram (@surreal_treasures)</span>
              </a>

              <a
                href="https://wa.me/919109119646"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white text-xs transition-colors border border-[#25D366]/40"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp (+91 9109119646)</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Explore & Rituals
            </h4>
            <ul className="space-y-2 text-xs text-[#A3B8AD] font-light">
              <li>
                <button onClick={onExplore3D} className="hover:text-white transition-colors">
                  360° Interactive 3D Studio
                </button>
              </li>
              <li>
                <button onClick={onOpenVideo} className="hover:text-white transition-colors">
                  Watch 3D Campaign Films
                </button>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Verified Product Collection
                </a>
              </li>
              <li>
                <a href="#custom-hampers" className="hover:text-white transition-colors">
                  Custom Hamper Studio
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-white transition-colors">
                  Indore Botanical Heritage
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Verified Official Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Official Channels
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3B8AD] font-light">
              <li>
                <a
                  href="https://surrealtreasures.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-white hover:text-[#C5A880] transition-colors"
                >
                  <span>Official Website: surrealtreasures.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://surrealtreasures.in/#shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Direct Online Shop & Catalog
                </a>
              </li>
              <li className="pt-2 text-[11px] text-[#789384] leading-relaxed">
                🚚 Nationwide Delivery from Indore · Secure UPI QR & WhatsApp Orders · 100% Farm-to-Face Purity
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#789384]">
          <div>
            © 2026 INNOVEXA × Surreal Treasures. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Marketing, 3D Experience & Digital Direction by</span>
            <strong className="text-white tracking-wider">INNOVEXA</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
