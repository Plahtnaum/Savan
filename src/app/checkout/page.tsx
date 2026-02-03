'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, MapPin, Phone, CreditCard, Lock, Clock, ShieldCheck, ArrowRight, Truck } from 'lucide-react'
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

    const total = getCartTotal()
    const deliveryFee = 150
    const finalTotal = total + deliveryFee

    const handlePlaceOrder = async () => {
        setLoading(true)
        // Simulate STK Push
        await new Promise(resolve => setTimeout(resolve, 2000))

        const defaultAddress = user?.addresses.find(a => a.isDefault)?.address || user?.addresses[0]?.address

        createOrder({
            items: [...items],
            total: finalTotal,
            address: defaultAddress || 'Current Location',
            paymentMethod
        })

        const activeOrderId = useOrderStore.getState().activeOrderId

        clearCart()
        setLoading(false)
        if (activeOrderId) {
            router.push(`/order/${activeOrderId}`)
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-6">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                        <ShieldCheck className="w-10 h-10 text-gray-200" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Secure Checkout</h2>
                    <p className="text-gray-400 font-medium mb-10">Your cart is currently empty. Our kitchen is ready when you are.</p>
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

    return (
        <div className="min-h-screen bg-white pb-32">
            <Header />

            <main className="container max-w-[1440px] mx-auto px-4 sm:px-8 py-16">
                <header className="mb-16">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#E67E22] hover:text-gray-900 transition-colors font-black text-[10px] uppercase tracking-[0.3em] mb-6"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Selection
                    </button>
                    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter uppercase">
                        Finalize <span className="text-[#E67E22]">Your Feast</span>
                    </h1>
                </header>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left: Formalities (Adaptive Column) */}
                    <div className="flex-1 space-y-20">
                        {/* Delivery Section */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center text-[#E67E22]">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase">Hand-Delivered With Care</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                                    <Input
                                        defaultValue={user?.name}
                                        className="h-16 rounded-2xl bg-gray-50 border-gray-100 px-6 font-bold focus:ring-[#E67E22]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Matrix</label>
                                    <Input
                                        defaultValue={user?.phone}
                                        className="h-16 rounded-2xl bg-gray-50 border-gray-100 px-6 font-bold focus:ring-[#E67E22]"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Destination Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <Input
                                            defaultValue={user?.addresses.find(a => a.isDefault)?.address || user?.addresses[0]?.address}
                                            className="h-16 rounded-2xl bg-gray-50 border-gray-100 pl-16 pr-6 font-bold focus:ring-[#E67E22]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center text-[#E67E22]">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase">The Exchange</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <button
                                    onClick={() => setPaymentMethod('mpesa')}
                                    className={cn(
                                        "p-8 rounded-[2rem] border-2 transition-all duration-300 text-left relative overflow-hidden group",
                                        paymentMethod === 'mpesa'
                                            ? "border-[#E67E22] bg-[#E67E22]/5 shadow-xl shadow-[#E67E22]/10"
                                            : "border-gray-100 hover:border-gray-200 bg-white"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                                            <div className="w-6 h-6 bg-green-500 rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg text-gray-900 mb-1">M-Pesa STK</h4>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Instant Push Confirmation</p>
                                        </div>
                                    </div>
                                    {paymentMethod === 'mpesa' && <ShieldCheck className="absolute top-8 right-8 w-6 h-6 text-[#E67E22]" />}
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('cash')}
                                    className={cn(
                                        "p-8 rounded-[2rem] border-2 transition-all duration-300 text-left relative overflow-hidden group",
                                        paymentMethod === 'cash'
                                            ? "border-[#E67E22] bg-[#E67E22]/5 shadow-xl shadow-[#E67E22]/10"
                                            : "border-gray-100 hover:border-gray-200 bg-white"
                                    )}
                                >
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-gray-400 group-hover:text-gray-900 transition-colors">
                                            <Truck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg text-gray-900 mb-1">On Delivery</h4>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Settle upon Arrival</p>
                                        </div>
                                    </div>
                                    {paymentMethod === 'cash' && <ShieldCheck className="absolute top-8 right-8 w-6 h-6 text-[#E67E22]" />}
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right: Summary Hub (Adaptive Sticky Side) */}
                    <div className="lg:w-96">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="relative z-10 space-y-12">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Order Summation</h3>
                                        <Badge className="bg-white/10 text-white border-white/20 uppercase tracking-widest text-[9px] font-black">{items.length} Items</Badge>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between text-white/60 font-medium">
                                            <span>Sub-Total</span>
                                            <span className="font-black">KES {total}</span>
                                        </div>
                                        <div className="flex justify-between text-white/60 font-medium">
                                            <span>Delivery Logistics</span>
                                            <span className="font-black">KES {deliveryFee}</span>
                                        </div>
                                        <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                            <span className="text-xs font-black uppercase tracking-widest text-white/40">Total Settlement</span>
                                            <span className="text-4xl font-black tracking-tighter">KES {finalTotal}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-24 rounded-[2rem] bg-[#E67E22] hover:bg-white hover:text-black text-xl font-black transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] shadow-[0_30px_60px_rgba(230,126,34,0.3)] active:scale-95 disabled:bg-white/10 disabled:text-white/20 group border-none"
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-4">
                                                <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Awaiting M-Pesa...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Begin Your Journey</span>
                                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Decorative Abstract */}
                                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E67E22] rounded-full blur-[100px] opacity-10"></div>
                            </div>

                            <div className="p-8 rounded-[2rem] border border-gray-100 flex items-start gap-4">
                                <Lock className="w-5 h-5 text-green-500 shrink-0" />
                                <div>
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">SSL Shield Active</h4>
                                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">Transactions are encrypted via military-grade protocols for absolute security.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
