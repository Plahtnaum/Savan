import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
    id: string
    name: string
    email: string
    phone: string
    addresses: Address[]
}

export type Address = {
    id: string
    title: string // Was label, now title to match high-fidelity UI
    address: string // Was street, now address
    details?: string
    isDefault?: boolean
}

interface UserState {
    user: User | null
    isAuthenticated: boolean
    login: (phone: string) => void
    logout: () => void
    updateProfile: (profile: Partial<User>) => void
    addAddress: (address: Omit<Address, 'id'>) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (phone) => set({
                isAuthenticated: true,
                user: {
                    id: 'u1',
                    name: 'Oliver',
                    email: 'oliver@savaneats.com',
                    phone,
                    addresses: [
                        { id: 'a1', title: 'Office', address: 'Westlands, Delta Towers', isDefault: true },
                        { id: 'a2', title: 'Home', address: 'Kilimani, Rose Ave' }
                    ]
                }
            }),
            logout: () => set({ isAuthenticated: false, user: null }),
            updateProfile: (profile) => set((state) => ({
                user: state.user ? { ...state.user, ...profile } : null
            })),
            addAddress: (address) => set((state) => ({
                user: state.user ? {
                    ...state.user,
                    addresses: [...state.user.addresses, { ...address, id: Math.random().toString(36).substring(7) }]
                } : null
            }))
        }),
        {
            name: 'savan-user-storage',
        }
    )
)
