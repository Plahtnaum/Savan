'use client'

import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2, ChevronLeft, ShoppingBag, Truck, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore()
    const total = getCartTotal()
    const deliveryFee = 150
    const freeDeliveryThreshold = 1500
    const progress = Math.min(100, (total / freeDeliveryThreshold) * 100)
    const remaining = Math.max(0, freeDeliveryThreshold - total)

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8">
                        <ShoppingBag className="w-10 h-10 text-gray-200" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
                        Cart is Empty
                    </h2>
                    <p className="text-gray-400 max-w-xs mx-auto mb-10 font-bold italic">
                        The kitchen is quiet... let's add some African soul to your order.
                    </p>
                    <Link href="/menu">
                        <Button size="lg" className="bg-[#E67E22] hover:bg-black text-white rounded-2xl px-12 h-16 font-black flex items-center gap-3 uppercase tracking-widest transition-all">
                            Explore Menu
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </main>
                <BottomNav />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pb-64 md:pb-40">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Cart Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/menu" className="flex items-center gap-2 text-[#E67E22] hover:text-gray-900 transition-colors font-black text-[10px] uppercase tracking-[0.3em]">
                        <ChevronLeft className="w-4 h-4" />
                        Modify Feast
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Your Selections</h1>
                    <div className="w-20 hidden sm:block" />
                </div>

                {/* Free Delivery Promo */}
                <div className="bg-gray-50 rounded-[2rem] p-8 mb-16 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center text-[#E67E22]">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-black text-gray-900 text-lg">
                                    {total >= freeDeliveryThreshold
                                        ? "Complimentary Shipping Active!"
                                        : `KES ${remaining.toLocaleString()} more for free shipping`}
                                </p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Savan Member Perk</p>
                            </div>
                        </div>
                        <span className="text-sm font-black text-[#E67E22]">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#E67E22] transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(230,126,34,0.3)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-10 mb-20">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 sm:gap-10 group items-center">
                            <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden bg-gray-100 flex-shrink-0 shadow-lg border border-gray-50">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s]"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-2 gap-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h3 className="font-black text-gray-900 text-xl sm:text-2xl mb-2 tracking-tight uppercase">{item.name}</h3>
                                        <p className="text-[10px] sm:text-xs text-gray-400 font-black uppercase tracking-[0.2em]">
                                            {item.options ? Object.values(item.options).filter(Boolean).join(' • ') : 'Signature Style'}
                                        </p>
                                    </div>
                                    <span className="text-[#E67E22] font-black text-xl sm:text-2xl tracking-tighter">
                                        KES {(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-6 bg-white px-3 py-2 rounded-2xl border border-gray-100 shadow-sm">
                                        <button
                                            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-20"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-black text-gray-900 text-xl w-6 text-center">{item.quantity}</span>
                                        <button
                                            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="w-12 h-12 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-100 shadow-sm mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                        <ShoppingBag className="w-32 h-32" />
                    </div>
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10">Financial Summary</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between text-gray-500 font-bold text-lg">
                            <span>Subtotal</span>
                            <span className="text-gray-900 font-black">KES {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 font-bold text-lg">
                            <span>Delivery Logistics</span>
                            {total >= freeDeliveryThreshold ? (
                                <span className="text-green-600 font-black tracking-widest uppercase text-sm">Complimentary</span>
                            ) : (
                                <span className="text-gray-900 font-black">KES {deliveryFee.toLocaleString()}</span>
                            )}
                        </div>
                        <div className="h-[1px] bg-gray-200/50 my-6" />
                        <div className="flex justify-between items-end pt-4">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Total Value</span>
                                <p className="text-[#E67E22] font-black text-5xl tracking-tighter">
                                    KES {(total >= freeDeliveryThreshold ? total : total + deliveryFee).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Bar - Adjusted for BottomNav on mobile */}
            <div className="fixed bottom-20 md:bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-gray-100 p-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto flex items-center gap-6">
                    <div className="hidden sm:block flex-shrink-0">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Due</p>
                        <p className="text-2xl font-black text-gray-900">KES {(total >= freeDeliveryThreshold ? total : total + deliveryFee).toLocaleString()}</p>
                    </div>
                    <Link href="/checkout" className="flex-1">
                        <Button size="lg" className="w-full h-16 rounded-2xl bg-[#E67E22] hover:bg-black text-white text-lg font-black shadow-2xl shadow-[#E67E22]/20 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] active:scale-[0.98]">
                            Proceed to Payment
                            <ArrowRight className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
