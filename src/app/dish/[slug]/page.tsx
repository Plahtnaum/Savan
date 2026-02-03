'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, ChevronLeft, Star, Clock } from 'lucide-react'
import { MENU_ITEMS } from '@/lib/menu-data'
import { useCartStore } from '@/lib/cart-store'
// import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function DishDetailPage() {
    const params = useParams()
    const router = useRouter()
    const slug = params?.slug as string

    const item = MENU_ITEMS.find(i => i.slug === slug)

    const [quantity, setQuantity] = useState(1)
    const [selectedSide, setSelectedSide] = useState<string | undefined>(
        item?.options?.sides?.[0]
    )
    const [selectedSpice, setSelectedSpice] = useState<string | undefined>(
        item?.options?.spiceLevels?.[1] // Default to Medium if available
    )
    const addItem = useCartStore((state) => state.addItem)
    const [isAdding, setIsAdding] = useState(false)

    if (!item) {
        return <div className="p-8 text-center">Item not found</div>
    }

    const handleAddToCart = () => {
        setIsAdding(true)
        setTimeout(() => {
            addItem({
                menuItemId: item.id,
                name: item.name,
                price: item.price,
                quantity,
                image: item.image,
                options: {
                    side: selectedSide,
                    spice: selectedSpice,
                }
            })
            setIsAdding(false)
            // Feedback
            // toast.success("Added to cart")
            router.back()
        }, 500)
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Mobile Header: Image with overlay back button */}
            <div className="relative h-[300px] w-full bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 text-xl font-bold">
                    {item.name} Image
                </div>
                <div className="absolute top-4 left-4 z-10">
                    <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 bg-white/80 hover:bg-white" onClick={() => router.back()}>
                        <ChevronLeft className="h-6 w-6 text-foreground" />
                    </Button>
                </div>
            </div>

            <div className="container -mt-6 relative z-10 bg-background rounded-t-3xl p-6 min-h-[300px]">

                {/* Title & Price */}
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-bold font-display">{item.name}</h1>
                    <span className="text-xl font-bold text-primary">KES {item.price}</span>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-medium text-foreground">{item.rating}</span>
                        <span>({item.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.prepTime}</span>
                    </div>
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                    {item.description}
                </p>

                {/* Customization Options */}
                <div className="space-y-6">
                    {item.options?.sides && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Choose Your Side</h3>
                            <div className="flex flex-wrap gap-3">
                                {item.options.sides.map((side) => (
                                    <button
                                        key={side}
                                        onClick={() => setSelectedSide(side)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                            selectedSide === side
                                                ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                                                : "border-input bg-card hover:bg-muted"
                                        )}
                                    >
                                        {side}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {item.options?.spiceLevels && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Spice Level</h3>
                            <div className="flex flex-wrap gap-3">
                                {item.options.spiceLevels.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedSpice(level)}
                                        className={cn(
                                            "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                                            selectedSpice === level
                                                ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                                                : "border-input bg-card hover:bg-muted"
                                        )}
                                    >
                                        {level}
                                        {level === 'Hot' && ' 🌶️'}
                                        {level === 'Medium' && ' 🌶️'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 px-6 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="container max-w-md mx-auto flex items-center justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-muted rounded-full px-3 py-1.5 h-12">
                        <button
                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-full transition-colors"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-6 text-center">{quantity}</span>
                        <button
                            className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-full transition-colors"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <Button
                        size="lg"
                        className="flex-1 rounded-full h-12 text-base"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : `Add • KES ${item.price * quantity}`}
                    </Button>
                </div>
            </div>
        </div>
    )
}
