'use client'

import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { MenuItemCard } from '@/components/menu-item-card'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CATEGORIES, MENU_ITEMS } from '@/lib/menu-data'
import { useState, Suspense } from 'react'
import { Search, SlidersHorizontal, ChevronLeft, Filter, X, ChefHat } from 'lucide-react'
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Left Sidebar: Premium Filters (Adaptive Desktop) */}
                <aside className="hidden lg:block w-72 shrink-0 space-y-12 sticky top-24 h-fit">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                            <ChefHat className="w-5 h-5 text-[#E67E22]" />
                            The Kitchen
                        </h3>
                        <div className="space-y-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-between group",
                                        selectedCategory === cat
                                            ? "bg-[#E67E22] text-white shadow-xl shadow-[#E67E22]/20"
                                            : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    {cat}
                                    {selectedCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-[#E67E22] text-[10px] font-black uppercase tracking-widest mb-2">Member Special</p>
                            <h4 className="font-black text-gray-900 mb-4 tracking-tight">Free Delivery Today!</h4>
                            <p className="text-xs text-gray-500 font-medium mb-6 leading-relaxed">Orders above KES 1,500 get premium prioritized shipping.</p>
                            <Button className="w-full bg-white text-black hover:bg-black hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Claim Offer</Button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#E67E22]/10 rounded-full blur-xl"></div>
                    </div>
                </aside>

                {/* Main Content: Results Grid */}
                <div className="flex-1">
                    {/* Header & Search */}
                    <div className="flex flex-col gap-8 mb-16">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter uppercase">
                                    Discover <span className="text-[#E67E22]">Flavors</span>
                                </h1>
                                <p className="text-gray-400 font-bold mt-2">Karibu! Experience the essence of Kenyan culinary heritage.</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-2xl lg:hidden">
                                <SlidersHorizontal className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>

                        {/* Premium Search Bar */}
                        <div className="relative group max-w-2xl">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E67E22] transition-colors" />
                            <input
                                type="search"
                                placeholder="Search for your favorite dishes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-16 pl-16 pr-8 rounded-[1.25rem] bg-gray-50 border border-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-gray-900 transition-all font-bold placeholder:text-gray-300 shadow-sm group-hover:shadow-md"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-900 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Mobile Category Chips (Hidden on LG) */}
                        <div className="flex lg:hidden gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-8 py-3.5 rounded-2xl text-sm font-black whitespace-nowrap transition-all duration-300",
                                        selectedCategory === cat
                                            ? "bg-[#E67E22] text-white shadow-xl shadow-[#E67E22]/20"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid View */}
                    <div className="flex items-center justify-between mb-10 border-b border-gray-50 pb-6">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                            {filteredItems.length} {filteredItems.length === 1 ? 'Selection' : 'Selections'} Found
                        </span>
                        <div className="flex gap-4 items-center">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">Sort by:</span>
                            <select className="bg-transparent font-black text-xs text-gray-900 focus:outline-none border-none">
                                <option>Popularity</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>

                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
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
                            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
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
                                className="bg-[#E67E22] hover:bg-black text-white rounded-2xl px-12 h-14 font-black text-sm uppercase tracking-widest transition-all"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-white pb-32">
            <Header />

            <main className="py-16">
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
