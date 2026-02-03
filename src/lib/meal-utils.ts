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
            description: 'Awaken your palette with authentic Kenyan morning flavors—from spiced tea to artisanal mahamri.',
            accentColor: '#E67E22'
        }
    }

    if (hour >= 11 && hour < 17) {
        return {
            type: 'lunch',
            greeting: 'Jambo! Midday Feast',
            description: 'Fresh, bold Kenyan mains, slow-cooked and delivered with care for your midday journey.',
            accentColor: '#E67E22'
        }
    }

    return {
        type: 'dinner',
        greeting: 'Evening Warmth',
        description: 'Soulful heritage dishes, slow-cooked for a perfect evening feast. A heritage end to your day.',
        accentColor: '#E67E22'
    }
}
