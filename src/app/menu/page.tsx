'use client'

import { useState, Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { MenuItemCard } from '@/components/menu-item-card'
import { Button } from '@/components/ui/button'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES, MENU_ITEMS } from '@/lib/menu-data'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

function MenuContent() {
    const searchParams = useSearchParams()
    const initialCategory = searchParams.get('category') || 'All'
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)

    const filteredItems = MENU_ITEMS.filter(item =>
        selectedCategory === 'All' || item.category === selectedCategory
    )

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-display">Our Menu</h1>
                    <p className="text-sm text-muted-foreground mt-1">{filteredItems.length} dishes available</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Filters</span>
                </Button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 sticky top-16 bg-gray-50 z-40 py-3 -mt-3">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shadow-sm",
                            selectedCategory === cat
                                ? "bg-primary text-white shadow-md scale-105"
                                : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
                {filteredItems.map((item) => (
                    <MenuItemCard
                        key={item.id}
                        {...item}
                        variant="vertical"
                    />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No items found in this category.</p>
                </div>
            )}
        </>
    )
}

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <main className="container py-6 space-y-6 max-w-7xl mx-auto">
                <Suspense fallback={
                    <div className="p-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                        <p className="mt-4 text-muted-foreground">Loading menu...</p>
                    </div>
                }>
                    <MenuContent />
                </Suspense>
            </main>

            <BottomNav />
        </div>
    )
}
