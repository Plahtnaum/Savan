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
        <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm transition-all duration-500">
            <div className="container max-w-[1440px] flex h-20 items-center justify-between px-6 sm:px-12">
                {/* Left: Section Title (Desktop) or Logo (Mobile) */}
                <div className="flex items-center gap-6">
                    <Button variant="ghost" size="icon" className="lg:hidden -ml-2 hover:bg-gray-100 rounded-full w-12 h-12">
                        <Menu className="h-6 w-6 text-gray-900" />
                    </Button>

                    <Link href="/" className="flex items-center group">
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#E67E22] rounded-lg flex items-center justify-center shadow-lg shadow-[#E67E22]/20">
                                <span className="text-white font-black text-sm">S</span>
                            </div>
                            <span className="text-2xl font-black text-gray-900 tracking-tighter">
                                Savan<span className="text-[#E67E22]">.</span>
                            </span>
                        </div>
                    </Link>

                    {/* Page Context (Desktop Only) */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="h-6 w-[1px] bg-gray-100"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                            Digital Hub • 2026
                        </span>
                    </div>
                </div>

                {/* Center / Navigation Links (Desktop) */}
                <div className="hidden lg:flex items-center gap-10">
                    {['Explore', 'Our Story', 'Locations'].map((item) => (
                        <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right: Support, Cart, Profile */}
                <div className="flex items-center gap-3 sm:gap-8">
                    <div className="hidden md:flex items-center gap-8 mr-4 border-r border-gray-100 pr-8">
                        <Link href="/support" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Support</Link>
                    </div>

                    <Link href="/cart" className="relative group">
                        <div className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-all border border-gray-100 group-active:scale-95 shadow-sm">
                            <ShoppingBag className="h-5 w-5 text-gray-900 group-hover:rotate-6 transition-transform" />
                            <div className="hidden sm:block">
                                <p className="text-[10px] font-black text-gray-900 leading-none">{itemCount} Items</p>
                            </div>
                            {itemCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-1 rounded-full bg-[#E67E22] text-white text-[9px] font-bold border-2 border-white">
                                    {itemCount}
                                </Badge>
                            )}
                        </div>
                    </Link>

                    <Link href="/profile" className="flex items-center gap-4 transition-all hover:opacity-80">
                        <div className="h-11 w-11 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden shadow-sm hover:border-[#E67E22]/40 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-400 fill-current">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
