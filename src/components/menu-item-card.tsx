'use client'

import { Heart, Star, Plus, Minus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useFavoritesStore } from '@/lib/favorites-store'
import { useCartStore } from '@/lib/cart-store'

interface MenuItemCardProps {
    id: string
    name: string
    description: string
    price: number
    image: string
    tags?: string[]
    rating?: number
    prepTime?: string
}

export function MenuItemCard({
    id,
    name,
    description,
    price,
    image,
    rating = 4.8,
}: MenuItemCardProps) {
    const { toggleFavorite, isFavorite } = useFavoritesStore()
    const { items, addItem, updateQuantity } = useCartStore()
    const favorite = isFavorite(id)

    // Find current item in cart to show quantity
    const cartItem = items.find(item => item.menuItemId === id)
    const quantity = cartItem?.quantity || 0

    return (
        <div className="group cursor-pointer">
            <Link href={`/dish/${id}`}>
                <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gray-50">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-white/20">
                        <Star className="w-3.5 h-3.5 text-[#E67E22] fill-current" />
                        <span className="text-xs font-bold text-gray-900">{rating}</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleFavorite(id)
                        }}
                        className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all group/fav z-20"
                    >
                        <Heart
                            className={cn(
                                "w-5 h-5 transition-all text-white",
                                favorite && 'fill-[#E67E22] text-[#E67E22]'
                            )}
                        />
                    </button>

                    {/* Quantity Control & Feedback */}
                    <div className={cn(
                        "absolute bottom-5 right-5 z-20 flex items-center gap-2 transition-all duration-500",
                        quantity > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 md:opacity-100 md:translate-y-0"
                    )}>
                        {quantity > 0 ? (
                            <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white p-1.5 gap-3 animate-premium-fade">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        if (cartItem) updateQuantity(cartItem.id, quantity - 1)
                                    }}
                                    className="w-10 h-10 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="text-lg font-black text-gray-900 min-w-[1.2rem] text-center">{quantity}</span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        if (cartItem) updateQuantity(cartItem.id, quantity + 1)
                                    }}
                                    className="w-10 h-10 bg-[#E67E22] text-white rounded-xl flex items-center justify-center hover:bg-[#D35400] transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    addItem({ menuItemId: id, name, price, image, quantity: 1 })
                                }}
                                className="w-14 h-14 bg-[#E67E22] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#E67E22]/30 hover:scale-110 active:scale-95 transition-all duration-300"
                            >
                                <Plus className="w-7 h-7 stroke-[3]" />
                            </button>
                        )}
                    </div>

                    {/* Hover Description Reveal (Desktop) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center p-8 text-center">
                        <p className="text-white text-sm font-medium leading-relaxed drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex justify-between items-start px-1">
                    <div className="flex-1 pr-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#E67E22] transition-colors leading-tight">
                            {name}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium line-clamp-1">
                            {description}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-[#E67E22] font-extrabold text-lg block">
                            KES {price}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
