'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Phone, MapPinOff, ArrowLeft, Clock, Package, Bike, CheckCircle, ChefHat, Box, Info } from 'lucide-react'
import { useOrderStore } from '@/lib/order-store'
import { cn } from '@/lib/utils'

export default function OrderTrackingPage() {
    const params = useParams()
    const router = useRouter()
    const orders = useOrderStore((state) => state.orders)
    const orderId = params?.id as string
    const order = orders.find(o => o.id === orderId)

    const updateStatus = useOrderStore((state) => state.updateOrderStatus)

    useEffect(() => {
        if (order && order.status === 'Placed') {
            const timer = setTimeout(() => updateStatus(order.id, 'Preparing'), 3000)
            return () => clearTimeout(timer)
        }
        if (order && order.status === 'Preparing') {
            const timer = setTimeout(() => updateStatus(order.id, 'Out for Delivery'), 8000)
            return () => clearTimeout(timer)
        }
    }, [order?.status, order?.id, updateStatus])

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
                <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8">
                    <Box className="w-10 h-10 text-gray-200" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Order Not Found</h2>
                <p className="text-gray-400 font-bold mb-10 italic">We couldn't locate this specific feast. Perhaps it's already served?</p>
                <Button onClick={() => router.push('/')} className="bg-[#E67E22] hover:bg-black text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-[10px]">Return Home</Button>
            </div>
        )
    }

    const steps = [
        { status: 'Placed', label: 'Order Confirmed', time: 'Just Now', icon: <Package className="w-5 h-5" /> },
        { status: 'Preparing', label: 'In the Kitchen', time: 'Preparing', icon: <ChefHat className="w-5 h-5" /> },
        { status: 'Out for Delivery', label: 'Out for Delivery', time: 'On the Way', icon: <Bike className="w-5 h-5" /> },
        { status: 'Delivered', label: 'Delivered', time: 'Arrived', icon: <CheckCircle className="w-5 h-5" /> },
    ]

    const statusMap: Record<string, number> = {
        'Placed': 0,
        'Preparing': 1,
        'Out for Delivery': 2,
        'Delivered': 3
    }

    const currentStepIndex = statusMap[order.status] || 0

    return (
        <div className="min-h-screen bg-white pb-48">
            <Header />

            <main className="max-w-2xl mx-auto px-6 py-12">
                {/* Back Link */}
                <button
                    onClick={() => router.push('/menu')}
                    className="flex items-center gap-2 text-[#E67E22] font-black text-[10px] uppercase tracking-[0.3em] mb-12 hover:translate-x-[-4px] transition-transform"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Selection
                </button>

                {/* Main Tracking Card */}
                <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 p-10 text-white shadow-2xl mb-12 border border-white/5">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#E67E22] rounded-full blur-[120px] opacity-20"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Tracking Order</p>
                                <h2 className="text-5xl font-black tracking-tighter">#{order.orderNumber}</h2>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-[1.5rem] text-right border border-white/10">
                                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Estimated Arrival</p>
                                <p className="text-2xl font-black text-[#E67E22]">~ 25 Mins</p>
                            </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="space-y-0 relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>

                            {steps.map((step, index) => {
                                const isActive = index <= currentStepIndex
                                const isCurrent = index === currentStepIndex

                                return (
                                    <div key={step.status} className="flex items-start gap-8 pb-12 last:pb-0">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-700 shadow-xl",
                                            isActive
                                                ? "bg-[#E67E22] text-white scale-110 shadow-[#E67E22]/20"
                                                : "bg-white/5 text-white/20 border border-white/10"
                                        )}>
                                            {isActive ? (
                                                index < currentStepIndex ? <CheckCircle2 className="w-6 h-6" /> : step.icon
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                            )}
                                        </div>
                                        <div className="pt-2">
                                            <h3 className={cn(
                                                "font-black text-xl leading-tight transition-all uppercase tracking-tight",
                                                isActive ? "text-white" : "text-white/20"
                                            )}>
                                                {step.label}
                                            </h3>
                                            <p className={cn(
                                                "text-xs font-bold mt-1 tracking-wide",
                                                isActive ? "text-white/50" : "text-white/10"
                                            )}>
                                                {isActive ? step.time : 'Scheduled'}
                                            </p>
                                            {isCurrent && (
                                                <div className="mt-4 bg-[#E67E22]/10 border border-[#E67E22]/20 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] inline-block text-[#E67E22] animate-pulse">
                                                    Status: {order.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Tracking Action Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-sm group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#E67E22] shadow-md group-hover:rotate-6 transition-transform">
                                <Box className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-black text-2xl text-gray-900 tracking-tight">Order Tracking</h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Updates Hub</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-2xl w-12 h-12 bg-white shadow-sm border border-gray-100 hover:bg-[#E67E22]/10 transition-all">
                            <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button className="flex-1 h-20 rounded-[2rem] bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 shadow-xl transition-all">
                            <Phone className="w-5 h-5 text-[#E67E22]" />
                            Support Center
                        </Button>
                        <Button variant="outline" className="flex-1 h-20 rounded-[2rem] border-2 border-gray-100 hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 text-gray-600 transition-all">
                            <Info className="w-5 h-5 text-gray-400" />
                            Order Receipt
                        </Button>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="mt-16 p-10 border border-gray-100 rounded-[3rem] bg-gray-50/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                        <ChefHat className="w-32 h-32" />
                    </div>
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Order Summary</h5>
                    <div className="space-y-6">
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="bg-white px-3 py-1.5 rounded-xl text-[10px] font-black text-[#E67E22] border border-gray-100 shadow-sm">{item.quantity}x</span>
                                    <span className="text-gray-900 font-bold text-lg">{item.name}</span>
                                </div>
                                <span className="text-gray-900 font-black text-lg">KES {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="h-[1px] bg-gray-200/50 my-8" />
                    <div className="flex justify-between items-end">
                        <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Settlement Amount</span>
                        <span className="text-[#E67E22] text-4xl font-black tracking-tighter">KES {order.total.toLocaleString()}</span>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    )
}
