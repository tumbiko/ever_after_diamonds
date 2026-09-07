'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Search, 
  X,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';

// Default luxury assets
import heroModelDefault from '../assets/images/hero_model_portrait_1788678812463.jpg';
import jewelryHandsImg from '../assets/images/jewelry_hands_model_1788678830602.jpg';
import quiltedRingImg from '../assets/images/quilted_gold_ring_1788678850782.jpg';
import eternityBandImg from '../assets/images/eternity_band_1788549296021.jpg';
import heroLuminousImg from '../assets/images/hero_luminous_ring_1788550715750.jpg';
import emeraldCutImg from '../assets/images/emerald_cut_luxury_1788550731926.jpg';

const toSrc = (img: any): string => (typeof img === 'string' ? img : img?.src || '');
const heroModelDefaultSrc = toSrc(heroModelDefault);
const jewelryHandsImgSrc = toSrc(jewelryHandsImg);
const quiltedRingImgSrc = toSrc(quiltedRingImg);
const eternityBandImgSrc = toSrc(eternityBandImg);
const heroLuminousImgSrc = toSrc(heroLuminousImg);
const emeraldCutImgSrc = toSrc(emeraldCutImg);

/**
 * =========================================================================
 * ✦ EDITORIAL HERO CONFIGURATION — CHANGE YOUR IMAGES & COPY IN CODE ✦
 * -------------------------------------------------------------------------
 * To change the centerpiece model image, simply replace `centerModelImage`
 * below with another local image import or any direct image URL string.
 * =========================================================================
 */
export const HERO_CONFIG = {
  // 1. CENTERPIECE MODEL IMAGE (replace here in code anytime):
  centerModelImage: heroModelDefaultSrc,

  // 2. GIANT EDITORIAL BRAND TYPOGRAPHY:
  brandWordLeft: 'Ever',
  brandWordRight: 'After',

  // 3. EDITORIAL COPY:
  manifesto:
    'Each design reflects the dialogue between fine UK craftsmanship and feeling, exploring what it means to express oneself with elegance and depth.',
  sinceTag: '[ Since 2017 ]',

  // 4. RIGHT EVER AFTER QUILTED BAND CARD:
  quiltedRingCard: {
    title: 'The Ever After Quilted Band',
    subtitle: '[ 18K Yellow Gold ]',
    price: '£3,200',
    image: quiltedRingImgSrc
  }
};

interface HeroSectionProps {
  onExploreClick: () => void;
  onGoHome?: () => void;
  onGoShop?: () => void;
  onBespokeClick: () => void;
  onOpenDiamondGuide?: () => void;
  onOpenCart?: () => void;
  onOpenAddProduct?: () => void;
  onOpenShopifyExport?: () => void;
  onOpenAuth?: () => void;
  cartCount?: number;
  onSelectProduct?: (product: Product) => void;
  products?: Product[];
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onGoHome,
  onGoShop,
  onBespokeClick,
  onOpenDiamondGuide,
  onOpenCart,
  onOpenAuth,
  cartCount = 2,
  onSelectProduct,
  products = [],
  searchQuery = '',
  onSearchChange
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Safe fallback to explore
  const triggerShop = onGoShop || onExploreClick;

  // Card 1: New Collection preview carousel
  const [collectionIndex, setCollectionIndex] = useState(0);
  const collectionLooks = [
    {
      title: 'New Collection',
      year: '2026',
      image: jewelryHandsImgSrc,
      subtitle: 'Layered Rings & Fine Chains'
    },
    {
      title: 'Solitaire Edit',
      year: '2026',
      image: heroLuminousImgSrc,
      subtitle: 'Oval Cut Hidden Halo'
    },
    {
      title: 'High Jewellery',
      year: '2026',
      image: emeraldCutImgSrc,
      subtitle: 'Mayfair Trilogy Step-Cut'
    }
  ];

  // Card 2: Advent ring carousel
  const [adventIndex, setAdventIndex] = useState(0);
  const adventRings = [
    {
      name: 'Advent',
      year: '2025',
      image: eternityBandImgSrc
    },
    {
      name: 'Eternity Crest',
      year: '2025',
      image: heroLuminousImgSrc
    },
    {
      name: 'Quilted Band',
      year: '2025',
      image: quiltedRingImgSrc
    },
    {
      name: 'Mayfair Trilogy',
      year: '2025',
      image: emeraldCutImgSrc
    }
  ];

  // Card 3: Open product details
  const handleOpenQuiltedRing = () => {
    const ring = products.find(
      (p) => p.id === 'ead-000' || p.title.toLowerCase().includes('quilted')
    );
    triggerShop();
    if (ring && onSelectProduct) {
      setTimeout(() => onSelectProduct(ring), 60);
    }
  };

