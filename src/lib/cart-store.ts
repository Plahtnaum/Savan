import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
    id: string
    menuItemId: string
    name: string
    price: number
    quantity: number
    image: string
    recipient?: string
    options?: {
        side?: string
        spice?: string
        addOns?: string[]
    }
}

interface CartState {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'id'>) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getCartTotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existingItem = state.items.find(
                    (i) => i.menuItemId === item.menuItemId &&
                        JSON.stringify(i.options) === JSON.stringify(item.options) &&
                        i.recipient === item.recipient
                )

                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === existingItem.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        )
                    }
                }

                return {
                    items: [...state.items, { ...item, id: Math.random().toString(36).substring(7) }]
                }
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id)
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((i) =>
                    i.id === id ? { ...i, quantity } : i
                ).filter(i => i.quantity > 0)
            })),
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                const state = get()
                return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
            }
        }),
        {
            name: 'savan-cart-storage',
        }
    )
)
