'use client'

import Link from 'next/link'
import { HelpCircle, ShoppingBag, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { Badge } from '@/components/ui/badge'

export function Header() {
    const items = useCartStore((state) => state.items)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all">
            <div className="container max-w-[1440px] flex h-16 items-center justify-between px-4 sm:px-8">
                {/* Left: Section Title (Desktop) or Logo (Mobile) */}
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="lg:hidden -ml-2">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Link href="/" className="lg:hidden flex items-center">
                        <span className="text-xl sm:text-2xl font-black text-[#E67E22] tracking-tighter">
                            Savan<span className="text-gray-900">.</span>
                        </span>
                    </Link>
                    {/* Page Context (Desktop) */}
                    <div className="hidden lg:block">
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-300">
                            Premium Experience
                        </span>
                    </div>
                </div>

                {/* Right: Support, Cart, Profile */}
                <div className="flex items-center gap-2 sm:gap-6">
                    <div className="hidden md:flex items-center gap-6 mr-4 border-r border-gray-100 pr-6">
                        <Link href="/support" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">Support</Link>
                        <Link href="/track" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">Track Order</Link>
                    </div>

                    <Link href="/cart" className="relative group">
                        <div className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-2xl transition-all border border-gray-100 group-active:scale-95">
                            <ShoppingBag className="h-5 w-5 text-gray-900" />
                            <div className="hidden sm:block">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none">Your Cart</p>
                                <p className="text-xs font-black text-gray-900 mt-0.5">{itemCount} Items</p>
                            </div>
                            {itemCount > 0 && (
                                <Badge className="h-5 min-w-5 flex items-center justify-center p-1 rounded-lg bg-[#E67E22] text-white text-[10px] font-bold border-2 border-white">
                                    {itemCount}
                                </Badge>
                            )}
                        </div>
                    </Link>

                    <Link href="/profile" className="flex items-center gap-3 pl-4 transition-all hover:opacity-80">
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter leading-none">Guest User</p>
                            <p className="text-xs font-black text-gray-900 mt-0.5">My Account</p>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-[#E67E22]/10 flex items-center justify-center border border-[#E67E22]/20 overflow-hidden shadow-sm">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#E67E22] fill-current opacity-80">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
