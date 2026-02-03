'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { Badge } from '@/components/ui/badge'

export function Header() {
    const items = useCartStore((state) => state.items)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold font-display text-primary">Savan Eats</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center px-4 md:px-12 hidden md:flex">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search dishes..."
                            className="w-full h-9 rounded-full border border-input bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative hover:bg-transparent">
                            <ShoppingBag className="h-5 w-5 text-foreground" />
                            {itemCount > 0 && (
                                <Badge variant="default" className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 rounded-full animate-in zoom-in">
                                    {itemCount}
                                </Badge>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
