'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  ShieldCheck, 
  Gem, 
  Lock, 
  Phone, 
  Mail, 
  Building, 
  Heart,
  Check,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CustomerProfile, CustomerAddress, CustomerPaymentCard } from '@/types';
import profileBadgeImg from '@/assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

export default function CustomerAccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'cards' | 'orders' | 'appointments'>('profile');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Profile State
  const [profile, setProfile] = useState<CustomerProfile>({
    title: 'Lady',
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@mayfair-atelier.co.uk',
    phone: '+44 7737 806748',
    anniversaryDate: '2026-10-14',
    preferredRingSize: 'M',
    vipTier: 'Gold Patron VIP'
  });

  // 2. Addresses State
  const [addresses, setAddresses] = useState<CustomerAddress[]>([
    {
      id: 'addr-1',
      label: 'Home - Kensington Residence',
      recipientName: 'Lady Eleanor Vance',
      addressLine1: '14 Kensington Palace Gardens',
      addressLine2: 'Apartment 4B',
      city: 'London',
      postcode: 'W8 4QP',
      country: 'United Kingdom',
      isDefault: true
    },
    {
      id: 'addr-[#2]',
      label: 'Mayfair Executive Office',
      recipientName: 'Lady Eleanor Vance',
      addressLine1: '28 Grosvenor Street',
      addressLine2: 'Suite 200',
      city: 'London',
      postcode: 'W1K 4QR',
      country: 'United Kingdom',
      isDefault: false
    }
  ]);

  // 3. Payment Cards State
  const [cards, setCards] = useState<CustomerPaymentCard[]>([
    {
      id: 'card-1',
      cardholderName: 'LADY ELEANOR VANCE',
      cardNumberMasked: '•••• •••• •••• 8842',
      expiryDate: '09/29',
      brand: 'Amex',
      isDefault: true
    },
    {
      id: 'card-2',
      cardholderName: 'ELEANOR VANCE',
      cardNumberMasked: '•••• •••• •••• 4242',
      expiryDate: '11/28',
      brand: 'Visa',
      isDefault: false
    }
  ]);

  // Modals & Forms State
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Secondary Residence');
  const [newAddrName, setNewAddrName] = useState(profile.firstName + ' ' + profile.lastName);
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newAddrLine2, setNewAddrLine2] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('London');
  const [newAddrPostcode, setNewAddrPostcode] = useState('');
  const [newAddrCountry, setNewAddrCountry] = useState('United Kingdom');
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);

  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCardName, setNewCardName] = useState(profile.firstName + ' ' + profile.lastName);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCvc, setNewCardCvc] = useState('');
  const [newCardBrand, setNewCardBrand] = useState<'Visa' | 'Mastercard' | 'Amex'>('Visa');
  const [newCardIsDefault, setNewCardIsDefault] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('ead_customer_profile');
      if (savedProfile) setProfile(JSON.parse(savedProfile));

      const savedAddr = localStorage.getItem('ead_customer_addresses');
      if (savedAddr) setAddresses(JSON.parse(savedAddr));

      const savedCards = localStorage.getItem('ead_customer_cards');
      if (savedCards) setCards(JSON.parse(savedCards));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('ead_customer_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
    showToast('Personal profile & preferences saved!');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine1 || !newAddrPostcode) return;

    let updated = [...addresses];
    if (newAddrIsDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }

    const newAddressItem: CustomerAddress = {
      id: `addr-${Date.now()}`,
      label: newAddrLabel || 'New Address',
      recipientName: newAddrName || `${profile.firstName} ${profile.lastName}`,
      addressLine1: newAddrLine1,
      addressLine2: newAddrLine2,
      city: newAddrCity || 'London',
      postcode: newAddrPostcode,
      country: newAddrCountry,
      isDefault: newAddrIsDefault || updated.length === 0
    };

    const finalAddresses = [newAddressItem, ...updated];
    setAddresses(finalAddresses);
    try {
      localStorage.setItem('ead_customer_addresses', JSON.stringify(finalAddresses));
    } catch (e) {
      console.error(e);
    }

    setIsAddAddressOpen(false);
    setNewAddrLine1('');
    setNewAddrLine2('');
    setNewAddrPostcode('');
    showToast('New delivery address saved successfully!');
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    try {
      localStorage.setItem('ead_customer_addresses', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Address removed from account.');
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || !newCardExpiry) return;

    let updated = [...cards];
    if (newCardIsDefault) {
      updated = updated.map((c) => ({ ...c, isDefault: false }));
    }

    const cleanNum = newCardNumber.replace(/\s+/g, '');
    const masked = `•••• •••• •••• ${cleanNum.slice(-4) || '1234'}`;

    const newCardItem: CustomerPaymentCard = {
      id: `card-${Date.now()}`,
      cardholderName: (newCardName || `${profile.firstName} ${profile.lastName}`).toUpperCase(),
      cardNumberMasked: masked,
      expiryDate: newCardExpiry,
      brand: newCardBrand,
      isDefault: newCardIsDefault || updated.length === 0
    };

    const finalCards = [newCardItem, ...updated];
    setCards(finalCards);
    try {
      localStorage.setItem('ead_customer_cards', JSON.stringify(finalCards));
    } catch (e) {
      console.error(e);
    }

    setIsAddCardOpen(false);
    setNewCardNumber('');
    setNewCardExpiry('');
    setNewCardCvc('');
    showToast('New payment card encrypted & saved to vault!');
  };

  const handleDeleteCard = (id: string) => {
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    try {
      localStorage.setItem('ead_customer_cards', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Payment card removed from saved cards.');
  };

  // Mock Order History
  const mockOrders = [
    {
      id: 'EAD-ORD-9021',
      date: '02 Aug 2026',
      productName: 'The Eternity Crest Oval Solitaire',
      metal: '18k Yellow Gold',
      carat: '2.00ct Oval Cut (GIA D/VVS1)',
      price: 3450,
      status: 'Delivered • Insured Special Courier',
      img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'EAD-ORD-8812',
      date: '14 May 2026',
      productName: 'The Royal Pavilion 5.00ct Tennis Bracelet',
      metal: '18k White Gold',
      carat: '5.00ct Round Brilliant Lab Grown',
      price: 4950,
      status: 'Completed • Certified & Hallmarked',
      img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#0E0D0C] text-[#1C1917] dark:text-[#F5F2EB] flex flex-col transition-colors">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white border border-[#B28359] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#B28359]" />
          <span className="font-medium">{toastMsg}</span>
        </div>
      )}

      {/* TOP LUXURY NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 dark:bg-[#1C1917]/95 backdrop-blur-md text-[#1C1917] dark:text-white border-b border-[#EAE4DA] dark:border-[#332E2A] shadow-xs px-4 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#B28359] to-[#F3E5D8]">
              <img 
                src={profileBadgeImgSrc} 
                alt="Ever After Emblem" 
                className="w-full h-full object-cover rounded-full bg-white dark:bg-[#1C1917]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand-display text-lg font-bold tracking-[0.16em] uppercase text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#B28359] dark:group-hover:text-[#D4AF37] transition-colors">
                  EVER AFTER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FDF8F3] dark:bg-[#B28359]/20 border border-[#E5D5C3] dark:border-[#B28359]/50 text-[#8C5B32] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                  Client Portal
                </span>
              </div>
              <span className="text-[10px] tracking-[0.24em] text-[#78716C] dark:text-[#A8A29E] uppercase block font-semibold">
                PRIVATE CLIENT ACCOUNT
              </span>
            </div>
          </Link>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs shrink-0">
            {/* Theme Toggle: Shown on desktop (md+) */}
            <div className="hidden md:flex items-center">
              <ThemeToggle variant="pill" />
            </div>

            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F2EB] dark:bg-white/10 hover:bg-[#EAE4DA] dark:hover:bg-white/20 border border-[#E0D8CB] dark:border-white/20 text-[#57534E] dark:text-[#EADDCB] font-semibold uppercase tracking-wider transition-all"
            >
              <Building className="w-3.5 h-3.5 text-[#8C5B32] dark:text-[#D4AF37]" />
              <span>Admin Portal</span>
            </Link>

            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-[#B28359] dark:bg-[#D4AF37] hover:bg-[#9E7249] dark:hover:bg-[#C59F2D] text-white dark:text-[#141210] font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </Link>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1C1917] dark:text-[#F5F2EB] hover:bg-[#F5F2EB] dark:hover:bg-[#2A241E] rounded-full border border-[#E0D8CB] dark:border-[#3D352E] transition-colors"
              aria-label="Toggle Menu"
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
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#F5F2EB] dark:bg-[#211E1A] border border-[#E0D8CB] dark:border-[#3D352E] text-[#57534E] dark:text-[#EADDCB] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Building className="w-4 h-4 text-[#8C5B32] dark:text-[#D4AF37]" />
                <span>Admin Portal</span>
              </Link>

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Storefront</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* CLIENT BANNER HERO */}
      <div className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#F5EFE6] dark:from-[#1C1917] dark:via-[#2A241F] dark:to-[#1C1917] text-[#1C1917] dark:text-white border-b border-[#EAE3D5] dark:border-[#3D352E] py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FDF8F3] dark:bg-[#B28359]/30 border border-[#E5D5C3] dark:border-[#B28359] text-[#8C5B32] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Gem className="w-3.5 h-3.5 text-[#8C5B32] dark:text-[#D4AF37]" />
                <span>{profile.vipTier}</span>
              </span>
              <span className="text-xs text-[#78716C] dark:text-[#A8A29E]">• Member since 2024</span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Welcome Back, {profile.title} {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-xs text-[#57534E] dark:text-[#A8A29E] max-w-xl">
              Manage your personal preferences, verified delivery addresses, encrypted payment methods, and bespoke commission status.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E5DFD5] dark:border-white/10 text-center shadow-xs">
              <span className="text-[10px] text-[#78716C] dark:text-[#A8A29E] uppercase tracking-wider block font-medium">Ring Size</span>
              <span className="font-bold text-sm text-[#8C5B32] dark:text-[#D4AF37]">UK Size {profile.preferredRingSize}</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#E5DFD5] dark:border-white/10 text-center shadow-xs">
              <span className="text-[10px] text-[#78716C] dark:text-[#A8A29E] uppercase tracking-wider block font-medium">Concierge Status</span>
              <span className="font-bold text-sm text-emerald-700 dark:text-emerald-400">Active VIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR TABS NAVIGATION */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white dark:bg-[#181614] rounded-3xl border border-[#E5DFD5] dark:border-[#3A332B] p-3 shadow-xs space-y-1 transition-colors">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full px-4 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-between ${
                  activeTab === 'profile'
                    ? 'bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] shadow-xs'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#FAF9F5] dark:hover:bg-[#211E1A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-white dark:text-[#141210]' : 'text-[#8C5B32] dark:text-[#D4AF37]'}`} />
                  <span>Personal Profile</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full px-4 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-between ${
                  activeTab === 'addresses'
                    ? 'bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] shadow-xs'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#FAF9F5] dark:hover:bg-[#211E1A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className={`w-4 h-4 ${activeTab === 'addresses' ? 'text-white dark:text-[#141210]' : 'text-[#8C5B32] dark:text-[#D4AF37]'}`} />
                  <span>Delivery Addresses ({addresses.length})</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('cards')}
                className={`w-full px-4 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-between ${
                  activeTab === 'cards'
                    ? 'bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] shadow-xs'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#FAF9F5] dark:hover:bg-[#211E1A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className={`w-4 h-4 ${activeTab === 'cards' ? 'text-white dark:text-[#141210]' : 'text-[#8C5B32] dark:text-[#D4AF37]'}`} />
                  <span>Payment Cards ({cards.length})</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full px-4 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-between ${
                  activeTab === 'orders'
                    ? 'bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] shadow-xs'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#FAF9F5] dark:hover:bg-[#211E1A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className={`w-4 h-4 ${activeTab === 'orders' ? 'text-white dark:text-[#141210]' : 'text-[#8C5B32] dark:text-[#D4AF37]'}`} />
                  <span>Vault Orders ({mockOrders.length})</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full px-4 py-3 rounded-2xl text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-between ${
                  activeTab === 'appointments'
                    ? 'bg-[#B28359] dark:bg-[#D4AF37] text-white dark:text-[#141210] shadow-xs'
                    : 'text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#FAF9F5] dark:hover:bg-[#211E1A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className={`w-4 h-4 ${activeTab === 'appointments' ? 'text-white dark:text-[#141210]' : 'text-[#8C5B32] dark:text-[#D4AF37]'}`} />
                  <span>Salon Appointments</span>
                </div>
              </button>
            </div>

            {/* Assistance card */}
            <div className="p-5 rounded-3xl bg-[#FAF9F5] dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] space-y-2 text-xs">
              <span className="font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-wider block">
                Mayfair Concierge Hotline
              </span>
              <p className="text-[#78716C] dark:text-[#A3998E] text-[11px]">
                Need assistance with diamond customization or order changes?
              </p>
              <div className="pt-1 font-semibold text-[#1C1917] dark:text-[#F5F2EB] space-y-1">
                <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#B28359]" /> 020 8166 6365</p>
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#B28359]" /> concierge@everafterdiamonds.co.uk</p>
              </div>
            </div>
          </div>

          {/* TAB CONTENTS CONTAINER */}
          <div className="lg:col-span-9">
            
            {/* TAB 1: PERSONAL PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-[#181614] rounded-3xl border border-[#E5DFD5] dark:border-[#3A332B] p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37]" />
                    Personal Information & Preferences
                  </h3>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                    Update your primary identity, contact details, and ring sizing preferences.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                        Title / Honorific
                      </label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        placeholder="e.g. Lady / Sir / Ms."
                        className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                        Telephone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                        Preferred UK Ring Size
                      </label>
                      <select
                        value={profile.preferredRingSize || 'M'}
                        onChange={(e) => setProfile({ ...profile, preferredRingSize: e.target.value })}
                        className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      >
                        {['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((s) => (
                          <option key={s} value={s}>
                            UK Ring Size {s} {s === 'M' ? '(Average Female)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                        Special Anniversary / Date
                      </label>
                      <input
                        type="date"
                        value={profile.anniversaryDate || ''}
                        onChange={(e) => setProfile({ ...profile, anniversaryDate: e.target.value })}
                        className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EAE4DA] dark:border-[#332E2A] flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#B28359]/20 flex items-center gap-2 active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: DELIVERY ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white dark:bg-[#181614] rounded-3xl border border-[#E5DFD5] dark:border-[#3A332B] p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE4DA] dark:border-[#332E2A]">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37]" />
                      Saved Delivery & Billing Addresses
                    </h3>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                      Insured Royal Mail Special Delivery addresses associated with your account.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddAddressOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {/* List of saved addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                        addr.isDefault
                          ? 'border-[#B28359] dark:border-[#D4AF37] bg-[#FAF6F0] dark:bg-[#261E17] ring-1 ring-[#B28359]/30'
                          : 'border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs uppercase tracking-wider text-[#8C5B32] dark:text-[#D4AF37]">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                              Default Address
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm text-[#1C1917] dark:text-[#F5F2EB]">{addr.recipientName}</h4>
                        <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                          {addr.addressLine1} {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                        </p>
                        <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                          {addr.city}, {addr.postcode}
                        </p>
                        <p className="text-xs text-[#78716C] dark:text-[#A3998E] font-medium">{addr.country}</p>
                      </div>

                      <div className="pt-3 border-t border-[#E8E2D7] dark:border-[#332E2A] flex items-center justify-between">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => {
                              const updated = addresses.map((a) => ({
                                ...a,
                                isDefault: a.id === addr.id
                              }));
                              setAddresses(updated);
                              localStorage.setItem('ead_customer_addresses', JSON.stringify(updated));
                              showToast(`Set "${addr.label}" as default address.`);
                            }}
                            className="text-xs text-[#0284C7] dark:text-[#38BDF8] font-bold hover:underline"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#8C5B32] dark:text-[#D4AF37] font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Primary Delivery Location
                          </span>
                        )}

                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                          title="Remove Address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Address Form Dialog Inline / Section */}
                {isAddAddressOpen && (
                  <form onSubmit={handleAddAddress} className="p-6 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#B28359]/40 space-y-4 animate-in fade-in duration-200">
                    <h4 className="font-serif-luxury text-base font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      Add New Delivery Location
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Address Label *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Country Estate, London Residence"
                          value={newAddrLabel}
                          onChange={(e) => setNewAddrLabel(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Recipient Name *</label>
                        <input
                          type="text"
                          required
                          value={newAddrName}
                          onChange={(e) => setNewAddrName(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Address Line 1 *</label>
                        <input
                          type="text"
                          required
                          placeholder="Street name & house number"
                          value={newAddrLine1}
                          onChange={(e) => setNewAddrLine1(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          placeholder="Suite, apartment, unit"
                          value={newAddrLine2}
                          onChange={(e) => setNewAddrLine2(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Town / City *</label>
                        <input
                          type="text"
                          required
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Postcode / ZIP *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. W8 4QP"
                          value={newAddrPostcode}
                          onChange={(e) => setNewAddrPostcode(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Country</label>
                        <input
                          type="text"
                          value={newAddrCountry}
                          onChange={(e) => setNewAddrCountry(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAddrIsDefault}
                          onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                          className="rounded border-[#E5DFD5] text-[#B28359] focus:ring-[#B28359]"
                        />
                        <span>Set as primary default delivery address</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddAddressOpen(false)}
                          className="px-4 py-2 rounded-full border border-[#E5DFD5] dark:border-[#3D352E] text-xs text-[#78716C] dark:text-[#A3998E]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-full bg-[#B28359] text-white text-xs font-bold uppercase tracking-wider"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: PAYMENT CARDS */}
            {activeTab === 'cards' && (
              <div className="bg-white dark:bg-[#181614] rounded-3xl border border-[#E5DFD5] dark:border-[#3A332B] p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE4DA] dark:border-[#332E2A]">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37]" />
                      Vault Saved Payment Cards
                    </h3>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                      256-bit encrypted credit and debit cards for swift 1-click checkout.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddCardOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Card</span>
                  </button>
                </div>

                {/* Saved Cards List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cards.map((c) => (
                    <div
                      key={c.id}
                      className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                        c.isDefault
                          ? 'border-[#B28359] dark:border-[#D4AF37] bg-gradient-to-br from-[#1C1917] to-[#2E2824] text-white shadow-md'
                          : 'border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] text-[#1C1917] dark:text-[#F5F2EB]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold tracking-widest uppercase ${c.isDefault ? 'text-[#D4AF37]' : 'text-[#8C5B32] dark:text-[#D4AF37]'}`}>
                            {c.brand} • {c.isDefault ? 'Primary' : 'Card'}
                          </span>
                          <Lock className={`w-4 h-4 ${c.isDefault ? 'text-[#D4AF37]' : 'text-[#78716C]'}`} />
                        </div>

                        <div>
                          <span className={`font-mono text-base tracking-widest block font-bold ${c.isDefault ? 'text-white' : 'text-[#1C1917] dark:text-[#F5F2EB]'}`}>
                            {c.cardNumberMasked}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className={`text-[10px] uppercase block ${c.isDefault ? 'text-[#A8A29E]' : 'text-[#78716C] dark:text-[#A3998E]'}`}>Cardholder</span>
                            <span className="font-semibold uppercase">{c.cardholderName}</span>
                          </div>
                          <div>
                            <span className={`text-[10px] uppercase block ${c.isDefault ? 'text-[#A8A29E]' : 'text-[#78716C] dark:text-[#A3998E]'}`}>Expires</span>
                            <span className="font-semibold">{c.expiryDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`pt-3 border-t flex items-center justify-between ${c.isDefault ? 'border-white/10' : 'border-[#E8E2D7] dark:border-[#332E2A]'}`}>
                        {!c.isDefault ? (
                          <button
                            onClick={() => {
                              const updated = cards.map((item) => ({
                                ...item,
                                isDefault: item.id === c.id
                              }));
                              setCards(updated);
                              localStorage.setItem('ead_customer_cards', JSON.stringify(updated));
                              showToast(`Set "${c.brand} ${c.cardNumberMasked.slice(-4)}" as primary card.`);
                            }}
                            className="text-xs text-[#0284C7] dark:text-[#38BDF8] font-bold hover:underline"
                          >
                            Set Primary
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            Default Checkout Payment Method
                          </span>
                        )}

                        <button
                          onClick={() => handleDeleteCard(c.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            c.isDefault
                              ? 'text-rose-300 hover:bg-white/10'
                              : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50'
                          }`}
                          title="Remove Card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Payment Card Modal Form */}
                {isAddCardOpen && (
                  <form onSubmit={handleAddCard} className="p-6 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#B28359]/40 space-y-4 animate-in fade-in duration-200">
                    <h4 className="font-serif-luxury text-base font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                      Add Encrypted Credit / Debit Card
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Card Brand</label>
                        <select
                          value={newCardBrand}
                          onChange={(e) => setNewCardBrand(e.target.value as any)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        >
                          <option value="Visa">Visa Credit / Debit</option>
                          <option value="Mastercard">Mastercard World Elite</option>
                          <option value="Amex">American Express Centurion / Platinum</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Cardholder Name *</label>
                        <input
                          type="text"
                          required
                          value={newCardName}
                          onChange={(e) => setNewCardName(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Card Number *</label>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="4532 •••• •••• 8842"
                          value={newCardNumber}
                          onChange={(e) => setNewCardNumber(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase text-[#78716C] dark:text-[#A3998E] block mb-1">Expiry Date *</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY (e.g. 08/29)"
                          value={newCardExpiry}
                          onChange={(e) => setNewCardExpiry(e.target.value)}
                          className="w-full bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newCardIsDefault}
                          onChange={(e) => setNewCardIsDefault(e.target.checked)}
                          className="rounded border-[#E5DFD5] text-[#B28359] focus:ring-[#B28359]"
                        />
                        <span>Set as primary checkout payment card</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddCardOpen(false)}
                          className="px-4 py-2 rounded-full border border-[#E5DFD5] dark:border-[#3D352E] text-xs text-[#78716C] dark:text-[#A3998E]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-full bg-[#B28359] text-white text-xs font-bold uppercase tracking-wider"
                        >
                          Save Payment Card
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 4: VAULT ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-[#181614] rounded-3xl border border-[#E5DFD5] dark:border-[#3A332B] p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37]" />
                    Vault Orders & Fine Commission History
                  </h3>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                    Track past ring purchases, GIA dossiers, and royal mail insured deliveries.
                  </p>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] space-y-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={ord.img}
                          alt={ord.productName}
                          className="w-16 h-16 rounded-xl object-cover border border-[#E5DFD5] dark:border-[#3D352E] shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold font-mono text-[#8C5B32] dark:text-[#D4AF37]">{ord.id}</span>
                            <span className="text-xs text-[#78716C] dark:text-[#A3998E]">({ord.date})</span>
                          </div>
                          <h4 className="font-semibold text-sm text-[#1C1917] dark:text-[#F5F2EB]">{ord.productName}</h4>
                          <p className="text-xs text-[#78716C] dark:text-[#A3998E]">{ord.metal} • {ord.carat}</p>
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                            ✓ {ord.status}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif-luxury text-lg font-bold text-[#1C1917] dark:text-[#F5F2EB] block">
                          £{ord.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => showToast(`Downloading receipt & GIA dossier for ${ord.id}...`)}
                          className="text-xs text-[#0284C7] dark:text-[#38BDF8] font-semibold hover:underline mt-1 block"
                        >
                          Download GIA Dossier PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SALON APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <div className="bg-white dark:bg-[#181614] rounded-3xl border border-[#E5DFD5] dark:border-[#3A332B] p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#B28359] dark:text-[#D4AF37]" />
                    Mayfair Private Salon Appointments
                  </h3>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                    Your reserved viewing consultations at 28 Grosvenor Street, Mayfair.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8C5B32] dark:text-[#D4AF37] uppercase tracking-wider">
                      Showroom Booking C-901
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                      Confirmed Salon Reservation
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base text-[#1C1917] dark:text-[#F5F2EB]">
                      Bespoke Engagement Ring Consultation
                    </h4>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                      Senior Jeweller Concierge: Lord Alistair Croft
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E2D7] dark:border-[#332E2A] text-xs text-[#1C1917] dark:text-[#F5F2EB] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-[#0284C7] dark:text-[#38BDF8] font-semibold">📅 Today at 14:30 GMT</p>
                    <p className="text-[#78716C] dark:text-[#A3998E]">Location: 28 Grosvenor Street, Mayfair, London W1K 4QR</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
}
