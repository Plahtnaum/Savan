'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, ChevronLeft, Star, Clock, Heart, ShoppingBag, ShieldCheck, Info } from 'lucide-react'
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
    const [isFavorite, setIsFavorite] = useState(false)
    const addItem = useCartStore((state) => state.addItem)
    const [isAdding, setIsAdding] = useState(false)

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center px-6">
                    <h2 className="text-3xl font-black mb-4 tracking-tighter">Dish Not Found</h2>
                    <p className="text-gray-400 mb-8 font-medium">Deepest apologies, we couldn't find this exact selection.</p>
                    <Button
                        onClick={() => router.push('/menu')}
                        className="bg-[#E67E22] hover:bg-black text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-[10px]"
                    >
                        Return to Menu
                    </Button>
                </div>
            </div>
        )
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
            router.push('/cart')
        }, 600)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Cinematic Adaptive Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left Aspect: High-Fidelity Visual Hub (Adaptive Sticky Side) */}
                <div className="relative h-[50vh] lg:h-screen lg:w-1/2 lg:sticky lg:top-0 overflow-hidden group">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Controls */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6">
                        <button
                            onClick={() => router.back()}
                            className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-white hover:text-black transition-all text-white group"
                        >
                            <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-white transition-all text-white"
                        >
                            <Heart
                                className={cn(
                                    "h-6 w-6 transition-all",
                                    isFavorite ? "fill-[#E67E22] text-[#E67E22]" : ""
                                )}
                            />
                        </button>
                    </div>

                    {/* Image Caption - Desktop Only */}
                    <div className="absolute bottom-12 left-12 right-12 hidden lg:block text-white">
                        <Badge variant="outline" className="border-white/40 text-white mb-4 uppercase tracking-[0.2em] font-black text-[10px]">Authentic Heritage</Badge>
                        <h2 className="text-6xl font-black tracking-tighter leading-none mb-4">{item.name}</h2>
                        <div className="flex items-center gap-6 opacity-60">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 fill-[#E67E22] text-[#E67E22]" />
                                <span className="font-bold">{item.rating} (500+)</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-white"></div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-bold">{item.prepTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Aspect: Detailed Orchestration Hub */}
                <div className="flex-1 lg:max-w-2xl px-6 py-12 lg:px-16 lg:py-24 space-y-16">

                    {/* Header (Adaptive Mobile Support) */}
                    <div className="lg:hidden">
                        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">{item.name}</h1>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1 text-[#E67E22]"><Star className="w-4 h-4 fill-current" /> {item.rating}</span>
                            <span>•</span>
                            <span>{item.prepTime}</span>
                        </div>
                    </div>

                    {/* Pricing & Summary */}
                    <div className="flex justify-between items-end border-b border-gray-50 pb-12">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Investment</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-[#E67E22] tracking-tighter">KES {item.price}</span>
                                <span className="text-gray-300 font-bold text-sm">/ portion</span>
                            </div>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Availability</p>
                            <div className="flex items-center gap-2 text-green-500 font-black text-sm uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                Ready to Prep
                            </div>
                        </div>
                    </div>

                    {/* Narrative Content */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Info className="w-4 h-4 text-[#E67E22]" />
                            The Experience
                        </h3>
                        <p className="text-gray-500 text-xl font-medium leading-relaxed tracking-tight">
                            {item.description || "A masterful creation balancing tradition and contemporary culinary precision. Sourced from organic local farms and prepared through time-honored techniques, this dish delivers an explosion of cultural heritage in every mouthful."}
                        </p>
                    </div>

                    {/* Orchestration Grid - Highly Adaptive */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {item.options?.sides && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Select Side</h4>
                                    <span className="text-[9px] font-black text-[#E67E22] bg-[#E67E22]/10 px-2 py-0.5 rounded uppercase tracking-tighter">Required</span>
                                </div>
                                <div className="space-y-3">
                                    {item.options.sides.map((side) => (
                                        <button
                                            key={side}
                                            onClick={() => setSelectedSide(side)}
                                            className={cn(
                                                "w-full px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-between border-2",
                                                selectedSide === side
                                                    ? "bg-gray-900 text-white border-gray-900 shadow-xl"
                                                    : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                                            )}
                                        >
                                            {side}
                                            {selectedSide === side && <ShieldCheck className="w-4 h-4 text-[#E67E22]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {item.options?.spiceLevels && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Spice Matrix</h4>
                                    <span className="text-[9px] font-black text-gray-300 bg-gray-50 px-2 py-0.5 rounded uppercase tracking-tighter">Adaptive</span>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {item.options.spiceLevels.map((level) => {
                                        const spiceIcons = { 'Mild': '🌿', 'Medium': '🌶️', 'Hot': '🔥' }
                                        return (
                                            <button
                                                key={level}
                                                onClick={() => setSelectedSpice(level)}
                                                className={cn(
                                                    "px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-4 border-2",
                                                    selectedSpice === level
                                                        ? "bg-[#E67E22]/10 text-[#E67E22] border-[#E67E22]"
                                                        : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                                                )}
                                            >
                                                <span className="text-xl">{spiceIcons[level as keyof typeof spiceIcons]}</span>
                                                {level}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Persistent Order Action Hub */}
                    <div className="pt-16 lg:pt-32">
                        <div className="bg-gray-50 rounded-[2.5rem] p-8 lg:p-12 border border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <div className="flex items-center gap-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                                    <button
                                        className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-30"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="font-black text-2xl w-8 text-center text-gray-900">{quantity}</span>
                                    <button
                                        className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                <Button
                                    size="lg"
                                    className="flex-1 w-full h-16 rounded-2xl bg-[#E67E22] hover:bg-black text-white text-lg font-black shadow-2xl shadow-[#E67E22]/20 transition-all flex items-center justify-center gap-4 uppercase tracking-widest active:scale-95 group"
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                >
                                    {isAdding ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                            <span>Add to Cart • KES {item.price * quantity}</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                            <p className="text-center text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] mt-8">Secure Premium Transactions Guaranteed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
