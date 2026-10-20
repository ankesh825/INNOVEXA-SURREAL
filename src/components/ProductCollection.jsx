import React, { useState, useRef, useMemo } from 'react';
import { products } from '../data/products';
import {
  Sparkles,
  Eye,
  ShoppingBag,
  MessageSquare,
  ExternalLink,
  ArrowRight,
  Crown,
  Search,
  X,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

const CATEGORIES = [
  { id: 'all', label: 'All Formulations' },
  { id: 'face', label: 'Face Care' },
  { id: 'body', label: 'Body & Scrubs' },
  { id: 'soap', label: 'Handmade Soaps' },
  { id: 'fragrance', label: 'Solid Fragrances' },
  { id: 'hamper', label: 'Curated Hampers' },
];

function ProductCard3D({ prod, onOpenDetail, onExplore3D, onAddToCart }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -10; // max -10 to +10 deg
    const ry = ((x - centerX) / centerX) * 10;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    setTilt({ rx, ry, gx, gy, hovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-3xl p-4 md:p-5 border border-[#dfede3] shadow-sm hover:shadow-[0_20px_45px_rgba(18,43,32,0.12)] transition-shadow duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
      style={{
        transform: tilt.hovered
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        transition: tilt.hovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
    >
      {/* Dynamic Specular 3D Glare Sheen */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
        style={{
          opacity: tilt.hovered ? 0.35 : 0,
          background: `radial-gradient(circle 220px at ${tilt.gx}% ${tilt.gy}%, rgba(255, 255, 255, 0.85), transparent 75%)`,
        }}
      />

      {/* Subtle Royal Gold Border Glow on Hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[#D4AF37] transition-opacity duration-300 z-20"
        style={{ opacity: tilt.hovered ? 0.6 : 0 }}
      />

      <div>
        {/* Product Image Frame with Physical 3D Z-Lift */}
        <div
          className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#fbf8f4] via-[#f5fbf7] to-[#eef6f1] overflow-hidden relative mb-4 flex items-center justify-center p-3 transition-transform duration-300"
          style={{
            transform: tilt.hovered ? 'translateZ(30px)' : 'translateZ(0px)',
          }}
        >
          <img
            src={prod.image || '/images/real_sureal_jar_only.png'}
            alt={prod.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/real_sureal_jar_only.png';
            }}
          />

          {/* Tag Pill with 3D Z-Lift */}
          {prod.tag && (
            <span
              className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#122b20]/90 text-white backdrop-blur-xs shadow-xs transition-transform duration-300"
              style={{
                transform: tilt.hovered ? 'translateZ(42px)' : 'translateZ(0px)',
              }}
            >
              {prod.tag}
            </span>
          )}

          {/* Net Weight Pill */}
          {prod.netWeight && (
            <span
              className="absolute bottom-3 left-3 text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/90 text-[#398260] border border-[#cbe1d3] shadow-2xs transition-transform duration-300"
              style={{
                transform: tilt.hovered ? 'translateZ(36px)' : 'translateZ(0px)',
              }}
            >
              {prod.netWeight}
            </span>
          )}

          {/* Quick View Hover Overlay */}
          <button
            onClick={() => onOpenDetail(prod)}
            className="absolute inset-0 bg-[#122b20]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-xs cursor-pointer"
          >
            <Eye className="w-4 h-4 text-emerald-300" />
            <span>Quick Details</span>
          </button>
        </div>

        {/* Category & Title */}
        <div
          className="transition-transform duration-300"
          style={{ transform: tilt.hovered ? 'translateZ(18px)' : 'translateZ(0px)' }}
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#6a8777] block mb-1">
            {prod.type}
          </span>

          <h3 className="font-serif text-xl font-normal text-[#122b20] leading-snug mb-1 group-hover:text-[#285e44] transition-colors line-clamp-1">
            {prod.name}
          </h3>

          <p className="text-xs text-[#526359] line-clamp-2 mb-4 font-light min-h-[32px]">
            {prod.desc || prod.overview}
          </p>
        </div>
      </div>

      {/* Price & Action Footer */}
      <div
        className="pt-3 border-t border-[#f0f4f1] flex items-center justify-between gap-3 transition-transform duration-300 relative z-20"
        style={{ transform: tilt.hovered ? 'translateZ(24px)' : 'translateZ(0px)' }}
      >
        <div>
          <span className="text-[10px] text-[#718b7c] uppercase tracking-wider block">Price</span>
          <span className="font-serif text-xl font-semibold text-[#173829]">₹{prod.price}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Add to Bag Button */}
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(prod)}
              className="p-2 rounded-full bg-[#173829] hover:bg-[#205138] text-[#D4AF37] transition-all shadow-xs hover:scale-105 cursor-pointer"
              title={`Add ${prod.name} to Bag`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          )}

          {prod.id === 1 ? (
            <button
              onClick={onExplore3D}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#eef7f2] to-[#dcf0e2] hover:from-[#dcf0e2] hover:to-[#cce8d4] text-[#173829] text-[11px] font-bold uppercase tracking-wider transition-all border border-[#b2d9be] shadow-xs flex items-center gap-1.5 cursor-pointer"
              title="Inspect Aloe Vera Gel in 360° 3D Studio"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>3D Studio</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenDetail(prod)}
              className="px-3 py-1.5 rounded-full bg-[#f4f7f5] hover:bg-[#e4ede7] text-[#173829] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Details
            </button>
          )}

          {/* WhatsApp Direct Order Button */}
          <a
            href={`https://wa.me/919109119646?text=${encodeURIComponent(
              `Hello Surreal Treasures & INNOVEXA! I would like to order "${prod.name}" (₹${prod.price}) showcased on the INNOVEXA website.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all shadow-xs hover:scale-105"
            title={`Order ${prod.name} on WhatsApp`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductCollection({ onSelectProduct, onOpenDetail, onExplore3D, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categoryCounts = useMemo(() => ({
    all: products.length,
    face: products.filter((p) => p.type === 'face').length,
    body: products.filter((p) => p.type === 'body').length,
    soap: products.filter((p) => p.type === 'soap' || p.type === 'lip').length,
    fragrance: products.filter((p) => p.type === 'fragrance').length,
    hamper: products.filter((p) => p.type === 'hamper').length,
  }), []);

  const processedProducts = useMemo(() => {
    let result = products.filter((prod) => {
      // Category filter
      if (activeCategory === 'soap') {
        if (prod.type !== 'soap' && prod.type !== 'lip') return false;
      } else if (activeCategory !== 'all') {
        if (prod.type !== activeCategory) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = prod.name.toLowerCase().includes(q);
        const inDesc = (prod.desc || '').toLowerCase().includes(q);
        const inOverview = (prod.overview || '').toLowerCase().includes(q);
        const inIngredients = (prod.ingredients || []).some((ing) => ing.toLowerCase().includes(q));
        if (!inName && !inDesc && !inOverview && !inIngredients) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-24 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#398260] bg-[#eef7f2] px-3.5 py-1.5 rounded-full border border-[#c1decb] inline-flex items-center gap-1.5 shadow-2xs">
              <Crown className="w-3 h-3 text-[#D4AF37]" />
              <span>Official Catalog · 19 Botanical Formulations</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122b20] mt-3 tracking-tight">
              Skincare for Every Mood, <span className="italic text-[#2d6148]">Every Day.</span>
            </h2>
            <p className="text-sm md:text-base text-[#56685e] font-light max-w-xl mt-2 leading-relaxed">
              Every item is handmade in small batches in Indore using clean, natural botanicals. Hover over any product to inspect in tactile 3D perspective.
            </p>
          </div>

          <a
            href="https://surrealtreasures.in/#shop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173829] hover:text-[#398260] transition-colors self-start md:self-auto group"
          >
            <span>Visit Official Surreal Treasures Store</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Live Search & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 mb-8">
          {/* Live Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#698877] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ingredient or product (e.g. Aloe, Kumkumadi, Coffee, Neem)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#D5E6DC] text-xs text-[#122B20] placeholder-[#81998B] focus:outline-none focus:border-[#173829] shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown & Result Count */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-[#698877] font-medium">
              Showing <strong>{processedProducts.length}</strong> of {products.length}
            </span>

            <div className="flex items-center gap-1.5 bg-white border border-[#D5E6DC] rounded-full px-3 py-1.5 text-xs text-[#173829] shadow-2xs">
              <ArrowUpDown className="w-3 h-3 text-[#398260]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold uppercase tracking-wider focus:outline-none cursor-pointer text-[#173829]"
              >
                <option value="featured">Featured Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs with Counter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playSoftClick();
                setActiveCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#173829] text-white shadow-md'
                  : 'bg-white text-[#4a5e52] border border-[#dce5df] hover:bg-[#edf5f0]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                  activeCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#122B20]'
                    : 'bg-[#EEF7F2] text-[#2C6D4E]'
                }`}
              >
                {categoryCounts[cat.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid with 3D Tilt Cards or Empty State */}
        {processedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#DFEDE3] shadow-xs p-8 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EEF7F2] text-[#173829] flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="font-serif text-2xl font-light text-[#122B20]">
              No Botanical Formulations Found
            </h3>
            <p className="text-xs text-[#5D7365] font-light leading-relaxed">
              We couldn't find any products matching "<strong>{searchQuery}</strong>". Try searching for <em>Aloe, Scrub, Kumkumadi, Butter</em>, or reset your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#173829] hover:bg-[#225039] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Reset Filters & Search</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {processedProducts.map((prod) => (
              <ProductCard3D
                key={prod.id}
                prod={prod}
                onOpenDetail={onOpenDetail}
                onExplore3D={onExplore3D}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
