'use client'

import { Heart, Star, Clock } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface MenuItemCardProps {
    id: string
    slug: string
    name: string
    description: string
    price: number
    image: string
    rating: number
    reviews: number
    prepTime: string
    tags?: string[]
    variant?: 'vertical' | 'horizontal'
}

export function MenuItemCard({
    id,
    slug,
    name,
    description,
    price,
    image,
    rating,
    reviews,
    prepTime,
    tags = [],
    variant = 'vertical'
}: MenuItemCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)

    if (variant === 'horizontal') {
        return (
            <Link href={`/dish/${slug}`}>
                <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex gap-3 p-3">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-base line-clamp-1 mb-1">{name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="font-medium text-foreground">{rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{prepTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-lg text-primary">KES {price}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <Link href={`/dish/${slug}`}>
            <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    {tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="accent"
                                    className="bg-accent text-white text-xs font-semibold shadow-sm"
                                >
                                    {tag === 'Bestseller' && '🔥'} {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Favorite Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setIsFavorite(!isFavorite)
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                        <Heart
                            className={cn(
                                "w-4 h-4 transition-colors",
                                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                            )}
                        />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display font-semibold text-lg line-clamp-1 flex-1">{name}</h3>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-sm">{rating}</span>
                            <span className="text-xs text-muted-foreground">({reviews})</span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{prepTime}</span>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-2xl text-primary">
                            KES {price}
                        </span>
                        <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 h-9"
                            onClick={(e) => e.preventDefault()}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
