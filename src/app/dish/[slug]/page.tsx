'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, ChevronLeft, Star, Clock, Flame, Leaf } from 'lucide-react'
import { MENU_ITEMS } from '@/lib/menu-data'
import { useCartStore } from '@/lib/cart-store'
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
        item?.options?.spiceLevels?.[1]
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
            router.back()
        }, 500)
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Hero Image with Back Button */}
            <div className="relative h-[300px] md:h-[400px] w-full bg-gray-900">
                <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 z-10">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full h-10 w-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="h-6 w-6 text-foreground" />
                    </Button>
                </div>

                {/* Badge */}
                {item.tags.length > 0 && (
                    <div className="absolute bottom-4 left-4">
                        <Badge className="bg-accent text-white font-semibold shadow-lg">
                            {item.tags[0]}
                        </Badge>
                    </div>
                )}
            </div>

            <div className="container max-w-4xl -mt-6 relative z-10 bg-gradient-to-b from-gray-50 to-white rounded-t-3xl p-6 min-h-[400px]">

                {/* Title & Price */}
                <div className="flex justify-between items-start mb-3">
                    <h1 className="text-3xl font-bold font-display flex-1 pr-4">{item.name}</h1>
                    <span className="text-3xl font-bold text-primary font-display whitespace-nowrap">KES {item.price}</span>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-foreground">{item.rating}</span>
                        <span className="text-muted-foreground">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700 font-medium">{item.prepTime}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                    </p>
                </div>

                {/* Customization Options */}
                <div className="space-y-6">
                    {item.options?.sides && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Choose Your Side</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {item.options.sides.map((side) => (
                                    <button
                                        key={side}
                                        onClick={() => setSelectedSide(side)}
                                        className={cn(
                                            "px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all text-center",
                                            selectedSide === side
                                                ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                : "border-gray-200 bg-white hover:border-gray-300"
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
                            <div className="grid grid-cols-3 gap-3">
                                {item.options.spiceLevels.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedSpice(level)}
                                        className={cn(
                                            "px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2",
                                            selectedSpice === level
                                                ? "border-primary bg-primary/5 text-primary shadow-sm"
                                                : "border-gray-200 bg-white hover:border-gray-300"
                                        )}
                                    >
                                        {level === 'Hot' && <Flame className="w-4 h-4 text-red-500" />}
                                        {level === 'Medium' && <Flame className="w-4 h-4 text-orange-500" />}
                                        {level === 'Mild' && <Leaf className="w-4 h-4 text-green-500" />}
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 safe-area-bottom z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
                <div className="container max-w-4xl mx-auto flex items-center justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-1 py-1 h-12">
                        <button
                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">{quantity}</span>
                        <button
                            className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <Button
                        size="lg"
                        className="flex-1 rounded-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : `Add to Cart • KES ${item.price * quantity}`}
                    </Button>
                </div>
            </div>
        </div>
    )
}
