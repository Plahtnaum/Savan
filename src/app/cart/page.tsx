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
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
                        Looks like you haven't added any African flavors yet.
                    </p>
                    <Link href="/menu">
                        <Button size="lg" className="bg-[#E67E22] hover:bg-[#D35400] text-white rounded-full px-10 h-14 font-bold flex items-center gap-2">
                            Browse Menu
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </main>
                <BottomNav />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pb-40">
            <Header />

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Cart Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/menu" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Menu
                    </Link>
                    <h1 className="text-2xl font-black text-gray-900">Your Cart</h1>
                    <div className="w-20 hidden sm:block" /> {/* Spacer */}
                </div>

                {/* Free Delivery Promo */}
                <div className="bg-gray-50 rounded-3xl p-6 mb-10 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#E67E22]/10 rounded-xl flex items-center justify-center text-[#E67E22]">
                                <Truck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">
                                    {total >= freeDeliveryThreshold
                                        ? "You've got free delivery!"
                                        : `Add KES ${remaining} for free delivery`}
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Special Promotion</p>
                            </div>
                        </div>
                        <span className="text-sm font-black text-[#E67E22]">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#E67E22] transition-all duration-700 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-6 mb-12">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 sm:gap-6 group">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 sm:text-lg mb-1">{item.name}</h3>
                                        <p className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider">
                                            {item.options ? Object.values(item.options).filter(Boolean).join(' • ') : 'Standard'}
                                        </p>
                                    </div>
                                    <span className="text-[#E67E22] font-black sm:text-lg">
                                        KES {item.price * item.quantity}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-4 bg-gray-50 px-3 py-2 rounded-2xl border border-gray-100">
                                        <button
                                            className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 transition-colors disabled:opacity-30"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                                        <button
                                            className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Summary</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-gray-500 font-medium">
                            <span>Subtotal</span>
                            <span className="text-gray-900 font-bold">KES {total}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 font-medium">
                            <span>Delivery Fee</span>
                            {total >= freeDeliveryThreshold ? (
                                <span className="text-green-600 font-bold">FREE</span>
                            ) : (
                                <span className="text-gray-900 font-bold">KES {deliveryFee}</span>
                            )}
                        </div>
                        <div className="h-px bg-gray-200/50 my-2" />
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-900 font-black text-xl">Order Total</span>
                            <span className="text-[#E67E22] font-black text-3xl tracking-tighter">
                                KES {total >= freeDeliveryThreshold ? total : total + deliveryFee}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 p-6 z-50">
                <div className="max-w-4xl mx-auto">
                    <Link href="/checkout">
                        <Button size="lg" className="w-full h-16 rounded-[1.5rem] bg-[#E67E22] hover:bg-[#D35400] text-white text-lg font-black shadow-xl shadow-[#E67E22]/20 transition-all flex items-center justify-center gap-3">
                            Proceed to Checkout
                            <ChevronLeft className="w-6 h-6 rotate-180" />
                        </Button>
                    </Link>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
