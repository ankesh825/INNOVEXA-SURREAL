import React, { useState } from 'react';
import { MessageSquare, X, ArrowRight, Sparkles, Send } from 'lucide-react';

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    'Enquire about 360° Aloe Vera Gel (₹280)',
    'Build a custom wedding / gift hamper',
    'Recommend a skincare routine for my skin',
    'Bulk corporate gifting enquiry from Indore',
  ];

  const handleSend = (text) => {
    const msg = text || customMsg || 'Hello INNOVEXA! I would like to enquire about your projects and brand services.';
    const url = `https://wa.me/919826033852?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded Popup Window */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[350px] bg-white rounded-3xl shadow-2xl border border-[#D5E6DD] overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#173829] to-[#255740] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#09121c] p-0.5 border border-cyan-400/50 flex items-center justify-center shrink-0">
                <img
                  src="/images/innovexa_badge_circle.png"
                  alt="INNOVEXA"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-sm font-medium tracking-wide block leading-none">
                  INNOVEXA Concierge
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold block mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online · Team INNOVEXA (+91 9826033852)</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF7F2] space-y-3">
            <div className="p-3 rounded-2xl bg-white border border-[#E3EDE6] text-xs text-[#2A3F33] leading-relaxed shadow-xs">
              🌿 Namaste! Welcome to <strong>INNOVEXA × Surreal Treasures</strong>. How can our skincare & gifting specialists assist you today?
            </div>

            {/* Quick Prompt Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#637C6D] block px-1">
                Frequently Asked:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#EEF7F2] border border-[#DBE7DF] hover:border-[#173829] text-[11px] text-[#1E392B] font-medium transition-all flex items-center justify-between group shadow-2xs"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <ArrowRight className="w-3 h-3 text-[#173829] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#CFDFD4] text-xs text-[#122B20] focus:outline-none focus:border-[#173829]"
              />
              <button
                onClick={() => handleSend()}
                className="w-8 h-8 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
                title="Send on WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#173829] via-[#1E4B37] to-[#173829] hover:from-[#1E4835] hover:to-[#2A654B] text-white shadow-2xl border border-emerald-400/30 transition-all hover:scale-105 group cursor-pointer"
        aria-label="Open WhatsApp Concierge"
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          {/* Notification pulse dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
          Chat with INNOVEXA
        </span>
      </button>
    </div>
  );
}
