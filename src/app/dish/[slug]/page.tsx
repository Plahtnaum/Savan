'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, ChevronLeft, Star, Clock, Heart, ShoppingBag, ShieldCheck, Info, Utensils } from 'lucide-react'
import { MENU_ITEMS } from '@/lib/menu-data'
import { useCartStore } from '@/lib/cart-store'
import { cn } from '@/lib/utils'

export default function DishDetailPage() {
    const params = useParams()
    const router = useRouter()
    const slug = params?.slug as string

    const item = MENU_ITEMS.find(i => i.slug === slug)

    // Cart State
    const { items, addItem, updateQuantity } = useCartStore()
    const cartItem = items.find(i => i.menuItemId === item?.id)
    const initialQuantity = cartItem?.quantity || 1

    const [quantity, setQuantity] = useState(initialQuantity)
    const [selectedSide, setSelectedSide] = useState<string | undefined>(
        item?.options?.sides?.[0]
    )
    const [selectedSpice, setSelectedSpice] = useState<string | undefined>(
        item?.options?.spiceLevels?.[1]
    )
    const [isFavorite, setIsFavorite] = useState(false)
    const [isAdding, setIsAdding] = useState(false)

    // Sync quantity if cart changes externally
    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity)
        }
    }, [cartItem])

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center px-6">
                    <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase">Dish Not Found</h2>
                    <p className="text-gray-400 mb-8 font-medium italic">Deepest apologies, we couldn't find this exact selection.</p>
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

    const handleAction = () => {
        setIsAdding(true)
        setTimeout(() => {
            if (cartItem) {
                updateQuantity(cartItem.id, quantity)
            } else {
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
            }
            setIsAdding(false)
            router.push('/cart')
        }, 600)
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            {/* Cinematic Adaptive Layout */}
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left Aspect: High-Fidelity Visual Hub */}
                <div className="relative h-[60vh] lg:h-screen lg:w-1/2 lg:sticky lg:top-0 overflow-hidden group">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

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

                    {/* Image Caption */}
                    <div className="absolute bottom-12 left-8 right-8 text-white">
                        <Badge variant="outline" className="border-white/40 text-white mb-6 uppercase tracking-[0.2em] font-black text-[10px] px-4 py-1.5 backdrop-blur-md">Authentic Heritage</Badge>
                        <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-6 uppercase">{item.name}</h2>
                        <div className="flex items-center gap-6 opacity-80">
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 fill-[#E67E22] text-[#E67E22]" />
                                <span className="font-black text-lg">{item.rating}</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span className="font-black text-lg">{item.prepTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Aspect: Detailed Orchestration Hub */}
                <div className="flex-1 lg:max-w-2xl px-6 py-16 lg:px-20 lg:py-24 space-y-20 bg-white">

                    {/* Pricing & Cart Status */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-100 pb-12 gap-8">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Investment</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-black text-[#E67E22] tracking-tighter">KES {item.price}</span>
                                <span className="text-gray-400 font-bold text-lg italic">/ portion</span>
                            </div>
                        </div>
                        {cartItem && (
                            <div className="bg-[#E67E22]/5 border border-[#E67E22]/20 rounded-2xl px-6 py-4 animate-premium-fade">
                                <p className="text-[9px] font-black text-[#E67E22] uppercase tracking-widest mb-1">In Your Feast</p>
                                <p className="font-black text-gray-900 flex items-center gap-2">
                                    <Utensils className="w-4 h-4 text-[#E67E22]" />
                                    {cartItem.quantity} Portions Reserved
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Narrative Content */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.4em] flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-[#E67E22]"></div>
                            About This Dish
                        </h3>
                        <p className="text-gray-500 text-2xl font-bold leading-relaxed tracking-tight">
                            {item.description || "A masterful creation balancing tradition and contemporary culinary precision."}
                        </p>
                    </div>

                    {/* Orchestration Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {item.options?.sides && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Select Side</h4>
                                    <span className="text-[9px] font-black text-[#E67E22] uppercase tracking-[0.2em] animate-pulse">Required</span>
                                </div>
                                <div className="space-y-4">
                                    {item.options.sides.map((side) => (
                                        <button
                                            key={side}
                                            onClick={() => setSelectedSide(side)}
                                            className={cn(
                                                "w-full px-8 py-5 rounded-[1.5rem] text-sm font-black transition-all duration-500 flex items-center justify-between border-2",
                                                selectedSide === side
                                                    ? "bg-gray-900 text-white border-gray-900 shadow-2xl scale-[1.02]"
                                                    : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                                            )}
                                        >
                                            {side}
                                            {selectedSide === side && <ShieldCheck className="w-5 h-5 text-[#E67E22]" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {item.options?.spiceLevels && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Heat Level</h4>
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Adaptive</span>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {item.options.spiceLevels.map((level) => {
                                        const spiceIcons = { 'Mild': '🌿', 'Medium': '🌶️', 'Hot': '🔥' }
                                        return (
                                            <button
                                                key={level}
                                                onClick={() => setSelectedSpice(level)}
                                                className={cn(
                                                    "px-8 py-5 rounded-[1.5rem] text-sm font-black transition-all duration-500 flex items-center gap-5 border-2",
                                                    selectedSpice === level
                                                        ? "bg-[#E67E22]/10 text-[#E67E22] border-[#E67E22] shadow-sm scale-[1.02]"
                                                        : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                                                )}
                                            >
                                                <span className="text-2xl">{spiceIcons[level as keyof typeof spiceIcons]}</span>
                                                {level}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Persistent Order Action Hub */}
                    <div className="pt-12 pb-20 lg:pb-0">
                        <div className="bg-gray-50 rounded-[3rem] p-10 lg:p-14 border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <Utensils className="w-32 h-32" />
                            </div>

                            <div className="relative z-10 flex flex-col gap-10">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Subtotal</p>
                                        <p className="text-3xl font-black text-gray-900">KES {item.price * quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-6 bg-white p-2 rounded-2xl shadow-xl border border-gray-50">
                                        <button
                                            className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-20"
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
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full h-20 rounded-[1.5rem] bg-[#E67E22] hover:bg-black text-white text-xl font-black shadow-2xl shadow-[#E67E22]/30 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] active:scale-[0.98] group"
                                    onClick={handleAction}
                                    disabled={isAdding}
                                >
                                    {isAdding ? (
                                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                                            <span>{cartItem ? 'Update Reservation' : 'Secure This Feast'}</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                            <p className="text-center text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] mt-10">
                                Crafted with care • Served with Honor
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}
