'use client'

import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { MenuItemCard } from '@/components/menu-item-card'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CATEGORIES, MENU_ITEMS } from '@/lib/menu-data'
import { useState, Suspense } from 'react'
import { Search, SlidersHorizontal, ChevronLeft, Filter, X, ChefHat, LayoutGrid } from 'lucide-react'
import Link from 'next/link'

function MenuContent() {
    const searchParams = useSearchParams()
    const initialCategory = searchParams.get('category') || 'All'
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredItems = MENU_ITEMS.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
        const matchesSearch = searchQuery === '' ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
            {/* Header & Elite Search Experience */}
            <div className="flex flex-col gap-10 mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-[#E67E22]/10 px-4 py-2 rounded-full mb-6 text-[#E67E22] border border-[#E67E22]/20 shadow-sm animate-premium-fade">
                            <ChefHat className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Savan Kitchen</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.8] mb-6">
                            Discover <br /> <span className="text-[#E67E22]">Flavors.</span>
                        </h1>
                        <p className="text-gray-400 font-bold text-lg max-w-xl leading-relaxed">
                            Experience the soul of Kenyan heritage, prepared with heart and delivered with precision.
                        </p>
                    </div>

                    {/* Desktop Premium Search */}
                    <div className="relative group w-full md:w-[400px]">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E67E22] transition-colors" />
                        <input
                            type="search"
                            placeholder="Find a masterpiece..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-16 pl-16 pr-8 rounded-[1.25rem] bg-gray-50 border border-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-gray-900 transition-all font-bold placeholder:text-gray-300 shadow-sm group-hover:shadow-md"
                        />
                    </div>
                </div>

                {/* Elegant On-Page Category Navigation */}
                <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 pb-10">
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-10 py-4 rounded-[1.5rem] text-sm font-black transition-all duration-500 relative border uppercase tracking-widest",
                                    isActive
                                        ? "bg-gray-900 text-white border-gray-900 shadow-xl scale-105"
                                        : "bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-900"
                                )}
                            >
                                {cat}
                                {isActive && (
                                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E67E22] border-2 border-white shadow-lg animate-pulse" />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Results Grid View */}
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <LayoutGrid className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        {filteredItems.length} {filteredItems.length === 1 ? 'Selection' : 'Selections'} Found
                    </span>
                </div>
                <div className="flex gap-6 items-center">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">Sort by:</span>
                    <select className="bg-transparent font-black text-xs text-gray-900 focus:outline-none border-none cursor-pointer">
                        <option>Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-16">
                    {filteredItems.map((item) => (
                        <MenuItemCard key={item.id} {...item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                    <div className="w-24 h-24 bg-white shadow-xl rounded-[2rem] mx-auto mb-8 flex items-center justify-center relative overflow-hidden">
                        <Search className="w-10 h-10 text-gray-200" />
                        <div className="absolute inset-0 bg-[#E67E22]/5 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight uppercase">
                        A Quiet Moment
                    </h3>
                    <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium italic">
                        We couldn't find any dishes matching your palette in this selection. Perhaps our chefs can tempt you with something else?
                    </p>
                    <Button
                        onClick={() => {
                            setSelectedCategory('All')
                            setSearchQuery('')
                        }}
                        className="bg-[#E67E22] hover:bg-black text-white rounded-[1.5rem] px-12 h-14 font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#E67E22]/20 border-none"
                    >
                        Clear all filters
                    </Button>
                </div>
            )}
        </div>
    )
}

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-white pb-40">
            <Header />

            <main className="py-20 lg:py-24">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-48">
                        <div className="w-16 h-16 relative">
                            <div className="absolute inset-0 border-4 border-[#E67E22]/10 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-[#E67E22] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-8 text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Preparing Kitchen...</p>
                    </div>
                }>
                    <MenuContent />
                </Suspense>
            </main>

            <BottomNav />
        </div>
    )
}
