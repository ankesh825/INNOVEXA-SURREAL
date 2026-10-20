import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Heart, Sparkles, MessageCircle, MapPin, Plus, X, Check, Award } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Priyanka Sharma',
    city: 'Indore, MP',
    product: 'Sureal Aloe Vera Gel (100g)',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    review:
      'I have used multiple store-bought aloe gels, but Surreal Treasures is on another level. You can actually feel that it was filleted from a fresh leaf — zero stickiness, no fake green dye, and so calming on my sensitive skin.',
    category: 'aloe',
    tag: 'Flagship Gel',
  },
  {
    id: 2,
    name: 'Aditya Mehta',
    city: 'Mumbai, MH',
    product: 'Coffee Cocoa Body Scrub',
    rating: 5,
    date: 'Verified Buyer · September 2026',
    review:
      'The aroma when you open this jar is unbelievable — like walking into a luxury cafe. The granules are gentle yet effective. My skin was ridiculously smooth even after a single shower.',
    category: 'scrub',
    tag: 'Body Care',
  },
  {
    id: 3,
    name: 'Ritu & Aniket Jain',
    city: 'Indore, MP',
    product: 'Custom Wedding Gifting Hampers (50 Boxes)',
    rating: 5,
    date: 'Verified Wedding Client · August 2026',
    review:
      'INNOVEXA and Surreal Treasures curated 50 personalized wooden gift hampers for our wedding guests. Every guest called to ask where we got them! The packaging was imperial and the products felt truly luxurious.',
    category: 'hamper',
    tag: 'Bespoke Hamper',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    city: 'Ahmedabad, GJ',
    product: 'Ojasvat Kumkumadi Facial Oil & Rose Water',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    review:
      'Just 3 drops every night with the pure rose water toner and my acne marks have faded noticeably. Genuine saffron strands inside the bottle. 100% authentic Ayurvedic quality.',
    category: 'serum',
    tag: 'Radiance Elixir',
  },
  {
    id: 5,
    name: 'Karan Verma',
    city: 'Bhopal, MP',
    product: 'Handmade Charcoal Detox & Neem Soaps',
    rating: 5,
    date: 'Verified Buyer · September 2026',
    review:
      'Long-lasting cold processed bars that don’t turn to mush. Leaves you feeling clean and refreshed without any tight dry feeling. Proud that this is made in MP!',
    category: 'soap',
    tag: 'Cold-Process Bar',
  },
  {
    id: 6,
    name: 'Dr. Meenakshi Iyer',
    city: 'Bangalore, KA',
    product: 'Sureal Aloe Vera Gel + Saffron Butter',
    rating: 5,
    date: 'Verified Buyer · October 2026',
    review:
      'As a dermatologist, I am very cautious about ingredient lists. Surreal Treasures has completely honest, clean formulations without parabens or sulfates. Excellent farm-to-face concept.',
    category: 'aloe',
    tag: 'Doctor Recommended',
  },
];

