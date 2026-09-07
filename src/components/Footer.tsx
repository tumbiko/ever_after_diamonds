'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Instagram, 
  Phone, 
  Mail, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle,
  Award,
  Truck,
  Lock
} from 'lucide-react';
import profileBadgeImg from '../assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenConsultation: () => void;
  onOpenDiamondGuide: () => void;
  onGoHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenConsultation,
  onOpenDiamondGuide,
  onGoHome
}) => {
  return (
    <footer className="bg-[#F6F3ED] dark:bg-[#141210] border-t border-[#EAE4DA] dark:border-[#332E2A] text-[#57534E] dark:text-[#D4CEC4] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E5DFD5] dark:border-[#2D2720]">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              type="button" 
              onClick={onGoHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))} 
              className="flex items-center gap-3.5 text-left group cursor-pointer"
              title="Return to Home Page"
            >
              <div className="w-14 h-14 rounded-full p-[1.5px] bg-[#B28359] dark:bg-[#D4AF37] shadow-xs group-hover:scale-105 transition-transform">
                <img 
                  src={profileBadgeImgSrc} 
                  alt="Ever After Diamonds Emblem" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full bg-white dark:bg-[#1C1917]"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#1C1917] dark:text-[#F5F2EB] uppercase group-hover:text-[#B28359] dark:group-hover:text-[#D4AF37] transition-colors">
                  EVER AFTER
                </span>
                <span className="text-xs tracking-[0.28em] text-[#8C5B32] dark:text-[#D4AF37] uppercase font-bold">
                  DIAMONDS • LONDON
                </span>
              </div>
            </button>

            <p className="text-sm sm:text-base text-[#78716C] dark:text-[#A3998E] leading-relaxed max-w-sm font-medium">
              Crafting timeless bespoke diamond engagement rings, eternity wedding bands, and high jewelry in London and Birmingham. Hand-selected GIA & IGI certified diamonds.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-sm font-semibold">
              <a 
                href="https://everafterdiamonds.co.uk" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors"
              >
                <Globe className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
                <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB]">everafterdiamonds.co.uk</span>
              </a>

              <a 
                href="https://www.instagram.com/ever.after.diamonds" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
                <span>@ever.after.diamonds</span>
              </a>

              <a 
                href="mailto:info@everafterdiamonds.co.uk" 
                className="flex items-center gap-2 hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
                <span>info@everafterdiamonds.co.uk</span>
              </a>
            </div>
          </div>

          {/* Quick Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-[#1C1917] dark:text-[#F5F2EB]">
              Fine Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => onSelectCategory('engagement-rings')} className="hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors">
                  Engagement Rings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('wedding-bands')} className="hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors">
                  Wedding Bands
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('fine-jewelry')} className="hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors">
                  Diamond Tennis Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bespoke-creations')} className="hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors">
                  Bespoke Commissions
                </button>
              </li>
              <li>
                <button onClick={onOpenDiamondGuide} className="text-[#0284C7] dark:text-[#38BDF8] hover:underline transition-colors flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The 4Cs Diamond Education</span>
                </button>
              </li>
              <li className="pt-2 border-t border-[#E5DFD5] dark:border-[#2D2720]">
                <Link href="/admin" className="text-[#8C5B32] dark:text-[#D4AF37] hover:underline font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Bespoke (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-[#1C1917] dark:text-[#F5F2EB]">
              Bespoke & Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
                <span>Main Office: <a href="tel:02081666365" className="text-[#1C1917] dark:text-[#F5F2EB] hover:text-[#B28359] dark:hover:text-[#D4AF37] font-bold">020 8166 6365</a></span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp: <a href="https://wa.me/447737806748" target="_blank" rel="noreferrer" className="text-[#1C1917] dark:text-[#F5F2EB] hover:text-emerald-700 dark:hover:text-emerald-400 font-bold">07737 806748</a></span>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="text-[#B28359] dark:text-[#D4AF37] hover:underline font-bold">
                  Book London Showroom Viewing →
                </button>
              </li>
              <li className="text-xs sm:text-sm text-[#78716C] dark:text-[#A3998E] pt-1 font-medium">
                Complimentary 60-Day Resizing & Annual Cleanings
              </li>
            </ul>
          </div>

          {/* Atelier Guarantees (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-[#1C1917] dark:text-[#F5F2EB]">
              Atelier Guarantees
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#78716C] dark:text-[#A3998E] font-medium">
              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-[#0284C7] dark:text-[#38BDF8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#1C1917] dark:text-[#F5F2EB] font-bold block text-sm">GIA & IGI Certification</span>
                  <span>Every center diamond is independently certified & laser inscribed.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#1C1917] dark:text-[#F5F2EB] font-bold block text-sm">UK Hallmarked Quality</span>
                  <span>Assayed in London with full lifetime manufacturing guarantee.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#1C1917] dark:text-[#F5F2EB] font-bold block text-sm">Insured UK Delivery</span>
                  <span>Discreet, fully insured Royal Mail Special Delivery nationwide.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Hallmarking & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs sm:text-sm text-[#78716C] dark:text-[#A3998E] font-medium">
          <div>
            <p>© {new Date().getFullYear()} Ever After Diamonds Ltd. Registered in England & Wales.</p>
            <p className="mt-0.5">Compliant with UK Hallmarking Act 1973. All precious metals independently assayed and certified.</p>
          </div>
          
          <div className="flex items-center gap-4 font-semibold">
            <span className="hover:text-[#B28359] dark:hover:text-[#D4AF37] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#B28359] dark:hover:text-[#D4AF37] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#B28359] dark:hover:text-[#D4AF37] cursor-pointer">UK Delivery & Returns</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
