'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initialProducts';
import { AddProductModal } from '@/components/AddProductModal';
import { ShopifyTransferModal } from '@/components/ShopifyTransferModal';
import { 
  Sparkles, 
  Plus, 
  DownloadCloud, 
  ShoppingBag, 
  Search, 
  Trash2, 
  Eye, 
  Crown, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ShieldCheck, 
  Gem, 
  ArrowLeft,
  CheckCircle2,
  SlidersHorizontal,
  RefreshCw,
  Edit3,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  ArrowUp,
  Percent,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import profileBadgeImg from '@/assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

export default function AdminLandingPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShopifyModalOpen, setIsShopifyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'consultations' | 'analytics'>('inventory');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'30d' | '90d' | 'ytd'>('30d');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load custom products from localStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('ead_custom_products');
      if (savedProducts) {
        const customProds: Product[] = JSON.parse(savedProducts);
        const existingIds = new Set(INITIAL_PRODUCTS.map((p) => p.id));
        const nonDuplicateCustom = customProds.filter((p) => !existingIds.has(p.id));
        setProducts([...nonDuplicateCustom, ...INITIAL_PRODUCTS]);
      }
    } catch (e) {
      console.error('Error loading products:', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      const customOnly = updated.filter((p) => p.id.startsWith('ead-custom-'));
      localStorage.setItem('ead_custom_products', JSON.stringify(customOnly));
    } catch (e) {
      console.error(e);
    }
    showToast(`Added "${newProduct.title}" to catalog!`);
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}" from inventory?`)) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    try {
      const customOnly = updated.filter((p) => p.id.startsWith('ead-custom-'));
      localStorage.setItem('ead_custom_products', JSON.stringify(customOnly));
    } catch (e) {
      console.error(e);
    }
    showToast(`Removed "${title}" from inventory.`);
  };

  // Metrics
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.inventoryQuantity, 0);
  const totalStockCount = products.reduce((sum, p) => sum + p.inventoryQuantity, 0);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.diamondShape.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Mock Consultations Log
  const mockConsultations = [
    { id: 'C-901', name: 'Lady Victoria Cavendish', email: 'v.cavendish@mayfair.co.uk', service: 'Bespoke Engagement Ring', shape: 'Oval 2.5ct', date: 'Today, 14:30', status: 'Confirmed' },
    { id: 'C-902', name: 'James Sterling, Esq.', email: 'jsterling@kensington.com', service: 'Mayfair Trilogy Step-Cut', shape: 'Emerald Cut', date: 'Tomorrow, 11:00', status: 'Pending Review' },
    { id: 'C-903', name: 'Dr. Charlotte Hughes', email: 'c.hughes@oxford.ac.uk', service: 'Diamond Tennis Bracelet', shape: 'Round Brilliant', date: '09 Sep 2026', status: 'Confirmed' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#0E0D0C] text-[#1C1917] dark:text-[#F5F2EB] flex flex-col transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white border border-[#B28359] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#B28359]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP EXECUTIVE NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 dark:bg-[#1C1917]/95 backdrop-blur-md text-[#1C1917] dark:text-white border-b border-[#EAE4DA] dark:border-[#332E2A] shadow-xs px-3 sm:px-6 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Admin Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#B28359] to-[#F3E5D8] shrink-0">
              <img 
                src={profileBadgeImgSrc} 
                alt="Ever After Emblem" 
                className="w-full h-full object-cover rounded-full bg-white dark:bg-[#1C1917]"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-brand-display text-base sm:text-lg font-bold tracking-[0.12em] sm:tracking-[0.16em] uppercase text-[#1C1917] dark:text-[#F5F2EB] truncate">
                  EVER AFTER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FDF8F3] dark:bg-[#B28359]/20 border border-[#E5D5C3] dark:border-[#B28359]/50 text-[#8C5B32] dark:text-[#D4AF37] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Admin
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.24em] text-[#78716C] dark:text-[#A8A29E] uppercase block font-semibold truncate">
                DIAMONDS • LONDON ATELIER
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs shrink-0">
            {/* Theme Toggle: Shown on desktop (md+) */}
            <div className="hidden md:flex items-center">
              <ThemeToggle variant="pill" />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 sm:px-4 py-2 rounded-full bg-[#B28359] dark:bg-[#D4AF37] hover:bg-[#9E7249] dark:hover:bg-[#C59F2D] text-white dark:text-[#141210] font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 active:scale-95 text-[11px] sm:text-xs"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New Creation</span>
            </button>

            <button
              onClick={() => setIsShopifyModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F2EB] dark:bg-white/10 hover:bg-[#EAE4DA] dark:hover:bg-white/20 border border-[#E0D8CB] dark:border-white/20 text-[#57534E] dark:text-[#EADDCB] font-semibold uppercase tracking-wider transition-all text-xs"
            >
              <DownloadCloud className="w-4 h-4 text-[#8C5B32] dark:text-[#D4AF37]" />
              <span>Shopify Sync</span>
            </button>

            <Link
              href="/"
              className="px-3 sm:px-3.5 py-2 rounded-full bg-[#F5F2EB] dark:bg-white/10 hover:bg-[#EAE4DA] dark:hover:bg-white/20 border border-[#E0D8CB] dark:border-white/20 text-[#1C1917] dark:text-white font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 text-[11px] sm:text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </Link>

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1C1917] dark:text-[#F5F2EB] hover:bg-[#F5F2EB] dark:hover:bg-[#2A241E] rounded-full border border-[#E0D8CB] dark:border-[#3D352E] transition-colors"
              aria-label="Toggle Admin Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Out Drawer / Sidebar */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF9F5] dark:bg-[#1C1917] border-t border-[#EAE4DA] dark:border-[#332E2A] px-4 py-3 mt-3 space-y-3 shadow-md animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E]">
              <span className="text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-wider">
                Theme Appearance
              </span>
              <ThemeToggle variant="pill" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setIsAddModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2.5 rounded-xl bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Creation</span>
              </button>

              <button
                onClick={() => {
                  setIsShopifyModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2.5 rounded-xl bg-white dark:bg-[#211E1A] border border-[#E0D8CB] dark:border-[#3D352E] text-[#57534E] dark:text-[#EADDCB] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
              >
                <DownloadCloud className="w-4 h-4 text-[#8C5B32] dark:text-[#D4AF37]" />
                <span>Shopify Sync</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN ADMIN DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* EXECUTIVE KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* KPI 1: Gross Inventory Value */}
          <div className="bg-white dark:bg-[#181614] rounded-2xl p-4 sm:p-5 border border-[#E5DFD5] dark:border-[#3A332B] shadow-xs flex items-center justify-between gap-3 transition-colors">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">
                Total Inventory Value
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#F5F2EB] block mt-1">
                £{totalInventoryValue.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>Across {products.length} live creations</span>
              </span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FDF8F3] dark:bg-[#261E17] border border-[#E5D5C3] dark:border-[#574628] flex items-center justify-center text-[#8C5B32] dark:text-[#D4AF37] shrink-0">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* KPI 2: Live Stock Count */}
          <div className="bg-white dark:bg-[#181614] rounded-2xl p-4 sm:p-5 border border-[#E5DFD5] dark:border-[#3A332B] shadow-xs flex items-center justify-between gap-3 transition-colors">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">
                Vault Stock Quantity
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#F5F2EB] block mt-1">
                {totalStockCount} Units
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#0284C7] dark:text-[#38BDF8] font-semibold flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3" />
                <span>GIA & IGI Verified</span>
              </span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F0F9FF] dark:bg-[#112330] border border-[#BAE6FD] dark:border-[#1E4968] flex items-center justify-center text-[#0284C7] dark:text-[#38BDF8] shrink-0">
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* KPI 3: Active Consultation Inquiries */}
          <div className="bg-white dark:bg-[#181614] rounded-2xl p-4 sm:p-5 border border-[#E5DFD5] dark:border-[#3A332B] shadow-xs flex items-center justify-between gap-3 transition-colors">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">
                Mayfair Consultations
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#F5F2EB] block mt-1">
                3 Active
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#8C5B32] dark:text-[#D4AF37] font-semibold flex items-center gap-1 mt-1">
                <Gem className="w-3 h-3" />
                <span>Senior Jeweller Concierge</span>
              </span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FDF7F0] dark:bg-[#261E17] border border-[#E8D9C8] dark:border-[#574628] flex items-center justify-center text-[#8C5B32] dark:text-[#D4AF37] shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          {/* KPI 4: Sales Channel Status */}
          <div className="bg-white dark:bg-[#181614] rounded-2xl p-4 sm:p-5 border border-[#E5DFD5] dark:border-[#3A332B] shadow-xs flex items-center justify-between gap-3 transition-colors">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">
                Shopify Channel Sync
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1C1917] dark:text-[#F5F2EB] block mt-1">
                Connected
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Instant CSV Export Ready</span>
              </span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <DownloadCloud className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

        </div>

        {/* INTERACTIVE NAVIGATION TABS */}
        <div className="bg-white dark:bg-[#181614] rounded-2xl sm:rounded-3xl border border-[#E5DFD5] dark:border-[#3A332B] shadow-sm p-4 sm:p-6 space-y-6 transition-colors">
          
          {/* Tab Controls & Search Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EAE4DA] dark:border-[#332E2A]">
            
            {/* Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1 bg-[#F5F2EB] dark:bg-[#211E1A] rounded-2xl border border-[#E8E2D7] dark:border-[#3D352E] overflow-x-auto max-w-full scrollbar-none">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shrink-0 ${
                  activeTab === 'inventory'
                    ? 'bg-white dark:bg-[#1C1917] text-[#1C1917] dark:text-[#F5F2EB] shadow-xs border border-[#E5DFD5] dark:border-[#574628]'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                }`}
              >
                Products & Inventory ({products.length})
              </button>

              <button
                onClick={() => setActiveTab('consultations')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shrink-0 ${
                  activeTab === 'consultations'
                    ? 'bg-white dark:bg-[#1C1917] text-[#1C1917] dark:text-[#F5F2EB] shadow-xs border border-[#E5DFD5] dark:border-[#574628]'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                }`}
              >
                Viewing Requests ({mockConsultations.length})
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all shrink-0 ${
                  activeTab === 'analytics'
                    ? 'bg-white dark:bg-[#1C1917] text-[#1C1917] dark:text-[#F5F2EB] shadow-xs border border-[#E5DFD5] dark:border-[#574628]'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                }`}
              >
                Analytics & Insights
              </button>
            </div>

            {/* Quick Filter & Search Bar */}
            {activeTab === 'inventory' && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[#A8A29E] dark:text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by title, SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl pl-9 pr-3 py-2 sm:py-1.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] placeholder-[#A8A29E] dark:placeholder-[#6E675F] focus:outline-none focus:border-[#B28359]"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 sm:py-1.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                >
                  <option value="all">All Categories</option>
                  <option value="engagement-rings">Engagement Rings</option>
                  <option value="wedding-bands">Wedding Bands</option>
                  <option value="fine-jewelry">Fine Jewellery</option>
                </select>
              </div>
            )}

          </div>

          {/* TAB 1: PRODUCTS & INVENTORY TABLE */}
          {activeTab === 'inventory' && (
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-xs border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-[#EAE4DA] dark:border-[#332E2A] text-[#78716C] dark:text-[#A3998E] uppercase text-[10px] tracking-wider font-bold bg-[#FAF9F5] dark:bg-[#211E1A]">
                    <th className="py-3 px-4 rounded-l-xl">Item</th>
                    <th className="py-3 px-4">SKU / Handle</th>
                    <th className="py-3 px-4">Precious Metal</th>
                    <th className="py-3 px-4">Diamond Spec</th>
                    <th className="py-3 px-4">Price (£ GBP)</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE4] dark:divide-[#2D2720]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F5] dark:hover:bg-[#211E1A] transition-colors">
                      
                      {/* Product Name & Image */}
                      <td className="py-3.5 px-4 font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-10 h-10 rounded-xl object-cover border border-[#E5DFD5] dark:border-[#3D352E] shrink-0"
                          />
                          <div>
                            <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB] block">{p.title}</span>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#78716C] dark:text-[#A3998E] font-normal">
                              <span className="text-[#8C5B32] dark:text-[#D4AF37] font-semibold">{p.category}</span>
                              {p.isBestseller && <span className="text-amber-600 dark:text-amber-400 font-bold">• Bestseller</span>}
                              {p.isNew && <span className="text-emerald-600 dark:text-emerald-400 font-bold">• New</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3.5 px-4 text-[#57534E] dark:text-[#A3998E] font-mono text-[11px]">
                        {p.sku}
                      </td>

                      {/* Metals */}
                      <td className="py-3.5 px-4 text-[#57534E] dark:text-[#A3998E]">
                        <span className="px-2.5 py-1 rounded-full bg-[#FAF6F0] dark:bg-[#2A2318] border border-[#E8DFD1] dark:border-[#574628] text-[#8C5B32] dark:text-[#D4AF37] font-semibold text-[11px] inline-block">
                          {p.defaultMetal}
                        </span>
                      </td>

                      {/* Diamond Spec */}
                      <td className="py-3.5 px-4 text-[#57534E] dark:text-[#A3998E]">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-[#1C1917] dark:text-[#F5F2EB] block">{p.defaultCarat}ct {p.diamondShape}</span>
                          <span className="text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-semibold block">{p.diamondType} ({p.clarity}/{p.colorGrade})</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                        £{p.price.toLocaleString()}
                        {p.compareAtPrice && (
                          <span className="text-[10px] text-[#A8A29E] dark:text-[#78716C] line-through block font-normal">
                            £{p.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap inline-block ${
                          p.inventoryQuantity > 3 
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60' 
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
                        }`}>
                          {p.inventoryQuantity} in stock
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href="/"
                            className="p-1.5 text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] rounded-lg transition-colors"
                            title="Preview in Store"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {p.id.startsWith('ead-custom-') && (
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.title)}
                              className="p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: CONSULTATIONS & VIEWING LOG */}
          {activeTab === 'consultations' && (
            <div className="space-y-4">
              <h4 className="font-serif-luxury text-base sm:text-lg text-[#1C1917] dark:text-[#F5F2EB] font-semibold">
                Mayfair Private Showroom Appointment Requests
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockConsultations.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 rounded-2xl border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] space-y-3 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#8C5B32] dark:text-[#D4AF37] tracking-wider">{item.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-transparent dark:border-emerald-800 text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-[#1C1917] dark:text-[#F5F2EB]">{item.name}</h5>
                      <span className="text-xs text-[#78716C] dark:text-[#A3998E] block break-all">{item.email}</span>
                    </div>
                    <div className="text-xs border-t border-[#E8E2D7] dark:border-[#332E2A] pt-2 space-y-1 text-[#57534E] dark:text-[#D1C7BD]">
                      <p><strong className="text-[#1C1917] dark:text-[#F5F2EB]">Service:</strong> {item.service}</p>
                      <p><strong className="text-[#1C1917] dark:text-[#F5F2EB]">Diamond Preference:</strong> {item.shape}</p>
                      <p className="text-[#0284C7] dark:text-[#38BDF8] font-semibold">📅 {item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXECUTIVE ANALYTICS & SALES INSIGHTS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              
              {/* Analytics Controls Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] transition-colors">
                <div>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37] shrink-0" />
                    Executive Performance & Atelier Intelligence
                  </h3>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E] mt-0.5">
                    Real-time metrics on gross revenue, diamond preferences, metal demand, and atelier booking conversions.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#181614] rounded-xl border border-[#E5DFD5] dark:border-[#3A332B] text-xs font-semibold overflow-x-auto max-w-full scrollbar-none">
                    <button
                      onClick={() => setAnalyticsTimeframe('30d')}
                      className={`px-3 py-1 rounded-lg transition-all shrink-0 ${
                        analyticsTimeframe === '30d'
                          ? 'bg-[#1C1917] dark:bg-[#B28359] text-white font-bold'
                          : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                      }`}
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => setAnalyticsTimeframe('90d')}
                      className={`px-3 py-1 rounded-lg transition-all shrink-0 ${
                        analyticsTimeframe === '90d'
                          ? 'bg-[#1C1917] dark:bg-[#B28359] text-white font-bold'
                          : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                      }`}
                    >
                      Q3 2026
                    </button>
                    <button
                      onClick={() => setAnalyticsTimeframe('ytd')}
                      className={`px-3 py-1 rounded-lg transition-all shrink-0 ${
                        analyticsTimeframe === 'ytd'
                          ? 'bg-[#1C1917] dark:bg-[#B28359] text-white font-bold'
                          : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                      }`}
                    >
                      Year to Date
                    </button>
                  </div>

                  <button
                    onClick={() => showToast('Exporting Analytics Intelligence PDF Report...')}
                    className="p-2 bg-white dark:bg-[#181614] rounded-xl border border-[#E5DFD5] dark:border-[#3A332B] text-[#1C1917] dark:text-[#F5F2EB] hover:bg-[#FAF6F0] dark:hover:bg-[#2A241E] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                    title="Download Report"
                  >
                    <DownloadCloud className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
                  </button>
                </div>
              </div>

              {/* Financial & Conversion Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#FAF9F5] dark:bg-[#211E1A] rounded-2xl p-4 border border-[#E5DFD5] dark:border-[#3D352E]">
                  <span className="text-[10px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Gross Sales Revenue</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      {analyticsTimeframe === '30d' ? '£148,250' : analyticsTimeframe === '90d' ? '£432,100' : '£1,284,500'}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUp className="w-3 h-3" /> +24.8%
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A8A29E] dark:text-[#78716C] mt-1 block">vs prior comparison period</span>
                </div>

                <div className="bg-[#FAF9F5] dark:bg-[#211E1A] rounded-2xl p-4 border border-[#E5DFD5] dark:border-[#3D352E]">
                  <span className="text-[10px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Average Order Value (AOV)</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">£4,250</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUp className="w-3 h-3" /> +12.3%
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A8A29E] dark:text-[#78716C] mt-1 block">High-tier solitaire lead</span>
                </div>

                <div className="bg-[#FAF9F5] dark:bg-[#211E1A] rounded-2xl p-4 border border-[#E5DFD5] dark:border-[#3D352E]">
                  <span className="text-[10px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Online Store Conversion</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">3.82%</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUp className="w-3 h-3" /> +0.65%
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A8A29E] dark:text-[#78716C] mt-1 block">4Cs guide funnel effective</span>
                </div>

                <div className="bg-[#FAF9F5] dark:bg-[#211E1A] rounded-2xl p-4 border border-[#E5DFD5] dark:border-[#3D352E]">
                  <span className="text-[10px] font-bold text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Mayfair Salon Booking Rate</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">68.4%</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                      <ArrowUp className="w-3 h-3" /> +5.2%
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A8A29E] dark:text-[#78716C] mt-1 block">High-intent VIP client leads</span>
                </div>
              </div>

              {/* Middle Visual Analytics Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Category & Metal Breakdown */}
                <div className="p-4 sm:p-6 rounded-2xl border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] space-y-5 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif-luxury text-base font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37] shrink-0" />
                      Sales Share by Collection Category
                    </h4>
                    <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] font-semibold uppercase shrink-0">Revenue %</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate">Engagement Rings & Solitaires</span>
                        <span className="font-bold text-[#B28359] dark:text-[#D4AF37] shrink-0">54% (£80,055)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E5DFD5] dark:bg-[#3D352E] overflow-hidden">
                        <div className="h-full rounded-full bg-[#B28359] dark:bg-[#D4AF37]" style={{ width: '54%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate">Fine Jewellery (Necklaces & Earrings)</span>
                        <span className="font-bold text-[#0284C7] dark:text-[#38BDF8] shrink-0">22% (£32,615)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E5DFD5] dark:bg-[#3D352E] overflow-hidden">
                        <div className="h-full rounded-full bg-[#0284C7] dark:bg-[#38BDF8]" style={{ width: '22%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate">Wedding & Eternity Bands</span>
                        <span className="font-bold text-[#8C5B32] dark:text-[#E2A676] shrink-0">16% (£23,720)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E5DFD5] dark:bg-[#3D352E] overflow-hidden">
                        <div className="h-full rounded-full bg-[#8C5B32] dark:bg-[#E2A676]" style={{ width: '16%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between gap-2 mb-1">
                        <span className="font-medium text-[#1C1917] dark:text-[#F5F2EB] truncate">Bespoke Atelier Commissions</span>
                        <span className="font-bold text-[#D4AF37] shrink-0">8% (£11,860)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E5DFD5] dark:bg-[#3D352E] overflow-hidden">
                        <div className="h-full rounded-full bg-[#D4AF37]" style={{ width: '8%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Metal preference strip */}
                  <div className="pt-4 border-t border-[#E8E2D7] dark:border-[#332E2A] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] block">
                      Metal Preference Distribution
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
                        <span className="font-bold text-amber-900 dark:text-amber-300 block">45%</span>
                        <span className="text-amber-800 dark:text-amber-400">18k Yellow</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-900 dark:text-slate-200 block">30%</span>
                        <span className="text-slate-700 dark:text-slate-300">Platinum</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#FAF9F5] dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B]">
                        <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB] block">15%</span>
                        <span className="text-[#78716C] dark:text-[#A3998E]">18k White</span>
                      </div>
                      <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60">
                        <span className="font-bold text-rose-900 dark:text-rose-300 block">10%</span>
                        <span className="text-rose-800 dark:text-rose-400">18k Rose</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diamond Specification & Cut Demand */}
                <div className="p-4 sm:p-6 rounded-2xl border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] space-y-5 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif-luxury text-base font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                      <Gem className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0" />
                      Diamond Spec & Cut Intelligence
                    </h4>
                    <span className="text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-bold uppercase bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800/60 shrink-0">
                      GIA & IGI
                    </span>
                  </div>

                  {/* Origin breakdown split bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold gap-2">
                      <span className="text-[#0284C7] dark:text-[#38BDF8]">Lab-Grown (62%)</span>
                      <span className="text-[#8C5B32] dark:text-[#E2A676]">Natural Mined (38%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#E5DFD5] dark:bg-[#3D352E] overflow-hidden flex">
                      <div className="h-full bg-[#0284C7] dark:bg-[#38BDF8]" style={{ width: '62%' }} />
                      <div className="h-full bg-[#8C5B32] dark:bg-[#B28359]" style={{ width: '38%' }} />
                    </div>
                    <p className="text-[10px] text-[#78716C] dark:text-[#A3998E]">
                      Lab-Grown items lead volume sales (AOV £3,400), while Natural diamonds command high-tier bespoke commissions (AOV £8,900).
                    </p>
                  </div>

                  {/* Popular Diamond Cuts list */}
                  <div className="pt-2 space-y-3 text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] block">
                      Most Requested Diamond Cuts
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B]">
                        <div>
                          <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB] block">Oval Cut</span>
                          <span className="text-[10px] text-[#78716C] dark:text-[#A3998E]">2.0ct - 2.5ct preferred</span>
                        </div>
                        <span className="font-bold text-[#B28359] dark:text-[#D4AF37]">34%</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B]">
                        <div>
                          <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB] block">Emerald Cut</span>
                          <span className="text-[10px] text-[#78716C] dark:text-[#A3998E]">VVS clarity leading</span>
                        </div>
                        <span className="font-bold text-[#0284C7] dark:text-[#38BDF8]">28%</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B]">
                        <div>
                          <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB] block">Round Brilliant</span>
                          <span className="text-[10px] text-[#78716C] dark:text-[#A3998E]">Ideal cut grade</span>
                        </div>
                        <span className="font-bold text-[#8C5B32] dark:text-[#E2A676]">22%</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B]">
                        <div>
                          <span className="font-bold text-[#1C1917] dark:text-[#F5F2EB] block">Radiant & Cushion</span>
                          <span className="text-[10px] text-[#78716C] dark:text-[#A3998E]">Elongated ratios</span>
                        </div>
                        <span className="font-bold text-[#D4AF37]">16%</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Top Performing Creations Leaderboard */}
              <div className="p-4 sm:p-6 rounded-2xl border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] space-y-4 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    Top Performing Atelier Creations
                  </h4>
                  <span className="text-xs text-[#78716C] dark:text-[#A3998E]">Ranked by total revenue generation</span>
                </div>

                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                  <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                    <thead>
                      <tr className="border-b border-[#EAE4DA] dark:border-[#332E2A] text-[#78716C] dark:text-[#A3998E] uppercase text-[10px] tracking-wider font-bold">
                        <th className="py-2.5 px-3">Rank</th>
                        <th className="py-2.5 px-3">Creation Name</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Orders</th>
                        <th className="py-2.5 px-3">Unit Price</th>
                        <th className="py-2.5 px-3">Total Sales Revenue</th>
                        <th className="py-2.5 px-3 text-right">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE4] dark:divide-[#2D2720]">
                      {products.slice(0, 5).map((prod, index) => {
                        const salesCount = [18, 14, 22, 9, 7][index] || 10;
                        const revenue = salesCount * prod.price;
                        return (
                          <tr key={prod.id} className="hover:bg-[#FAF6F0] dark:hover:bg-[#181614] transition-colors">
                            <td className="py-3 px-3">
                              <span className="w-6 h-6 rounded-full bg-[#1C1917] dark:bg-[#B28359] text-white flex items-center justify-center font-bold text-[11px]">
                                #{index + 1}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                              <div className="flex items-center gap-2.5">
                                <img src={prod.images[0]} alt={prod.title} className="w-8 h-8 rounded-lg object-cover border border-[#E5DFD5] dark:border-[#3D352E] shrink-0" />
                                <span>{prod.title}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-[#78716C] dark:text-[#A3998E] capitalize">{prod.category.replace('-', ' ')}</td>
                            <td className="py-3 px-3 font-bold text-[#1C1917] dark:text-[#F5F2EB]">{salesCount} units</td>
                            <td className="py-3 px-3 text-[#57534E] dark:text-[#D1C7BD]">£{prod.price.toLocaleString()}</td>
                            <td className="py-3 px-3 font-bold text-[#8C5B32] dark:text-[#D4AF37]">£{revenue.toLocaleString()}</td>
                            <td className="py-3 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                              <span className="inline-flex items-center gap-0.5">
                                <ArrowUp className="w-3 h-3" /> +{15 - index * 2}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shopify Transfer CTA Banner */}
              <div className="p-4 sm:p-6 rounded-2xl border border-[#B28359]/40 bg-gradient-to-r from-[#1C1917] to-[#2E2824] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <DownloadCloud className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#F5F2EB]">
                      Export Analytics & Shopify Catalog Data
                    </h4>
                  </div>
                  <p className="text-xs text-[#A8A29E] max-w-xl">
                    Sync live inventory and financial metrics directly into your Shopify admin panel or download raw CSV reports for accounting.
                  </p>
                </div>

                <button
                  onClick={() => setIsShopifyModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
                >
                  <DownloadCloud className="w-4 h-4 text-white" />
                  <span>Sync / Export CSV Data</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* MODALS */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <ShopifyTransferModal
        isOpen={isShopifyModalOpen}
        onClose={() => setIsShopifyModalOpen(false)}
        products={products}
      />

    </div>
  );
}
