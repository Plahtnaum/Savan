'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { MenuItemCard } from '@/components/menu-item-card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Search, Play, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
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
  { name: 'All Day', icon: '🌍', type: 'all' },
  { name: 'Breakfast', icon: '🍳', type: 'breakfast' },
  { name: 'Lunch', icon: '🍲', type: 'lunch' },
  { name: 'Main Dish', icon: '🍗', type: 'main' },
  { name: 'Desserts', icon: '🍰', type: 'dessert' }
]

export default function HomePage() {
  const meal = getMealContext()
  const [activeCategory, setActiveCategory] = React.useState('all')

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pb-32">
        {/* Adaptive Hero Section - Cinematic Layout with Dynamic Spotlight */}
        <section className="relative h-[65vh] lg:h-[80vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={meal.type === 'breakfast'
                ? "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=2400"
                : meal.type === 'lunch'
                  ? "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=2400"
                  : "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=2400"
              }
              className="w-full h-full object-cover scale-105"
              alt="Cinematic African Dining"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent lg:via-black/20"></div>
          </div>

          <div className="relative z-10 h-full container max-w-[1440px] px-4 sm:px-8 flex items-center">
            <div className="max-w-4xl text-left lg:pl-16">
              <div className="inline-flex items-center gap-3 bg-[#E67E22] px-5 py-2.5 rounded-full mb-10 animate-premium-fade shadow-2xl shadow-[#E67E22]/20">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white text-[11px] font-black uppercase tracking-[0.3em]">{meal.greeting} • Spotlight</span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter drop-shadow-2xl">
                {meal.type === 'breakfast' ? 'RE-AWAKEN' : meal.type === 'lunch' ? 'FUEL THE' : 'CELEBRATE'}<br />
                <span className="text-[#E67E22] inline-block mt-2">YOUR SOUL.</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mb-14 leading-relaxed tracking-tight drop-shadow-lg">
                {meal.description} Crafted with authentic African heritage and delivered with modern precision.
              </p>

              <div className="flex flex-wrap gap-8 items-center">
                <Link href="/menu">
                  <Button size="lg" className="bg-[#E67E22] hover:bg-white hover:text-black text-white px-14 h-20 text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(230,126,34,0.3)] active:scale-95 transition-all duration-500 uppercase tracking-widest border-none">
                    Explore Menu
                  </Button>
                </Link>
                <button className="flex items-center gap-6 group">
                  <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center text-white bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-white font-black uppercase tracking-[0.2em] text-xs transition-colors group-hover:text-[#E67E22]">Watch Our Story</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator - Desktop Only */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4 text-white/30">
            <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] [writing-mode:vertical-lr]">Scroll</span>
          </div>
        </section>

        {/* Categories Section - High-Fidelity Categorization Hub */}
        <section className="container max-w-[1440px] mx-auto px-4 sm:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[#E67E22] text-xs font-black uppercase tracking-widest mb-2">Refined Discovery</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Categorization Hub</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.type
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.type)}
                  className={cn(
                    "group p-10 rounded-[3rem] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden border",
                    isActive
                      ? "bg-gray-900 border-gray-900 text-white shadow-2xl shadow-gray-200 -translate-y-2"
                      : "bg-white border-gray-100 text-gray-900 hover:border-[#E67E22]/30 hover:shadow-xl"
                  )}
                >
                  <div className={cn(
                    "text-5xl mb-6 transform transition-transform duration-500",
                    isActive ? "scale-110" : "group-hover:scale-110 group-hover:rotate-6"
                  )}>
                    {cat.icon}
                  </div>
                  <h3 className="font-black text-lg mb-1 tracking-tight">{cat.name}</h3>
                  <p className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    isActive ? "text-[#E67E22]" : "text-gray-400"
                  )}>
                    {isActive ? 'Currently Active' : 'Explore All'}
                  </p>

                  {isActive && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
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
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Signature Dishes</h2>
                  <p className="text-gray-400 font-bold text-sm">Our chef's highly recommended selections</p>
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
                <p className="text-[#E67E22] text-xs font-black uppercase tracking-[0.3em] mb-4">Join the community</p>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
                  Every Meal Counts<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Towards a Better You.</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 h-16 px-12 rounded-2xl font-black text-lg transition-all active:scale-95">
                    Join Savan Rewards
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16 px-12 rounded-2xl font-black text-lg transition-all">
                    Learn More
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
                <li><Link href="/track" className="hover:text-gray-900 transition-colors">Track Order</Link></li>
                <li><Link href="/locations" className="hover:text-gray-900 transition-colors">Our Hubs</Link></li>
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
