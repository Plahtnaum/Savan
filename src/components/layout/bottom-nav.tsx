'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, UtensilsCrossed, ShoppingBag, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/cart-store'

export function BottomNav() {
    const pathname = usePathname()
    const items = useCartStore((state) => state.items)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/menu', label: 'Menu', icon: UtensilsCrossed },
        { href: '/cart', label: 'Cart', icon: ShoppingBag, badge: itemCount },
        { href: '/profile', label: 'Profile', icon: User },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl md:hidden safe-area-bottom backdrop-blur-xl bg-white/95">
            <div className="flex items-center justify-around h-20 px-2">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    const Icon = link.icon

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 flex-1 py-2 px-3 rounded-2xl transition-all duration-300 relative",
                                isActive
                                    ? "bg-[#E67E22]/10"
                                    : "hover:bg-gray-50"
                            )}
                        >
                            <div className="relative">
                                <Icon
                                    className={cn(
                                        "h-6 w-6 transition-colors",
                                        isActive ? "text-[#E67E22]" : "text-gray-600"
                                    )}
                                />
                                {link.badge && link.badge > 0 && (
                                    <div className="absolute -top-2 -right-2 h-5 w-5 bg-[#E67E22] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                                        {link.badge}
                                    </div>
                                )}
                            </div>
                            <span
                                className={cn(
                                    "text-xs font-semibold transition-colors",
                                    isActive ? "text-[#E67E22]" : "text-gray-600"
                                )}
                            >
                                {link.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
