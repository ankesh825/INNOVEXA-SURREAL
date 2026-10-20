import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Product3DViewer from './components/Product3DViewer';
import ProductSpecsCard from './components/ProductSpecsCard';
import BotanicalBento from './components/BotanicalBento';
import TextureSimulator from './components/TextureSimulator';
import PurityComparison from './components/PurityComparison';
import SkinHydrationSlider from './components/SkinHydrationSlider';
import VideoSection from './components/VideoSection';
import RitualGuide from './components/RitualGuide';
import ProductCollection from './components/ProductCollection';
import BrandStory from './components/BrandStory';
import HamperBuilder from './components/HamperBuilder';
import ReviewsSection from './components/ReviewsSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppConcierge from './components/WhatsAppConcierge';
import LiveDispatchTicker from './components/LiveDispatchTicker';
import RitualQuizModal from './components/RitualQuizModal';
import ProductDetailModal from './components/ProductDetailModal';
import VideoModal from './components/VideoModal';
import CartDrawer from './components/CartDrawer';
import BatchCertificateModal from './components/BatchCertificateModal';
import { products } from './data/products';
import { ShoppingBag, Crown, ChevronUp } from 'lucide-react';
import { soundEffects } from './utils/soundEffects';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll Progress and Back-to-Top State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Items State with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('innovexa_royal_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('innovexa_royal_cart', JSON.stringify(cartItems));
    } catch {
      // safe fallback
    }
  }, [cartItems]);

  // Reference for 3D stage smooth scroll
  const stageRef = useRef(null);

  const heroProduct = products.find((p) => p.id === 1) || products[0];

  const handleScrollTo3D = () => {
    if (stageRef.current) {
      stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenVip = () => {
    const faqElem = document.getElementById('faq');
    if (faqElem) {
      faqElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    soundEffects.playGoldChime();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1E1D] flex flex-col font-sans selection:bg-[#173829] selection:text-white relative">
      {/* Royal Golden Reading / Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#FFF3C4] to-[#D4AF37] z-[60] shadow-[0_1px_6px_rgba(212,175,55,0.5)] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Navbar with 3 Royal Categories, Bag Trigger & Audio */}
      <Navbar
        onOpenVideo={() => setIsVideoModalOpen(true)}
        onExplore3D={handleScrollTo3D}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Full-Screen Hero Section with 3D Parallax & Floating Feature Cards */}
        <Hero
          onOpenVideo={() => setIsVideoModalOpen(true)}
          onExploreClick={handleScrollTo3D}
          onOpenQuiz={() => setIsQuizModalOpen(true)}
        />

        {/* 360° Interactive Product Stage (Centerpiece) */}
        <section
          ref={stageRef}
          id="interactive-3d"
          className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 scroll-mt-20"
        >
          {/* Section Kicker */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#398260] bg-[#EEF7F2] px-3.5 py-1.5 rounded-full border border-[#C1DECB]">
              Interactive 360° 3D Studio
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#122B20] mt-3 tracking-tight">
              Hold the Jar in <span className="italic text-[#2D6148]">Your Hands.</span>
            </h2>
            <p className="text-sm text-[#5B6E62] font-light mt-2">
              Rotate in full 360 degrees, inspect the frosted jade glass, lift the lid to view the fresh aloe gel, separate layers, and inspect laboratory purity.
            </p>
          </div>

          {/* 3D Viewer & Specification Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 3D WebGL Canvas Stage */}
            <div className="lg:col-span-7 h-[480px] sm:h-[540px] lg:h-auto">
              <Product3DViewer
                activeProduct={heroProduct}
                onOpenVideo={() => setIsVideoModalOpen(true)}
              />
            </div>

            {/* Product Specifications & Order Card */}
            <div className="lg:col-span-5 flex flex-col">
              <ProductSpecsCard
                product={heroProduct}
                onOpenVideo={() => setIsVideoModalOpen(true)}
                onOpenWaitlist={handleOpenVip}
                onOpenDetail={() => setSelectedProduct(heroProduct)}
                onAddToCart={(prod) => handleAddToCart(prod)}
                onOpenCertificate={() => setIsCertificateModalOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* Botanical Bento (Aloe Leaves, Texture, Balance) */}
        <BotanicalBento onOpenDetail={() => setSelectedProduct(heroProduct)} />

        {/* The Aloe Apothecary Lab & Live Gel Viscosity Simulator */}
        <TextureSimulator onOrderHero={() => handleAddToCart(heroProduct)} />

        {/* Gold Standard Purity Comparison: Commercial vs Surreal Treasures */}
        <PurityComparison onExplore3D={handleScrollTo3D} />

        {/* Interactive 7-Day Skin Hydration & Barrier Transformation Slider */}
        <SkinHydrationSlider onOrderHero={() => handleAddToCart(heroProduct)} />

        {/* 3D Motion Video & Campaign Films (User's Drive Videos) */}
        <VideoSection />

        {/* Interactive Skincare Ritual Routine Guide */}
        <RitualGuide
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
        />

        {/* Full Official Products Collection Grid (19 Verified Items) */}
        <ProductCollection
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onOpenDetail={(prod) => setSelectedProduct(prod)}
          onExplore3D={handleScrollTo3D}
          onAddToCart={(prod) => handleAddToCart(prod)}
        />

        {/* Interactive Custom Hamper Studio */}
        <HamperBuilder onAddToCart={(hamper) => handleAddToCart(hamper)} />

        {/* Brand Story & Dedicated INNOVEXA Team Spotlight */}
        <BrandStory />

        {/* Verified Customer Reviews & Community Ratings */}
        <ReviewsSection />

        {/* Common Questions & VIP Royal Circle */}
        <FAQ />
      </main>

      {/* Luxury Footer with INNOVEXA Team Branding */}
      <Footer
        onExplore3D={handleScrollTo3D}
        onOpenVideo={() => setIsVideoModalOpen(true)}
      />

      {/* Floating Luxury Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => {
            soundEffects.playWaterDrop();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-24 left-6 z-40 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-[#173829] shadow-2xl border border-[#D4AF37]/50 flex items-center justify-center hover:scale-110 hover:bg-[#173829] hover:text-[#D4AF37] transition-all cursor-pointer group"
          title="Return to Crown / Top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Floating Persistent Royal Cart Bag Pill */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => {
            soundEffects.playGoldChime();
            setIsCartOpen(true);
          }}
          className="fixed bottom-24 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-[#173829] to-[#245b40] text-white shadow-2xl border border-[#D4AF37]/50 flex items-center gap-2.5 hover:scale-105 transition-all cursor-pointer animate-bounce"
          title="Open Royal Shopping Bag"
        >
          <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Bag ({totalCartCount})
          </span>
          <span className="text-xs text-[#D4AF37] font-serif font-bold">
            · ₹{cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
          </span>
        </button>
      )}

      {/* Floating Luxury WhatsApp Concierge */}
      <WhatsAppConcierge />

      {/* Live Handcrafted Batch Dispatch Ticker (Social Proof) */}
      <LiveDispatchTicker />

      {/* Slide-out Royal Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onExploreProducts={handleScrollToCollection}
      />

      {/* Official Batch #04 Botanical Certificate Modal */}
      <BatchCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />

      {/* Personalized Skincare Ritual Quiz Modal */}
      <RitualQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onAddToCart={(prod) => handleAddToCart(prod)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onExplore3D={handleScrollTo3D}
        onAddToCart={(prod) => handleAddToCart(prod)}
      />

      {/* 3D Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}
