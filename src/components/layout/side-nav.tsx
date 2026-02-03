'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Home,
    UtensilsCrossed,
    ShoppingBag,
    Heart,
    History,
    Settings,
    HelpCircle,
    Menu,
    ChevronRight
} from 'lucide-react'

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: UtensilsCrossed, label: 'Explore Menu', href: '/menu' },
    { icon: ShoppingBag, label: 'My Cart', href: '/cart' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: History, label: 'Orders', href: '/history' },
]

const secondaryItems = [
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Support', href: '/support' },
]

export function SideNav() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-500 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
                isCollapsed ? "w-24" : "w-72"
            )}
        >
            {/* Brand Logo */}
            <div className="p-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-[#E67E22] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E67E22]/20 group-hover:scale-105 transition-transform">
                        <span className="text-white font-black text-xl">S</span>
                    </div>
                    {!isCollapsed && (
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">
                            Savan<span className="text-[#E67E22]">.</span>
                        </span>
                    )}
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative",
                                isActive
                                    ? "bg-[#E67E22]/5 text-[#E67E22]"
                                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn(
                                "w-6 h-6 transition-colors",
                                isActive ? "text-[#E67E22]" : "text-gray-400 group-hover:text-gray-900"
                            )} />
                            {!isCollapsed && (
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            )}
                            {isActive && !isCollapsed && (
                                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-20 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Secondary Navigation */}
            <div className="px-4 py-8 border-t border-gray-50 space-y-2">
                {secondaryItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all group relative"
                    >
                        <item.icon className="w-6 h-6" />
                        {!isCollapsed && (
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                        )}

                        {isCollapsed && (
                            <div className="absolute left-20 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                                {item.label}
                            </div>
                        )}
                    </Link>
                ))}

                {/* Toggle Collapse */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-4 text-gray-300 hover:text-[#E67E22] transition-colors mt-4"
                >
                    <Menu className={cn("w-6 h-6 transition-transform duration-500", isCollapsed && "rotate-180")} />
                </button>
            </div>
        </aside>
    )
}
