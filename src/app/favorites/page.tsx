'use client'

import React from 'react'
import { Header } from '@/components/layout/header'
import { MenuItemCard } from '@/components/menu-item-card'
import { useFavoritesStore } from '@/lib/favorites-store'
import { Heart, Compass, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data lookup - in a real app, this would come from an API based on IDs
const ALL_ITEMS = [
    {
        id: 'beef-fry',
        name: 'Savory Beef Fry',
        price: 450,
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800',
        description: '1x • Medium Spicy',
        rating: 4.9,
    },
    {
        id: 'chicken-stew',
        name: 'Chicken Stew',
        price: 500,
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800',
        description: '1x • Mild',
        rating: 4.7,
    },
    {
        id: 'pilau',
        name: 'Swahili Pilau',
        price: 350,
        image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=800',
        description: '1x • Regular',
        rating: 4.8,
    },
]

export default function FavoritesPage() {
    const { favoriteIds } = useFavoritesStore()
    const favoriteItems = ALL_ITEMS.filter(item => favoriteIds.includes(item.id))

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container max-w-[1440px] px-6 lg:px-12 py-16">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center text-[#E67E22]">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                            My <span className="text-[#E67E22]">Favorites</span>
                        </h1>
                    </div>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl">
                        A curated collection of your most-loved African flavors. Ready to be ordered again at a moment's notice.
                    </p>
                </div>

                {favoriteItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {favoriteItems.map((item) => (
                            <MenuItemCard key={item.id} {...item} description={item.description || ''} />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center bg-gray-50 rounded-[3rem] border border-gray-100 px-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <Heart className="w-10 h-10 text-gray-200" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">No favorites yet</h2>
                        <p className="text-gray-400 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                            Start exploring our menu and tap the heart icon on any dish to save it here for later.
                        </p>
                        <Link href="/menu">
                            <Button size="lg" className="bg-[#E67E22] hover:bg-black text-white h-16 px-12 rounded-2xl font-black text-lg shadow-xl shadow-[#E67E22]/20">
                                Browse Menu
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Recommendations for empty state or to keep browsing */}
                {favoriteItems.length > 0 && (
                    <div className="mt-32 pt-16 border-t border-gray-50">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Discover More</h2>
                            <Link href="/menu" className="flex items-center gap-2 text-[#E67E22] font-black uppercase tracking-widest text-[10px] hover:translate-x-1 transition-transform">
                                Full Menu <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Placeholder for trending items */}
                            <div className="h-48 rounded-[2rem] bg-gray-50 border border-gray-100 p-8 flex flex-col justify-end group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                                <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-[0.3em] mb-2">Trending</span>
                                <p className="text-xl font-black text-gray-900 group-hover:text-[#E67E22] transition-colors">Swahili Breakfast Platters</p>
                            </div>
                            <div className="h-48 rounded-[2rem] bg-gray-50 border border-gray-100 p-8 flex flex-col justify-end group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                                <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-[0.3em] mb-2">Chef's Pick</span>
                                <p className="text-xl font-black text-gray-900 group-hover:text-[#E67E22] transition-colors">Slow-Roasted Goat Fry</p>
                            </div>
                            <div className="h-48 rounded-[2rem] bg-gray-50 border border-gray-100 p-8 flex flex-col justify-end group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                                <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-[0.3em] mb-2">New Arrival</span>
                                <p className="text-xl font-black text-gray-900 group-hover:text-[#E67E22] transition-colors">Artisanal Hibiscus Tea</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
