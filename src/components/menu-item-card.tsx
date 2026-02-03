'use client'

import { Heart, Star, Plus, ShoppingBag } from 'lucide-react'
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
    const addItem = useCartStore((state) => state.addItem)
    const favorite = isFavorite(id)

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

                    {/* Quick Add Button - Appears on Hover */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addItem({ menuItemId: id, name, price, image, quantity: 1 })
                        }}
                        className="absolute bottom-5 right-5 w-14 h-14 bg-[#E67E22] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#E67E22]/30 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 active:scale-90 z-20 md:translate-y-0 md:opacity-100"
                    >
                        <Plus className="w-7 h-7 stroke-[3]" />
                    </button>

                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
