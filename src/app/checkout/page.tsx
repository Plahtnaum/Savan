'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2, MapPin, Truck } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { useOrderStore } from '@/lib/order-store'
import { useUserStore } from '@/lib/user-store' // Assuming we might use this later
import Link from 'next/link'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getCartTotal, clearCart } = useCartStore()
    const { createOrder } = useOrderStore()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    const subtotal = getCartTotal()
    const deliveryFee = 150
    const total = subtotal + deliveryFee

    const handlePlaceOrder = async () => {
        if (!phoneNumber || !address) return;

        setIsProcessing(true)

        // Simulate API call / M-Pesa STK Push
        await new Promise(resolve => setTimeout(resolve, 2000))

        createOrder({
            items,
            total,
            address,
            paymentMethod: 'M-Pesa',
        })

        const { activeOrderId } = useOrderStore.getState()

        clearCart()
        setIsProcessing(false)
        router.push(`/order/${activeOrderId}`)
    }

    if (items.length === 0) {
        router.replace('/cart')
        return null
    }

    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            <div className="sticky top-0 z-10 bg-background border-b px-4 h-14 flex items-center">
                <Link href="/cart" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </Link>
                <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold">Checkout</h1>
            </div>

            <main className="container max-w-lg py-6 space-y-6">
                {/* Delivery Address */}
                <Card>
                    <CardHeader className="pb-3 border-b">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Delivery Details
                        </h2>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Full Address</label>
                            <Input
                                placeholder="e.g. Westlands, Delta Towers, 5th Floor"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Phone Number (for M-Pesa)</label>
                            <Input
                                type="tel"
                                placeholder="e.g. 0712 345 678"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                    <CardHeader className="pb-3 border-b">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Truck className="w-4 h-4" /> Order Summary
                        </h2>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-2">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span>KES {item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>KES {subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span>KES {deliveryFee}</span>
                        </div>
                        <div className="h-px bg-border my-2" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total to Pay</span>
                            <span className="text-primary">KES {total}</span>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to pay via M-Pesa upon prompt.
                </p>

                <Button
                    size="lg"
                    className="w-full text-base font-bold h-12"
                    onClick={handlePlaceOrder}
                    disabled={!address || !phoneNumber || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing M-Pesa...
                        </>
                    ) : (
                        `Pay KES ${total}`
                    )}
                </Button>
            </main>
        </div>
    )
}