  return (
    <section className="relative w-full bg-[#E5D7C5] dark:bg-[#181614] p-3 sm:p-5 md:p-7 lg:p-8 select-none transition-colors">
      
      {/* EDITORIAL POSTER CONTAINER */}
      <div className="relative w-full max-w-[1540px] mx-auto bg-gradient-to-b from-[#EFF1F5] via-[#E8EBF1] to-[#DFE3EB] dark:from-[#1E1B18] dark:via-[#161412] dark:to-[#0E0D0C] rounded-2xl md:rounded-[26px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden border border-[#D5D9E2] dark:border-[#3A332B] transition-colors">
        
        {/* Geometric Linear Circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg
            className="absolute -left-28 top-16 w-[620px] h-[620px] text-[#D0D6E2] dark:text-[#332E2A] opacity-60 dark:opacity-40"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle cx="200" cy="300" r="280" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="300" r="420" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
          </svg>
          <svg
            className="absolute -right-32 top-28 w-[620px] h-[620px] text-[#D0D6E2] dark:text-[#332E2A] opacity-60 dark:opacity-40"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle cx="400" cy="300" r="300" stroke="currentColor" strokeWidth="1" />
            <circle cx="400" cy="300" r="440" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
        </div>

        {/* TOP EDITORIAL NAVIGATION BAR */}
        <header className="relative z-30 px-5 sm:px-10 lg:px-14 pt-5 sm:pt-6 pb-2 flex items-center justify-between text-sm sm:text-base text-[#1C1917] dark:text-[#F5F2EB] font-sans font-semibold tracking-normal">
          
          {/* Left Navigation Tabs */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onGoHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
              className="px-4 py-2 rounded-full bg-black dark:bg-[#D4AF37] text-white dark:text-[#141210] font-bold text-xs sm:text-sm tracking-wide shadow-xs transition-all hover:bg-neutral-800 dark:hover:bg-[#E8C450]"
            >
              Home
            </button>

            {/* Prominent Shop Button */}
            <button 
              onClick={triggerShop}
              className="px-4 py-2 rounded-full bg-white/90 dark:bg-[#211E1A] hover:bg-white dark:hover:bg-[#2A2520] border border-[#D5D9E2] dark:border-[#3D352E] text-black dark:text-[#F5F2EB] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title="Shop all fine rings and diamonds"
            >
              <span>Shop</span>
              <ArrowUpRight className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
            </button>



            <button 
              onClick={triggerShop}
              className="px-3.5 py-2 rounded-full hover:bg-white/80 dark:hover:bg-[#211E1A] text-[#4B5563] dark:text-[#D4CEC4] hover:text-black dark:hover:text-white font-semibold text-xs sm:text-sm transition-all"
            >
              Catalog
            </button>

            <button 
              onClick={onBespokeClick}
              className="px-3.5 py-2 rounded-full hover:bg-white/80 dark:hover:bg-[#211E1A] text-[#4B5563] dark:text-[#D4CEC4] hover:text-black dark:hover:text-white font-semibold text-xs sm:text-sm transition-all"
            >
              About
            </button>


          </nav>

          {/* Right Navigation Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onOpenAuth || onBespokeClick}
              className="px-3.5 py-2 rounded-full hover:bg-white/80 dark:hover:bg-[#211E1A] text-[#4B5563] dark:text-[#D4CEC4] hover:text-black dark:hover:text-white font-semibold text-xs sm:text-sm transition-all hidden sm:inline"
              title="Sign In / Client Profile"
            >
              Sign In
            </button>
            
            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="px-4 py-2 rounded-full bg-white/90 dark:bg-[#211E1A] hover:bg-white dark:hover:bg-[#2A2520] border border-[#D5D9E2] dark:border-[#3D352E] text-black dark:text-[#F5F2EB] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs flex items-center gap-2 active:scale-95"
            >
              <span>Cart</span>
              <span className="w-5 h-5 rounded-full bg-black dark:bg-[#D4AF37] text-white dark:text-[#141210] text-xs font-bold flex items-center justify-center leading-none">
                {cartCount > 0 ? cartCount : 2}
              </span>
            </button>
          </div>
        </header>

        {/* MAIN EDITORIAL STAGE */}
        <div className="relative min-h-[560px] sm:min-h-[660px] md:min-h-[740px] lg:min-h-[820px] flex flex-col justify-between px-5 sm:px-10 lg:px-14 pt-2 pb-8 sm:pb-12">
          
          {/* PROMINENT BRAND HEADLINE */}
          <div className="relative z-30 pt-4 sm:pt-6 pb-2 text-center pointer-events-none">
            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.16em] text-[#1C1917] dark:text-[#F5F2EB] uppercase leading-none drop-shadow-xs">
              EVER AFTER
            </h1>
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-bold tracking-[0.28em] text-[#8C5B32] dark:text-[#D4AF37] uppercase mt-3">
              <span>BESPOKE FINE DIAMOND JEWELLERS</span>
              <span className="text-[#D3CBC0] dark:text-[#574628]">•</span>
              <span>LONDON</span>
            </div>
          </div>

          {/* EDITORIAL COPY CARDS */}
          <div className="relative z-30 grid grid-cols-1 md:grid-cols-12 gap-4 mt-3 sm:mt-5 pointer-events-none">
            {/* Left Manifesto Card */}
            <div className="md:col-span-6 lg:col-span-5 text-left pointer-events-auto">
              <div className="bg-white/95 dark:bg-[#181614]/95 backdrop-blur-md border border-[#D5D9E2] dark:border-[#3D352E] rounded-2xl p-5 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] space-y-2 max-w-lg">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
                  <span>Atelier Philosophy</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-[#1C1917] dark:text-[#F5F2EB] font-semibold">
                  {HERO_CONFIG.manifesto}
                </p>
              </div>
            </div>

            <div className="hidden md:block md:col-span-1 lg:col-span-2" />

            {/* Right Established Tag Card */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-5 justify-end items-start text-right pointer-events-auto">
              <div className="bg-white/95 dark:bg-[#181614]/95 backdrop-blur-md border border-[#D5D9E2] dark:border-[#3D352E] rounded-2xl px-5 py-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-xs sm:text-sm text-[#57534E] dark:text-[#D4CEC4] font-semibold tracking-wide">
                <span className="text-[#8C5B32] dark:text-[#D4AF37] font-bold block uppercase text-xs tracking-wider mb-0.5">Established Heritage</span>
                <span>{HERO_CONFIG.sinceTag} • London Atelier</span>
              </div>
            </div>
          </div>

          {/* 
            CENTERPIECE MODEL PORTRAIT
            Positioned in clear focal flow beneath headline & philosophy cards
          */}
          <div className="relative z-10 my-4 sm:my-6 flex items-center justify-center pointer-events-none">
            <div 
              className="relative w-[320px] sm:w-[440px] md:w-[540px] lg:w-[620px] xl:w-[680px] h-[440px] sm:h-[520px] md:h-[600px] lg:h-[660px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-[#DCE0E8]"
            >
              <img
                src={HERO_CONFIG.centerModelImage}
                alt="Ever After Diamonds fine jewelry model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* 
            =======================================================================
            FEATURED CARDS SECTION (Pushed down cleanly beneath the model image)
            Card 1: New Collection [ 2026 ]
            Card 2: Advent [ 2025 ]
            Card 3: The Ever After Quilted Band [ 18K Yellow Gold ]
            =======================================================================
          */}
          <div className="relative z-30 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-end">
              
              {/* CARD 1: NEW COLLECTION [ 2026 ] */}
              <div className="md:col-span-4 lg:col-span-4">
                <div 
                  onClick={onExploreClick}
                  className="bg-white dark:bg-[#181614] rounded-2xl p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-[#E3E6EC] dark:border-[#3D352E] transition-all hover:shadow-xl cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-black dark:text-[#F5F2EB] tracking-tight">
                      {collectionLooks[collectionIndex].title}
                    </span>
                    <span className="text-xs font-semibold text-[#6B7280] dark:text-[#A3998E]">
                      [{collectionLooks[collectionIndex].year}]
                    </span>
                  </div>

                  {/* Large Focus Thumbnail Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden bg-[#F3F4F6] dark:bg-[#211E1A] mb-3 border border-[#F0ECE4] dark:border-[#2D2720]">
                    <img
                      src={collectionLooks[collectionIndex].image}
                      alt="Collection look preview"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Controls */}
                  <div 
                    className="flex items-center justify-between pt-2 border-t border-[#F1F3F6] dark:border-[#2D2720]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-[#B28359] dark:text-[#D4AF37] font-bold">◆ {collectionLooks[collectionIndex].subtitle}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCollectionIndex((prev) =>
                            prev === 0 ? collectionLooks.length - 1 : prev - 1
                          )
                        }
                        className="p-1.5 rounded-full bg-[#FAF9F6] dark:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] text-[#6B7280] dark:text-[#D4CEC4] hover:text-black dark:hover:text-white transition-colors"
                        aria-label="Previous look"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setCollectionIndex((prev) => (prev + 1) % collectionLooks.length)
                        }
                        className="p-1.5 rounded-full bg-[#FAF9F6] dark:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] text-[#6B7280] dark:text-[#D4CEC4] hover:text-black dark:hover:text-white transition-colors"
                        aria-label="Next look"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: ADVENT [ 2025 ] */}
              <div className="md:col-span-4 lg:col-span-4">
                <div 
                  onClick={onExploreClick}
                  className="bg-white dark:bg-[#181614] rounded-2xl p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-[#E3E6EC] dark:border-[#3D352E] transition-all hover:shadow-xl cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-black dark:text-[#F5F2EB] tracking-tight">
                      {adventRings[adventIndex].name}
                    </span>
                    <span className="text-xs font-semibold text-[#6B7280] dark:text-[#A3998E]">
                      [{adventRings[adventIndex].year}]
                    </span>
                  </div>

                  {/* Large Focus Ring Preview */}
                  <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden bg-[#FAF9F5] dark:bg-[#211E1A] flex items-center justify-center p-3 mb-3 border border-[#F0ECE4] dark:border-[#2D2720]">
                    <img
                      src={adventRings[adventIndex].image}
                      alt="Advent diamond ring"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-lg"
                    />
                  </div>

                  {/* Pagination Dots & Navigation */}
                  <div 
                    className="flex items-center justify-between pt-2 border-t border-[#F1F3F6] dark:border-[#2D2720]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                      {adventRings.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={idx === adventIndex ? 'text-[#B28359] dark:text-[#D4AF37] font-bold' : 'text-[#D1D5DB] dark:text-[#42392F]'}
                        >
                          {idx === adventIndex ? '◆' : '◇'}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setAdventIndex((prev) =>
                            prev === 0 ? adventRings.length - 1 : prev - 1
                          )
                        }
                        className="p-1.5 rounded-full bg-[#FAF9F6] dark:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] text-[#6B7280] dark:text-[#D4CEC4] hover:text-black dark:hover:text-white transition-colors"
                        aria-label="Previous ring"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setAdventIndex((prev) => (prev + 1) % adventRings.length)
                        }
                        className="p-1.5 rounded-full bg-[#FAF9F6] dark:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] text-[#6B7280] dark:text-[#D4CEC4] hover:text-black dark:hover:text-white transition-colors"
                        aria-label="Next ring"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: THE EVER AFTER QUILTED BAND [ 18K YELLOW GOLD ] */}
              <div className="md:col-span-4 lg:col-span-4">
                <div 
                  onClick={handleOpenQuiltedRing}
                  className="bg-white dark:bg-[#181614] rounded-2xl p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-[#E3E6EC] dark:border-[#3D352E] transition-all hover:shadow-xl cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-black dark:text-[#F5F2EB] tracking-tight">
                      {HERO_CONFIG.quiltedRingCard.title}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#6B7280] dark:text-[#A3998E] mb-3">
                    {HERO_CONFIG.quiltedRingCard.subtitle}
                  </div>

                  {/* Large Focus Ring Cutout Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden bg-[#FAF9F5] dark:bg-[#211E1A] flex items-center justify-center p-3 mb-3 border border-[#F0ECE4] dark:border-[#2D2720]">
                    <img
                      src={HERO_CONFIG.quiltedRingCard.image}
                      alt="The Ever After Quilted Band 18K yellow gold"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-lg"
                    />
                  </div>

                  {/* Price & Solid Black Square CTA */}
                  <div className="flex items-end justify-between pt-2 border-t border-[#F1F3F6] dark:border-[#2D2720]">
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block font-medium">
                        From
                      </span>
                      <span className="font-sans text-base sm:text-lg font-bold text-[#B28359] dark:text-[#D4AF37] tracking-tight">
                        {HERO_CONFIG.quiltedRingCard.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuiltedRing();
                      }}
                      className="w-10 h-10 rounded-xl bg-black dark:bg-[#D4AF37] hover:bg-neutral-800 dark:hover:bg-[#E8C450] text-white dark:text-[#141210] flex items-center justify-center transition-transform active:scale-95 shadow-sm"
                      aria-label="View ring details"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Prominent Large CTA Button */}
            <div className="flex justify-center pt-8 pb-4">
              <button
                onClick={triggerShop}
                className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-black dark:bg-[#D4AF37] hover:bg-[#1C1917] dark:hover:bg-[#E8C450] text-white dark:text-[#141210] text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Enter Storefront & Jewellery Catalog</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
