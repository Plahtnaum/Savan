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
    customerPhone?: string
    customerName?: string
    deliveryInstructions?: string
    orderType: 'delivery' | 'pickup' | 'dine-in'
    verificationCode?: string
}

interface CreateOrderData extends Omit<Order, 'id' | 'orderNumber' | 'date' | 'status' | 'verificationCode'> {
    id?: string
}

interface OrderState {
    orders: Order[]
    activeOrderId: string | null
    createOrder: (order: CreateOrderData) => void
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
                    id: orderData.id || Math.random().toString(36).substring(7),
                    orderNumber: orderData.id ? orderData.id.replace('SVN-', '') : `SV${Math.floor(10000 + Math.random() * 90000)}`,
                    date: new Date().toISOString(),
                    status: 'Placed',
                    verificationCode: Math.floor(1000 + Math.random() * 9000).toString(),
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
