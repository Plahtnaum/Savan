'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { MenuItemCard } from '@/components/menu-item-card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Search, Play, ArrowRight, Sparkles, TrendingUp, Globe, Coffee, Soup, Utensils, CupSoda, ChefHat, HeartHandshake } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getMealContext } from '@/lib/meal-utils'

const FEATURED_ITEMS = [
  {
    id: 'beef-fry',
    name: 'Savory Beef Fry',
    price: 450,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800',
    description: '1x • Medium Spicy',
    tags: ['Popular'],
    rating: 4.9,
    prepTime: '25-30 min'
  },
  {
    id: 'chicken-stew',
    name: 'Chicken Stew',
    price: 500,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800',
    description: '1x • Mild',
    tags: ['Chef Special'],
    rating: 4.7,
    prepTime: '30-35 min'
  },
  {
    id: 'pilau',
    name: 'Swahili Pilau',
    price: 350,
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=800',
    description: '1x • Regular',
    tags: ['Bestseller'],
    rating: 4.8,
    prepTime: '20-25 min'
  },
  {
    id: 'tilapia',
    name: 'Wet Fry Tilapia',
    price: 650,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800',
    description: '1x • Tomato Gravy',
    tags: ['Premium'],
    rating: 4.9,
    prepTime: '35-40 min'
  }
]


const CATEGORIES = [
  { name: 'All', icon: Globe, type: 'All' },
  { name: 'Breakfast', icon: Coffee, type: 'Breakfast Snacks' },
  { name: 'Mains', icon: Utensils, type: 'Main Dishes' },
  { name: 'Plain', icon: Soup, type: 'Plain Dishes' },
  { name: 'Hot Drinks', icon: CupSoda, type: 'Hot Beverages' }
]

