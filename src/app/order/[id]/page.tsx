'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, Clock, MapPin, Printer, Share2, Phone, MessageSquare } from 'lucide-react'
import { useOrderStore } from '@/lib/order-store'
import { cn } from '@/lib/utils'
// import { toast } from 'sonner'

export default function OrderTrackingPage() {
    const params = useParams()
    const router = useRouter()
    const orders = useOrderStore((state) => state.orders)
    // Fix: Unwrap params properly if it's a promise, but in client component with hooks it's fine usually.
    // However, simple find.
    const orderId = params?.id as string
    const order = orders.find(o => o.id === orderId)

    // Simulation of status updates
    const updateStatus = useOrderStore((state) => state.updateOrderStatus)

    useEffect(() => {
        if (order && order.status === 'Placed') {
            const timer = setTimeout(() => updateStatus(order.id, 'Preparing'), 5000)
            return () => clearTimeout(timer)
        }
    }, [order, updateStatus])

    if (!order) {
        return <div className="p-8 text-center">Order not found</div>
    }

    const steps = [
        { status: 'Placed', label: 'Order Placed', time: order.date },
        { status: 'Preparing', label: 'Preparing', time: 'Estimated 5 mins' },
        { status: 'Out for Delivery', label: 'Out for Delivery', time: 'Estimated 15 mins' },
        { status: 'Delivered', label: 'Delivered', time: '-' },
    ]

    const currentStepIndex = steps.findIndex(s => s.status === order.status)
    const isCompleted = order.status === 'Delivered'

    const handleShare = async () => {
        const text = `
🍲 *Savan Eats Order #${order.orderNumber}*
---------------------------
${order.items.map(i => `${i.quantity}x ${i.name}`).join('\n')}
---------------------------
Total: KES ${order.total}
Status: ${order.status}
    `.trim()

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Order #${order.orderNumber}`,
                    text: text,
                })
            } catch (err) {
                console.log('Error sharing', err)
            }
        } else {
            navigator.clipboard.writeText(text)
            alert("Order details copied to clipboard!")
        }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            <div className="no-print">
                <Header />
            </div>

            <main className="container py-6 space-y-6 max-w-lg mx-auto">
                {/* Status Card */}
                <Card className="no-print border-t-4 border-t-primary">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            {order.status === 'Placed' && <CheckCircle2 className="w-8 h-8 text-green-600" />}
                            {order.status === 'Preparing' && <span className="text-2xl">👨‍🍳</span>}
                            {order.status === 'Out for Delivery' && <span className="text-2xl">🛵</span>}
                            {order.status === 'Delivered' && <span className="text-2xl">😋</span>}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold font-display">{order.status}</h1>
                            <p className="text-muted-foreground">Order #{order.orderNumber}</p>
                        </div>

                        <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-1000 ease-out"
                                style={{ width: `${(currentStepIndex + 1) * 25}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline (No Print) */}
                <div className="bg-background rounded-lg p-6 shadow-sm no-print space-y-6">
                    {steps.map((step, index) => (
                        <div key={step.status} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center z-10",
                                    index <= currentStepIndex ? "bg-primary border-primary text-white" : "bg-background border-muted"
                                )}>
                                    {index <= currentStepIndex && <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={cn(
                                        "w-0.5 flex-1 my-1",
                                        index < currentStepIndex ? "bg-primary" : "bg-muted"
                                    )} />
                                )}
                            </div>
                            <div>
                                <h3 className={cn("font-semibold text-sm", index <= currentStepIndex ? "text-foreground" : "text-muted-foreground")}>
                                    {step.label}
                                </h3>
                                <p className="text-xs text-muted-foreground">{step.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 no-print">
                    <Button variant="outline" className="gap-2" onClick={handleShare}>
                        <Share2 className="w-4 h-4" /> Share Order
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={handlePrint}>
                        <Printer className="w-4 h-4" /> Print Receipt
                    </Button>
                </div>

                {/* Receipt (Print Only) */}
                <div className="hidden print-only p-4 border rounded">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">Savan Eats</h2>
                        <p className="text-sm">Authentic African Cuisine</p>
                        <p className="text-xs mt-2">{new Date(order.date).toLocaleString()}</p>
                        <p className="text-lg font-mono font-bold mt-2">#{order.orderNumber}</p>
                    </div>

                    <div className="border-t border-b py-4 my-4 border-black">
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between mb-2 font-mono text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span>{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1 font-mono text-sm text-right">
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>150</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-2">
                            <span>Total</span>
                            <span>KES {order.total}</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-xs">
                        <p>Customer: {useOrderStore.getState().orders?.length ? 'Guest' : 'User'}</p>
                        <p>Payment: {order.paymentMethod}</p>
                        <p className="mt-4">*** Thank You! ***</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
