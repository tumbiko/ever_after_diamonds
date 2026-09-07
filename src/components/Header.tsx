'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  Instagram, 
  PlusCircle, 
  DownloadCloud, 
  Sparkles, 
  Menu, 
  X,
  MessageCircle,
  Mail,
  Home,
  ChevronDown,
  SlidersHorizontal,
  User
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import profileBadgeImg from '../assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  onOpenDiamondGuide: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGoHome?: () => void;
  onOpenAuth?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenConsultation,
  onOpenDiamondGuide,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onGoHome,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'engagement-rings', label: 'Engagement Rings' },
    { id: 'wedding-bands', label: 'Wedding Bands' },
    { id: 'fine-jewelry', label: 'Fine Jewellery' },
    { id: 'bespoke-creations', label: 'Bespoke' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#141210]/95 backdrop-blur-md border-b border-[#EAE4DA] dark:border-[#332E2A] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-colors">
      {/* Specular Ambient Rim Light Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#B28359]/40 via-[#0284C7]/30 to-transparent" />

      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#F7F4EE] dark:bg-[#1C1917] border-b border-[#ECE6DB] dark:border-[#2D2720] text-xs sm:text-sm uppercase tracking-[0.14em] py-2 px-4 text-[#57534E] dark:text-[#D4CEC4] transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="flex items-center gap-1.5 text-[#8C5B32] dark:text-[#D4AF37] font-semibold shrink-0">
              <Sparkles className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
              <span>London Fine Jewellers</span>
            </span>
            <span className="hidden sm:inline text-[#D6CEBF] dark:text-[#574628]">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#0284C7] dark:text-[#38BDF8] font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] dark:bg-[#38BDF8]" />
              <span>GIA & IGI Certified</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm tracking-wider shrink-0 font-medium">
            <a 
              href="tel:02081666365" 
              className="hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#57534E] dark:text-[#D4CEC4]"
              title="Call Office: 020 8166 6365"
            >
              <Phone className="w-3.5 h-3.5 text-[#B28359] dark:text-[#D4AF37]" />
              <span>020 8166 6365</span>
            </a>
            <span className="text-[#D6CEBF] dark:text-[#42392F]">/</span>
            <a 
              href="https://wa.me/447737806748" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-[#57534E] dark:text-[#D4CEC4]"
              title="WhatsApp: 07737 806748"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>07737 806748</span>
            </a>
            <span className="hidden lg:inline text-[#D6CEBF] dark:text-[#42392F]">/</span>
            <a 
              href="mailto:info@everafterdiamonds.co.uk" 
              className="hidden lg:flex items-center gap-1.5 hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors text-[#57534E] dark:text-[#D4CEC4]"
              title="Email: info@everafterdiamonds.co.uk"
            >
              <Mail className="w-3.5 h-3.5 text-[#B28359] dark:text-[#D4AF37]" />
              <span>info@everafterdiamonds.co.uk</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Mobile menu trigger */}
        <button 
          id="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#1C1917] dark:text-[#F5F2EB] hover:text-[#B28359] transition-colors rounded-full hover:bg-[#F5F1E9] dark:hover:bg-[#24201D] shrink-0"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Name */}
        <button 
          type="button" 
          onClick={onGoHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))} 
          className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer shrink-0"
          title="Return to Home Page"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-[#B28359] via-[#0284C7]/40 to-[#B28359] shadow-xs group-hover:scale-105 transition-transform duration-300">
            <img 
              src={profileBadgeImgSrc} 
              alt="Ever After Diamonds Emblem" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full bg-white dark:bg-[#1C1917]"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif-luxury text-lg sm:text-xl md:text-2xl font-bold tracking-[0.14em] text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#B28359] dark:group-hover:text-[#D4AF37] transition-colors uppercase leading-tight">
              EVER AFTER
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs tracking-[0.22em] uppercase font-bold">
              <span className="text-[#8C5B32] dark:text-[#D4AF37]">DIAMONDS</span>
              <span className="text-[#D3CBC0] dark:text-[#574628]">•</span>
              <span className="text-[#78716C] dark:text-[#A3998E]">LONDON</span>
            </div>
          </div>
        </button>

        {/* Home Link Pill */}
        {onGoHome && (
          <button
            onClick={onGoHome}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#1C1917] dark:text-[#F5F2EB] hover:bg-[#F5F2EB] dark:hover:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#181614] shrink-0"
            title="Return to Home Page"
          >
            <Home className="w-4 h-4 text-[#8C5B32] dark:text-[#D4AF37]" />
            <span>Home</span>
          </button>
        )}

        {/* CENTER PROMINENT SEARCH BAR - INCREASED HEIGHT & FONT */}
        <div className="flex-1 max-w-xl mx-1 sm:mx-3 relative">
          <div className="relative flex items-center bg-[#FAF9F5] dark:bg-[#181614] border border-[#DED7CB] dark:border-[#3A332B] focus-within:border-[#B28359] dark:focus-within:border-[#D4AF37] focus-within:bg-white dark:focus-within:bg-[#211E1A] rounded-full transition-all shadow-inner px-4 py-2 sm:py-2.5">
            <Search className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search rings, diamonds, fine jewelry..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none placeholder-[#8C827A] dark:placeholder-[#78716C] font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-white ml-1.5 p-1"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Utility Toolbar */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* THEME TOGGLE: Hidden on small screens (< md), shown on md+ */}
          <div className="hidden md:flex items-center">
            <ThemeToggle variant="toggle" />
          </div>

          {/* Diamond 4Cs Education Guide */}
          <button
            onClick={onOpenDiamondGuide}
            className="p-2 text-[#57534E] dark:text-[#D4CEC4] hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors rounded-full hover:bg-[#F0F9FF] dark:hover:bg-[#1E293B] hidden lg:flex items-center gap-1.5"
            title="The 4Cs Diamond Education"
          >
            <Sparkles className="w-4.5 h-4.5 text-[#0284C7] dark:text-[#38BDF8]" />
            <span className="hidden xl:inline text-xs sm:text-sm uppercase tracking-wider font-semibold">4Cs</span>
          </button>

          {/* My Account & Profile Link */}
          <Link
            href="/account"
            className="p-2 sm:px-3 text-[#57534E] dark:text-[#D4CEC4] hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors rounded-full hover:bg-[#F5F2EB] dark:hover:bg-[#24201D] flex items-center gap-1.5"
            title="Customer Account & Profile"
          >
            <User className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37]" />
            <span className="hidden md:inline text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB]">
              Account
            </span>
          </Link>

          {/* Book Consultation Button */}
          <button
            id="book-consultation-btn"
            onClick={onOpenConsultation}
            className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-full bg-[#B28359] dark:bg-[#D4AF37] hover:bg-[#9E7249] dark:hover:bg-[#C59F2D] text-white dark:text-[#141210] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-xs active:scale-95"
          >
            <span>Book Viewing</span>
          </button>

          {/* Shopping Bag / Cart Drawer Button: Always visible on small screens and large screens */}
          <button
            id="cart-drawer-btn"
            onClick={onOpenCart}
            className="relative p-2 sm:px-3 text-[#1C1917] dark:text-[#F5F2EB] hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors rounded-full hover:bg-[#F5F2EB] dark:hover:bg-[#24201D] flex items-center gap-1.5"
            aria-label="Shopping Bag"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#1C1917] dark:text-[#F5F2EB]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[#0284C7] dark:bg-[#38BDF8] text-white dark:text-[#0F172A] text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden xl:inline text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB]">
              Bag
            </span>
          </button>

        </div>
      </div>

      {/* CATEGORY SUB-HEADER NAVIGATION BAR */}
      <div className="border-t border-[#EAE3D5] dark:border-[#332E2A] bg-[#FDFBF7] dark:bg-[#1A1815] py-2.5 px-4 shadow-2xs transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none text-xs sm:text-sm">
          <span className="text-xs uppercase tracking-widest text-[#8C5B32] dark:text-[#D4AF37] font-bold shrink-0 mr-1 hidden sm:inline">
            Collections:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm tracking-wider uppercase font-semibold transition-all duration-200 shrink-0 ${
                  isActive 
                    ? 'bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] border border-[#B28359] dark:border-[#D4AF37] font-bold shadow-xs' 
                    : 'bg-white dark:bg-[#24201D] text-[#57534E] dark:text-[#D4CEC4] hover:text-[#1C1917] dark:hover:text-white border border-[#E5DFD5] dark:border-[#3D352E] hover:bg-[#F5F2EB] dark:hover:bg-[#2D2720]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1C1917] border-t border-[#EAE4DA] dark:border-[#332E2A] px-4 py-4 space-y-3 shadow-lg">
          
          {/* Mobile Theme Switcher Pill */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F5] dark:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E]">
            <span className="text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-wider">
              Theme Mode
            </span>
            <ThemeToggle variant="pill" />
          </div>

          {onGoHome && (
            <button
              onClick={() => {
                onGoHome();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 text-xs uppercase tracking-wider rounded-lg bg-[#FAF7F2] dark:bg-[#24201D] text-[#8C5B32] dark:text-[#D4AF37] font-semibold border border-[#E8D9C8] dark:border-[#574628] flex items-center justify-between shadow-xs"
            >
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
                <span>Return to Home Page</span>
              </span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#FDF7F0] dark:bg-[#2A2318] text-[#8C5B32] dark:text-[#D4AF37] font-semibold border border-[#E8D9C8] dark:border-[#574628]'
                    : 'text-[#57534E] dark:text-[#D4CEC4] hover:bg-[#F5F2EB] dark:hover:bg-[#24201D] hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#ECE6DB] dark:border-[#332E2A] space-y-2">
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] font-semibold hover:text-[#B28359] dark:hover:text-[#D4AF37] flex items-center gap-2 border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl bg-[#FAF9F5] dark:bg-[#24201D]"
            >
              <User className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
              <span>My Account & Profile</span>
            </Link>

            <button
              onClick={() => {
                onOpenDiamondGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider text-[#57534E] dark:text-[#D4CEC4] hover:text-[#0284C7] dark:hover:text-[#38BDF8] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
              <span>The 4Cs Diamond Education</span>
            </button>

            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-full bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] text-xs font-bold uppercase tracking-wider shadow-xs mt-2"
            >
              Book Bespoke Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
