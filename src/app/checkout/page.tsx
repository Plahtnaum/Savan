'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, MapPin, Phone, CreditCard, Lock, Clock, ShieldCheck, ArrowRight, Truck, Info, Printer, Share2 } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { useUserStore } from '@/lib/user-store'
import { useOrderStore } from '@/lib/order-store'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getCartTotal, clearCart, orderType, setOrderType } = useCartStore()
    const { user } = useUserStore()
    const { createOrder, orders } = useOrderStore()

    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cash'>('mpesa')
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '')
    const [orderGenerated, setOrderGenerated] = useState(false)
    const [tempOrderId, setTempOrderId] = useState('')
    const [distributionMode, setDistributionMode] = useState<'individual' | 'combined'>('individual')
    const [commonRecipient, setCommonRecipient] = useState('')

    const total = getCartTotal()
    const deliveryFee = orderType === 'delivery' ? 150 : 0
    const finalTotal = total + deliveryFee

    const [deliveryInstructions, setDeliveryInstructions] = useState('')
    const [customerName, setCustomerName] = useState(user?.name || '')

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '') // Only numbers
        // Auto-correct local format to international
        if (val.startsWith('0')) {
            val = '254' + val.substring(1)
        }
        setPhoneNumber(val)
    }

    const handlePlaceOrder = async () => {
        setLoading(true)
        // Generate a unique Order ID
        const newOrderId = `SVN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        setTempOrderId(newOrderId)

        // Simulate Processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        const defaultAddress = user?.addresses.find(a => a.isDefault)?.address || user?.addresses[0]?.address

        const finalItems = distributionMode === 'combined'
            ? items.map(item => ({ ...item, recipient: commonRecipient || user?.name || 'Main Order' }))
            : items

        createOrder({
            id: newOrderId,
            items: finalItems,
            total: finalTotal,
            address: orderType === 'delivery' ? (defaultAddress || 'Current Location') : 'Savan Hub (Building)',
            customerName,
            deliveryInstructions: orderType === 'delivery' ? deliveryInstructions : '',
            paymentMethod,
            customerPhone: phoneNumber,
            orderType
        })

        clearCart()
        setLoading(false)
        setOrderGenerated(true)

        // Auto-redirect after success if not cash (optional)
        if (paymentMethod === 'mpesa') {
            router.push(`/order/${newOrderId}`)
        }
    }

    if (items.length === 0 && !orderGenerated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-6">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                        <ShieldCheck className="w-10 h-10 text-gray-200" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Secure Checkout</h2>
                    <p className="text-gray-400 font-medium mb-10 italic">Your cart is currently empty. Our kitchen is ready when you are.</p>
                    <Button
                        onClick={() => router.push('/menu')}
                        className="bg-[#E67E22] hover:bg-black text-white rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-[10px]"
                    >
                        Browse Menu
                    </Button>
                </div>
            </div>
        )
    }

    if (orderGenerated) {
        const handlePrint = () => window.print()

        const handleShare = async () => {
            // Group items for breakdown
            const grouped = items.reduce((acc, item) => {
                const name = item.recipient || 'Main Order'
                if (!acc[name]) acc[name] = []
                acc[name].push(`${item.quantity}x ${item.name}`)
                return acc
            }, {} as Record<string, string[]>)

            let breakdown = ''
            for (const [recipient, gItems] of Object.entries(grouped)) {
                breakdown += `\n*${recipient}*:\n- ${gItems.join('\n- ')}`
            }

            const shareData = {
                title: 'Savan Eats Order Confirmation',
                text: `Hello! My Savan Eats order is confirmed.\nRef: #${tempOrderId}\nRecipient: ${customerName}\nTotal: KES ${finalTotal.toLocaleString()}\nFulfillment: ${orderType === 'delivery' ? `Delivery to ${address}` : 'Pickup at Hub'}${orderType === 'delivery' && deliveryInstructions ? `\nInst: ${deliveryInstructions}` : ''}\n\n*BATCH BREAKDOWN*:${breakdown}\n\nTrack progress here: ${window.location.origin}/order/${tempOrderId}`,
                url: `${window.location.origin}/order/${tempOrderId}`
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

        return (
            <div className="min-h-screen bg-white">
                <div className="print:hidden">
                    <Header />
                </div>
                <main className="container max-w-2xl mx-auto px-6 py-24 text-center print:py-0 print:px-0">
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-500/10 print:hidden">
                        <ShieldCheck className="w-12 h-12" />
                    </div>
                    <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter uppercase print:text-3xl">Order Secured.</h2>
                    <p className="text-gray-400 font-bold mb-12 print:mb-6">Order Reference: <span className="text-gray-900">#{tempOrderId}</span></p>

                    <div className="bg-gray-50 rounded-[2.5rem] p-8 sm:p-12 mb-12 border border-gray-100 space-y-12 print:bg-white print:border-none print:p-0">
                        <div className="text-center space-y-4">
                            <p className="text-gray-600 font-medium print:text-black text-lg">
                                {paymentMethod === 'cash'
                                    ? `Your feast is being prepared. Please have KES ${finalTotal.toLocaleString()} ready for our ${orderType === 'delivery' ? 'rider' : 'concierge'} upon arrival.`
                                    : `M-Pesa payment initiated. Please check your phone to confirm the transaction of KES ${finalTotal.toLocaleString()}.`}
                            </p>

                            {paymentMethod === 'cash' && (
                                <div className="inline-block bg-gray-900 text-white rounded-3xl p-8 mt-6 shadow-2xl animate-premium-fade">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-white/40">Release Verification Code</p>
                                    <p className="text-6xl font-black tracking-[0.1em]">{orders.find(o => o.id === tempOrderId)?.verificationCode || '----'}</p>
                                    <p className="text-[10px] font-bold mt-6 text-white/60">Show this to your {orderType === 'delivery' ? 'rider' : 'server'} to receive your food.</p>
                                </div>
                            )}

                            {/* Logistics Summary for Success Page */}
                            <div className="pt-8 grid grid-cols-2 gap-6 text-left border-t border-gray-100/50 mt-8">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Fulfillment Mode</p>
                                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{orderType}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Customer</p>
                                    <p className="text-sm font-black text-gray-900">{customerName}</p>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                                        {orderType === 'delivery' ? 'Delivery Address' : 'Collection Point'}
                                    </p>
                                    <p className="text-sm font-bold text-gray-700 leading-tight">
                                        {orderType === 'delivery'
                                            ? (user?.addresses.find(a => a.isDefault)?.address || user?.addresses[0]?.address || 'Current Location')
                                            : 'Savan Eats Headquarters, Nairobi'}
                                    </p>
                                    {orderType === 'delivery' && deliveryInstructions && (
                                        <p className="text-[10px] font-medium text-[#E67E22] italic mt-1">"{deliveryInstructions}"</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Success Order Breakdown */}
                        <div className="space-y-8 text-left">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Order Contents</span>
                                <div className="h-[1px] flex-1 bg-gray-100" />
                            </div>
                            <div className="space-y-8">
                                {Object.entries(
                                    items.reduce((acc, item) => {
                                        const name = item.recipient || 'Main Order'
                                        if (!acc[name]) acc[name] = []
                                        acc[name].push(item)
                                        return acc
                                    }, {} as Record<string, typeof items>)
                                ).map(([recipient, groupItems]) => (
                                    <div key={recipient} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-900">{recipient}</span>
                                        </div>
                                        <div className="space-y-3 pl-4">
                                            {groupItems.map(item => (
                                                <div key={item.id} className="flex justify-between items-center">
                                                    <span className="text-gray-500 font-bold text-sm">{item.quantity}x {item.name}</span>
                                                    <span className="text-gray-900 font-black text-sm">KES {(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400 font-bold text-sm">Logistics Fee</span>
                                    <span className="text-gray-900 font-bold">KES {deliveryFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-900 font-black uppercase text-xs tracking-widest">Grand Total</span>
                                    <span className="text-[#E67E22] font-black text-2xl tracking-tighter">KES {finalTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 print:hidden">
                            <Button
                                onClick={handlePrint}
                                variant="outline"
                                className="flex-1 h-16 rounded-2xl border-gray-200 font-black uppercase text-[10px] tracking-widest gap-2"
                            >
                                <Printer className="w-4 h-4" /> Print Receipt
                            </Button>
                            <Button
                                onClick={handleShare}
                                variant="outline"
                                className="flex-1 h-16 rounded-2xl border-gray-200 font-black uppercase text-[10px] tracking-widest gap-2"
                            >
                                <Share2 className="w-4 h-4" /> Share Bill
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6 print:hidden">
                        <Button
                            onClick={() => router.push(`/order/${tempOrderId}`)}
                            className="bg-gray-900 hover:bg-black text-white rounded-2xl w-full h-16 font-black uppercase tracking-widest text-xs"
                        >
                            Track Your Order
                        </Button>
                        <button
                            onClick={() => router.push('/')}
                            className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-[#E67E22] transition-colors"
                        >
                            Return to Homepage
                        </button>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pb-48">
            <Header />

            <main className="container max-w-[1440px] mx-auto px-6 sm:px-12 py-16">
                <header className="mb-16">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#E67E22] hover:text-gray-900 transition-colors font-black text-[10px] uppercase tracking-[0.4em] mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Modify Your Feast
                    </button>
                    <h1 className="text-5xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.85]">
                        Secure <span className="text-[#E67E22]">Checkout.</span>
                    </h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left: Formalities */}
                    <div className="flex-1 space-y-24">
                        {/* Delivery Section */}
                        <section className="space-y-12">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center text-[#E67E22] shadow-sm">
                                    <Truck className="w-7 h-7" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Logistics Mode</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { id: 'delivery', label: 'Delivery', desc: 'To Your Door', fee: 'KES 150', icon: Truck },
                                    { id: 'pickup', label: 'Pickup', desc: 'I\'ll come down', fee: 'FREE', icon: MapPin },
                                    { id: 'dine-in', label: 'Dine-in', desc: 'Table Service', fee: 'FREE', icon: Utensils },
                                ].map((mode) => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setOrderType(mode.id as any)}
                                        className={cn(
                                            "p-6 rounded-[2rem] border-2 transition-all duration-500 text-left relative overflow-hidden group",
                                            orderType === mode.id
                                                ? "border-[#E67E22] bg-[#E67E22]/5 shadow-xl scale-[1.02]"
                                                : "border-gray-50 hover:border-gray-200 bg-white"
                                        )}
                                    >
                                        <mode.icon className={cn("w-6 h-6 mb-4", orderType === mode.id ? "text-[#E67E22]" : "text-gray-300")} />
                                        <h4 className="font-black text-lg text-gray-900 leading-none mb-1">{mode.label}</h4>
                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{mode.desc}</p>
                                        <span className="absolute top-6 right-6 text-[8px] font-black text-[#E67E22] bg-white px-2 py-1 rounded-md shadow-sm border border-gray-50">{mode.fee}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Recipient Details</span>
                                <div className="h-[1px] flex-1 bg-gray-100" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Full Name</label>
                                    <Input
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="h-16 rounded-2xl bg-gray-50 border-gray-100 px-8 font-black text-gray-900 focus:ring-2 focus:ring-[#E67E22] focus:bg-white transition-all"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end mr-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">M-Pesa Number</label>
                                        <span className="text-[9px] font-bold text-gray-300">Format: 254...</span>
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <Input
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                            placeholder="254700000000"
                                            className="h-16 rounded-2xl bg-gray-50 border-gray-100 pl-16 pr-8 font-black text-gray-900 focus:ring-2 focus:ring-[#E67E22] focus:bg-white transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">
                                        {orderType === 'delivery' ? 'Destination Address' : 'Savan Hub (Collection)'}
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <Input
                                            disabled={true}
                                            value={orderType === 'delivery' ? (user?.addresses.find(a => a.isDefault)?.address || user?.addresses[0]?.address || "Current Location") : "Savan Eats Headquarters, Nairobi"}
                                            className="h-16 rounded-2xl bg-gray-50 border-gray-100 pl-16 pr-8 font-black text-gray-900"
                                        />
                                        {orderType === 'delivery' && (
                                            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#E67E22] uppercase tracking-widest hover:text-black transition-colors">Change</button>
                                        )}
                                    </div>
                                </div>

                                {orderType === 'delivery' && (
                                    <div className="md:col-span-2 space-y-4 animate-premium-fade">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Delivery Instructions</label>
                                        <div className="relative">
                                            <Info className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <Input
                                                value={deliveryInstructions}
                                                onChange={(e) => setDeliveryInstructions(e.target.value)}
                                                placeholder="House No, Gate color, Office floor etc."
                                                className="h-16 rounded-2xl bg-white border-gray-200 pl-16 pr-8 font-black text-gray-900 focus:ring-2 focus:ring-[#E67E22] transition-all"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Batch Strategy Selection */}
                            <div className="space-y-8 pt-8">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Distribution Strategy</span>
                                    <div className="h-[1px] flex-1 bg-gray-100" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setDistributionMode('individual')}
                                        className={cn(
                                            "flex flex-col gap-4 p-8 rounded-[2rem] border-2 transition-all text-left",
                                            distributionMode === 'individual' ? "border-[#E67E22] bg-[#E67E22]/5" : "border-gray-50 bg-white"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="text-[10px] border-gray-100">Smart Batch</Badge>
                                            <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", distributionMode === 'individual' ? "border-[#E67E22]" : "border-gray-200")}>
                                                {distributionMode === 'individual' && <div className="w-2 h-2 rounded-full bg-[#E67E22]" />}
                                            </div>
                                        </div>
                                        <h4 className="font-black text-lg">Individual Labeled</h4>
                                        <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">Maintain separate names for each item discovery.</p>
                                    </button>

                                    <button
                                        onClick={() => setDistributionMode('combined')}
                                        className={cn(
                                            "flex flex-col gap-4 p-8 rounded-[2rem] border-2 transition-all text-left",
                                            distributionMode === 'combined' ? "border-[#E67E22] bg-[#E67E22]/5" : "border-gray-50 bg-white"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="text-[10px] border-gray-100">Simple Batch</Badge>
                                            <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", distributionMode === 'combined' ? "border-[#E67E22]" : "border-gray-200")}>
                                                {distributionMode === 'combined' && <div className="w-2 h-2 rounded-full bg-[#E67E22]" />}
                                            </div>
                                        </div>
                                        <h4 className="font-black text-lg">Single Recipient</h4>
                                        <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">Group everything under one name for simplicity.</p>
                                    </button>
                                </div>

                                {distributionMode === 'combined' && (
                                    <div className="space-y-4 animate-premium-fade">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Combine items for:</label>
                                        <Input
                                            value={commonRecipient}
                                            onChange={(e) => setCommonRecipient(e.target.value)}
                                            placeholder="e.g. Finance Hub, Team Alpha, etc."
                                            className="h-16 rounded-2xl bg-white border-[#E67E22]/20 px-8 font-black text-gray-900 focus:ring-4 focus:ring-[#E67E22]/10 transition-all shadow-lg shadow-[#E67E22]/5"
                                        />
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section className="space-y-12 pb-12 lg:pb-0">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center text-[#E67E22] shadow-sm">
                                    <CreditCard className="w-7 h-7" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Payment Details</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <button
                                    onClick={() => setPaymentMethod('mpesa')}
                                    className={cn(
                                        "p-6 sm:p-10 rounded-[2.5rem] border-2 transition-all duration-500 text-left relative overflow-hidden group h-full",
                                        paymentMethod === 'mpesa'
                                            ? "border-[#E67E22] bg-[#E67E22]/5 shadow-2xl shadow-[#E67E22]/10 scale-[1.02]"
                                            : "border-gray-100 hover:border-gray-300 bg-white"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mb-10 border border-gray-50">
                                            <div className="w-8 h-8 bg-[#E67E22] rounded-full flex items-center justify-center">
                                                <span className="text-white text-[10px] font-black italic">M</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-2xl text-gray-900 mb-2">M-Pesa STK</h4>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Instant Push Confirmation</p>
                                        </div>
                                    </div>
                                    {paymentMethod === 'mpesa' && <ShieldCheck className="absolute top-10 right-10 w-8 h-8 text-[#E67E22] animate-premium-fade" />}
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('cash')}
                                    className={cn(
                                        "p-6 sm:p-10 rounded-[2.5rem] border-2 transition-all duration-500 text-left relative overflow-hidden group h-full",
                                        paymentMethod === 'cash'
                                            ? "border-gray-900 bg-gray-50 shadow-2xl scale-[1.02]"
                                            : "border-gray-100 hover:border-gray-300 bg-white"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center mb-10 border border-gray-50 text-gray-400 group-hover:text-gray-900 transition-colors">
                                            <Truck className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-2xl text-gray-900 mb-2">Pay on Delivery</h4>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Settle upon Arrival</p>
                                        </div>
                                    </div>
                                    {paymentMethod === 'cash' && <ShieldCheck className="absolute top-10 right-10 w-8 h-8 text-gray-900 animate-premium-fade" />}
                                </button>
                            </div>

                            {paymentMethod === 'cash' && (
                                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-[2rem] p-8 flex items-start gap-4 animate-premium-fade">
                                    <Info className="w-6 h-6 text-[#E67E22] shrink-0 mt-1" />
                                    <div className="space-y-2">
                                        <h5 className="font-black text-sm uppercase tracking-widest text-gray-900">Legal Obligation</h5>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                            By selecting Pay on Delivery, you formally agree to an **obligation to pay** the total amount upon the arrival of our rider. Failure to do so may result in temporary suspension of service.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right: Summary Hub */}
                    <div className="lg:w-[450px]">
                        <div className="sticky top-32 space-y-10">
                            <div className="bg-gray-900 rounded-[3rem] p-8 sm:p-12 text-white shadow-[0_40px_100px_rgba(0,0,0,0.15)] relative overflow-hidden">
                                <div className="relative z-10 space-y-12 sm:space-y-16">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Order Summation</h3>
                                        <Badge className="bg-white/10 text-white border-white/20 uppercase tracking-[0.3em] text-[9px] font-black h-8 px-4">{items.length} SELECTIONS</Badge>
                                    </div>

                                    <div className="space-y-10">
                                        {/* Grouped Items Breakdown */}
                                        <div className="space-y-6">
                                            {distributionMode === 'combined' ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-[1px] flex-1 bg-white/10" />
                                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{commonRecipient || user?.name || 'Main Order'}</span>
                                                        <div className="h-[1px] flex-1 bg-white/10" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        {items.map(item => (
                                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                                <span className="text-white/60 font-bold">{item.quantity}x {item.name}</span>
                                                                <span className="text-white font-black text-xs">KES {(item.price * item.quantity).toLocaleString()}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                Object.entries(
                                                    items.reduce((acc, item) => {
                                                        const name = item.recipient || 'Main Order'
                                                        if (!acc[name]) acc[name] = []
                                                        acc[name].push(item)
                                                        return acc
                                                    }, {} as Record<string, typeof items>)
                                                ).map(([recipient, groupItems]) => (
                                                    <div key={recipient} className="space-y-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-[1px] flex-1 bg-white/10" />
                                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{recipient}</span>
                                                            <div className="h-[1px] flex-1 bg-white/10" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            {groupItems.map(item => (
                                                                <div key={item.id} className="flex justify-between items-center text-sm">
                                                                    <span className="text-white/60 font-bold">{item.quantity}x {item.name}</span>
                                                                    <span className="text-white font-black text-xs">KES {(item.price * item.quantity).toLocaleString()}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <div className="space-y-8 pt-8 border-t border-white/5">
                                            <div className="flex justify-between text-white/70 font-bold text-lg">
                                                <span>Sub-Total</span>
                                                <span className="font-black text-white">KES {total.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-white/70 font-bold text-lg">
                                                <span>Delivery Logistics</span>
                                                <span className="font-black text-white">KES {deliveryFee.toLocaleString()}</span>
                                            </div>
                                            <div className="pt-10 border-t border-white/10 flex justify-between items-end">
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Grand Total</span>
                                                    <p className="text-4xl sm:text-6xl font-black tracking-tighter">KES {finalTotal.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-20 sm:h-24 rounded-[1.5rem] sm:rounded-[2rem] bg-[#E67E22] hover:bg-white hover:text-black text-lg sm:text-xl font-black transition-all duration-500 flex items-center justify-center gap-4 uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-[0_30px_60px_rgba(230,126,34,0.4)] active:scale-95 disabled:bg-white/10 disabled:text-white/20 group border-none"
                                        onClick={handlePlaceOrder}
                                        disabled={loading || phoneNumber.length < 10}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-6">
                                                <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" />
                                                <span className="text-sm font-black uppercase tracking-widest leading-none">Securing...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Place Your Order</span>
                                                <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                    {phoneNumber.length < 10 && !loading && (
                                        <p className="text-center text-[9px] font-black text-[#E67E22] uppercase tracking-widest animate-pulse">Please provide a valid M-Pesa number</p>
                                    )}
                                </div>

                                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E67E22] rounded-full blur-[100px] opacity-10"></div>
                            </div>

                            <div className="p-10 rounded-[2.5rem] border border-gray-100 flex items-start gap-6 bg-white/50 backdrop-blur-sm">
                                <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
                                <div>
                                    <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-2">Secure Transactions</h4>
                                    <p className="text-xs text-gray-400 font-bold leading-relaxed italic">Your security is our priority. M-Pesa transactions are handled through secure gateways with instant verification.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    )
}
