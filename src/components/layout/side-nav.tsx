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
    X,
    TrendingUp
} from 'lucide-react'

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: UtensilsCrossed, label: 'Explore Menu', href: '/menu' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: History, label: 'Orders', href: '/history' },
]

const secondaryItems = [
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Support', href: '/support' },
]

interface SideNavProps {
    isOpen: boolean
    onClose: () => void
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
    const pathname = usePathname()

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] transition-opacity duration-500",
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer Content */}
            <aside
                className={cn(
                    "relative w-80 h-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col shadow-2xl",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Brand Logo & Close */}
                <div className="p-8 flex items-center justify-between border-b border-gray-50">
                    <Link href="/" className="flex items-center gap-3 group" onClick={onClose}>
                        <div className="w-10 h-10 bg-[#E67E22] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E67E22]/20">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">
                            Savan<span className="text-[#E67E22]">.</span>
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-8">
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4">Main Menu</p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative",
                                    isActive
                                        ? "bg-[#E67E22]/5 text-[#E67E22]"
                                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-[#E67E22]" : "text-gray-400 group-hover:text-gray-900"
                                )} />
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                {isActive && (
                                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Secondary Navigation */}
                <div className="px-4 py-8 border-t border-gray-50 space-y-2">
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-4">Help & Account</p>
                    {secondaryItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all group relative"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                        </Link>
                    ))}

                    {/* Logout / Switch Hub */}
                    <div className="mt-8 px-4 py-6 bg-gray-50 rounded-3xl">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Active Hub</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 shadow-sm border-2 border-white" />
                            <p className="text-xs font-black text-gray-900">Nairobi Central</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
