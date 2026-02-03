'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
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
                <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
                <Button onClick={() => router.push('/')} className="bg-[#E67E22]">Go Home</Button>
            </div>
        )
    }

    const steps = [
        { status: 'Placed', label: 'Feast Requested', time: '12:30 PM', icon: <Package className="w-5 h-5" /> },
        { status: 'Preparing', label: 'Crafting Heritage', time: '12:35 PM', icon: <ChefHat className="w-5 h-5" /> },
        { status: 'Out for Delivery', label: 'On Route to You', time: '12:50 PM', icon: <Bike className="w-5 h-5" /> },
        { status: 'Delivered', label: 'Arrived at Table', time: '1:10 PM', icon: <CheckCircle className="w-5 h-5" /> },
    ]

    const statusMap: Record<string, number> = {
        'Placed': 0,
        'Preparing': 1,
        'Out for Delivery': 2,
        'Delivered': 3
    }

    const currentStepIndex = statusMap[order.status] || 0

    return (
        <div className="min-h-screen bg-white pb-32">
            <Header />

            <main className="max-w-xl mx-auto px-4 py-8">
                {/* Back Link */}
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-[#E67E22] font-black text-[10px] uppercase tracking-[0.3em] mb-12 hover:translate-x-[-4px] transition-transform"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to the Soul
                </button>

                {/* Main Tracking Card - Matching Sample 3 */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#E67E22] p-8 text-white shadow-2xl shadow-[#E67E22]/20 mb-10">
                    {/* Background Decorative Circles */}
                    <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-black/10 rounded-full blur-xl"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Heritage Path</p>
                                <h2 className="text-5xl font-black tracking-tighter">#{order.orderNumber}</h2>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-[1.5rem] text-right">
                                <p className="text-white/70 text-[9px] font-black uppercase tracking-widest mb-1">Expected at Table</p>
                                <p className="text-2xl font-black">12:30 PM</p>
                            </div>
                        </div>

                        {/* Vertical Timeline - Matching Sample 3 */}
                        <div className="space-y-0 relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-white/30"></div>

                            {steps.map((step, index) => {
                                const isActive = index <= currentStepIndex
                                const isCurrent = index === currentStepIndex

                                return (
                                    <div key={step.status} className="flex items-start gap-6 pb-12 last:pb-0">
                                        <div className={cn(
                                            "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 shadow-lg",
                                            isActive ? "bg-white text-[#E67E22]" : "bg-white/10 text-white/40 border border-white/20"
                                        )}>
                                            {isActive ? (
                                                index < currentStepIndex ? <CheckCircle2 className="w-6 h-6" /> : step.icon
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                            )}
                                        </div>
                                        <div className="pt-2">
                                            <h3 className={cn(
                                                "font-bold text-lg leading-tight transition-all",
                                                isActive ? "text-white" : "text-white/40"
                                            )}>
                                                {step.label}
                                            </h3>
                                            <p className={cn(
                                                "text-xs font-medium mt-1",
                                                isActive ? "text-white/70" : "text-white/20"
                                            )}>
                                                {isActive ? step.time : 'Waiting...'}
                                            </p>
                                            {isCurrent && (
                                                <div className="mt-4 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] inline-block border border-white/20 animate-pulse">
                                                    Kitchen is busy...
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
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-[#E67E22] shadow-sm">
                                <Box className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl text-gray-900">Map Your Feast</h4>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Delivery Matrix</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-2xl w-12 h-12 bg-white shadow-sm border border-gray-100 hover:bg-[#E67E22]/10 group">
                            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-[#E67E22] rotate-180" />
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button className="flex-1 h-20 rounded-[2rem] bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 shadow-xl shadow-gray-200">
                            <Phone className="w-5 h-5 text-[#E67E22]" />
                            Concierge Access
                        </Button>
                        <Button variant="outline" className="flex-1 h-20 rounded-[2rem] border-2 border-gray-100 hover:bg-gray-50 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 text-gray-700">
                            <Info className="w-5 h-5 text-gray-400" />
                            Feast Details
                        </Button>
                    </div>
                </div>

                {/* Mini Receipt Summary */}
                <div className="mt-12 p-8 border border-gray-100 rounded-[2rem] bg-gray-50/50">
                    <h5 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        Order Summary
                    </h5>
                    <div className="space-y-4">
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                                <div className="flex items-center gap-2">
                                    <span className="bg-white px-2 py-1 rounded-lg text-xs text-[#E67E22] border border-gray-100">{item.quantity}x</span>
                                    <span className="text-gray-700">{item.name}</span>
                                </div>
                                <span className="text-gray-900">KES {item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="h-px bg-gray-200/50 my-6" />
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-bold uppercase text-[10px]">Total Paid</span>
                        <span className="text-[#E67E22] text-2xl font-black">KES {order.total}</span>
                    </div>
                </div>
            </main>
        </div>
    )
}