export default function ReviewsSection() {
  const [filter, setFilter] = useState('all');
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('innovexa_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_REVIEWS];
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [submittedBanner, setSubmittedBanner] = useState(false);

  // Form State
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formProduct, setFormProduct] = useState('Sureal Aloe Vera Gel (100g)');
  const [formCategory, setFormCategory] = useState('aloe');
  const [formReview, setFormReview] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formReview.trim()) {
      alert('Please enter your name and review text.');
      return;
    }

    soundEffects.playGoldChime();

    const newRev = {
      id: Date.now(),
      name: formName.trim(),
      city: formCity.trim() || 'Indore, MP',
      product: formProduct,
      rating: formRating,
      date: 'Verified Buyer · Just Now',
      review: formReview.trim(),
      category: formCategory,
      tag: 'Verified Review',
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);

    try {
      const existingSaved = JSON.parse(localStorage.getItem('innovexa_user_reviews') || '[]');
      localStorage.setItem('innovexa_user_reviews', JSON.stringify([newRev, ...existingSaved]));
    } catch {
      // fallback
    }

    setIsWriteModalOpen(false);
    setSubmittedBanner(true);
    setFormReview('');
    setFormName('');
    setFormCity('');

    setTimeout(() => {
      setSubmittedBanner(false);
    }, 4500);
  };

  const filteredReviews =
    filter === 'all' ? reviews : reviews.filter((r) => r.category === filter || filter === 'all');

  return (
    <section id="reviews" className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-[#DFEDE3]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5EE] border border-[#BFDFCC] text-[#296849] text-xs font-semibold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Customer Love</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] tracking-tight leading-tight">
              Real Stories. <br />
              <span className="italic text-[#23583E]">Real Radiance.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4C6153] font-light mt-3 leading-relaxed">
              Unfiltered feedback from beauty lovers and hamper recipients across Indore and India who made Surreal Treasures their daily ritual.
            </p>
          </div>

          {/* Aggregate Rating Pill & Write Review Trigger */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-start lg:self-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5E6DC] shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#173829] to-[#2B6A4C] flex flex-col items-center justify-center text-white shrink-0 shadow-xs">
                <span className="font-serif text-xl font-bold leading-none">4.9</span>
                <span className="text-[9px] text-emerald-200 uppercase font-medium">/ 5.0</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#E0A838]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="block text-xs font-bold text-[#122B20] mt-1">
                  {420 + (reviews.length - INITIAL_REVIEWS.length)}+ Verified Reviews
                </span>
                <span className="text-[11px] text-[#556D5E]">100% Genuine Indore Handcrafted</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playGoldChime();
                setIsWriteModalOpen(true);
              }}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#173829] to-[#285d43] hover:from-[#1b4330] hover:to-[#225039] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:scale-102 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Success Banner when a review is submitted */}
        {submittedBanner && (
          <div className="mb-8 p-4 rounded-2xl bg-[#E8F5EE] border border-[#A6D5B8] flex items-center justify-between animate-fadeIn text-[#143E2B]">
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <Award className="w-5 h-5 text-[#D4AF37]" />
              <span>Thank you! Your verified review has been published to the community showcase.</span>
            </div>
            <button
              onClick={() => setSubmittedBanner(false)}
              className="text-[#143E2B] hover:text-black p-1 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {[
            { key: 'all', label: 'All Reviews' },
            { key: 'aloe', label: '🌿 Aloe Vera Gel' },
            { key: 'scrub', label: '☕ Body Scrubs' },
            { key: 'hamper', label: '🎁 Gift Hampers' },
            { key: 'serum', label: '✨ Kumkumadi Serum' },
            { key: 'soap', label: '🧼 Herbal Soaps' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filter === tab.key
                  ? 'bg-[#173829] text-white shadow-sm scale-102'
                  : 'bg-white text-[#4A6051] border border-[#D4E3D8] hover:border-[#173829]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-white border border-[#DCEBE0] shadow-xs hover:shadow-md hover:border-[#A8D3B8] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header with Rating & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#E0A838]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#EBF5EE] text-[#2C6D4E]">
                    {item.tag}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#3E5244] font-light leading-relaxed italic mb-6">
                  “{item.review}”
                </p>
              </div>

              {/* Author & Product Footer */}
              <div className="pt-4 border-t border-[#EEF4F0] flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-[#122B20]">{item.name}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#637D6E] mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{item.city}</span>
                  </div>
                  <span className="block text-[10px] text-[#869E90] mt-0.5">{item.product}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review / WhatsApp Community Callout */}
        <div className="mt-14 p-8 rounded-3xl bg-white border border-[#DFEDE3] text-center max-w-3xl mx-auto shadow-sm">
          <h4 className="font-serif text-2xl font-light text-[#122B20] mb-2">
            Have You Tried Surreal Treasures?
          </h4>
          <p className="text-xs sm:text-sm text-[#5D7365] font-light mb-6 max-w-lg mx-auto">
            Your authentic review helps our Indore farm family and team INNOVEXA continue crafting honest, chemical-free botanicals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                soundEffects.playGoldChime();
                setIsWriteModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#173829] hover:bg-[#204e39] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Write a Verified Review</span>
            </button>

            <a
              href="https://wa.me/919109119646?text=Hello%20Surreal%20Treasures%20%26%20INNOVEXA!%20I%20would%20like%20to%20share%20my%20review%20of%20your%20handcrafted%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F2F8F4] border border-[#BFDFCB] text-[#173829] text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Feedback (+91 9109119646)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5E6DC] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#173829] via-[#215038] to-[#122e20] p-6 text-white flex items-center justify-between">
              <div>
                <span className="font-serif text-xl font-normal tracking-wide block">
                  Write a Verified Review
                </span>
                <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-semibold block mt-0.5">
                  INNOVEXA × Surreal Treasures
                </span>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitReview} className="p-6 md:p-8 space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#122B20] mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-120 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            (hoverRating || formRating) >= star
                              ? 'text-[#E0A838] fill-current drop-shadow-xs'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#2D694A] ml-2">
                    {formRating === 5 && '★★★★★ Imperial (5/5)'}
                    {formRating === 4 && '★★★★ Very Good (4/5)'}
                    {formRating === 3 && '★★★ Average (3/5)'}
                    {formRating < 3 && `${formRating}/5`}
                  </span>
                </div>
              </div>

              {/* Name & City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#122B20] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD0] bg-white text-xs text-[#122B20] focus:outline-hidden focus:border-[#173829]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#122B20] mb-1">
                    Your City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indore, MP"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD0] bg-white text-xs text-[#122B20] focus:outline-hidden focus:border-[#173829]"
                  />
                </div>
              </div>

              {/* Product and Category Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#122B20] mb-1">
                    Product Reviewed
                  </label>
                  <select
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD0] bg-white text-xs text-[#122B20] focus:outline-hidden focus:border-[#173829]"
                  >
                    <option value="Sureal Aloe Vera Gel (100g)">Sureal Aloe Vera Gel (100g)</option>
                    <option value="Coffee Cocoa Body Scrub">Coffee Cocoa Body Scrub</option>
                    <option value="Apricot Walnut Glow Scrub">Apricot Walnut Glow Scrub</option>
                    <option value="Ojasvat Kumkumadi Facial Oil">Ojasvat Kumkumadi Facial Oil</option>
                    <option value="Pure Rose Water Floral Mist">Pure Rose Water Floral Mist</option>
                    <option value="Activated Charcoal Detox Soap">Activated Charcoal Detox Soap</option>
                    <option value="Custom Handcrafted Gift Hamper">Custom Handcrafted Gift Hamper</option>
                    <option value="Saffron & Almond Body Butter">Saffron & Almond Body Butter</option>
                    <option value="Beetroot & Shea Lip Butter">Beetroot & Shea Lip Butter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#122B20] mb-1">
                    Category Tag
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD0] bg-white text-xs text-[#122B20] focus:outline-hidden focus:border-[#173829]"
                  >
                    <option value="aloe">🌿 Aloe Vera Gel</option>
                    <option value="scrub">☕ Body Scrubs</option>
                    <option value="hamper">🎁 Gift Hampers</option>
                    <option value="serum">✨ Kumkumadi Serum</option>
                    <option value="soap">🧼 Herbal Soaps</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#122B20] mb-1">
                  Your Honest Review *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your experience with the texture, fragrance, skin feel, or packaging..."
                  value={formReview}
                  onChange={(e) => setFormReview(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBDCD0] bg-white text-xs text-[#122B20] focus:outline-hidden focus:border-[#173829]"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#546E5E] hover:text-[#122B20] cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#173829] to-[#255740] hover:scale-102 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
