'use client'

import { useState, Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import Link from 'next/link'
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
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold font-display">Our Menu</h1>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sticky top-16 bg-background/95 z-40 py-2 backdrop-blur">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                            selectedCategory === cat
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background hover:bg-muted border-input"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <Link key={item.id} href={`/dish/${item.slug}`}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-row sm:flex-col h-[140px] sm:h-auto">
                            {/* Mobile: Horizontal layout */}
                            <div className="w-[120px] sm:w-full sm:aspect-[4/3] relative bg-muted shrink-0">
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
                                    {item.name}
                                </div>
                            </div>

                            <CardContent className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold font-display line-clamp-1">{item.name}</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-2">{item.description}</p>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="font-bold text-primary">KES {item.price}</span>
                                    <Button size="sm" variant="secondary" className="h-8 px-3">
                                        Add
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            <Header />

            <main className="container py-6 space-y-6">
                <Suspense fallback={<div className="p-4 text-center">Loading menu...</div>}>
                    <MenuContent />
                </Suspense>
            </main>

            <BottomNav />
        </div>
    )
}
