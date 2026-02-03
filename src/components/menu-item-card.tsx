'use client'

import { Heart, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useFavoritesStore } from '@/lib/favorites-store'

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

                    {/* Rating Badge - Matching Sample 4 */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-white/20">
                        <Star className="w-3.5 h-3.5 text-[#E67E22] fill-current" />
                        <span className="text-xs font-bold text-gray-900">{rating}</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(id)
                        }}
                        className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all group/fav"
                    >
                        <Heart
                            className={cn(
                                "w-5 h-5 transition-all text-white",
                                favorite && 'fill-[#E67E22] text-[#E67E22]'
                            )}
                        />
                    </button>
                </div>

                {/* Content - Matching Sample 4 Layout */}
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
