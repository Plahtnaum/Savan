'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, UtensilsCrossed, ShoppingBag, User, History } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/cart-store'

export function BottomNav() {
    const pathname = usePathname()
    const items = useCartStore((state) => state.items)
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/menu', label: 'Menu', icon: UtensilsCrossed },
        { href: '/cart', label: 'Cart', icon: ShoppingBag, badge: cartCount > 0 ? cartCount : null },
        //{ href: '/orders', label: 'Orders', icon: History },
        { href: '/profile', label: 'Account', icon: User },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden safe-area-bottom">
            <div className="flex h-16 items-center justify-around">
                {links.map(({ href, label, icon: Icon, badge }) => {
                    const isActive = pathname === href
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className="relative">
                                <Icon className={cn("h-6 w-6", isActive && "fill-current")} />
                                {badge && (
                                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
