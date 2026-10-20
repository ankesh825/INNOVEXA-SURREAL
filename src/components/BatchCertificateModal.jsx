import React from 'react';
import { X, Crown, ShieldCheck, CheckCircle2, Award, Printer, Share2, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function BatchCertificateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundEffects.playGoldChime();
    window.print();
  };

  const handleShare = () => {
    const text = `Verified Certificate of Botanical Authenticity for Surreal Treasures Aloe Vera Gel (Batch #04 · Indore, MP) with zero added water and 99.8% pure cold-pressed aloe.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-2 border-[#D4AF37]/50 overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Certificate Golden Border Inset */}
        <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/40 rounded-2xl pointer-events-none" />
        <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-[#EADFC7] flex items-center justify-between bg-gradient-to-r from-[#FAF6EE] via-[#F5EDDE] to-[#FAF6EE] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#173829] to-[#0A1A12] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-normal text-[#122B20] tracking-wide block">
                Certificate of Botanical Authenticity
              </span>
              <span className="text-[10px] text-[#8C6D37] tracking-[0.2em] uppercase font-bold block mt-0.5">
                Official Batch #04 Allocation · Indore Reserve
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-[#D5C7AF] flex items-center justify-center text-[#4A5E52] hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 relative z-10 text-xs text-[#2A3E31]">
          {/* Certificate Banner Statement */}
          <div className="text-center max-w-lg mx-auto py-2">
            <p className="font-serif text-base italic text-[#476352] leading-relaxed">
              “This document certifies that each 100g jar of Sureal Aloe Vera Gel from Batch #04 was cold-extracted exclusively from mature, organic Aloe Barbadensis plants cultivated in our Indore private reserve without synthetic dilution.”
            </p>
          </div>

          {/* Test & Verification Matrix */}
          <div className="bg-[#FAF8F2] rounded-2xl p-5 border border-[#E5DAC4] shadow-xs space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center border-b border-[#E5DAC4] pb-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#796748] block">Batch Reference</span>
                <span className="font-serif text-sm font-bold text-[#122B20]">IND-ALOE-B04</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#796748] block">Harvest Date</span>
                <span className="font-serif text-sm font-bold text-[#122B20]">October 2026</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#796748] block">Extraction Temp</span>
                <span className="font-serif text-sm font-bold text-[#122B20]">Cold 18°C</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#796748] block">Shelf Validity</span>
                <span className="font-serif text-sm font-bold text-[#122B20]">12 Months</span>
              </div>
            </div>

            {/* Assay Parameters */}
            <div className="space-y-2 pt-1 text-xs">
              {[
                { param: 'Pure Homegrown Aloe Vera Juice', spec: 'Min 99.0%', result: '99.82%', status: 'PASS' },
                { param: 'Added Water Dilution (Aqua Fillers)', spec: '0.00%', result: '0.00% (Zero Water)', status: 'PASS' },
                { param: 'Artificial Green Color Dyes (CI 19140)', spec: 'None Allowed', result: 'Not Detected', status: 'PASS' },
                { param: 'Parabens / Formaldehyde Releasers', spec: 'None Allowed', result: 'Not Detected', status: 'PASS' },
                { param: 'Natural Vitamin E & Tea Tree Actives', spec: 'Enriched', result: 'Positive Presence', status: 'PASS' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-[#EFE8DA] last:border-none">
                  <span className="font-medium text-[#122B20]">{row.param}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#5B7565]">{row.result}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures & Wax Seal Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center pt-2">
            <div className="text-center sm:text-left">
              <span className="font-serif text-sm font-bold text-[#122B20] block">Surreal Treasures</span>
              <span className="text-[10px] text-[#71897B] block">Artisan Founder & Botanist</span>
              <span className="text-[9px] font-mono text-emerald-700 font-semibold mt-1 block">Verified In Indore, MP</span>
            </div>

            {/* Official Wax Seal Emblem */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a4430] to-[#0d261a] border-3 border-[#D4AF37] shadow-xl flex flex-col items-center justify-center text-white text-center p-2">
                <Crown className="w-5 h-5 text-[#D4AF37] mb-0.5" />
                <span className="text-[7px] tracking-[0.2em] uppercase font-bold text-[#f5deaa]">
                  SURREAL
                </span>
                <span className="text-[6px] tracking-widest uppercase text-white/70">
                  INDORE 2026
                </span>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <span className="font-serif text-sm font-bold text-[#122B20] block">Team INNOVEXA</span>
              <span className="text-[10px] text-[#71897B] block">Digital Direction & Quality Audit</span>
              <span className="text-[9px] font-mono text-cyan-800 font-semibold mt-1 block">Cryptographically Sealed</span>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-5 sm:p-6 bg-[#FAF6EE] border-t border-[#EADFC7] flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#F2ECE0] text-[#173829] border border-[#D5C7AF] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#F2ECE0] text-[#173829] border border-[#D5C7AF] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#173829] hover:bg-[#205138] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
