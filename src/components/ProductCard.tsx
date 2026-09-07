'use client';

import React, { useState } from 'react';
import { Product, MetalType } from '../types';
import { Sparkles, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product, initialMetal?: MetalType) => void;
  onQuickAdd: (product: Product, metal: MetalType) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd
}) => {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.defaultMetal);
  const [isHovered, setIsHovered] = useState(false);

  const getMetalColorDot = (metal: MetalType) => {
    switch (metal) {
      case '18k Yellow Gold':
        return 'bg-[#E5C287] border-[#997D3D]';
      case 'Platinum':
        return 'bg-[#E5E7EB] border-[#9CA3AF]';
      case '18k White Gold':
        return 'bg-[#F3F4F6] border-[#D1D5DB]';
      case '18k Rose Gold':
        return 'bg-[#E0A899] border-[#B87A6B]';
    }
  };

  // Price modifier if Platinum is selected
  const displayPrice = selectedMetal === 'Platinum' ? product.price + 250 : product.price;
  const displayComparePrice = product.compareAtPrice 
    ? (selectedMetal === 'Platinum' ? product.compareAtPrice + 250 : product.compareAtPrice) 
    : undefined;

  return (
    <div 
      className="group relative flex flex-col bg-white dark:bg-[#181614] rounded-2xl border border-[#EAE4DA] dark:border-[#3A332B] hover:border-[#B28359]/60 dark:hover:border-[#D4AF37]/80 transition-all duration-300 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Card Badges Bar - Bounded & Collision-Free */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between gap-1.5 pointer-events-none">
        
        {/* Left Stacked Status Badges */}
        <div className="flex flex-col items-start gap-1 max-w-[60%] sm:max-w-[65%]">
          {product.isBestseller && (
            <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm truncate max-w-full">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/95 dark:bg-[#211E1A]/95 border border-[#E5DFD5] dark:border-[#3D352E] text-[#1C1917] dark:text-[#F5F2EB] text-[10px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs truncate max-w-full">
              New Creation
            </span>
          )}
          {/* Sky Blue Optical Certification Badge */}
          <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-[#F0F9FF]/95 dark:bg-[#0C4A6E]/95 border border-[#BAE6FD] dark:border-[#0284C7] text-[#0284C7] dark:text-[#38BDF8] text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-xs truncate max-w-full">
            <Sparkles className="w-3 h-3 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
            <span className="truncate">{product.certification.split('&')[0].trim()}</span>
          </span>
        </div>

        {/* Right Diamond Cut Badge */}
        <div className="shrink-0 max-w-[40%] text-right">
          <span className="px-2.5 py-0.5 sm:py-1 rounded-full bg-white/90 dark:bg-[#211E1A]/90 backdrop-blur-md border border-[#E5DFD5] dark:border-[#3D352E] text-[10px] sm:text-xs text-[#57534E] dark:text-[#D4CEC4] tracking-wider uppercase font-medium shadow-xs truncate block max-w-full">
            {product.diamondShape} Cut
          </span>
        </div>

      </div>

      {/* Image Gallery Container */}
      <div 
        className="relative aspect-square w-full overflow-hidden bg-[#FBF9F5] dark:bg-[#211E1A] cursor-pointer border-b border-[#F2ECE2] dark:border-[#2D2720]"
        onClick={() => onSelect(product, selectedMetal)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Quick View Hover Overlay */}
        <div className={`absolute inset-0 bg-[#1C1917]/30 dark:bg-black/50 backdrop-blur-[2px] flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product, selectedMetal);
            }}
            className="px-4 py-2 rounded-full bg-white dark:bg-[#141210] text-[#1C1917] dark:text-[#F5F2EB] text-xs font-bold tracking-wider flex items-center gap-1.5 hover:bg-[#B28359] dark:hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#141210] transition-all shadow-lg active:scale-95 border border-transparent dark:border-[#574628]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Customize Ring</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Metal Swatches */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              {product.metals.map((metal) => (
                <button
                  key={metal}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMetal(metal);
                  }}
                  className={`w-4.5 h-4.5 rounded-full border transition-all ${getMetalColorDot(metal)} ${
                    selectedMetal === metal ? 'ring-2 ring-[#B28359] dark:ring-[#D4AF37] scale-110 shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={metal}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold ml-1 truncate text-[#78716C] dark:text-[#D4CEC4]">
              {selectedMetal}
            </span>
          </div>

          <h3 
            onClick={() => onSelect(product, selectedMetal)}
            className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#B28359] dark:group-hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#78716C] dark:text-[#A3998E] line-clamp-1 mt-1 font-medium">
            {product.tagline}
          </p>

          <div className="flex items-center gap-2 mt-2.5 text-xs sm:text-sm text-[#78716C] dark:text-[#D4CEC4] font-semibold">
            <span>{product.defaultCarat}ct {product.diamondShape}</span>
            <span className="text-[#D6CEBF] dark:text-[#42392F]">•</span>
            <span>{product.clarity}/{product.colorGrade}</span>
            <span className="text-[#D6CEBF] dark:text-[#42392F]">•</span>
            <span className="text-[#0284C7] dark:text-[#38BDF8] flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] dark:bg-[#38BDF8]" />
              <span>{product.diamondType}</span>
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3.5 border-t border-[#F0EBE1] dark:border-[#2D2720] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#B28359] dark:text-[#D4AF37]">
                £{displayPrice.toLocaleString()}
              </span>
              {displayComparePrice && (
                <span className="text-xs sm:text-sm text-[#A8A29E] line-through">
                  £{displayComparePrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-[#78716C] dark:text-[#A3998E] block font-medium">Inc. VAT & Royal Mail Insured</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuickAdd(product, selectedMetal)}
              className="p-2.5 rounded-full bg-[#FAF9F5] dark:bg-[#24201D] hover:bg-[#B28359] dark:hover:bg-[#D4AF37] text-[#1C1917] dark:text-[#F5F2EB] hover:text-white dark:hover:text-[#141210] border border-[#E0D9CE] dark:border-[#3D352E] hover:border-[#B28359] dark:hover:border-[#D4AF37] transition-all shadow-sm active:scale-90"
              title="Quick Add to Bag"
              aria-label="Quick Add to Bag"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => onSelect(product, selectedMetal)}
              className="px-4 py-2 rounded-full bg-[#FAF9F5] dark:bg-[#24201D] hover:bg-white dark:hover:bg-[#2A2318] border border-[#E0D9CE] dark:border-[#3D352E] hover:border-[#B28359] dark:hover:border-[#D4AF37] text-[#1C1917] dark:text-[#F5F2EB] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm active:scale-95"
            >
              View
            </button>
          </div>
        </div>

        {/* SKU reference & availability badge */}
        <div className="text-xs sm:text-sm text-[#78716C] dark:text-[#A3998E] font-mono flex items-center justify-between pt-1 font-medium">
          <span>SKU: {product.sku}</span>
          <span className="text-[#0284C7] dark:text-[#38BDF8] font-sans flex items-center gap-1 font-bold text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] dark:bg-[#38BDF8]" />
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};
