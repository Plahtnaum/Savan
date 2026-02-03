'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { HelpCircle, ShoppingBag, Menu, Heart, History, Settings, LogOut, ChevronDown, User, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'
import { Badge } from '@/components/ui/badge'
import { SideNav } from './side-nav'
import { cn } from '@/lib/utils'

export function Header() {
    const items = useCartStore((state) => state.items)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const navLinks = [
        { label: 'The Menu', href: '/menu', icon: UtensilsCrossed },
        { label: 'Favorites', href: '/favorites', icon: Heart },
        { label: 'Track Feast', href: '/order/tracking', icon: History },
    ]

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-2xl border-b border-gray-100/50 shadow-sm transition-all duration-500">
                <div className="container max-w-[1440px] flex h-16 md:h-20 items-center justify-between px-6 sm:px-12">
                    {/* Left: Section Title (Desktop) or Logo (Mobile) */}
                    <div className="flex items-center gap-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsDrawerOpen(true)}
                            className="lg:hidden -ml-2 hover:bg-gray-100 rounded-full w-12 h-12"
                        >
                            <Menu className="h-6 w-6 text-gray-900" />
                        </Button>

                        <Link href="/" className="flex items-center group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#E67E22] rounded-xl flex items-center justify-center shadow-lg shadow-[#E67E22]/20 group-hover:rotate-6 transition-transform">
                                    <span className="text-white font-black text-lg">S</span>
                                </div>
                                <span className="text-2xl font-black text-gray-900 tracking-tighter">
                                    Savan<span className="text-[#E67E22]">.</span>
                                </span>
                            </div>
                        </Link>

                        {/* Visual Divider (Desktop) */}
                        <div className="hidden lg:block h-6 w-[1px] bg-gray-100 ml-2"></div>
                    </div>

                    {/* Center / Consolidated Navigation (Desktop Only) */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#E67E22] transition-colors relative group py-2"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E67E22] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="hidden md:flex items-center gap-8 mr-4 border-r border-gray-100 pr-8">
                            <Link href="/support" className="text-[10px] font-black uppercase tracking-widest text-[#E67E22] hover:text-gray-900 transition-colors">Concierge</Link>
                        </div>

                        {/* Cart */}
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

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 group transition-all"
                            >
                                <div className="h-11 w-11 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden shadow-sm hover:border-[#E67E22]/40 transition-all group-hover:scale-105 active:scale-95">
                                    <User className="w-5 h-5 text-gray-400 group-hover:text-[#E67E22] transition-colors" />
                                </div>
                                <ChevronDown className={cn("w-4 h-4 text-gray-300 transition-transform duration-300", isProfileOpen && "rotate-180")} />
                            </button>

                            {/* Elegant Dropdown Menu */}
                            <div className={cn(
                                "absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 py-4 transition-all duration-300 z-[60] origin-top-right",
                                isProfileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                            )}>
                                <div className="px-6 py-4 border-b border-gray-50 mb-2">
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-2">Karibu, Explorer</p>
                                    <p className="text-sm font-black text-gray-900">Guest Guest</p>
                                </div>
                                <div className="px-2">
                                    {[
                                        { label: 'Settings', href: '/settings', icon: Settings },
                                        { label: 'Help Center', href: '/support', icon: HelpCircle },
                                        { label: 'Order History', href: '/history', icon: History },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all group"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span className="text-xs font-bold tracking-tight">{item.label}</span>
                                        </Link>
                                    ))}
                                    <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all mt-2 border-t border-gray-50 pt-4">
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-xs font-bold tracking-tight">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Click outside to close profile */}
                {isProfileOpen && (
                    <div
                        className="fixed inset-0 z-[55] pointer-events-auto"
                        onClick={() => setIsProfileOpen(false)}
                    />
                )}
            </header>

            {/* Mobile Drawer */}
            <SideNav isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    )
}
