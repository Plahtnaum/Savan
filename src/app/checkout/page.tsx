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
    const { items, getCartTotal, clearCart } = useCartStore()
    const { user } = useUserStore()
    const { createOrder } = useOrderStore()

    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cash'>('mpesa')
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '')
    const [orderGenerated, setOrderGenerated] = useState(false)
    const [tempOrderId, setTempOrderId] = useState('')

    const total = getCartTotal()
    const deliveryFee = 150
    const finalTotal = total + deliveryFee

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '') // Only numbers
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

        createOrder({
            id: newOrderId,
            items: [...items],
            total: finalTotal,
            address: defaultAddress || 'Current Location',
            paymentMethod,
            customerPhone: phoneNumber
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
        const handleWhatsApp = () => {
            const message = `Hello! My Savan Eats order is confirmed.\nOrder ID: ${tempOrderId}\nTotal Due: KES ${finalTotal.toLocaleString()}\n\nTrack progress here: ${window.location.origin}/order/${tempOrderId}`
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
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

                    <div className="bg-gray-50 rounded-[2.5rem] p-10 mb-12 border border-gray-100 space-y-8 print:bg-white print:border-none print:p-0">
                        <p className="text-gray-600 font-medium print:text-black">
                            {paymentMethod === 'cash'
                                ? `Your feast is being prepared. Please have KES ${finalTotal.toLocaleString()} ready for our rider upon arrival.`
                                : `M-Pesa payment initiated. Please check your phone to confirm the transaction of KES ${finalTotal.toLocaleString()}.`}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 print:hidden">
                            <Button
                                onClick={handlePrint}
                                variant="outline"
                                className="flex-1 h-16 rounded-2xl border-gray-200 font-black uppercase text-[10px] tracking-widest gap-2"
                            >
                                <Printer className="w-4 h-4" /> Print Receipt
                            </Button>
                            <Button
                                onClick={handleWhatsApp}
                                variant="outline"
                                className="flex-1 h-16 rounded-2xl border-gray-200 font-black uppercase text-[10px] tracking-widest gap-2"
                            >
                                <Share2 className="w-4 h-4" /> Share to WhatsApp
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
                                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Delivery Logistics</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Full Name</label>
                                    <Input
                                        defaultValue={user?.name}
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
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Destination Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <Input
                                            disabled={true}
                                            defaultValue={user?.addresses.find(a => a.isDefault)?.address || user?.addresses[0]?.address || "Current Location"}
                                            className="h-16 rounded-2xl bg-gray-50 border-gray-100 pl-16 pr-8 font-black text-gray-900"
                                        />
                                        <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#E67E22] uppercase tracking-widest hover:text-black transition-colors">Change</button>
                                    </div>
                                </div>
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

                                    <div className="space-y-8">
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
