'use client'

import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore()
    const total = getCartTotal()
    const deliveryFee = 150

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-muted/20 flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-40 h-40 bg-muted rounded-full flex items-center justify-center mb-4">
                        <span className="text-4xl">🛒</span>
                    </div>
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                        Looks like you haven't added any delicious food yet.
                    </p>
                    <Link href="/menu">
                        <Button size="lg" className="mt-4">Browse Menu</Button>
                    </Link>
                </main>
                <BottomNav />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/20 pb-32">
            <div className="sticky top-0 z-10 bg-background border-b px-4 h-14 flex items-center">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Keep shopping
                </Link>
                <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold">My Cart</h1>
            </div>

            <main className="container py-6 space-y-6">
                <div className="space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-3 flex gap-3">
                                <div className="h-20 w-20 bg-muted rounded-md shrink-0 relative">
                                    {/* Placeholder */}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                                            {item.options && (
                                                <p className="text-xs text-muted-foreground">
                                                    {Object.values(item.options).filter(Boolean).join(', ')}
                                                </p>
                                            )}
                                        </div>
                                        <p className="font-bold text-sm">KES {item.price * item.quantity}</p>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center border rounded-md h-8">
                                            <button
                                                className="px-2 h-full hover:bg-muted"
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-2 text-xs font-medium">{item.quantity}</span>
                                            <button
                                                className="px-2 h-full hover:bg-muted"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            className="p-2 text-muted-foreground hover:text-destructive"
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

                {/* Summary */}
                <div className="space-y-3 pt-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>KES {total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>KES {deliveryFee}</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">KES {total + deliveryFee}</span>
                    </div>
                </div>
            </main>

            {/* Sticky Checkout Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 px-6 md:pb-6 pb-20 safe-area-bottom z-50">
                <div className="container max-w-md mx-auto">
                    <Link href="/checkout">
                        <Button size="lg" className="w-full text-base font-bold shadow-lg">
                            Checkout • KES {total + deliveryFee}
                        </Button>
                    </Link>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
