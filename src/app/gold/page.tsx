'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  ShieldCheck, 
  Coins, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  DollarSign, 
  RefreshCw, 
  Upload, 
  X, 
  Award, 
  ChevronRight,
  User,
  Home,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';

import weBuyGoldHeroImg from '@/assets/images/we_buy_gold_hero.png';
const heroImgSrc = typeof weBuyGoldHeroImg === 'string' ? weBuyGoldHeroImg : (weBuyGoldHeroImg as any)?.src || '/assets/images/we_buy_gold_hero.png';

// Metal price data types & mock market feeds with historical points
type MetalType = 'gold' | 'silver' | 'platinum';
type Currency = 'GBP' | 'USD' | 'EUR';
type Timeframe = '1D' | '1W' | '1M' | '6M' | '1Y' | '5Y';

interface MetalMarketData {
  name: string;
  symbol: string;
  spotPerOz: { GBP: number; USD: number; EUR: number };
  change24hPercent: number;
  high24h: { GBP: number; USD: number; EUR: number };
  low24h: { GBP: number; USD: number; EUR: number };
  history: Record<Timeframe, number[]>;
}

const METAL_FEEDS: Record<MetalType, MetalMarketData> = {
  gold: {
    name: 'Gold (XAU)',
    symbol: 'XAU',
    spotPerOz: { GBP: 1985.40, USD: 2518.50, EUR: 2315.20 },
    change24hPercent: +0.85,
    high24h: { GBP: 1994.20, USD: 2528.00, EUR: 2325.50 },
    low24h: { GBP: 1972.10, USD: 2501.10, EUR: 2300.80 },
    history: {
      '1D': [1974.1, 1976.5, 1973.0, 1978.4, 1982.0, 1980.5, 1984.2, 1985.4],
      '1W': [1940.2, 1952.0, 1961.5, 1958.0, 1970.4, 1979.1, 1985.4],
      '1M': [1890.0, 1910.4, 1925.0, 1940.0, 1955.2, 1972.0, 1985.4],
      '6M': [1780.0, 1820.5, 1860.0, 1895.0, 1930.0, 1960.0, 1985.4],
      '1Y': [1650.0, 1710.0, 1780.0, 1840.0, 1910.0, 1950.0, 1985.4],
      '5Y': [1210.0, 1420.0, 1600.0, 1750.0, 1880.0, 1920.0, 1985.4],
    }
  },
  silver: {
    name: 'Silver (XAG)',
    symbol: 'XAG',
    spotPerOz: { GBP: 23.45, USD: 29.80, EUR: 27.30 },
    change24hPercent: +1.42,
    high24h: { GBP: 23.80, USD: 30.15, EUR: 27.70 },
    low24h: { GBP: 23.10, USD: 29.35, EUR: 26.90 },
    history: {
      '1D': [23.12, 23.20, 23.15, 23.30, 23.38, 23.40, 23.45],
      '1W': [22.80, 22.95, 23.10, 23.05, 23.25, 23.35, 23.45],
      '1M': [21.50, 22.00, 22.40, 22.80, 23.10, 23.30, 23.45],
      '6M': [19.80, 20.50, 21.20, 22.00, 22.70, 23.10, 23.45],
      '1Y': [18.20, 19.50, 20.80, 21.50, 22.40, 23.00, 23.45],
      '5Y': [14.10, 17.50, 22.00, 20.50, 21.80, 22.90, 23.45],
    }
  },
  platinum: {
    name: 'Platinum (XPT)',
    symbol: 'XPT',
    spotPerOz: { GBP: 748.20, USD: 950.00, EUR: 872.50 },
    change24hPercent: -0.32,
    high24h: { GBP: 755.00, USD: 958.00, EUR: 880.00 },
    low24h: { GBP: 742.10, USD: 942.00, EUR: 865.00 },
    history: {
      '1D': [751.0, 750.2, 749.0, 747.5, 748.0, 748.2],
      '1W': [760.0, 758.0, 755.0, 752.0, 750.0, 748.2],
      '1M': [730.0, 735.0, 740.0, 745.0, 742.0, 748.2],
      '6M': [710.0, 720.0, 735.0, 740.0, 745.0, 748.2],
      '1Y': [690.0, 715.0, 730.0, 740.0, 745.0, 748.2],
      '5Y': [620.0, 680.0, 720.0, 750.0, 740.0, 748.2],
    }
  }
};