export default function HomePage() {
  const meal = getMealContext()
  const [activeCategory, setActiveCategory] = React.useState('All')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pb-32">
        {/* Adaptive Hero Section - Cinematic & Kenyan Focused */}
        <section className="relative h-[65vh] lg:h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={meal.type === 'breakfast'
                ? "https://images.unsplash.com/photo-1544787210-2213d24265cc?w=2400" // Tea & Mandazi vibe
                : meal.type === 'lunch'
                  ? "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=2400" // Pilau feast
                  : "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=2400" // Nyama Choma dinner
              }
              className="w-full h-full object-cover scale-105"
              alt="Authentic Kenyan Culinary Experience"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent lg:via-black/30"></div>
          </div>

          <div className="relative z-10 h-full container max-w-[1440px] px-6 sm:px-12 flex items-center">
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center gap-3 bg-[#E67E22] px-6 py-3 rounded-full mb-10 animate-premium-fade shadow-2xl shadow-[#E67E22]/30">
                <ChefHat className="w-5 h-5 text-white" />
                <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">{meal.greeting}</span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-10 leading-[0.8] tracking-tighter drop-shadow-2xl">
                FEAST ON<br />
                <span className="text-[#E67E22] inline-block mt-4">HERITAGE.</span>
              </h1>

              <p className="text-xl md:text-3xl text-white/95 font-medium max-w-2xl mb-14 leading-relaxed tracking-tight drop-shadow-xl">
                {meal.description} From the Highland farms to the Swahili coast, delivered with precision and heart.
              </p>

              <div className="flex flex-wrap gap-10 items-center">
                <Link href="/menu">
                  <Button size="lg" className="bg-[#E67E22] hover:bg-white hover:text-black text-white px-16 h-24 text-2xl font-black rounded-[2rem] shadow-[0_30px_60px_rgba(230,126,34,0.4)] active:scale-95 transition-all duration-500 uppercase tracking-[0.2em] border-none">
                    Explore Menu
                  </Button>
                </Link>
                <Link href="/menu?category=Main%20Dishes">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-24 px-12 rounded-[2rem] font-black text-xl transition-all uppercase tracking-widest leading-tight">
                    Today's Specials
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4 text-white/40">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr] mb-2">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* Categories Section - Flavors of Kenya */}
        <section className="container max-w-[1440px] mx-auto px-6 sm:px-12 py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-[#E67E22] text-xs font-black uppercase tracking-[0.4em] mb-4">Discover your palette</p>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6">Flavors of Kenya</h2>
              <p className="text-gray-400 font-medium text-lg italic">Explore a curated journey through our regional specialties and timeless classics.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.type
              const Icon = cat.icon
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.type)}
                  className={cn(
                    "group p-12 rounded-[4rem] transition-all duration-700 flex flex-col items-center text-center relative overflow-hidden border",
                    isActive
                      ? "bg-gray-900 border-gray-900 text-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] -translate-y-4"
                      : "bg-white border-gray-100 text-gray-900 hover:border-[#E67E22]/30 hover:shadow-2xl"
                  )}
                >
                  <div className={cn(
                    "w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-700",
                    isActive ? "bg-[#E67E22] scale-110 rotate-6" : "bg-gray-50 group-hover:bg-[#E67E22]/5 group-hover:scale-110"
                  )}>
                    <Icon className={cn(
                      "w-10 h-10 transition-colors duration-700",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-[#E67E22]"
                    )} />
                  </div>
                  <h3 className="font-black text-xl mb-2 tracking-tight">{cat.name}</h3>
                  <p className={cn(
                    "text-[10px] font-black uppercase tracking-[0.3em]",
                    isActive ? "text-[#E67E22]" : "text-gray-300"
                  )}>
                    {isActive ? 'Taste Now' : 'Explore'}
                  </p>

                  {isActive && (
                    <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-[#E67E22] animate-ping" />
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Featured Section - Multi-Column Adaptive Grid */}
        <section className="bg-gray-50/50 py-24">
          <div className="container max-w-[1440px] mx-auto px-4 sm:px-8">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E67E22] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">Chef's Masterpieces</h2>
                  <p className="text-gray-400 font-bold text-sm">Hand-picked selections that define our culinary soul</p>
                </div>
              </div>
              <Link href="/menu" className="hidden sm:flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-gray-100 font-black text-xs text-gray-900 shadow-sm hover:shadow-md transition-all uppercase tracking-widest">
                See Full Menu
                <ArrowRight className="w-4 h-4 text-[#E67E22]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {FEATURED_ITEMS.map((item) => (
                <MenuItemCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic CTA Section */}
        <section className="container max-w-[1440px] mx-auto px-4 sm:px-8 py-24">
          <div className="bg-[#1A1A1A] rounded-[3rem] p-12 lg:p-24 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <p className="text-[#E67E22] text-xs font-black uppercase tracking-[0.4em] mb-4">The Savan Family</p>
                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
                  Nourishing Your Spirit,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">One Plate at a Time.</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
                  <Button size="lg" className="bg-[#E67E22] text-white hover:bg-white hover:text-black h-20 px-14 rounded-[2rem] font-black text-lg transition-all active:scale-95 shadow-2xl shadow-[#E67E22]/20 border-none uppercase tracking-widest">
                    Join Our Inner Circle
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-20 px-14 rounded-[2rem] font-black text-lg transition-all uppercase tracking-widest">
                    Our Heritage
                  </Button>
                </div>
              </div>

              <div className="hidden lg:grid grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                  <div className="h-64 rounded-3xl overflow-hidden shadow-2xl rotate-2">
                    <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="h-48 rounded-3xl overflow-hidden shadow-2xl -rotate-2 bg-[#E67E22] flex items-center justify-center p-8 text-white">
                    <p className="text-3xl font-black italic">500+ Active Members</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-48 rounded-3xl overflow-hidden shadow-2xl -rotate-1 bg-white/5 backdrop-blur-md flex flex-col justify-end p-8 text-white border border-white/10">
                    <p className="text-sm font-bold opacity-60">Customer Satisfaction</p>
                    <p className="text-4xl font-black tracking-tighter">4.9/5 ★</p>
                  </div>
                  <div className="h-64 rounded-3xl overflow-hidden shadow-2xl rotate-3">
                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" className="w-full h-full object-cover" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* High-Fidelity Desktop Footer */}
        <footer className="container max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-gray-100 pt-32 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-8">
                <span className="text-3xl font-black text-gray-900 tracking-tighter">
                  Savan<span className="text-[#E67E22]">.</span>
                </span>
              </Link>
              <p className="text-gray-400 font-medium text-lg max-w-sm mb-12 leading-relaxed">
                Re-defining the African dining experience through innovation, heritage, and uncompromising quality.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <div key={social} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#E67E22] hover:bg-[#E67E22]/5 transition-all cursor-pointer border border-transparent hover:border-[#E67E22]/20">
                    <span className="text-[10px] font-black uppercase tracking-tighter">{social}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-8">Navigation</h5>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><Link href="/menu" className="hover:text-gray-900 transition-colors">Digital Menu</Link></li>
                <li><Link href="/order/tracking" className="hover:text-gray-900 transition-colors">Track Your Feast</Link></li>
                <li><Link href="/locations" className="hover:text-gray-900 transition-colors">Our Kitchen Hubs</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-8">Company</h5>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><Link href="/story" className="hover:text-gray-900 transition-colors">Our Story</Link></li>
                <li><Link href="/careers" className="hover:text-gray-900 transition-colors">Join Team</Link></li>
                <li><Link href="/press" className="hover:text-gray-900 transition-colors">Press</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-8">Legal</h5>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Use</Link></li>
                <li><Link href="/disclaimer" className="hover:text-gray-900 transition-colors">Safety</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-gray-50 gap-8">
            <p className="text-gray-300 font-bold text-xs uppercase tracking-widest">© 2026 Savan Eats. Crafted with Passion.</p>
            <div className="flex gap-4 items-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </footer>
      </main>

      <BottomNav />
    </div>
  )
}
