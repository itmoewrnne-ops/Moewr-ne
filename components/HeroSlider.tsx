import { prisma } from '@/lib/prisma'
import { HeroSliderClient } from './HeroSliderClient'

// Cache slides for 60 seconds - faster page load
export const revalidate = 60

export async function HeroSlider() {
    try {
        const slides = await prisma.heroSlide.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        })

        return <HeroSliderClient slides={slides} />
    } catch (error) {
        // Return empty slides on error
        return <HeroSliderClient slides={[]} />
    }
}
