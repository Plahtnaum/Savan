import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from './cart-store'

export type OrderStatus = 'Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled'

export type Order = {
    id: string
    orderNumber: string
    items: CartItem[]
    total: number
    status: OrderStatus
    date: string
    address: string
    paymentMethod: string
}

interface OrderState {
    orders: Order[]
    activeOrderId: string | null
    createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => void
    updateOrderStatus: (orderId: string, status: OrderStatus) => void
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: [],
            activeOrderId: null,
            createOrder: (orderData) => set((state) => {
                const newOrder: Order = {
                    ...orderData,
                    id: Math.random().toString(36).substring(7),
                    orderNumber: `SV${Math.floor(10000 + Math.random() * 90000)}`,
                    date: new Date().toISOString(),
                    status: 'Placed',
                }
                return {
                    orders: [newOrder, ...state.orders],
                    activeOrderId: newOrder.id
                }
            }),
            updateOrderStatus: (orderId, status) => set((state) => ({
                orders: state.orders.map(order =>
                    order.id === orderId ? { ...order, status } : order
                )
            }))
        }),
        {
            name: 'savan-order-storage',
        }
    )
)