const GOLD_KARATS = [
  { karat: '24K', title: '24 Karat (99.9% Pure)', percentage: 0.999, multiplier: 24/24, desc: 'Pure Gold Bullion & Bars' },
  { karat: '22K', title: '22 Karat (91.6% Pure)', percentage: 0.9167, multiplier: 22/24, desc: 'Sovereigns, Krugerrands & Asian Gold' },
  { karat: '18K', title: '18 Karat (75.0% Pure)', percentage: 0.75, multiplier: 18/24, desc: 'Fine UK Hallmarked Luxury Jewelry' },
  { karat: '15K', title: '15 Karat (62.5% Pure)', percentage: 0.625, multiplier: 15/24, desc: 'Victorian & Antique Collectibles' },
  { karat: '14K', title: '14 Karat (58.5% Pure)', percentage: 0.5833, multiplier: 14/24, desc: 'European & US Fine Jewelry' },
  { karat: '9K', title: '9 Karat (37.5% Pure)', percentage: 0.375, multiplier: 9/24, desc: 'Standard UK Hallmarked Gold' }
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€'
};

const TROY_OZ_IN_GRAMS = 31.1034768;

export default function BuyGoldPage() {
  // Chart state
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('gold');
  const [currency, setCurrency] = useState<Currency>('GBP');
  const [timeframe, setTimeframe] = useState<Timeframe>('1W');

  // Calculator state
  const [calcMetal, setCalcMetal] = useState<MetalType>('gold');
  const [selectedKarat, setSelectedKarat] = useState<string>('18K');
  const [weightInput, setWeightInput] = useState<string>('10');
  const [weightUnit, setWeightUnit] = useState<'grams' | 'ounces'>('grams');

  // Sell Quote Modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Active Market Feed
  const currentFeed = METAL_FEEDS[selectedMetal];
  const currencySymbol = CURRENCY_SYMBOLS[currency];
  const spotOz = currentFeed.spotPerOz[currency];
  const spotGram24k = spotOz / TROY_OZ_IN_GRAMS;

  // Calculator computations
  const numericWeight = parseFloat(weightInput) || 0;
  const weightInOunces = weightUnit === 'grams' ? numericWeight / TROY_OZ_IN_GRAMS : numericWeight;
  const weightInGrams = weightUnit === 'grams' ? numericWeight : numericWeight * TROY_OZ_IN_GRAMS;

  const activeKaratObj = GOLD_KARATS.find(k => k.karat === selectedKarat) || GOLD_KARATS[2];
  
  let purityRatio = 1.0;
  if (calcMetal === 'gold') {
    purityRatio = activeKaratObj.multiplier; // exact karat / 24 formula requested
  } else if (calcMetal === 'silver') {
    purityRatio = 0.925; // Sterling silver default
  } else if (calcMetal === 'platinum') {
    purityRatio = 0.950; // Fine platinum default
  }

  const calcSpotOz = METAL_FEEDS[calcMetal].spotPerOz[currency];
  const rawMarketValue = weightInOunces * purityRatio * calcSpotOz;
  const cashPayoutOffer = rawMarketValue * 0.96; // 96% guaranteed spot cash payout
  const tradeInCreditOffer = rawMarketValue * 1.05; // 105% trade-in towards bespoke jewelry

  // Chart rendering points calculation
  const historyData = currentFeed.history[timeframe] || currentFeed.history['1W'];
  const minPrice = Math.min(...historyData);
  const maxPrice = Math.max(...historyData);
  const priceRange = maxPrice - minPrice || 1;

  const chartPoints = historyData.map((val, idx) => {
    const x = (idx / (historyData.length - 1)) * 580 + 10;
    const y = 180 - ((val - minPrice) / priceRange) * 140;
    return `${x},${y}`;
  }).join(' ');

  const handleOpenQuoteModal = () => {
    setQuoteModalOpen(true);
    setQuoteSubmitted(false);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#F5F2EB] selection:bg-[#B28359] selection:text-white transition-colors">
      
      {/* Top Specular Rim */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#141210]/95 backdrop-blur-md border-b border-[#EAE4DA] dark:border-[#332E2A] py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer" title="Return to Homepage">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B28359] to-[#D4AF37] p-[1.5px] shadow-xs group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#1C1917] flex items-center justify-center font-serif-luxury font-bold text-xs text-[#B28359] dark:text-[#D4AF37]">
                  EA
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-base sm:text-lg font-bold tracking-[0.14em] uppercase leading-tight text-[#1C1917] dark:text-[#F5F2EB]">
                  Ever After
                </span>
                <span className="text-[10px] tracking-[0.22em] text-[#8C5B32] dark:text-[#D4AF37] font-bold uppercase">
                  Gold & Scrap Buyers
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#57534E] dark:text-[#D4CEC4] hover:bg-[#F5F2EB] dark:hover:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] transition-all"
            >
              <Home className="w-3.5 h-3.5 text-[#B28359] dark:text-[#D4AF37]" />
              <span className="hidden sm:inline">Back to Shop</span>
            </Link>

            <ThemeToggle variant="toggle" />

            <button
              onClick={handleOpenQuoteModal}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#B28359] to-[#D4AF37] text-white dark:text-[#141210] font-bold text-xs sm:text-sm tracking-wide uppercase shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Coins className="w-4 h-4" />
              <span>Sell Gold Now</span>
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION WITH LUXURY GRAPHIC */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EE] via-[#FAF9F5] to-white dark:from-[#1C1917] dark:via-[#161412] dark:to-[#12100E] border-b border-[#EAE4DA] dark:border-[#2D2720] pt-10 pb-16 px-4 sm:px-8">
        
        {/* Subtle Ambient Gold Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] dark:bg-[#2A2318] border border-[#E5D5C3] dark:border-[#574628] text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>London's Highest Cash For Gold Payouts</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917] dark:text-[#F5F2EB] uppercase leading-[1.08]">
              We Buy Gold <br />
              <span className="bg-gradient-to-r from-[#B28359] via-[#D4AF37] to-[#B28359] bg-clip-text text-transparent">
                At Top Market Rates
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] dark:text-[#D4CEC4] font-medium leading-relaxed max-w-2xl">
              Turn your unwanted gold jewelry, scrap 9K–24K gold, sovereigns, coins, silver, or platinum into instant cash or store credit. Certified XRF non-destructive purity testing in Hatton Garden or via fully insured Royal Mail post.
            </p>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#1E1B18]/80 border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#1C1917] dark:text-[#F5F2EB] uppercase">96% Spot Payout</div>
                  <div className="text-[11px] text-[#78716C] dark:text-[#A3998E]">Guaranteed High Rates</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#1E1B18]/80 border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs flex items-center gap-3">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#1C1917] dark:text-[#F5F2EB] uppercase">Same-Day BACS</div>
                  <div className="text-[11px] text-[#78716C] dark:text-[#A3998E]">Instant Bank Transfer</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#1E1B18]/80 border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs flex items-center gap-3">
                <Award className="w-6 h-6 text-[#B28359] dark:text-[#D4AF37] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#1C1917] dark:text-[#F5F2EB] uppercase">+5% Trade Bonus</div>
                  <div className="text-[11px] text-[#78716C] dark:text-[#A3998E]">Toward Fine Jewelry</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#gold-calculator"
                className="px-6 py-3.5 rounded-full bg-[#1C1917] dark:bg-[#F5F2EB] text-white dark:text-[#141210] font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-neutral-800 dark:hover:bg-white active:scale-95 transition-all flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>Calculate Your Gold Value</span>
              </a>

              <button
                onClick={handleOpenQuoteModal}
                className="px-6 py-3.5 rounded-full bg-white dark:bg-[#24201D] text-[#1C1917] dark:text-[#F5F2EB] border border-[#DED7CB] dark:border-[#3D352E] hover:border-[#B28359] dark:hover:border-[#D4AF37] font-bold text-sm uppercase tracking-wider shadow-xs active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Request Free Postal Pack</span>
                <ArrowRight className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
              </button>
            </div>

          </div>

          {/* Right Column: High-End Luxury Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E5D5C3] dark:border-[#3D352E] shadow-2xl group">
              <img 
                src={heroImgSrc} 
                alt="We Buy Gold Bullion and Fine Jewelry Trade In" 
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-1">
                  <Coins className="w-4 h-4" />
                  <span>London Bullion & Scrap Desk</span>
                </div>
                <h3 className="font-serif-luxury text-xl font-bold">Guaranteed Spot Prices & Free Evaluation</h3>
                <p className="text-xs text-neutral-300 mt-1">Visit our London office or request a fully insured prepaid envelope today.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: LIVE METAL SPOT PRICE CHART */}
      <section className="py-14 px-4 sm:px-8 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-widest mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Real-Time London Market Spot Rates</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-[#1C1917] dark:text-[#F5F2EB]">
              Precious Metal Price Index
            </h2>
          </div>

          {/* Controls: Currency & Metal Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Metal Selector */}
            <div className="p-1 rounded-full bg-white dark:bg-[#1E1B18] border border-[#E5DFD5] dark:border-[#3D352E] shadow-xs flex items-center gap-1 text-xs font-bold">
              {(['gold', 'silver', 'platinum'] as MetalType[]).map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`px-3.5 py-1.5 rounded-full capitalize transition-all ${
                    selectedMetal === metal 
                      ? 'bg-[#1C1917] dark:bg-[#D4AF37] text-white dark:text-[#141210] shadow-xs' 
                      : 'text-[#57534E] dark:text-[#D4CEC4] hover:text-[#B28359]'
                  }`}
                >
                  {metal}
                </button>
              ))}
            </div>

            {/* Currency Selector */}
            <div className="p-1 rounded-full bg-white dark:bg-[#1E1B18] border border-[#E5DFD5] dark:border-[#3D352E] shadow-xs flex items-center gap-1 text-xs font-bold">
              {(['GBP', 'USD', 'EUR'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    currency === curr 
                      ? 'bg-[#B28359] dark:bg-[#2A2318] text-white dark:text-[#D4AF37] shadow-xs' 
                      : 'text-[#57534E] dark:text-[#D4CEC4] hover:text-[#B28359]'
                  }`}
                >
                  {curr} ({CURRENCY_SYMBOLS[curr]})
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Live Metrics Header Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">Spot Price (Per Troy Oz)</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#1C1917] dark:text-[#F5F2EB]">
              {currencySymbol}{spotOz.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{currentFeed.change24hPercent}% 24h</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">24K Pure Gold (Per Gram)</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#B28359] dark:text-[#D4AF37]">
              {currencySymbol}{spotGram24k.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-[#78716C] dark:text-[#A3998E]">100% Fine Metal Index</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">24h Day Range</div>
            <div className="text-lg font-bold font-mono text-[#1C1917] dark:text-[#F5F2EB]">
              {currencySymbol}{currentFeed.low24h[currency]} - {currencySymbol}{currentFeed.high24h[currency]}
            </div>
            <div className="text-xs text-[#78716C] dark:text-[#A3998E]">London LBMA Live Feed</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F4EE] dark:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] shadow-xs space-y-1 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C5B32] dark:text-[#D4AF37]">Market Status</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>London Exchange Open</span>
              </div>
            </div>
            <div className="text-[11px] text-[#78716C] dark:text-[#A3998E]">Updated every 60 seconds</div>
          </div>

        </div>

        {/* Dynamic Interactive SVG Chart Container */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] shadow-lg">
          
          <div className="flex items-center justify-between border-b border-[#EAE4DA] dark:border-[#2D2720] pb-4 mb-6">
            <div className="text-sm font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentFeed.name} Historical Trend</span>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-[#FAF9F5] dark:bg-[#24201D] p-1 rounded-full border border-[#E5DFD5] dark:border-[#3D352E] text-xs font-bold">
              {(['1D', '1W', '1M', '6M', '1Y', '5Y'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    timeframe === tf
                      ? 'bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210]'
                      : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Visual Canvas */}
          <div className="relative h-64 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid guide lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="currentColor" strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-800" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="currentColor" strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-800" />
              <line x1="0" y1="160" x2="600" y2="160" stroke="currentColor" strokeDasharray="3 3" className="text-neutral-200 dark:text-neutral-800" />

              {/* Area Fill */}
              <polygon
                points={`10,190 ${chartPoints} 590,190`}
                fill="url(#goldGradient)"
              />

              {/* Glowing Line */}
              <polyline
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={chartPoints}
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-[#A3998E] pt-4 border-t border-[#F5F2EB] dark:border-[#24201D] font-medium">
            <span>Period Low: {currencySymbol}{minPrice.toFixed(2)}</span>
            <span>Live Spot Feed • LBMA Verified</span>
            <span>Period High: {currencySymbol}{maxPrice.toFixed(2)}</span>
          </div>

        </div>

      </section>

      {/* SECTION 2: INTERACTIVE SCRAP GOLD & METAL CALCULATOR */}
      <section id="gold-calculator" className="py-16 px-4 sm:px-8 bg-[#F7F4EE] dark:bg-[#181512] border-t border-b border-[#EAE4DA] dark:border-[#2D2720]">
        
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-widest">
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
              <span>Instant Valuation Tool</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-[#1C1917] dark:text-[#F5F2EB]">
              Gold & Precious Metal Calculator
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D4CEC4] max-w-2xl mx-auto font-medium">
              Select your metal type, purity (9K to 24K), and weight in grams or troy ounces to see your instant guaranteed cash payout value.
            </p>
          </div>

          {/* CALCULATOR MAIN CARD */}
          <div className="rounded-3xl bg-white dark:bg-[#1C1917] border border-[#E5D5C3] dark:border-[#3D352E] shadow-2xl p-6 sm:p-10 space-y-8">
            
            {/* Step 1: Select Metal & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Metal Choice */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">
                  1. Select Metal Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['gold', 'silver', 'platinum'] as MetalType[]).map((metal) => (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => setCalcMetal(metal)}
                      className={`py-3 px-3 rounded-2xl text-xs font-bold capitalize transition-all border ${
                        calcMetal === metal 
                          ? 'bg-[#1C1917] dark:bg-[#D4AF37] text-white dark:text-[#141210] border-[#1C1917] dark:border-[#D4AF37] shadow-sm' 
                          : 'bg-[#FAF9F5] dark:bg-[#24201D] text-[#57534E] dark:text-[#D4CEC4] border-[#E5DFD5] dark:border-[#3D352E] hover:border-[#B28359]'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Unit Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">
                  2. Select Weight Unit
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWeightUnit('grams')}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border ${
                      weightUnit === 'grams' 
                        ? 'bg-[#B28359] text-white border-[#B28359] shadow-sm' 
                        : 'bg-[#FAF9F5] dark:bg-[#24201D] text-[#57534E] dark:text-[#D4CEC4] border-[#E5DFD5] dark:border-[#3D352E]'
                    }`}
                  >
                    Grams (g)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeightUnit('ounces')}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all border ${
                      weightUnit === 'ounces' 
                        ? 'bg-[#B28359] text-white border-[#B28359] shadow-sm' 
                        : 'bg-[#FAF9F5] dark:bg-[#24201D] text-[#57534E] dark:text-[#D4CEC4] border-[#E5DFD5] dark:border-[#3D352E]'
                    }`}
                  >
                    Troy Ounces (oz t)
                  </button>
                </div>
              </div>

            </div>

            {/* Step 2: Gold Karat Selection (Only shown for Gold) */}
            {calcMetal === 'gold' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">
                    3. Select Gold Purity / Karat
                  </label>
                  <span className="text-xs text-[#8C5B32] dark:text-[#D4AF37] font-semibold">
                    Formula: (Karat ÷ 24) × 24K Spot
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {GOLD_KARATS.map((k) => {
                    const isSelected = selectedKarat === k.karat;
                    return (
                      <button
                        key={k.karat}
                        type="button"
                        onClick={() => setSelectedKarat(k.karat)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          isSelected 
                            ? 'bg-gradient-to-tr from-[#B28359] to-[#D4AF37] text-white border-transparent shadow-md scale-105' 
                            : 'bg-[#FAF9F5] dark:bg-[#24201D] text-[#1C1917] dark:text-[#F5F2EB] border-[#E5DFD5] dark:border-[#3D352E] hover:border-[#B28359]'
                        }`}
                      >
                        <div className="font-bold text-base">{k.karat}</div>
                        <div className="text-[11px] opacity-90 font-medium">{(k.percentage * 100).toFixed(1)}% Pure</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Enter Weight Input */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">
                {calcMetal === 'gold' ? '4.' : '3.'} Enter Total Weight ({weightUnit === 'grams' ? 'Grams' : 'Troy Ounces'})
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="e.g. 15.5"
                  className="w-full text-2xl sm:text-3xl font-bold font-mono px-5 py-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#24201D] border border-[#DED7CB] dark:border-[#3D352E] text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#D4AF37]"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold uppercase text-[#78716C] dark:text-[#A3998E]">
                  {weightUnit === 'grams' ? 'Grams (g)' : 'Troy Oz (oz t)'}
                </div>
              </div>
            </div>

            {/* CALCULATED OUTPUT DISPLAY BOX */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1C1917] via-[#24201D] to-[#12100E] text-white shadow-2xl border border-[#D4AF37]/30 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                    Valuation Summary
                  </div>
                  <div className="text-sm font-semibold text-neutral-300 mt-0.5">
                    {numericWeight} {weightUnit} of {calcMetal === 'gold' ? `${selectedKarat} (${activeKaratObj.title})` : calcMetal}
                  </div>
                </div>

                <div className="text-xs font-mono text-neutral-400">
                  Pure Metal Content: <span className="text-white font-bold">{(weightInGrams * purityRatio).toFixed(2)}g</span> ({(weightInOunces * purityRatio).toFixed(4)} oz)
                </div>
              </div>

              {/* CASH VS STORE CREDIT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 96% Instant Cash Offer */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    <span>Instant Guaranteed Cash</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-mono text-white">
                    {currencySymbol}{cashPayoutOffer.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-neutral-400">Paid via same-day instant BACS bank transfer on evaluation.</p>
                </div>

                {/* 105% Store Trade-in Credit Bonus */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#B28359]/30 to-[#D4AF37]/30 border border-[#D4AF37]/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    <span>Trade-In Credit Bonus (+5%)</span>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-mono text-[#D4AF37]">
                    {currencySymbol}{tradeInCreditOffer.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-neutral-300">Valid towards any bespoke engagement ring or diamond commission.</p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={handleOpenQuoteModal}
                  className="w-full sm:w-auto flex-1 py-4 px-8 rounded-full bg-gradient-to-r from-[#B28359] to-[#D4AF37] text-white dark:text-[#141210] font-bold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all text-center"
                >
                  Lock In This Price & Sell Gold Now
                </button>

                <a
                  href="tel:02081666365"
                  className="w-full sm:w-auto py-4 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Call London Desk: 020 8166 6365</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SECTION 3: HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase text-[#1C1917] dark:text-[#F5F2EB]">
            How To Sell Gold With Ever After
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#B28359]/10 dark:bg-[#D4AF37]/10 text-[#B28359] dark:text-[#D4AF37] flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">Get Instant Estimate</h3>
            <p className="text-sm text-[#78716C] dark:text-[#A3998E] leading-relaxed">
              Use our live calculator above to calculate your scrap gold or jewelry value, or request a free prepaid Royal Mail Special Delivery envelope.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#B28359]/10 dark:bg-[#D4AF37]/10 text-[#B28359] dark:text-[#D4AF37] flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">Non-Destructive Testing</h3>
            <p className="text-sm text-[#78716C] dark:text-[#A3998E] leading-relaxed">
              Our certified assayers use high-precision X-Ray Spectrometers to test your gold purity down to 0.1% without damaging your items.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] shadow-xs space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#B28359]/10 dark:bg-[#D4AF37]/10 text-[#B28359] dark:text-[#D4AF37] flex items-center justify-center font-bold text-xl">
              3
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">Same-Day Payment</h3>
            <p className="text-sm text-[#78716C] dark:text-[#A3998E] leading-relaxed">
              Once you accept the quote, funds are transferred instantly into your bank account via BACS within 60 minutes. Zero hidden fees.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 px-4 sm:px-8 bg-[#F7F4EE] dark:bg-[#161412] border-t border-[#EAE4DA] dark:border-[#2D2720]">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="font-serif-luxury text-3xl font-bold uppercase text-[#1C1917] dark:text-[#F5F2EB]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#78716C] dark:text-[#A3998E]">
              Everything you need to know about selling gold in the UK.
            </p>
          </div>

          <div className="space-y-4">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] space-y-2">
              <h4 className="font-bold text-base text-[#1C1917] dark:text-[#F5F2EB]">How is my gold valued?</h4>
              <p className="text-sm text-[#57534E] dark:text-[#D4CEC4] leading-relaxed">
                Gold value is determined by multiplying its exact purity (karat) by its weight in grams or troy ounces against the live London Bullion Market Association (LBMA) spot price. 9ct gold contains 37.5% pure gold, 18ct contains 75%, and 24ct contains 99.9%.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] space-y-2">
              <h4 className="font-bold text-base text-[#1C1917] dark:text-[#F5F2EB]">What if my jewelry has diamonds or gemstones?</h4>
              <p className="text-sm text-[#57534E] dark:text-[#D4CEC4] leading-relaxed">
                Unlike general gold buyers who scrap everything, Ever After is a premier London diamond atelier. We evaluate center diamonds independently and offer add-on payout value for high-quality certified diamonds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#EAE4DA] dark:border-[#332E2A] space-y-2">
              <h4 className="font-bold text-base text-[#1C1917] dark:text-[#F5F2EB]">Is the postal pack fully insured?</h4>
              <p className="text-sm text-[#57534E] dark:text-[#D4CEC4] leading-relaxed">
                Yes! Our prepaid Royal Mail Special Delivery envelopes are fully insured up to £2,500 per pack (with optional higher cover upon request), tracked online at every step.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* MODAL: SELL GOLD REQUEST / QUOTE FORM */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1C1917] border border-[#E5D5C3] dark:border-[#3D352E] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
            
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full text-[#78716C] hover:text-[#1C1917] dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!quoteSubmitted ? (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-wider">
                    <Coins className="w-4 h-4" />
                    <span>Free Evaluation Request</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] uppercase">
                    Sell Your Gold
                  </h3>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                    Lock in your calculated quote ({currencySymbol}{cashPayoutOffer.toFixed(2)}) or request a free insured postal pack.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#24201D] border border-[#DED7CB] dark:border-[#3D352E] text-sm text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Email Address</label>
                      <input 
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="eleanor@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#24201D] border border-[#DED7CB] dark:border-[#3D352E] text-sm text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Phone Number</label>
                      <input 
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="07700 900123"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#24201D] border border-[#DED7CB] dark:border-[#3D352E] text-sm text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Gold / Item Description</label>
                    <textarea
                      rows={2}
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      placeholder="e.g. 18ct gold wedding band (12g), 9ct chain..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F5] dark:bg-[#24201D] border border-[#DED7CB] dark:border-[#3D352E] text-sm text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B28359] to-[#D4AF37] text-white dark:text-[#141210] font-bold text-sm uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
                  >
                    Confirm Quote & Request Free Postal Pack
                  </button>
                  <p className="text-[11px] text-center text-[#78716C] dark:text-[#A3998E]">
                    No obligation to sell. Free Royal Mail insured returns if you decide not to proceed.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB] uppercase">
                  Valuation Request Received!
                </h3>
                <p className="text-sm text-[#57534E] dark:text-[#D4CEC4]">
                  Thank you, <span className="font-bold text-[#1C1917] dark:text-white">{clientName}</span>. Your lock-in valuation reference has been dispatched. A member of our London gold desk will contact you within 1 business hour.
                </p>
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#1C1917] dark:bg-[#F5F2EB] text-white dark:text-[#141210] font-bold text-xs uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer 
        onSelectCategory={() => {}}
        onOpenConsultation={() => {}}
        onOpenDiamondGuide={() => {}}
      />

    </div>
  );
}
