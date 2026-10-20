import React from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#122B20] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/15 z-10">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span className="font-serif text-lg font-light">
              INNOVEXA × Surreal Treasures — 3D Product Film
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="w-full aspect-video bg-black relative">
          <iframe
            src="https://drive.google.com/file/d/1d0E9yY_iafTI6rzxRDq3gn2AU3OVFME2/preview"
            title="INNOVEXA Sureal Aloe Vera Gel 3D Motion Showcase"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-[#0E2419] flex flex-wrap items-center justify-between gap-3 text-xs text-[#A3B8AD]">
          <span>Flagship 3D Motion Showcase: Sureal Aloe Vera Gel (100g, ₹280)</span>
          <a
            href="https://drive.google.com/file/d/1d0E9yY_iafTI6rzxRDq3gn2AU3OVFME2/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-[#C5A880] transition-colors underline"
          >
            <span>Open High-Res Video in Google Drive</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
