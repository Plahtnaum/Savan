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
            greeting: 'Karibu! A Fresh Start',
            description: 'Awaken your palette with the authentic flavors of a Kenyan morning—from spiced tea to artisanal mahamri.',
            accentColor: '#E67E22'
        }
    }

    if (hour >= 11 && hour < 17) {
        return {
            type: 'lunch',
            greeting: 'Jambo! Midday Feast',
            description: 'The sun is high, and our kitchen is crafting the perfect Kenyan main—fresh, bold, and delivered with care.',
            accentColor: '#E67E22'
        }
    }

    return {
        type: 'dinner',
        greeting: 'Evening Warmth',
        description: 'Wind down with our most prized slow-cooked heritage dishes. A soulful end to your day, prepared with heart.',
        accentColor: '#E67E22'
    }
}
