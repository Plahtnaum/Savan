'use client'

import React from 'react'
import { Header } from '@/components/layout/header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/lib/order-store'
import { History, ShoppingBag, ArrowRight, Package, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

// Mock past orders for high-fidelity preview
const MOCK_HISTORY = [
    {
        id: 'ORD-8829',
        date: '24 May 2026',
        items: ['Savory Beef Fry', 'Steamed Rice'],
        total: 1250,
        status: 'Delivered',
        time: '12:45 PM'
    },
    {
        id: 'ORD-7712',
        date: '18 May 2026',
        items: ['Swahili Pilau', 'Garden Salad'],
        total: 850,
        status: 'Delivered',
        time: '7:30 PM'
    },
    {
        id: 'ORD-5501',
        date: '12 May 2026',
        items: ['Chicken Stew', 'Chapati'],
        total: 1100,
        status: 'Cancelled',
        time: '1:15 PM'
    }
]

export default function HistoryPage() {
    const { orders } = useOrderStore()

    // In a real app, we'd combine actual store orders with fetched history
    const allOrders = [...orders.map(o => ({
        id: o.id.slice(0, 8),
        date: 'Today',
        items: o.items.map(i => i.name),
        total: o.total,
        status: o.status,
        time: 'Just now'
    })), ...MOCK_HISTORY]

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container max-w-[1440px] px-6 lg:px-12 py-16">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-[#E67E22]">
                            <History className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
                            Order <span className="text-[#E67E22]">History</span>
                        </h1>
                    </div>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl">
                        Track your journey through African culinary excellence. Reorder your favorites with a single tap.
                    </p>
                </div>

                <div className="grid gap-8">
                    {allOrders.length > 0 ? (
                        allOrders.map((order, index) => (
                            <div
                                key={order.id}
                                className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden"
                            >
                                {/* Status Accent Line */}
                                <div className={cn(
                                    "absolute top-0 left-0 w-2 h-full transition-all",
                                    order.status === 'Delivered' ? 'bg-green-500' :
                                        order.status === 'Cancelled' ? 'bg-red-400' : 'bg-[#E67E22]'
                                )} />

                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#E67E22]">#{order.id}</span>
                                            <div className="h-1 w-1 rounded-full bg-gray-200" />
                                            <span className="text-xs font-bold text-gray-400">{order.date} • {order.time}</span>
                                            <Badge variant="outline" className={cn(
                                                "rounded-full border-none px-4 py-1 text-[10px] uppercase font-black tracking-widest",
                                                order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                    order.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-[#E67E22]/10 text-[#E67E22]'
                                            )}>
                                                {order.status}
                                            </Badge>
                                        </div>

                                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">
                                            {order.items.join(', ')}
                                        </h3>

                                        <div className="flex flex-wrap gap-8 items-center text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4 text-gray-300" />
                                                <span className="text-xs font-bold tracking-tight">{order.items.length} items</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-300" />
                                                <span className="text-xs font-bold tracking-tight">Avg. 35 mins</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-[#E67E22]" />
                                                <span className="text-xs font-bold tracking-tight text-gray-900">Total KES {order.total}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 lg:pl-12 lg:border-l border-gray-100">
                                        <Button className="bg-gray-50 hover:bg-gray-100 text-gray-900 px-8 h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                                            Order Details
                                        </Button>
                                        <Button className="bg-[#E67E22] hover:bg-black text-white px-8 h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#E67E22]/20">
                                            Reorder
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-24 text-center bg-gray-100 rounded-[3rem] border border-gray-100 px-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                <ShoppingBag className="w-10 h-10 text-gray-200" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">No orders yet</h2>
                            <p className="text-gray-400 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                                Your culinary journey begins here. Order your first African delight and track it in real-time.
                            </p>
                            <Link href="/menu">
                                <Button size="lg" className="bg-[#E67E22] hover:bg-black text-white h-16 px-12 rounded-2xl font-black text-lg shadow-xl shadow-[#E67E22]/20">
                                    Start Exploring
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}
