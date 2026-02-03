'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Phone, ArrowLeft, Clock, Package, Bike, CheckCircle, ChefHat, Box, Info, Share2, Printer } from 'lucide-react'
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

    // Receipt Functions
    const handlePrintReceipt = () => {
        window.print()
    }

    const handleShare = async () => {
        if (!order) return

        // Group items for breakdown
        const grouped = order.items.reduce((acc, item) => {
            const name = item.recipient || 'Main Order'
            if (!acc[name]) acc[name] = []
            acc[name].push(`${item.quantity}x ${item.name}`)
            return acc
        }, {} as Record<string, string[]>)

        let breakdown = ''
        for (const [recipient, items] of Object.entries(grouped)) {
            breakdown += `\n*${recipient}*:\n- ${items.join('\n- ')}`
        }

        const shareData = {
            title: 'Savan Eats Order Details',
            text: `Hello! My Savan Eats order is confirmed.\nRef: #${order.orderNumber}\nTotal: KES ${order.total.toLocaleString()}\n\n*BATCH BREAKDOWN*:${breakdown}\n\nTrack progress here: ${window.location.origin}/order/${order.id}`,
            url: `${window.location.origin}/order/${order.id}`
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                console.error('Share failed', err)
            }
        } else {
            // Fallback to WhatsApp
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text)}`
            window.open(whatsappUrl, '_blank')
        }
    }

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
        <div className="min-h-screen bg-white pb-48 print:pb-0">
            <div className="print:hidden">
                <Header />
            </div>

            <main className="max-w-2xl mx-auto px-6 py-12 print:py-0 print:px-0">
                {/* Back Link */}
                <button
                    onClick={() => router.push('/menu')}
                    className="flex items-center gap-2 text-[#E67E22] font-black text-[10px] uppercase tracking-[0.3em] mb-12 hover:translate-x-[-4px] transition-transform print:hidden"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Selection
                </button>

                {/* Main Tracking Card - Responsive Optimization */}
                <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 p-8 sm:p-10 text-white shadow-2xl mb-12 border border-white/5 print:rounded-none print:shadow-none print:bg-white print:text-black print:border-b-2 print:border-gray-100 print:mb-8">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#E67E22] rounded-full blur-[120px] opacity-20 print:hidden"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12 sm:mb-16">
                            <div>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2 print:text-gray-400">Tracking Order</p>
                                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter truncate max-w-[200px] sm:max-w-none">#{order.orderNumber}</h2>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md px-5 py-3 sm:px-6 sm:py-4 rounded-[1.5rem] sm:text-right border border-white/10 w-full sm:w-auto print:bg-gray-50 print:border-gray-100">
                                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1 print:text-gray-400">Estimated Arrival</p>
                                <p className="text-xl sm:text-2xl font-black text-[#E67E22]">~ 25 Mins</p>
                            </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="space-y-0 relative print:hidden">
                            {/* Connecting Line */}
                            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>

                            {steps.map((step, index) => {
                                const isActive = index <= currentStepIndex
                                const isCurrent = index === currentStepIndex

                                return (
                                    <div key={step.status} className="flex items-start gap-6 sm:gap-8 pb-10 sm:pb-12 last:pb-0">
                                        <div className={cn(
                                            "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-700 shadow-xl",
                                            isActive
                                                ? "bg-[#E67E22] text-white scale-110 shadow-[#E67E22]/20"
                                                : "bg-white/5 text-white/20 border border-white/10"
                                        )}>
                                            {isActive ? (
                                                index < currentStepIndex ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : step.icon
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                            )}
                                        </div>
                                        <div className="pt-1 sm:pt-2 flex-1">
                                            <h3 className={cn(
                                                "font-black text-lg sm:text-xl leading-tight transition-all uppercase tracking-tight",
                                                isActive ? "text-white" : "text-white/20"
                                            )}>
                                                {step.label}
                                            </h3>
                                            <p className={cn(
                                                "text-[10px] sm:text-xs font-bold mt-1 tracking-wide",
                                                isActive ? "text-white/50" : "text-white/10"
                                            )}>
                                                {isActive ? step.time : 'Scheduled'}
                                            </p>
                                            {isCurrent && (
                                                <div className="mt-3 sm:mt-4 bg-[#E67E22]/10 border border-[#E67E22]/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] inline-block text-[#E67E22] animate-pulse">
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

                {/* Print Only Header for Receipt */}
                <div className="hidden print:block mb-8 text-center pt-8 border-b-2 border-gray-100 pb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">Savan Eats</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Official Order Receipt</p>
                    <div className="mt-6 flex justify-between text-left">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Ref</p>
                            <p className="text-xl font-black text-gray-900">#{order.orderNumber}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                            <p className="text-xl font-black text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Tracking Action Section */}
                <div className="space-y-6 print:hidden">
                    <div className="flex items-center justify-between p-6 sm:p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-sm group">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-[#E67E22] shadow-md group-hover:rotate-6 transition-transform shrink-0">
                                <Box className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                            <div>
                                <h4 className="font-black text-xl sm:text-2xl text-gray-900 tracking-tight">Order Progress</h4>
                                <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Updates & Confirmation</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleShare}
                            className="rounded-2xl w-12 h-12 bg-white shadow-sm border border-gray-100 hover:bg-[#E67E22]/10 transition-all p-0 flex items-center justify-center text-[#E67E22]"
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <Button className="flex-1 h-16 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] bg-gray-900 hover:bg-black text-white font-black uppercase tracking-wider text-[9px] sm:text-[10px] flex items-center justify-center gap-3 sm:gap-4 shadow-xl transition-all">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#E67E22]" />
                            Support Center
                        </Button>
                        <Button
                            onClick={handlePrintReceipt}
                            variant="outline"
                            className="flex-1 h-16 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-gray-100 hover:bg-gray-50 font-black uppercase tracking-wider text-[9px] sm:text-[10px] flex items-center justify-center gap-3 sm:gap-4 text-gray-600 transition-all"
                        >
                            <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            Print Receipt
                        </Button>
                    </div>
                </div>

                {/* Summary Section - Optimized for Print & Mobile */}
                <div className="mt-12 sm:mt-16 p-8 sm:p-10 border border-gray-100 rounded-[2.5rem] sm:rounded-[3rem] bg-gray-50/50 relative overflow-hidden print:bg-transparent print:border-none print:mt-4 print:p-0">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none print:hidden">
                        <ChefHat className="w-32 h-32" />
                    </div>
                    <h5 className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 sm:mb-8 print:text-black print:text-sm">Order Selections</h5>
                    <div className="space-y-10">
                        {Object.entries(
                            order.items.reduce((acc, item) => {
                                const name = item.recipient || 'Main Order'
                                if (!acc[name]) acc[name] = []
                                acc[name].push(item)
                                return acc
                            }, {} as Record<string, typeof order.items>)
                        ).map(([recipient, groupItems]) => (
                            <div key={recipient} className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] flex-1 bg-gray-200 print:bg-black/10" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E67E22] print:text-black">{recipient}</span>
                                    <div className="h-[1px] flex-1 bg-gray-200 print:bg-black/10" />
                                </div>
                                <div className="space-y-4">
                                    {groupItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center print:border-b print:border-dotted print:border-gray-200 print:pb-2">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <span className="bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[9px] sm:text-[10px] font-black text-[#E67E22] border border-gray-100 shadow-sm print:bg-transparent print:border-none print:text-black">{item.quantity}x</span>
                                                <span className="text-gray-900 font-bold text-base sm:text-lg">{item.name}</span>
                                            </div>
                                            <span className="text-gray-900 font-black text-base sm:text-lg">KES {(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="h-[1px] bg-gray-200/50 my-6 sm:my-8 print:hidden" />
                    <div className="flex justify-between items-end print:mt-12">
                        <div className="print:hidden">
                            <span className="text-gray-400 font-black uppercase text-[9px] sm:text-[10px] tracking-widest block mb-1">Total Amount Due</span>
                            <span className="text-[#E67E22] text-3xl sm:text-4xl font-black tracking-tighter">KES {order.total.toLocaleString()}</span>
                        </div>
                        <div className="hidden print:block w-full">
                            <div className="flex justify-between items-center border-t-2 border-black pt-4">
                                <span className="text-xl font-black uppercase">Grand Total</span>
                                <span className="text-2xl font-black text-gray-900">KES {order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print Footer */}
                <div className="hidden print:block mt-16 text-center border-t border-gray-100 pt-8">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em] mb-4">Thank you for dining with Savan</p>
                    <p className="text-[8px] text-gray-300 font-medium">This is a system generated receipt. Digital ID: {order.id}</p>
                </div>
            </main>
            <div className="print:hidden">
                <BottomNav />
            </div>
        </div>
    )
}
