export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'all-day'

export interface MealContext {
    type: MealType
    greeting: string
    description: string
    accentColor: string
}

export function getMealContext(): MealContext {
    const hour = new Date().getHours()

    if (hour >= 6 && hour < 11) {
        return {
            type: 'breakfast',
            greeting: 'Good Morning',
            description: 'Start your day with the vibrant energy of the Savannah.',
            accentColor: '#E67E22'
        }
    }

    if (hour >= 11 && hour < 17) {
        return {
            type: 'lunch',
            greeting: 'Midday Energy',
            description: 'Fuel your afternoon with bold, artisanal African mains.',
            accentColor: '#E67E22'
        }
    }

    return {
        type: 'dinner',
        greeting: 'Cozy Evening',
        description: 'Wind down with our most prized slow-cooked platters.',
        accentColor: '#E67E22'
    }
}
