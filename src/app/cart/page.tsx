'use client'

import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import Link from 'next/link'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore()
    const total = getCartTotal()
    const deliveryFee = 150

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <ShoppingBag className="w-16 h-16 text-gray-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-display mb-2">Your cart is empty</h2>
                        <p className="text-muted-foreground max-w-xs mx-auto">
                            Looks like you haven't added any delicious food yet.
                        </p>
                    </div>
                    <Link href="/menu">
                        <Button size="lg" className="mt-4 rounded-full px-8">Browse Menu</Button>
                    </Link>
                </main>
                <BottomNav />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-40">
            <div className="sticky top-0 z-10 bg-white border-b px-4 h-14 flex items-center shadow-sm">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Keep shopping
                </Link>
                <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold font-display">My Cart ({items.length})</h1>
            </div>

            <main className="container py-6 space-y-6 max-w-2xl mx-auto">
                <div className="space-y-3">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex gap-4">
                                <div className="h-24 w-24 bg-gray-100 rounded-xl shrink-0 relative overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-base line-clamp-1 font-display">{item.name}</h3>
                                            {item.options && Object.values(item.options).filter(Boolean).length > 0 && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {Object.values(item.options).filter(Boolean).join(' • ')}
                                                </p>
                                            )}
                                        </div>
                                        <p className="font-bold text-base font-display text-primary whitespace-nowrap">KES {item.price * item.quantity}</p>
                                    </div>

                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex items-center border border-gray-200 rounded-lg h-9 bg-white shadow-sm">
                                            <button
                                                className="px-3 h-full hover:bg-gray-50 transition-colors rounded-l-lg"
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="px-4 text-sm font-semibold border-x border-gray-200">{item.quantity}</span>
                                            <button
                                                className="px-3 h-full hover:bg-gray-50 transition-colors rounded-r-lg"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <button
                                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-colors"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Summary Card */}
                <Card className="shadow-md">
                    <CardContent className="p-6 space-y-4">
                        <h3 className="font-semibold text-lg font-display mb-4">Order Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">KES {total}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Delivery Fee</span>
                                <span className="font-medium">KES {deliveryFee}</span>
                            </div>
                            <div className="h-px bg-gray-200" />
                            <div className="flex justify-between font-bold text-lg pt-2">
                                <span className="font-display">Total</span>
                                <span className="text-primary font-display">KES {total + deliveryFee}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Sticky Checkout Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-6 md:pb-6 pb-20 safe-area-bottom z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
                <div className="container max-w-2xl mx-auto">
                    <Link href="/checkout">
                        <Button size="lg" className="w-full text-base font-semibold shadow-lg hover:shadow-xl transition-shadow rounded-full h-14">
                            Proceed to Checkout • KES {total + deliveryFee}
                        </Button>
                    </Link>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
