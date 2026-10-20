import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const FAQS = [
  {
    q: 'What is INNOVEXA Aloe Vera Gel?',
    a: 'INNOVEXA Aloe Vera Gel is a flagship botanical skincare essential handcrafted in collaboration with Surreal Treasures. Made using pure cold-extracted juice from homegrown Aloe Vera plants in Indore, enriched with Vitamin E and Tea Tree Oil for soothing hydration across face, body, and hair.',
  },
  {
    q: 'What is the relationship between INNOVEXA and Surreal Treasures?',
    a: 'Surreal Treasures is the authentic artisan brand handcrafting farm-to-face skincare and personalized gift hampers in Indore. INNOVEXA is the strategic marketing, digital 3D experience, and brand transformation team expanding Surreal Treasures to high-end audiences globally.',
  },
  {
    q: 'What is the package size and verified price?',
    a: 'The flagship Aloe Vera Gel jar contains 100 grams of pure, lightweight gel and is officially priced at ₹280. Verified directly against Surreal Treasures’ official catalog.',
  },
  {
    q: 'How does shipping and delivery work from Indore?',
    a: 'Orders are shipped nationwide across India from Indore, Madhya Pradesh. Shipping is ₹100 below ₹1,000, ₹60 for orders ₹1,000–₹1,500, and 100% Free for orders above ₹1,500. Orders can be placed directly on surrealtreasures.in or through WhatsApp with instant UPI QR payment.',
  },
  {
    q: 'Can I order customized gift hampers for weddings or corporate events?',
    a: 'Yes! Personalized gifting is our core specialty. You can curate custom assortments of cold-process soaps, whipped butters, solid perfumes, and aloe vera gel in bespoke boxes with handwritten notes and custom branding.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', agreed: true });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('innovexa_waitlist') || '[]');
    existing.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('innovexa_waitlist', JSON.stringify(existing));

    setIsSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#173829', '#C5A880', '#25D366', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="faq" className="py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#398260] bg-[#EEF7F2] px-3.5 py-1.5 rounded-full border border-[#C1DECB]">
              FAQ & Common Questions
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] mt-3 mb-8 tracking-tight">
              Everything You Need <span className="italic text-[#2D6148]">to Know.</span>
            </h2>

            <div className="space-y-3.5">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#DFE8E2] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-normal text-[#122B20] hover:text-[#285E44] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className="w-7 h-7 rounded-full bg-[#F2F7F4] flex items-center justify-center shrink-0 text-[#173829]">
                      {openIdx === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {openIdx === idx && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#506357] font-light leading-relaxed border-t border-[#F2F7F4] animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: "Join The Royal Circle" Private Batch Access Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 md:p-9 border border-[#DFEDE3] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/15 to-transparent pointer-events-none rounded-tr-3xl" />

            <span className="text-[10px] uppercase font-bold tracking-widest text-[#398260] block mb-1">
              VIP Royal Circle · Private Batch Allocations
            </span>
            <h3 className="font-serif text-3xl font-light text-[#122B20] mb-2">
              Join The Royal Circle
            </h3>
            <p className="text-xs text-[#526359] leading-relaxed mb-6 font-light">
              Gain priority access to freshly cold-pressed handcrafted batches, bespoke wedding hampers, and concierge invitations from INNOVEXA & Surreal Treasures.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#EEF7F2] border border-[#C1DECB] text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-2xl text-[#122B20]">Welcome to the Royal Circle</h4>
                <p className="text-xs text-[#398260]">
                  Your VIP membership is confirmed. Our Indore concierge will notify you for priority batch reservations and limited artisanal gifts.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#173829] underline font-medium pt-2 cursor-pointer"
                >
                  Register another VIP email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#697E72] font-semibold mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satyaveer Singh"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-sm text-[#122B20] placeholder-[#9EAEA4] focus:outline-none focus:border-[#173829]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#697E72] font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. satyaveer@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-sm text-[#122B20] placeholder-[#9EAEA4] focus:outline-none focus:border-[#173829]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#697E72] font-semibold mb-1">
                    Custom Gifting / Hamper Request (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Interested in Aloe Vera Gel, wedding hampers, or wholesale inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#DDD5C7] text-sm text-[#122B20] placeholder-[#9EAEA4] focus:outline-none focus:border-[#173829] resize-none"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="agreeCheck"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="mt-0.5 rounded text-[#173829] focus:ring-[#173829]"
                  />
                  <label htmlFor="agreeCheck" className="text-[11px] text-[#697E72] leading-tight cursor-pointer">
                    I agree to receive private batch updates, seasonal gifting previews, and bespoke member offers.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#173829] via-[#205138] to-[#122E20] hover:from-[#1E4833] hover:to-[#2A6548] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:scale-102 flex items-center justify-center gap-2 mt-4 border border-[#D4AF37]/40 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Request VIP Batch Access →</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
